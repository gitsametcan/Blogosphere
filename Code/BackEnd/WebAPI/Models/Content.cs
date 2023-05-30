using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Content
{
    public int ContentId { get; set; }

    public string Title { get; set; } = null!;

    public DateTime PublishDate { get; set; }

    public string Content1 { get; set; } = null!;

    public string? ShortDescription { get; set; }

    public string? ImagePath { get; set; }

    public int AuthorId { get; set; }

    public int? CategoryId { get; set; }

    public int Visibility { get; set; }

    //public virtual User Author { get; set; } = null!;

    //public virtual Category? Category { get; set; }

    //public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    //public virtual ICollection<Like> Likes { get; set; } = new List<Like>();
}
