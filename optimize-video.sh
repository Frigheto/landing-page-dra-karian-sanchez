#!/bin/bash

# Script para otimizar o vídeo hero usando FFmpeg
# Reduz o tamanho mantendo qualidade visual aceitável

echo "🎬 Otimizando vídeo hero..."

INPUT="assets/videos/hero-video.mp4"
OUTPUT="assets/videos/hero-video-optimized.mp4"
BACKUP="assets/videos/hero-video-original.mp4"

# Verificar se FFmpeg está instalado
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg não encontrado!"
    echo "📥 Instale com: brew install ffmpeg"
    exit 1
fi

# Verificar se o arquivo existe
if [ ! -f "$INPUT" ]; then
    echo "❌ Arquivo $INPUT não encontrado!"
    exit 1
fi

# Fazer backup do original
echo "💾 Fazendo backup do original..."
cp "$INPUT" "$BACKUP"

# Otimizar vídeo
# - Resolução máxima 1280x720 (HD)
# - Bitrate de vídeo: 800k (boa qualidade para web)
# - Codec H.264 com preset slower para melhor compressão
# - Remove áudio (não necessário em vídeo hero mudo)
echo "⚙️  Comprimindo vídeo..."
ffmpeg -i "$INPUT" \
  -vf "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease" \
  -c:v libx264 \
  -preset slower \
  -crf 28 \
  -b:v 800k \
  -maxrate 1000k \
  -bufsize 2000k \
  -an \
  -movflags +faststart \
  -y \
  "$OUTPUT"

# Mostrar comparação de tamanho
ORIGINAL_SIZE=$(du -h "$INPUT" | cut -f1)
NEW_SIZE=$(du -h "$OUTPUT" | cut -f1)

echo ""
echo "✅ Otimização concluída!"
echo "📊 Tamanho original: $ORIGINAL_SIZE"
echo "📊 Tamanho otimizado: $NEW_SIZE"
echo ""
echo "🔄 Para usar o vídeo otimizado:"
echo "   mv assets/videos/hero-video-optimized.mp4 assets/videos/hero-video.mp4"
echo ""
echo "⚠️  Para restaurar o original:"
echo "   mv assets/videos/hero-video-original.mp4 assets/videos/hero-video.mp4"
