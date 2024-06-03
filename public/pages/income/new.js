import { html, getGlobalState, setGlobalState, navigate } from '../../vendor/framework.js'
import Layout from '../../layouts/wallet-layout.js'
import CategorySelector from '../../components/CategorySelector.js'

export default function() {

  const { balance, income, categories } = getGlobalState()

  const saveIncome = e => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const newIncome = {
      detail: formData.get('detail'),
      amount: Number(formData.get('amount')),
      category: formData.get('category'),
    }
  
    setGlobalState({ 
      income: [ ...income, newIncome ],
      balance: balance + newIncome.amount
    });

    e.target.reset();
    navigate("/income");
  }

  return Layout(html`
    <form @submit=${saveIncome} class="itx-form">
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
        ${CategorySelector({ categories: categories.income })}
      </label>
      <button class="btn btn-primary">Agregar ingreso</button>
    </form>
  `);

}
