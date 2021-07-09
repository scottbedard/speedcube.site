/**
 * Format a number of milliseconds as time
 */
export function formatTime(time: number) {
  const centiseconds = Math.floor(time % 1000 / 10).toString().padStart(2, '0')
  const seconds = Math.floor(time / 1000) % 60

  if (time < 60000) {
    return `${seconds}.${centiseconds}`
  }
  
  const minutes = Math.floor(time / 60000)

  return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds}`
}
