using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Like
{
    public int LikeId { get; set; }

    public int UserId { get; set; }

    public int LikedContentId { get; set; }

    public int Dislike { get; set; }

    public DateTime LikeDate { get; set; }

    //public virtual Content LikedContent { get; set; } = null!;

    //public virtual User User { get; set; } = null!;
}
