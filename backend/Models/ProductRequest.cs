using System.ComponentModel.DataAnnotations;

namespace Products.Api.Models;

public sealed record ProductRequest(
    [Required, StringLength(120)] string Name,
    [Required, StringLength(500)] string Description,
    [Required, Range(0, int.MaxValue)] int? Price);
