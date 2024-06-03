import { html, getGlobalState, setGlobalState, navigate } from '../../vendor/framework.js'
import Layout from '../../layouts/wallet-layout.js'
import CategorySelector from '../../components/CategorySelector.js'

export default function() {

  const { balance, expenses, categories } = getGlobalState()

  const saveExpense = e => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const newExpense = {
      detail: formData.get('detail'),
      amount: Number(formData.get('amount')),
      category: formData.get('category'),
    }
  
    setGlobalState({ 
      expenses: [ ...expenses, newExpense ],
      balance: balance + newExpense.amount
    });

    e.target.reset();
    navigate("/income");
  }

  return Layout(html`
    <form @submit=${saveExpense} class="itx-form">
      <label>
        Detalle:
        <input type="text" name="detail" />
      </label>
      <label>
        Monto:
        <input type="number" name="amount" />
      </label>
      <label>
        Categoria:
        ${CategorySelector({ categories: categories.expenses })}
      </label>
      <button class="btn btn-primary">Agregar ingreso</button>
    </form>
  `);

}
