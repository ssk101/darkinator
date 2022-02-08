import {
  wait,
  camelCase,
} from './utils.js'

const queryOpts = { active: true, lastFocusedWindow: true }
const settings = Symbol('settings')

class Darkinator {
  async init() {
    this.settings = await this.local.get()

    document.body.querySelectorAll('.toggle')
      .forEach(toggle => {
        this.toggleAction(toggle, false)

        toggle.querySelector('input').addEventListener('input', async (e) => {
          await this.toggleAction(toggle)
        }, false)
      })
  }

  async sendAction(action) {
    const response = await this.send({
      action,
      settings: this.settings,
    })
  }

  async send(message) {
    try {
      const tabs = await chrome.tabs.query(queryOpts)
      if(!tabs?.[0]) return

      const response = await chrome.tabs.sendMessage(tabs[0].id, message)
    } catch (e) {
      console.warn(e)
    }
  }

  async toggleAction(toggle, flipState = true) {
    const input = toggle.querySelector('input')
    const { action } = input.dataset

    if(flipState) {
      this.settings[action] = !this.settings[action]
      await this.local.set({ [action]: this.settings[action] })
    }

    toggle.setAttribute('data-toggled', this.settings[action] || false)
    input.setAttribute('checked', this.settings[action] || false)

    this.sendAction(action)
  }

  get settings() {
    return this[settings] || {}
  }

  set settings(o) {
    this[settings] = o
  }

  get local() {
    return chrome.storage.local
  }

  get sync() {
    return chrome.storage.sync
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.darkinator = new Darkinator()
  window.darkinator.init()
}, false)