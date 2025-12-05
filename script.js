document.addEventListener('DOMContentLoaded', function() {
    // ---------------------------------------------
    // 1. Selecionando Elementos
    // ---------------------------------------------
    const header = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const backToTopBtn = document.getElementById('backToTop');
    const scrollThreshold = 100;
    
    // Elementos do Dropdown de Idioma
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('language-dropdown');

    // Elementos do Cursor Customizado
    const cursorDot = document.getElementById('cursor-dot');
    const cursorCircle = document.getElementById('cursor-circle');

    let lastScrollTop = 0;

    // ---------------------------------------------
    // 2. Lógica do Menu Hambúrguer (Mobile)
    // ---------------------------------------------
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Fecha o dropdown de idioma se o menu for aberto
            if (langDropdown && langDropdown.classList.contains('open')) {
                langDropdown.classList.remove('open');
            }
        });
    }

    // ---------------------------------------------
    // 3. Lógica do Seletor de Idioma Dropdown (Novo Recurso)
    // ---------------------------------------------
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que o link atualize a página imediatamente
            e.stopPropagation(); // Impede que o clique seja detectado pelo 'document'
            
            // Alterna a classe 'open' no elemento language-selector
            langDropdown.classList.toggle('open');
            
            // Fecha o menu mobile se o dropdown de idioma for aberto
            if (navList && navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
        
        // Fechar o dropdown de idioma se o usuário clicar fora dele
        document.addEventListener('click', function(e) {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
            }
        });
    }

    // ---------------------------------------------
    // 4. Lógica de Scroll (Navbar some/aparece e Botão Topo)
    // ---------------------------------------------
    window.addEventListener('scroll', function() {
        let st = window.scrollY || document.documentElement.scrollTop;

        // A) Comportamento da Navbar (Esconder ao rolar para baixo)
        if (st > lastScrollTop && st > scrollThreshold) {
            header.classList.add('hide-nav');
            // Fecha o menu mobile e o dropdown ao rolar
            if (navList) navList.classList.remove('active');
            if (langDropdown) langDropdown.classList.remove('open');
        } else if (st < lastScrollTop) {
            header.classList.remove('hide-nav');
        }
        lastScrollTop = st <= 0 ? 0 : st;

        // B) Botão Voltar ao Topo
        if (st > 300) {
            backToTopBtn.classList.add('show-btn');
        } else {
            backToTopBtn.classList.remove('show-btn');
        }
    });

    // ---------------------------------------------
    // 5. Clique suave para voltar ao topo
    // ---------------------------------------------
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ---------------------------------------------
    // 6. LÓGICA DE SCROLL REVEAL (Usando IntersectionObserver para melhor performance)
    // ---------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: Desobservar após a primeira aparição para otimizar
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // O objeto se torna visível quando 10% dele está na tela
    });

    document.querySelectorAll('.scroll-reveal').forEach(section => {
        observer.observe(section);
    });
    
    // Dispara uma verificação inicial para elementos já visíveis no carregamento
    window.onload = () => document.querySelectorAll('.scroll-reveal').forEach(section => observer.observe(section));


    // ---------------------------------------------
    // 7. LÓGICA DO CURSOR CUSTOMIZADO (DOT-AND-CIRCLE)
    // ---------------------------------------------
    if (cursorDot && cursorCircle && window.innerWidth > 992) {
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;
        const smoothingFactor = 0.2;

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
            const deltaX = mouseX - circleX;
            const deltaY = mouseY - circleY;

            circleX += deltaX * smoothingFactor;
            circleY += deltaY * smoothingFactor;

            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCircle);
        }

        // Inicia o loop de animação
        animateCircle();
    }
});
