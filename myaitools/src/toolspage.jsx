import { useState, useMemo } from 'react'
import './toolspage.css'

const CATEGORY_ORDER = [
  'AI + Code',
  'AI + Design',
  'AI + Video',
  'AI + Marketing',
  'AI + Study',
  'AI + Productivity',
]

const TOOLS_DATA = [
  { name: 'ChatGPT', category: 'AI + Code', url: 'https://chat.openai.com', domain: 'openai.com', description: 'Conversational AI for coding, writing and brainstorming' },
  { name: 'Claude', category: 'AI + Code', url: 'https://claude.ai', domain: 'anthropic.com', description: 'Helpful AI for analysis, writing and long documents' },
  { name: 'GitHub Copilot', category: 'AI + Code', url: 'https://github.com/features/copilot', domain: 'github.com', description: 'AI pair programmer that suggests code as you type' },
  { name: 'Cursor', category: 'AI + Code', url: 'https://cursor.com', domain: 'cursor.com', description: 'AI-first code editor built for pair programming' },
  { name: 'Replit AI', category: 'AI + Code', url: 'https://replit.com', domain: 'replit.com', description: 'Build, run and ship from browser with AI assist' },
  { name: 'Midjourney', category: 'AI + Design', url: 'https://midjourney.com', domain: 'midjourney.com', description: 'Image generation for art, logos and visuals from text' },
  { name: 'DALL·E', category: 'AI + Design', url: 'https://openai.com/dall-e-3', domain: 'openai.com', description: 'AI image generator that turns prompts into pictures' },
  { name: 'Figma AI', category: 'AI + Design', url: 'https://figma.com', domain: 'figma.com', description: 'Design and prototype with AI-powered features' },
  { name: 'Canva AI', category: 'AI + Design', url: 'https://canva.com', domain: 'canva.com', description: 'Create graphics and docs with Magic Design and AI' },
  { name: 'Runway', category: 'AI + Video', url: 'https://runwayml.com', domain: 'runwayml.com', description: 'AI video editing, gen-2 and motion tools' },
  { name: 'Pika', category: 'AI + Video', url: 'https://pika.art', domain: 'pika.art', description: 'Generate and edit videos with AI' },
  { name: 'Synthesia', category: 'AI + Video', url: 'https://synthesia.io', domain: 'synthesia.io', description: 'AI avatars and video from text scripts' },
  { name: 'Jasper', category: 'AI + Marketing', url: 'https://jasper.ai', domain: 'jasper.ai', description: 'AI copywriting for ads, blogs and campaigns' },
  { name: 'Copy.ai', category: 'AI + Marketing', url: 'https://copy.ai', domain: 'copy.ai', description: 'Generate marketing copy and content with AI' },
  { name: 'HubSpot AI', category: 'AI + Marketing', url: 'https://hubspot.com', domain: 'hubspot.com', description: 'CRM and marketing automation with AI insights' },
  { name: 'Notion AI', category: 'AI + Study', url: 'https://notion.so', domain: 'notion.so', description: 'Summarize, translate and write in your workspace' },
  { name: 'Quizlet', category: 'AI + Study', url: 'https://quizlet.com', domain: 'quizlet.com', description: 'Flashcards and study tools powered by AI' },
  { name: 'Grammarly', category: 'AI + Study', url: 'https://grammarly.com', domain: 'grammarly.com', description: 'Writing assistant for clarity and correctness' },
  { name: 'Notion', category: 'AI + Productivity', url: 'https://notion.so', domain: 'notion.so', description: 'All-in-one workspace with AI assist' },
  { name: 'Todoist', category: 'AI + Productivity', url: 'https://todoist.com', domain: 'todoist.com', description: 'Tasks and projects with smart scheduling' },
  { name: 'Otter.ai', category: 'AI + Productivity', url: 'https://otter.ai', domain: 'otter.ai', description: 'Meeting notes and transcription with AI' },
  { name: 'Gamma', category: 'AI + Productivity', url: 'https://gamma.app', domain: 'gamma.app', description: 'Create presentations and docs with AI' },
]

/** Local logos in public/logos (run: npm run download-logos) */
const LOGO_PATH = (domain) => `/logos/${domain}.png`

function ToolLogo({ tool }) {
  const [useFallback, setUseFallback] = useState(false)
  const src = LOGO_PATH(tool.domain)
  const initial = tool.name.charAt(0).toUpperCase()

  return (
    <div className="tool-logo" aria-hidden>
      {!useFallback ? (
        <img
          src={src}
          alt=""
          width={40}
          height={40}
          onError={() => setUseFallback(true)}
        />
      ) : (
        <span className="tool-logo-initial">{initial}</span>
      )}
    </div>
  )
}

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <a href="#hero" className="navbar-logo">
        AI + X
      </a>
    </nav>
  )
}

function Hero() {
  return (
    <header id="hero" className="hero" role="banner">
      <h1 className="hero-title">
        <span className="hero-title-gradient">Discover AI Tools For Everything</span>
      </h1>
      <p className="hero-subtext">AI + Code. AI + Design. AI + Life.</p>
    </header>
  )
}

const SECTION_ID = (category) => `section-${category.replace(/\s+/g, '-')}`

function CategorySection({ category, tools, isOpen, onToggle }) {
  return (
    <section className="category-block" aria-label={category}>
      <button
        type="button"
        className="category-block-heading"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={SECTION_ID(category)}
      >
        <span className="category-block-title">{category}</span>
        <span className="category-block-count">{tools.length}</span>
        <span className={`category-block-chevron ${isOpen ? 'open' : ''}`} aria-hidden>
          ▼
        </span>
      </button>
      <div
        id={SECTION_ID(category)}
        className={`category-block-content ${isOpen ? 'open' : ''}`}
        role="region"
        aria-hidden={!isOpen}
      >
        <div className="category-block-inner">
          <ul className="tools-grid" role="list">
            {tools.map((tool) => (
              <li key={`${tool.name}-${tool.category}`}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ToolCard({ tool }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    if (tool.url) window.open(tool.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <article
      className="tool-card"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="tool-tooltip" role="tooltip">
          {tool.description}
        </div>
      )}
      <button
        type="button"
        className="tool-card-inner"
        onClick={handleClick}
        aria-label={`Open ${tool.name} — ${tool.description}`}
      >
        <ToolLogo tool={tool} />
        <h3 className="tool-name">{tool.name}</h3>
      </button>
    </article>
  )
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p className="footer-text">
        <span className="footer-brand">AI + X</span> — Curated AI tools. Use responsibly.
      </p>
    </footer>
  )
}

function groupToolsByCategory() {
  const map = {}
  for (const cat of CATEGORY_ORDER) {
    map[cat] = TOOLS_DATA.filter((t) => t.category === cat)
  }
  return map
}

const TOOLS_BY_CATEGORY = groupToolsByCategory()
const STORAGE_KEY = 'aix-open-sections'

function loadOpenSections() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed === 'object' && parsed !== null) {
      const out = {}
      for (const c of CATEGORY_ORDER) {
        out[c] = parsed[c] !== false
      }
      return out
    }
  } catch (_) {}
  return null
}

function saveOpenSections(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) {}
}

export default function Toolspage() {
  const [openSections, setOpenSections] = useState(() => {
    const saved = loadOpenSections()
    return saved ?? Object.fromEntries(CATEGORY_ORDER.map((c) => [c, true]))
  })

  const toggleSection = (category) => {
    setOpenSections((prev) => {
      const next = { ...prev, [category]: !prev[category] }
      saveOpenSections(next)
      return next
    })
  }

  const expandAll = () => {
    const next = Object.fromEntries(CATEGORY_ORDER.map((c) => [c, true]))
    setOpenSections(next)
    saveOpenSections(next)
  }

  const collapseAll = () => {
    const next = Object.fromEntries(CATEGORY_ORDER.map((c) => [c, false]))
    setOpenSections(next)
    saveOpenSections(next)
  }

  const allOpen = CATEGORY_ORDER.every((c) => openSections[c])
  const allClosed = CATEGORY_ORDER.every((c) => !openSections[c])

  return (
    <div className="page">
      <div className="page-bg" aria-hidden />
      <Navbar />
      <Hero />
      <main className="content" id="tools">
        <div className="content-header">
          <h2 className="section-title">Tools</h2>
          <div className="section-actions">
            <button
              type="button"
              className="section-action-btn"
              onClick={expandAll}
              aria-pressed={allOpen}
              disabled={allOpen}
            >
              Expand all
            </button>
            <button
              type="button"
              className="section-action-btn"
              onClick={collapseAll}
              aria-pressed={allClosed}
              disabled={allClosed}
            >
              Collapse all
            </button>
          </div>
        </div>
        {CATEGORY_ORDER.map((category) => (
          <CategorySection
            key={category}
            category={category}
            tools={TOOLS_BY_CATEGORY[category] || []}
            isOpen={openSections[category]}
            onToggle={() => toggleSection(category)}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}
