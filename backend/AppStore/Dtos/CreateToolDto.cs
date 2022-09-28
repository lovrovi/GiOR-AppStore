using AppStore.Models;

namespace AppStore.Dtos
{
    public class CreateToolDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ToolType Type { get; set; }
        public int ProducerId { get; set; }
    }
}
