/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FRAMEWORK! by https://github.com/robertods
// Disclaimer: This framework is for educational purposes only and is not recommended for a productive application.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { html, render } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.3/lit-html.min.js';
import { ifDefined } from 'https://cdn.jsdelivr.net/npm/lit-html@3.1.3/directives/if-defined.js';
import notFound from '../pages/404/index.js'

let globalState = {}
const state = {}

//--- PUBLIC -------------------------------------------------------------------------------

export default function createApp({ initialState={}, defaultView='/home', debug=false }) {

  createGlobalState(initialState)
  router.defaultView = defaultView
  window.addEventListener('popstate', router)
  router()

  document.addEventListener('click', e => {
    if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
      e.preventDefault()
      window.history.pushState(null, '', e.target.href)
      router()
    }
  })

  debug && (window.debugFramework = debugFramework)
}

export function navigate(href) {
  window.history.pushState(null, '', href)
  router()
}

export function getGlobalState() {
  return globalState
}

export function setGlobalState(newValue) {
  globalState = { ...globalState, ...newValue }
  localStorage.setItem('__state__', JSON.stringify(globalState))
  router()
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

export function debugFramework() {
  console.log("global", globalState)
  console.log("state", state)
}

export { html, ifDefined }

//--- PRIVATE ------------------------------------------------------------------------------

function createGlobalState(initialState) {
  const recovery = JSON.parse(localStorage.getItem('__state__'))
  globalState = { ...initialState, ...recovery }
  localStorage.setItem('__state__', JSON.stringify(globalState))
}

async function router() {
  const page = getPathname()
  const [ , pageFolder, ...params] = page.split('/')
  const [id, action] = params

  try {

    Object.keys(state).forEach(prop => {
      const [aux] = prop.split('__')
      if(aux !== getPathname()){
        delete state[prop]
      }
    })

    const fileName = action || (isNumber(id) ? "[id]" : (id || "index"));
    const { default:view } = await import(`/pages/${pageFolder}/${fileName}.js`) 
    renderPage(view(...params))
  }
  catch(err) {
    renderPage(notFound())
    console.error(err)
  }
}

function getPathname() {
  const { pathname } = window.location
  return pathname === '/' ? router.defaultView : pathname
}

function renderPage(component) {
  render(component, document.getElementById('root'))
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
