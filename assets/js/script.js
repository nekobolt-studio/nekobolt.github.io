// --- Mobile Navigation Toggle --- //
const hamburgerButton = document.getElementById('hamburger-button');
const mainNav = document.getElementById('main-nav');

if (hamburgerButton && mainNav) {
    hamburgerButton.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-nav-active');
        // Optional: Toggle ARIA attribute for accessibility
        const isExpanded = mainNav.classList.contains('mobile-nav-active');
        hamburgerButton.setAttribute('aria-expanded', isExpanded);
    });
}

// Email Obfuscation Script
document.addEventListener("DOMContentLoaded", function() {
    var emailElement = document.getElementById("email");
    if (emailElement) { // Check if element exists
        var emailText = emailElement.textContent;
        // Ensure we don't try to replace if it's already an anchor
        if (emailText.includes(" [at] ")) {
            var emailAddress = emailText.replace(" [at] ", "@").replace(" [dot] ", ".");
            emailElement.innerHTML = '<a href="mailto:' + emailAddress + '">' + emailAddress + '</a>';
        }
    }
}); 