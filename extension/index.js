document.addEventListener('DOMContentLoaded', () => {
  const button = document.body.querySelector('#darkinate')

  button.addEventListener('click', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: 'toggle' })
    })
  }, false)
}, false)

