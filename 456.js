// Табы для наций
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Функция для переключения табов
    function switchTab(tabId) {
        // Убираем активный класс у всех кнопок и контента
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Добавляем активный класс к текущей кнопке
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Показываем соответствующий контент
        document.getElementById(tabId).classList.add('active');
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Анимация счетчиков статистики
    function animateCounter(elementId, finalValue, duration = 2000) {
        const element = document.getElementById(elementId);
        let startValue = 0;
        const increment = finalValue / (duration / 16); // 60 FPS
        
        function updateCounter() {
            startValue += increment;
            if (startValue < finalValue) {
                element.textContent = Math.floor(startValue).toLocaleString();
                setTimeout(updateCounter, 16);
            } else {
                element.textContent = finalValue.toLocaleString();
            }
        }
        
        updateCounter();
    }
    
    // Запускаем анимацию счетчиков при прокрутке до секции
    const statsSection = document.getElementById('stats');
    let statsAnimated = false;
    
    function checkStatsVisibility() {
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100 && !statsAnimated) {
            animateCounter('players-count', 150000);
            animateCounter('vehicles-count', 2000);
            animateCounter('nations-count', 10);
            animateCounter('battles-count', 50000000);
            statsAnimated = true;
        }
    }
    
    // Проверяем видимость при загрузке и прокрутке
    window.addEventListener('load', checkStatsVisibility);
    window.addEventListener('scroll', checkStatsVisibility);
    
    // Плавная прокрутка для навигации
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Добавляем класс при прокрутке для шапки
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(to right, #0a1929, #0a1929)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'linear-gradient(to right, #1a3a5f, #0a1929)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Анимация появления элементов при прокрутке
    const animatedElements = document.querySelectorAll('.vehicle-card, .news-card, .stat-item');
    
    function checkElementsVisibility() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Устанавливаем начальные стили для анимации
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Проверяем видимость при загрузке и прокрутке
    window.addEventListener('load', checkElementsVisibility);
    window.addEventListener('scroll', checkElementsVisibility);
    
    // Обработчик для кнопки "Играть бесплатно"
    const playButton = document.querySelector('.hero .btn');
    if (playButton) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Добро пожаловать в War Thunder! Перенаправляем на официальный сайт игры...');
            // В реальном сайте здесь будет перенаправление
            // window.location.href = 'https://warthunder.com';
        });
    }
});