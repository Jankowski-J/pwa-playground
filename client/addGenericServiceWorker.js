if (navigator.serviceWorker && !navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('/genericServiceWorker.js', { scope: './' })
        .then(function (reg) {
            console.log('Registration succeeded. Generic service worker scope is ' + reg.scope);
        }).catch(function (error) {
            console.log('Registration failed with ' + error);
        });
} else {
    console.log('no serviceWorker present')
}