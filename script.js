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
    const windowHeight = window.innerHeight;
    const revealPoint = windowHeight * 0.80; 

    // Para cada elemento com a classe .scroll-reveal
    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        
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


// --- 5. LÓGICA DO CURSOR CUSTOMIZADO (DOT-AND-CIRCLE) ---

const cursorDot = document.getElementById('cursor-dot');
const cursorCircle = document.getElementById('cursor-circle');

let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;
const smoothingFactor = 0.2; // Controla a suavidade da perseguição

// 1. Capturar a posição do mouse e mover o DOT imediatamente
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move o DOT imediatamente
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
});

// 2. Animar o Círculo com transição suave (Loop de animação)
function animateCircle() {
    // Calcula a diferença entre a posição do mouse e a posição atual do círculo
    const deltaX = mouseX - circleX;
    const deltaY = mouseY - circleY;

    // Ajusta a posição do círculo em direção ao mouse, usando o smoothingFactor
    circleX += deltaX * smoothingFactor;
    circleY += deltaY * smoothingFactor;

    // Aplica a nova posição ao elemento
    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;

    // Solicita o próximo frame de animação
    requestAnimationFrame(animateCircle);
}

// Inicia o loop de animação para o círculo
animateCircle();