Coloque aqui os vídeos para o hero

Como usar

1) Formatos recomendados: mp4 (H.264) ou webm (VP9).
2) Resolução sugerida: 1280x720 (720p) ou 1920x1080 (1080p). Evite arquivos muito grandes (preferível < 10–15 MB para web).
3) Nome sugerido: `hero.mp4` ou `hero.webm`.
4) Poster / fallback: coloque uma imagem em `assets/images/hero-poster.jpg` (ex: 1920x1080).

Instruções rápidas

- Para usar direto no HTML, substitua a fonte em `index.html`:
  <source src="assets/videos/hero.mp4" type="video/mp4">

- Ou carregue dinamicamente no console ou no seu script:
  window.setHeroVideo('assets/videos/hero.mp4', 'video/mp4', 'assets/images/hero-poster.jpg');

Notas

- No mobile o vídeo fica oculto automaticamente para poupar dados; o `poster` será exibido.
- Verifique licenciamento e compressão adequada antes de subir (use HandBrake ou FFmpeg para reduzir tamanho).

Se quiser, posso adicionar um arquivo de exemplo (pequeno) ou mover um vídeo que você enviar para este diretório.