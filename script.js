document.addEventListener('DOMContentLoaded', function() {
    // ---------------------------------------------
    // 1. Selecionando Elementos
    // ---------------------------------------------
    const header = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const backToTopBtn = document.getElementById('backToTop');
    const scrollThreshold = 100;
    
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
            
            // Não há mais dropdown de idioma para fechar aqui.
        });
    }

    // ---------------------------------------------
    // 3. Lógica de Scroll (Navbar some/aparece e Botão Topo)
    // ---------------------------------------------
    window.addEventListener('scroll', function() {
        let st = window.scrollY || document.documentElement.scrollTop;

        // A) Comportamento da Navbar (Esconder ao rolar para baixo)
        if (st > lastScrollTop && st > scrollThreshold) {
            header.classList.add('hide-nav');
            // Fecha o menu mobile ao rolar
            if (navList) navList.classList.remove('active');
            
            // Linha removida: if (langDropdown) langDropdown.classList.remove('open');
            
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
    // 4. Clique suave para voltar ao topo
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
    // 5. LÓGICA DE SCROLL REVEAL (Usando IntersectionObserver)
    // ---------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.scroll-reveal').forEach(section => {
        observer.observe(section);
    });
    
    // Dispara uma verificação inicial na carga da página
    window.onload = () => document.querySelectorAll('.scroll-reveal').forEach(section => observer.observe(section));


    // ---------------------------------------------
    // 6. LÓGICA DO CURSOR CUSTOMIZADO (DOT-AND-CIRCLE)
    // ---------------------------------------------
    if (cursorDot && cursorCircle && window.innerWidth > 992) {
        let mouseX = 0, mouseY = 0;
        let circleX = 0, circleY = 0;
        const smoothingFactor = 0.2;

        // 1. Capturar a posição do mouse e mover o DOT imediatamente
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
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
