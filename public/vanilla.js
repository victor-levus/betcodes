var searchSuggestionList = document.getElementById("root");

console.log(searchSuggestionList);

document.addEventListener("mouseup", function (e) {
  var container = document.getElementById("searchBox");
  var container2 = document.getElementById("searchSuggestionBox");
  if (!container?.contains(e.target)) {
    container2?.classList.add("hidden");
  }
});
