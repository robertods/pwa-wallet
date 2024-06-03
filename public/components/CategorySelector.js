import { html, ifDefined, useState } from '../vendor/framework.js';

export default function CategorySelector({ categories, value }) {
  
  const getTitle = v => categories.find(c => c.id == v)?.title || "Ninguna";

  const [selected, setSelected] = useState(value)
  const isChecked = v => ifDefined( v == selected ? 'checked' : undefined);
  const updateTitle = e => setSelected(e.target.value);
  
  return html`
    <strong class="titleCategory">${getTitle(selected)}</strong><br>
    <div class="btn-group" role="group">
      ${categories.map(({ id, icon }) => {
        console.log(selected, id, id == selected ? 'checked' : undefined)
        return html`
        <label class="btn btn-outline-primary">
          <input type="radio" class="btn-check" name="category" autocomplete="off" value=${id} .checked=${isChecked(id)} @click=${updateTitle} />
          <i class="fa-solid ${icon} itx-icon itx-color-${id}"></i>
        </label>
      `})}
    </div>
  `;
}