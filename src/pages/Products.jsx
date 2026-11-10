const products = [
    { id: 1, name: 'iPhone 17 Pro', desc: 'Chip mạnh mẽ, camera chuyên nghiệp', price: '34.990.000đ' },
    { id: 2, name: 'MacBook Air M4', desc: 'Mỏng nhẹ, pin cả ngày dài', price: '27.990.000đ' },
    { id: 3, name: 'iPad Air', desc: 'Đa năng cho học tập và sáng tạo', price: '16.990.000đ' },
    { id: 4, name: 'Apple Watch Series 11', desc: 'Theo dõi sức khỏe mỗi ngày', price: '10.990.000đ' },
    { id: 5, name: 'AirPods Pro 3', desc: 'Chống ồn chủ động', price: '6.790.000đ' },
    { id: 6, name: 'iMac 24"', desc: 'Màn hình Retina 4.5K', price: '36.990.000đ' },
  ]
  
  export default function Products() {
    return (
      <section className="page">
        <h1>Sản phẩm</h1>
        <div className="card-grid">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <p className="price">{p.price}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }