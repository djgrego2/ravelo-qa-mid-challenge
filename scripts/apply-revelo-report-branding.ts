import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'cypress/reports/html/index.html')
const cssPath = path.join(root, 'cypress/reports/branding/revelo-report.css')
const logoPath = path.join(root, 'cypress/reports/branding/revelo-logo.svg')

export function applyReveloReportBranding() {
  if (!fs.existsSync(htmlPath)) {
    return
  }

  const css = fs.readFileSync(cssPath, 'utf8')
  const logoSvg = fs.readFileSync(logoPath, 'utf8')
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`

  const banner = `
<div id="revelo-report-banner">
  <img src="${logoDataUri}" alt="Revelo" />
  <span class="revelo-report-subtitle">QA automation challenge · DemoQA · Cypress + Cucumber</span>
</div>`

  const injection = `<style id="revelo-report-brand">${css}</style>`

  let html = fs.readFileSync(htmlPath, 'utf8')

  if (html.includes('id="revelo-report-brand"')) {
    html = html.replace(/<style id="revelo-report-brand">[\s\S]*?<\/style>/, injection)
    html = html.replace(
      /<div id="revelo-report-banner">\s*<img[\s\S]*?<\/div>/,
      banner.trim(),
    )
  } else {
    html = html.replace('</head>', `${injection}</head>`)
    html = html.replace(/<body([^>]*)>/, `<body$1>${banner}`)
  }

  fs.writeFileSync(htmlPath, html, 'utf8')
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  applyReveloReportBranding()
}
