import { html, ifDefined, navigate } from '../vendor/framework.js';

export default function() {
  const isChecked = p => ifDefined(p == window.location.pathname ? 'checked' : undefined);

  return html`
    <div class="btn-group" role="group">
      <input type="radio" class="btn-check" name="btnradio" id="btngastos" autocomplete="off" .checked=${isChecked('/')} @click=${e => navigate('/')}>
      <label class="btn btn-outline-primary" for="btngastos">Gastos</label>
      
      <input type="radio" class="btn-check" name="btnradio" id="btningresos" autocomplete="off" .checked=${isChecked('/income')} @click=${e => navigate('/income')}>
      <label class="btn btn-outline-primary" for="btningresos">Ingresos</label>
    </div>
  `;
}
