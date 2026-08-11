import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'
import App from './App.jsx'
import { HERO_CONTENT } from './constants/index.js'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: '100dvh',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            background: 'rgb(var(--bg-rgb))',
            color: 'rgb(var(--ink-rgb))',
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '28rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.75rem' }}>
              Fernado George — something went wrong.
            </h1>
            <p style={{ margin: '0 0 1.5rem', color: 'rgb(var(--ink-muted-rgb))' }}>
              This page hit an unexpected error. A reload usually fixes it.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: 'rgb(var(--accent-strong-rgb))',
                color: '#fff',
                border: 0,
                borderRadius: '0.5rem',
                padding: '0.625rem 1.25rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reload page
            </button>
            <p style={{ margin: '1.5rem 0 0', fontSize: '0.9rem' }}>
              <a
                href={`mailto:${HERO_CONTENT.altEmail}`}
                style={{ color: 'rgb(var(--accent-strong-rgb))' }}
              >
                Contact Fernado George
              </a>
            </p>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
