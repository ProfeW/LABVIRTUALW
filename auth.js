const URL_REGISTRO = 'https://script.google.com/macros/s/AKfycbzZdZ51NTI0qpwXEYiMU-z_hhVXKXYQf84Kf-nmSH3AdgVu9H30SxI5wuqrTBFblhNt/exec';
const URL_INGRESOS = 'https://script.google.com/macros/s/AKfycbz5j7-rl4bRJ5m4jJQEUyGvn-fC_eH74biYcIZZ-zIvp3SybPZwbMkOo8ohRh-N6jXdcw/exec';

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('usuario_labvirtual'));
    const isAuth = !!user;

    // Extraer el nombre de la página actual
    let currentPage = window.location.pathname.split('/').pop();
    if (!currentPage) currentPage = 'index.html'; // Si es el directorio raíz

    // Páginas que requieren autenticación
    const isProtected = currentPage.includes('practica') || currentPage.includes('evaluacion') || currentPage.includes('juego');
    // Páginas exclusivas para invitados (login, registro)
    const isAuthPage = currentPage === 'login.html' || currentPage === 'registro.html' || currentPage === 'recuperar.html';

    // 1. Proteger las rutas directamente
    if (isProtected && !isAuth) {
        window.location.href = 'login.html';
        return;
    }

    if (isAuthPage && isAuth) {
        window.location.href = 'index.html';
        return;
    }

    // 2. Modificar la Barra de Navegación
    const menu = document.querySelector('.menu');
    if (menu) {
        if (isAuth) {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="#" style="background: rgba(46, 204, 113, 0.2); color: #2ecc71; border: 1px solid #2ecc71;">
                    <i class="fa-solid fa-user"></i> Hola, ${user.nombre.split(' ')[0]} <i class="fa-solid fa-chevron-down" style="font-size: 10px;"></i>
                </a>
                <ul class="submenu">
                    <li><a href="#" id="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</a></li>
                </ul>
            `;
            menu.appendChild(li);

            document.getElementById('btn-logout').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('usuario_labvirtual');
                window.location.href = 'index.html';
            });
        } else {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="login.html" style="background: #3498db; color: #fff;">
                    <i class="fa-solid fa-right-to-bracket"></i> Ingresar
                </a>
            `;
            menu.appendChild(li);
        }
    }

    // 3. Deshabilitar los botones hacia páginas protegidas si no hay sesión
    if (!isAuth) {
        // Busca enlaces que vayan a _practica, _evaluacion
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.includes('practica') || href.includes('evaluacion') || href.includes('juego'))) {
                // Cambiar el estilo para que parezca deshabilitado
                link.style.background = '#555';
                link.style.color = '#999';
                link.style.borderColor = '#444';
                link.style.boxShadow = 'none';
                
                // Sobrescribir el clic
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Debes iniciar sesión para acceder a las prácticas y evaluaciones.');
                    window.location.href = 'login.html';
                });
            }
        });
    }
});

// Funciones globales para las llamadas a la base de datos
window.LabAuth = {
    registrar: async function(datos) {
        datos.action = 'register';
        const req = await fetch(URL_REGISTRO, {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(datos)
        });
        return await req.json();
    },
    
    login: async function(usuario, contrasena) {
        const req = await fetch(URL_REGISTRO, {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'login', usuario, contrasena })
        });
        const res = await req.json();
        
        if (res.success) {
            // Guardar en localstorage
            localStorage.setItem('usuario_labvirtual', JSON.stringify({
                usuario: usuario,
                nombre: res.nombre
            }));
            
            // Registrar el ingreso (log de sesión)
            const dateObj = new Date();
            const fecha = dateObj.toLocaleDateString('es-CO');
            const hora = dateObj.toLocaleTimeString('es-CO');
            
            // Enviamos al script de ingresos, pero no bloqueamos el flujo
            fetch(URL_INGRESOS, {
                redirect: 'follow',
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'log_login',
                    usuario: usuario,
                    nombre_completo: res.nombre,
                    fecha: fecha,
                    hora: hora
                })
            }).catch(console.error); // Ignoramos errores de log
        }
        return res;
    },
    
    recuperar: async function(usuario_o_correo) {
        const req = await fetch(URL_REGISTRO, {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'recover', usuario: usuario_o_correo })
        });
        return await req.json();
    }
};
