import { html, useGlobalState, navigate } from '../../vendor/framework.js'
import Layaout from '../../layouts/wallet-layout.js'

export default function() {

  const [balance, setBalance] = useGlobalState('balance')
  const [ categories ] = useGlobalState('categorias')

  const saveIncome = e => {
    e.preventDefault();
    const { ingresos, saldo } = getState()

    const formData = new FormData(e.target)

    const newIncome = {
      detail: formData.get('detail'),
      amount: formData.get('amount'),
      category: formData.get('category'),
    }
  
    setState({ 
      ingresos: [ ...ingresos, newIncome ],
      saldo: saldo + newIncome.value
    });

    e.target.reset();
    navigate("/income");
  }

  return Layaout(html`
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
