
/**
 * @param str html innerHTML
 * @returns any html Element
 */
export const getHtmlElement = (htmlString: string): any => {
  const div: any = document.createElement('div')
  div.innerHTML = htmlString.trim()

  let id = ''

  if (div) {
    if (div.firstChild) {
      id = div.firstChild['id']
    }
  }

  id.replace('#', '')
  return document.querySelector(`#${id}`)
}
