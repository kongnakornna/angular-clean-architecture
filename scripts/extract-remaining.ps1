$tablerSrc = "C:\github\angular-clean-architecture\src\assets\tabler"
$tablerOut = "C:\github\angular-clean-architecture\src\app\features\tabler"

# Manual mapping of remaining placeholder files to their compiled HTML sources
$remainingMap = @(
    @{ Comp = 'pages/index/index.component.html'; Src = 'index.html' }
    @{ Comp = 'pages/pay/pay.component.html'; Src = 'pay.html' }
    @{ Comp = 'pages/pricing/pricing.component.html'; Src = 'pricing.html' }
    @{ Comp = 'pages/prose/prose.component.html'; Src = 'prose.html' }
    @{ Comp = 'pages/settings/settings.component.html'; Src = 'settings.html' }
    @{ Comp = 'marketing/about/about.component.html'; Src = 'about.html' }
    @{ Comp = 'marketing/hero/hero.component.html'; Src = 'hero.html' }
    @{ Comp = 'marketing/real-estate/real-estate.component.html'; Src = 'real-estate.html' }
    @{ Comp = 'marketing/testimonials/testimonials.component.html'; Src = 'testimonials.html' }
    @{ Comp = 'marketing/text/text.component.html'; Src = 'text.html' }
    @{ Comp = 'auth/sign-in-cover/sign-in-cover.component.html'; Src = 'sign-in-cover.html' }
    @{ Comp = 'docs/index/index.component.html'; Src = 'docs/index.html' }
    @{ Comp = 'layouts/base/base.component.html'; Src = 'layouts/base.html' }
    @{ Comp = 'layouts/card/card.component.html'; Src = 'layouts/card.html' }
    @{ Comp = 'layouts/default/default.component.html'; Src = 'layouts/default.html' }
    @{ Comp = 'layouts/error/error.component.html'; Src = 'layouts/error.html' }
    @{ Comp = 'layouts/homepage/homepage.component.html'; Src = 'layouts/homepage.html' }
    @{ Comp = 'layouts/marketing/marketing.component.html'; Src = 'layouts/marketing.html' }
    @{ Comp = 'layouts/redirect/redirect.component.html'; Src = 'layouts/redirect.html' }
    @{ Comp = 'layouts/single/single.component.html'; Src = 'layouts/single.html' }
)

$success = 0
foreach ($item in $remainingMap) {
    $srcPath = "$tablerSrc\$($item.Src)"
    $outPath = "$tablerOut\$($item.Comp)"
    
    if (-not (Test-Path $srcPath)) {
        Write-Output "SRC NOT FOUND: $srcPath"
        continue
    }
    if (-not (Test-Path $outPath)) {
        Write-Output "OUT NOT FOUND: $outPath"
        continue
    }
    
    $htmlContent = Get-Content $srcPath -Raw -Encoding UTF8
    $bodyContent = $null
    
    # Try to extract from main content area
    if ($htmlContent -match '(?s)<main[^>]*id="content"[^>]*class="page-body"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
    }
    elseif ($htmlContent -match '(?s)<main[^>]*id="content"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
    }
    elseif ($htmlContent -match '(?s)<body[^>]*>(.*?)</body>') {
        $bodyContent = $matches[1].Trim()
    }
    # For Liquid templates in layouts/ directory
    elseif ($htmlContent -match '(?s)\{% include "layout/sidebar" %}') {
        # It's a Liquid layout template - extract the structure
        $bodyContent = $htmlContent
    }
    
    if (-not $bodyContent) {
        Write-Output "NO CONTENT: $($item.Src)"
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
    $bodyContent = $bodyContent -replace 'href="./dist/', 'href="assets/tabler/dist/'
    $bodyContent = $bodyContent -replace '\{\{ content \}\}', ''
    $bodyContent = $bodyContent.Trim()
    
    if ($bodyContent.Length -lt 20) {
        Write-Output "TOO SHORT: $($item.Src) - $($bodyContent.Length) chars"
        continue
    }
    
    Set-Content -Path $outPath -Value $bodyContent -Force -Encoding UTF8
    Write-Output "OK: $($item.Src) -> $($item.Comp) ($($bodyContent.Length) chars)"
    $success++
}

Write-Output "`nDone! Processed $success files"

# Final check
$remaining = Get-ChildItem "$tablerOut" -Recurse -Filter "*.component.html" | Where-Object {
    (Get-Content $_.FullName -Raw) -match '<!-- Content from'
}
Write-Output "Remaining placeholders: $($remaining.Count)"
$remaining | ForEach-Object { Write-Output "  $($_.FullName)" }
