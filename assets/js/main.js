/* ==========================================================================
   The Last of Us | Fan Site
   Script compartilhado por todas as páginas. Cada módulo só roda se os
   elementos dele existirem na página atual.
   ========================================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const $ = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

/* ---------- Armazenamento seguro (modo privado pode bloquear) ---------- */

const store = {
    get(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* sem persistência */ }
    }
}

/* ---------- Toast ---------- */

let toastTimer
function toast(message) {
    let el = $('.toast')
    if (!el) {
        el = document.createElement('div')
        el.className = 'toast'
        el.setAttribute('role', 'status')
        document.body.appendChild(el)
    }
    el.textContent = message
    el.classList.add('is-visible')
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2800)
}

/* ==========================================================================
   Áudio sintetizado (Web Audio), nada é baixado, tudo é gerado na hora
   ========================================================================== */

const sound = {
    enabled: store.get('tlou-sound', false),
    ctx: null,
    getCtx() {
        if (!this.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext
            if (!AC) return null
            this.ctx = new AC()
        }
        if (this.ctx.state === 'suspended') this.ctx.resume()
        return this.ctx
    },

    // Estalos curtos e irregulares, como a ecolocalização de um Estalador
    clicker() {
        if (!this.enabled) return
        const ctx = this.getCtx()
        if (!ctx) return
        const now = ctx.currentTime
        const len = Math.floor(ctx.sampleRate * 0.03)
        const buffer = ctx.createBuffer(1, len, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)

        let t = now
        for (let i = 0; i < 7; i++) {
            const src = ctx.createBufferSource()
            src.buffer = buffer
            const band = ctx.createBiquadFilter()
            band.type = 'bandpass'
            band.frequency.value = 1800 + Math.random() * 1600
            band.Q.value = 9
            const gain = ctx.createGain()
            gain.gain.value = 0.9 + Math.random() * 0.6
            src.connect(band).connect(gain).connect(ctx.destination)
            src.start(t)
            t += 0.05 + Math.random() * 0.09
        }
    },

    // Clique seco de lanterna
    switchClick() {
        if (!this.enabled) return
        const ctx = this.getCtx()
        if (!ctx) return
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'square'
        osc.frequency.setValueAtTime(2400, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
        osc.connect(gain).connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.06)
    },

    // Corda dedilhada (Karplus-Strong), toca mesmo com o som global desligado,
    // porque só acontece quando a pessoa clica no violão
    pluck(freq, when = 0, volume = 0.5) {
        const ctx = this.getCtx()
        if (!ctx) return
        const rate = ctx.sampleRate
        const duration = 2.6
        const buffer = ctx.createBuffer(1, Math.floor(rate * duration), rate)
        const out = buffer.getChannelData(0)
        const period = Math.round(rate / freq)
        const ring = new Float32Array(period).map(() => Math.random() * 2 - 1)
        for (let i = 0; i < out.length; i++) {
            const idx = i % period
            const next = (i + 1) % period
            out[i] = ring[idx]
            ring[idx] = 0.4985 * (ring[idx] + ring[next])
        }
        const src = ctx.createBufferSource()
        src.buffer = buffer
        const tone = ctx.createBiquadFilter()
        tone.type = 'lowpass'
        tone.frequency.value = 3200
        const gain = ctx.createGain()
        gain.gain.value = volume
        src.connect(tone).connect(gain).connect(ctx.destination)
        src.start(ctx.currentTime + when)
    }
}

function initSoundToggle() {
    const btn = $('[data-sound-toggle]')
    if (!btn) return
    const sync = () => {
        btn.setAttribute('aria-pressed', String(sound.enabled))
        btn.setAttribute('aria-label', sound.enabled ? 'Desativar efeitos sonoros' : 'Ativar efeitos sonoros')
        $('.icon-sound-on', btn).style.display = sound.enabled ? '' : 'none'
        $('.icon-sound-off', btn).style.display = sound.enabled ? 'none' : ''
    }
    sync()
    btn.addEventListener('click', () => {
        sound.enabled = !sound.enabled
        store.set('tlou-sound', sound.enabled)
        sync()
        if (sound.enabled) {
            sound.switchClick()
            toast('Efeitos sonoros ativados')
        } else {
            toast('Efeitos sonoros desativados')
        }
    })
}

/* ==========================================================================
   Cabeçalho e menu
   ========================================================================== */

function initHeader() {
    const header = $('.site-header')
    if (!header) return
    let lastY = window.scrollY
    const onScroll = () => {
        const y = window.scrollY
        header.classList.toggle('is-scrolled', y > 20)
        const menuOpen = $('.nav')?.classList.contains('is-open')
        header.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY)
        lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const btn = $('.menu-btn')
    const nav = $('.nav')
    if (!btn || !nav) return
    const setOpen = open => {
        nav.classList.toggle('is-open', open)
        btn.setAttribute('aria-expanded', String(open))
        btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
        header.classList.toggle('menu-open', open)
        document.body.style.overflow = open ? 'hidden' : ''
    }
    btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')))
    nav.addEventListener('click', e => {
        if (e.target === nav || e.target.closest('a')) setOpen(false)
    })
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') setOpen(false)
    })
}

/* ==========================================================================
   Esporos ao clicar, em qualquer lugar da página
   ========================================================================== */

function initSpores() {
    if (reduceMotion) return
    const canvas = document.createElement('canvas')
    canvas.id = 'fx-canvas'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const colors = ['232,163,61', '196,140,70', '160,150,90', '196,86,46', '220,205,160']
    let particles = []
    let running = false

    const resize = () => {
        canvas.width = innerWidth * dpr
        canvas.height = innerHeight * dpr
        canvas.style.width = innerWidth + 'px'
        canvas.style.height = innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const burst = (x, y, amount = 22) => {
        for (let i = 0; i < amount; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = 0.4 + Math.random() * 2.2
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.6,
                r: 0.8 + Math.random() * 2.4,
                life: 1,
                decay: 0.008 + Math.random() * 0.014,
                wobble: Math.random() * Math.PI * 2,
                color: colors[Math.floor(Math.random() * colors.length)]
            })
        }
        if (!running) { running = true; requestAnimationFrame(tick) }
    }

    const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particles = particles.filter(p => p.life > 0)
        for (const p of particles) {
            p.wobble += 0.08
            p.vx *= 0.97
            p.vy = p.vy * 0.97 - 0.012
            p.x += p.vx + Math.sin(p.wobble) * 0.25
            p.y += p.vy
            p.life -= p.decay
            const alpha = Math.max(p.life, 0)
            ctx.beginPath()
            ctx.fillStyle = `rgba(${p.color},${alpha * 0.85})`
            ctx.shadowColor = `rgba(${p.color},${alpha})`
            ctx.shadowBlur = 8 * dpr
            ctx.arc(p.x * dpr, p.y * dpr, p.r * dpr, 0, Math.PI * 2)
            ctx.fill()
        }
        if (particles.length) requestAnimationFrame(tick)
        else { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height) }
    }

    document.addEventListener('pointerdown', e => {
        if (e.target.closest('input, textarea, select, iframe, .dark-room')) return
        burst(e.clientX, e.clientY)
    })

    window.sporeBurst = burst
}

/* ==========================================================================
   Vagalumes no hero, "procure a luz"
   ========================================================================== */

function initFireflies() {
    const canvas = $('#fireflies')
    if (!canvas || reduceMotion) return
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w, h, flies = [], visible = true, raf

    const make = (x, y, rising = false) => ({
        x: x ?? Math.random() * w,
        y: y ?? h * 0.35 + Math.random() * h * 0.65,
        vx: (Math.random() - 0.5) * 0.3,
        vy: rising ? -0.6 - Math.random() * 0.8 : (Math.random() - 0.5) * 0.3,
        r: 1 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.03,
        life: rising ? 1 : Infinity
    })

    const resize = () => {
        w = host.clientWidth
        h = host.clientHeight
        canvas.width = w * dpr
        canvas.height = h * dpr
        const count = Math.round(Math.min(46, w / 32))
        flies = Array.from({ length: count }, () => make())
    }

    const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        flies = flies.filter(f => f.life > 0)
        for (const f of flies) {
            f.phase += f.speed
            f.vx += (Math.random() - 0.5) * 0.04
            f.vy += (Math.random() - 0.5) * 0.04
            f.vx = Math.max(-0.6, Math.min(0.6, f.vx))
            if (f.life === Infinity) f.vy = Math.max(-0.5, Math.min(0.5, f.vy))
            f.x += f.vx
            f.y += f.vy
            if (f.life !== Infinity) f.life -= 0.006
            if (f.x < -10) f.x = w + 10
            if (f.x > w + 10) f.x = -10
            if (f.y < -10 && f.life === Infinity) f.y = h + 10
            if (f.y > h + 10) f.y = -10

            const glow = (Math.sin(f.phase) + 1) / 2
            const alpha = (0.15 + glow * 0.85) * Math.min(1, f.life)
            const x = f.x * dpr, y = f.y * dpr, r = f.r * dpr
            const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 9)
            grad.addColorStop(0, `rgba(255,214,120,${alpha * 0.55})`)
            grad.addColorStop(1, 'rgba(255,190,80,0)')
            ctx.fillStyle = grad
            ctx.beginPath(); ctx.arc(x, y, r * 9, 0, Math.PI * 2); ctx.fill()
            ctx.fillStyle = `rgba(255,236,170,${alpha})`
            ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
        }
        if (visible) raf = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(raf)
        if (visible) raf = requestAnimationFrame(tick)
    }).observe(host)

    // Clicar no hero libera um pequeno enxame que sobe em direção à luz
    host.addEventListener('pointerdown', e => {
        if (e.target.closest('a, button')) return
        const rect = host.getBoundingClientRect()
        for (let i = 0; i < 10; i++) flies.push(make(e.clientX - rect.left + (Math.random() - 0.5) * 30, e.clientY - rect.top + (Math.random() - 0.5) * 30, true))
    })
}

/* ---------- Slideshow do hero ---------- */

function initHeroSlides() {
    const slides = $$('.hero-slide')
    if (slides.length < 2) return
    const dotsWrap = $('.hero-dots')
    let index = 0, timer

    const dots = slides.map((_, i) => {
        const dot = document.createElement('button')
        dot.className = 'hero-dot'
        dot.setAttribute('aria-label', `Imagem ${i + 1}`)
        dot.addEventListener('click', () => go(i))
        dotsWrap?.appendChild(dot)
        return dot
    })

    const go = i => {
        slides[index].classList.remove('is-active')
        dots[index].classList.remove('is-active')
        index = (i + slides.length) % slides.length
        slides[index].classList.add('is-active')
        // reinicia a animação da barra
        void dots[index].offsetWidth
        dots[index].classList.add('is-active')
        clearTimeout(timer)
        timer = setTimeout(() => go(index + 1), 7000)
    }
    go(0)
}

/* ---------- Revelação ao rolar ---------- */

function initReveal() {
    const items = $$('.reveal')
    if (!items.length) return
    if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('is-visible'))
        return
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
        })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    items.forEach(el => io.observe(el))
}

/* ---------- Contadores ---------- */

function initCounters() {
    const items = $$('[data-count]')
    if (!items.length) return
    const run = el => {
        const target = Number(el.dataset.count)
        const suffix = el.dataset.suffix || ''
        const start = performance.now()
        const dur = 1600
        const step = now => {
            const t = Math.min(1, (now - start) / dur)
            const eased = 1 - Math.pow(1 - t, 3)
            el.innerHTML = Math.round(target * eased) + (suffix ? `<span>${suffix}</span>` : '')
            if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            run(entry.target)
            io.unobserve(entry.target)
        })
    }, { threshold: 0.6 })
    items.forEach(el => io.observe(el))
}

/* ---------- Abas ---------- */

function initTabs() {
    $$('[role="tablist"]').forEach(list => {
        const tabs = $$('[role="tab"]', list)
        // listas que funcionam como filtro (sem painéis) são tratadas pelo próprio módulo
        if (!tabs.length || !tabs[0].hasAttribute('aria-controls')) return
        const select = tab => {
            tabs.forEach(t => {
                const on = t === tab
                t.setAttribute('aria-selected', String(on))
                t.tabIndex = on ? 0 : -1
                document.getElementById(t.getAttribute('aria-controls')).hidden = !on
            })
        }
        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => select(tab))
            tab.addEventListener('keydown', e => {
                if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
                const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]
                next.focus()
                select(next)
            })
        })
    })
}

/* ---------- Player de vídeo leve ---------- */

function initVideos() {
    $$('[data-video-player]').forEach(wrap => {
        const main = $('.video-main', wrap)
        const items = $$('.video-item', wrap)

        const poster = (id, title) => {
            main.innerHTML = `
                <button class="lite-yt" style="background-image:url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)" aria-label="Reproduzir: ${title}">
                    <span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
                    <span class="caption">${title}</span>
                </button>`
            $('.lite-yt', main).addEventListener('click', () => play(id, title))
        }
        const play = (id, title) => {
            main.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        }

        items.forEach(item => {
            const id = item.dataset.id
            const img = $('img', item)
            if (img && !img.src) img.src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
            item.addEventListener('click', () => {
                items.forEach(i => i.setAttribute('aria-current', String(i === item)))
                play(id, item.dataset.title)
            })
        })
        const first = items[0]
        if (first) {
            first.setAttribute('aria-current', 'true')
            poster(first.dataset.id, first.dataset.title)
        } else if (main.dataset.id) {
            poster(main.dataset.id, main.dataset.title)
        }
    })
}

/* ==========================================================================
   Violão do Joel / da Ellie
   ========================================================================== */

function initGuitar() {
    $$('[data-guitar]').forEach(btn => {
        btn.addEventListener('click', () => {
            // Em menor -> Dó -> Sol -> Ré: progressão melancólica dedilhada
            const chords = [
                [82.41, 123.47, 164.81, 196.0, 246.94],
                [130.81, 164.81, 196.0, 261.63, 329.63],
                [98.0, 123.47, 146.83, 196.0, 246.94],
                [146.83, 220.0, 293.66, 369.99]
            ]
            chords.forEach((chord, c) => {
                chord.forEach((f, i) => sound.pluck(f, c * 1.1 + i * 0.09, 0.32))
            })
            btn.classList.remove('is-playing')
            void btn.offsetWidth
            btn.classList.add('is-playing')
        })
    })
}

/* ==========================================================================
   Zona infectada, lanterna, modo escuta e estágios do cordyceps
   ========================================================================== */

const INFECTED = [
    {
        name: 'Corredores', stage: 'Estágio 1 · 2 dias', img: 'corredores',
        text: 'Entre um e dois dias após a mordida ou a inalação de esporos, o cordyceps alcança o cérebro. O hospedeiro ainda parece humano, mas perde o raciocínio e ataca qualquer coisa que se mova. Sozinhos são frágeis; em bando, a melhor opção é correr.',
        stats: [85, 20, 60]
    },
    {
        name: 'Espreitadores', stage: 'Estágio 2 · 2 semanas', img: 'espreitadores',
        text: 'O fungo começa a romper o rosto e a afetar a visão. Mais silenciosos e com audição apurada, preferem lugares escuros e emboscadas. Em The Last of Us Part II, alguns se fundem às paredes cobertas de fungo para atacar de surpresa.',
        stats: [75, 35, 65]
    },
    {
        name: 'Estaladores', stage: 'Estágio 3 · 1 ano', img: 'estaladores',
        text: 'O crescimento do fungo cobre o rosto e deixa o infectado completamente cego. Para caçar, usam ecolocalização: aqueles estalos inconfundíveis. Uma mordida é fatal. Movimente-se devagar, em silêncio, e nunca deixe que se aproximem.',
        stats: [50, 60, 90], sound: true
    },
    {
        name: 'Trôpegos', stage: 'Variante · ambientes úmidos', img: 'tropegos',
        text: 'Introduzidos em Part II, surgem quando o infectado vive em locais muito úmidos. Bolsões de esporos crescem na cabeça e nos ombros e eles liberam nuvens ácidas, inclusive ao morrer. Mantenha distância e use ataques à longa distância.',
        stats: [35, 65, 50]
    },
    {
        name: 'Baiacus', stage: 'Estágio 4 · vários anos', img: 'baiacu',
        text: 'Após anos de infecção, placas grossas de fungo funcionam como uma armadura. Lentos e devastadores, arrancam bolsas de esporos do próprio corpo e as arremessam como granadas. Fogo e explosivos primeiro; o resto do arsenal depois.',
        stats: [20, 95, 55]
    },
    {
        name: 'Rei dos Ratos', stage: 'Anomalia · Part II', img: 'rei-dos-ratos',
        text: 'Vários dos primeiros infectados, presos por mais de duas décadas no subsolo de um hospital de Seattle, fundiram-se em uma única massa. Tem a velocidade de um espreitador, a ecolocalização de um estalador e a força de um baiacu.',
        stats: [70, 100, 90]
    }
]

function initInfectedZone() {
    const zone = $('.infected-zone')
    const gateBtn = $('[data-open-zone]')
    if (!zone || !gateBtn) return

    const room = $('.dark-room', zone)
    const img = $('.dark-room-stage img', zone)
    const title = $('[data-inf-name]', zone)
    const stage = $('[data-inf-stage]', zone)
    const text = $('[data-inf-text]', zone)
    const bars = $$('.threat-bar i', zone)
    const nav = $('.infected-nav', zone)
    const listenBtn = $('[data-listen]', zone)
    const lightBtn = $('[data-light]', zone)
    let current = 0

    INFECTED.forEach((inf, i) => {
        const b = document.createElement('button')
        b.className = 'infected-thumb'
        b.setAttribute('role', 'tab')
        b.setAttribute('aria-label', inf.name)
        b.innerHTML = `<img src="assets/img/infected/${inf.img}.jpg" alt="" loading="lazy">`
        b.addEventListener('click', () => show(i))
        nav.appendChild(b)
    })
    const thumbs = $$('.infected-thumb', nav)

    const show = i => {
        current = (i + INFECTED.length) % INFECTED.length
        const inf = INFECTED[current]
        thumbs.forEach((t, k) => t.setAttribute('aria-selected', String(k === current)))
        img.classList.add('is-swapping')
        setTimeout(() => {
            img.src = `assets/img/infected/${inf.img}.jpg`
            img.alt = inf.name
            img.classList.remove('is-swapping')
        }, 250)
        title.textContent = inf.name
        stage.textContent = inf.stage
        text.textContent = inf.text
        bars.forEach((bar, k) => { bar.style.width = inf.stats[k] + '%' })
        if (inf.sound) sound.clicker()
    }

    gateBtn.addEventListener('click', () => {
        const fog = document.createElement('div')
        fog.className = 'spore-fog is-active'
        document.body.appendChild(fog)
        setTimeout(() => fog.remove(), 1700)
        const rect = gateBtn.getBoundingClientRect()
        window.sporeBurst?.(rect.left + rect.width / 2, rect.top + rect.height / 2, 90)
        toast('Máscara de gás colocada. Mantenha a lanterna ligada.')
        $('.gate').hidden = true
        zone.classList.add('is-open')
        show(0)
        zone.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    })

    // Lanterna segue o ponteiro (mouse ou dedo)
    const moveLight = e => {
        const rect = room.getBoundingClientRect()
        room.style.setProperty('--x', `${e.clientX - rect.left}px`)
        room.style.setProperty('--y', `${e.clientY - rect.top}px`)
    }
    room.addEventListener('pointermove', moveLight)
    room.addEventListener('pointerdown', moveLight)

    const toggleLight = () => {
        room.classList.toggle('lights-on')
        const on = room.classList.contains('lights-on')
        lightBtn.setAttribute('aria-pressed', String(on))
        sound.switchClick()
        if (!on) {
            room.classList.remove('flicker')
            void room.offsetWidth
            room.classList.add('flicker')
        }
    }
    const setListen = on => {
        room.classList.toggle('listen-mode', on)
        listenBtn.setAttribute('aria-pressed', String(on))
        if (on && INFECTED[current].sound) sound.clicker()
    }
    lightBtn.addEventListener('click', toggleLight)
    listenBtn.addEventListener('click', () => setListen(!room.classList.contains('listen-mode')))

    // Clique no infectado: estalos (se for estalador) + esporos
    $('.dark-room-stage', room).addEventListener('click', e => {
        if (INFECTED[current].sound) sound.clicker()
        window.sporeBurst?.(e.clientX, e.clientY, 30)
    })

    // Swipe no celular
    let startX = null
    room.addEventListener('touchstart', e => { startX = e.touches[0].clientX }, { passive: true })
    room.addEventListener('touchend', e => {
        if (startX === null) return
        const dx = e.changedTouches[0].clientX - startX
        if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1))
        startX = null
    })

    $('[data-inf-prev]', zone).addEventListener('click', () => show(current - 1))
    $('[data-inf-next]', zone).addEventListener('click', () => show(current + 1))

    // Teclado: setas trocam, L lanterna, segurar E = modo escuta
    document.addEventListener('keydown', e => {
        if (!zone.classList.contains('is-open') || e.target.closest('input, textarea')) return
        if (e.key === 'ArrowRight') show(current + 1)
        if (e.key === 'ArrowLeft') show(current - 1)
        if (e.key.toLowerCase() === 'l') toggleLight()
        if (e.key.toLowerCase() === 'e' && !e.repeat) setListen(true)
    })
    document.addEventListener('keyup', e => {
        if (e.key.toLowerCase() === 'e') setListen(false)
    })
}

/* ==========================================================================
   Wallpapers, galeria filtrável + lightbox com download
   ========================================================================== */

const WALLPAPERS = {
    desktop: ['266438.jpg', '2243958.jpg', '394511.jpg', '408539.jpg', '556869.jpg', '627799.jpg', '1811296.jpg', '2243867.jpg',
        '2243869.jpg', '2243871.jpg', '2243876.png', '2243950.jpg', '446459.png', '511799.jpg', '527526.png', '532407.jpg'],
    phone: ['1329879.jpg', '1329887.jpg', '2529760.jpg', '3062798.jpg', '3062802.png', '3424685.jpg', '4929669.jpg', '5077283.jpg',
        '5077312.jpg', '5077322.jpg', '5077323.jpg', '5077354.jpg', '5077427.jpg', '5077432.jpg', '5077493.jpg', '5077605.jpg', 'peakpx.jpg']
}

function initWallpapers() {
    const grid = $('[data-wall-grid]')
    if (!grid) return
    const lb = $('.lightbox')
    const lbImg = $('img', lb)
    const lbCounter = $('.lb-counter', lb)
    const lbDownload = $('[data-lb-download]', lb)
    const count = $('[data-wall-count]')
    let type = store.get('tlou-wall-type', 'desktop')
    let list = []
    let index = 0

    const folder = t => (t === 'desktop' ? 'Desktop' : 'phone')
    const render = () => {
        list = WALLPAPERS[type]
        grid.classList.toggle('is-phone', type === 'phone')
        grid.innerHTML = list.map((file, i) => {
            const base = file.replace(/\.\w+$/, '')
            return `<button class="wall reveal is-visible" data-index="${i}" aria-label="Abrir wallpaper ${i + 1}">
                <img src="assets/img/wall/${type}/${base}.jpg" alt="Wallpaper The Last of Us ${i + 1}" loading="lazy">
                <span class="wall-actions"><span>${type === 'desktop' ? 'Desktop' : 'Celular'}</span><span>Ver ↗</span></span>
            </button>`
        }).join('')
        count.textContent = `${list.length} imagens`
        $$('[data-wall-type]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.wallType === type)))
    }

    const open = i => {
        index = (i + list.length) % list.length
        const src = `imagens/${folder(type)}/${list[index]}`
        lbImg.src = `assets/img/wall/${type}/${list[index].replace(/\.\w+$/, '')}.jpg`
        // carrega a versão em alta e troca quando estiver pronta
        const hi = new Image()
        hi.onload = () => { if (lbImg.dataset.want === src) lbImg.src = src }
        lbImg.dataset.want = src
        hi.src = src
        lbDownload.href = src
        lbDownload.setAttribute('download', `the-last-of-us-${type}-${list[index]}`)
        lbCounter.textContent = `${index + 1} / ${list.length}`
        lb.classList.add('is-open')
        document.body.style.overflow = 'hidden'
    }
    const close = () => {
        lb.classList.remove('is-open')
        document.body.style.overflow = ''
    }

    grid.addEventListener('click', e => {
        const card = e.target.closest('.wall')
        if (card) open(Number(card.dataset.index))
    })
    $$('[data-wall-type]').forEach(b => b.addEventListener('click', () => {
        type = b.dataset.wallType
        store.set('tlou-wall-type', type)
        render()
    }))
    $('.lb-close', lb).addEventListener('click', close)
    $('.lb-prev', lb).addEventListener('click', () => open(index - 1))
    $('.lb-next', lb).addEventListener('click', () => open(index + 1))
    lb.addEventListener('click', e => { if (e.target === lb) close() })
    lbDownload.addEventListener('click', () => toast('Download iniciado'))
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('is-open')) return
        if (e.key === 'Escape') close()
        if (e.key === 'ArrowRight') open(index + 1)
        if (e.key === 'ArrowLeft') open(index - 1)
    })
    let sx = null
    lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX }, { passive: true })
    lb.addEventListener('touchend', e => {
        if (sx === null) return
        const dx = e.changedTouches[0].clientX - sx
        if (Math.abs(dx) > 50) open(index + (dx < 0 ? 1 : -1))
        sx = null
    })

    render()
}

/* ---------- Rodapé ---------- */

function initFooter() {
    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear() })
}

/* ---------- Boot ---------- */

initHeader()
initSoundToggle()
initSpores()
initFireflies()
initHeroSlides()
initReveal()
initCounters()
initTabs()
initVideos()
initGuitar()
initInfectedZone()
initWallpapers()
initFooter()
