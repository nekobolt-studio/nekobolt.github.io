// --- Mobile Navigation Toggle --- //
const hamburgerButton = document.getElementById('hamburger-button');
const mainNav = document.getElementById('main-nav');
const navIndicator = document.getElementById('nav-indicator');

if (hamburgerButton && mainNav) {
    hamburgerButton.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-nav-active');
        const isExpanded = mainNav.classList.contains('mobile-nav-active');
        hamburgerButton.setAttribute('aria-expanded', isExpanded);
    });

    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-nav-active')) {
                mainNav.classList.remove('mobile-nav-active');
                hamburgerButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// --- Smooth Scrolling & Effects --- //
const navLinks = document.querySelectorAll('nav ul li a');
let isScrolling = false;

navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            e.preventDefault();
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Pixel Burst Effect
                createPixelBurst(this);

                isScrolling = true; // Block scroll-highlighting during smooth scroll
                
                // Update active state immediately for better feel
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                updateIndicator(this);

                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                history.pushState(null, null, targetId);

                // Re-enable scroll highlighting after smooth scroll is likely done
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }
        }
    });

    // Update indicator on hover
    anchor.addEventListener('mouseenter', function() {
        if (!isScrolling) updateIndicator(this);
    });
});

// Reset indicator to active link when mouse leaves nav
const navList = document.querySelector('nav ul');
if (navList) {
    navList.addEventListener('mouseleave', () => {
        if (isScrolling) return;
        const activeLink = document.querySelector('nav ul li a.active');
        if (activeLink) {
            updateIndicator(activeLink);
        } else {
            if (navIndicator) navIndicator.style.opacity = '0';
        }
    });
}

function updateIndicator(element) {
    if (!navIndicator) return;
    
    const rect = element.getBoundingClientRect();
    const navRect = mainNav.getBoundingClientRect();
    
    navIndicator.style.width = `${rect.width}px`;
    navIndicator.style.left = `${rect.left - navRect.left}px`;
    navIndicator.style.opacity = '1';
}

function createPixelBurst(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#DE2B8C', '#79FFB2', '#FFD700', '#ffffff'];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'pixel-particle';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 6 + 4;
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        const tr = Math.random() * 360;
        const duration = Math.random() * 500 + 500;

        particle.style.backgroundColor = color;
        particle.style.color = color; // For box-shadow
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--tr', `${tr}deg`);
        
        particle.style.animation = `pixel-fade ${duration}ms ease-out forwards`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration);
    }
}

// --- Active Link Highlighting on Scroll --- //
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    if (isScrolling) return; 
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        
        const navLink = document.querySelector(`nav ul li a[href*=${sectionId}]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
                updateIndicator(navLink);
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            highlightNav();
            scrollTimeout = null;
        }, 100);
    }
});

// Email Obfuscation Script
document.addEventListener("DOMContentLoaded", function() {
    highlightNav();

    var emailElement = document.getElementById("email");
    if (emailElement) {
        var emailText = emailElement.textContent;
        if (emailText.includes(" [at] ")) {
            var emailAddress = emailText.replace(" [at] ", "@").replace(" [dot] ", ".");
            emailElement.href = 'mailto:' + emailAddress;
            emailElement.textContent = emailAddress;
        }
    }
});
