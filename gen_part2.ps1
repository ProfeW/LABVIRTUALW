$baseDir = "c:\Users\wgoss\.gemini\antigravity-ide\scratch\labvirtualw\LABVIRTUALW-main"

$topics = @(
    @{
        id = "newton1"
        title = "Primera Ley de Newton (Inercia)"
        theory = "La primera ley de Newton, conocida como ley de la inercia, establece que si la suma vectorial de las fuerzas que actúan sobre un objeto es cero, el objeto permanecerá en reposo o seguirá moviéndose a velocidad constante en línea recta."
    },
    @{
        id = "newton3"
        title = "Tercera Ley de Newton (Acción y Reacción)"
        theory = "Con toda acción ocurre siempre una reacción igual y contraria: o sea, las acciones mutuas de dos cuerpos siempre son iguales y dirigidas en sentido opuesto."
    },
    @{
        id = "hooke"
        title = "Ley de Hooke (Fuerza Elástica)"
        theory = "La fuerza elástica es la fuerza que devuelve un resorte a su posición de equilibrio y es proporcional a su deformación. F = -k * x, donde k es la constante y x es la deformación."
    }
)

foreach ($t in $topics) {
    $id = $t.id
    $title = $t.title
    $theory = $t.theory

    # THEORY HTML
    $htmlTheory = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Física 10 - $title</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --color-fisica: #3498db; --color-oscuro: #1a1a2e; --color-texto: #ffffff; }
        body { font-family: 'Poppins', sans-serif; background-color: var(--color-oscuro); color: var(--color-texto); padding: 20px; line-height: 1.6; background-image: linear-gradient(rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.95)), url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'); background-size: cover; background-attachment: fixed; }
        .contenedor { max-width: 900px; margin: 40px auto; background: rgba(20,20,35,0.95); padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px); }
        h1 { color: var(--color-fisica); font-size: 2.5rem; margin-bottom: 20px; }
        .btn { display: inline-block; padding: 12px 25px; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; transition: all 0.3s; text-align: center; }
        .btn-practica { background: linear-gradient(135deg, #2ecc71, #27ae60); box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4); }
        .btn-evaluacion { background: linear-gradient(135deg, #e74c3c, #c0392b); box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4); }
        .btn:hover { transform: translateY(-3px); filter: brightness(1.1); }
        .ejercicio { background: rgba(255,255,255,0.05); padding: 25px; border-left: 5px solid var(--color-fisica); margin: 30px 0; border-radius: 0 10px 10px 0; }
        p { font-size: 1.1rem; color: #ddd; margin-bottom: 15px; }
        .btn-volver { display: inline-block; margin-bottom: 20px; color: #4facfe; text-decoration: none; font-weight: 600; transition: 0.3s; }
        .btn-volver:hover { color: #fff; transform: translateX(-5px); }
    </style>
</head>
<body>
    <div class="contenedor">
        <a href="fisica_10.html" class="btn-volver"><i class="fa-solid fa-arrow-left"></i> Volver a Física 10</a>
        <h1>$title</h1>
        <p>$theory</p>
        
        <h2 style="color: #4facfe; margin-top:40px;"><i class="fa-solid fa-calculator"></i> Ejercicios Resueltos Paso a Paso</h2>

        <!-- Ejercicio 1 -->
        <div class="ejercicio">
            <h3>Ejercicio 1: Cálculo Básico</h3>
            <p>Se presenta el caso 1 para esta ley.</p>
            <p><b>Paso a paso:</b><br>1. Datos.<br>2. Fórmula.<br>3. Solución.</p>
            <p style="color:#f1c40f;"><b>¿Qué significa este número?</b><br>
            Explicación conceptual detallada del resultado obtenido en la realidad.</p>
        </div>
        <!-- Ejercicio 2 -->
        <div class="ejercicio">
            <h3>Ejercicio 2: Despeje</h3>
            <p>Se presenta el caso 2 para esta ley.</p>
            <p><b>Paso a paso:</b><br>1. Datos.<br>2. Fórmula.<br>3. Solución.</p>
            <p style="color:#f1c40f;"><b>¿Qué significa este número?</b><br>
            Explicación conceptual detallada del resultado obtenido en la realidad.</p>
        </div>
        <!-- Ejercicio 3 -->
        <div class="ejercicio">
            <h3>Ejercicio 3: Conversión</h3>
            <p>Se presenta el caso 3 para esta ley.</p>
            <p><b>Paso a paso:</b><br>1. Datos.<br>2. Fórmula.<br>3. Solución.</p>
            <p style="color:#f1c40f;"><b>¿Qué significa este número?</b><br>
            Explicación conceptual detallada del resultado obtenido en la realidad.</p>
        </div>
        <!-- Ejercicio 4 -->
        <div class="ejercicio">
            <h3>Ejercicio 4: Aplicación</h3>
            <p>Se presenta el caso 4 para esta ley.</p>
            <p><b>Paso a paso:</b><br>1. Datos.<br>2. Fórmula.<br>3. Solución.</p>
            <p style="color:#f1c40f;"><b>¿Qué significa este número?</b><br>
            Explicación conceptual detallada del resultado obtenido en la realidad.</p>
        </div>
        <!-- Ejercicio 5 -->
        <div class="ejercicio">
            <h3>Ejercicio 5: Fuerzas en Oposición</h3>
            <p>Se presenta el caso 5 para esta ley.</p>
            <p><b>Paso a paso:</b><br>1. Datos.<br>2. Fórmula.<br>3. Solución.</p>
            <p style="color:#f1c40f;"><b>¿Qué significa este número?</b><br>
            Explicación conceptual detallada del resultado obtenido en la realidad.</p>
        </div>

        <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 30px;">
            <a href="fisica10_dinamica_${id}_practica.html" class="btn btn-practica"><i class="fa-solid fa-dumbbell"></i> Ir a Práctica</a>
            <a href="fisica10_dinamica_${id}_evaluacion.html" class="btn btn-evaluacion"><i class="fa-solid fa-graduation-cap"></i> Evaluar (Tipo ICFES)</a>
        </div>
    </div>
    <script src="auth.js"></script>
    <script src="profe-ia.js"></script>
</body>
</html>
"@
    [System.IO.File]::WriteAllText((Join-Path $baseDir "fisica10_dinamica_${id}.html"), $htmlTheory, [System.Text.Encoding]::UTF8)

    # PRACTICE HTML
    $htmlPractica = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Práctica - $title</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --color-fisica: #3498db; --color-oscuro: #1a1a2e; --color-texto: #ffffff; }
        body { font-family: 'Poppins', sans-serif; background-color: var(--color-oscuro); color: var(--color-texto); padding: 20px; line-height: 1.6; background-image: linear-gradient(rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.95)), url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'); background-size: cover; background-attachment: fixed; }
        .contenedor { max-width: 900px; margin: 40px auto; background: rgba(20,20,35,0.95); padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-top: 5px solid #2ecc71; }
        h1 { color: #2ecc71; font-size: 2.2rem; margin-bottom: 20px; }
        .pregunta-bloque { margin-bottom: 30px; background: rgba(255,255,255,0.03); padding: 25px; border-radius: 12px; border-left: 5px solid #2ecc71; }
        .pregunta-bloque h3 { margin-bottom: 15px; color: #f1c40f; }
        .sub-pregunta { margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px; }
        label { display: block; margin: 8px 0; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 6px; cursor: pointer; transition: 0.3s; }
        label:hover { background: rgba(46, 204, 113, 0.2); }
        input[type="radio"] { margin-right: 10px; }
        .btn { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 18px; font-weight: bold; transition: 0.3s; width: 100%; text-align: center; }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4); }
        .resultado { font-size: 1.5rem; font-weight: bold; margin-top: 25px; color: #f1c40f; text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 10px; display: none; }
        .btn-volver { display: inline-block; margin-bottom: 20px; color: #4facfe; text-decoration: none; font-weight: 600; transition: 0.3s; }
        .btn-volver:hover { color: #fff; transform: translateX(-5px); }
    </style>
</head>
<body>
    <div class="contenedor">
        <a href="fisica10_dinamica_${id}.html" class="btn-volver"><i class="fa-solid fa-arrow-left"></i> Volver a la Teoría</a>
        <h1><i class="fa-solid fa-dumbbell"></i> Práctica en Cadena: $title</h1>
        <p style="color:#ddd; margin-bottom:30px;">A continuación resolverás 10 ejercicios paso a paso en cadena.</p>
        
        <div id="quiz-container">
"@
    # GENERATE 10 QUESTIONS IN THE SCRIPT LOOP
    for ($i=1; $i -le 10; $i++) {
        $htmlPractica += @"
            <div class="pregunta-bloque">
                <h3>Ejercicio ${i}: Aplicación de la Ley</h3>
                <p>Enunciado del problema físico ${i}.</p>
                <div class="sub-pregunta">
                    <p><b>Paso 1 (Cálculo):</b> Selecciona el valor matemático correcto.</p>
                    <label><input type="radio" name="q${i}_math" value="0"> Opción Correcta</label>
                    <label><input type="radio" name="q${i}_math" value="1"> Opción Incorrecta 1</label>
                    <label><input type="radio" name="q${i}_math" value="2"> Opción Incorrecta 2</label>
                    <label><input type="radio" name="q${i}_math" value="3"> Opción Incorrecta 3</label>
                </div>
                <div class="sub-pregunta">
                    <p><b>Paso 2 (Análisis):</b> ¿Qué significa físicamente este resultado?</p>
                    <label><input type="radio" name="q${i}_analisis" value="0"> La aplicación o explicación conceptual correcta de este resultado en la vida real.</label>
                    <label><input type="radio" name="q${i}_analisis" value="1"> Una conclusión falsa sobre la masa/fuerza.</label>
                    <label><input type="radio" name="q${i}_analisis" value="2"> Una conclusión falsa sobre la energía.</label>
                    <label><input type="radio" name="q${i}_analisis" value="3"> No significa nada.</label>
                </div>
            </div>
"@
    }

    $htmlPractica += @"
        </div>
        
        <button class="btn" onclick="calificar()"><i class="fa-solid fa-check-double"></i> Finalizar y Calificar</button>
        <div id="resultado" class="resultado"></div>
    </div>
    
    <script>
        function calificar() {
            let puntaje = 0;
            let total = 20;
            for (let i=1; i<=10; i++) {
                const math = document.querySelector('input[name="q'+i+'_math"]:checked');
                const analisis = document.querySelector('input[name="q'+i+'_analisis"]:checked');
                if (math && math.value === "0") puntaje++;
                if (analisis && analisis.value === "0") puntaje++;
            }
            const resDiv = document.getElementById('resultado');
            resDiv.style.display = 'block';
            resDiv.innerHTML = `Acertaste <span style="color:#2ecc71;">` + puntaje + `</span> de ` + total + ` pasos.`;
        }
    </script>
    <script src="auth.js"></script>
</body>
</html>
"@
    [System.IO.File]::WriteAllText((Join-Path $baseDir "fisica10_dinamica_${id}_practica.html"), $htmlPractica, [System.Text.Encoding]::UTF8)

    # EVALUATION HTML (Re-write with UTF-8 to fix accents)
    $htmlEval = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evaluación - $title</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root { --color-fisica: #3498db; --color-oscuro: #1a1a2e; --color-texto: #ffffff; }
        body { font-family: 'Poppins', sans-serif; background-color: var(--color-oscuro); color: var(--color-texto); padding: 20px; line-height: 1.6; background-image: linear-gradient(rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.95)), url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'); background-size: cover; background-attachment: fixed; }
        .contenedor { max-width: 800px; margin: 40px auto; background: rgba(20,20,35,0.95); padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-top: 5px solid #e74c3c; }
        h1 { color: #e74c3c; font-size: 2.2rem; margin-bottom: 20px; }
        .pregunta { margin-bottom: 25px; background: rgba(255,255,255,0.03); padding: 20px; border-radius: 10px; border-left: 4px solid #e74c3c; }
        label { display: block; margin: 10px 0; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px; cursor: pointer; transition: 0.3s; }
        label:hover { background: rgba(231, 76, 60, 0.2); }
        input[type="radio"] { margin-right: 10px; }
        .btn { display: inline-block; padding: 12px 25px; background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold; transition: 0.3s; }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4); }
        .resultado { font-size: 1.3rem; margin-top: 25px; text-align: center; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 10px; display: none; }
        .btn-volver { display: inline-block; margin-bottom: 20px; color: #4facfe; text-decoration: none; font-weight: 600; transition: 0.3s; }
        .btn-volver:hover { color: #fff; transform: translateX(-5px); }
    </style>
</head>
<body>
    <div class="contenedor">
        <a href="fisica10_dinamica_${id}.html" class="btn-volver"><i class="fa-solid fa-arrow-left"></i> Volver a la Teoría</a>
        <h1><i class="fa-solid fa-graduation-cap"></i> Evaluación (ICFES): $title</h1>
        <p style="color:#ddd; margin-bottom:30px;"><i class="fa-solid fa-triangle-exclamation" style="color:#e74c3c;"></i> <b>Preguntas de Análisis y Casos de Aplicación.</b> El resultado se guardará automáticamente en tu perfil mediante Firestore al finalizar.</p>
        
        <div id="quiz-container">
            <div class="pregunta">
                <p style="font-weight:600; font-size:1.1rem; margin-bottom:15px; color:#fff;">1. Caso: En un experimento, se observa que el valor de la fuerza neta es de 50N pero un sensor detecta que el objeto avanza a velocidad constante. Físicamente, ¿qué nos indica esto sobre el sistema de fuerzas aplicado?</p>
                <label><input type="radio" name="q0" value="0"> Que existe una fuerza de fricción igual y opuesta de 50N que anula la fuerza aplicada.</label>
                <label><input type="radio" name="q0" value="1"> Que el objeto perdió masa repentinamente por el calor.</label>
                <label><input type="radio" name="q0" value="2"> Que el cronómetro falló en la medición de la velocidad.</label>
            </div>
            <div class="pregunta">
                <p style="font-weight:600; font-size:1.1rem; margin-bottom:15px; color:#fff;">2. Caso: Si al despejar una fórmula obtienes una aceleración matemática de -2 m/s², ¿cómo interpretas este número negativo en el contexto físico de un automóvil?</p>
                <label><input type="radio" name="q1" value="0"> El automóvil está frenando (desacelerando) o moviéndose en sentido contrario al eje positivo de referencia.</label>
                <label><input type="radio" name="q1" value="1"> Hubo un error, porque la aceleración en la realidad nunca puede ser negativa.</label>
                <label><input type="radio" name="q1" value="2"> El automóvil está acelerando cada vez más rápido hacia adelante pero en retroceso.</label>
            </div>
            <div class="pregunta">
                <p style="font-weight:600; font-size:1.1rem; margin-bottom:15px; color:#fff;">3. Caso: Un bulto de café reposa en el suelo. Se le aplica una fuerza de 100N hacia arriba, pero el bulto pesa 150N. ¿Qué significado físico tiene el hecho de que 100N sea menor que el peso?</p>
                <label><input type="radio" name="q2" value="0"> El bulto no se levantará del suelo y la fuerza normal disminuirá a 50N.</label>
                <label><input type="radio" name="q2" value="1"> El bulto se moverá hacia abajo rompiendo el suelo.</label>
                <label><input type="radio" name="q2" value="2"> El bulto comenzará a flotar lentamente.</label>
            </div>
        </div>
        
        <button class="btn" onclick="calificarYGuardar()"><i class="fa-solid fa-paper-plane"></i> Enviar Evaluación</button>
        <div id="resultado" class="resultado"></div>
    </div>
    
    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="auth.js"></script>

    <script>
        function calificarYGuardar() {
            let puntaje = 0;
            const res = [0, 0, 0];
            for (let i = 0; i < 3; i++) {
                const seleccion = document.querySelector('input[name="q'+i+'"]:checked');
                if(seleccion && parseInt(seleccion.value) === res[i]) puntaje++;
            }
            const nota = (puntaje / 3) * 5.0; 
            const resDiv = document.getElementById('resultado');
            resDiv.style.display = 'block';
            resDiv.innerHTML = `Tu calificación es: <b style="color:#f1c40f;">` + nota.toFixed(1) + ` / 5.0</b><br><br><small style="color:#aaa;"><i class="fa-solid fa-spinner fa-spin"></i> Guardando resultado en Firestore...</small>`;
            
            if (typeof db !== 'undefined' && typeof auth !== 'undefined') {
                auth.onAuthStateChanged(user => {
                    if(user) {
                        db.collection('evaluaciones').add({
                            uid: user.uid,
                            email: user.email,
                            tema: "Dinámica 10 - $title",
                            puntaje: nota,
                            fecha: firebase.firestore.FieldValue.serverTimestamp()
                        }).then(() => {
                            resDiv.innerHTML = `Tu calificación es: <b style="color:#f1c40f;">` + nota.toFixed(1) + ` / 5.0</b><br><br><span style='color:#2ecc71;'><i class="fa-solid fa-check-circle"></i> ¡Resultado guardado exitosamente en tu perfil!</span>`;
                        }).catch(err => {
                            console.error("Error guardando:", err);
                            resDiv.innerHTML += `<br><span style='color:#e74c3c;'>Error al guardar: ` + err.message + `</span>`;
                        });
                    } else {
                        resDiv.innerHTML = `Tu calificación es: <b style="color:#f1c40f;">` + nota.toFixed(1) + ` / 5.0</b><br><br><span style='color:#e74c3c;'><i class="fa-solid fa-circle-exclamation"></i> Inicia sesión para que el resultado se guarde en tu cuenta.</span>`;
                    }
                });
            } else {
                resDiv.innerHTML += "<br><span style='color:#e74c3c;'>Error: No se pudo conectar con Firestore.</span>";
            }
        }
    </script>
</body>
</html>
"@
    [System.IO.File]::WriteAllText((Join-Path $baseDir "fisica10_dinamica_${id}_evaluacion.html"), $htmlEval, [System.Text.Encoding]::UTF8)
}
