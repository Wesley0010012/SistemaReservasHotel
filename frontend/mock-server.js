const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const ROOT_DIR = __dirname
const PORT = Number(process.env.MOCK_PORT ?? 8081)
const HOST = process.env.MOCK_HOST ?? '0.0.0.0'
const MOCK_ROUTES = new Set([
  '/',
  '/quartos',
  '/promocoes',
  '/politicas-cancelamento',
  '/reservas',
  '/pagamentos',
  '/notificacoes',
  '/relatorios',
])
const MOCK_ROUTE_PATTERN = /^\/(quartos|promocoes|politicas-cancelamento|reservas|pagamentos|notificacoes|relatorios)(\/(add|update\/[0-9]+))?$/

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const pathname = normalizePath(url.pathname)
  const filePath = resolveFilePath(pathname)

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500, {
        'Content-Type': 'text/plain; charset=utf-8',
      })
      response.end(error.code === 'ENOENT' ? 'Arquivo nao encontrado' : 'Falha ao servir mock')
      return
    }

    response.writeHead(200, {
      'Content-Type': MIME_TYPES[path.extname(filePath)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    response.end(content)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`Mock frontend running at http://localhost:${PORT}`)
})

function resolveFilePath(pathname) {
  if (MOCK_ROUTES.has(pathname) || MOCK_ROUTE_PATTERN.test(pathname)) {
    return path.join(ROOT_DIR, 'mock', 'index.html')
  }

  const normalized = pathname.replace(/^\/+/, '')
  const candidate = path.resolve(ROOT_DIR, normalized)

  if (!candidate.startsWith(ROOT_DIR)) {
    return path.join(ROOT_DIR, 'mock', 'index.html')
  }

  return candidate
}

function normalizePath(pathname) {
  const normalized = pathname.replace(/\/$/, '')
  return normalized || '/'
}
