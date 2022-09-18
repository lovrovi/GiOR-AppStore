using AppStore.Models;
using Microsoft.EntityFrameworkCore;

namespace AppStore.Data
{
    public class AppStoreDbContext : DbContext
    {
        public AppStoreDbContext(DbContextOptions<AppStoreDbContext> options) : base(options)
        {

        }

        public DbSet<Tool> Tools { get; set; }
        public DbSet<Producer> Producers { get; set; }
    }
}
