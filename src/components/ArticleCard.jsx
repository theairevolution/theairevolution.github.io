import { Link } from 'react-router-dom'
import { useState } from 'react'

const TAG_COLORS = {
  python: 'var(--accent)',
  api: 'var(--accent2)',
  rest: 'var(--accent)',
  websocket: 'var(--accent2)',
  grpc: 'var(--accent5)',
  architecture: 'var(--accent3)',
  ai: 'var(--accent3)',
  llm: 'var(--accent3)',
  ml: 'var(--accent5)',
}

function tagColor(tag) {
  return TAG_COLORS[tag.toLowerCase()] ?? 'var(--muted)'
}

const styles = {
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '28px 28px 24px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'pointer',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'var(--accent)',
  },
  date: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--muted)',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    color: 'var(--text)',
  },
  description: {
    fontSize: '14px',
    color: 'var(--muted)',
    lineHeight: 1.6,
    flexGrow: 1,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '4px',
  },
  tag: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '10px',
    padding: '3px 10px',
    border: '1px solid var(--border)',
    borderRadius: '2px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
}

export default function ArticleCard({ article }) {
  const { slug, title, date, description, tags } = article
  const [hovered, setHovered] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <Link
      to={`/articles/${slug}`}
      style={{
        ...styles.card,
        borderColor: hovered ? 'var(--accent)' : 'var(--border)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.topBar} />
      <span style={styles.date}>{formattedDate}</span>
      <h2 style={styles.title}>{title}</h2>
      {description && <p style={styles.description}>{description}</p>}
      {tags?.length > 0 && (
        <div style={styles.tags}>
          {tags.map(tag => (
            <span key={tag} style={{ ...styles.tag, color: tagColor(tag) }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
