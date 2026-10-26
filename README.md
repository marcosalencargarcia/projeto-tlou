# The Last of Us | Fan Site

Fan site não oficial sobre a franquia **The Last of Us**: jogos da Naughty Dog, série da HBO, personagens, infectados, wallpapers e um feed de novidades que se atualiza sozinho.

🔗 **Site:** https://marcosalencargarcia.github.io/projeto-tlou/

## Páginas

| Página | O que tem |
| --- | --- |
| `index.html` | Hero com slideshow e vagalumes interativos, destaques atuais, trailers, linha do tempo 2013–2027 e prêmios |
| `jogos.html` | Part I, Left Behind, Part II, Remastered, versões para PC e os próximos projetos |
| `serie.html` | Temporadas 1–3 em abas, episódios, elenco completo (incluindo a T3) e bastidores |
| `personagens.html` | Protagonistas, coadjuvantes e a **zona infectada** com lanterna e modo escuta |
| `naughtydog.html` | História do estúdio, franquias e marcos |
| `wallpapers.html` | Galeria filtrável (desktop/celular) com lightbox e download do original |
| `noticias.html` | Radar de produção, destaques selecionados e feed automático de notícias |

## Efeitos e interações

- **Esporos** saem de qualquer clique na página (canvas).
- **Vagalumes** no topo de cada página, clicar solta um enxame que sobe “em direção à luz”.
- **Zona infectada**: máscara de gás ao entrar, lanterna que segue o cursor/dedo, modo escuta (segure `E`), troca por setas ou swipe.
- **Áudio sintetizado** com Web Audio (nenhum arquivo baixado): estalos dos estaladores, clique da lanterna e o violão do Joel (Karplus-Strong). O som fica desligado por padrão, botão no topo.
- Vídeos do YouTube só carregam ao clicar; imagens otimizadas e com lazy loading.
- Respeita `prefers-reduced-motion`.

## Feed de novidades automático

`.github/workflows/novidades-e-deploy.yml` roda a cada 6 horas (e a cada push na `main`):

1. `scripts/fetch-news.mjs` busca notícias no Google Notícias (PT e EN), filtra spam, classifica por assunto (série, jogos, Naughty Dog, produtos) e atualiza `data/noticias.json`.
2. Se houver mudanças, o robô faz commit na `main`.
3. O site é publicado na branch `gh-pages`, que o GitHub Pages serve.

Para rodar manualmente: aba **Actions → Novidades e deploy → Run workflow**.

## Estrutura

```
assets/css/style.css     design system (tokens, componentes, responsivo)
assets/js/main.js        efeitos e módulos compartilhados
assets/js/noticias.js    radar e feed da página de novidades
assets/img/              imagens otimizadas para a web
imagens/                 wallpapers originais (download) e logos
data/noticias.json       feed gerado automaticamente
scripts/fetch-news.mjs   coletor de notícias (Node 20, sem dependências)
```

## Créditos

Projeto de estudo de **Marcos Alencar**. Nomes, imagens e vídeos pertencem à Naughty Dog, Sony Interactive Entertainment, PlayStation Productions e HBO.
