$rep = [char]65533

$replacements = @(
    @("F" + $rep + "sica", "Física"),
    @("Qu" + $rep + "mica", "Química"),
    @("Biolog" + $rep + "a", "Biología"),
    @("D" + $rep + "cimo", "Décimo"),
    @("Und" + $rep + "cimo", "Undécimo"),
    @("Evaluaci" + $rep + "n", "Evaluación"),
    @("evaluaci" + $rep + "n", "evaluación"),
    @("Pr" + $rep + "ctica", "Práctica"),
    @("pr" + $rep + "ctica", "práctica"),
    @("Contrase" + $rep + "a", "Contraseña"),
    @("contrase" + $rep + "a", "contraseña"),
    @("electr" + $rep + "nico", "electrónico"),
    @("tel" + $rep + "fono", "teléfono"),
    @("Tel" + $rep + "fono", "Teléfono"),
    @("sesi" + $rep + "n", "sesión"),
    @("Sesi" + $rep + "n", "Sesión"),
    @("introducci" + $rep + "n", "introducción"),
    @("Introducci" + $rep + "n", "Introducción"),
    @("aqu" + $rep, "aquí"),
    @($rep + "xito", "éxito"),
    @("n" + $rep + "mero", "número"),
    @("N" + $rep + "mero", "Número"),
    @("m" + $rep + "s", "más"),
    @("M" + $rep + "s", "Más"),
    @("acci" + $rep + "n", "acción"),
    @("Acci" + $rep + "n", "Acción"),
    @("Recuperaci" + $rep + "n", "Recuperación"),
    @("recuperaci" + $rep + "n", "recuperación"),
    @("d" + $rep + "a", "día"),
    @("D" + $rep + "a", "Día"),
    @("est" + $rep, "está"),
    @("Est" + $rep, "Está"),
    @("Men" + $rep, "Menú"),
    @("men" + $rep, "menú"),
    @("inici" + $rep, "inició"),
    @("Atr" + $rep + "s", "Atrás"),
    @("atr" + $rep + "s", "atrás"),
    @("tambi" + $rep + "n", "también"),
    @("Tambi" + $rep + "n", "También"),
    @("soluci" + $rep + "n", "solución"),
    @("Soluci" + $rep + "n", "Solución"),
    @("f" + $rep + "rmula", "fórmula"),
    @("F" + $rep + "rmula", "Fórmula"),
    @("gr" + $rep + "fico", "gráfico"),
    @("Gr" + $rep + "fico", "Gráfico"),
    @("P" + $rep + "rez", "Pérez"),
    @("P" + $rep + "gina", "Página"),
    @("p" + $rep + "gina", "página"),
    @("Cinem" + $rep + "tica", "Cinemática"),
    @("cinem" + $rep + "tica", "cinemática"),
    @("Rectil" + $rep + "neo", "Rectilíneo"),
    @("rectil" + $rep + "neo", "rectilíneo"),
    @("Mec" + $rep + "nica", "Mecánica"),
    @("mec" + $rep + "nica", "mecánica"),
    @("Din" + $rep + "mica", "Dinámica"),
    @("din" + $rep + "mica", "dinámica"),
    @("El" + $rep + "ctrico", "Eléctrico"),
    @("el" + $rep + "ctrico", "eléctrico"),
    @("Magn" + $rep + "tico", "Magnético"),
    @("magn" + $rep + "tico", "magnético"),
    @("Qu" + $rep, "Qué"),
    @("qu" + $rep, "qué"),
    @("C" + $rep + "mo", "Cómo"),
    @("c" + $rep + "mo", "cómo"),
    @("Cu" + $rep + "ndo", "Cuándo"),
    @("cu" + $rep + "ndo", "cuándo"),
    @("D" + $rep + "nde", "Dónde"),
    @("d" + $rep + "nde", "dónde"),
    @("A" + $rep + "ade", "Añade"),
    @("a" + $rep + "ade", "añade")
)

$files = Get-ChildItem -Filter *.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $changed = $false
    foreach ($pair in $replacements) {
        $key = $pair[0]
        $val = $pair[1]
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $val)
            $changed = $true
        }
    }
    if ($changed) {
        [IO.File]::WriteAllText($f.FullName, $content, [Text.Encoding]::UTF8)
        Write-Output "Fixed $($f.Name)"
    }
}
