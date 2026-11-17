using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Products.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Price = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "Description", "Price" },
                values: new object[,]
                {
                    { 1, "iPhone 17 Pro", "Chip mạnh mẽ, camera chuyên nghiệp", 34990000 },
                    { 2, "MacBook Air M4", "Mỏng nhẹ, pin cả ngày dài", 27990000 },
                    { 3, "iPad Air", "Đa năng cho học tập và sáng tạo", 16990000 },
                    { 4, "Apple Watch Series 11", "Theo dõi sức khỏe mỗi ngày", 10990000 },
                    { 5, "AirPods Pro 3", "Chống ồn chủ động", 6790000 },
                    { 6, "iMac 24\"", "Màn hình Retina 4.5K", 36990000 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
