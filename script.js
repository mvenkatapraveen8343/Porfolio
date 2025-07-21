document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: "power3.out"
        });
    });

    const interactiveElements = document.querySelectorAll('a, button, .menu-toggle, .project-card, .info-box, .skills-box, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navbar.classList.toggle('active');

        const icon = this.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });

    // ✅ Close navbar when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');

            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');

            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            document.body.style.overflow = '';
        });
    });

    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 100);
    });

    emailjs.init('-OiB8nFRnnc_rdo-O');

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (!validateForm()) return;

            btnText.textContent = 'Sending...';
            btnLoader.style.display = 'block';
            submitBtn.disabled = true;

            try {
                const response = await emailjs.sendForm(
                    'service_s2nqk77',
                    'template_c9kq6po',
                    this
                );

                contactForm.reset();

                setTimeout(() => {
                    window.location.href = 'thankyou.html';
                }, 0);

            } catch (error) {
                console.error('FAILED...', error);
                showMessage(`Error: ${error.text || 'Failed to send message'}`, 'error');

            } finally {
                btnText.textContent = 'Send Message';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    function validateForm() {
        const name = document.getElementById('from_name').value.trim();
        const email = document.getElementById('email_id').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showMessage('Please fill in all required fields', 'error');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return false;
        }

        return true;
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00abf0"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00abf0",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    const typed = new Typed('.multiple-text', {
        strings: ['Python Developer', 'Full Stack Developer', 'Web Developer'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    });

    function animateOnScroll() {
        const elements = document.querySelectorAll('.text-animate');
        elements.forEach((el, index) => {
            el.style.setProperty('--i', index);
        });
    }

    animateOnScroll();

    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('.skills');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('.header').offsetHeight;

    function scrollActive() {
        let currentSectionId = '';
        let minDistance = Infinity;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const distance = Math.abs(window.scrollY - sectionTop);

            if (distance < minDistance) {
                minDistance = distance;
                currentSectionId = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.03,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    document.querySelectorAll('.info-box[data-link]').forEach(box => {
        box.style.cursor = 'pointer';
        box.addEventListener('click', () => {
            const link = box.getAttribute('data-link');
            const type = box.getAttribute('data-type');

            if (type === 'email' || type === 'phone') {
                window.location.href = link;
            } else {
                window.open(link, '_blank');
            }
        });
    });


    gsap.from('.logo', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out"
    });

    gsap.from('.navbar a', {
        duration: 1,
        y: -50,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.from('.menu-toggle', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out",
        delay: 0.8
    });
});
