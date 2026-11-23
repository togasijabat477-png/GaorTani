const navItems = document.queryAll ? document.queryAll : document.querySelectorAll.bind(document);
const views = navItems(".content");

function showView(name) {
  views.forEach(view => view.classList.toggle("active", view.dataset.view === name));
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.toggle("active", item.dataset.target === name);
  });
}

document.querySelectorAll("[data-target]").forEach(button => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    if (target === "weather") showView("camera");
    else showView(target);
  });
});

document.querySelectorAll("[data-back]").forEach(button => {
  button.addEventListener("click", () => showView("dashboard"));
});

const scanButton = document.getElementById("scanButton");
const detectionResult = document.getElementById("detectionResult");
scanButton?.addEventListener("click", () => {
  scanButton.classList.add("scanning");
  setTimeout(() => detectionResult.classList.add("show"), 500);
});
