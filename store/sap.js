function loadContent(page) {
    Promise.all([
        fetch(`${page}.html`).then(response => response.text()),
        fetch(`${page}.css`).then(response => response.text())
    ])
    .then(([html, css]) => {
        document.getElementById('content').innerHTML = html;
        injectStyles(css);
        initializeTyped();
    })
    .catch(error => console.error('Error loading content:', error));
}

function injectStyles(css) {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
}

function initializeTyped() {
    var typed = new Typed('.typed-text', {
        strings: ["teseiei", "test nsjs", "testjdfvgsdgv"],
        typeSpeed: 30,
        backSpeed: 20,
        loop: true
    });
}
