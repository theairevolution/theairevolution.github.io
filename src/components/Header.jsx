import { Link } from 'react-router-dom'

const styles = {
  header: {
    height: 'var(--header-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexShrink: 0,
  },
  logo: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
  },
  logoSpan: {
    color: 'var(--muted)',
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
  },
  backLink: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--accent2)',
  },
}

export default function Header({ backTo, backLabel }) {
  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        The AI Revolution<span style={styles.logoSpan}>.blog</span>
      </Link>
      <nav style={styles.nav}>
        {backTo ? (
          <Link to={backTo} style={styles.backLink}>
            ← {backLabel ?? 'Back'}
          </Link>
        ) : (
          <Link to="/" style={styles.navLink}>Articles</Link>
        )}
      </nav>
    </header>
  )
}
