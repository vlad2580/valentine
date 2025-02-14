document.addEventListener("DOMContentLoaded", function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const warningModal = document.getElementById('warningModal');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const finalMessageModal = document.getElementById('finalMessageModal');

    const quizModals = [
        document.getElementById('quizModal1'),
        document.getElementById('quizModal2'),
        document.getElementById('quizModal3'),
        document.getElementById('quizModal4'),
        document.getElementById('quizModal5')
    ];

    const answerButtons = [
        document.querySelectorAll('.answerBtn'),
        document.querySelectorAll('.answerBtn2'),
        document.querySelectorAll('.answerBtn3'),
        document.querySelectorAll('.answerBtn4'),
        document.querySelectorAll('.answerBtn5')
    ];

    const feedbackTexts = [
        document.getElementById('feedbackText1'),
        document.getElementById('feedbackText2'),
        document.getElementById('feedbackText3'),
        document.getElementById('feedbackText4'),
        document.getElementById('feedbackText5')
    ];

    const nextQuestionButtons = [
        document.getElementById('nextQuestionBtn1'),
        document.getElementById('nextQuestionBtn2'),
        document.getElementById('nextQuestionBtn3'),
        document.getElementById('nextQuestionBtn4'),
        document.getElementById('finishQuizBtn')
    ];

    const heartsContainers = [
        document.getElementById('hearts1'),
        document.getElementById('hearts2'),
        document.getElementById('hearts3'),
        document.getElementById('hearts4'),
        document.getElementById('hearts5')
    ];

    const images = {
        2: document.getElementById('hatImage'), // Фото в 3-м вопросе
        3: document.getElementById('nativityImage'), // Фото в 4-м вопросе
        4: document.getElementById('travelImage') // Фото в 5-м вопросе
    };

    let heartsCollected = 0;

    // Правильные ответы и уникальные подписи
    const correctAnswers = [
        "Бурито локо",
        "Стафф",
        "Синий",
        "Вертеп",
        "Грузия"
    ];

    const successMessages = [
        "Да! А помнишь, как мы тогда долго сидели и не хотели расходиться? ❤️",
        "Точно! Но хорошо, что мы дождались по-настоящему особенного какоеда 🐶",
        "Спасибо... Ты сделала меня самым стильным 🙈",
        "А потом ты бросила ботинок 👞😘!",
        "А потои наше любимое вино и персиковый сок 🙂‍↕️🤢🍷"
    ];

    // Обработчик кнопки "Нет" (открываем ссылку)
    noBtn.addEventListener('click', function() {
        window.open('https://www.gosuslugi.ru/life/details/registration_of_divorce', '_blank'); // Укажи свою ссылку
    });

    // Обработчик кнопки "Да" (показываем предупреждение)
    yesBtn.addEventListener('click', function() {
        warningModal.style.display = "block";
    });

    // Обработчик кнопки "Ладно.." (скрываем предупреждение и начинаем тест)
    startQuizBtn.addEventListener('click', function() {
        warningModal.style.display = "none";
        quizModals[0].style.display = "block";
        updateHearts();
    });

    // Функция обновления сердечек
    function updateHearts() {
        const hearts = "❤️".repeat(heartsCollected);
        heartsContainers.forEach(container => {
            container.innerHTML = hearts;
        });
    }

    // Функция обработки ответов на вопросы
    function setupQuestionHandlers(questionIndex) {
        let answeredCorrectly = false; // Флаг, чтобы пользователь не мог повторно нажать

        answerButtons[questionIndex].forEach(button => {
            button.addEventListener('click', function() {
                if (answeredCorrectly) return; // Если уже ответили правильно — игнорируем

                const selectedAnswer = this.getAttribute("data-answer");

                if (selectedAnswer === correctAnswers[questionIndex]) {
                    feedbackTexts[questionIndex].textContent = successMessages[questionIndex];
                    feedbackTexts[questionIndex].style.color = "green";
                    heartsCollected++;
                    updateHearts();
                    nextQuestionButtons[questionIndex].style.display = "block";
                    answeredCorrectly = true; // Флаг — правильный ответ дан
                    
                    // Делаем все кнопки неактивными
                    answerButtons[questionIndex].forEach(btn => btn.disabled = true);

                    // Дополнительные действия для вопросов с фото
                    if (images[questionIndex]) {
                        images[questionIndex].style.display = "block";
                    }
                } else {
                    feedbackTexts[questionIndex].textContent = `Попробуй еще, "${selectedAnswer}" это не то 😊`;
                    feedbackTexts[questionIndex].style.color = "red";
                }
            });
        });

        // Обработчик кнопки "Следующий вопрос" или финального поздравления
        nextQuestionButtons[questionIndex].addEventListener('click', function() {
            quizModals[questionIndex].style.display = "none";

            if (questionIndex + 1 < quizModals.length) {
                quizModals[questionIndex + 1].style.display = "block";
            } else if (heartsCollected >= 5) {
                finalMessageModal.style.display = "block";

                setTimeout(() => {
                    window.open("https://meet.google.com/moh-spaw-sdw", "_blank"); // Укажи свою ссылку
                }, 3000); // Через 3 секунды
            }
        });
    }

    // Настроить обработку всех вопросов
    for (let i = 0; i < correctAnswers.length; i++) {
        setupQuestionHandlers(i);
    }

    // Закрытие модальных окон при клике вне их области
    window.onclick = function(event) {
        if (event.target === warningModal) {
            warningModal.style.display = "none";
        }
        quizModals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
        if (event.target === finalMessageModal) {
            finalMessageModal.style.display = "none";
        }
    };
});