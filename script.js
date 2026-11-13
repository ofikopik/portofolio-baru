/* =========================================================
   Taufik's Portfolio - script.js
   Every feature is in its own small block, so it is easy to read.
   ========================================================= */

(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- 1. Dark / light theme ---------- */
    var root = document.documentElement;
    var themeToggle = document.getElementById("themeToggle");

    themeToggle.addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) { /* storage not available */ }
        document.querySelector('meta[name="theme-color"]').setAttribute("content", next === "dark" ? "#0b1409" : "#f5f9ee");
    });

    /* ---------- 2. Mobile menu ---------- */
    var menuBtn = document.getElementById("menuBtn");
    var navLinks = document.getElementById("navLinks");

    function setMenu(open) {
        navLinks.classList.toggle("open", open);
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    menuBtn.addEventListener("click", function () {
        setMenu(!navLinks.classList.contains("open"));
    });

    navLinks.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
    });

    /* ---------- 3. Typing effect ---------- */
    var typedEl = document.getElementById("typed");
    var roles = ["Student", "Web Learner", "Future Developer", "Curious Builder"];
    var roleIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function type() {
        var word = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typedEl.textContent = word.substring(0, charIndex);

        var delay = deleting ? 45 : 95;

        if (!deleting && charIndex === word.length) {
            deleting = true;
            delay = 1500;                       // pause when the word is complete
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }
        setTimeout(type, delay);
    }

    if (reduceMotion) {
        typedEl.textContent = roles[0];
    } else {
        type();
    }

    /* ---------- 4. Navbar shadow, scroll progress, back-to-top ---------- */
    var navbar = document.getElementById("navbar");
    var progress = document.getElementById("progress");
    var toTop = document.getElementById("toTop");

    function onScroll() {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - window.innerHeight;

        progress.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
        navbar.classList.toggle("scrolled", scrollTop > 10);
        toTop.classList.toggle("show", scrollTop > 600);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    /* ---------- 5. Highlight the menu link of the section you are viewing ---------- */
    var sections = document.querySelectorAll("main section[id]");
    var links = document.querySelectorAll(".nav-link");

    function setActive(id) {
        links.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
    }

    if ("IntersectionObserver" in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        sections.forEach(function (section) { sectionObserver.observe(section); });
    }

    /* ---------- 6. Reveal on scroll + number counters ---------- */
    var revealEls = document.querySelectorAll(".reveal");

    function animateCount(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        if (reduceMotion || isNaN(target)) { el.textContent = target; return; }

        var start = null;
        var duration = 1200;

        function step(ts) {
            if (start === null) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                entry.target.querySelectorAll("[data-count]").forEach(animateCount);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        // Very old browsers: just show everything
        revealEls.forEach(function (el) { el.classList.add("visible"); });
        document.querySelectorAll("[data-count]").forEach(animateCount);
    }

    /* ---------- 7. Profile photo fallback ---------- */
    // If images/taufik.jpeg is missing, show a big "T" instead of a broken image.
    var photo = document.getElementById("profilePhoto");
    var frame = photo.closest(".photo-frame");

    function showFallback() { frame.classList.add("no-photo"); }

    photo.addEventListener("error", showFallback);
    if (photo.complete && photo.naturalWidth === 0) showFallback();

    /* ---------- 8. Copy Instagram handle + toast ---------- */
    var copyBtn = document.getElementById("copyBtn");
    var toast = document.getElementById("toast");
    var toastTimer;

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
    }

    function fallbackCopy(text) {
        var area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        try { document.execCommand("copy"); } catch (e) { /* ignore */ }
        document.body.removeChild(area);
    }

    copyBtn.addEventListener("click", function () {
        var text = copyBtn.getAttribute("data-copy");

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
        } else {
            fallbackCopy(text);
        }
        showToast("Copied " + text + " ✓");
    });

    /* ---------- 9. Footer year ---------- */
    document.getElementById("year").textContent = new Date().getFullYear();
})();
