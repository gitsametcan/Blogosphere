using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryTitle { get; set; } = null!;

    public string? CategoryDescription { get; set; }

    //public virtual ICollection<Content> Contents { get; set; } = new List<Content>();
}
