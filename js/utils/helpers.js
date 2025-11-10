// utils/helpers.js

export const routes = {
    "/": "/pages/home.html",
    "/projects": "/pages/portfolio.html",
    "/about": "/pages/about_me.html",
    "/contact": "/pages/contact.html",
    "404": "/pages/404.html"
};

/**
 * Función para obtener la ruta limpia del hash.
 * @returns {string} La ruta limpia (ej. "/about").
 */
export const getPath = () => window.location.hash.slice(1) || "/";