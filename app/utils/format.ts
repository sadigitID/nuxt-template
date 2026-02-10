/**
 * Format a date to a human-readable string.
 * Uses the browser's Intl.DateTimeFormat for locale-aware formatting.
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = 'en-US'
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(d)
}

/**
 * Format a number with thousand separators.
 */
export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value)
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
