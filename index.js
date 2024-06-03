import express from 'express'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOMAIN = 'http://localhost'
const PORT = 3000
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/expenses-categories', (req, res) => res.json([
  { title: 'Supermercado', icon: 'fa-cart-shopping', id: 1, color: '#d25a5a' },
  { title: 'Restaurantes', icon: 'fa-utensils', id: 2, color: '#4999cb' },
  { title: 'Impuestos', icon: 'fa-file-invoice-dollar', id: 3, color: '#69bf9e' },
  { title: 'Movilidad', icon: 'fa-bus', id: 4, color: '#aa5bbd' },
  { title: 'Vestimenta', icon: 'fa-shirt', id: 5, color: '#bfa756' },
  { title: 'Otros', icon: 'fa-hand-holding-heart', id: 6, color: '#5d6ca2' },
]))

app.get('/income-categories', (req, res) => res.json([
  { title: 'Sueldo', icon: 'fa-sack-dollar', id: 7, color: '#61a530' },
  { title: 'Regalo', icon: 'fa-gift', id: 8, color: '#e87b06' },
  { title: 'Venta', icon: 'fa-store', id: 9, color: '#cd377d' },
  { title: 'Otros', icon: 'fa-hand-holding-dollar', id: 10, color: '#5659bf' },
]))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => console.log(`Server running on ${DOMAIN}:${PORT}`))
