using Microsoft.EntityFrameworkCore;

namespace database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Rates)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<RefreshToken>().
                HasOne(rt => rt.User).WithOne(u => u.RefreshToken).
                HasForeignKey<RefreshToken>(rt => rt.UserId);

            modelBuilder.Entity<Rate>()
                .HasOne(r => r.User)
                .WithMany(u => u.Rates)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<User>().Property(u => u.favoriteCurrency).HasDefaultValue("usd");

            modelBuilder.Entity<User>().Property(u => u.CreatedAt).HasDefaultValueSql("now() at time zone 'utc'");
            modelBuilder.Entity<User>().Property(u => u.PasswordHash).IsRequired();
            modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();


            modelBuilder.Entity<Rate>().Property(r => r.CreatedAt).HasDefaultValueSql("now() at time zone 'utc'");
            modelBuilder.Entity<Rate>().Property(r => r.UserId).IsRequired();
        }
    }
}