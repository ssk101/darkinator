function applyStyles(style) {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(style)
  document.adoptedStyleSheets = [sheet]
}

const actions = {
  darkinate: function(settings) {
    const filter = settings.darkinate ? 'invert(1)' : 'initial'
    const style = `
      :root body {
        filter: ${filter}
      }
      iframe :root body {
        filter: ${filter}
      }
      img, video, svg, canvas, object, map {
        filter: ${filter}
      }
    `

    return applyStyles(style)
  }
}

chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  const { action, settings, data = {} } = req

  console.log(settings)

  if(Object.keys(actions).includes(action)) {
    actions[action](settings, data)
  }
})
