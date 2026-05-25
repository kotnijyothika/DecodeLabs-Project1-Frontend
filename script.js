/* =============================================
   JAVASCRIPT FILE - script.js
   Interactive Features for Modern Portfolio
   ============================================= */

//等待DOM完全加载
document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. Mobile Menu Toggle
    // ============================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        // Toggle menu visibility
        navLinks.classList.toggle('active');

        // Change icon (bars to times)
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });


    // ============================================
    // 2. Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });


    // ============================================
    // 3. Smooth Scrolling for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ============================================
    // 4. Scroll to Top Button
    // ============================================
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ============================================
    // 5. Contact Form Validation
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const msgError = document.getElementById('msgError');

    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name field
    function validateName() {
        const nameValue = nameInput.value.trim();

        if (nameValue === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (nameValue.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            showError(nameInput, nameError, 'Name should contain only letters');
            return false;
        } else {
            removeError(nameInput, nameError);
            return true;
        }
    }

    // Validate email field
    function validateEmail() {
        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, emailError, 'Please enter a valid email');
            return false;
        } else {
            removeError(emailInput, emailError);
            return true;
        }
    }

    // Validate message field
    function validateMessage() {
        const messageValue = messageInput.value.trim();

        if (messageValue === '') {
            showError(messageInput, msgError, 'Message is required');
            return false;
        } else if (messageValue.length < 10) {
            showError(messageInput, msgError, 'Message must be at least 10 characters');
            return false;
        } else {
            removeError(messageInput, msgError);
            return true;
        }
    }

    // Show error
    function showError(input, errorElement, message) {
        input.parentElement.classList.add('error');
        errorElement.textContent = message;
    }

    // Remove error
    function removeError(input, errorElement) {
        input.parentElement.classList.remove('error');
        errorElement.textContent = '';
    }

    // Real-time validation (on input blur)
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    // Clear errors on input
    nameInput.addEventListener('input', () => removeError(nameInput, nameError));
    emailInput.addEventListener('input', () => removeError(emailInput, emailError));
    messageInput.addEventListener('input', () => removeError(messageInput, msgError));

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If all fields are valid
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message show';
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';

            // Insert success message before form
            contactForm.insertBefore(successMessage, contactForm.firstChild);

            // Reset form
            contactForm.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);

            // Log form data (for demo purposes)
            console.log('Form Submitted:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        }
    });


    // ============================================
    // 6. Active Link Highlighting on Scroll
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // ============================================
    // 7. Staggered Animation on Page Load
    // ============================================
    const cards = document.querySelectorAll('.card');

    // Add initial state for animation
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Trigger animation
    setTimeout(() => {
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 500);


    // ============================================
    // 8. Year Auto-Update in Footer
    // ============================================
    const yearElements = document.querySelectorAll('footer p');
    const currentYear = new Date().getFullYear();

    yearElements.forEach(el => {
        if (el.textContent.includes('©')) {
            el.textContent = `© ${currentYear} DevPortfolio. All Rights Reserved.`;
        }
    });


    // ============================================
    // 9. Console Welcome Message
    // ============================================
    console.log(`
    ╔═══════════════════════════════════════╗
    ║     Welcome to DevPortfolio! 🚀     ║
    ╠═══════════════════════════════════════╣
    ║  Built with:                        ║
    ║  ✓ HTML5 Semantic Markup            ║
    ║  ✓ CSS3 Modern Styling             ║
    ║  ✓ Vanilla JavaScript              ║
    ║  ✓ Responsive Design               ║
    ╚═══════════════════════════════════════╝
    `);
});