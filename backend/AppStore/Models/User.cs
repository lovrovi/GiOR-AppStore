using System.Text.Json.Serialization;

namespace AppStore.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public UserType Type { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserType
    {
        Admin = 1,
        User = 2,
    }
}
