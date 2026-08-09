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
