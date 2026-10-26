// Busca notícias da franquia no Google Notícias (RSS), classifica por assunto
// e atualiza data/noticias.json. Roda no GitHub Actions, sem dependências.
//   node scripts/fetch-news.mjs

import { readFile, writeFile } from 'node:fs/promises'

const OUT = new URL('../data/noticias.json', import.meta.url)
const MAX_ITEMS = 160
const MAX_AGE_DAYS = 120

const rss = (q, hl, gl, ceid) =>
    `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${hl}&gl=${gl}&ceid=${ceid}`

// `limit` evita que os feeds do estúdio (muito volumosos) dominem a lista
const FEEDS = [
    { lang: 'pt', limit: 60, url: rss('"The Last of Us" when:30d', 'pt-BR', 'BR', 'BR:pt-419') },
    { lang: 'pt', limit: 15, url: rss('"Naughty Dog" OR "Intergalactic" when:30d', 'pt-BR', 'BR', 'BR:pt-419') },
    { lang: 'en', limit: 60, url: rss('"The Last of Us" when:14d', 'en-US', 'US', 'US:en') },
    { lang: 'en', limit: 25, url: rss('"Naughty Dog" OR "Intergalactic: The Heretic Prophet" when:30d', 'en-US', 'US', 'US:en') }
]

// precisa citar a franquia ou o estúdio para entrar no feed
const RELEVANT = /last of us|naughty dog|intergalactic|druckmann|tlou/i
// histórias virais que só usam o nome da série como isca
// e spam de "assista grátis" / vlogs com IDs aleatórios no fim do título
const JUNK = /\bmy (dil|daughter-in-law|husband|wife|son|daughter|mother|mil|neighbor)\b|the next morning|\(\w+(\.{3}|…)$|\(\w{8,12}\)$|[！-～]|‼|vlog|free (online|streaming)|^the last of us$/i

const RULES = [
    ['produtos', /figure|figura|funko|lego|merch|vinyl|vinil|board game|jogo de tabuleiro|collectible|colecion|statue|estátua|youtooz|book|livro|comic|quadrinho|soundtrack|trilha sonora|poster|camiseta|t-shirt|sale|desconto|promo/i],
    ['serie', /hbo|\bmax\b|\bs0\d\b|season|temporada|série|series|episode|episódio|pedro pascal|bella ramsey|kaitlyn dever|isabela merced|craig mazin|showrunner|casting|elenco|emmy|sarsgaard|patrick wilson|tv show/i],
    ['naughtydog', /naughty dog|intergalactic|druckmann|heretic prophet/i],
    ['jogos', /part i\b|part ii|part 1|part 2|part iii|part 3|remaster|ps5|ps4|pc\b|steam|game|jogo|playstation|multiplayer|factions|speedrun|mod\b/i]
]

const decode = s => s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim()

const tag = (xml, name) => {
    const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))
    return m ? decode(m[1]) : ''
}

const classify = title => (RULES.find(([, re]) => re.test(title)) || ['geral'])[0]

const keyOf = title => title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim().slice(0, 90)

async function readFeed({ lang, url, limit }) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (tlou-fan-site news bot)' } })
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    const xml = await res.text()
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
        const source = tag(item, 'source')
        let title = tag(item, 'title')
        // o Google Notícias termina o título com " - Nome do veículo"
        if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3))
        const date = new Date(tag(item, 'pubDate'))
        return {
            title,
            url: tag(item, 'link'),
            source,
            date: isNaN(date) ? new Date().toISOString() : date.toISOString(),
            lang,
            category: classify(title)
        }
    }).filter(i => i.title && i.url && RELEVANT.test(i.title) && !JUNK.test(i.title)).slice(0, limit)
}

async function main() {
    let previous = { items: [] }
    try { previous = JSON.parse(await readFile(OUT, 'utf8')) } catch { /* primeira execução */ }

    const results = await Promise.allSettled(FEEDS.map(readFeed))
    results.forEach((r, i) => { if (r.status === 'rejected') console.warn('Feed falhou:', FEEDS[i].url, r.reason.message) })
    const fresh = results.flatMap(r => (r.status === 'fulfilled' ? r.value : []))

    if (!fresh.length) {
        console.log('Nenhuma notícia nova obtida; mantendo o arquivo atual.')
        return
    }

    const cutoff = Date.now() - MAX_AGE_DAYS * 86400000
    const seen = new Set()
    const items = [...fresh, ...previous.items]
        .filter(i => new Date(i.date).getTime() >= cutoff)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter(i => {
            const k = keyOf(i.title)
            if (seen.has(k) || seen.has(i.url)) return false
            seen.add(k)
            seen.add(i.url)
            return true
        })
        .slice(0, MAX_ITEMS)

    await writeFile(OUT, JSON.stringify({ updated: new Date().toISOString(), items }, null, 2) + '\n')
    console.log(`noticias.json: ${items.length} itens (${fresh.length} obtidos agora).`)
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
