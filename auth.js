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

    const isAdminPage = currentPage === 'admin.html';

    // 1. Proteger las rutas directamente
    if (isProtected && !isAuth) {
        window.location.href = 'login.html';
        return;
    }

    if (isAdminPage && (!isAuth || user.usuario !== 'profew')) {
        window.location.href = 'index.html';
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
                    ${user.usuario === 'profew' ? '<li><a href="admin.html" style="color: #f1c40f;"><i class="fa-solid fa-gear"></i> Panel Admin</a></li>' : ''}
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
    },

    getUsers: async function() {
        const req = await fetch(URL_REGISTRO, {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'get_users' })
        });
        return await req.json();
    },

    updateUser: async function(datos) {
        datos.action = 'update_user';
        const req = await fetch(URL_REGISTRO, {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(datos)
        });
        return await req.json();
    },

    deleteUser: async function(usuarioId) {
        const req = await fetch(URL_REGISTRO, {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'delete_user', usuario: usuarioId })
        });
        return await req.json();
    },

    getLogs: async function() {
        const req = await fetch(URL_INGRESOS, {
            redirect: 'follow',
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'get_logs' })
        });
        return await req.json();
    }
};

// ==========================================
// INTEGRACIÓN AUTOMÁTICA CON FIRESTORE PARA TODAS LAS EVALUACIONES
// ==========================================
(function() {
    let currentPage = window.location.pathname.split('/').pop();
    // Solo inyectar en evaluaciones o practicas
    if(!currentPage.includes('evaluacion') && !currentPage.includes('practica')) return;

    // Si ya existe firebase, solo inicializamos el listener
    if(typeof firebase !== 'undefined') {
        initFirebaseEvaluacion();
        return;
    }
    
    // Cargar Firebase App v8
    let scriptApp = document.createElement('script');
    scriptApp.src = "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
    document.head.appendChild(scriptApp);

    scriptApp.onload = function() {
        let scriptFS = document.createElement('script');
        scriptFS.src = "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js";
        document.head.appendChild(scriptFS);
        
        scriptFS.onload = function() {
            // Inicializar Firestore
            const firebaseConfig = {
                apiKey: "AIzaSyBNjJw7xUyNplALmQBQCapzNzr1C79vTDc",
                authDomain: "labvirtual-profew.firebaseapp.com",
                projectId: "labvirtual-profew",
                storageBucket: "labvirtual-profew.firebasestorage.app",
                messagingSenderId: "981474222295",
                appId: "1:981474222295:web:5f413bb53231afc4bb1092"
            };
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            initFirebaseEvaluacion();
        }
    }
})();

function initFirebaseEvaluacion() {
    document.body.addEventListener('click', (e) => {
        let btn = e.target.closest('button') || e.target.closest('input') || e.target.closest('.btn') || e.target.closest('.btn-enviar') || e.target;
        
        let text = (btn.innerText || btn.value || "").toLowerCase();
        let onclickAttr = (btn.getAttribute('onclick') || "").toLowerCase();
        
        if (btn.tagName === 'BUTTON' || btn.tagName === 'INPUT' || btn.classList?.contains('btn') || btn.classList?.contains('btn-enviar')) {
            if (text.includes('calificar') || text.includes('evaluar') || text.includes('enviar') || text.includes('terminar') || onclickAttr.includes('calificar')) {
                setTimeout(guardarResultadosDesdeDOM, 1500);
            }
        }
    });
}

function guardarResultadosDesdeDOM() {
    // Si la página tiene su propia función de guardar en Firestore (ej: Dinámica 10), no hacemos nada para evitar duplicados
    if (typeof window.calificarYGuardar === 'function') {
        return;
    }

    if (window.yaGuardadoFirebase) return;
    window.yaGuardadoFirebase = true;

    let pageTitle = document.title || "";
    let title = pageTitle.replace(/ - LabVirtual.*/i, '').replace(/Evaluación de /i, '').replace(/Evaluación /i, '').trim();
    if(!title) title = window.location.pathname.split('/').pop().replace('.html','');
    
    let notaCalculada = 0;
    let userStr = localStorage.getItem('usuario_labvirtual');
    if(!userStr) return; // Si no hay sesión, no guarda
    let userObj = JSON.parse(userStr);

    let scoreText = "";
    let notaEl = document.getElementById('nota-final') || document.getElementById('nota-numero') || document.querySelector('.nota-final') || document.querySelector('.res-aprobado') || document.querySelector('.res-reprobado');
    let resFinal = document.getElementById('resultado-final') || document.getElementById('resultado') || document.getElementById('pantalla-resultados');

    if(notaEl) scoreText = notaEl.innerText;
    else if(resFinal) scoreText = resFinal.innerText;
    else scoreText = document.body.innerText;

    // Convertimos cualquier nota a escala 5.0
    let matchPct = scoreText.match(/(\d{1,3})\s*%/);
    if(matchPct) {
        notaCalculada = parseFloat(matchPct[1]) / 20; // 100% -> 5.0
    } else {
        let matchFrac = scoreText.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
        if(matchFrac) {
            let pts = parseFloat(matchFrac[1]);
            let total = parseFloat(matchFrac[2]);
            if(total > 0) notaCalculada = (pts / total) * 5.0;
        } else {
            let matchDe = scoreText.match(/(\d+(?:\.\d+)?)\s*de\s*(\d+(?:\.\d+)?)/i);
            if(matchDe) {
                let pts = parseFloat(matchDe[1]);
                let total = parseFloat(matchDe[2]);
                if(total > 0) notaCalculada = (pts / total) * 5.0;
            } else {
                if(typeof window.nota !== 'undefined') {
                    if (window.nota > 5.0) notaCalculada = window.nota / 20;
                    else notaCalculada = window.nota;
                }
                else if(typeof window.puntaje !== 'undefined') {
                    if (window.puntaje > 5.0) notaCalculada = window.puntaje / 2;
                    else notaCalculada = window.puntaje;
                }
            }
        }
    }

    if(notaCalculada > 5.0) notaCalculada = 5.0;
    if(isNaN(notaCalculada) || notaCalculada < 0) notaCalculada = 0;

    const db = firebase.firestore();
    db.collection('evaluaciones').add({
        usuario: userObj.usuario,
        nombre: userObj.nombre,
        tema: title,
        puntaje: notaCalculada,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        mostrarToastFirebase();
    }).catch(e => console.error("Error guardando autoevaluación: ", e));
}

function mostrarToastFirebase() {
    if(document.getElementById('firebase-toast')) return;
    let t = document.createElement('div');
    t.id = 'firebase-toast';
    t.innerHTML = "<i class='fa-solid fa-cloud-arrow-up'></i> Resultado guardado en Firestore";
    t.style = "position:fixed; bottom:20px; right:20px; background:#2ecc71; color:white; padding:12px 20px; border-radius:8px; z-index:9999; box-shadow:0 4px 10px rgba(0,0,0,0.2); font-family:sans-serif; font-size:14px; animation: fadein 0.5s;";
    document.body.appendChild(t);
    setTimeout(() => {
        t.style.opacity = "0";
        t.style.transition = "opacity 0.5s";
        setTimeout(() => t.remove(), 500);
    }, 4000);
}
