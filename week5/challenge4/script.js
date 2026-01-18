const link = document.querySelectorAll("nav a");

link.forEach(l =>{
    l.addEventListener("click", (event) =>{
        event.preventDefault();
        alert(l.innerHTML + " clicked!");
    });
});