const container = document.getElementById("container");

const fetchUpcomingEvents = async () => {
  const result = await fetch("http://localhost:3000/events/requests", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await result.json();

  console.log(data);

  if (data.success) {
    data.events.forEach((event) => {
      const imageUrl =
        event.location === "Main Auditorium"
          ? "../images/main_auditorium.jpg"
          : "../images/mini_auditorium.jpg";
      const container = document.createElement("div");
      container.innerHTML = `
                  <img src=${imageUrl} width alt="" />
                  <h4>${event.title}</h4>`;
    });
  } else if (!data.success) {
    alert("Something went wrong. Try reloading the page!");
  }
};

fetchUpcomingEvents();
