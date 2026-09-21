/** Substrings of known third-party / DemoQA noise — not app regressions under test */
const IGNORED_UNCAUGHT_MESSAGES = [
  'ResizeObserver loop',
  'Non-Error promise rejection',
  'Script error',
  'google',
  'googlesyndication',
  'doubleclick',
  'adsbygoogle',
  'adplus',
]

export function isIgnoredDemoQAException(message: string | undefined): boolean {
  if (!message) {
    return false
  }
  const lower = message.toLowerCase()
  return IGNORED_UNCAUGHT_MESSAGES.some((fragment) => lower.includes(fragment.toLowerCase()))
}
