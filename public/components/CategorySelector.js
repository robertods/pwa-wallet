import { html, ifDefined } from '../vendor/framework.js';

export default function CategorySelector({ categorias, value }) {
  
  const isChecked = v => ifDefined( v == value ? 'checked' : undefined);
  const getTitle = v => categorias.find(c=>c.id==v)?.title || "Ninguna";
  const updateTitle = e => document.getElementById('title-categoria').textContent = getTitle(e.target.value);

  return html`
    <strong id="title-categoria">${getTitle(value)}</strong><br>
    <div class="btn-group" role="group">
      ${categorias.map(c => html`
        <input type="radio" class="btn-check" name="categoria" id="category-${c.id}" autocomplete="off" value=${c.id} .checked=${isChecked(c.id)} @click=${updateTitle}>
        <label class="btn btn-outline-primary" for="category-${c.id}">
          <i class="fa-solid ${c.icon} itx-icon itx-color-${c.id}"></i>
        </label>
      `)}
    </div>
  `;
}