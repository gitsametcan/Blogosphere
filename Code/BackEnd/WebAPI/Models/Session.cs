using System;
using System.Collections.Generic;

namespace WebAPI.Models;

public partial class Session
{
    public int SessionId { get; set; }

    public int UserId { get; set; }

    public string SessionKey { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
