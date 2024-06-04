import { html, getGlobalState, setGlobalState, useState, navigate } from '../../vendor/framework.js'
import Layout from '../../layouts/wallet-layout.js'
import CategorySelector from '../../components/CategorySelector.js'

export default function() {

  const { balance, expenses, categories } = getGlobalState()
  const [ errorMsgs, setErrorMsgs ] = useState([])

  const saveExpense = e => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const errors = []

    const newExpense = {
      detail: formData.get('detail'),
      amount: Number(formData.get('amount')),
      category: formData.get('category'),
    }
  
    if(newExpense.detail.length === 0){
      errors.push("Detalle no puede quedar vacío")
    }
    if(typeof newExpense.amount !== "number"){
      errors.push("El monto debe ser un número")
    }

    if(errors.length === 0) {
      setGlobalState({ 
        expenses: [ ...expenses, newExpense ],
        balance: balance - newExpense.amount
      });
      e.target.reset();
      navigate("/expenses");
    }
    else {
      setErrorMsgs(errors)
    }
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
    ${errorMsgs.map(err => html`<p style="color:red">${err}</p>`)}
  `);

}
