using AppStore.Data;
using AppStore.Dtos;
using AppStore.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace AppStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ToolsController : ControllerBase
    {
        private readonly AppStoreDbContext _context;
        private readonly IConnectionMultiplexer _redis;
        private readonly IMapper _mapper;

        public ToolsController(AppStoreDbContext context, IConnectionMultiplexer redis, IMapper mapper)
        {
            _context = context;
            _redis = redis;
            _mapper = mapper;
        }

        // GET: api/Tools
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToolDto>>> GetTools()
        {
            var key = "tools";
            IDatabase db = _redis.GetDatabase();
            var cachedTools = await db.StringGetAsync(key);
            if (!cachedTools.IsNullOrEmpty) return Ok(JsonSerializer.Deserialize<IEnumerable<Tool>>(cachedTools));

            var tools = await _context.Tools.ToListAsync();
            var mappedTool = _mapper.Map<List<ToolDto>>(tools);

            db.StringSet(key, JsonSerializer.Serialize(mappedTool));
            db.KeyExpire(key, new TimeSpan(0, 0, 20, 0));

            return mappedTool;
        }

        // GET: api/Tools/5  
        [HttpGet("{id}")]
        public async Task<ActionResult<ToolDto>> GetTool(int id)
        {
            var key = "tools";
            IDatabase db = _redis.GetDatabase();
            var cachedTools = await db.StringGetAsync(key);
            if (!cachedTools.IsNullOrEmpty)
            {
                var currentTools = JsonSerializer.Deserialize<IEnumerable<Tool>>(cachedTools);
                var requestedTool = currentTools.FirstOrDefault(x => x.Id == id);

                if (requestedTool != null) {
                    var cacheResponse = _mapper.Map<ToolDto>(requestedTool);
                    return cacheResponse;
                }
            }

            var tool = await _context.Tools.FindAsync(id);

            if (tool == null)
            {
                return NotFound();
            }

            var mappedTool = _mapper.Map<ToolDto>(tool);

            db.StringSet(key, JsonSerializer.Serialize(mappedTool));
            db.KeyExpire(key, new TimeSpan(0, 0, 20, 0));

            return mappedTool;
        }

        // PUT: api/Tools/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PutTool(int id, ToolDto tool)
        {
            if (id != tool.Id)
            {
                return BadRequest();
            }

            _context.Entry(tool).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                var key = "tools";
                IDatabase db = _redis.GetDatabase();
                var cachedTools = await db.StringGetAsync(key);
                if (!cachedTools.IsNullOrEmpty)
                {
                    var currentTools = JsonSerializer.Deserialize<IEnumerable<Tool>>(cachedTools).ToList();
                    var mappedTools = _mapper.Map<List<ToolDto>>(currentTools);

                    var editedTool = mappedTools.FirstOrDefault(x => x.Id == id);
                    var editedIndex = mappedTools.IndexOf(editedTool);
                    mappedTools[editedIndex] = tool;
                    db.StringSet(key, JsonSerializer.Serialize(mappedTools));
                    db.KeyExpire(key, new TimeSpan(0, 0, 20, 0));
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToolExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tools
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Tool>> PostTool(CreateToolDto tool)
        {
            var key = "tools";
            IDatabase db = _redis.GetDatabase();

            var mappedTool = _mapper.Map<Tool>(tool);
            _context.Tools.Add(mappedTool);
            await _context.SaveChangesAsync();

            var cachedTools = await db.StringGetAsync(key);
            if (!cachedTools.IsNullOrEmpty)
            {
                var currentTools = JsonSerializer.Deserialize<IEnumerable<Tool>>(cachedTools);
                var newTools = currentTools.Append(mappedTool);

                var mappedTools = _mapper.Map<List<ToolDto>>(newTools);
                db.StringSet(key, JsonSerializer.Serialize(mappedTools));
                db.KeyExpire(key, new TimeSpan(0, 0, 20, 0));
            }

            return CreatedAtAction("GetTool", new { id = mappedTool.Id }, mappedTool);
        }

        // DELETE: api/Tools/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteTool(int id)
        {
            var tool = await _context.Tools.FindAsync(id);
            if (tool == null)
            {
                return NotFound();
            }

            _context.Tools.Remove(tool);
            await _context.SaveChangesAsync();

            var key = "tools";
            IDatabase db = _redis.GetDatabase();

            var cachedTools = await db.StringGetAsync(key);
            if (!cachedTools.IsNullOrEmpty)
            {
                var currentTools = JsonSerializer.Deserialize<IEnumerable<Tool>>(cachedTools);
                var newTools = currentTools.Where(x => x.Id != id);
                db.StringSet(key, JsonSerializer.Serialize(newTools));
                db.KeyExpire(key, new TimeSpan(0, 0, 20, 0));
            }

            return NoContent();
        }

        private bool ToolExists(int id)
        {
            return _context.Tools.Any(e => e.Id == id);
        }
    }
}
