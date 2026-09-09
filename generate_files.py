import os

base_path = r'c:\Users\wgoss\.gemini\antigravity-ide\scratch\labvirtualw\LABVIRTUALW-main'

# 1. Espectro Auditivo
espectro = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Infrasonido y Ultrasonido - Física 9 - LabVirtual W</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --color-tema: #4cd137; --color-oscuro: #1a1a2e; }
        html { scroll-behavior: smooth; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body {
            background-color: var(--color-oscuro); color: #fff;
            background-image: linear-gradient(rgba(26,26,46,0.88), rgba(26,26,46,0.96)),
                url('https://images.unsplash.com/photo-1511735111819-9a3efd16269e?auto=format&fit=crop&w=1920&q=80');
            background-size: cover; background-attachment: fixed; min-height: 100vh;
        }
        nav { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; padding: 15px 50px; position: sticky; top: 0; z-index: 1000; }
        .logo { font-size: 24px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo i { color: var(--color-tema); }
        .menu { list-style: none; display: flex; gap: 20px; }
        .menu a { color: #fff; text-decoration: none; font-weight: 600; padding: 10px 15px; border-radius: 5px; transition: all 0.3s; }
        .menu a:hover { background: rgba(255,255,255,0.1); color: var(--color-tema); }
        .contenedor { max-width: 1000px; margin: 40px auto; padding: 20px; }
        .btn-volver { display: inline-block; margin-bottom: 20px; color: var(--color-tema); text-decoration: none; font-weight: 600; }
        .btn-volver:hover { color: #fff; }
        .encabezado-leccion { border-bottom: 2px solid rgba(76, 209, 55, 0.4); padding-bottom: 20px; margin-bottom: 30px; }
        .encabezado-leccion h1 { font-size: 2.8rem; color: var(--color-tema); margin-bottom: 10px; }
        .seccion-contenido { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 30px; margin-bottom: 30px; }
        .seccion-contenido h2 { color: var(--color-tema); margin-bottom: 20px; }
        .seccion-contenido p { line-height: 1.7; color: #ddd; margin-bottom: 15px; font-size: 1.05rem; }
        .img-container { text-align: center; margin: 20px 0; }
        .img-container img { max-width: 100%; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="index.html" class="logo"><i class="fa-solid fa-volume-high"></i> LabVirtual W</a>
            <ul class="menu">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="fisica_9.html">Física 9</a></li>
            </ul>
        </nav>
    </header>
    <main class="contenedor">
        <a href="fisica_9.html" class="btn-volver"><i class="fa-solid fa-arrow-left"></i> Volver</a>
        <div class="encabezado-leccion">
            <h1><i class="fa-solid fa-wave-square"></i> Infrasonido y Ultrasonido</h1>
            <p>El espectro auditivo y la escala humana</p>
        </div>
        <section class="seccion-contenido">
            <h2>1. La Escala Humana (Sonido Audible)</h2>
            <p>La "sintonía" de nuestro oído se mide en Hertz (Hz). El rango que podemos escuchar va desde los <strong>20 Hz</strong> (sonidos muy graves) hasta los <strong>20,000 Hz</strong> (sonidos muy agudos). Cualquier onda mecánica que vibre fuera de este rango es inaudible para nosotros.</p>
            <div class="img-container">
                <!-- Imagen de internet de espectro -->
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Animal_hearing_frequency_range.svg/1024px-Animal_hearing_frequency_range.svg.png" alt="Espectro Auditivo" />
            </div>
        </section>
        <section class="seccion-contenido">
            <h2>2. El Infrasonido (Vibraciones Lentas y Gigantes)</h2>
            <p>Son ondas sonoras con una frecuencia menor a 20 Hz. Son largas, lentas y pesadas, y pueden viajar largas distancias sin perder energía.</p>
            <ul>
                <li><strong>Naturaleza:</strong> Los elefantes y ballenas las usan para comunicarse a kilómetros.</li>
                <li><strong>Eventos geológicos:</strong> Terremotos, erupciones volcánicas y tornados.</li>
            </ul>
        </section>
        <section class="seccion-contenido">
            <h2>3. El Ultrasonido (Vibraciones Rápidas y Diminutas)</h2>
            <p>Frecuencias mayores a 20,000 Hz. Son ondas cortas y rápidas, perfectas para "ver" a través del sonido debido a que rebotan en objetos diminutos.</p>
            <ul>
                <li><strong>Naturaleza:</strong> Ecolocalización en murciélagos y delfines.</li>
                <li><strong>Uso médico e industrial:</strong> Ecografías y limpieza microscópica.</li>
            </ul>
        </section>
        <section class="seccion-contenido">
            <h2>4. El Oído y la Audición</h2>
            <p>Para que nuestro cerebro comprenda el sonido, la onda sonora ingresa por el pabellón auricular (oreja), viaja por el conducto auditivo y hace vibrar el <strong>tímpano</strong>. Esta vibración se transmite por tres pequeños huesos (martillo, yunque y estribo) hasta llegar a la <strong>cóclea</strong> en el oído interno, donde las células ciliadas convierten la energía mecánica en impulsos eléctricos que el cerebro procesa.</p>
        </section>
    </main>
</body>
</html>'''

with open(os.path.join(base_path, 'fisica9_espectro_auditivo.html'), 'w', encoding='utf-8') as f:
    f.write(espectro)

# 2. Intensidad del Sonido
intensidad = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Intensidad y Potencia del Sonido - Física 9 - LabVirtual W</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --color-tema: #4cd137; --color-oscuro: #1a1a2e; }
        html { scroll-behavior: smooth; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body {
            background-color: var(--color-oscuro); color: #fff;
            background-image: linear-gradient(rgba(26,26,46,0.88), rgba(26,26,46,0.96)),
                url('https://images.unsplash.com/photo-1511735111819-9a3efd16269e?auto=format&fit=crop&w=1920&q=80');
            background-size: cover; background-attachment: fixed; min-height: 100vh;
        }
        nav { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; padding: 15px 50px; position: sticky; top: 0; z-index: 1000; }
        .logo { font-size: 24px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo i { color: var(--color-tema); }
        .menu { list-style: none; display: flex; gap: 20px; }
        .menu a { color: #fff; text-decoration: none; font-weight: 600; padding: 10px 15px; border-radius: 5px; transition: all 0.3s; }
        .menu a:hover { background: rgba(255,255,255,0.1); color: var(--color-tema); }
        .contenedor { max-width: 1000px; margin: 40px auto; padding: 20px; }
        .btn-volver { display: inline-block; margin-bottom: 20px; color: var(--color-tema); text-decoration: none; font-weight: 600; }
        .btn-volver:hover { color: #fff; }
        .encabezado-leccion { border-bottom: 2px solid rgba(76, 209, 55, 0.4); padding-bottom: 20px; margin-bottom: 30px; }
        .encabezado-leccion h1 { font-size: 2.8rem; color: var(--color-tema); margin-bottom: 10px; }
        .seccion-contenido { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 30px; margin-bottom: 30px; }
        .seccion-contenido h2 { color: var(--color-tema); margin-bottom: 20px; }
        .caja-formula { background: rgba(76, 209, 55, 0.06); border: 2px dashed var(--color-tema); border-radius: 10px; padding: 25px; text-align: center; margin: 20px 0; }
        .formula-principal { font-size: 1.8rem; font-weight: 800; color: #fff; letter-spacing: 1px; margin-bottom: 10px; }
        .ejercicio-tarjeta { background: rgba(20,20,35,0.6); border-left: 4px solid var(--color-tema); padding: 25px; margin-bottom: 20px; border-radius: 0 8px 8px 0; }
        .ejercicio-tarjeta h3 { color: var(--color-tema); margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="index.html" class="logo"><i class="fa-solid fa-volume-high"></i> LabVirtual W</a>
            <ul class="menu">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="fisica_9.html">Física 9</a></li>
            </ul>
        </nav>
    </header>
    <main class="contenedor">
        <a href="fisica_9.html" class="btn-volver"><i class="fa-solid fa-arrow-left"></i> Volver</a>
        <div class="encabezado-leccion">
            <h1><i class="fa-solid fa-bolt"></i> Intensidad y Potencia del Sonido</h1>
            <p>Entendiendo la fuerza del sonido</p>
        </div>
        <section class="seccion-contenido">
            <h2>¿Qué es la Intensidad Física?</h2>
            <p>Imagina que el sonido es un viento invisible de energía. La intensidad física es la cantidad exacta de esa energía sonora (llamada Potencia) que choca o atraviesa una superficie (Área) en un momento determinado. Se mide en Vatios por metro cuadrado (W/m²).</p>
            <div class="caja-formula">
                <div class="formula-principal">I = P / A</div>
                <div class="formula-leyenda">
                    <strong>I</strong> = Intensidad (W/m²) <br>
                    <strong>P</strong> = Potencia de la fuente (Vatios, W) <br>
                    <strong>A</strong> = Área (m²) (Para rectángulos: A = base × altura)
                </div>
            </div>
            <p>Nota: La intensidad en decibeles requiere de logaritmos base 10 (β = 10 log(I/I0)) y para la amplitud se requieren funciones trigonométricas (y = A sin(kx - wt)). Para el grado noveno, analizaremos la amplitud gráficamente y la intensidad con la fórmula mostrada (Potencia y Área).</p>
        </section>
        
        <section class="seccion-contenido">
            <h2>Ejercicios Resueltos</h2>
            <div class="ejercicio-tarjeta">
                <h3>Ejercicio 1: Cálculo de Intensidad</h3>
                <p><strong>Problema:</strong> Un parlante de la Institución emite música con una potencia de 150 W. Este sonido choca contra una pared que tiene un área de 15 m². ¿Cuál es la intensidad?</p>
                <p><strong>Solución:</strong> I = P / A  ➜ I = 150 / 15 = 10 W/m²</p>
            </div>
            <div class="ejercicio-tarjeta">
                <h3>Ejercicio 2: Despejando Potencia</h3>
                <p><strong>Problema:</strong> Un trabajador agrícola está expuesto al ruido de una guadañadora. Si la intensidad es de 5 W/m² y el área de sus protectores es de 0.2 m², ¿cuánta Potencia sonora están frenando?</p>
                <p><strong>Solución:</strong> P = I · A ➜ P = 5 · 0.2 = 1 W</p>
            </div>
        </section>
    </main>
</body>
</html>'''

with open(os.path.join(base_path, 'fisica9_intensidad_sonido.html'), 'w', encoding='utf-8') as f:
    f.write(intensidad)

# 3. Practica de Intensidad
practica = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Práctica: Intensidad Sonora - Física 9 - LabVirtual W</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --color-tema: #4cd137; --color-oscuro: #1a1a2e; }
        html { scroll-behavior: smooth; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body {
            background-color: var(--color-oscuro); color: #fff;
            background-image: linear-gradient(rgba(26,26,46,0.88), rgba(26,26,46,0.96)),
                url('https://images.unsplash.com/photo-1511735111819-9a3efd16269e?auto=format&fit=crop&w=1920&q=80');
            background-size: cover; background-attachment: fixed; min-height: 100vh;
        }
        nav { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; padding: 15px 50px; position: sticky; top: 0; z-index: 1000; }
        .logo { font-size: 24px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo i { color: var(--color-tema); }
        .menu { list-style: none; display: flex; gap: 20px; }
        .menu a { color: #fff; text-decoration: none; font-weight: 600; padding: 10px 15px; border-radius: 5px; transition: all 0.3s; }
        .menu a:hover { background: rgba(255,255,255,0.1); color: var(--color-tema); }
        .contenedor { max-width: 800px; margin: 40px auto; padding: 20px; }
        .form-practica { background: rgba(255,255,255,0.05); padding: 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
        .form-group { margin-bottom: 25px; }
        .form-group label { display: block; margin-bottom: 10px; font-weight: 600; color: var(--color-tema); }
        .form-group input[type="text"], .form-group input[type="number"] { width: 100%; padding: 12px; border-radius: 6px; border: none; background: rgba(255,255,255,0.1); color: #fff; }
        button { background: var(--color-tema); color: #fff; padding: 15px 30px; border: none; border-radius: 6px; cursor: pointer; font-size: 1.1rem; font-weight: 600; width: 100%; transition: 0.3s; }
        button:hover { background: #3ab028; transform: translateY(-2px); }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="index.html" class="logo"><i class="fa-solid fa-volume-high"></i> LabVirtual W</a>
            <ul class="menu">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="fisica_9.html">Física 9</a></li>
            </ul>
        </nav>
    </header>
    <main class="contenedor">
        <a href="fisica_9.html" class="btn-volver" style="color: var(--color-tema); display: inline-block; margin-bottom: 20px;"><i class="fa-solid fa-arrow-left"></i> Volver</a>
        <h1 style="color: var(--color-tema); margin-bottom: 20px;">Práctica: Intensidad Sonora</h1>
        <p style="margin-bottom: 30px;">Resuelve los siguientes ejercicios de intensidad de sonido. Tus respuestas serán enviadas a la base de datos del docente.</p>
        
        <form class="form-practica" id="formPractica">
            <div class="form-group">
                <label>Nombre del Estudiante:</label>
                <input type="text" name="nombre" required>
            </div>
            <div class="form-group">
                <label>1. En el coliseo del colegio, un gran altavoz emite música con una potencia de 400 W. Si esa onda choca directamente contra una lona publicitaria que tiene un área de 20 m², ¿cuál es la intensidad del sonido que recibe la lona? (W/m²)</label>
                <input type="number" name="p1" required>
            </div>
            <div class="form-group">
                <label>2. Un ingeniero mide el sonido del motor de un tractor agrícola. Descubre que el sonido golpea una barrera protectora de 5 m² generando una intensidad física de 30 W/m². ¿Cuánta potencia (P) en vatios está generando ese motor?</label>
                <input type="number" name="p2" required>
            </div>
            <div class="form-group">
                <label>3. En una discoteca, la intensidad física del sonido es tan fuerte que registra 50 W/m² sobre una de las paredes acústicas. Si sabemos que los parlantes están disparando una potencia de 1000 W hacia esa dirección, ¿cuál es el Área (A) de esa pared en m²?</label>
                <input type="number" name="p3" required>
            </div>
            <div class="form-group">
                <label>4. Durante las fiestas, un músico toca la trompeta emitiendo una potencia sonora de 30 W. Si este sonido choca contra una ventana de 2 m², ¿cuál es la intensidad del sonido sobre el vidrio? (W/m²)</label>
                <input type="number" name="p4" required>
            </div>
            <div class="form-group">
                <label>5. Los estudiantes están armando una cabina de radio para el colegio. Saben que los paneles de espuma que compraron tienen un área de 4 m² y pueden soportar una intensidad máxima de 15 W/m² antes de que el sonido se filtre. ¿Cuál es la potencia máxima (P) que pueden emitir los parlantes dentro de la cabina? (W)</label>
                <input type="number" name="p5" required>
            </div>
            <button type="submit">Enviar Respuestas</button>
        </form>
    </main>

    <script>
        document.getElementById('formPractica').addEventListener('submit', function(e) {
            e.preventDefault();
            // REEMPLAZA ESTA URL CON TU GOOGLE APPS SCRIPT WEB APP URL
            const scriptURL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI'; 
            
            // Recolectar datos
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            alert('En una implementación real, esto enviaría los datos a: ' + scriptURL + '\\nDatos:\\n' + JSON.stringify(data, null, 2));
            
            /* CÓDIGO REAL PARA ENVIAR (descomentar y configurar URL):
            fetch(scriptURL, { method: 'POST', body: formData})
                .then(response => {
                    alert('Respuestas enviadas correctamente.');
                    document.getElementById('formPractica').reset();
                })
                .catch(error => alert('Error al enviar.'));
            */
        });
    </script>
</body>
</html>'''

with open(os.path.join(base_path, 'fisica9_intensidad_sonido_practica.html'), 'w', encoding='utf-8') as f:
    f.write(practica)

# 4. Evaluacion
evaluacion = '''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Evaluación Final: Acústica y Sonido - Física 9</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --color-tema: #4cd137; --color-oscuro: #1a1a2e; }
        html { scroll-behavior: smooth; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        body {
            background-color: var(--color-oscuro); color: #fff;
            background-image: linear-gradient(rgba(26,26,46,0.88), rgba(26,26,46,0.96)),
                url('https://images.unsplash.com/photo-1511735111819-9a3efd16269e?auto=format&fit=crop&w=1920&q=80');
            background-size: cover; background-attachment: fixed; min-height: 100vh;
        }
        nav { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; padding: 15px 50px; position: sticky; top: 0; z-index: 1000; }
        .logo { font-size: 24px; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo i { color: var(--color-tema); }
        .menu { list-style: none; display: flex; gap: 20px; }
        .menu a { color: #fff; text-decoration: none; font-weight: 600; padding: 10px 15px; border-radius: 5px; transition: all 0.3s; }
        .menu a:hover { background: rgba(255,255,255,0.1); color: var(--color-tema); }
        .contenedor { max-width: 800px; margin: 40px auto; padding: 20px; }
        .form-evaluacion { background: rgba(255,255,255,0.05); padding: 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
        .form-group { margin-bottom: 25px; }
        .form-group label { display: block; margin-bottom: 10px; font-weight: 600; color: #fff; }
        .form-group input[type="text"], .form-group input[type="number"] { width: 100%; padding: 12px; border-radius: 6px; border: none; background: rgba(255,255,255,0.1); color: #fff; margin-bottom: 10px;}
        button { background: var(--color-tema); color: #fff; padding: 15px 30px; border: none; border-radius: 6px; cursor: pointer; font-size: 1.1rem; font-weight: 600; width: 100%; transition: 0.3s; }
        button:hover { background: #3ab028; transform: translateY(-2px); }
        .opcion { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    </style>
</head>
<body>
    <header>
        <nav>
            <a href="index.html" class="logo"><i class="fa-solid fa-volume-high"></i> LabVirtual W</a>
            <ul class="menu">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="fisica_9.html">Física 9</a></li>
            </ul>
        </nav>
    </header>
    <main class="contenedor">
        <a href="fisica_9.html" class="btn-volver" style="color: var(--color-tema); display: inline-block; margin-bottom: 20px;"><i class="fa-solid fa-arrow-left"></i> Volver</a>
        <h1 style="color: var(--color-tema); margin-bottom: 20px;">Evaluación Final: Acústica y Sonido</h1>
        
        <form class="form-evaluacion">
            <div class="form-group">
                <label>Nombre Completo:</label>
                <input type="text" required>
            </div>
            
            <div class="form-group">
                <label>1. El sonido viaja más rápido en un medio sólido que en uno gaseoso debido a:</label>
                <div class="opcion"><input type="radio" name="q1" value="a"> a) Que los gases son más densos</div>
                <div class="opcion"><input type="radio" name="q1" value="b"> b) Que las partículas en los sólidos están más juntas y transmiten la energía más rápido</div>
                <div class="opcion"><input type="radio" name="q1" value="c"> c) El vacío espacial</div>
            </div>

            <div class="form-group">
                <label>2. Ejercicio (Velocidad del sonido): Un trabajador golpea un tubo de acero muy largo (v = 5120 m/s). Si el sonido tarda 1.5 segundos en llegar al otro extremo, ¿cuál es la longitud del tubo?</label>
                <input type="number" placeholder="Respuesta en metros">
            </div>

            <div class="form-group">
                <label>3. Falso o Verdadero: El sonido viaja mucho más rápido en el aire frío de la madrugada que en el aire caliente del mediodía.</label>
                <div class="opcion"><input type="radio" name="q3" value="v"> Verdadero</div>
                <div class="opcion"><input type="radio" name="q3" value="f"> Falso</div>
            </div>

            <div class="form-group">
                <label>4. Ejercicio (Intensidad): Un altavoz choca contra un panel de 4 m². Si la intensidad que registra es de 30 W/m², ¿cuál es la Potencia sonora?</label>
                <input type="number" placeholder="Respuesta en Vatios">
            </div>

            <div class="form-group">
                <label>5. ¿Qué característica del sonido permite diferenciar a dos personas hablando con el mismo volumen?</label>
                <div class="opcion"><input type="radio" name="q5" value="a"> a) La Amplitud</div>
                <div class="opcion"><input type="radio" name="q5" value="b"> b) El Tono</div>
                <div class="opcion"><input type="radio" name="q5" value="c"> c) El Timbre</div>
            </div>
            
            <div class="form-group">
                <label>6. El sonido es una onda ______________, lo que significa que necesita obligatoriamente un medio material para propagarse.</label>
                <input type="text" placeholder="Escribe la palabra correcta">
            </div>

            <div class="form-group">
                <label>7. ¿Qué es el Ultrasonido y qué animal lo usa para ubicarse?</label>
                <input type="text">
            </div>

            <div class="form-group">
                <label>8. ¿Qué es el Infrasonido y qué evento natural puede producirlo?</label>
                <input type="text">
            </div>

            <div class="form-group">
                <label>9. En el oído humano, ¿cuál es el primer órgano que vibra cuando choca la onda sonora?</label>
                <div class="opcion"><input type="radio" name="q9" value="a"> a) El Martillo</div>
                <div class="opcion"><input type="radio" name="q9" value="b"> b) El Tímpano</div>
                <div class="opcion"><input type="radio" name="q9" value="c"> c) La Cóclea</div>
            </div>

            <div class="form-group">
                <label>10. ¿En qué rango de frecuencias se encuentra el espectro audible para los seres humanos?</label>
                <div class="opcion"><input type="radio" name="q10" value="a"> a) 2 Hz a 2,000 Hz</div>
                <div class="opcion"><input type="radio" name="q10" value="b"> b) 20 Hz a 20,000 Hz</div>
                <div class="opcion"><input type="radio" name="q10" value="c"> c) Más de 20,000 Hz</div>
            </div>

            <button type="button" onclick="alert('Evaluación enviada con éxito (Simulación)')">Enviar Evaluación</button>
        </form>
    </main>
</body>
</html>'''

with open(os.path.join(base_path, 'fisica9_acustica_evaluacion.html'), 'w', encoding='utf-8') as f:
    f.write(evaluacion)

print("Files generated successfully")
