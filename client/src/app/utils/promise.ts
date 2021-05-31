/**
 * Create a promise that resolves after some amount of time
 */
export function timeout(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}
