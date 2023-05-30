using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models.Utils;

namespace WebAPI.Models;

public partial class BlogosphereContext : DbContext
{
    public BlogosphereContext()
    {
    }

    public BlogosphereContext(DbContextOptions<BlogosphereContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Content> Contents { get; set; }

    public virtual DbSet<Like> Likes { get; set; }

    public virtual DbSet<Session> Sessions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(ConnectionString.ServerString);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Categori__19093A2B9A30D2E1");

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CategoryDescription).HasMaxLength(200);
            entity.Property(e => e.CategoryTitle).HasMaxLength(50);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__Comments__C3B4DFAA0D9905B6");

            entity.Property(e => e.CommentId).HasColumnName("CommentID");
            entity.Property(e => e.CommentContent).HasMaxLength(255);
            entity.Property(e => e.ContentId).HasColumnName("ContentID");
            entity.Property(e => e.PosterId).HasColumnName("PosterID");
            entity.Property(e => e.PublishDate).HasColumnType("datetime");

            /*entity.HasOne(d => d.Content).WithMany(p => p.Comments)
                .HasForeignKey(d => d.ContentId)
                .HasConstraintName("FK__Comments__Conten__33D4B598");

            entity.HasOne(d => d.Poster).WithMany(p => p.Comments)
                .HasForeignKey(d => d.PosterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Comments__Poster__32E0915F");*/
        });

        modelBuilder.Entity<Content>(entity =>
        {
            entity.HasKey(e => e.ContentId).HasName("PK__Contents__2907A87E0BA0E2E4");

            entity.Property(e => e.ContentId).HasColumnName("ContentID");
            entity.Property(e => e.AuthorId).HasColumnName("AuthorID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.Content1)
                .HasColumnType("ntext")
                .HasColumnName("Content");
            entity.Property(e => e.ShortDescription).HasMaxLength(200);
            entity.Property(e => e.ImagePath).HasMaxLength(500);
            entity.Property(e => e.PublishDate).HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(100);

            /*entity.HasOne(d => d.Author).WithMany(p => p.Contents)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Contents__Author__34C8D9D1");

            entity.HasOne(d => d.Category).WithMany(p => p.Contents)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Contents__Catego__35BCFE0A");*/
        });

        modelBuilder.Entity<Like>(entity =>
        {
            entity.HasKey(e => e.LikeId).HasName("PK__Likes__A2922CF42F6FF185");

            entity.Property(e => e.LikeId).HasColumnName("LikeID");
            entity.Property(e => e.LikedContentId).HasColumnName("LikedContentID");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.LikeDate).HasColumnType("datetime");

            /*entity.HasOne(d => d.LikedContent).WithMany(p => p.Likes)
                .HasForeignKey(d => d.LikedContentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Likes__LikedCont__30F848ED");

            entity.HasOne(d => d.User).WithMany(p => p.Likes)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Likes__UserID__300424B4");*/
        });

        modelBuilder.Entity<Session>(entity =>
        {
            entity.HasKey(e => e.SessionId).HasName("PK__Sessions__C9F49270505AC035");

            entity.Property(e => e.SessionId).HasColumnName("SessionID");
            entity.Property(e => e.SessionKey).HasMaxLength(50);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            /*entity.HasOne(d => d.User).WithMany(p => p.Sessions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Sessions__UserID__31EC6D26");*/
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CCACA3EE14E3");

            entity.HasIndex(e => e.Email, "UQ__Users__7614F5F6ED8E9913").IsUnique();

            entity.HasIndex(e => e.UserName, "UQ__Users__C9F28456DB18878D").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("EMail");
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.UserType).HasMaxLength(10);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
