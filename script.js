
        // Mobile Navigation Toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll to Top Button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Animate skill bars on scroll
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress + '%';
                    });
                }
            });
        }, observerOptions);

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        const contactForm = document.getElementById("contactForm");
const statusMessage = document.getElementById("statusMessage");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {

            alert("Thank you for your message! I will get back to you soon.");

            statusMessage.innerHTML = "✅ Message Sent Successfully!";
            statusMessage.style.color = "#00cc66";

            contactForm.reset();

        } else {

            alert("Failed to send message!");

            statusMessage.innerHTML = "❌ Failed to send message!";
            statusMessage.style.color = "red";

        }

    } catch (error) {

        alert("Network Error!");

        statusMessage.innerHTML = "❌ Network Error!";
        statusMessage.style.color = "red";

        console.log(error);

    } finally {

        submitBtn.innerHTML = "Send Message";
        submitBtn.disabled = false;

    }
});

/* Portfolio Visitor Counter */

fetch("https://api.counterapi.dev/v1/anurag-kumar-portfolio-2026/visits/up")
.then(res => res.json())
.then(data => {

    let total = data.count;

    let current = 0;

    let counter = document.getElementById("visitor-count");

    let animation = setInterval(() => {

        current++;

        counter.innerHTML = current.toLocaleString();

        if (current >= total) {
            clearInterval(animation);
        }

    }, 20);

})
.catch(error => {
    console.log("Visitor Counter Error:", error);
    document.getElementById("visitor-count").innerHTML = "0";
});