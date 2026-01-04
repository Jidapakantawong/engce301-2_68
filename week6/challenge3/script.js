const link = document.querySelectorAll("nav a");

link.forEach(a =>{
    a.addEventListener("click", (event) =>{
        alert(" clicked!");
    });
});
