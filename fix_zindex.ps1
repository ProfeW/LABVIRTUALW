$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    if ($content.Contains(".submenu {") -and -not $content.Contains("z-index: 1000")) {
        $content = $content.Replace(".submenu {", ".submenu { z-index: 1000;")
        [IO.File]::WriteAllText($f.FullName, $content, [Text.Encoding]::UTF8)
        Write-Output "Fixed z-index in $($f.Name)"
    }
}
