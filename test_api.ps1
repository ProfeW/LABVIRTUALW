$url = 'https://script.google.com/macros/s/AKfycbzZdZ51NTI0qpwXEYiMU-z_hhVXKXYQf84Kf-nmSH3AdgVu9H30SxI5wuqrTBFblhNt/exec'
$body = @{
    action = 'register'
    nombre_completo = 'Test User'
    correo_electronico = 'test@test.com'
    numero_telefono = '123'
    grado = '10'
    usuario = 'testuser'
    contrasena = '1234'
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType 'text/plain;charset=utf-8'
Write-Output $response
