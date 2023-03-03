const url = "http://localhost:5500";
const token = window.localStorage.getItem("token");

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const pathname = window.location.pathname;
    if (token && pathname === "/")
      window.location.replace(`${url}/html/dashboard.html`);
    if (!token && pathname === "/html/dashboard.html")
      window.location.replace(url);
  },
  false
);
