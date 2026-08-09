document.addEventListener("DOMContentLoaded", function() {
  const headerElem = document.getElementById("header-include");
  if (headerElem) {
    fetch('./header.html')
      .then(response => {
        if (!response.ok) throw new Error('Header load failed');
        return response.text();
      })
      .then(html => {
        headerElem.innerHTML = html.replace(/href="\.\//g, 'href="./');
        const pageId = document.body.getAttribute("data-page");
        if (pageId) {
          const activeNav = document.getElementById("nav-" + pageId);
          if (activeNav) activeNav.classList.add("active");
        }
        const navToggle = document.getElementById("nav-toggle");
        const siteNav = document.getElementById("site-nav");
        if (navToggle && siteNav) {
          navToggle.addEventListener("click", function() {
            const isOpen = siteNav.classList.toggle("nav-open");
            navToggle.classList.toggle("is-active", isOpen);
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
          });
          siteNav.querySelectorAll("a").forEach(function(link) {
            link.addEventListener("click", function() {
              siteNav.classList.remove("nav-open");
              navToggle.classList.remove("is-active");
              navToggle.setAttribute("aria-expanded", "false");
              navToggle.setAttribute("aria-label", "メニューを開く");
            });
          });
        }
      })
      .catch(err => console.error(err));
  }
  const footerElem = document.getElementById("footer-include");
  if (footerElem) {
    fetch('./footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Footer load failed');
        return response.text();
      })
      .then(html => {
        footerElem.innerHTML = html.replace(/href="\.\//g, 'href="./');
      })
      .catch(err => console.error(err));
  }
});
