import { html, useGlobalState } from '../vendor/framework.js'
import Badge from '../components/Badge.js'

export default function(content) {

  const [notifications] = useGlobalState('notifications')

  return html`
    <header>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#/">PWA Wallet</a>
          <button type="button" class="btn btn-dark position-relative">
            <i class="fa-solid fa-bell"></i>
            ${notifications ? Badge({notifications}) : ''}
          </button>
        </div>
      </nav>
    </header>
    <main class="itx-container">
      ${content}
    </main>
    <footer class="itx-footer">&copy; 2024</footer>
  `
}