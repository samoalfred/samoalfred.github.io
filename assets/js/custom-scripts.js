---
---
// JavaScript code starts below this line
document.addEventListener("DOMContentLoaded", function() {
    console.log("Active link script started (with click prevention for active links).");

    var rawCurrentPath = window.location.pathname;
    var currentPath = rawCurrentPath;
    var siteBaseUrl = "{{ site.baseurl | default: '' }}"; // Jekyll processes this

    // Normalize currentPath (for the page you are on)
    if (siteBaseUrl && currentPath.startsWith(siteBaseUrl)) { // Check if siteBaseUrl is not empty before using startsWith
        currentPath = currentPath.substring(siteBaseUrl.length);
    }
    if (currentPath.endsWith("index.html")) {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf("index.html"));
    }
    if (currentPath === "" || currentPath === "/") {
        currentPath = "/"; 
    }
    // Ensure currentPath starts with a slash if it's not just the root
    // and is not empty (in case baseurl was the whole path)
    if (currentPath !== "/" && currentPath !== "" && !currentPath.startsWith("/")) {
        currentPath = "/" + currentPath;
    }
    // If currentPath became empty after stripping baseurl (meaning we are at baseurl path), normalize to /
    if (currentPath === "") {
        currentPath = "/";
    }

    // Function to make an active link do nothing on click
    function preventDefaultForActiveLink(linkElement) {
        linkElement.addEventListener('click', function(event) {
            // console.log("Active link clicked, preventing default action for:", linkElement.href);
            event.preventDefault(); // This stops the link from navigating/reloading
        });
    }

    // --- Handle the main navigation menu items ---
    var navLinks = document.querySelectorAll(".masthead__menu-item a");

    navLinks.forEach(function(link) {
        var linkHrefRaw = link.getAttribute("href");
        var linkPath = linkHrefRaw; 

        if (linkPath) { // Ensure linkPath is not null
            // Normalize linkPath
            if (siteBaseUrl && linkPath.startsWith(siteBaseUrl)) { // Check if siteBaseUrl is not empty
                linkPath = linkPath.substring(siteBaseUrl.length);
            }
            if (linkPath === "" || linkPath === "/") {
                linkPath = "/";
            }
            if (linkPath !== "/" && linkPath !== "" && !linkPath.startsWith("/")) {
                linkPath = "/" + linkPath;
            }
            if (linkPath === "") {
                linkPath = "/";
            }
            
            // Remove trailing slashes for comparison (unless it's the root path)
            var normalizedLinkPathForCompare = (linkPath !== "/" && linkPath.endsWith('/')) ? linkPath.slice(0, -1) : linkPath;
            var normalizedCurrentPathForCompare = (currentPath !== "/" && currentPath.endsWith('/')) ? currentPath.slice(0, -1) : currentPath;
            
            if (normalizedLinkPathForCompare === normalizedCurrentPathForCompare) {
                link.parentNode.classList.add("active");
                link.setAttribute("aria-current", "page");
                preventDefaultForActiveLink(link); // Call the function to prevent click action
            }
        }
    });

    // --- Handle the site title link ---
    var siteTitleLink = document.querySelector("a.site-title");
    if (siteTitleLink) {
        var siteTitleHrefRaw = siteTitleLink.getAttribute("href");
        var siteTitleHref = siteTitleHrefRaw;

        if (siteTitleHref) { 
            // Normalize siteTitleHref
            if (siteBaseUrl && siteTitleHref.startsWith(siteBaseUrl)) { // Check if siteBaseUrl is not empty
                siteTitleHref = siteTitleHref.substring(siteBaseUrl.length);
            }
            if (siteTitleHref === "" || siteTitleHref === "/") {
                siteTitleHref = "/";
            }
             if (siteTitleHref !== "/" && siteTitleHref !== "" && !siteTitleHref.startsWith("/")) {
                siteTitleHref = "/" + siteTitleHref;
            }
            if (siteTitleHref === "") {
                siteTitleHref = "/";
            }

            if (siteTitleHref === "/" && currentPath === "/") {
                siteTitleLink.classList.add("active");
                siteTitleLink.setAttribute("aria-current", "page");
                preventDefaultForActiveLink(siteTitleLink); // Call the function to prevent click action
            }
        }
    }
    // console.log("Active link script (with click prevention) finished.");
});