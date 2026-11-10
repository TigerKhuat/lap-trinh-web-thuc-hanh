import { NavLink } from 'react-router'

export default function Header() {
  return (
    <header className="header">
      <div className="logo"></div>
      <nav>
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/products">Sản phẩm</NavLink>
        <NavLink to="/about-us">Giới thiệu</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
      </nav>
    </header>
  )
}