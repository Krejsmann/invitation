window.addEventListener('load', function () {
    const textElement = document.getElementById('invitation-text');
    const buttonElement = document.getElementById('view-button');
    const overlayElement = document.querySelector('.envelope-background');
    const mainElement = document.querySelector('.main-content');
    const titleElement = document.querySelector('.title')
    const descriptionElement = document.querySelector('.description')

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


    function  showDescription(){
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
    const targetDate = new Date('2025-12-08T18:00:00');
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