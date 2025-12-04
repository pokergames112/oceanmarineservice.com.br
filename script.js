// Selecionando elementos
const header = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
const backToTopBtn = document.getElementById('backToTop');

let lastScrollTop = 0;

// 1. Lógica do Menu Hambúrguer (Mobile)
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// 2. Lógica de Scroll (Navbar some/aparece e Botão Topo)
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // A) Comportamento da Navbar
    if (scrollTop > lastScrollTop) {
        // Rolando para BAIXO -> Esconde a Nav
        header.classList.add('hide-nav');
        // Fecha o menu mobile se estiver aberto ao rolar
        navList.classList.remove('active');
    } else {
        // Rolando para CIMA -> Mostra a Nav
        header.classList.remove('hide-nav');
    }
    
    lastScrollTop = scrollTop;

    // B) Botão Voltar ao Topo (Aparece após 300px)
    if (scrollTop > 300) {
        backToTopBtn.classList.add('show-btn');
    } else {
        backToTopBtn.classList.remove('show-btn');
    }
});

// 3. Clique suave para voltar ao topo
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});