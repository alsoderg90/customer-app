using Microsoft.EntityFrameworkCore;

namespace back_end.Models
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> options)
            : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasOne(c => c.Address)
                .WithOne()
                .HasForeignKey<Address>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Address> Addresses => Set<Address>();
    }
}