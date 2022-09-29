using AppStore.Data;
using AppStore.Dtos;
using AppStore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AppStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppStoreDbContext _context;
        private readonly IConfiguration _config;
        private readonly IConnectionMultiplexer _redis;

        public LoginController(AppStoreDbContext context, IConfiguration config, IConnectionMultiplexer redis)
        {
            _context = context;
            _config = config;
            _redis = redis;

        }

        private string GenerateJSONWebToken(string userName, int id, UserType type)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim("userId", id.ToString()),
                new Claim("Role", type.ToString())

            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(60),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // POST api/<LoginController>
        [HttpPost]
        public async Task<ActionResult> Login(LoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username && u.Password == request.Password);
            if (user == null)
            {
                return BadRequest();
            }
            var tokenString = GenerateJSONWebToken(user.Username, user.Id, user.Type);

            var key = "jwt:" + tokenString;
            IDatabase db = _redis.GetDatabase();
            db.StringSet(key, tokenString);
            db.KeyExpire(key, new TimeSpan(0, 0, 60, 0));

            return Ok(tokenString);
        }

        [HttpGet("verify")]
        public async Task<ActionResult> Verify([FromQuery] string token)
        {
            var key = "jwt:" + token;
            IDatabase db = _redis.GetDatabase();
            var cachedToken = await db.StringGetAsync(key);

            if (cachedToken.IsNullOrEmpty)
            {
                return NotFound("Token not found");
            }

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _config["Jwt:Issuer"],
                    ValidAudience = _config["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"])),
                    ClockSkew = TimeSpan.Zero,
                };

                IPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
            }
            catch
            {
                return BadRequest("Token expired");
            }


            return Ok();
        }
    }
}
