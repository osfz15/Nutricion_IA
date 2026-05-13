// --- CONFIGURACIÓN DE SEGURIDAD ---
// No ponemos la clave aquí para que no sea pública en GitHub.
let API_KEY = localStorage.getItem('nutri_api_key') || "";

// Función para actualizar la clave si es necesario
const configurarKey = () => {
    const nuevaKey = prompt("Ingresa tu API Key de Gemini (Solo la primera vez):", API_KEY);
    if (nuevaKey) {
        localStorage.setItem('nutri_api_key', nuevaKey);
        API_KEY = nuevaKey;
        location.reload(); // Recarga para aplicar
    }
};

// Si no hay clave, la pide al cargar
if (!API_KEY) {
    configurarKey();
}

// Usamos Gemini 1.5 Flash Latest por ser el más estable para apps web
const getApiUrl = () => `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

window.onload = async () => {
    const video = document.getElementById('webcam');
    const btnCapture = document.getElementById('capture-btn');
    const resultCard = document.getElementById('result-card');

    // Botón extra para cambiar la clave si falla
    const btnKey = document.createElement('button');
    btnKey.innerText = "🔑 Cambiar API Key";
    btnKey.style = "position:fixed; top:10px; right:10px; z-index:100; font-size:10px; opacity:0.5;";
    btnKey.onclick = configurarKey;
    document.body.appendChild(btnKey);

    // --- INICIAR CÁMARA ---
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        video.srcObject = stream;
        await video.play();
    } catch (e) { 
        alert("Error de cámara. Asegúrate de usar HTTPS o localhost."); 
    }

    // --- LÓGICA DE ANÁLISIS ---
    btnCapture.onclick = async () => {
        if (!API_KEY) return configurarKey();

        const desc = document.getElementById('food-description').value;
        
        video.pause(); // Congelar imagen (
