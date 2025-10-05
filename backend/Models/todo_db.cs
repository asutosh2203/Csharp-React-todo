using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class TodoItem
{
    [Key]
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public bool IsComplete { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? Deadline { get; set; }
}

