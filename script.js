const ring = document.querySelector(".carousel__ring");
const items = Array.from(document.querySelectorAll(".carousel__item"));
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const toast = document.getElementById("toast");
const buttonArea = document.getElementById("buttonArea");

const radius = 240;
const itemCount = items.length;
const angleStep = 360 / itemCount;

items.forEach((item, index) => {
  const angle = angleStep * index;
  item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
});

const moveNoButton = () => {
  if (!buttonArea) return;
  const areaRect = buttonArea.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();

  const padding = 12;
  const maxX = areaRect.width - noRect.width - padding;
  const maxY = areaRect.height - noRect.height - padding;

  let x = Math.random() * maxX + padding / 2;
  let y = Math.random() * maxY + padding / 2;

  const overlapX = !(x + noRect.width < yesRect.left - areaRect.left ||
    x > yesRect.right - areaRect.left);
  const overlapY = !(y + noRect.height < yesRect.top - areaRect.top ||
    y > yesRect.bottom - areaRect.top);

  if (overlapX && overlapY) {
    x = Math.min(maxX, x + noRect.width);
    y = Math.max(padding / 2, y - noRect.height);
  }

  noBtn.style.right = "auto";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
};

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
  toast.classList.add("show");
  ring.style.animationPlayState = "paused";
  setTimeout(() => toast.classList.remove("show"), 4000);
});
