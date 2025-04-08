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

  static set(name, value, expires, path = '/') {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
    if (expires instanceof Date) {
      cookieText += `;expires=${expires.toUTCString()}`
    }
    cookieText += `;path=${path}`
    document.cookie = cookieText
  }
  //to remove existing cookies, setting the cookie again—with the same path, domain, and secure options—and set its expiration date to some time in the past.
  static unset(name) {
    const base = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  
    // Try both with and without path
    document.cookie = `${base}; path=/`;
    document.cookie = `${base}; path=`;
  
    // Optional: also try domain if applicable (be cautious!)
    // document.cookie = `${base}; path=/; domain=.example.com`;
  }
} //ending class
export { CookieUtil }
