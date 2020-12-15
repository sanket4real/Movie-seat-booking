const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// save selected movie index and price
function setMovieData(movieIndedx, moviePrice) {
	localStorage.setItem("selectedMovieIndex", movieIndedx);
	localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll(".row .seat.selected");

	//copy selected seats into array &map through it
	const seatsIndex = [...selectedSeats].map((seat) => {
		return [...seats].indexOf(seat);
	});

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate Ui
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = JSON.parse(
		localStorage.getItem("selectedMovieIndex")
	);
	console.log(selectedMovieIndex);
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

//movie select event
movieSelect.addEventListener("change", (e) => {
	ticketPrice = e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

//seat clicked event
container.addEventListener("click", (e) => {
	if (
		e.target.classList.contains("seat") &&
		!e.target.classList.contains("occupied")
	) {
		e.target.classList.toggle("selected");
		updateSelectedCount();
	}
});

//Initial Count and total set
updateSelectedCount();
