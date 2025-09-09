document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.querySelector('.overlay');
    const closeMenuButton = document.getElementById('close-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Función para cerrar el menú
    const closeMenu = () => {
        hamburger.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        // También cierra los submenús abiertos
        document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
            openDropdown.classList.remove('open');
            openDropdown.querySelector('a').setAttribute('aria-expanded', 'false');
        });
    };

    // 1. Oyente de clic para el botón de hamburguesa (abrir/cerrar)
    if (hamburger && mainNav && overlay) {
        hamburger.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            overlay.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });
    }

    // 2. Cerrar el menú al hacer clic en el overlay o el botón de cierre
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMenu);
    }

    // 3. Funcionalidad de los dropdowns en móvil
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            if (window.innerWidth <= 1000) {
                event.preventDefault();
                const parentLi = toggle.closest('li.dropdown');
                
                // Cierra otros dropdowns abiertos
                document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
                    if (openDropdown !== parentLi) {
                        openDropdown.classList.remove('open');
                        openDropdown.querySelector('a').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Alterna el dropdown actual
                const isExpanded = parentLi.classList.toggle('open');
                toggle.setAttribute('aria-expanded', isExpanded);
            }
        });
    });

    // 4. Cerrar el menú si se hace clic en un enlace que no sea un dropdown
    navLinks.forEach(link => {
        if (!link.classList.contains('dropdown-toggle')) {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    closeMenu();
                }
            });
        }
    });
});