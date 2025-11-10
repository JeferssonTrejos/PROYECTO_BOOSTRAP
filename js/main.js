// app.js
import { setUserFileName, getUserFileName } from './modules/store.js';
import { loadNavbar, route } from './modules/router.js';

function userFileNameHandler(opt) {
    // 1. Establece el nombre de archivo del usuario en localStorage
    setUserFileName(opt); 

    // 2. Recarga la página desde el servidor
    // window.location.reload();
    route() 
    // o simplemente location.reload();
}

// Funciones iniciales
function start_fun() {
    // 1. Configurar el usuario por defecto (Lógica de Store)
    // setUserFileName(1);
    // console.log(`Usuario activo: ${getUserFileName()}`);

    // 2. Cargar contenido inicial y navbar (Lógica de Router)
    route();
    loadNavbar();
}

window.userFileNameHandler = userFileNameHandler;

// Escuchamos el evento de cambio de hash para navegación
window.addEventListener('hashchange', route);

// Carga inicial al cargar el DOM
document.addEventListener("DOMContentLoaded", start_fun);