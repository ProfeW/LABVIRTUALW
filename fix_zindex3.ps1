$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $lines = Get-Content $f.FullName -Encoding UTF8
    $changed = $false
    for ($i=0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match "^\s*\.submenu\s*\{\s*$") {
            $lines[$i] = $lines[$i] -replace "\{", "{ z-index: 1000;"
            $changed = $true
        }
    }
    if ($changed) {
        [System.IO.File]::WriteAllLines($f.FullName, $lines, [System.Text.Encoding]::UTF8)
        Write-Output "Fixed $($f.Name)"
    }
}
