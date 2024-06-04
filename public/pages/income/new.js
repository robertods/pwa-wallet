import { html, getGlobalState, setGlobalState, navigate, useState } from '../../vendor/framework.js'
import Layout from '../../layouts/wallet-layout.js'
import CategorySelector from '../../components/CategorySelector.js'

export default function() {

  const { balance, income, categories } = getGlobalState()
  const [ errorMsgs, setErrorMsgs ] = useState([])

  const saveIncome = e => {
    e.preventDefault();
    const errors = []
    const formData = new FormData(e.target)

    const newIncome = {
      detail: formData.get('detail'),
      amount: Number(formData.get('amount')),
      category: formData.get('category'),
    }

    if(newIncome.detail.length === 0){
      errors.push("Detalle no puede quedar vacío")
    }
    if(typeof newIncome.amount !== "number"){
      errors.push("El monto debe ser un número")
    }
  
    if(errors.length === 0) {
      setGlobalState({ 
        income: [ ...income, newIncome ],
        balance: balance + newIncome.amount
      });
      e.target.reset();
      navigate("/income");
    }
    else {
      setErrorMsgs(errors)
    }
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
    ${errorMsgs.map(err => html`<p style="color:red">${err}</p>`)}
  `);

}
