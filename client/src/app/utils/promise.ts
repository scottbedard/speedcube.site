
/**
 * Slow a promise to atleast some number of milliseconds.
 */
export function slow<T>(p: Promise<T>, duration: number) {
  return new Promise<T>((resolve, reject) => {
    Promise.all([p, timeout(duration)])
      .then(([value]) => resolve(value))
      .catch(err => reject(err))
  })
}

/**
 * Create a promise that resolves after some amount of time
 */
export function timeout(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
