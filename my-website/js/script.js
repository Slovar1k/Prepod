// Основной JavaScript код для сайта War Thunder

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initEventListeners();
    initCounters();
    initModal();
    initTheme();
});

// Анимации при скролле
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Анимируем карточки техники
    document.querySelectorAll('.vehicle-card, .nation-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Счетчики статистики
function initCounters() {
    const playersCounter = document.getElementById('playersOnline');
    const vehiclesCounter = document.getElementById('vehiclesCount');
    
    animateCounter(playersCounter, 85642, 2000);
    animateCounter(vehiclesCounter, 2000, 2500);
}

function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Обработчики событий
function initEventListeners() {
    // Кнопка "Играть бесплатно"
    document.getElementById('playButton').addEventListener('click', function() {
        showNotification('Клиент War Thunder скачивается...', 'success');
        setTimeout(() => {
            showNotification('Установка завершена!', 'success');
        }, 2000);
    });

    // Кнопка "Скачать клиент"
    document.getElementById('downloadBtn').addEventListener('click', function() {
        showNotification('Начало загрузки клиента...', 'info');
    });

    // Кнопки подробнее о технике
    document.querySelectorAll('[data-vehicle]').forEach(button => {
        button.addEventListener('click', function() {
            const vehicle = this.getAttribute('data-vehicle');
            showVehicleDetails(vehicle);
        });
    });

    // Карточки наций
    document.querySelectorAll('.nation-card').forEach(card => {
        card.addEventListener('click', function() {
            const nation = this.getAttribute('data-nation');
            showNationInfo(nation);
        });
    });

    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Модальное окно
function initModal() {
    const modal = document.getElementById('vehicleModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showVehicleDetails(vehicle) {
    const modal = document.getElementById('vehicleModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    const vehicles = {
        t34: {
            title: 'Т-34-85',
            content: `
                <div class="vehicle-details">
                    <div class="detail-item">
                        <strong>Тип:</strong> Средний танк
                    </div>
                    <div class="detail-item">
                        <strong>Боевой рейтинг:</strong> 5.7
                    </div>
                    <div class="detail-item">
                        <strong>Экипаж:</strong> 5 человек
                    </div>
                    <div class="detail-item">
                        <strong>Вооружение:</strong> 85-мм пушка ЗИС-С-53
                    </div>
                    <div class="detail-item">
                        <strong>Броня:</strong> 45-90 мм
                    </div>
                </div>
            `
        },
        tiger: {
            title: 'Tiger H1',
            content: `
                <div class="vehicle-details">
                    <div class="detail-item">
                        <strong>Тип:</strong> Тяжелый танк
                    </div>
                    <div class="detail-item">
                        <strong>Боевой рейтинг:</strong> 5.3
                    </div>
                    <div class="detail-item">
                        <strong>Экипаж:</strong> 5 человек
                    </div>
                    <div class="detail-item">
                        <strong>Вооружение:</strong> 88-мм пушка KwK 36
                    </div>
                    <div class="detail-item">
                        <strong>Броня:</strong> 25-100 мм
                    </div>
                </div>
            `
        },
        sherman: {
            title: 'M4 Sherman',
            content: `
                <div class="vehicle-details">
                    <div class="detail-item">
                        <strong>Тип:</strong> Средний танк
                    </div>
                    <div class="detail-item">
                        <strong>Боевой рейтинг:</strong> 3.7
                    </div>
                    <div class="detail-item">
                        <strong>Экипаж:</strong> 5 человек
                    </div>
                    <div class="detail-item">
                        <strong>Вооружение:</strong> 75-мм пушка M3
                    </div>
                    <div class="detail-item">
                        <strong>Броня:</strong> 38-76 мм
                    </div>
                </div>
            `
        }
    };
    
    if (vehicles[vehicle]) {
        modalTitle.textContent = vehicles[vehicle].title;
        modalContent.innerHTML = vehicles[vehicle].content;
        modal.style.display = 'block';
    }
}

function showNationInfo(nation) {
    const nations = {
        ussr: 'СССР - Мощная броня и простота конструкции. Отличные средние танки и истребители.',
        germany: 'Германия - Точное вооружение и передовые технологии. Сильные тяжелые танки.',
        usa: 'США - Универсальность и стабилизаторы. Хорошие всеround машины.',
        britain: 'Великобритания - Твердосплавные снаряды. Отличные пушки но слабая броня.'
    };
    
    if (nations[nation]) {
        showNotification(nations[nation], 'info');
    }
}

// Переключение темы
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Загрузка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// Система уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Кнопка закрытия
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Добавляем стили для анимаций уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
    }
    
    .vehicle-details {
        line-height: 2;
    }
    
    .detail-item {
        margin-bottom: 0.5rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
`;
document.head.appendChild(style);

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    // Можно добавить адаптивную логику при необходимости
});

// Предотвращение контекстного меню на изображениях
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

console.log('War Thunder website loaded successfully!');

// Добавьте в объект vehicles данные о современных самолетах
const vehicles = {
    // ... существующие данные о танках ...
    
    // Современные самолеты
    f16: {
        title: 'F-16C Fighting Falcon',
        content: `
            <div class="vehicle-details">
                <div class="detail-item">
                    <strong>Тип:</strong> Многоцелевой истребитель 4-го поколения
                </div>
                <div class="detail-item">
                    <strong>Боевой рейтинг:</strong> 12.3
                </div>
                <div class="detail-item">
                    <strong>Двигатель:</strong> F110-GE-100 турбовентиляторный
                </div>
                <div class="detail-item">
                    <strong>Вооружение:</strong> AIM-9M, AIM-120 AMRAAM, пушка M61
                </div>
                <div class="detail-item">
                    <strong>Особенности:</strong> ХОВ, современная РЛС, УРВВ
                </div>
            </div>
        `
    },
    su27: {
        title: 'Su-27 Flanker',
        content: `
            <div class="vehicle-details">
                <div class="detail-item">
                    <strong>Тип:</strong> Истребитель завоевания превосходства в воздухе
                </div>
                <div class="detail-item">
                    <strong>Боевой рейтинг:</strong> 12.3
                </div>
                <div class="detail-item">
                    <strong>Двигатель:</strong> 2× АЛ-31Ф турбореактивные
                </div>
                <div class="detail-item">
                    <strong>Вооружение:</strong> Р-73, Р-27, пушка ГШ-30-1
                </div>
                <div class="detail-item">
                    <strong>Особенности:</strong> Высокая маневренность, ПГО
                </div>
            </div>
        `
    },
    // ... добавьте остальные современные самолеты ...
};

// Обновите инструкции в README