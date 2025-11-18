// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    startStatsAnimation();
});

function initializePage() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupEventListeners() {
    // Кнопка "Играть сейчас"
    const playButton = document.getElementById('playNow');
    if (playButton) {
        playButton.addEventListener('click', function() {
            alert('Перенаправление на официальный сайт War Thunder...');
            // window.location.href = 'https://warthunder.com';
        });
    }

    // Фильтрация техники
    const filterButtons = document.querySelectorAll('.vehicle-type-btn');
    const vehicleCards = document.querySelectorAll('.vehicle-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-type');
            
            vehicleCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-type') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Анимация при наведении на карточки наций
    const nationCards = document.querySelectorAll('.nation-card');
    nationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const nation = this.getAttribute('data-nation');
            this.style.borderColor = getNationColor(nation);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });
}

function getNationColor(nation) {
    const colors = {
        'usa': '#00308F',
        'germany': '#000000',
        'ussr': '#CC0000',
        'britain': '#00247D'
    };
    return colors[nation] || '#ff8c00';
}

function startStatsAnimation() {
    // Анимированные счетчики статистики
    const onlinePlayers = document.getElementById('onlinePlayers');
    const totalBattles = document.getElementById('totalBattles');
    const activePlayers = document.getElementById('activePlayers');

    if (onlinePlayers && totalBattles && activePlayers) {
        animateCounter(onlinePlayers, 0, 125847, 2000);
        animateCounter(totalBattles, 0, 45896217, 2500);
        animateCounter(activePlayers, 0, 89234, 1800);
    }
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.classList.add('count-up');
        }
    };
    window.requestAnimationFrame(step);
}

// Параллакс эффект для герой секции
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Можно добавить адаптивные изменения при необходимости
});

// Дополнительные функции для будущего расширения
class WarThunderSite {
    constructor() {
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        console.log('War Thunder Site initialized');
        this.initialized = true;
        
        // Здесь можно добавить дополнительные функции
        this.setupVehicleDetails();
    }

    setupVehicleDetails() {
        // Функция для показа деталей техники
        const vehicleCards = document.querySelectorAll('.vehicle-card');
        vehicleCards.forEach(card => {
            card.addEventListener('click', function() {
                const vehicleName = this.querySelector('h3').textContent;
                console.log(`Selected vehicle: ${vehicleName}`);
                // Можно добавить модальное окно с детальной информацией
            });
        });
    }
}

// Создаем экземпляр класса
const wtSite = new WarThunderSite();
wtSite.init();