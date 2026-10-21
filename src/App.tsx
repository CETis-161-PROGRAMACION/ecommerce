import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from '@/context/AppProvider'
import { router } from '@/router'

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === null
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : savedTheme === 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <AppProvider>
      <RouterProvider router={router} />
      <button
        type="button"
        aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
        aria-pressed={isDark}
        title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
        onClick={() => setIsDark((currentTheme) => !currentTheme)}
        className="fixed right-4 top-4 z-50 flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
      >
        {isDark ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M20.9 13.1A8.5 8.5 0 0 1 10.9 3.1 8.5 8.5 0 1 0 20.9 13.1Z" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
        )}
      </button>
    </AppProvider>
  )
}
