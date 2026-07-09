$baseDir = "C:\github\angular-clean-architecture"
$tablerSrc = "$baseDir\src\assets\tabler"
$tablerOut = "$baseDir\src\app\features\tabler"

# Comprehensive mapping of all component directories to their source files
$mapping = @()

# ---- PAGES (root HTML files) ----
$pagesFiles = Get-ChildItem $tablerSrc -Filter "*.html" -File | Where-Object { $_.DirectoryName -notlike "*\includes\*" -and $_.Name -notlike "*_redirects*" }
$excludePages = @('index', 'pay', 'pricing', 'prose', 'settings')  # also exist in other categories
$catSubfolders = @{ 'auth' = @('sign-in', 'sign-up', 'forgot-password', 'auth-lock', 'terms-of-service', 'sign-in-cover', 'sign-in-illustration', 'sign-in-link', '2-step-verification', '2-step-verification-code')
    'marketing' = @('about', 'hero', 'index', 'pricing', 'real-estate', 'testimonials', 'text')
    'docs' = @('index')
    'layouts' = @('base', 'card', 'default', 'error', 'homepage', 'marketing', 'pay', 'prose', 'redirect', 'settings', 'single', 'layout-boxed', 'layout-combo', 'layout-condensed', 'layout-fluid', 'layout-fluid-vertical', 'layout-horizontal', 'layout-navbar-dark', 'layout-navbar-overlap', 'layout-navbar-sticky', 'layout-rtl', 'layout-vertical', 'layout-vertical-right', 'layout-vertical-transparent')
}
$allCatFiles = @{}; foreach ($k in $catSubfolders.Keys) { foreach ($f in $catSubfolders[$k]) { $allCatFiles[$f] = $k } }

# Marketing root files (about.html, hero.html, etc.) - check first
$marketingRootFiles = @('about', 'hero', 'real-estate', 'testimonials', 'text')
foreach ($f in $marketingRootFiles) {
    $path = "$tablerSrc\$f.html"
    if (Test-Path $path) {
        $mapping += @{ File = $f; Cat = 'marketing'; Path = $path; CategoryDir = 'marketing' }
    }
}

# Auth root files  
$authRootFiles = @('sign-in-cover')
foreach ($f in $authRootFiles) {
    $path = "$tablerSrc\$f.html"
    if (Test-Path $path) {
        $mapping += @{ File = $f; Cat = 'auth'; Path = $path; CategoryDir = 'auth' }
    }
}

# Layout root files (pay.html, prose.html, settings.html)
$layoutRootFiles = @('pay', 'prose', 'settings')
foreach ($f in $layoutRootFiles) {
    $path = "$tablerSrc\$f.html"
    if (Test-Path $path) {
        $mapping += @{ File = $f; Cat = 'layouts'; Path = $path; CategoryDir = 'layouts' }
    }
}

# Pages - everything else
foreach ($pFile in $pagesFiles) {
    $bn = $pFile.BaseName
    # Skip if assigned to subcategory
    if ($allCatFiles.ContainsKey($bn) -and $allCatFiles[$bn] -ne 'pages') {
        continue
    }
    # Skip marketing/layout root files already handled
    if ($marketingRootFiles -contains $bn) { continue }
    if ($authRootFiles -contains $bn) { continue }
    if ($layoutRootFiles -contains $bn) { continue }
    
    $mapping += @{ File = $bn; Cat = 'pages'; Path = $pFile.FullName; CategoryDir = 'pages' }
}

Write-Output "Total files to process: $($mapping.Count)"

$success = 0; $failed = @()

foreach ($item in $mapping) {
    $fileName = $item.File
    $catDir = $item.CategoryDir
    $filePath = $item.Path
    
    $htmlContent = Get-Content $filePath -Raw
    $bodyContent = $null
    
    # Priority 1: <main id="content" class="page-body">
    if ($htmlContent -match '(?s)<main[^>]*id="content"[^>]*class="page-body"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
    }
    
    # Priority 2: <main id="content">
    if (-not $bodyContent -and $htmlContent -match '(?s)<main[^>]*id="content"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
    }
    
    # Priority 3: <div class="page"> ... (full body extraction for non-standard layouts)
    if (-not $bodyContent -and $htmlContent -match '(?s)<div class="page[^>]*">(.*?)</div>\s*</body>') {
        $bodyContent = $matches[1].Trim()
    }
    
    # Priority 4: <body> content
    if (-not $bodyContent -and $htmlContent -match '(?s)<body[^>]*>(.*?)</body>') {
        $bodyContent = $matches[1].Trim()
    }
    
    if (-not $bodyContent -or $bodyContent.Length -lt 50) {
        $failed += "$fileName - no content"
        continue
    }
    
    # Clean up
    $bodyContent = $bodyContent -replace '(?s)<a[^>]*class="visually-hidden skip-link"[^>]*>.*?</a>', ''
    $bodyContent = $bodyContent -replace '(?s)<script[^>]*tabler-theme[^>]*>.*?</script>', ''
    $bodyContent = $bodyContent -replace '(?s)<!-- BEGIN .*? -->', ''
    $bodyContent = $bodyContent -replace '(?s)<!-- END .*? -->', ''
    $bodyContent = $bodyContent -replace '\./dist/', 'assets/tabler/dist/'
    $bodyContent = $bodyContent -replace '\./static/', 'assets/tabler/static/'
    $bodyContent = $bodyContent -replace 'src="./preview/', 'src="assets/tabler/preview/'
    $bodyContent = $bodyContent -replace 'href="./preview/', 'href="assets/tabler/preview/'
    $bodyContent = $bodyContent -replace '\{\{ content \}\}', ''
    $bodyContent = $bodyContent.Trim()
    
    # Determine output
    $outFile = "$tablerOut\$catDir\$fileName\$fileName.component.html"
    if (Test-Path $outFile) {
        Set-Content -Path $outFile -Value $bodyContent -Force -Encoding UTF8
        $success++
    } else {
        $failed += "$fileName - output missing: $outFile"
    }
}

Write-Output "`n=== Results ==="
Write-Output "Success: $success"
Write-Output "Failed: $($failed.Count)"
if ($failed.Count -gt 0) { $failed | ForEach-Object { Write-Output "  - $_" } }

# Check remaining placeholders
$remaining = Get-ChildItem "$tablerOut" -Recurse -Filter "*.component.html" | Where-Object {
    (Get-Content $_.FullName -Raw) -match '<!-- Content from'
}
Write-Output "`nRemaining placeholders: $($remaining.Count)"
$remaining | ForEach-Object { Write-Output "  $($_.FullName)" }
