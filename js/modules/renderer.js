// modules/renderer.js

/**
 * Renderiza los datos de la sección "About Me" usando plantillas clonadas.
 * @param {object} data - El objeto de datos de la sección AboutMe.
 */
export function renderAboutMeData(data) {
    if (!data) {
        console.error("No se recibieron datos para renderizar AboutMe.");
        return;
    }

    const container = document.getElementById('aboutme-container');
    if (!container) return;

    const generalSection = container.querySelector(".aboutme-general");
    const experieceSection = document.getElementById("aboutme-experience-list");
    const skillsSection = document.getElementById("aboutme-skills-list");

    // --- Cargar Data General ---
    try {
        const imgElement = generalSection.querySelector('.rounded-circle');
        imgElement.setAttribute('src', data.general.imageUrl);
        generalSection.querySelector(".aboutme-general-name").textContent = data.general.name;
        generalSection.querySelector(".aboutme-general-description").textContent = data.general.description;
    } catch (error) {
        console.error("Fallo al cargar data general:", error.message);
    }

    // --- Cargar Data Experiencia/Educación ---
    try {
        const experieceComponent = experieceSection.querySelector(".aboutme-experience-item");
        data.experienceAndEducation.items.forEach(item => {
            const clone = experieceComponent.cloneNode(true);

            // ... (Lógica de clonación y modificación de contenido) ...
            const timeElement = clone.querySelector('.experience-item-date');
            timeElement.setAttribute('datetime', item.year);
            timeElement.textContent = item.year;
            clone.querySelector('.experience-item-type').textContent = item.type;
            clone.querySelector('.experience-item-title').textContent = item.title;
            clone.querySelector('.experience-item-place').textContent = item.place;
            clone.querySelector('.experience-item-description').textContent = item.description;

            // Insertar el elemento clonado al final
            experieceSection.appendChild(clone);
        });
    } catch (error) {
        console.error("Fallo al cargar experiencia:", error.message);
    }

    // --- Cargar Habilidades ---
    try {
        const skillComponent = skillsSection.querySelector(".aboutme-skill-item");

        data.skills.list.forEach(skill => {
            const clone = skillComponent.cloneNode(true);

            clone.querySelector('.skill-item-title').textContent = skill.name;
            clone.querySelector('.skill-item-percentage').textContent = skill.percentage;

            const progressElement = clone.querySelector('.skill-item-progress');
            progressElement.setAttribute('value', skill.percentage);
            progressElement.textContent = skill.percentage + "%";

            skillsSection.appendChild(clone);
        });

        // Ocultar la plantilla original
        skillComponent.style.display = 'none';

    } catch (error) {
        console.error("Fallo al cargar habilidades:", error.message);
    }
}

export function renderTitleName(data) {
    try {
        // Elementos
        const navbarIcon = document.getElementById('iconNavbar');
        const navbarTitle = document.getElementById('nameDropdownNabvar');

        // Separara el nombre y apellido
        const userName = data.aboutme.general.name.split(" ")

        //Primer letra del nombre en el icono
        navbarIcon.textContent = userName[0].split("")[0]
        // Primer nombre en el titulo
        navbarTitle.textContent = userName[0]
    } catch (error) {
        console.error("Error al cargar el titulo: ", error.message)
    }
}