---
---
// JavaScript code starts below this line
document.addEventListener("DOMContentLoaded", function() {
    console.log("Active link script started.");

    var rawCurrentPath = window.location.pathname;
    var currentPath = rawCurrentPath;
    var siteBaseUrl = "{{ site.baseurl | default: '' }}"; // Jekyll processes this

    // console.log("Raw window.location.pathname:", rawCurrentPath);
    // console.log("site.baseurl (from Jekyll):", "'" + siteBaseUrl + "'");

    // Normalize currentPath (for the page you are on)
    if (currentPath.startsWith(siteBaseUrl)) {
        currentPath = currentPath.substring(siteBaseUrl.length);
    }
    if (currentPath.endsWith("index.html")) {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf("index.html"));
    }
    if (currentPath === "" || currentPath === "/") {
        currentPath = "/"; 
    }
    if (currentPath !== "/" && !currentPath.startsWith("/")) {
        currentPath = "/" + currentPath;
    }
    // console.log("Normalized currentPath for matching:", "'" + currentPath + "'");

    // --- Handle the main navigation menu items ---
    var navLinks = document.querySelectorAll(".masthead__menu-item a");
    // console.log("Found", navLinks.length, "main navigation links.");

    navLinks.forEach(function(link) { // Loop through each navigation link
        var linkHrefRaw = link.getAttribute("href");
        var linkPath = linkHrefRaw; // Variable 'linkPath' is defined here for each link

        if (linkPath) { // Ensure linkPath is not null
            // Normalize linkPath
            if (linkPath.startsWith(siteBaseUrl)) {
                linkPath = linkPath.substring(siteBaseUrl.length);
            }
            if (linkPath === "" || linkPath === "/") {
                linkPath = "/";
            }
            if (linkPath !== "/" && !linkPath.startsWith("/")) {
                linkPath = "/" + linkPath;
            }
            
            // Remove trailing slashes for comparison (unless it's the root path)
            var normalizedLinkPathForCompare = (linkPath !== "/" && linkPath.endsWith('/')) ? linkPath.slice(0, -1) : linkPath;
            var normalizedCurrentPathForCompare = (currentPath !== "/" && currentPath.endsWith('/')) ? currentPath.slice(0, -1) : currentPath;
            
            if (normalizedLinkPathForCompare === normalizedCurrentPathForCompare) {
                link.parentNode.classList.add("active");
                link.setAttribute("aria-current", "page");
            }
        }
    });

    // --- Handle the site title link ---
    var siteTitleLink = document.querySelector("a.site-title");
    if (siteTitleLink) {
        var siteTitleHrefRaw = siteTitleLink.getAttribute("href");
        var siteTitleHref = siteTitleHrefRaw;

        if (siteTitleHref) { // Ensure siteTitleHref is not null
            // Normalize siteTitleHref
            if (siteTitleHref.startsWith(siteBaseUrl)) {
                siteTitleHref = siteTitleHref.substring(siteBaseUrl.length);
            }
            if (siteTitleHref === "" || siteTitleHref === "/") {
                siteTitleHref = "/";
            }
            if (siteTitleHref !== "/" && !siteTitleHref.startsWith("/")) {
                siteTitleHref = "/" + siteTitleHref;
            }

            if (siteTitleHref === "/" && currentPath === "/") {
                siteTitleLink.classList.add("active");
                siteTitleLink.setAttribute("aria-current", "page");
            }
        }
    }
    // console.log("Active link script finished.");
});