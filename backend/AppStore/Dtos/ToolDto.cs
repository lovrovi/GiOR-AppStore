using AppStore.Models;

namespace AppStore.Dtos
{
    public class ToolDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ToolType Type { get; set; }
        public int ProducerId { get; set; }
    }
}
