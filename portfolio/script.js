// Typing effect for exactly what user is
const roles = [
    "Backend Developer",
    "Web Developer",
    "Game Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

document.addEventListener("DOMContentLoaded", () => {
    const roleSpan = document.querySelector(".typing-text");

    function type() {
        if (!roleSpan) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = newTextDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex++;
            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }

        setTimeout(type, typeSpeed);
    }

    if (roleSpan) {
        setTimeout(type, newTextDelay / 2);
    }

    // Scroll Reveal Animation
    function reveal() {
        const reveals = document.querySelectorAll(".reveal, .reveal-right");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Trigger on load

    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Close menu when clicking a link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    // Project Filter Logic
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");

    if (filterBtns.length > 0 && projectItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                projectItems.forEach(item => {
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.classList.remove("hide");
                    } else {
                        item.classList.add("hide");
                    }
                });
            });
        });
    }
});
