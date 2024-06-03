/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FRAMEWORK! by https://github.com/robertods
// Disclaimer: This framework is for educational purposes only and is not recommended for a productive application.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { html, render } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.3/lit-html.min.js';
import { ifDefined } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.3/directives/if-defined.js';
import notFound from '../pages/404/index.js'

const globalState = {}
const state = {}
const mount = {}

//--- PUBLIC -------------------------------------------------------------------------------

export default function createApp({ initialState={}, defaultView='/home', debug=false }) {
  
  // crea el state global
  const recovery = JSON.parse(localStorage.getItem('__state__'))
  recovery 
    ? Object.keys(recovery).forEach(prop => globalState[prop] = recovery[prop])
    : Object.keys(initialState).forEach(prop => globalState[prop] = initialState[prop])
  localStorage.setItem('__state__', JSON.stringify(globalState))

  // almacena la vista por defecto para el router
  router.defaultView = defaultView

  // Escucha los cambios en la barra de dirección del navegador
  window.addEventListener('popstate', router)

  // lanza el router en la primera carga de index.html
  router()

  // todas los elemento <a> hacia mi dominio, usan el router
  document.addEventListener('click', e => {
    if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
      e.preventDefault()
      window.history.pushState(null, '', e.target.href)
      router()
    }
  })

  // habilita la función debugFramework en la consola del navegador
  debug && (window.debugFramework = debugFramework)
}

export function renderPage(component) {
  render(component, document.getElementById('root'))
}

export function navigate(href) {
  window.history.pushState(null, '', href)
  router()
}

export function useGlobalState(key) {

  function setState(newValue) {
    globalState[key] = newValue
    localStorage.setItem('__state__', JSON.stringify(globalState))
    router()
  }

  function getState() {
    return globalState[key]
  }

  return [getState(), setState]
}

export function useState(initialValue) {
  const info = getCallerInfo()
  const key = (getPathname() + '__' + info.lineNumber).replace(info.origin+'/', '')

  if (!(key in state)) {
    state[key] = initialValue
  }

  function setState(newValue) {
    state[key] = newValue
    router()
  }

  function getState() {
    return state[key]
  }

  return [getState(), setState]
}

export function useEffect(effect) {
  const info = getCallerInfo()
  const key = getPathname().replace(info.origin+'/', '')

  if (!(key in mount)) {
    mount[key] = effect
  }
}

export function debugFramework() {
  console.log("global", globalState)
  console.log("state", state)
  console.log("effect", mount)
  console.log("prevPage", router.prevPage, router.unmount)
}

export { html, ifDefined }

//--- PRIVATE ------------------------------------------------------------------------------

async function router() {
  let page = getPathname()
  const [ , viewName, ...params] = page.split('/')
  const [id, action] = params

  try {
    // determina si la vista cambió
    const prevPage = router.prevPage || null
    const changedPage = page !== prevPage
    router.prevPage = changedPage ? page : prevPage
    
    // si cambió de vista, ejecuta el desmontaje de la vista anterior
    if(changedPage && typeof router.unmount === 'function') {
      router.unmount()
      router.unmount = null
    }
    
    // renderiza la nueva vista
    const fileName = action || (isNumber(id) ? "[id]" : (id || "index"));
    const { default:view } = await import(`/pages/${viewName}/${fileName}.js`) 
    renderPage(view(...params))

    // ejecuta el montaje de la nueva vista y almacena el desmontaje
    if(changedPage && mount[page] && typeof mount[page] === 'function') {
      router.unmount = await mount[page]()
    }
  }
  catch(err) {
    renderPage(notFound())
    console.error(err)
  }
}

function getPathname() {
  let { pathname } = window.location
  return pathname === '/' ? router.defaultView : pathname
}

function isNumber(nro){
  return nro && nro.match(/[0-9]+/)
}

function getCallerInfo() {
  const error = new Error();
  const stackLines = error.stack.split('\n');
  const callerStackLine = stackLines[3];
  const { origin } = window.location
  const match = callerStackLine.match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) || callerStackLine.match(/at\s+(.*):(\d+):(\d+)/);
  if (match) {
    const filePath = match[2];
    const lineNumber = match[3];
    return { origin, filePath, lineNumber };
  }
  return { filePath: 'unknown', lineNumber: 'unknown' };
}