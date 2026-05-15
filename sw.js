self.addEventListener('push', (event) => {
    const options = {
        body: 'Es hora de tu comida. ¡Toma una foto para analizarla!',
        icon: 'https://cdn-icons-png.flaticon.com/512/2424/2424422.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/2424/2424422.png'
    };
    event.waitUntil(self.registration.showNotification('NutriVision AI', options));
});
