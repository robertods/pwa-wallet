import { html, useEffect, useGlobalState } from '../../vendor/framework.js'
import Layaout from '../../layouts/wallet-layout.js'

export default function() {

  const [notifications, setNotifications] = useGlobalState('notifications')

  useEffect(() => {
    console.log('hola home')

    return () => {
      console.log("adios home")
    }
  })

  return Layaout(html`
    <h1>Hello</h1>
    <button @click=${e => setNotifications(notifications + 1)}>add</button>
  `);

}
