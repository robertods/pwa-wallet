import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
import { getCategories } from './services/categories.js'
import createApp from './vendor/framework.js'

createApp({
  defaultView: '/balance',
  initialState: {
    user: 'Roberto',
    balance: 0,
    expenses: [],
    income: [],
    categories: await getCategories(),
    notifications: 0,
  },
  debug: true 
})
