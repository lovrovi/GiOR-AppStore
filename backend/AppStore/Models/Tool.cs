using System.Text.Json.Serialization;

namespace AppStore.Models
{
    public class Tool
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ToolType Type { get; set; }
        public int ProducerId { get; set; }
        public Producer Producer { get; set; }
    }

    public enum ToolType
    {
        Measuring = 1, 
        Striking = 2,
        MetalCutting = 3,
        Holding = 4,
        Grinding = 5,
    }
}
