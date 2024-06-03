import { html, useGlobalState } from '../../vendor/framework.js'
import Layaout from '../../layouts/wallet-layout.js'

export default function() {


  return Layaout(html`
    <h1>Hello</h1>
    <button @click=${e => setNotifications(notifications + 1)}>add</button>
  `);

}
