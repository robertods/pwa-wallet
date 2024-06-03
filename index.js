import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DOMAIN = process.env.DOMAIN || 'http://localhost'
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/expenses-categories', (req, res) => res.json([
  { title: 'Supermercado', icon: 'fa-cart-shopping', id: 1, color: '#d25a5a' },
  { title: 'Restaurantes', icon: 'fa-utensils', id: 2, color: '#4999cb' },
  { title: 'Impuestos', icon: 'fa-file-invoice-dollar', id: 3, color: '#69bf9e' },
  { title: 'Movilidad', icon: 'fa-bus', id: 4, color: '#aa5bbd' },
  { title: 'Vestimenta', icon: 'fa-shirt', id: 5, color: '#bfa756' },
  { title: 'Otros', icon: 'fa-hand-holding-heart', id: 6, color: '#5d6ca2' },
]))

app.get('/api/income-categories', (req, res) => res.json([
  { title: 'Sueldo', icon: 'fa-sack-dollar', id: 7, color: '#61a530' },
  { title: 'Regalo', icon: 'fa-gift', id: 8, color: '#e87b06' },
  { title: 'Venta', icon: 'fa-store', id: 9, color: '#cd377d' },
  { title: 'Otros', icon: 'fa-hand-holding-dollar', id: 10, color: '#5659bf' },
]))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () => console.log(`Server running on ${DOMAIN}:${PORT}`))
