function executeSearch() {
    const query = document.getElementById('main-input').value.trim();
    
    if (!query) {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

    // Definimos los filtros para que la búsqueda sea "OSINT" pura
    // Buscamos en sitios .gob.gt o .gt y priorizamos documentos (pdf, doc, xls)
    const dorks = `site:.gob.gt OR site:.gt "${query}"`;
    
    // Construimos la URL de búsqueda de Google
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dorks)}`;

    // Feedback visual
    const display = document.getElementById('data-display');
    display.innerHTML = `<p style="text-align:center; color: #38bdf8;">Consultando bases públicas guatemaltecas...</p>`;

    // Abrimos el resultado en una nueva pestaña (o puedes usar un iframe si quieres que no salga de la app)
    // Usamos _blank para que sea una app externa y no se rompa la navegación
    window.open(searchUrl, '_blank');

    // Mostramos confirmación en la UI
    setTimeout(() => {
        display.innerHTML = `
            <div class="result-card">
                <h4>Búsqueda Ejecutada</h4>
                <p>Se han filtrado resultados gubernamentales para: <strong>${query}</strong></p>
                <button onclick="window.open('${searchUrl}', '_blank')" class="tab-btn active">Ver Resultados Nuevamente</button>
            </div>
        `;
    }, 1000);
}
