const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';
// Add event listeners?

let bool = true;
let isGameOver = false;
let count = 0;
let p = 0;
let score1 = 0;
let score2 = 0;


function changeToX(event) {
  // Get the element that was clicked
  const container = event.currentTarget;
  // Create an <img> tag with the X img src
  const image = document.createElement('img');

  if (isGameOver) return; // ถ้าจบเกมแล้ว ไม่ต้องทำอะไรต่อ
  document.getElementById("status").innerText = "Status : Playing";

  if (bool) {
    document.getElementById("Player").innerText = "Player: 2";
    image.src = X_IMAGE_URL;
    image.style.filter = "invert(22%) sepia(95%) saturate(6932%) hue-rotate(358deg) brightness(99%) contrast(113%)";
    p = 1;
  } else {
    document.getElementById("Player").innerText = "Player: 1";
    image.src = O_IMAGE_URL;
    image.style.filter = "invert(8%) sepia(94%) saturate(6472%) hue-rotate(247deg) brightness(101%) contrast(143%)";
    p = 2;
  }

  // Append that <img> tag to the element
  container.appendChild(image);

  bool = !bool;

  container.removeEventListener('click', changeToX)
  count++;

  if (count == 9) {
    document.getElementById("Player").innerText = "Game Over!!!";
    document.getElementById("status").innerText = "Status : DRAWW!! ";
  }

  checkWin();
}

const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
}



function reset() {
  // event.preventDefault();
  count = 0;
  bool = true;
  isGameOver = false;
  document.getElementById("Player").innerText = "Player: 1";
  document.getElementById("status").innerText = "Status : U Ready!!";

  for (const box of boxes) {
    box.innerHTML = ''; // ลบรูปภาพออก
    box.addEventListener('click', changeToX); // ใส่ listener กลับเข้าไป
  }
}

function checkWin() {

  const win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // แนวนอน
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // แนวตั้ง
    [0, 4, 8], [2, 4, 6]             // แนวทะแยง
  ];

  for (let pat of win) {
    let [a, b, c] = pat;
    const boxA = boxes[a].querySelector('img')?.src;
    const boxB = boxes[b].querySelector('img')?.src;
    const boxC = boxes[c].querySelector('img')?.src;

    if (boxA && boxB && boxC && boxA === boxB && boxB === boxC) {
      document.getElementById("Player").innerText = "GamerOver!!";
      document.getElementById("status").innerText = "Status : Player " + p + " Win!!!";
      isGameOver = true;

      if (p === 1) {
        score1++;
      } else {
        score2++;
      }

      document.getElementById("score").innerHTML = `Score : <span style="color:red">${score1}</span> - <span style="color:blue">${score2}</span>`;
    }
  }

}