document.addEventListener("DOMContentLoaded", function () {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }

    // 2. Active Page Highlighting
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        const itemHref = item.getAttribute("href");
        if (itemHref === currentPage) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // 3. Contact / Booking Form Handler
    const bookingForm = document.getElementById("bookingForm");
    const formAlert = document.getElementById("formAlert");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const parentName = document.getElementById("parentName").value;
            
            formAlert.className = "form-alert success";
            formAlert.textContent = `Ačiū, ${parentName}! Jūsų registracija gauta. Susisieksime su jumis artimiausiu metu.`;

            bookingForm.reset();
        });
    }

    // 4. DUK Accordion Toggle Logic
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const questionBtn = item.querySelector(".faq-question");
        const icon = item.querySelector(".faq-icon");

        if (questionBtn) {
            questionBtn.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                if (isActive) {
                    item.classList.remove("active");
                    if (icon) icon.textContent = "+";
                } else {
                    item.classList.add("active");
                    if (icon) icon.textContent = "−";
                }
            });
        }
    });
});