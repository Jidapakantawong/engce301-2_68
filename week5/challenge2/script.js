const main_id = document.getElementById("main");
const p = main_id.getElementsByTagName("p");

for(let i=0;i<p.length;i++){
    if(i == 5){
        p[i].style.color = "red";
        break;
    }
}