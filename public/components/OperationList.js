import { html, useGlobalState } from '../vendor/framework.js';

export default function(data) {
  const categorias = [];
  const getIcon = idBuscado => categorias.find(obj => obj.id == idBuscado).icon;

  return html`
    <ul class="list-group">
      ${data.map(op => html`
        <li class="list-group-item itx-list-item">
          <i class="fa-solid ${getIcon(op.categoria)} itx-icon itx-color-${op.categoria}"></i>
          <div>${op.detalle}</div>
          <div>$ ${op.monto}</div>
        </li>
      `)}
    </ul>
  `;
}