import { html } from '../vendor/framework.js';

export default function(data) {
  const categorias = [];
  const getIcon = idBuscado => categorias.find(obj => obj.id == idBuscado)?.icon || 'fa-star';

  return html`
    <ul class="list-group">
      ${data.map(op => html`
        <li class="list-group-item itx-list-item">
          <i class="fa-solid ${getIcon(op.category)} itx-icon itx-color-${op.category}"></i>
          <div>${op.detail}</div>
          <div>$ ${op.amount}</div>
        </li>
      `)}
    </ul>
  `;
}