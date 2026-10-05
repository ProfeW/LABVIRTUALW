const fs = require('fs');
let content = fs.readFileSync('resultados.html', 'utf8');

const css_add = \
        .layout-grid { display: grid; grid-template-columns: 280px 1fr; gap: 20px; max-width: 1400px; margin: 40px auto; }
        .sidebar-filtros { background: rgba(20,20,35,0.95); padding: 30px 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-top: 5px solid #3498db; height: fit-content; position: sticky; top: 40px; }
        .sidebar-filtros h3 { color: #3498db; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; font-size: 1.3rem;}
        .filter-group { margin-bottom: 15px; }
        .filter-group label { display: block; font-size: 0.9rem; margin-bottom: 5px; color: #ccc; }
        .filter-group select, .filter-group input { width: 100%; padding: 10px; border-radius: 5px; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: white; font-family: 'Poppins', sans-serif;}
        .filter-group select:focus, .filter-group input:focus { outline: none; border-color: #3498db; }
        .btn-descargar { width: 100%; padding: 12px; background: #2ecc71; color: white; border: none; border-radius: 5px; font-weight: 600; cursor: pointer; transition: 0.3s; margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Poppins', sans-serif;}
        .btn-descargar:hover { background: #27ae60; transform: translateY(-2px); }
        .contenedor { max-width: 100%; margin: 0; }
        @media (max-width: 900px) { .layout-grid { grid-template-columns: 1fr; } .sidebar-filtros { position: relative; top: 0; } }
\;
content = content.replace('</style>', css_add + '\n    </style>');

const body_start = \<body>
    <div class="layout-grid">
        <aside class="sidebar-filtros">
            <a href="inicio.html" class="btn-volver" style="display:block; margin-bottom:20px;"><i class="fa-solid fa-arrow-left"></i> Volver al Inicio</a>
            <h3><i class="fa-solid fa-filter"></i> Filtros</h3>
            <div class="filter-group">
                <label>Asignatura</label>
                <select id="filter-asig" onchange="aplicarFiltros()">
                    <option value="TODAS">Todas</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biología">Biología</option>
                    <option value="Autoevaluación">Autoevaluación</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Grado</label>
                <select id="filter-grado" onchange="aplicarFiltros()">
                    <option value="TODOS">Todos</option>
                    <option value="Grado 6">Sexto (6)</option>
                    <option value="Grado 7">Séptimo (7)</option>
                    <option value="Grado 8">Octavo (8)</option>
                    <option value="Grado 9">Noveno (9)</option>
                    <option value="Grado 10">Décimo (10)</option>
                    <option value="Grado 11">Once (11)</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Periodo</label>
                <select id="filter-periodo" onchange="aplicarFiltros()">
                    <option value="TODOS">Todos</option>
                    <option value="1">Periodo 1</option>
                    <option value="2">Periodo 2</option>
                    <option value="3">Periodo 3</option>
                    <option value="4">Periodo 4</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Estudiante</label>
                <input type="text" id="filter-nombre" placeholder="Buscar nombre..." onkeyup="aplicarFiltros()">
            </div>
            <button class="btn-descargar" onclick="descargarExcel()"><i class="fa-solid fa-file-excel"></i> Descargar Excel</button>
        </aside>
        
        <div class="contenedor">
            <h1 style="text-align: left; margin-bottom:5px;"><i class="fa-solid fa-chart-bar"></i> Calificaciones</h1>
            <p style="color:#ddd; margin-bottom: 40px; text-align: left;">Resultados y autoevaluaciones.</p>
\;

const old_body = \<body>
    <div class="contenedor">
        <a href="inicio.html" class="btn-volver"><i class="fa-solid fa-arrow-left"></i> Volver al Inicio</a>
        <h1><i class="fa-solid fa-chart-bar"></i> Historial de Evaluaciones</h1>
        <p style="text-align: center; color:#ddd; margin-bottom: 40px;">Aquí puedes consultar las calificaciones obtenidas en las diferentes áreas y temas de aprendizaje.</p>\;
        
content = content.replace(old_body, body_start);

const old_div = \        <div id="contenedor-resultados" style="display: none;">
            <!-- Aquí se inyectarán los acordeones dinámicamente -->
        </div>
    </div>\;
const new_div = \        <div id="contenedor-resultados" style="display: none;"></div>
        </div>
    </div>\;
content = content.replace(old_div, new_div);

const js_logic = \
        window.datosGlobales = [];
        window.datosFiltrados = [];

        function cargarResultados(user) {
            let query = db.collection('evaluaciones');
            if (user.usuario !== 'profew') {
                query = query.where('usuario', '==', user.usuario);
            }

            query.get()
              .then(snapshot => {
                  document.getElementById('cargando').style.display = 'none';
                  const contenedor = document.getElementById('contenedor-resultados');
                  contenedor.style.display = 'block';

                  if (snapshot.empty) {
                      contenedor.innerHTML = "<div class='sin-datos'><i class='fa-solid fa-folder-open'></i> Aún no has completado ninguna evaluación.</div>";
                      return;
                  }

                  window.datosGlobales = [];
                  snapshot.forEach(doc => {
                      let d = doc.data();
                      d.id = doc.id;
                      window.datosGlobales.push(d);
                  });
                  
                  window.datosGlobales.sort((a, b) => {
                      if (!a.fecha || !b.fecha) return 0;
                      return b.fecha.toMillis() - a.fecha.toMillis();
                  });

                  aplicarFiltros();
              })
              .catch(err => {
                  console.error("Error obteniendo resultados:", err);
                  document.getElementById('cargando').innerHTML = "<span style='color:#e74c3c;'><i class='fa-solid fa-triangle-exclamation'></i> Error al obtener datos: " + err.message + "</span>";
              });
        }

        function aplicarFiltros() {
            const fAsig = document.getElementById('filter-asig').value;
            const fGrado = document.getElementById('filter-grado').value;
            const fPeriodo = document.getElementById('filter-periodo').value;
            const fNombre = document.getElementById('filter-nombre').value.toLowerCase();

            window.datosFiltrados = window.datosGlobales.filter(data => {
                const temaCompleto = data.tema || "Tema Desconocido";
                const nombreEst = (data.nombre || data.usuario || "Desconocido").toLowerCase();
                const lower = temaCompleto.toLowerCase();
                
                let asignatura = "Otras Asignaturas";
                if (lower.includes('fisica') || lower.includes('física') || lower.includes('dinámica') || lower.includes('cinemática') || lower.includes('vector') || lower.includes('newton') || lower.includes('caida') || lower.includes('hooke') || lower.includes('sonido') || lower.includes('acústica') || lower.includes('ondas')) {
                    asignatura = "Física";
                } else if (lower.includes('quimica') || lower.includes('química') || lower.includes('balanceo') || lower.includes('reactivo') || lower.includes('organica') || lower.includes('alcano') || lower.includes('ácido') || lower.includes('solucion') || lower.includes('gases') || lower.includes('masa')) {
                    asignatura = "Química";
                } else if (lower.includes('biologia') || lower.includes('biología') || lower.includes('mendel') || lower.includes('genética') || lower.includes('adn') || lower.includes('ecosistema')) {
                    asignatura = "Biología";
                } else if (lower.includes('autoevaluación') || lower.includes('autoevaluacion')) {
                    asignatura = "Autoevaluación";
                }

                let grado = "Otros Grados";
                if (data.grado) grado = "Grado " + data.grado;
                else {
                    const gradoMatch = temaCompleto.match(/\\b(6|7|8|9|10|11)\\b/);
                    if (gradoMatch) grado = "Grado " + gradoMatch[1];
                }

                let perMatch = (data.periodo || "").toString();
                if (!perMatch) {
                    const matchP = temaCompleto.match(/P([1-4])/i);
                    if (matchP) perMatch = matchP[1];
                }

                if (fAsig !== 'TODAS' && asignatura !== fAsig) return false;
                if (fGrado !== 'TODOS' && grado !== fGrado) return false;
                if (fPeriodo !== 'TODOS' && perMatch !== fPeriodo) return false;
                if (fNombre && !nombreEst.includes(fNombre)) return false;

                data._asignatura = asignatura;
                data._grado = grado;
                
                if (temaCompleto.includes(" - ")) {
                    const partes = temaCompleto.split(" - ");
                    data._temaGeneral = partes[0].replace(/\\b(6|7|8|9|10|11)\\b/g, '').trim();
                    data._subtema = partes[1].trim();
                } else {
                    data._temaGeneral = temaCompleto;
                    data._subtema = "Evaluación";
                }
                
                if(asignatura === "Autoevaluación") {
                    data._subtema = \Autoevaluación Periodo \\;
                }

                return true;
            });

            renderizarAcordeones(window.datosFiltrados);
        }

        function renderizarAcordeones(datosArray) {
            const contenedor = document.getElementById('contenedor-resultados');
            if (datosArray.length === 0) {
                contenedor.innerHTML = "<div class='sin-datos'><i class='fa-solid fa-filter-circle-xmark'></i> No hay resultados para los filtros seleccionados.</div>";
                return;
            }

            const grupos = {};
            datosArray.forEach(data => {
                let asig = data._asignatura;
                let gr = data._grado;
                let tem = data._temaGeneral;

                if (!grupos[asig]) grupos[asig] = {};
                if (!grupos[asig][gr]) grupos[asig][gr] = {};
                if (!grupos[asig][gr][tem]) grupos[asig][gr][tem] = [];

                let fechaStr = "Desconocida";
                if (data.fecha) {
                    const dateObj = data.fecha.toDate();
                    fechaStr = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' });
                }

                let notaClass = "nota-baja";
                const nota = parseFloat(data.puntaje);
                if (nota >= 4.0) notaClass = "nota-alta";
                else if (nota >= 3.0) notaClass = "nota-media";

                grupos[asig][gr][tem].push(\
                    <tr>
                        <td>\</td>
                        <td>\</td>
                        <td><span class="\">\ / 5.0</span></td>
                        <td>\</td>
                    </tr>
                \);
            });

            let html = "";
            Object.keys(grupos).sort().forEach(asig => {
                html += \<div class="acordeon" style="margin-bottom: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius:8px; overflow:hidden;">
                    <div class="acordeon-header activo" onclick="toggleAcordeon(this)" style="background: #2c3e50; color: white; border-radius:0;">
                        <span><i class="fa-solid fa-book"></i> Asignatura: \</span><i class="fa-solid fa-chevron-down"></i>
                    </div><div class="acordeon-body abierto" style="padding: 10px; background: #ecf0f1;">\;

                Object.keys(grupos[asig]).sort((a,b) => {
                    const numA = parseInt(a.replace('Grado ', '')) || 0;
                    const numB = parseInt(b.replace('Grado ', '')) || 0;
                    return numA - numB;
                }).forEach(gr => {
                    html += \<div class="acordeon" style="margin-bottom: 8px; border-radius:6px; overflow:hidden;">
                        <div class="acordeon-header activo" onclick="toggleAcordeon(this)" style="background: #e67e22; color: white; border-radius:0; padding: 12px 15px;">
                            <span><i class="fa-solid fa-graduation-cap"></i> \</span><i class="fa-solid fa-chevron-down"></i>
                        </div><div class="acordeon-body abierto" style="padding: 10px; background: #fdfefe;">\;
                    
                    Object.keys(grupos[asig][gr]).sort().forEach(tem => {
                        html += \<div class="acordeon" style="margin-bottom: 5px; border-radius:6px; overflow:hidden;">
                            <div class="acordeon-header activo" onclick="toggleAcordeon(this)" style="background: #3498db; color: white; border-radius:0; padding: 10px 15px; font-size: 0.95rem;">
                                <span><i class="fa-solid fa-layer-group"></i> Tema: \</span><i class="fa-solid fa-chevron-down"></i>
                            </div><div class="acordeon-body abierto" style="padding:0;">
                                <table style="margin:0; border-radius:0; box-shadow:none;">
                                    <thead><tr><th>Estudiante</th><th>Práctica/Evaluación</th><th>Calificación</th><th>Fecha</th></tr></thead>
                                    <tbody>\</tbody>
                                </table>
                            </div></div>\;
                    });
                    html += \</div></div>\;
                });
                html += \</div></div>\;
            });

            contenedor.innerHTML = html;
        }

        function descargarExcel() {
            const data = window.datosFiltrados || [];
            if(data.length === 0) return alert("No hay datos para exportar. Ajuste los filtros.");
            
            let html = "<table border='1'><thead><tr><th>Asignatura</th><th>Grado</th><th>Tema</th><th>Subtema</th><th>Estudiante</th><th>Nota</th><th>Fecha</th></tr></thead><tbody>";
            data.forEach(d => {
                let fechaStr = "Desconocida";
                if (d.fecha) {
                    const dateObj = d.fecha.toDate();
                    fechaStr = dateObj.toLocaleDateString('es-ES') + " " + dateObj.toLocaleTimeString('es-ES');
                }
                html += \<tr><td>\</td><td>\</td><td>\</td><td>\</td><td>\</td><td>\</td><td>\</td></tr>\;
            });
            html += "</tbody></table>";
            
            const uri = 'data:application/vnd.ms-excel;base64,';
            const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>';
            const base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) };
            const format = function(s, c) { return s.replace(/\{(\\w+)\}/g, function(m, p) { return c[p]; }) };
            
            const ctx = { worksheet: 'Calificaciones', table: html };
            const link = document.createElement("a");
            link.download = "calificaciones_filtro.xls";
            link.href = uri + base64(format(template, ctx));
            link.click();
        }
\;

const start_idx = content.indexOf('function cargarResultados');
const end_idx = content.indexOf('function toggleAcordeon');
if (start_idx !== -1 && end_idx !== -1) {
    content = content.substring(0, start_idx) + js_logic + content.substring(end_idx);
}

fs.writeFileSync('resultados.html', content, 'utf8');
console.log('Update success!');
