/**
 * クッキーの値を取得する
 * @param {String} searchKey 検索するキー
 * @returns {String} キーに対応する値
 */
export function getCookieValue (searchKey) {
    if (typeof searchKey === 'undefined') {
        return ''
    }

    let val = ''

    // document.cookieによってクッキーが取得できる
    document.cookiesplit(';').forEach(cookie => {
        const [key, value] = cookie.split('=')
        if (key === searchKey) {
            return val = value
        }
    })

    return val
}

export const OK = 200
export const CREATED = 201
export const INRERNAL_SERVER_ERROR = 500
export const UNPROCESSABLE_ENITITY = 422
export const UNAUTHORIZED = 419
export const NOT_FOUND = 404
