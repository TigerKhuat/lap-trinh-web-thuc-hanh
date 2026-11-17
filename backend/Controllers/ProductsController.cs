using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Products.Api.Data;
using Products.Api.Models;

namespace Products.Api.Controllers;

[ApiController]
[Route("api/products")]
public sealed class ProductsController(ProductsContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll(CancellationToken ct)
    {
        return await db.Products.AsNoTracking().OrderBy(product => product.Id).ToListAsync(ct);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(int id, CancellationToken ct)
    {
        var product = await db.Products.AsNoTracking().SingleOrDefaultAsync(item => item.Id == id, ct);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(ProductRequest request, CancellationToken ct)
    {
        var product = new Product
        {
            Name = request.Name.Trim(),
            Description = request.Description.Trim(),
            Price = request.Price!.Value
        };

        db.Products.Add(product);
        await db.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ProductRequest request, CancellationToken ct)
    {
        var affected = await db.Products.Where(product => product.Id == id)
            .ExecuteUpdateAsync(properties => properties
                .SetProperty(product => product.Name, request.Name.Trim())
                .SetProperty(product => product.Description, request.Description.Trim())
                .SetProperty(product => product.Price, request.Price!.Value), ct);

        return affected == 0 ? NotFound() : NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken ct)
    {
        var affected = await db.Products.Where(product => product.Id == id).ExecuteDeleteAsync(ct);
        return affected == 0 ? NotFound() : NoContent();
    }
}
