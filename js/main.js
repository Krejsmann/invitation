window.addEventListener('load', function () {
    const textElement = document.getElementById('invitation-text');
    const buttonElement = document.getElementById('view-button');
    const overlayElement = document.querySelector('.envelope-background');
    const mainElement = document.querySelector('.main-content');
    const titleElement = document.querySelector('.title')
    const descriptionElement = document.querySelector('.description')


    const audio = document.getElementById('myAudio');
    const playButton = document.getElementById('playButton');
    const playIcon = document.getElementById('playIcon');

    playButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (audio.paused) {
            audio.play();
            playIcon.src = 'images/music/pause.png';
        } else {
            audio.pause();
            playIcon.src = 'images/music/play.png';
        }
    });

    // Функция печати текста
    function startTyping(text) {
        // const text = 'Приглашение';
        let i = 0;

        function type() {
            if (i < text.length) {
                textElement.textContent += text[i];
                i++;
                setTimeout(type, 150);
            } else {
                buttonElement.style.display = 'block';
                setTimeout(() => {
                    buttonElement.style.opacity = '1';
                    buttonElement.style.transform = 'translateY(0)';
                }, 100);
            }
        }

        type();
    }


    function showDescription() {
        setTimeout(() => {
            descriptionElement.classList.add('active')
        }, 2800)
    }

    // Обработчик клика по кнопке
    if (buttonElement) {
        buttonElement.addEventListener('click', function () {
            if (overlayElement) {
                overlayElement.classList.add('hidden');
                mainElement.classList.add('active');
                textGetter('Приглашаем вас на наш совместный День Рождения!');
                setTimeout(() => {
                    titleElement.classList.add('active');
                }, 2500);
                showDescription()
                setTimeout(() => {
                    overlayElement.style.display = "none"
                }, 1000)
            }
        });
    }

    // Запускаем анимацию
    setTimeout(() => startTyping('Приглашение'), 500);
});

const helloTextElement = document.querySelector('.section__hello-text');

function textGetter(text) {
    let i = 0; // Добавляем объявление переменной i

    function type() { // Создаем внутреннюю функцию для рекурсии
        if (i < text.length) {
            helloTextElement.textContent += text[i];
            i++;
            setTimeout(type, 50); // Вызываем внутреннюю функцию
        }
    }

    type(); // Запускаем анимацию
}

// Запускаем функцию


// Обратный отсчет до 9 декабря
function updateCountdown() {
    const targetDate = new Date('2025-12-12T18:00:00');
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.querySelector('.countdown-title').textContent = 'Праздник наступил! 🎉';
        document.querySelector('.countdown-timer').style.display = 'none';
    }
}

// Запускаем отсчет сразу
updateCountdown();
setInterval(updateCountdown, 1000);


// Скрипт для отладки радиокнопок
document.addEventListener('DOMContentLoaded', function() {
    const radioInputs = document.querySelectorAll('input[name="attendance"]');

    radioInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            console.log('Выбрано:', this.value);
            // Снимаем выделение со всех карточек
            document.querySelectorAll('.option-label').forEach(label => {
                label.style.borderColor = '';
            });

            // Выделяем выбранную карточку
            const selectedLabel = this.closest('.option-label');
            if (selectedLabel) {
                if (this.value === 'Да') {
                    selectedLabel.style.borderColor = '#DC143C';
                } else if (this.value === 'Нет') {
                    selectedLabel.style.borderColor = '#666';
                } else {
                    selectedLabel.style.borderColor = '#ffd700';
                }
            }
        });
    });

    // Проверяем уже выбранные значения при загрузке
    const checkedInput = document.querySelector('input[name="attendance"]:checked');
    if (checkedInput) {
        checkedInput.dispatchEvent(new Event('change'));
    }
});




// Настройка для отправки в Telegram
const TELEGRAM_BOT_TOKEN = '8490383477:AAH6qfyBB1C_03Etw8cUipPXMisJgRBLZlk';
const TELEGRAM_CHAT_ID = '-1003417175580';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    const formMessage = document.getElementById('formMessage');
    const btnText = submitBtn.querySelector('span');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Валидация формы
        const name = document.getElementById('guestName').value.trim();
        const attendance = document.querySelector('input[name="attendance"]:checked');
        const message = document.getElementById('guestMessage').value.trim();

        if (!name) {
            showMessage('Пожалуйста, введите ваше имя', 'error');
            return;
        }

        if (!attendance) {
            showMessage('Пожалуйста, выберите вариант ответа', 'error');
            return;
        }

        // Показать loader
        submitBtn.disabled = true;
        btnText.style.opacity = '0.5';
        loader.classList.add('active');

        try {
            // Формируем сообщение для Telegram
            const text = `
🎉 *Новый ответ на приглашение!*

👤 *Имя:* ${name}
✅ *Присутствие:* ${attendance.value}
${message ? `💬 *Комментарий:* ${message}` : '💬 *Комментарий:* не указан'}
📅 *Дата ответа:* ${new Date().toLocaleDateString('ru-RU')}
      `;

            // Отправка в Telegram
            await sendToTelegram(text);

            // Показываем успешное сообщение
            showMessage('Спасибо! Ваш ответ успешно отправлен.', 'success');
            form.reset();

        } catch (error) {
            console.error('Ошибка отправки:', error);
            showMessage('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.', 'error');
        } finally {
            // Скрыть loader
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            loader.classList.remove('active');
        }
    });

    async function sendToTelegram(text) {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,
                parse_mode: 'Markdown',
                disable_notification: false
            })
        });

        if (!response.ok) {
            throw new Error('Ошибка отправки в Telegram');
        }

        return await response.json();
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;

        // Автоматически скрыть сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});