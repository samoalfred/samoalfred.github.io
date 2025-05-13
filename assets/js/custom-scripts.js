document.addEventListener("DOMContentLoaded", function() {
    var currentPath = window.location.pathname;
    if (currentPath.endsWith("index.html")) {
      currentPath = currentPath.substring(0, currentPath.lastIndexOf("index.html"));
    }
    if (currentPath === "" || currentPath === "/") {
        currentPath = "/"; // Normalize homepage path
    }
  
    var navLinks = document.querySelectorAll(".masthead__menu-item a");
  
    navLinks.forEach(function(link) {
      var linkPath = link.getAttribute("href");
  
      // Normalize linkPath if it's just the baseurl (for homepage)
      // Assuming site.baseurl is "/" or empty for root. If it's more complex, this might need adjustment.
      if (linkPath === "{{ '/' | relative_url }}" || linkPath === "{{ site.baseurl }}/") {
          linkPath = "/";
      }
  
      // Remove trailing slash for comparison if one has it and the other doesn't
      if (currentPath.endsWith('/') && !linkPath.endsWith('/')) {
          currentPath = currentPath.slice(0, -1);
      }
      if (linkPath.endsWith('/') && !currentPath.endsWith('/')) {
          linkPath = linkPath.slice(0, -1);
      }
  
      if (linkPath === currentPath) {
        link.parentNode.classList.add("active"); // Add 'active' to the parent <li>
      }
    });
  });