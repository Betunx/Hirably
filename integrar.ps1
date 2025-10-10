# Script de Integracion - Hirably
Write-Host "Hirably - Integracion de Componentes" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar angular.json
if (-Not (Test-Path "angular.json")) {
    Write-Host "ERROR: No se encontro angular.json" -ForegroundColor Red
    Write-Host "Ejecuta desde la raiz de tu proyecto Angular" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "Proyecto Angular detectado" -ForegroundColor Green
Write-Host ""

# Pedir ruta
Write-Host "Donde descargaste angular-hirably?" -ForegroundColor Cyan
Write-Host "Ejemplo: C:\Users\Humbe\Downloads\angular-hirably" -ForegroundColor Gray
$sourcePath = Read-Host "Ruta completa"

if (-Not (Test-Path $sourcePath)) {
    Write-Host "ERROR: No se encontro la carpeta" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "Carpeta encontrada" -ForegroundColor Green
Write-Host ""

# Crear carpetas
Write-Host "Creando carpetas..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path "src\app\components" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\services" -Force | Out-Null
New-Item -ItemType Directory -Path "src\app\models" -Force | Out-Null
New-Item -ItemType Directory -Path "src\assets\images\people" -Force | Out-Null
New-Item -ItemType Directory -Path "src\assets\images\testimonials" -Force | Out-Null
Write-Host "Carpetas creadas" -ForegroundColor Green
Write-Host ""

# Copiar componentes
Write-Host "Copiando componentes..." -ForegroundColor Cyan
$components = @("hero-section", "stats-bar", "why-hirably", "how-it-works", "roles-carousel", "testimonials-carousel")

foreach ($comp in $components) {
    $sourceComp = Join-Path $sourcePath "src\app\components\$comp"
    if (Test-Path $sourceComp) {
        Copy-Item -Path $sourceComp -Destination "src\app\components\" -Recurse -Force
        Write-Host "  $comp copiado" -ForegroundColor Green
    }
}
Write-Host ""

# Copiar servicio
Write-Host "Copiando servicio..." -ForegroundColor Cyan
$serviceFile = Join-Path $sourcePath "src\app\services\data.service.ts"
if (Test-Path $serviceFile) {
    Copy-Item -Path $serviceFile -Destination "src\app\services\" -Force
    Write-Host "data.service.ts copiado" -ForegroundColor Green
}
Write-Host ""

# Copiar modelo
Write-Host "Copiando modelo..." -ForegroundColor Cyan
$modelFile = Join-Path $sourcePath "src\app\models\people.model.ts"
if (Test-Path $modelFile) {
    Copy-Item -Path $modelFile -Destination "src\app\models\" -Force
    Write-Host "people.model.ts copiado" -ForegroundColor Green
}
Write-Host ""

# Copiar tailwind
Write-Host "Copiando Tailwind config..." -ForegroundColor Cyan
$tailwindFile = Join-Path $sourcePath "tailwind.config.js"
if (Test-Path $tailwindFile) {
    Copy-Item -Path $tailwindFile -Destination "." -Force
    Write-Host "tailwind.config.js copiado" -ForegroundColor Green
}
Write-Host ""

# Copiar styles
Write-Host "Copiando styles.css..." -ForegroundColor Cyan
if (Test-Path "src\styles.css") {
    Copy-Item -Path "src\styles.css" -Destination "src\styles.css.backup" -Force
    Write-Host "Backup creado: styles.css.backup" -ForegroundColor Blue
}
$stylesFile = Join-Path $sourcePath "src\styles.css"
if (Test-Path $stylesFile) {
    Copy-Item -Path $stylesFile -Destination "src\" -Force
    Write-Host "styles.css copiado" -ForegroundColor Green
}
Write-Host ""

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "INTEGRACION COMPLETADA!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "PROXIMOS PASOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Actualiza src\app\app.module.ts" -ForegroundColor White
Write-Host "   Agrega los imports de componentes" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Instala Tailwind:" -ForegroundColor White
Write-Host "   npm install -D tailwindcss postcss autoprefixer" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Ejecuta:" -ForegroundColor White
Write-Host "   ng serve" -ForegroundColor Gray
Write-Host ""

Write-Host "Que agregar en app.module.ts?" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTS (al inicio):" -ForegroundColor Yellow
Write-Host "import { HeroSectionComponent } from './components/hero-section/hero-section.component';" -ForegroundColor White
Write-Host "import { StatsBarComponent } from './components/stats-bar/stats-bar.component';" -ForegroundColor White
Write-Host "import { WhyHirablyComponent } from './components/why-hirably/why-hirably.component';" -ForegroundColor White
Write-Host "import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';" -ForegroundColor White
Write-Host "import { RolesCarouselComponent } from './components/roles-carousel/roles-carousel.component';" -ForegroundColor White
Write-Host "import { TestimonialsCarouselComponent } from './components/testimonials-carousel/testimonials-carousel.component';" -ForegroundColor White
Write-Host "import { DataService } from './services/data.service';" -ForegroundColor White
Write-Host ""
Write-Host "DECLARATIONS (dentro del @NgModule):" -ForegroundColor Yellow
Write-Host "HeroSectionComponent," -ForegroundColor White
Write-Host "StatsBarComponent," -ForegroundColor White
Write-Host "WhyHirablyComponent," -ForegroundColor White
Write-Host "HowItWorksComponent," -ForegroundColor White
Write-Host "RolesCarouselComponent," -ForegroundColor White
Write-Host "TestimonialsCarouselComponent" -ForegroundColor White
Write-Host ""
Write-Host "PROVIDERS:" -ForegroundColor Yellow
Write-Host "DataService" -ForegroundColor White
Write-Host ""

Read-Host "Presiona Enter para salir"
