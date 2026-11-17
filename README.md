# Bài thực hành quản lý sản phẩm

Khuất Nguyễn Bảo Hiếu · N23DCAT026

Bài thực hành môn Lập trình web. Trang **Sản phẩm** của ứng dụng React/Vite gọi ASP.NET Core Web API qua Axios.

## Các thay đổi trong bài thực hành

- Thêm project ASP.NET Core Web API trong `backend/` và `ProductsController` với các endpoint đọc danh sách, xem chi tiết, tạo, cập nhật và xóa sản phẩm. Backend kiểm tra dữ liệu đầu vào trước khi ghi.
- Kết nối SQLite qua EF Core. Migration `InitialCreate` tạo bảng `Products` và nạp sáu sản phẩm từ danh sách gốc.
- Thay danh sách viết cứng trên trang **Sản phẩm** bằng dữ liệu từ API. Trang có biểu mẫu thêm, sửa và nút xóa. Các request `GET`, `POST`, `PUT`, `DELETE` nằm trong `src/api/products.js`.
- Cấu hình Vite chuyển tiếp request `/api` đến ASP.NET Core để frontend và backend có thể chạy ở hai cổng local.

## Chạy trên máy local

Cài .NET 10 SDK và Node.js 22.13 trở lên.

Tại thư mục gốc, chạy backend:

```bash
dotnet tool restore
dotnet restore backend
dotnet ef database update --project backend
dotnet run --project backend
```

Mở terminal thứ hai, cũng tại thư mục gốc:

```bash
npm ci
npm run dev
```

Mở [trang Sản phẩm](http://localhost:3000/products). Vite chuyển tiếp `/api` đến backend ở `http://localhost:5080`. Khi đưa bản build lên máy chủ, cấu hình máy chủ chuyển tiếp `/api` đến backend dưới cùng origin.

## API sản phẩm

| Phương thức | Endpoint | Kết quả khi thành công |
| --- | --- | --- |
| GET | `/api/products` | `200 OK` và danh sách sản phẩm |
| GET | `/api/products/{id}` | `200 OK` và thông tin để điền biểu mẫu sửa |
| POST | `/api/products` | `201 Created` và URL sản phẩm trong header `Location` |
| PUT | `/api/products/{id}` | `204 No Content` |
| DELETE | `/api/products/{id}` | `204 No Content` |

POST và PUT nhận JSON, ví dụ `{"name":"Cáp USB-C","description":"Dài 1 mét","price":290000}`. Giá là số nguyên không âm tính theo VND. API trả `400` khi dữ liệu không hợp lệ và `404` khi thao tác theo ID không tìm thấy sản phẩm.

## Kết nối SQLite và tạo migration

- `backend/Products.Api.csproj` khai báo provider `Microsoft.EntityFrameworkCore.Sqlite` và package `Microsoft.EntityFrameworkCore.Design` cho công cụ migration. `dotnet tool restore` cài `dotnet-ef` theo phiên bản trong `dotnet-tools.json`.
- `backend/appsettings.json` chứa `ConnectionStrings:Products`. `Program.cs` đọc chuỗi này và đăng ký `ProductsContext` qua `AddDbContext` và `UseSqlite`.
- Mặc định hai lệnh chạy ở trên dùng `backend/products.db`. Có thể đặt biến môi trường `ConnectionStrings__Products` thành `Data Source=/duong/dan/products.db` cho cả lệnh migration và lệnh chạy API nếu muốn đổi vị trí.
- Sau khi sửa model hoặc cấu hình schema trong `ProductsContext`, tạo và áp dụng migration mới từ thư mục gốc. Thay `TenThayDoi` bằng tên mô tả thay đổi.

```bash
dotnet ef migrations add TenThayDoi --project backend
dotnet ef database update --project backend
```

Xem `Up`, `Down` và model snapshot trong `backend/Migrations` để kiểm tra các thay đổi. [Tài liệu EF Core về migration](https://learn.microsoft.com/ef/core/managing-schemas/migrations/managing)
