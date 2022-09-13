const eventsTxt = document.getElementById("events-no");
const newEventsTxt = document.getElementById("new-events-no");
const approvedEventsTxt = document.getElementById("approved-events-no");
const disapprovedEventsTxt = document.getElementById("disapproved-events-no");

const fetchEvents = async () => {
  const result = await fetch("http://localhost:3000/events", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await result.json();

  console.log(data);

  console.log(upcomingEventsTxt, pastEventsTxt, eventsTxt);

  if (data.success) {
    eventsTxt.textContent = data.no_of_events;
    approvedEventsTxt.textContent = data.no_of_approved_events;
    disapprovedEventsTxt.textContent = data.no_of_approved_events;
    newEventsTxt.textContent = data.no_of_requested_events;
  } else {
    alert("Something went wrong. Try reloading the page!");
  }
};

fetchEvents();
