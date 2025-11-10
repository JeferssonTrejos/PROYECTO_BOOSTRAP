// modules/router.js
import { routes, getPath } from '../utils/helpers.js';
import { getUserFileName } from './store.js';
import { renderAboutMeData, renderTitleName } from './renderer.js';

/**
 *    
 */
export const fetchUserData = async () => {
    const fileName = getUserFileName();

    // Construir la ruta al archivo JSON usando el nombre de archivo del usuario
    const fileData = "/assets/portfolioData/" + fileName + ".json";

    try {
        const responseData = await fetch(fileData);

        if (responseData.ok) {
            // Devuelve el objeto JSON parseado
            return await responseData.json();
        } else {
            console.warn(`No se encontró data para el usuario: ${fileName}. Estado: ${responseData.status}`);
            return null;
        }
    } catch (error) {
        // console.error("Error al obtener datos JSON:", error);
        return null;
    }
};



/**
 * Carga el componente de la barra de navegación.
 */
export const loadNavbar = async () => {
    try {
        const navbar_html = await fetch("/pages/components/navbar.html");
        const navbar_content = await navbar_html.text();
        document.getElementById("app-header").innerHTML = navbar_content;

        if (!navbar_html.ok) throw new Error(`${navbar_html.status}`);

        renderTitleName(await fetchUserData())

    } catch (error) {
        console.error("Fallo al cargar navbar:", error);
        document.getElementById("app-header").innerHTML = `<p>No se pudo cargar la barra de navegación.</p>`;
    }
}

/**
 * Carga el contenido principal de la página basado en la ruta y los datos del usuario.
 */
export const loadContent = async () => {
    const path = getPath();
    const fileName = getUserFileName();

    const file = routes[path] || routes["404"];

    let data = await fetchUserData();

    const appContent = document.getElementById("app-content");
    // 2. Cargar el HTML de la página
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`${response.status}`);
        const content = await response.text();

        // Inyectar el HTML
        appContent.innerHTML = content;

        // 3. Ejecutar lógica específica después de inyectar el HTML
        try {

            switch (path) {
                case "/":
                    // console.log("Cargando data home");
                    break;

                case "/projects":
                    // console.log("Cargando data projects");
                    break;

                case "/about":
                    // console.log("Cargando data about");
                    renderAboutMeData(data.aboutme)
                    break;

                case "/contact":
                    // console.log("Cargando data contact");
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Fallo", error.message);
        }
    } catch (e) {
        console.error("Fallo de enrutamiento:", e.message);
        appContent.innerHTML =
            `<h1>Error ${e.message}</h1><p>No se pudo cargar la página ${path}.</p>`;
    }
};

/**
 * Función principal de enrutamiento (ejecuta la carga de contenido).
 */
export const route = () => loadContent();