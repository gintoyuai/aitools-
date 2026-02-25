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

  // AI + Code
  { name: 'v0', category: 'AI + Code', url: 'https://v0.dev', domain: 'v0.dev', description: 'Generate React UI components from text with Vercel AI' },
  { name: 'Codeium', category: 'AI + Code', url: 'https://codeium.com', domain: 'codeium.com', description: 'Free AI code autocomplete and chat for any IDE' },
  { name: 'Tabnine', category: 'AI + Code', url: 'https://tabnine.com', domain: 'tabnine.com', description: 'Privacy-focused AI code completion for teams' },
  { name: 'Bolt', category: 'AI + Code', url: 'https://bolt.new', domain: 'bolt.new', description: 'Full-stack app builder in the browser powered by AI' },
  { name: 'Lovable', category: 'AI + Code', url: 'https://lovable.dev', domain: 'lovable.dev', description: 'Build and ship full-stack web apps by chatting with AI' },
  { name: 'Devin', category: 'AI + Code', url: 'https://devin.ai', domain: 'devin.ai', description: 'Autonomous AI software engineer for complex coding tasks' },
  { name: 'Windsurf', category: 'AI + Code', url: 'https://codeium.com/windsurf', domain: 'codeium.com', description: 'Agentic AI IDE that takes multi-step actions in your codebase' },

  // AI + Design
  { name: 'Adobe Firefly', category: 'AI + Design', url: 'https://firefly.adobe.com', domain: 'adobe.com', description: 'Generative AI for images and text effects inside Adobe apps' },
  { name: 'Ideogram', category: 'AI + Design', url: 'https://ideogram.ai', domain: 'ideogram.ai', description: 'AI image generation with accurate text rendering' },
  { name: 'Recraft', category: 'AI + Design', url: 'https://recraft.ai', domain: 'recraft.ai', description: 'Generate and edit vector art, icons and brand assets with AI' },
  { name: 'Kling AI', category: 'AI + Design', url: 'https://klingai.com', domain: 'klingai.com', description: 'High-quality AI image and video generation from Kuaishou' },
  { name: 'Framer AI', category: 'AI + Design', url: 'https://framer.com', domain: 'framer.com', description: 'Generate and publish websites with AI in Framer' },

  // AI + Video
  { name: 'Sora', category: 'AI + Video', url: 'https://sora.com', domain: 'openai.com', description: 'OpenAI text-to-video model for cinematic AI clips' },
  { name: 'HeyGen', category: 'AI + Video', url: 'https://heygen.com', domain: 'heygen.com', description: 'AI video generation with talking avatars and voice cloning' },
  { name: 'Luma Dream Machine', category: 'AI + Video', url: 'https://lumalabs.ai', domain: 'lumalabs.ai', description: 'Realistic AI video generation from text and images' },
  { name: 'Descript', category: 'AI + Video', url: 'https://descript.com', domain: 'descript.com', description: 'Edit video and podcasts by editing the transcript with AI' },
  { name: 'Captions', category: 'AI + Video', url: 'https://captions.ai', domain: 'captions.ai', description: 'AI-powered video creation and auto-captioning for creators' },

  // AI + Marketing
  { name: 'Perplexity', category: 'AI + Marketing', url: 'https://perplexity.ai', domain: 'perplexity.ai', description: 'AI search engine for real-time research and market insights' },
  { name: 'AdCreative.ai', category: 'AI + Marketing', url: 'https://adcreative.ai', domain: 'adcreative.ai', description: 'Generate conversion-focused ad creatives with AI' },
  { name: 'Instantly AI', category: 'AI + Marketing', url: 'https://instantly.ai', domain: 'instantly.ai', description: 'AI-powered cold email outreach and lead generation' },

  // AI + Audio
  { name: 'ElevenLabs', category: 'AI + Audio', url: 'https://elevenlabs.io', domain: 'elevenlabs.io', description: 'Ultra-realistic AI voice cloning and text-to-speech' },
  { name: 'Suno', category: 'AI + Audio', url: 'https://suno.com', domain: 'suno.com', description: 'Generate full songs with vocals and music from a text prompt' },
  { name: 'Udio', category: 'AI + Audio', url: 'https://udio.com', domain: 'udio.com', description: 'Create original music tracks with AI from text descriptions' },
  { name: 'Whisper', category: 'AI + Audio', url: 'https://openai.com/research/whisper', domain: 'openai.com', description: 'OpenAI speech recognition for accurate audio transcription' },
  { name: 'Cleanvoice AI', category: 'AI + Audio', url: 'https://cleanvoice.ai', domain: 'cleanvoice.ai', description: 'Remove filler words and silences from podcast recordings' },

  // AI + Productivity
  { name: 'Gemini', category: 'AI + Productivity', url: 'https://gemini.google.com', domain: 'google.com', description: 'Google AI assistant integrated with Workspace and search' },
  { name: 'Microsoft Copilot', category: 'AI + Productivity', url: 'https://copilot.microsoft.com', domain: 'microsoft.com', description: 'AI assistant built into Windows, Office and Edge' },
  { name: 'Mem', category: 'AI + Productivity', url: 'https://mem.ai', domain: 'mem.ai', description: 'AI-powered notes that self-organize and surface insights' },
  { name: 'Reclaim AI', category: 'AI + Productivity', url: 'https://reclaim.ai', domain: 'reclaim.ai', description: 'Smart calendar scheduling and time blocking with AI' },
  { name: 'Zapier AI', category: 'AI + Productivity', url: 'https://zapier.com', domain: 'zapier.com', description: 'Automate workflows across 6,000+ apps with AI actions' },

  // AI + Study
  { name: 'Khanmigo', category: 'AI + Study', url: 'https://khanacademy.org/khanmigo', domain: 'khanacademy.org', description: 'AI tutor by Khan Academy for guided learning and practice' },
  { name: 'Elicit', category: 'AI + Study', url: 'https://elicit.com', domain: 'elicit.com', description: 'AI research assistant for summarizing academic papers' },
  { name: 'Consensus', category: 'AI + Study', url: 'https://consensus.app', domain: 'consensus.app', description: 'Search and extract findings from scientific research with AI' },
  { name: 'NotebookLM', category: 'AI + Study', url: 'https://notebooklm.google.com', domain: 'google.com', description: 'AI notebook that answers questions about your uploaded sources' },

  // AI + Research
  { name: 'Perplexity Pro', category: 'AI + Research', url: 'https://perplexity.ai', domain: 'perplexity.ai', description: 'Deep research mode with cited, real-time web answers' },
  { name: 'You.com', category: 'AI + Research', url: 'https://you.com', domain: 'you.com', description: 'AI search with research mode, code execution and chat' },
  { name: 'Tavily', category: 'AI + Research', url: 'https://tavily.com', domain: 'tavily.com', description: 'AI-optimized search API for agents and research workflows' },
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
  } catch (_) { }
  return null
}

function saveOpenSections(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (_) { }
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
