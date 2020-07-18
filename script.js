const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
console.log(seats);
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

var ticketPrice = parseInt(movieSelect.value);
populateUI();
//console.log(typeof ticketPrice);
function setMovieData(x, y) {
  localStorage.setItem("selectedMovieIndex", x);
  localStorage.setItem("selectedMoviePrice", y);
}
function updateSelectedCount() {
  const x = document.querySelectorAll(".row .seat.selected");
  const X = x.length;
  const seatsIndex = [...x].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  count.innerText = String(X);
  total.innerText = String(X * ticketPrice);
}
function populateUI() {
  const selectedSeats = localStorage.getItem("selectedSeats");
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  console.log(selectedSeats);
  console.log(selectedMovieIndex);
  console.log(selectedMoviePrice);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = parseInt(movieSelect.value);
  }

  //ticketPrice = parseInt(localStorage.);
}
movieSelect.addEventListener("change", (e) => {
  ticketPrice = parseInt(movieSelect.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

updateSelectedCount();
