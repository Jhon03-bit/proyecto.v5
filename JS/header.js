document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const hamburger = document.getElementById('hamburger')
    const mainNav = document.getElementById('main-nav')
    const overlay = document.querySelector('.overlay')
    const closeMenuButton = document.getElementById('close-menu')
    const dropdownToggles = document.querySelectorAll('.dropdown > a')
    const navLinks = document.querySelectorAll('.nav-list a')

    // Función para cerrar el menú
    const closeMenu = () => {
        hamburger.classList.remove('active')
        mainNav.classList.remove('active')
        overlay.classList.remove('active')
        hamburger.setAttribute('aria-expanded', 'false')
        // Cierra todos los submenús abiertos
        document.querySelectorAll('.dropdown.open').forEach(openDropdown => {
            openDropdown.classList.remove('open')
            openDropdown.querySelector('a').setAttribute('aria-expanded', 'false')
        })
    }

    // 1. Abrir/cerrar menú hamburguesa
    if (hamburger && mainNav && overlay) {
        hamburger.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active')
            hamburger.classList.toggle('active')
            overlay.classList.toggle('active')
            hamburger.setAttribute('aria-expanded', isActive)
        })
    }

    // 2. Cerrar menú con overlay o botón de cierre
    if (overlay) {
        overlay.addEventListener('click', closeMenu)
    }
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMenu)
    }

    // 3. Submenús independientes en móvil
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
            if (window.innerWidth <= 1000) { // solo móvil
                e.preventDefault()
                const parent = toggle.parentElement
                const isOpen = parent.classList.toggle('open')
                toggle.setAttribute('aria-expanded', isOpen)
            }
        })
    })

    // 4. Cerrar menú al hacer clic en un enlace normal
    navLinks.forEach(link => {
        if (!link.classList.contains('dropdown-toggle')) {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    closeMenu()
                }
            })
        }
    })
})
