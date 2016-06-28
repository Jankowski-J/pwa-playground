if (navigator.serviceWorker && !navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('/genericServiceWorker.js', { scope: './products/' })
        .then(function (reg) {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function (error) {
            console.log('Registration failed with ' + error);
        });
    navigator.serviceWorker.register('/rootServiceWorker.js', { scope: './' })
        .then(function (reg) {
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function (error) {
            console.log('Registration failed with ' + error);
        });
}