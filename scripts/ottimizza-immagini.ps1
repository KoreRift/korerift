# ============================================================
#  Ottimizza le immagini dei banner in public/games/
#  - ridimensiona a max 1280px di larghezza (mantiene le proporzioni)
#  - converte in JPG qualita' 82 (molto piu' leggero)
#  - sposta gli originali pesanti in  _immagini-originali/  (backup)
#
#  USO:  npm run ottimizza      (oppure tasto destro > Esegui con PowerShell)
# ============================================================

Add-Type -AssemblyName System.Drawing

$root      = Split-Path -Parent $PSScriptRoot
$gamesDir  = Join-Path $root "public\games"
$backupDir = Join-Path $root "_immagini-originali"
$maxWidth  = 1280
$quality   = 82L

if (-not (Test-Path $gamesDir)) { Write-Host "Cartella non trovata: $gamesDir" -ForegroundColor Red; exit }
if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir | Out-Null }

# Codec JPEG + parametro qualita'
$jpgCodec  = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, $quality)

$files = Get-ChildItem $gamesDir -File | Where-Object { $_.Extension -match "\.(png|jpe?g)$" }
if (-not $files) { Write-Host "Nessuna immagine da ottimizzare in public\games\" -ForegroundColor Yellow; exit }

Write-Host ""
Write-Host "=== Ottimizzazione immagini ===" -ForegroundColor Cyan
Write-Host ""
$totBefore = 0; $totAfter = 0

foreach ($f in $files) {
  $sizeKB = [math]::Round($f.Length / 1KB)

  # Salta i JPG gia' leggeri (probabilmente gia' ottimizzati)
  if ($f.Extension -match "\.jpe?g$" -and $f.Length -lt 600KB) {
    Write-Host ("- {0,-28} {1} KB  (gia' leggero, saltato)" -f $f.Name, $sizeKB) -ForegroundColor DarkGray
    continue
  }

  # Carica l'immagine in memoria (cosi' il file non resta bloccato)
  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  $ms    = New-Object System.IO.MemoryStream (,$bytes)
  $img   = [System.Drawing.Image]::FromStream($ms)

  # Calcola le nuove dimensioni (mantiene le proporzioni)
  $w = $img.Width; $h = $img.Height
  if ($w -gt $maxWidth) { $nw = $maxWidth; $nh = [int][math]::Round($h * $maxWidth / $w) } else { $nw = $w; $nh = $h }

  $bmp = New-Object System.Drawing.Bitmap $nw, $nh
  $g   = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $nw, $nh)
  $g.Dispose(); $img.Dispose(); $ms.Dispose()

  # Sposta l'originale nel backup, poi salva il JPG ottimizzato
  Move-Item $f.FullName (Join-Path $backupDir $f.Name) -Force
  $dst = Join-Path $gamesDir ($f.BaseName + ".jpg")
  $bmp.Save($dst, $jpgCodec, $encParams)
  $bmp.Dispose()

  $newKB = [math]::Round((Get-Item $dst).Length / 1KB)
  $totBefore += $sizeKB; $totAfter += $newKB
  Write-Host ("OK {0,-28} {1} KB -> {2} KB   ({3}x{4} -> {5}x{6})" -f $f.Name, $sizeKB, $newKB, $w, $h, $nw, $nh) -ForegroundColor Green
}

Write-Host ""
Write-Host ("Totale: {0} KB -> {1} KB" -f $totBefore, $totAfter) -ForegroundColor Cyan
Write-Host ("Gli originali sono al sicuro in: {0}" -f $backupDir) -ForegroundColor DarkGray
Write-Host ""
