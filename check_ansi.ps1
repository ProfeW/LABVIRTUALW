$bytes = [System.IO.File]::ReadAllBytes('index.html')
$ansi = [System.Text.Encoding]::GetEncoding(1252)
$s = $ansi.GetString($bytes)
if ($s -match "F(.)sica") {
    Write-Output "ANSI Char code: $([int][char]$matches[1])"
}
if ($s -match "D(.)cimo") {
    Write-Output "ANSI Char code: $([int][char]$matches[1])"
}
