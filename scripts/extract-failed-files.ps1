$baseDir = "C:\github\angular-clean-architecture"
$tablerSrc = "$baseDir\src\assets\tabler"
$tablerOut = "$baseDir\src\app\features\tabler"

# Map of failed files to their categories
$failedFiles = @{
    'error-404' = 'pages'
    'error-500' = 'pages'
    'error-maintenance' = 'pages'
    'sign-in-cover' = 'auth'
    'markdown' = 'pages'
}

foreach ($fileName in $failedFiles.Keys) {
    $cat = $failedFiles[$fileName]
    $filePath = "$tablerSrc\$fileName.html"
    
    if (-not (Test-Path $filePath)) {
        Write-Output "NOT FOUND: $filePath"
        continue
    }
    
    $htmlContent = Get-Content $filePath -Raw
    $bodyContent = $null
    
    # Try all patterns with [^>]* to handle attributes
    if ($htmlContent -match '(?s)<main[^>]*id="content"[^>]*class="page-body"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
        Write-Output "$fileName: matched main#content.page-body"
    }
    
    if (-not $bodyContent -and $htmlContent -match '(?s)<main[^>]*id="content"[^>]*>(.*?)</main>') {
        $bodyContent = $matches[1].Trim()
        Write-Output "$fileName: matched main#content"
    }
    
    # For error pages and others - extract body content, removing the outer layout chrome
    if (-not $bodyContent -and $htmlContent -match '(?s)<body[^>]*>(.*?)</body>') {
        $fullBody = $matches[1].Trim()
        # Remove theme script
        $fullBody = $fullBody -replace '(?s)<script[^>]*tabler-theme[^>]*>.*?</script>', ''
        # Remove skip-link
        $fullBody = $fullBody -replace '(?s)<a[^>]*class="visually-hidden skip-link"[^>]*>.*?</a>', ''
        # Remove <!-- BEGIN/END GLOBAL THEME SCRIPT -->
        $fullBody = $fullBody -replace '(?s)<!-- BEGIN .*? -->', ''
        $fullBody = $fullBody -replace '(?s)<!-- END .*? -->', ''
        $fullBody = $fullBody.Trim()
        
        # Check if we got useful content
        if ($fullBody.Length -gt 100) {
            $bodyContent = $fullBody
            Write-Output "$fileName: extracted from <body>"
        }
    }
    
    # For markdown.html which is just a redirect page
    if (-not $bodyContent) {
        Write-Output "$fileName: no useful content found, skipping"
        # Leave the existing placeholder comment
        continue
    }
    
    # Clean asset paths
    $bodyContent = $bodyContent -replace '\./dist/', 'assets/tabler/dist/'
    $bodyContent = $bodyContent -replace '\./static/', 'assets/tabler/static/'
    $bodyContent = $bodyContent -replace 'src="./preview/', 'src="assets/tabler/preview/'
    $bodyContent = $bodyContent -replace 'href="./preview/', 'href="assets/tabler/preview/'
    $bodyContent = $bodyContent -replace '\{\{ content \}\}', ''
    
    # Determine output path
    if ($cat -eq "pages") {
        $outFile = "$tablerOut\pages\$fileName\$fileName.component.html"
    } elseif ($cat -eq "auth") {
        $outFile = "$tablerOut\auth\$fileName\$fileName.component.html"
    }
    
    if (Test-Path $outFile) {
        Set-Content -Path $outFile -Value $bodyContent -Force -Encoding UTF8
        Write-Output "  -> Written to $outFile ($($bodyContent.Length) chars)"
    } else {
        Write-Output "  -> OUTPUT NOT FOUND: $outFile"
    }
}

Write-Output "`nDone!"
