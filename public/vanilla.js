document.addEventListener("mouseup", function (e) {
  const container = document.getElementById("menu--3dots");
  const container3 = document.getElementById("menu--list-box");

  if (!container3?.contains(e.target) && !container?.contains(e.target)) {
    container3?.classList.add("hidden");
  }
});
