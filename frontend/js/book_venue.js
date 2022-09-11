const params = new URLSearchParams(window.location.search);

if (!params.has("venue")) {
  alert("Invalid Request!");
  window.location.href = "./venues.html";
}

const venue = params.get("venue");

if (venue === "main_auditorium" || venue === "mini_auditorium") {
} else {
  alert("Venue does not exist or is not available!");
  window.location.href = "./venues.html";
}
