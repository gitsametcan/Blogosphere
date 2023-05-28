using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public int PosterId { get; set; }

    public int ContentId { get; set; }

    public string CommentContent { get; set; } = null!;

    public DateTime PublishDate { get; set; }

    public virtual Content Content { get; set; } = null!;

    public virtual User Poster { get; set; } = null!;
}
