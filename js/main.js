const routes = {
    "/": "/pages/home.html",
    "/projects": "/pages/portfolio.html",
    "/about": "/pages/about_me.html",
    "/contact": "/pages/contact.html",
    "404": "/pages/404.html"
};

// Función para obtener la ruta limpia 
// ej. convierte "#/projects" a "/projects"
const getPath = () => window.location.hash.slice(1) || "/";

const loadNavbar = async () => {
    try {
        const navbar_html = await fetch("/pages/components/navbar.html");
        const navbar_content = await navbar_html.text();
        document.getElementById("app-header").innerHTML = navbar_content;

        // Error de HTTP, lanza excepción para ir al catch
        if (!navbar_html.ok) throw new Error(`${navbar_html.status}`);

    } catch (error) {
        console.error("Fallo desconocido:", e.message);
        document.getElementById("app-header").innerHTML =
            `<p>No load navbar.</p>`;
    }
}

// Función asíncrona para cargar el contenido
const loadContent = async (path) => {
    const file = routes[path] || routes["404"];

    try {
        const response = await fetch(file);

        // Error de HTTP, lanza excepción para ir al catch
        if (!response.ok) throw new Error(`${response.status}`);

        const content = await response.text();
        document.getElementById("app-content").innerHTML = content;

    } catch (e) {
        console.error("Fallo de enrutamiento:", e.message);
        document.getElementById("app-content").innerHTML =
            `<h1>Error ${e.message}</h1><p>No se pudo cargar la página ${path}.</p>`;
    }
};

// Función principal de enrutamiento
const route = () => loadContent(getPath());

// Función para retroceder en el historial del navegador
const goBack = () => {
    window.history.back();
};

// Función para avanzar en el historial del navegador
const goForward = () => {
    window.history.forward();
};

// Escuchamos el evento de cambio de hash para navegación
window.addEventListener('hashchange', route);

// Carga inicial al cargar el DOM
document.addEventListener("DOMContentLoaded", route);
document.addEventListener("DOMContentLoaded", loadNavbar);