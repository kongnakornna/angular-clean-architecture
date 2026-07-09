$baseDir = "C:\github\angular-clean-architecture"
$tablerSrc = "$baseDir\src\assets\tabler"
$tablerOut = "$baseDir\src\app\features\tabler"

# Category mapping from the original script
$cats = @{
    'auth' = @('sign-in', 'sign-up', 'forgot-password', 'auth-lock', 'terms-of-service', 'sign-in-cover', 'sign-in-illustration', 'sign-in-link', '2-step-verification', '2-step-verification-code')
    'marketing' = @('about', 'hero', 'index', 'pricing', 'real-estate', 'testimonials', 'text')
    'docs' = @('docs/index')
    'layouts' = @('base', 'card', 'default', 'error', 'homepage', 'marketing', 'pay', 'prose', 'redirect', 'settings', 'single', 'layout-boxed', 'layout-combo', 'layout-condensed', 'layout-fluid', 'layout-fluid-vertical', 'layout-horizontal', 'layout-navbar-dark', 'layout-navbar-overlap', 'layout-navbar-sticky', 'layout-rtl', 'layout-vertical', 'layout-vertical-right', 'layout-vertical-transparent')
}

# Get all HTML files from tabler src (excluding includes/)
$allFiles = Get-ChildItem -Path $tablerSrc -Filter "*.html" -File | Where-Object { $_.DirectoryName -notlike "*\includes\*" -and $_.Name -notlike "*_redirects*" }

$count = 0
$failed = @()

foreach ($file in $allFiles) {
    $fileName = $file.BaseName
    $filePath = $file.FullName
    
    # Determine category and relative path
    $cat = "pages"
    $relPath = $fileName
    
    foreach ($c in $cats.Keys) {
        if ($cats[$c] -contains $fileName) {
            $cat = $c
            break
        }
    }
    
    # Handle docs/index
    if ($fileName -eq "index" -and $cat -eq "docs") { $relPath = "docs/index" }
    # Handle marketing/index
    if ($fileName -eq "index" -and $cat -eq "marketing") { $relPath = "marketing/index" }
    
    # Read file content
    $htmlContent = Get-Content $filePath -Raw
    
    if (-not $htmlContent) {
        $failed += "$fileName - empty file"
        continue
    }
    
    # Extract content - try multiple patterns
    $bodyContent = $null
    
    # Priority 1: <main id="content" class="page-body">...</main>
    if ($htmlContent -match '(?s)<main[^>]*id="content"[^>]*class="page-body"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
    }
    
    # Priority 2: <main id="content">...</main>
    if (-not $bodyContent -and $htmlContent -match '(?s)<main[^>]*id="content"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
    }
    
    # Priority 3: For layouts, content between <div class="page"> and </html>
    if (-not $bodyContent -and $htmlContent -match '(?s)<div class="page">(.*?)</html>') {
        $bodyContent = $matches[1].Trim()
    }
    
    # Priority 4: <body>...</body>
    if (-not $bodyContent -and $htmlContent -match '(?s)<body>(.*?)</body>') {
        $bodyContent = $matches[1].Trim()
    }
    
    if (-not $bodyContent) {
        $failed += "$fileName - no content extracted"
        continue
    }
    
    # Clean up extracted content
    # Remove skip-link
    $bodyContent = $bodyContent -replace '(?s)<a[^>]*class="visually-hidden skip-link"[^>]*>.*?</a>', ''
    
    # Replace relative asset paths
    $bodyContent = $bodyContent -replace '\./dist/', 'assets/tabler/dist/'
    $bodyContent = $bodyContent -replace '\./static/', 'assets/tabler/static/'
    $bodyContent = $bodyContent -replace 'src="./preview/', 'src="assets/tabler/preview/'
    $bodyContent = $bodyContent -replace 'href="./preview/', 'href="assets/tabler/preview/'
    
    # Remove theme script
    $bodyContent = $bodyContent -replace '(?s)<script[^>]*tabler-theme[^>]*>.*?</script>', ''
    
    # Remove SVGs that are just icons from tabler.io (keep inline SVGs)
    # Actually keep them - they're part of the demo content
    
    # Remove any BEGIN/END comments
    $bodyContent = $bodyContent -replace '(?s)<!-- BEGIN .*? -->', ''
    $bodyContent = $bodyContent -replace '(?s)<!-- END .*? -->', ''
    
    # Convert Liquid template syntax {{ content }} - keep as Angular template expressions won't conflict
    # Tabler's {{ content }} should be empty in the extracted HTML since it was already rendered
    $bodyContent = $bodyContent -replace '\{\{ content \}\}', ''
    
    # Trim extra whitespace
    $bodyContent = $bodyContent.Trim()
    
    if (-not $bodyContent) {
        $failed += "$fileName - empty after cleaning"
        continue
    }
    
    # Determine output path
    if ($cat -eq "pages") {
        $outDir = "$tablerOut\pages\$fileName"
    } elseif ($cat -eq "auth") {
        $outDir = "$tablerOut\auth\$fileName"
    } elseif ($cat -eq "marketing") {
        if ($fileName -eq "index") {
            $outDir = "$tablerOut\marketing\index"
        } else {
            $outDir = "$tablerOut\marketing\$fileName"
        }
    } elseif ($cat -eq "docs") {
        $outDir = "$tablerOut\docs\index"
    } elseif ($cat -eq "layouts") {
        $outDir = "$tablerOut\layouts\$fileName"
    } else {
        $failed += "$fileName - unknown category $cat"
        continue
    }
    
    $outFile = "$outDir\$fileName.component.html"
    
    # Check if output directory exists
    if (-not (Test-Path $outDir)) {
        $failed += "$fileName - output dir missing: $outDir"
        continue
    }
    
    # Write the file
    Set-Content -Path $outFile -Value $bodyContent -Force -Encoding UTF8
    $count++
}

Write-Output "=== Extraction Complete ==="
Write-Output "Successfully extracted: $count files"
Write-Output "Failed: $($failed.Count) files"
if ($failed.Count -gt 0) {
    Write-Output "Failed files:"
    $failed | ForEach-Object { Write-Output "  - $_" }
}
