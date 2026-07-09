$baseDir = "C:\github\angular-clean-architecture"
$tablerSrc = "$baseDir\src\assets\tabler"
$tablerDest = "$baseDir\src\app\features\tabler"

Write-Host "=== Tabler Angular Component Generator ===" -ForegroundColor Cyan
Write-Host "Source: $tablerSrc" -ForegroundColor Gray
Write-Host "Target: $tablerDest" -ForegroundColor Gray

# Read all HTML files (excluding includes/ and layouts/)
$htmlFiles = Get-ChildItem -Path $tablerSrc -Recurse -Filter *.html | Where-Object {
    $_.FullName -notmatch '\\includes\\'
}

Write-Host "Found $($htmlFiles.Count) HTML files (excluding includes/)" -ForegroundColor Yellow

# Map files to component names and categories
function Get-ComponentInfo {
    param([string]$relativePath)
    $parts = $relativePath -split '\\'
    $fileName = $parts[-1] -replace '\.html$', ''

    # Convert kebab-case to PascalCase
    $nameParts = $fileName -split '-'
    $pascalName = ''
    $nameParts | ForEach-Object {
        if ($_) { $pascalName += (Get-Culture).TextInfo.ToTitleCase($_) }
    }

    # Determine category
    if ($parts[0] -eq 'marketing') {
        $category = 'marketing'
    }
    elseif ($parts[0] -eq 'layouts') {
        $category = 'layouts'
    }
    elseif ($parts[0] -eq 'docs') {
        $category = 'docs'
    }
    else {
        # Check if it's an auth page
        $authPages = @('sign-in', 'sign-up', 'sign-in-link', 'sign-in-illustration', 'sign-in-cover', 'forgot-password', 'terms-of-service', 'auth-lock', '2-step-verification', '2-step-verification-code', 'reset-password')
        if ($fileName -in $authPages) {
            $category = 'auth'
        }
        # Check if it's a layout variant
        $layoutPages = @('layout-boxed', 'layout-combo', 'layout-condensed', 'layout-fluid', 'layout-fluid-vertical', 'layout-horizontal', 'layout-navbar-dark', 'layout-navbar-overlap', 'layout-navbar-sticky', 'layout-rtl', 'layout-vertical', 'layout-vertical-right', 'layout-vertical-transparent')
        if ($fileName -in $layoutPages) {
            $category = 'layouts'
        }
        # Default to pages
        if (-not $category) { $category = 'pages' }
    }
    return @{ Category = $category; FileName = $fileName; PascalName = $pascalName }
}

# Counters
$categories = @{}
$processed = 0
$skipped = 0

foreach ($file in $htmlFiles) {
    $relativePath = $file.FullName.Substring($tablerSrc.Length + 1)
    $info = Get-ComponentInfo $relativePath

    $compDir = "$tablerDest\$($info.Category)\$($info.FileName)"
    if (-not (Test-Path $compDir)) {
        New-Item -ItemType Directory -Path $compDir -Force | Out-Null
    }

    # Read HTML and extract main content
    $htmlContent = Get-Content $file.FullName -Raw

    # Extract content between <main id="content" ...> and </main>
    $bodyContent = $null
    if ($htmlContent -match '<main[^>]*id="content"[^>]*class="page-body"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1]
    }
    elseif ($htmlContent -match '<main[^>]*id="content"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1]
    }
    else {
        # Check for layouts/ which use different structure
        if ($htmlContent -match '<div class="page">(.*?)</html>') {
            $bodyContent = $matches[1]
        }
        elseif ($htmlContent -match '<body>(.*?)</body>') {
            $bodyContent = $matches[1]
        }
        else {
            $bodyContent = "<!-- Content from $($info.FileName).html -->"
        }
    }

    # Clean up the content
    $bodyContent = $bodyContent -replace '<script[^>]*>.*?</script>', ''
    $bodyContent = $bodyContent -replace 'src="\./dist/', 'src="assets/tabler/dist/'
    $bodyContent = $bodyContent -replace 'href="\./dist/', 'href="assets/tabler/dist/'
    $bodyContent = $bodyContent -replace 'src="\./static/', 'src="assets/tabler/static/'
    $bodyContent = $bodyContent -replace 'href="\./static/', 'href="assets/tabler/static/'
    $bodyContent = $bodyContent -replace 'href="\./([a-zA-Z])', 'href="tabler/$1'

    # Write the extracted HTML content as component template
    $templatePath = "$compDir\$($info.FileName).component.html"
    $bodyContent.Trim() | Out-File -FilePath $templatePath -Encoding utf8 -Force

    # Save metadata
    $info | ConvertTo-Json | Out-File "$compDir\.component-info.json" -Encoding utf8 -Force

    # Track category
    $cat = $info.Category
    if (-not $categories.ContainsKey($cat)) { $categories[$cat] = 0 }
    $categories[$cat]++

    $processed++
    Write-Host "  [$cat] $($info.FileName) -> $($info.PascalName)Component" -ForegroundColor DarkGray
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Total files processed: $processed" -ForegroundColor Green
Write-Host "`nBy category:" -ForegroundColor Yellow
$categories.Keys | Sort-Object | ForEach-Object {
    Write-Host "  $_ : $($categories[$_])" -ForegroundColor White
}
