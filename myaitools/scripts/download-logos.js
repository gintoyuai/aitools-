/**
 * Downloads tool logos into public/logos/
 * Tries Clearbit first, then Google favicon as fallback.
 * Run: node scripts/download-logos.js   or   npm run download-logos
 */

import { mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LOGOS_DIR = join(__dirname, '..', 'public', 'logos')

const DOMAINS = [
  'openai.com',
  'anthropic.com',
  'github.com',
  'cursor.com',
  'replit.com',
  'midjourney.com',
  'figma.com',
  'canva.com',
  'runwayml.com',
  'pika.art',
  'synthesia.io',
  'jasper.ai',
  'copy.ai',
  'hubspot.com',
  'notion.so',
  'quizlet.com',
  'grammarly.com',
  'todoist.com',
  'otter.ai',
  'gamma.app',
]

async function downloadUrl(url, domain) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) return null
  return Buffer.from(await res.arrayBuffer())
}

async function downloadLogo(domain) {
  try {
    let buf = await downloadUrl(`https://logo.clearbit.com/${domain}`, domain)
    if (!buf) {
      buf = await downloadUrl(
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        domain
      )
    }
    if (!buf || buf.length < 100) {
      console.warn(`  ✗ ${domain} (no image)`)
      return false
    }
    const filepath = join(LOGOS_DIR, `${domain}.png`)
    await writeFile(filepath, buf)
    console.log(`  ✓ ${domain}`)
    return true
  } catch (err) {
    console.warn(`  ✗ ${domain}`, err.message)
    return false
  }
}

async function main() {
  await mkdir(LOGOS_DIR, { recursive: true })
  console.log('Downloading logos to public/logos/\n')
  let ok = 0
  for (const domain of DOMAINS) {
    const success = await downloadLogo(domain)
    if (success) ok++
  }
  console.log(`\nDone. ${ok}/${DOMAINS.length} logos saved.`)
}

main().catch(console.error)
