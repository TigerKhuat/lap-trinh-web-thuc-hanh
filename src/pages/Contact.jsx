import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section className="page">
      <h1>Liên hệ</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Họ và tên" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" rows="5" placeholder="Nội dung" value={form.message} onChange={handleChange} required />
        <button type="submit" className="btn">Gửi</button>
      </form>
      {sent && <p className="success">Cảm ơn bạn, chúng tôi sẽ phản hồi sớm!</p>}
    </section>
  )
}