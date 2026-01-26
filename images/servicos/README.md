# Imagens dos Serviços

Coloque aqui as fotos dos cartões da seção "Tratamentos e Serviços".

## Nomes de arquivos (use estes slugs)
- clareamento-consultorio-480.jpg / -800.jpg / -1200.jpg
- clareamento-caseiro-480.jpg / -800.jpg / -1200.jpg
- invisalign-480.jpg / -800.jpg / -1200.jpg
- botox-harmonizacao-480.jpg / -800.jpg / -1200.jpg
- clinica-geral-480.jpg / -800.jpg / -1200.jpg
- limpeza-prevencao-480.jpg / -800.jpg / -1200.jpg
- ortodontia-480.jpg / -800.jpg / -1200.jpg

Opcional: também pode gerar versões .webp com o mesmo padrão de nomes.

## Recomendações
- Tamanho recomendado: 1200px no lado maior (paisagem), proporção ~16:9.
- Qualidade: otimizar para web (qualidade 75–85).
- Evite nomes com espaços; use hífen.

## Como gerar tamanhos no macOS
```bash
# Gerar 1200, 800 e 480 px (lado maior)
sips -Z 1200 foto-origem.jpg --out nome-1200.jpg
sips -Z 800  foto-origem.jpg --out nome-800.jpg
sips -Z 480  foto-origem.jpg --out nome-480.jpg

# (Opcional) Converter para WebP
# Necessita: brew install webp
cwebp -q 80 nome-1200.jpg -o nome-1200.webp
cwebp -q 80 nome-800.jpg  -o nome-800.webp
cwebp -q 80 nome-480.jpg  -o nome-480.webp
```

Depois de adicionar as imagens, a página já estará apontando para este diretório.
