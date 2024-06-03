import { html } from '../vendor/framework.js'

export default function({notifications}) {
  return html`
    <span class="position-absolute translate-middle rounded-pill badge bg-danger" style="top:5px;left:5px;">${notifications}</span>
  `
}