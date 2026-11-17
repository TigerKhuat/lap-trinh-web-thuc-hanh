import axios from 'axios'

const api = axios.create({ baseURL: '/api/products', timeout: 10000 })

export const listProducts = (signal) => api.get('', { signal })
export const getProduct = (id) => api.get(`/${id}`)
export const createProduct = (product) => api.post('', product)
export const updateProduct = (id, product) => api.put(`/${id}`, product)
export const deleteProduct = (id) => api.delete(`/${id}`)
