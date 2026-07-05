//================ LOADER =================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hide');
    }, 800);
});

//================ DARK MODE =================

const darkToggle = document.getElementById('darkModeToggle');
const darkIcon = darkToggle.querySelector('i');

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkIcon.className = 'fa-solid fa-sun';
}

//================ HAMBURGER MENU =================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

//================ TYPING ANIMATION =================

const typedText = document.getElementById('typed-text');
const textArray = ['Chaiti Das', 'Web Developer', 'CSE Student'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (!isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(typeEffect, 500);
            return;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Start typing after page loads
setTimeout(typeEffect, 1000);

//================ PARTICLES BACKGROUND =================

if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6c63ff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6c63ff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                }
            }
        },
        retina_detect: true
    });
}

//================ COUNTER ANIMATION (Only Projects) =================

const counters = document.querySelectorAll('.counter-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.ceil(current);
                }
            }, 30);
            
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

//================ PROJECT MODAL =================

const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.getElementById('modalBody');

const projectData = {
    1: {
        title: 'Online Leave Management System',
        description: 'A comprehensive web application for managing employee leave requests. Features include user authentication, leave application submission, approval/rejection system, and leave balance tracking. Built with PHP and MySQL for the backend with a responsive frontend.',
        tech: ['HTML5', 'CSS3', 'PHP', 'MySQL', 'JavaScript'],
        link: 'https://github.com/dchaity'
    },
    2: {
        title: 'Personal Portfolio Website',
        description: 'A modern, responsive personal portfolio website showcasing education, skills, projects, and contact information. Features include dark mode, typing animation, particle background, and smooth scrolling.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Particles.js'],
        link: 'https://github.com/dchaity'
    }
};

document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.dataset.project;
        const data = projectData[projectId];
        
        if (data) {
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDescription').textContent = data.description;
            
            const techContainer = document.getElementById('modalTech');
            techContainer.innerHTML = '';
            data.tech.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techContainer.appendChild(span);
            });
            
            document.getElementById('modalLink').href = data.link;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

//================ CONTACT FORM =================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    const button = contactForm.querySelector('.btn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;
    
    // Form will submit to Formspree
    // The button will return to normal after submission
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 3000);
});

//================ SCROLL TO TOP =================

const scrollBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//================ NAVBAR SCROLL EFFECT =================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }
});

//================ SMOOTH SCROLL FOR NAV LINKS =================

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

//================ REVEAL ON SCROLL =================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to sections
document.querySelectorAll('section, .footer').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Force show hero immediately
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';
//================ CONTACT FORM HANDLING =================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // পেজ রিলোড বন্ধ করুন
        
        // বাটন ডিসেবল করুন
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        
        // ফর্ম ডেটা সংগ্রহ করুন
        const formData = new FormData(form);
        
        // Formspree এ পাঠান
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // সফল হলে Thank You পৃষ্ঠায় যান
                window.location.href = 'https://dchaity.github.io/thank-you.html';
            } else {
                alert('Oops! Something went wrong. Please try again.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        })
        .catch(error => {
            alert('Network error. Please check your connection.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
    });
});