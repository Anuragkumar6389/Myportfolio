
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

/* =====================================================
   CERTIFICATE PDF THUMBNAILS
===================================================== */

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


function loadCertificatePDF(pdfPath, canvasId, loadingId) {

    const canvas =
        document.getElementById(canvasId);

    const loading =
        document.getElementById(loadingId);


    if (!canvas) {

        console.error(
            "Canvas not found:",
            canvasId
        );

        return;
    }


    const context =
        canvas.getContext("2d");


    pdfjsLib
        .getDocument(pdfPath)
        .promise

        .then(function(pdf) {

            return pdf.getPage(1);

        })

        .then(function(page) {


            /*
             * IMPORTANT:
             * rotation: 0
             * PDF ko automatically rotate
             * nahi karega.
             */

            const originalViewport =
                page.getViewport({
                    scale: 1,
                    rotation: 0
                });


            const container =
                canvas.parentElement;


            const maxWidth =
                container.clientWidth - 30;


            const maxHeight =
                container.clientHeight - 30;


            const widthScale =
                maxWidth /
                originalViewport.width;


            const heightScale =
                maxHeight /
                originalViewport.height;


            /*
             * Certificate ko card ke andar
             * proper contain rakhenge.
             */

            const scale =
                Math.min(
                    widthScale,
                    heightScale
                );


            const viewport =
                page.getViewport({

                    scale: scale,

                    rotation: 0

                });


            canvas.width =
                viewport.width;


            canvas.height =
                viewport.height;


            canvas.style.width =
                viewport.width + "px";


            canvas.style.height =
                viewport.height + "px";


            return page.render({

                canvasContext: context,

                viewport: viewport

            }).promise;

        })

        .then(function() {

            if (loading) {

                loading.style.display =
                    "none";

            }

        })

        .catch(function(error) {

            console.error(
                "Certificate PDF error:",
                pdfPath,
                error
            );


            if (loading) {

                loading.innerHTML =
                    "Certificate preview unavailable";

            }

        });

}


/* =====================================================
   LOAD ALL CERTIFICATES
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        loadCertificatePDF(

            "./certificates/AI-skills-passport.pdf",

            "pdf-ai",

            "loading-ai"

        );


        loadCertificatePDF(

            "./certificates/Android-Developer-certificate.pdf",

            "pdf-android",

            "loading-android"

        );


        loadCertificatePDF(

            "./certificates/LLM-Certificate.pdf",

            "pdf-llm",

            "loading-llm"

        );


        loadCertificatePDF(

            "./certificates/aws-certificate.pdf",

            "pdf-aws",

            "loading-aws"

        );


    }
);