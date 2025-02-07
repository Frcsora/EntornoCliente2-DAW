addEventListener("DOMContentLoaded", (event) => {
    const img = document.createElement("img");
    fetch("https://randomuser.me/")
    .then(response => response.json())
    .then(data => {
        console.log(data)
    }).catch(err => console.log(err));
})