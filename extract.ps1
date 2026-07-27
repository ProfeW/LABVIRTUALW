$bytes = [System.IO.File]::ReadAllBytes('index.html')
$s = [System.Text.Encoding]::UTF8.GetString($bytes)
if ($s -match "F(.)sica") {
    Write-Output "Char code: $([int][char]$matches[1])"
}
if ($s -match "D(.)cimo") {
    Write-Output "Char code: $([int][char]$matches[1])"
}
