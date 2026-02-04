const exampleSpan = document.getElementById('example-name');
  const today = new Date();
  const day = String(today.getDate()).padStart(2,'0');
  const month = String(today.getMonth()+1).padStart(2,'0');
  exampleSpan.textContent = `Primak${day}${month}`;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const container = document.getElementById("floating-letters");

function createLetter() {
  const span = document.createElement("span");
  span.className = "floating-letter";
  span.textContent = letters[Math.floor(Math.random() * letters.length)];
  
  // Рандомная позиция, размер и наклон
  span.style.left = Math.random() * 100 + "vw";
  span.style.fontSize = (12 + Math.random()*24) + "px";
  span.style.transform = `rotate(${Math.random()*360}deg)`;
  span.style.opacity = 0.1 + Math.random() * 0.3;

  // Разная длительность анимации
  span.style.animationDuration = (4 + Math.random()*6) + "s";

  container.appendChild(span);

  // Удаляем букву после окончания анимации
  setTimeout(() => {
    if (container.contains(span)) container.removeChild(span);
  }, parseFloat(span.style.animationDuration) * 1000);
}

// Генерируем буквы каждые 200 мс
setInterval(createLetter, 200);
const toggleBtn = document.getElementById("toggle-letters");
const bgLetters = document.getElementById("floating-letters");

toggleBtn.addEventListener("click", () => {
  if (bgLetters.style.display === "none") {
    bgLetters.style.display = "block";
    toggleBtn.textContent = "ABC"; // текст на кнопке
  } else {
    bgLetters.style.display = "none";
    toggleBtn.textContent = "̶A̶B̶C̶"; // изменяем на галочку
  }
});
