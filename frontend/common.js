const DEFAULT_BASE_URL = 'http://localhost:8080'
const APP_CONFIG = window.APP_CONFIG ?? {}
const API_BASE_URL = normalizeBaseUrl(APP_CONFIG.API_BASE_URL ?? DEFAULT_BASE_URL)
const APP_BASE_URL = normalizeBaseUrl(APP_CONFIG.APP_BASE_URL ?? API_BASE_URL)
const MOCK_BASE_URL = normalizeBaseUrl(APP_CONFIG.MOCK_BASE_URL ?? APP_BASE_URL)
const GUEST_CACHE_KEY = 'sistema-reserva-hotel:hospedes'
const FLASH_MESSAGE_KEY = 'sistema-reserva-hotel:flash-message'

function normalizeBaseUrl(baseUrl) {
  return String(baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '')
}

function appUrl(path) {
  return `${APP_BASE_URL}${path}`
}

function mockUrl(path) {
  return `${MOCK_BASE_URL}${path}`
}

function navigateTo(path) {
  window.location.href = appUrl(path)
}

function flashAndNavigate(path, message, type = 'error') {
  sessionStorage.setItem(FLASH_MESSAGE_KEY, JSON.stringify({ type, message }))
  navigateTo(path)
}

function showStoredMessage() {
  const serializedMessage = sessionStorage.getItem(FLASH_MESSAGE_KEY)
  if (!serializedMessage) {
    return
  }

  sessionStorage.removeItem(FLASH_MESSAGE_KEY)

  try {
    const { type, message } = JSON.parse(serializedMessage)
    showMessage(type, message)
  } catch {
    showMessage('error', 'Falha ao recuperar mensagem do sistema.')
  }
}

function rewriteInternalLinks() {
  document.querySelectorAll('a[href^="/"]').forEach((anchor) => {
    const mockPath = anchor.dataset.mockPath
    if (mockPath) {
      anchor.href = mockUrl(mockPath)
      return
    }

    anchor.href = appUrl(anchor.getAttribute('href'))
  })
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const text = await response.text()
  const body = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(body?.mensagem ?? 'Falha de comunicacao com a API.')
  }

  return body
}

function getCachedGuests() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CACHE_KEY) ?? '[]')
  } catch {
    return []
  }
}

function getCachedGuestById(id) {
  return getCachedGuests().find((guest) => Number(guest.id) === Number(id)) ?? null
}

function setCachedGuests(guests) {
  localStorage.setItem(GUEST_CACHE_KEY, JSON.stringify(guests))
}

function upsertCachedGuest(guest) {
  const guests = getCachedGuests()
  const index = guests.findIndex((item) => item.id === guest.id)
  if (index >= 0) {
    guests[index] = guest
  } else {
    guests.unshift(guest)
  }
  setCachedGuests(guests)
}

function buildQuery(params) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value)
    }
  })
  const serialized = query.toString()
  return serialized ? `?${serialized}` : ''
}

function entityPageItems(page) {
  return Array.isArray(page?.entities) ? page.entities : []
}

function renderOptions(select, items, getLabel, placeholder = 'Selecione') {
  select.innerHTML = `<option value="">${placeholder}</option>${items.map((item) => (
    `<option value="${escapeHtml(item.id)}">${escapeHtml(getLabel(item))}</option>`
  )).join('')}`
}

async function fetchEstados(params = {}) {
  const page = await request(`/api/estados${buildQuery({
    paginaAtual: 1,
    quantidade: 100,
    ordenacao: 'ASC',
    ...params,
  })}`)
  return entityPageItems(page)
}

async function fetchCidadesByEstado(estadoId, params = {}) {
  if (!estadoId) {
    return []
  }

  const page = await request(`/api/cidades${buildQuery({
    paginaAtual: 1,
    quantidade: 100,
    ordenacao: 'ASC',
    estadoId,
    ...params,
  })}`)
  return entityPageItems(page)
}

function showMessage(type, message) {
  const success = document.querySelector('#successMessage')
  const error = document.querySelector('#errorMessage')
  const target = type === 'success' ? success : error
  const other = type === 'success' ? error : success

  if (!target || !other) {
    return
  }

  other.hidden = true
  other.textContent = ''
  target.textContent = message
  target.hidden = false
}

function clearMessages() {
  document.querySelectorAll('.message').forEach((message) => {
    message.hidden = true
    message.textContent = ''
  })
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char])
}

rewriteInternalLinks()
