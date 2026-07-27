$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    if ($content -match "\.submenu\s*\{") {
        if (-not ($content -match "z-index:\s*1000")) {
            $content = $content -replace "\.submenu\s*\{", ".submenu { z-index: 1000;"
            [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Output "Fixed $($f.Name)"
        }
    }
}
