$files = Get-ChildItem -Filter *.html
$ansi = [System.Text.Encoding]::GetEncoding(1252)
$utf8 = [System.Text.Encoding]::UTF8

foreach ($f in $files) {
    if ($f.Name -eq "index.html") { continue }
    
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    
    # Check if the file contains C3 83 (Ã) which indicates double-encoded UTF-8
    $corrupted = $false
    for ($i=0; $i -lt $bytes.Length - 1; $i++) {
        if ($bytes[$i] -eq 195 -and $bytes[$i+1] -eq 131) {
            $corrupted = $true
            break
        }
    }
    
    if ($corrupted) {
        $content = [System.IO.File]::ReadAllText($f.FullName, $utf8)
        $originalBytes = $ansi.GetBytes($content)
        [System.IO.File]::WriteAllBytes($f.FullName, $originalBytes)
        Write-Output "Restored $($f.Name)"
    }
}
