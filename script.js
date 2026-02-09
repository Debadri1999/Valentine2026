const track = document.getElementById("wheelTrack");
const items = Array.from(document.querySelectorAll(".wheel__item"));
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const toast = document.getElementById("toast");
const buttonArea = document.getElementById("buttonArea");
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

const radius = 360;
const total = items.length;
const step = 360 / total;

items.forEach((item, index) => {
  const angle = step * index;
  item.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`;
});

let activeIndex = 0;

const setActive = (index) => {
  items.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === index);
  });
};

const rotateWheel = () => {
  if (!track || total === 0) return;
  activeIndex = (activeIndex + 1) % total;
  const rotation = -step * activeIndex;
  track.style.transform = `rotateY(${rotation}deg)`;
  setActive(activeIndex);
};

setActive(0);
let autoRotate = setInterval(rotateWheel, 2800);

const stopRotation = () => {
  if (autoRotate) {
    clearInterval(autoRotate);
    autoRotate = null;
  }
};

const startRotation = () => {
  if (!autoRotate) {
    autoRotate = setInterval(rotateWheel, 2800);
  }
};

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
  stopRotation();
  setTimeout(() => toast.classList.remove("show"), 4000);
});

const openModal = (src, alt) => {
  if (!modal || !modalImage) return;
  modalImage.src = src;
  modalImage.alt = alt || "Memory";
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  stopRotation();
};

const closeModal = () => {
  if (!modal || !modalImage) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  startRotation();
};

items.forEach((item) => {
  item.addEventListener("click", () => openModal(item.src, item.alt));
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("show")) {
    closeModal();
  }
});
