# ============================================================
#  Importa e ottimizza gli asset di un gioco (personaggi, armi, moduli)
#  - copia da una cartella sorgente a  public/games/<slug>/
#  - ridimensiona a max 256px MANTENENDO la trasparenza (PNG)
#
#  USO:
#    npm run asset -- -Source "C:\percorso\cartella" -Slug nte
# ============================================================
param(
  [Parameter(Mandatory=$true)][string]$Source,
  [Parameter(Mandatory=$true)][string]$Slug
)

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$dst  = Join-Path $root "public\games\$Slug"
$max  = 256

if (-not (Test-Path $Source)) { Write-Host "Cartella sorgente non trovata: $Source" -ForegroundColor Red; exit }
if (-not (Test-Path $dst)) { New-Item -ItemType Directory -Path $dst | Out-Null }

$jpgCodec  = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, 88L)

$files = Get-ChildItem $Source -File | Where-Object { $_.Extension -match "\.(png|jpe?g)$" }
if (-not $files) { Write-Host "Nessuna immagine in $Source" -ForegroundColor Yellow; exit }

Write-Host ""
Write-Host "=== Import asset -> public/games/$Slug/ ===" -ForegroundColor Cyan
Write-Host ""
$count = 0; $totKB = 0

foreach ($f in $files) {
  $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
  $ms = New-Object System.IO.MemoryStream (,$bytes)
  $img = [System.Drawing.Image]::FromStream($ms)
  $w = $img.Width; $h = $img.Height
  if ($w -gt $max -or $h -gt $max) { $r=[math]::Min($max/$w,$max/$h); $nw=[int]($w*$r); $nh=[int]($h*$r) } else { $nw=$w; $nh=$h }

  $bmp = New-Object System.Drawing.Bitmap $nw, $nh
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.DrawImage($img, 0, 0, $nw, $nh)
  $g.Dispose(); $img.Dispose(); $ms.Dispose()

  $out = Join-Path $dst $f.Name
  if ($f.Extension -match "\.png$") {
    $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)   # mantiene la trasparenza
  } else {
    $bmp.Save($out, $jpgCodec, $encParams)
  }
  $bmp.Dispose()
  $count++; $totKB += [math]::Round((Get-Item $out).Length/1KB)
}

Write-Host ("Importati $count file (totale ~$totKB KB) in:") -ForegroundColor Green
Write-Host "  $dst"
Write-Host ""
