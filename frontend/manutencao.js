initManutencao()

function initManutencao() {
  const form = document.querySelector('#guestForm')
  const formTitle = document.querySelector('#formTitle')
  const editId = getEditId()
  let estadosLoaded = false

  function getEditId() {
    const params = new URLSearchParams(window.location.search)
    const queryId = Number(params.get('id'))
    if (queryId) {
      return queryId
    }

    const match = window.location.pathname.match(/\/hospedes\/update\/(\d+)\/?$/)
    return match ? Number(match[1]) : 0
  }

  function field(id) {
    return document.querySelector(`#${id}`)
  }

  function getPayload() {
    const id = Number(field('hospedeId').value)
    const payload = {
      nomeCompleto: field('nomeCompleto').value.trim(),
      dataNascimento: field('dataNascimento').value,
      cpf: field('cpf').value.trim(),
      email: field('email').value.trim(),
      telefoneDdd: field('telefoneDdd').value.trim(),
      telefoneNumero: field('telefoneNumero').value.trim(),
      telefoneTipo: field('telefoneTipo').value,
      enderecoLogradouro: field('enderecoLogradouro').value.trim(),
      enderecoNumero: field('enderecoNumero').value.trim(),
      enderecoBairro: field('enderecoBairro').value.trim(),
      enderecoComplemento: field('enderecoComplemento').value.trim(),
      enderecoCep: field('enderecoCep').value.trim(),
      cidadeId: Number(field('cidadeId').value),
    }

    if (id) {
      payload.id = id
    }

    return payload
  }

  async function loadEstados() {
    if (estadosLoaded) {
      return
    }

    const estados = await fetchEstados()
    renderOptions(field('estadoId'), estados, (estado) => `${estado.uf} - ${estado.nome}`)
    estadosLoaded = true
  }

  async function loadCidades(estadoId, selectedCidadeId = '') {
    field('cidadeId').innerHTML = '<option value="">Selecione um estado</option>'
    field('cidadeId').disabled = true

    if (!estadoId) {
      return
    }

    const cidades = await fetchCidadesByEstado(estadoId)
    renderOptions(field('cidadeId'), cidades, (cidade) => cidade.nome)
    field('cidadeId').disabled = false
    field('cidadeId').value = selectedCidadeId ? String(selectedCidadeId) : ''
  }

  async function fillForm(guest) {
    field('hospedeId').value = guest.id ?? ''
    field('nomeCompleto').value = guest.nomeCompleto ?? ''
    field('dataNascimento').value = guest.dataNascimento?.slice(0, 10) ?? ''
    field('cpf').value = guest.cpf ?? ''
    field('email').value = guest.email ?? ''
    field('telefoneDdd').value = guest.telefoneDdd ?? ''
    field('telefoneNumero').value = guest.telefoneNumero ?? ''
    field('telefoneTipo').value = guest.telefoneTipo ?? 'CELULAR'
    field('enderecoLogradouro').value = guest.enderecoLogradouro ?? ''
    field('enderecoNumero').value = guest.enderecoNumero ?? ''
    field('enderecoBairro').value = guest.enderecoBairro ?? ''
    field('enderecoComplemento').value = guest.enderecoComplemento ?? ''
    field('enderecoCep').value = guest.enderecoCep ?? ''
    await loadEstados()
    field('estadoId').value = guest.estadoId ?? ''
    await loadCidades(guest.estadoId, guest.cidadeId)
    formTitle.textContent = 'Editar hospede'
  }

  async function loadForEdit() {
    if (!editId) {
      flashAndNavigate('/hospedes', 'Hospede não encontrado para manutenção')
      return
    }

    clearMessages()
    const cachedGuest = getCachedGuestById(editId)

    if (cachedGuest) {
      try {
        await fillForm(cachedGuest)
      } catch (error) {
        showMessage('error', error.message)
      }
    }

    try {
      const guest = await request(`/api/hospedes/${editId}`)
      upsertCachedGuest(guest)
      await fillForm(guest)
    } catch (error) {
      if (cachedGuest) {
        showMessage('error', error.message)
        return
      }

      flashAndNavigate('/hospedes', 'Hospede não encontrado para manutenção')
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    clearMessages()

    try {
      const payload = getPayload()
      const method = payload.id ? 'PUT' : 'POST'
      const saved = await request('/api/hospedes', {
        method,
        body: JSON.stringify(payload),
      })
      upsertCachedGuest(saved)
      navigateTo('/hospedes')
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  field('estadoId').addEventListener('focus', async () => {
    try {
      await loadEstados()
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  field('estadoId').addEventListener('change', async () => {
    try {
      await loadCidades(field('estadoId').value)
    } catch (error) {
      showMessage('error', error.message)
    }
  })

  if (editId) {
    loadForEdit()
  } else {
    formTitle.textContent = 'Cadastrar hospede'
  }
}
