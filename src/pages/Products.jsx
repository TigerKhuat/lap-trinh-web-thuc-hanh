import { useEffect, useState } from 'react'
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../api/products'

const emptyForm = { name: '', description: '', price: '' }
const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })

export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    listProducts(controller.signal)
      .then(({ data }) => setProducts(data))
      .catch(() => {
        if (!controller.signal.aborted) setError('Không thể tải danh sách sản phẩm.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [reload])

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  function refresh() {
    setError('')
    setLoading(true)
    setReload((value) => value + 1)
  }

  async function run(action, failureMessage) {
    setBusy(true)
    setError('')
    try {
      await action()
    } catch (requestError) {
      const validation = requestError.response?.data?.errors
      setError(validation ? Object.values(validation).flat().join(' ') : failureMessage)
    } finally {
      setBusy(false)
    }
  }

  function submit(event) {
    event.preventDefault()
    const product = { name: form.name.trim(), description: form.description.trim(), price: Number(form.price) }
    if (!product.name || !product.description) {
      setError('Hãy nhập tên và mô tả sản phẩm.')
      return
    }
    void run(async () => {
      if (editingId === null) {
        await createProduct(product)
      } else {
        await updateProduct(editingId, product)
      }
      resetForm()
      refresh()
    }, 'Không thể lưu sản phẩm.')
  }

  function edit(id) {
    void run(async () => {
      const { data } = await getProduct(id)
      setEditingId(id)
      setForm({ name: data.name, description: data.description, price: String(data.price) })
      document.getElementById('product-name')?.focus()
    }, 'Không thể mở sản phẩm để sửa.')
  }

  function remove(product) {
    if (!window.confirm(`Xóa sản phẩm “${product.name}”?`)) return
    void run(async () => {
      await deleteProduct(product.id)
      if (editingId === product.id) resetForm()
      refresh()
    }, 'Không thể xóa sản phẩm.')
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  return (
    <section className="page products-page">
      <h1>Sản phẩm</h1>
      <form className="contact-form" onSubmit={submit}>
        <h2>{editingId === null ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}</h2>
        <label htmlFor="product-name">Tên sản phẩm</label>
        <input id="product-name" name="name" value={form.name} onChange={updateField} required maxLength={120} />
        <label htmlFor="product-description">Mô tả</label>
        <textarea id="product-description" name="description" value={form.description} onChange={updateField} required maxLength={500} />
        <label htmlFor="product-price">Giá (VND)</label>
        <input id="product-price" name="price" type="number" min={0} max={2147483647} step={1} value={form.price} onChange={updateField} required />
        <div className="product-actions">
          <button className="btn" disabled={busy || loading}>{editingId === null ? 'Thêm' : 'Lưu thay đổi'}</button>
          {editingId !== null && <button type="button" disabled={busy} onClick={resetForm}>Hủy</button>}
        </div>
      </form>

      {error && <p className="product-message" role="alert">{error}</p>}
      {error && <button type="button" disabled={busy || loading} onClick={refresh}>Tải lại danh sách</button>}
      {loading && <p className="product-message" role="status">Đang tải sản phẩm…</p>}
      {!loading && !error && products.length === 0 && <p className="product-message">Chưa có sản phẩm.</p>}
      <div className="card-grid">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{currency.format(product.price)}</p>
            <div className="product-actions">
              <button type="button" disabled={busy || loading} onClick={() => edit(product.id)}>Sửa</button>
              <button type="button" disabled={busy || loading} onClick={() => remove(product)}>Xóa</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
