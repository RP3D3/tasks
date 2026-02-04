const dateInput = document.getElementById("taskDate");
const goBtn = document.getElementById("goTask");
const topicInfo = document.getElementById("topicInfo");
const msg = document.getElementById("message");

// Устанавливаем сегодня по умолчанию
const today = new Date();
dateInput.value = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

// Функция обновления темы через fetch
function updateTopic(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2,'0');
  const month = String(date.getMonth()+1).padStart(2,'0');
  const filePath = `Tasks/task${day}${month}.html`;

  fetch(filePath)
    .then(res => {
      if (res.ok) {
        return res.text();
      } else {
        topicInfo.textContent = "Информация по этой дате отсутствует.";
        return null;
      }
    })
    .then(html => {
      if (!html) return;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const h1 = doc.querySelector("h1");
      topicInfo.textContent = h1 ? h1.textContent : "Тема не найдена";
    })
    .catch(err => {
      topicInfo.textContent = "Ошибка при загрузке задания.";
      console.log(err);
    });
}

// Показываем тему при загрузке страницы
updateTopic(dateInput.value);

// Обновляем тему при изменении даты
dateInput.addEventListener("change", () => {
  msg.textContent = "";
  updateTopic(dateInput.value);
});

// Кнопка "Перейти к заданию"
goBtn.addEventListener("click", () => {
  const date = new Date(dateInput.value);
  const day = String(date.getDate()).padStart(2,"0");
  const month = String(date.getMonth()+1).padStart(2,"0");
  const filePath = `Tasks/task${day}${month}.html`;

  fetch(filePath)
    .then(res => {
      if (res.ok) {
        window.location.href = filePath;
      } else {
        msg.textContent = `Задание за ${day}.${month} ещё не готово.`;
      }
    })
    .catch(err => {
      msg.textContent = "Ошибка при попытке открыть задание.";
      console.log(err);
    });
});
