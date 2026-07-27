$ansi = [System.Text.Encoding]::GetEncoding(1252)
$utf8 = [System.Text.Encoding]::UTF8

$f = "index.html"
$content = [System.IO.File]::ReadAllText($f, $utf8)
$originalBytes = $ansi.GetBytes($content)
[System.IO.File]::WriteAllBytes($f, $originalBytes)
Write-Output "Restored $f"
