// modules/renderer.js

/**
 * Renderiza los datos de la sección "Home" actualizando título, subtítulo, imagen y estadísticas.
 * @param {object} homeData - El objeto de datos de la sección Home.
 * @param {object} aboutmeData - El objeto de datos de la sección AboutMe.
 */
export function renderHomeData(homeData, aboutmeData) {
    if (!homeData) {
        console.error("No se recibieron datos para renderizar Home.");
        return;
    }

    try {
        // --- SECCIÓN HERO ---
        // Actualizar título (profesión)
        const titleElement = document.getElementById('home-dynamic-title');
        if (titleElement) {
            titleElement.textContent = homeData.title;
        }

        // Actualizar subtítulo (descripción)
        const subtitleElement = document.getElementById('home-dynamic-subtitle');
        if (subtitleElement) {
            subtitleElement.textContent = homeData.subtitle;
        }

        // Actualizar imagen de perfil
        const profileImg = document.getElementById('home-profile-img');
        if (profileImg) {
            profileImg.setAttribute('src', homeData.imageUrl);
        }

        // Actualizar estadísticas del hero
        const statsProjects = document.getElementById('home-stat-projects');
        if (statsProjects) {
            statsProjects.textContent = homeData.stats.projects;
        }

        const statsClients = document.getElementById('home-stat-clients');
        if (statsClients) {
            statsClients.textContent = homeData.stats.clients;
        }

        const statsYears = document.getElementById('home-stat-years');
        if (statsYears) {
            statsYears.textContent = homeData.stats.years;
        }

        // --- SECCIÓN SOBRE MÍ ---
        if (aboutmeData) {
            try {
                // Actualizar imagen
                const aboutmeImg = document.getElementById('home-aboutme-profile-img');
                if (aboutmeImg) {
                    aboutmeImg.setAttribute('src', aboutmeData.general.imageUrl);
                }

                // Actualizar nombre
                const aboutmeName = document.getElementById('home-aboutme-name');
                if (aboutmeName) {
                    aboutmeName.textContent = aboutmeData.general.name;
                }

                // Actualizar descripción
                const aboutmeDesc = document.getElementById('home-aboutme-description');
                if (aboutmeDesc) {
                    aboutmeDesc.textContent = aboutmeData.general.description;
                }

                // Actualizar estadísticas de la sección sobre mí
                const aboutmeStatProjects = document.getElementById('home-aboutme-stat-projects');
                if (aboutmeStatProjects && homeData.stats.projects) {
                    aboutmeStatProjects.textContent = homeData.stats.projects;
                }

                const aboutmeStatClients = document.getElementById('home-aboutme-stat-clients');
                if (aboutmeStatClients && homeData.stats.clients) {
                    aboutmeStatClients.textContent = homeData.stats.clients;
                }

                const aboutmeStatYears = document.getElementById('home-aboutme-stat-years');
                if (aboutmeStatYears && homeData.stats.years) {
                    aboutmeStatYears.textContent = homeData.stats.years;
                }
            } catch (error) {
                console.error("Fallo al cargar datos de 'Sobre mí' en el home:", error.message);
            }
        }

    } catch (error) {
        console.error("Fallo al cargar data del home:", error.message);
    }
}

/**
 * Renderiza los datos de la sección "Portfolio" actualizando proyectos dinámicamente.
 * @param {object} portfolioData - El objeto de datos de la sección Portfolio.
 */
export function renderPortfolioData(portfolioData) {
    if (!portfolioData || !portfolioData.projects) {
        console.error("No se recibieron datos para renderizar Portfolio.");
        return;
    }

    const container = document.getElementById('portfolio-projects-container');
    if (!container) {
        console.error("No se encontró el contenedor de proyectos.");
        return;
    }

    // Obtener la plantilla del primer proyecto (card + modal)
    const projectTemplate = container.querySelector('.portfolio-item');
    if (!projectTemplate) {
        console.error("No se encontró la plantilla de proyecto.");
        return;
    }

    try {
        portfolioData.projects.forEach((project, index) => {
            const clone = projectTemplate.cloneNode(true);

            // --- CARD ---
            // Actualizar imagen
            const cardImg = clone.querySelector('.portfolio-project-img img');
            if (cardImg) {
                cardImg.src = project.image;
                cardImg.alt = project.title;
            }

            // Actualizar badges
            const badgesContainer = clone.querySelector('.portfolio-badge-container ');
            if (badgesContainer) {
                const badgeTemplate = badgesContainer.querySelector('.badge');
                if (badgeTemplate) {
                    // Limpiar badges anteriores (mantener solo la plantilla)
                    const allBadges = badgesContainer.querySelectorAll('.badge');
                    allBadges.forEach((badge, idx) => {
                        if (idx > 0) badge.remove();
                    });

                    project.badges.forEach((badgeText, idx) => {
                        if (idx === 0) {
                            // Reutilizar el primer badge (plantilla)
                            badgeTemplate.textContent = badgeText;
                        } else {
                            // Clonar para los demás
                            const badgeClone = badgeTemplate.cloneNode(true);
                            badgeClone.textContent = badgeText;
                            badgesContainer.appendChild(badgeClone);
                        }
                    });
                }
            }

            // Actualizar título
            const cardTitle = clone.querySelector('.card-title');
            if (cardTitle) {
                cardTitle.textContent = project.title;
            }

            // Actualizar descripción
            const cardText = clone.querySelector('.card-text');
            if (cardText) {
                cardText.textContent = project.description;
            }

            // Actualizar botón modal (ID único)
            const modalButton = clone.querySelector('[data-bs-toggle="modal"]');
            const modalId = `modal${index+1}`;
            if (modalButton) {
                modalButton.setAttribute('data-bs-target', `#${modalId}`);
            }

            // --- MODAL ---
            const modal = clone.querySelector('.modal');
            if (modal) {
                modal.id = modalId;

                // Actualizar título del modal
                const modalTitle = modal.querySelector('.portfolio-modal-title');
                if (modalTitle) {
                    modalTitle.textContent = project.title;
                }

                // Actualizar badges del modal
                const modalBadgesContainer = modal.querySelector('.portfolio-badge-container');
                if (modalBadgesContainer) {
                    const modalBadgeTemplate = modalBadgesContainer.querySelector('.badge');
                    if (modalBadgeTemplate) {
                        // Limpiar badges anteriores (mantener solo la plantilla)
                        const allModalBadges = modalBadgesContainer.querySelectorAll('.badge');
                        allModalBadges.forEach((badge, idx) => {
                            if (idx > 0) badge.remove();
                        });

                        project.badges.forEach((badgeText, idx) => {
                            if (idx === 0) {
                                // Reutilizar el primer badge (plantilla)
                                modalBadgeTemplate.textContent = badgeText;
                            } else {
                                // Clonar para los demás
                                const badgeClone = modalBadgeTemplate.cloneNode(true);
                                badgeClone.textContent = badgeText;
                                modalBadgesContainer.appendChild(badgeClone);
                            }
                        });
                    }
                }

                // Actualizar descripción detallada
                const modalDescription = modal.querySelector('.modal-body p');
                if (modalDescription) {
                    modalDescription.textContent = project.detailedDescription;
                }

                // Actualizar características
                const modalFeaturesList = modal.querySelector('.modal-body ul');
                if (modalFeaturesList) {
                    const featureTemplate = modalFeaturesList.querySelector('li');
                    if (featureTemplate) {
                        // Limpiar features anteriores (mantener solo la plantilla)
                        const allFeatures = modalFeaturesList.querySelectorAll('li');
                        allFeatures.forEach((feature, idx) => {
                            if (idx > 0) feature.remove();
                        });

                        project.features.forEach((featureText, idx) => {
                            if (idx === 0) {
                                // Reutilizar el primer li (plantilla)
                                featureTemplate.textContent = featureText;
                            } else {
                                // Clonar para los demás
                                const featureClone = featureTemplate.cloneNode(true);
                                featureClone.textContent = featureText;
                                modalFeaturesList.appendChild(featureClone);
                            }
                        });
                    }
                }

                // Actualizar tecnologías
                const modalTechnologies = modal.querySelectorAll('.modal-body p')[1];
                if (modalTechnologies) {
                    modalTechnologies.textContent = project.technologies;
                }

                // Actualizar botón de demo
                const demoButton = modal.querySelector('.portfolio-viewdemo');
                if (demoButton && project.demoLink) {
                    demoButton.onclick = () => {
                        if (project.demoLink !== '#') {
                            window.open(project.demoLink, '_blank');
                        } else {
                            alert('Demo no disponible');
                        }
                    };
                }
            }

            // Mostrar el clon (la plantilla estará oculta)
            // clone.style.display = '';

            // Insertar el proyecto clonado
            container.appendChild(clone);
        });

        // Ocultar la plantilla original
        // projectTemplate.style.display = 'none';

        console.log(`✅ Se renderizaron ${portfolioData.projects.length} proyectos correctamente.`);

    } catch (error) {
        console.error("Error al renderizar proyectos:", error.message);
    }
}

/**
 * Función auxiliar para cargar datos desde un archivo JSON
 * @param {string} jsonPath - Ruta del archivo JSON
 * @returns {Promise<object>} - Datos del JSON
 */
export async function loadPortfolioJSON(jsonPath) {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`Error al cargar JSON: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error cargando el JSON:", error.message);
        return null;
    }
}

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

        // Limpiar elementos clonados anteriores (mantener solo la plantilla)
        const allItems = experieceSection.querySelectorAll(".aboutme-experience-item");
        allItems.forEach((item, index) => {
            if (index > 0) item.remove(); // Elimina todos excepto el primero (plantilla)
        });

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

        // Limpiar elementos clonados anteriores (mantener solo la plantilla)
        const allSkills = skillsSection.querySelectorAll(".aboutme-skill-item");
        allSkills.forEach((skill, index) => {
            if (index > 0) skill.remove(); // Elimina todos excepto el primero (plantilla)
        });

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
        const navbarTitle = document.getElementById('nameNabvar');

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