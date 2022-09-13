const fetchUpcomingEvents = async () => {
  const result = await fetch("http://localhost:3000/events/approved", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await result.json();

  console.log(data);

  if (data.success) {
    eventsTxt.textContent = data.no_of_events;
    approvedEventsTxt.textContent = data.no_of_approved_events;
    disapprovedEventsTxt.textContent = data.no_of_approved_events;
    newEventsTxt.textContent = data.no_of_requested_events;
  } else {
    alert("Something went wrong. Try reloading the page!");
  }
};

fetchUpcomingEvents();
