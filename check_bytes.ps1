$bytes = [System.IO.File]::ReadAllBytes('index.html')
$idx = 0
for ($i=0; $i -lt $bytes.Length; $i++) {
    if ($bytes[$i] -eq 70 -and $bytes[$i+1] -eq 239) {
        $idx = $i
        break
    }
}
$slice = $bytes[$idx..($idx+10)]
$hex = [System.BitConverter]::ToString($slice)
Write-Output $hex
