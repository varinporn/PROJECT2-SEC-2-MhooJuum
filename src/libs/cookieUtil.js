class CookieUtil {
  static get(name) {
    let cookieName = `${encodeURIComponent(name)}=`,
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null
    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = decodeURIComponent(
        document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
      )
    }
    return cookieValue
  }

  static set(name, value, expires) {
    if (CookieUtil.get(name)) {
      return
    }
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    if (expires instanceof Date) {
      // console.log(expires)
      cookieText += `;expires=${expires}`
    }
    document.cookie = cookieText
    // console.log(document.cookie)
  }
  //to remove existing cookies, setting the cookie again—with the same path, domain, and secure options—and set its expiration date to some time in the past.
  static unset(name, path = '/', domain = '') {
    let cookieText = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
    // Only add domain if it is specified.
    if (domain) {
      cookieText += `; domain=${domain}`;
    }
    document.cookie = cookieText;
  }
} //ending class
export { CookieUtil }
