export default function Home() {
    return (
      <>
        <section className="hero">
          <h1>iPhone 17 Pro</h1>
          <p>Mạnh mẽ. Đẳng cấp. Chuyên nghiệp.</p>
          <a href="/products" className="btn">Mua ngay</a>
        </section>
  
        <section className="featured">
          <h2>Sản phẩm nổi bật</h2>
          <div className="card-grid">
            <div className="card"><h3>iPhone</h3><p>Điện thoại thông minh</p></div>
            <div className="card"><h3>MacBook</h3><p>Laptop hiệu năng cao</p></div>
            <div className="card"><h3>iPad</h3><p>Máy tính bảng đa năng</p></div>
            <div className="card"><h3>Apple Watch</h3><p>Đồng hồ thông minh</p></div>
          </div>
        </section>
      </>
    )
  }