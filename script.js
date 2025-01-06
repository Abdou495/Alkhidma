// Sslec all filter buttons and filtrable cards
const filterbuttons = document.querySelectorAll("filter_buttons button")
const filtrablecards = document.querySelectorAll("filterable_cards .card")

// define the filtrablecards function
const filtercards = e => {
    document.querySelector(".active").classlist.remove("active")
    e.target.classlist.add("active");
    console.log(e.target);
};
// add click event listener to each filter button
filterbuttons.forEach(button => button.addEventListener("click",filtrablecards));