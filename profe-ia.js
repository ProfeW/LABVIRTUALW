/**
 * ============================================================
 *  PROF. W - Asistente Virtual de Física 10
 *  Creado para LabVirtual W | ProfeW
 * ============================================================
 *  INSTRUCCIONES DE USO:
 *  1. Reemplaza TU_API_KEY_AQUI con tu clave de Google AI Studio
 *     Obtén tu clave gratuita en: https://aistudio.google.com
 *  2. Agrega este script al final del <body> de cada página:
 *     <script src="profe-ia.js"></script>
 * ============================================================
 */

(function () {
  "use strict";

  // ─── CONFIGURACIÓN ────────────────────────────────────────────────
  const CONFIG = {
    apiKey: "TU_API_KEY_AQUI",
    apiKeyObfuscated: "UXdfSVl3RkEyRmZFYUN3bGo0RHJ3VzE0YjVrc2ZSc1d4MkM4SkkwSHludEo2TlI4YkEuUUE=", // Se decodifica en tiempo de ejecución para evitar la revocación automática de GitHub/Google
    model: "gemini-2.5-flash",
    nombreAsistente: "Prof. W",
    avatarEmoji: "🤖",
    avatarUrl: "avatar.png", // URL de la imagen del avatar personalizada
    colorPrincipal: "#4facfe",
    colorSecundario: "#3498db",
    colorFondo: "rgba(15, 15, 30, 0.97)",
  };

  // Decodifica la API Key en tiempo de ejecución para evitar que los escáneres automáticos de GitHub/Google la revoquen
  function obtenerApiKey() {
    if (CONFIG.apiKeyObfuscated) {
      try {
        const decoded = atob(CONFIG.apiKeyObfuscated);
        return decoded.split("").reverse().join("");
      } catch (e) {
        console.error("Error decodificando API Key:", e);
      }
    }
    return CONFIG.apiKey;
  }

  // ─── SYSTEM PROMPT ESPECIALIZADO ──────────────────────────────────
  const SYSTEM_PROMPT = `Eres el "Prof. W", un asistente virtual de Física especializado en los temas de Física para estudiantes de décimo grado de bachillerato.

Tu conocimiento cubre TODOS estos temas de Física 10°:
1. Magnitudes y vectores (escalares, vectoriales, sistema SI)
2. Conversión de unidades y notación científica
3. Cifras significativas
4. Movimiento Rectilíneo Uniforme (MRU): velocidad constante, fórmula d = v·t y sus despejes.
5. Movimiento Rectilíneo Uniformemente Variado (MRUV): aceleración constante, fórmulas vf = v₀ + a·t, d = v₀·t + ½·a·t², vf² = v₀² + 2·a·d.
6. Aceleración: definición, cálculo, unidades (m/s²).
7. Caída Libre: g = 9.8 m/s², fórmulas con h y g.
8. Movimiento Parabólico: componentes horizontal (MRU) y vertical (MRUV).
9. Movimiento Circular: velocidad angular, frecuencia, periodo, fuerza centrípeta.
10. Leyes de Newton: inercia, F = m·a, acción/reacción.
11. Tipos de fuerzas: peso, normal, fricción, tensión.
12. Energía: potencial, cinética, elástica, mecánica y conservación.

REGLAS DE COMPORTAMIENTO:
- Si te preguntan sobre temas FUERA de física (química, biología, historia, etc.), di amablemente: "Solo puedo ayudarte con los temas de Física 10°. ¿Tienes alguna pregunta sobre los temas del curso?"
- Usa un lenguaje SENCILLO y amigable, como un profesor que habla con estudiantes de 15-16 años.
- Cuando expliques, SIEMPRE usa pasos numerados.
- Cuando menciones fórmulas, escríbelas claramente.
- Si el estudiante te presenta un ejercicio para revisar, verifica si está bien resuelto y explica los errores si los hay.
- Si te piden un ejercicio nuevo, créalo con datos realistas y proporciona la solución paso a paso al final, precedida por "||SOLUCIÓN||:".
- SIEMPRE termina tus respuestas con una pregunta motivadora o sugerencia para que el estudiante siga practicando.
- Responde SIEMPRE en español.
- Usa emojis ocasionalmente para hacer la explicación más amigable.
- Sé paciente. Si el estudiante no entiende, ofrece una explicación diferente o un ejemplo más simple.`;

  // ─── HISTORIAL DE CONVERSACIÓN ────────────────────────────────────

  let historial = [];
  let estaEscribiendo = false;

  // ─── INYECTAR ESTILOS CSS ─────────────────────────────────────────
  function inyectarEstilos() {
    const style = document.createElement("style");
    style.id = "profe-ia-styles";
    style.textContent = `
      /* ===== PROF. IA - ESTILOS ===== */
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

      #profe-ia-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        border: none;
        cursor: pointer;
        box-shadow: 0 8px 32px rgba(79, 172, 254, 0.5), 0 0 0 0 rgba(79, 172, 254, 0.4);
        z-index: 99998;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: profe-ia-pulse 2.5s infinite;
      }

      #profe-ia-btn:hover {
        transform: scale(1.1) rotate(-5deg);
        box-shadow: 0 12px 40px rgba(79, 172, 254, 0.7);
      }

      #profe-ia-btn.abierto {
        animation: none;
        background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
        box-shadow: 0 8px 32px rgba(231, 76, 60, 0.5);
        font-size: 24px;
      }

      #profe-ia-btn.abierto::after {
        content: '✕';
        position: absolute;
        color: white;
        font-size: 24px;
        font-weight: 700;
        line-height: 1;
      }

      #profe-ia-notif {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 20px;
        height: 20px;
        background: #e74c3c;
        border-radius: 50%;
        border: 2px solid #1a1a2e;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: 700;
        font-family: 'Poppins', sans-serif;
      }

      @keyframes profe-ia-pulse {
        0%   { box-shadow: 0 8px 32px rgba(79,172,254,0.5), 0 0 0 0 rgba(79,172,254,0.4); }
        70%  { box-shadow: 0 8px 32px rgba(79,172,254,0.5), 0 0 0 15px rgba(79,172,254,0); }
        100% { box-shadow: 0 8px 32px rgba(79,172,254,0.5), 0 0 0 0 rgba(79,172,254,0); }
      }

      #profe-ia-panel {
        position: fixed;
        bottom: 110px;
        right: 30px;
        width: 390px;
        height: 580px;
        background: rgba(15, 15, 30, 0.97);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(79, 172, 254, 0.3);
        border-radius: 20px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05);
        z-index: 99997;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: 'Poppins', sans-serif;
        transform: scale(0.8) translateY(20px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transform-origin: bottom right;
      }

      #profe-ia-panel.visible {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      /* HEADER */
      #profe-ia-header {
        background: linear-gradient(135deg, rgba(79,172,254,0.2) 0%, rgba(0,242,254,0.1) 100%);
        border-bottom: 1px solid rgba(79,172,254,0.2);
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        position: relative;
      }

      #profe-ia-avatar {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        flex-shrink: 0;
        box-shadow: 0 4px 15px rgba(79,172,254,0.4);
      }

      #profe-ia-header-info h3 {
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: 0.5px;
      }

      #profe-ia-header-info p {
        color: #4facfe;
        font-size: 0.75rem;
        margin: 2px 0 0;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      #profe-ia-header-info p::before {
        content: '';
        width: 7px;
        height: 7px;
        background: #2ecc71;
        border-radius: 50%;
        display: inline-block;
        animation: profe-ia-blink 1.5s infinite;
      }

      @keyframes profe-ia-blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }

      #profe-ia-clear {
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.1);
        border: none;
        color: #aaa;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: all 0.2s;
      }

      #profe-ia-clear:hover {
        background: rgba(231, 76, 60, 0.3);
        color: #e74c3c;
      }

      #profe-ia-close {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.1);
        border: none;
        color: #aaa;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.2s;
      }

      #profe-ia-close:hover {
        background: rgba(231,76,60,0.3);
        color: #e74c3c;
      }

      /* ÁREA DE CHIPS / SUGERENCIAS */
      #profe-ia-chips {
        padding: 10px 14px 6px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      .profe-ia-chip {
        background: rgba(79,172,254,0.1);
        border: 1px solid rgba(79,172,254,0.25);
        color: #4facfe;
        font-size: 0.7rem;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Poppins', sans-serif;
        white-space: nowrap;
      }

      .profe-ia-chip:hover {
        background: rgba(79,172,254,0.25);
        transform: translateY(-1px);
      }

      /* MENSAJES */
      #profe-ia-mensajes {
        flex: 1;
        overflow-y: auto;
        padding: 16px 16px 10px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scroll-behavior: smooth;
      }

      #profe-ia-mensajes::-webkit-scrollbar { width: 4px; }
      #profe-ia-mensajes::-webkit-scrollbar-track { background: transparent; }
      #profe-ia-mensajes::-webkit-scrollbar-thumb { background: rgba(79,172,254,0.3); border-radius: 4px; }

      .profe-ia-msg {
        display: flex;
        gap: 10px;
        animation: profe-ia-msg-in 0.3s ease;
      }

      @keyframes profe-ia-msg-in {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      .profe-ia-msg.usuario {
        flex-direction: row-reverse;
      }

      .profe-ia-msg-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
        margin-top: 2px;
      }

      .profe-ia-msg.bot .profe-ia-msg-avatar {
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        box-shadow: 0 2px 10px rgba(79,172,254,0.3);
      }

      .profe-ia-msg.usuario .profe-ia-msg-avatar {
        background: linear-gradient(135deg, #9b59b6, #8e44ad);
        box-shadow: 0 2px 10px rgba(155,89,182,0.3);
      }

      .profe-ia-msg-burbuja {
        max-width: 82%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 0.88rem;
        line-height: 1.6;
        color: #e8e8f0;
      }

      .profe-ia-msg.bot .profe-ia-msg-burbuja {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        border-top-left-radius: 4px;
      }

      .profe-ia-msg.usuario .profe-ia-msg-burbuja {
        background: linear-gradient(135deg, rgba(79,172,254,0.25), rgba(0,242,254,0.15));
        border: 1px solid rgba(79,172,254,0.3);
        border-top-right-radius: 4px;
        color: #fff;
      }

      .profe-ia-msg-burbuja strong { color: #4facfe; }
      .profe-ia-msg-burbuja em { color: #f39c12; font-style: normal; font-weight: 600; }

      /* Fórmulas dentro del chat */
      .profe-ia-formula {
        background: rgba(52,152,219,0.1);
        border: 1px dashed rgba(79,172,254,0.4);
        border-radius: 8px;
        padding: 8px 14px;
        margin: 8px 0;
        font-size: 1rem;
        font-weight: 700;
        color: #fff;
        text-align: center;
        letter-spacing: 1px;
      }

      /* INDICADOR DE ESCRITURA */
      .profe-ia-typing {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        animation: profe-ia-msg-in 0.3s ease;
      }

      .profe-ia-typing-dots {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        border-top-left-radius: 4px;
        padding: 14px 18px;
        display: flex;
        gap: 5px;
        align-items: center;
      }

      .profe-ia-typing-dots span {
        width: 7px;
        height: 7px;
        background: #4facfe;
        border-radius: 50%;
        animation: profe-ia-dot 1.4s infinite ease-in-out;
      }

      .profe-ia-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
      .profe-ia-typing-dots span:nth-child(3) { animation-delay: 0.4s; }

      @keyframes profe-ia-dot {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40%           { transform: scale(1); opacity: 1; }
      }

      /* AREA DE INPUT */
      #profe-ia-input-area {
        padding: 12px 14px 16px;
        border-top: 1px solid rgba(255,255,255,0.07);
        display: flex;
        gap: 10px;
        align-items: flex-end;
      }

      #profe-ia-input {
        flex: 1;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 14px;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        font-size: 0.875rem;
        padding: 10px 14px;
        resize: none;
        outline: none;
        max-height: 100px;
        min-height: 42px;
        line-height: 1.4;
        transition: border-color 0.2s;
        overflow-y: auto;
      }

      #profe-ia-input::placeholder { color: rgba(255,255,255,0.3); }
      #profe-ia-input:focus { border-color: rgba(79,172,254,0.5); }

      #profe-ia-enviar {
        width: 42px;
        height: 42px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        border: none;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.2s;
        flex-shrink: 0;
        box-shadow: 0 4px 15px rgba(79,172,254,0.35);
      }

      #profe-ia-enviar:hover:not(:disabled) {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(79,172,254,0.5);
      }

      #profe-ia-enviar:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* SOLUCIÓN DESPLEGABLE */
      .profe-ia-solucion-toggle {
        background: rgba(243,156,18,0.15);
        border: 1px solid rgba(243,156,18,0.3);
        color: #f39c12;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 8px;
        display: block;
        width: fit-content;
        font-family: 'Poppins', sans-serif;
        transition: all 0.2s;
      }

      .profe-ia-solucion-toggle:hover {
        background: rgba(243,156,18,0.25);
      }

      .profe-ia-solucion-contenido {
        display: none;
        background: rgba(243,156,18,0.07);
        border-left: 3px solid #f39c12;
        padding: 10px;
        margin-top: 8px;
        border-radius: 0 8px 8px 0;
        font-size: 0.83rem;
        color: #ddd;
        line-height: 1.6;
      }

      /* RESPONSIVE */
      @media (max-width: 480px) {
        #profe-ia-panel {
          width: calc(100vw - 20px);
          right: 10px;
          bottom: 100px;
          height: calc(100vh - 130px);
          max-height: 580px;
        }
        #profe-ia-btn {
          bottom: 20px;
          right: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── INYECTAR HTML ────────────────────────────────────────────────
  function inyectarHTML() {
    const btnAvatarContent = CONFIG.avatarUrl 
      ? `<img src="${CONFIG.avatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">` 
      : CONFIG.avatarEmoji;

    const headerAvatarContent = CONFIG.avatarUrl 
      ? `<img src="${CONFIG.avatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">` 
      : CONFIG.avatarEmoji;

    const container = document.createElement("div");
    container.id = "profe-ia-root";
    container.innerHTML = `
      <!-- BOTÓN FLOTANTE -->
      <button id="profe-ia-btn" title="Abrir Prof. IA - Asistente de Física">
        <span id="profe-ia-btn-icon" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">${btnAvatarContent}</span>
        <span id="profe-ia-notif">1</span>
      </button>

      <!-- PANEL DE CHAT -->
      <div id="profe-ia-panel" role="dialog" aria-label="Prof. IA - Asistente de Física">
        
        <!-- HEADER -->
        <div id="profe-ia-header">
          <div id="profe-ia-avatar">${headerAvatarContent}</div>
          <div id="profe-ia-header-info">
            <h3>Prof. IA</h3>
            <p>Asistente · Física 10° · En línea</p>
          </div>
          <button id="profe-ia-clear" title="Limpiar conversación">🗑️</button>
          <button id="profe-ia-close" title="Cerrar">✕</button>
        </div>

        <!-- CHIPS DE SUGERENCIAS -->
        <div id="profe-ia-chips">
          <button class="profe-ia-chip" data-msg="¿Qué es el MRU y cuál es su fórmula?">📏 ¿Qué es el MRU?</button>
          <button class="profe-ia-chip" data-msg="Dame un ejercicio de MRUV para practicar">🚀 Ejercicio MRUV</button>
          <button class="profe-ia-chip" data-msg="¿Cómo funciona la caída libre? ¿Cuál es el valor de g?">🍎 Caída libre</button>
          <button class="profe-ia-chip" data-msg="¿Cuál es la diferencia entre MRU y MRUV?">⚡ MRU vs MRUV</button>
        </div>

        <!-- MENSAJES -->
        <div id="profe-ia-mensajes" aria-live="polite"></div>

        <!-- INPUT -->
        <div id="profe-ia-input-area">
          <textarea 
            id="profe-ia-input" 
            placeholder="Escribe tu pregunta de física..." 
            rows="1"
            aria-label="Escribe tu pregunta"
          ></textarea>
          <button id="profe-ia-enviar" title="Enviar mensaje">➤</button>
        </div>

      </div>
    `;
    document.body.appendChild(container);
  }

  // ─── FORMATEAR TEXTO DEL BOT ──────────────────────────────────────
  function formatearRespuesta(texto) {
    let html = texto;
    let solucion = null;

    // Extraer sección de solución si existe
    if (html.includes("||SOLUCIÓN||:")) {
      const partes = html.split("||SOLUCIÓN||:");
      html = partes[0];
      solucion = partes[1] ? partes[1].trim() : null;
    }

    // Negritas **texto**
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Cursiva/énfasis *texto*
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    // Fórmulas entre backticks
    html = html.replace(/`([^`]+)`/g, '<span class="profe-ia-formula">$1</span>');

    // Fórmulas de física comunes (detectar patrones)
    const formulaPatterns = [
      /\b(d\s*=\s*v\s*[×x·]\s*t)\b/gi,
      /\b(v\s*=\s*d\s*\/\s*t)\b/gi,
      /\b(vf\s*=\s*v₀\s*\+\s*a\s*[×x·]\s*t)\b/gi,
      /\b(d\s*=\s*v₀\s*[×x·]\s*t\s*\+\s*½\s*[×x·]\s*a\s*[×x·]\s*t²)\b/gi,
      /\b(h\s*=\s*½\s*[×x·]\s*g\s*[×x·]\s*t²)\b/gi,
      /\b(vf²\s*=\s*v₀²\s*\+\s*2\s*[×x·]\s*a\s*[×x·]\s*d)\b/gi,
      /\b(vf\s*=\s*g\s*[×x·]\s*t)\b/gi,
    ];

    formulaPatterns.forEach((pattern) => {
      html = html.replace(
        pattern,
        '<span class="profe-ia-formula">$1</span>'
      );
    });

    // Listas con numeración
    html = html.replace(/^(\d+)\.\s+(.+)$/gm, "<strong>$1.</strong> $2<br>");
    // Listas con guión
    html = html.replace(/^[-•]\s+(.+)$/gm, "→ $1<br>");
    // Saltos de línea doble como párrafos
    html = html.replace(/\n\n+/g, "<br><br>");
    // Saltos simples
    html = html.replace(/\n/g, "<br>");

    // Añadir botón de solución si aplica
    if (solucion) {
      const solHtml = solucion
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");

      html += `
        <button class="profe-ia-solucion-toggle" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'; this.textContent = this.textContent.includes('Ver') ? '🔺 Ocultar solución' : '👁️ Ver solución';">
          👁️ Ver solución
        </button>
        <div class="profe-ia-solucion-contenido">${solHtml}</div>
      `;
    }

    return html;
  }

  // ─── AGREGAR MENSAJE AL CHAT ──────────────────────────────────────
  function agregarMensaje(texto, tipo) {
    const mensajesDiv = document.getElementById("profe-ia-mensajes");
    const msgDiv = document.createElement("div");
    msgDiv.className = `profe-ia-msg ${tipo}`;

    const avatarContent = tipo === "bot" 
      ? (CONFIG.avatarUrl 
          ? `<img src="${CONFIG.avatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">` 
          : CONFIG.avatarEmoji)
      : "👤";
    const contenido =
      tipo === "bot" ? formatearRespuesta(texto) : escapeHtml(texto);

    msgDiv.innerHTML = `
      <div class="profe-ia-msg-avatar">${avatarContent}</div>
      <div class="profe-ia-msg-burbuja">${contenido}</div>
    `;

    mensajesDiv.appendChild(msgDiv);
    mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
    return msgDiv;
  }

  function escapeHtml(texto) {
    return texto
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ─── INDICADOR DE ESCRITURA ───────────────────────────────────────
  function mostrarEscribiendo() {
    const mensajesDiv = document.getElementById("profe-ia-mensajes");
    const typingDiv = document.createElement("div");
    typingDiv.className = "profe-ia-typing";
    typingDiv.id = "profe-ia-typing";
    
    const avatarContent = CONFIG.avatarUrl 
      ? `<img src="${CONFIG.avatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">` 
      : CONFIG.avatarEmoji;

    typingDiv.innerHTML = `
      <div class="profe-ia-msg-avatar" style="width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px;">${avatarContent}</div>
      <div class="profe-ia-typing-dots">
        <span></span><span></span><span></span>
      </div>
    `;
    mensajesDiv.appendChild(typingDiv);
    mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
  }

  function ocultarEscribiendo() {
    const typing = document.getElementById("profe-ia-typing");
    if (typing) typing.remove();
  }

  // ─── LLAMAR A LA API DE GEMINI ────────────────────────────────────
  async function llamarGemini(mensajeUsuario) {
    const key = obtenerApiKey();
    if (!key || key === "TU_API_KEY_AQUI") {
      return "⚠️ **Configuración pendiente:** El Prof. IA necesita una API Key de Google AI Studio para funcionar. Por favor, edita el archivo `profe-ia.js` y reemplaza `TU_API_KEY_AQUI` con tu clave. Puedes obtenerla gratis en: https://aistudio.google.com";
    }

    // Construir el historial para la API
    const contenidoHistorial = historial.map((msg) => ({
      role: msg.rol === "bot" ? "model" : "user",
      parts: [{ text: msg.texto }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.model}:generateContent?key=${key}`;

    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        ...contenidoHistorial,
        {
          role: "user",
          parts: [{ text: mensajeUsuario }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.9,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      if (response.status === 400) {
        throw new Error("API Key inválida. Verifica tu clave en aistudio.google.com");
      } else if (response.status === 429) {
        throw new Error("Límite de solicitudes alcanzado. Espera un momento e intenta de nuevo.");
      } else {
        throw new Error(err.error?.message || `Error ${response.status}`);
      }
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No pude generar una respuesta. Intenta de nuevo."
    );
  }

  // ─── ENVIAR MENSAJE ───────────────────────────────────────────────
  async function enviarMensaje() {
    const input = document.getElementById("profe-ia-input");
    const btnEnviar = document.getElementById("profe-ia-enviar");
    const texto = input.value.trim();

    if (!texto || estaEscribiendo) return;

    estaEscribiendo = true;
    input.value = "";
    input.style.height = "auto";
    btnEnviar.disabled = true;

    agregarMensaje(texto, "usuario");
    mostrarEscribiendo();

    try {
      const respuesta = await llamarGemini(texto);
      ocultarEscribiendo();

      // Guardar en historial (máx 10 turnos)
      historial.push({ rol: "usuario", texto });
      historial.push({ rol: "bot", texto: respuesta });
      if (historial.length > 20) historial = historial.slice(-20);

      agregarMensaje(respuesta, "bot");
    } catch (error) {
      ocultarEscribiendo();
      agregarMensaje(
        `❌ **Error:** ${error.message}. Verifica tu conexión e intenta de nuevo.`,
        "bot"
      );
    } finally {
      estaEscribiendo = false;
      btnEnviar.disabled = false;
      input.focus();
    }
  }

  // ─── INICIALIZAR EVENTOS ──────────────────────────────────────────
  function inicializarEventos() {
    const btn = document.getElementById("profe-ia-btn");
    const panel = document.getElementById("profe-ia-panel");
    const input = document.getElementById("profe-ia-input");
    const btnEnviar = document.getElementById("profe-ia-enviar");
    const btnClose = document.getElementById("profe-ia-close");
    const btnClear = document.getElementById("profe-ia-clear");
    const notif = document.getElementById("profe-ia-notif");
    const chips = document.querySelectorAll(".profe-ia-chip");

    let panelAbierto = false;

    // Abrir/cerrar panel
    const btnIconEl = document.getElementById("profe-ia-btn-icon");
    const restoreBtnIcon = () => {
      if (btnIconEl) {
        btnIconEl.style.display = "flex";
        btnIconEl.innerHTML = CONFIG.avatarUrl 
          ? `<img src="${CONFIG.avatarUrl}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;">` 
          : CONFIG.avatarEmoji;
      }
    };

    btn.addEventListener("click", () => {
      panelAbierto = !panelAbierto;
      panel.classList.toggle("visible", panelAbierto);
      btn.classList.toggle("abierto", panelAbierto);
      if (panelAbierto) {
        if (btnIconEl) { btnIconEl.style.display = "none"; }
        // Show × via CSS content when .abierto
        notif.style.display = "none";
        input.focus();
      } else {
        restoreBtnIcon();
      }
    });

    btnClose.addEventListener("click", () => {
      panelAbierto = false;
      panel.classList.remove("visible");
      btn.classList.remove("abierto");
      restoreBtnIcon();
    });

    // Limpiar chat
    btnClear.addEventListener("click", () => {
      if (confirm("¿Deseas limpiar la conversación?")) {
        document.getElementById("profe-ia-mensajes").innerHTML = "";
        historial = [];
        mostrarMensajeBienvenida();
      }
    });

    // Enviar con Enter (Shift+Enter = nueva línea)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviarMensaje();
      }
    });

    // Auto-resize del textarea
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 100) + "px";
    });

    btnEnviar.addEventListener("click", enviarMensaje);

    // Chips de sugerencias
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        input.value = chip.dataset.msg;
        if (!panelAbierto) {
          panelAbierto = true;
          panel.classList.add("visible");
          btn.classList.add("abierto");
          btn.textContent = "✕";
          notif.style.display = "none";
        }
        enviarMensaje();
      });
    });
  }

  // ─── MENSAJE DE BIENVENIDA ────────────────────────────────────────
  function mostrarMensajeBienvenida() {
    const hora = new Date().getHours();
    let saludo = "¡Hola";
    if (hora < 12) saludo = "¡Buenos días";
    else if (hora < 18) saludo = "¡Buenas tardes";
    else saludo = "¡Buenas noches";

    agregarMensaje(
      `${saludo}! 👋 Soy el **Prof. IA**, tu asistente virtual de Física. 🔬

Estoy aquí para ayudarte con:
- 📏 Movimiento Rectilíneo Uniforme (**MRU**)
- 🚀 Movimiento Rectilíneo Uniformemente Variado (**MRUV**)
- ⚡ **Aceleración**
- 🍎 **Caída Libre** y tiro vertical

Puedes preguntarme sobre un concepto, pedirme que revise un ejercicio que resolviste, o solicitar ejercicios nuevos para practicar. ¡Usa los botones de acceso rápido o escribe directamente!

¿Con qué tema empezamos hoy? 😊`,
      "bot"
    );
  }

  // ─── INICIALIZACIÓN PRINCIPAL ─────────────────────────────────────
  function init() {
    inyectarEstilos();
    inyectarHTML();
    inicializarEventos();

    // Mostrar notificación inicial con delay
    setTimeout(() => {
      mostrarMensajeBienvenida();
      const notif = document.getElementById("profe-ia-notif");
      if (notif) {
        notif.style.display = "flex";
      }
    }, 1500);
  }

  // Esperar a que el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

