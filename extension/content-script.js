function isDarkinated() {
  return Boolean(+(localStorage.getItem('darkinated') || 0))
}

function toggleDarkinate(state) {
  localStorage.setItem('darkinated', Number(!isDarkinated()))
  applyState()
}

function applyState() {
  const style = `html { filter: ${isDarkinated() ? 'invert(1)' : 'initial'} }`
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(style)
  document.adoptedStyleSheets = [sheet]
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === 'toggle') {
      localStorage.setItem('darkinated', Number(!isDarkinated()))
      applyState()
      sendResponse({ isDarkinated: isDarkinated() })
    }
  }
)

applyState()