window.addEventListener('load', function() {
    const textElement = document.getElementById('invitation-text');
    const buttonElement = document.getElementById('view-button');
    const overlayElement = document.querySelector('.envelope-background');
    const mainElement = document.querySelector('.main-content');
    // Функция печати текста
    function startTyping() {
        const text = 'Приглашение';
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
    
    // Обработчик клика по кнопке
    if (buttonElement) {
        buttonElement.addEventListener('click', function() {
            if (overlayElement) {
                overlayElement.classList.add('hidden');
                mainElement.classList.add('active');
            }
        });
    }
    
    // Запускаем анимацию
    setTimeout(startTyping, 500);
});