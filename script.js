// Navbar scroll handler with throttling
const handleNavbarScroll = (() => {
    let lastScrollTime = 0;
    const throttleDelay = 100;
    
    return () => {
        const now = Date.now();
        if (now - lastScrollTime >= throttleDelay) {
            const navbar = document.querySelector('.navbar');
            const scrolled = window.scrollY > 50;
            
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', scrolled);
            });
            
            lastScrollTime = now;
        }
    };
})();


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll handler
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Initialize contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) new ContactForm(contactForm);
});
