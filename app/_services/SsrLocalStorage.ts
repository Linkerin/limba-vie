/**
 * A class representing `localStorage` standard methods
 * with a client-side check necessary for Next.js and similar frameworks
 */
class SsrLocalStorage {
  /**
   * Behaviour is similar to `localStorage.setItem()`.
   * Sets the value of the pair identified by key to value,
   * creating a new key/value pair if none existed for key previously.
   * Checks if `window` and `localStorage` are defined before calling.
  
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem | MDN | Storage.getItem()}
   * 
   *
   * @param {string} key - The key to set the value for
   * @param {string} value - The value to set
   * @returns {boolean} `true` if the value was set, `false` otherwise
   */
  setItem(key: string, value: string): boolean {
    if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
      localStorage.setItem(key, value);
      return true;
    }

    return false;
  }

  /**
   * Behaviour is similar to `localStorage.getItem()`.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem | MDN | Storage.getItem()}
   *
   * @param {string} key - The key to get the value for
   * @returns {string | null} The value associated with the key or `null`
   */
  getItem(key: string): string | null {
    if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Behaviour is similar to `localStorage.removeItem()`.
   * Removes the key/value pair with the given key,
   * if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem | MDN | Storage.removeItem()}
   *
   * @param {string} key - The key identifying the key/value pair to remove
   * @returns {boolean} `true` if the key/value pair was successfully removed, `false` otherwise
   */
  removeItem(key: string): boolean {
    if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
      localStorage.removeItem(key);
      return true;
    }

    return false;
  }
}

/**
 * A class instance representing `localStorage` standard methods
 * with a client-side check necessary for Next.js and similar frameworks
 */
const ssrLocalStorage = new SsrLocalStorage();

export default ssrLocalStorage;
