import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import ArticleCard from '../components/ArticleCard.jsx'

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  hero: {
    padding: '80px 48px 64px',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(ellipse 60% 50% at 80% 40%, rgba(232,197,71,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 10% 70%, rgba(79,195,247,0.04) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
  heroGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
    backgroundSize: '48px 48px',
    opacity: 0.25,
    pointerEvents: 'none',
  },
  heroLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: '20px',
    position: 'relative',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    fontWeight: 900,
    lineHeight: 1.1,
    maxWidth: '700px',
    position: 'relative',
    marginBottom: '16px',
  },
  heroSubtitle: {
    fontSize: '16px',
    color: 'var(--muted)',
    maxWidth: '520px',
    position: 'relative',
    fontWeight: 300,
  },
  main: {
    flex: 1,
    padding: '56px 48px 96px',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  },
  sectionLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
    marginBottom: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sectionLabelLine: {
    flex: 1,
    height: '1px',
    background: 'var(--border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  message: {
    textAlign: 'center',
    padding: '60px 0',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '13px',
  },
}

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/articles/articles.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        setArticles(sorted)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={styles.page}>
      <Header />

      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroGrid} />
        <p style={styles.heroLabel}>// publication</p>
        <h1 style={styles.heroTitle}>The AI Revolution</h1>
        <p style={styles.heroSubtitle}>
          Deep dives into AI engineering, Python architecture, and the tools shaping how we build software.
        </p>
      </section>

      <main style={styles.main}>
        <div style={styles.sectionLabel}>
          <span>Articles</span>
          <div style={styles.sectionLabelLine} />
        </div>

        {loading && (
          <p style={{ ...styles.message, color: 'var(--muted)' }}>Loading...</p>
        )}

        {error && (
          <p style={{ ...styles.message, color: 'var(--accent4)' }}>
            Failed to load articles: {error}
          </p>
        )}

        {!loading && !error && articles.length === 0 && (
          <p style={{ ...styles.message, color: 'var(--muted)' }}>No articles yet.</p>
        )}

        {!loading && !error && articles.length > 0 && (
          <div style={styles.grid}>
            {articles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
