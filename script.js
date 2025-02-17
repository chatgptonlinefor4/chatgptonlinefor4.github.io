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




// Utility function for adding class with delay
const addClassWithDelay = (element, className, delay) => {
    setTimeout(() => element.classList.add(className), delay);
};

const handleNavbarScroll = (() => {
    let lastScrollTime = 0;
    const throttleDelay = 100;
    const heroSection = document.querySelector('#hero');
    const heroHeight = heroSection.offsetHeight;

    return () => {
        const now = Date.now();
        if (now - lastScrollTime >= throttleDelay) {
            const navbar = document.querySelector('.navbar');
            const scrolled = window.scrollY > heroHeight;

            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', scrolled);
                navbar.style.transform = scrolled ? 'translateY(0)' : 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s ease-in-out, background-color 0.3s ease';
            });

            lastScrollTime = now;
        }
    };
})();

// Initialize the network animation
document.addEventListener('DOMContentLoaded', () => {
    const networkContainer = document.createElement('div');
    networkContainer.className = 'network-background';
    document.body.appendChild(networkContainer);

    const networkAnimation = new NetworkAnimation(networkContainer);
    networkAnimation.init();

    // Re-initialize on window resize
    window.addEventListener('resize', () => {
        networkAnimation.init();
    });
});

// Enhanced particle system with performance optimization
class ParticleSystem {
    constructor(container, count) {
        this.container = container;
        this.count = count;
        this.particles = [];
        this.isVisible = true;
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 2;
        
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${duration}s ${delay}s infinite ease-in-out`,
            opacity: '0'
        });

        this.container.appendChild(particle);
        requestAnimationFrame(() => particle.style.opacity = '0.1');
        
        return particle;
    }

    init() {
        this.clear();
        for (let i = 0; i < this.count; i++) {
            this.particles.push(this.createParticle());
        }
    }

    clear() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }

    toggleVisibility(visible) {
        this.isVisible = visible;
        this.particles.forEach(particle => {
            particle.style.opacity = visible ? '0.1' : '0';
        });
    }
}

// Enhanced smooth scroll with easing
const smoothScroll = (target, duration = 1000) => {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    let startTime = null;

    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPosition + distance * ease(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};

// Enhanced form handling with validation and feedback
class ContactForm {
    constructor(formElement) {
        this.form = formElement;
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', this.handleInput.bind(this));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (!this.validateForm()) return;

        this.submitButton.disabled = true;
        this.submitButton.innerHTML = '<span class="spinner"></span> Отправка...';

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError();
        } finally {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Отправить';
        }
    }

    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(input => {
            if (!input.value.trim()) {
                this.showInputError(input, 'Это поле обязательно');
                isValid = false;
            } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                this.showInputError(input, 'Некорректный email');
                isValid = false;
            }
        });
        return isValid;
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showInputError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.classList.add('error');
        input.parentNode.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    handleInput(e) {
        e.target.classList.remove('error');
        const errorMessage = e.target.parentNode.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    }

    showSuccess() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
        this.form.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    }

    showError() {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.textContent = 'Произошла ошибка. Пожалуйста, попробуйте позже.';
        this.form.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const heroSection = document.querySelector('#hero');
    const particleSystem = new ParticleSystem(heroSection, 30);
    particleSystem.init();

    // Initialize smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) smoothScroll(targetElement);
        });
    });

    // Initialize contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) new ContactForm(contactForm);

    // Initialize scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Initialize intersection observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                addClassWithDelay(entry.target, 'animate', 150);
            }
        });
    }, { threshold: 0.1 });

    // Observe sections and cards
    document.querySelectorAll('section, .metrics-card').forEach(element => {
        observer.observe(element);
    });
});

// Handle window resize with debouncing
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

window.addEventListener('resize', debounce(() => {
    const heroSection = document.querySelector('#hero');
    const particleSystem = new ParticleSystem(heroSection, 30);
    particleSystem.init();
}, 250));



class NetworkAnimation {
    constructor(container, numNodes = 20, numConnections = 30) {
        this.container = container;
        this.numNodes = numNodes;
        this.numConnections = numConnections;
        this.nodes = [];
        this.connections = [];
    }

    createNode() {
        const node = document.createElement('div');
        node.className = 'node';
        node.style.top = `${Math.random() * 100}%`;
        node.style.left = `${Math.random() * 100}%`;
        this.container.appendChild(node);
        this.nodes.push(node);
    }

    createConnection() {
        if (this.nodes.length < 2) return;

        const startNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];
        const endNode = this.nodes[Math.floor(Math.random() * this.nodes.length)];

        if (startNode === endNode) return;

        const connection = document.createElement('div');
        connection.className = 'connection';

        const startRect = startNode.getBoundingClientRect();
        const endRect = endNode.getBoundingClientRect();

        const length = Math.sqrt(
            Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
        );
        const angle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

        connection.style.width = `${length}px`;
        connection.style.transform = `rotate(${angle}rad)`;
        connection.style.position = 'absolute';
        connection.style.top = `${startRect.top + window.scrollY + 5}px`;
        connection.style.left = `${startRect.left + window.scrollX + 5}px`;

        this.container.appendChild(connection);
        this.connections.push(connection);
    }

    init() {
        this.clear();
        for (let i = 0; i < this.numNodes; i++) {
            this.createNode();
        }
        for (let i = 0; i < this.numConnections; i++) {
            this.createConnection();
        }
    }

    clear() {
        this.nodes.forEach(node => node.remove());
        this.connections.forEach(connection => connection.remove());
        this.nodes = [];
        this.connections = [];
    }
}
