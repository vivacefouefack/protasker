using Microsoft.EntityFrameworkCore;
using ProTasker.Models;

namespace ProTasker.Context
{
    public class ProTaskerDbContext : DbContext
    {
        public ProTaskerDbContext(DbContextOptions<ProTaskerDbContext> options) : base(options)
        {

        }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tasks>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.UserId);
        }
    }
}
