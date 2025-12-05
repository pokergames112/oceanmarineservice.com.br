// Selecionando elementos da Navbar e Scroll
const header = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
const backToTopBtn = document.getElementById('backToTop');

let lastScrollTop = 0;

// --- 1. Lógica do Menu Hambúrguer (Mobile) ---
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// --- 2. Lógica de Scroll (Navbar some/aparece e Botão Topo) ---
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

    // C) Executa a verificação do Scroll Reveal (integrado no evento de scroll)
    checkVisibility();
});

// --- 3. Clique suave para voltar ao topo ---
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// --- 4. LÓGICA DE SCROLL REVEAL (Animação das Seções) ---

const revealElements = document.querySelectorAll('.scroll-reveal');

// Função para verificar se o elemento está no viewport
function checkVisibility() {
    // Para cada elemento com a classe .scroll-reveal
    revealElements.forEach(el => {
        // Pega a posição do topo do elemento em relação ao topo do viewport
        const elementTop = el.getBoundingClientRect().top;
        
        // Define o ponto de gatilho: 80% da altura da tela
        const windowHeight = window.innerHeight;
        const revealPoint = windowHeight * 0.80; 

        if (elementTop < revealPoint) {
            // Adiciona a classe 'visible' para disparar a animação CSS
            el.classList.add('visible');
        }
    });
}

// Inicializa a verificação na carga da página (para elementos que já estão no topo)
window.addEventListener('load', checkVisibility);

// Executa a verificação na mudança de tamanho da janela (para responsividade)
window.addEventListener('resize', checkVisibility);