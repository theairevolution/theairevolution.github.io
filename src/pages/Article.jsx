import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    height: '100dvh',
    overflow: 'hidden',
  },
  centered: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted)',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '13px',
  },
  iframeWrap: {
    flex: 1,
    overflow: 'hidden',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
    background: 'var(--bg)',
  },
}

export default function Article() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/articles/articles.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(a => a.slug === slug)
        if (found) {
          setArticle(found)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div style={styles.page}>
        <Header backTo="/" backLabel="All Articles" />
        <div style={styles.centered}>Loading...</div>
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div style={styles.page}>
        <Header backTo="/" backLabel="All Articles" />
        <div style={styles.centered}>Article not found.</div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <Header backTo="/" backLabel="All Articles" />
      <div style={styles.iframeWrap}>
        <iframe
          src={`/articles/${article.file}`}
          style={styles.iframe}
          title={article.title}
          loading="eager"
        />
      </div>
    </div>
  )
}
