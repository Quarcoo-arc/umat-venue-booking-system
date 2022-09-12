const params = new URLSearchParams(window.location.search);

if (!params.has("venue")) {
  alert("Invalid Request!");
  window.location.href = "./venues.html";
}

const venue = params.get("venue");

if (venue === "main_auditorium" || venue === "mini_auditorium") {
  const locationTxtField = document.getElementById("location");
  locationTxtField.defaultValue =
    venue === "main_auditorium" ? "Main Auditorium" : "Mini Auditorium";
  const form = document.getElementById("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      title: form.elements["event_name"].value,
      date: form.elements["event_date"].value,
      location:
        venue === "main_auditorium" ? "Main Auditorium" : "Mini Auditorium",
      duration: form.elements["event_duration"].value,
      contact_person: form.elements["name"].value,
      phone_no: form.elements["phone_no"].value,
      email: form.elements["email"].value,
      additional_info: form.elements["additional_info"].value,
    };

    const result = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await result.json();
    if (data.success) {
      alert("Request for venue placed successfully!");
      window.location.href = "./";
    }
  });
} else {
  alert("Venue does not exist or is not available!");
  window.location.href = "./venues.html";
}
