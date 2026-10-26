/* ==========================================================================
   Página de Novidades — radar de produção + feed de notícias.
   O feed vem de data/noticias.json, gerado pelo GitHub Actions
   (scripts/fetch-news.mjs) a cada 6 horas.
   ========================================================================== */

(() => {
    const CATS = {
        serie: { label: 'Série HBO', color: '#e07a52' },
        jogos: { label: 'Jogos', color: '#e8a33d' },
        naughtydog: { label: 'Naughty Dog', color: '#8aa35f' },
        produtos: { label: 'Produtos', color: '#b9a6e0' },
        geral: { label: 'Geral', color: '#a19e93' }
    }
    const PAGE = 12

    /* ---------- Radar: progresso das filmagens da Temporada 3 ---------- */

    const shootStart = new Date('2026-03-02T00:00:00')
    const shootEnd = new Date('2026-11-27T23:59:59')
    const bar = document.querySelector('[data-shoot-bar]')
    if (bar) {
        const now = new Date()
        const pct = Math.max(0, Math.min(100, ((now - shootStart) / (shootEnd - shootStart)) * 100))
        const daysLeft = Math.ceil((shootEnd - now) / 86400000)
        requestAnimationFrame(() => setTimeout(() => { bar.style.width = pct + '%' }, 300))
        bar.parentElement.setAttribute('aria-valuenow', Math.round(pct))
        const status = document.querySelector('[data-shoot-status]')
        const text = document.querySelector('[data-shoot-text]')
        if (pct >= 100) {
            status.textContent = 'Pós-produção'
            text.textContent = 'Filmagens encerradas em 27 nov 2026 (previsão).'
        } else {
            status.textContent = `${Math.round(pct)}%`
            text.textContent = `Em filmagem · faltam ${daysLeft} dias (previsão: 27 nov)`
        }
    }

    /* ---------- Feed ---------- */

    const list = document.querySelector('[data-news-list]')
    if (!list) return
    const moreBtn = document.querySelector('[data-news-more]')
    const search = document.querySelector('[data-news-search]')
    const updatedEl = document.querySelector('[data-news-updated]')
    const totalEl = document.querySelector('[data-news-total]')

    const state = { items: [], cat: 'all', lang: 'all', q: '', shown: PAGE }

    const rtf = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
    const relative = iso => {
        const diff = (new Date(iso) - new Date()) / 1000
        const units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]]
        for (const [unit, secs] of units) {
            if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit)
        }
        return 'agora mesmo'
    }
    const fmtDate = iso => new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
    const normalize = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

    const filtered = () => {
        const q = normalize(state.q.trim())
        return state.items.filter(item =>
            (state.cat === 'all' || item.category === state.cat) &&
            (state.lang === 'all' || item.lang === state.lang) &&
            (!q || normalize(`${item.title} ${item.source}`).includes(q))
        )
    }

    const render = () => {
        const items = filtered()
        if (!items.length) {
            list.innerHTML = `<div class="news-empty">Nenhuma notícia encontrada com esses filtros.</div>`
            moreBtn.hidden = true
            return
        }
        list.innerHTML = items.slice(0, state.shown).map(item => {
            const cat = CATS[item.category] || CATS.geral
            return `<a class="news-item" href="${escape(item.url)}" target="_blank" rel="noopener" style="--cat:${cat.color}">
                <div>
                    <h3>${escape(item.title)}</h3>
                    <div class="meta">
                        <b>${cat.label}</b>
                        <span>${escape(item.source || '')}</span>
                        <time datetime="${escape(item.date)}" title="${fmtDate(item.date)}">${relative(item.date)}</time>
                        ${item.lang === 'en' ? '<span class="tag" style="padding:2px 8px">EN</span>' : ''}
                    </div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </a>`
        }).join('')
        moreBtn.hidden = items.length <= state.shown
    }

    const bindChips = (attr, key) => {
        document.querySelectorAll(`[data-${attr}]`).forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll(`[data-${attr}]`).forEach(c => c.setAttribute('aria-pressed', String(c === chip)))
                state[key] = chip.dataset[attr]
                state.shown = PAGE
                render()
            })
        })
    }
    bindChips('cat', 'cat')
    bindChips('lang', 'lang')

    let debounce
    search.addEventListener('input', () => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
            state.q = search.value
            state.shown = PAGE
            render()
        }, 180)
    })
    moreBtn.addEventListener('click', () => {
        state.shown += PAGE
        render()
    })

    fetch(`data/noticias.json?t=${Date.now()}`)
        .then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        })
        .then(data => {
            state.items = (data.items || []).sort((a, b) => new Date(b.date) - new Date(a.date))
            updatedEl.textContent = `Atualizado ${relative(data.updated)}`
            updatedEl.title = new Date(data.updated).toLocaleString('pt-BR')
            totalEl.textContent = `${state.items.length} notícias dos últimos meses, de ${new Set(state.items.map(i => i.source)).size} fontes.`
            render()
        })
        .catch(() => {
            updatedEl.textContent = 'Feed indisponível'
            list.innerHTML = `<div class="news-empty">Não foi possível carregar o feed agora. Se você abriu o arquivo direto do computador, use um servidor local ou acesse a versão publicada no GitHub Pages. Os destaques acima continuam valendo.</div>`
        })
})()
