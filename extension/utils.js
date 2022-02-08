export async function wait(delay = 1000) {
  await new Promise(resolve => setTimeout(() => resolve(), delay))
}

export function camelCase(str) {
  return sentenceCase(str)
    .replace(/\s(.)/g, (_, match) => match.toUpperCase())
}

export function sentenceCase(str) {
  str ??= ''

  return str
    .replace(/([A-Z])/g, (_, match) => ' ' + match.toLowerCase())
    .replace(/[_\- ]+(.)/g, ' $1')
    .trim()
}