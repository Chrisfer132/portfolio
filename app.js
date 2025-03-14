// Função para adicionar o menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão de menu hamburguer
    const header = document.querySelector('.cabecalho');
    const nav = document.querySelector('.navegacao');
    
    // Criar e adicionar o botão hamburger
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    header.appendChild(menuToggle);
    
    // Adicionar botão de fechar ao menu
    const closeButton = document.createElement('div');
    closeButton.classList.add('menu-close');
    closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    `;
    nav.appendChild(closeButton);
    
    // Eventos para abrir e fechar o menu
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
    });
    
    closeButton.addEventListener('click', function() {
        nav.classList.remove('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.navegacao a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
        }
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInside = nav.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});