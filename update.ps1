$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    if ($content -notmatch '<script src="auth\.js"></script>') {
        $content = $content -replace '</body>', "<script src=`"auth.js`"></script>`n</body>"
        [IO.File]::WriteAllText($f.FullName, $content, [Text.Encoding]::UTF8)
        Write-Output "Updated $($f.Name)"
    }
}
