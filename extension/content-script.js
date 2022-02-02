function isDarkinated() {
  return Boolean(+(localStorage.getItem('darkinated') || 0))
}

function toggleDarkinate(state) {
  localStorage.setItem('darkinated', Number(!isDarkinated()))
  applyState()
}

function applyState() {
  const filterVal = (darkinated = isDarkinated()) => {
    return darkinated ? 'invert(1)' : 'initial'
  }

  const style = `
    :root {
      filter: ${filterVal()}
    }
    iframe :root {
      filter: ${filterVal()}
    }
    img, video, svg, canvas, object {
      filter: ${filterVal()}
    }
  `
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