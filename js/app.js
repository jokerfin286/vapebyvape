// Mock Data - In production, this would come from an API
const mockProducts = [
    { id: 1, name: "VapeMist Blue Razz", category: "weak", manufacturer: "VapeMist", taste: "Черника малина", volume: 30, price: 450, stock: 15, image: "/placeholder.svg?height=240&width=280", description: "Легкая жидкость с мягким вкусом черники и малины" },
    { id: 2, name: "PureVape Strawberry", category: "nicotine-free", manufacturer: "PureVape", taste: "Клубника", volume: 50, price: 350, stock: 20, image: "/placeholder.svg?height=240&width=280", description: "Безникотиновая жидкость со свежим вкусом клубники" },
    { id: 3, name: "NicotinePro Strong", category: "strong", manufacturer: "NicotinePro", taste: "Крепкий табак", volume: 30, price: 580, stock: 8, image: "/placeholder.svg?height=240&width=280", description: "Крепкая жидкость с насыщенным табачным вкусом" },
    { id: 4, name: "CloudKing Vanilla", category: "medium", manufacturer: "CloudKing", taste: "Ваниль", volume: 60, price: 520, stock: 12, image: "/placeholder.svg?height=240&width=280", description: "Средняя жидкость с гладким ванильным вкусом" },
    { id: 5, name: "ProVape Pro Cartridge", category: "cartridges", manufacturer: "ProVape", taste: "N/A", volume: 2, price: 250, stock: 30, image: "/placeholder.svg?height=240&width=280", description: "Универсальный картридж для всех типов устройств" },
    { id: 6, name: "FrostBite Menthol", category: "weak", manufacturer: "FrostBite", taste: "Ментол", volume: 30, price: 400, stock: 25, image: "/placeholder.svg?height=240&width=280", description: "Легкая жидкость с освежающим ментольным вкусом" },
    { id: 7, name: "VapeLounge Mango", category: "nicotine-free", manufacturer: "VapeLounge", taste: "Манго", volume: 50, price: 380, stock: 18, image: "/placeholder.svg?height=240&width=280", description: "Безникотиновая жидкость с экзотическим вкусом манго" },
    { id: 8, name: "SkyCloud Strong Mint", category: "strong", manufacturer: "SkyCloud", taste: "Сильный ментол", volume: 30, price: 620, stock: 6, image: "/placeholder.svg?height=240&width=280", description: "Крепкая жидкость с интенсивным ментольным вкусом" },
    { id: 9, name: "EliteVape Chocolate", category: "medium", manufacturer: "EliteVape", taste: "Шоколад", volume: 60, price: 500, stock: 14, image: "/placeholder.svg?height=240&width=280", description: "Средняя жидкость с бархатистым шоколадным вкусом" },
    { id: 10, name: "VapePro Kit Cartridge", category: "cartridges", manufacturer: "VapePro", taste: "N/A", volume: 2.5, price: 280, stock: 28, image: "/placeholder.svg?height=240&width=280", description: "Картридж повышенной емкости для длительного использования" },
    { id: 11, name: "NectarLiquid Peach", category: "weak", manufacturer: "NectarLiquid", taste: "Персик", volume: 30, price: 420, stock: 19, image: "/placeholder.svg?height=240&width=280", description: "Легкая жидкость с сладким персиковым вкусом" },
    { id: 12, name: "PureSky Coconut", category: "nicotine-free", manufacturer: "PureSky", taste: "Кокос", volume: 50, price: 390, stock: 21, image: "/placeholder.svg?height=240&width=280", description: "Безникотиновая жидкость с тропическим кокосовым вкусом" },
    { id: 13, name: "IntenseVape Dark", category: "strong", manufacturer: "IntenseVape", taste: "Темный табак", volume: 30, price: 600, stock: 9, image: "/placeholder.svg?height=240&width=280", description: "Крепкая жидкость с глубоким табачным ароматом" },
    { id: 14, name: "VapeBliss Caramel", category: "medium", manufacturer: "VapeBliss", taste: "Карамель", volume: 60, price: 530, stock: 16, image: "/placeholder.svg?height=240&width=280", description: "Средняя жидкость с насыщенным карамельным вкусом" },
    { id: 15, name: "EpicVape Refill Pack", category: "cartridges", manufacturer: "EpicVape", taste: "N/A", volume: 3, price: 320, stock: 26, image: "/placeholder.svg?height=240&width=280", description: "Набор картриджей для экономичного использования" },
    { id: 16, name: "FreshMint Green", category: "weak", manufacturer: "FreshMint", taste: "Зеленый чай ментол", volume: 30, price: 440, stock: 17, image: "/placeholder.svg?height=240&width=280", description: "Легкая жидкость с освежающим вкусом зеленого чая" },
    { id: 17, name: "SmoothWave Zero", category: "nicotine-free", manufacturer: "SmoothWave", taste: "Смешанные ягоды", volume: 50, price: 370, stock: 23, image: "/placeholder.svg?height=240&width=280", description: "Безникотиновая жидкость с ягодным фруктовым миксом" },
    { id: 18, name: "HardHit Tobacco", category: "strong", manufacturer: "HardHit", taste: "Классический табак", volume: 30, price: 610, stock: 7, image: "/placeholder.svg?height=240&width=280", description: "Крепкая жидкость с аутентичным табачным вкусом" },
    { id: 19, name: "SilkyVape Cream", category: "medium", manufacturer: "SilkyVape", taste: "Сливочный крем", volume: 60, price: 540, stock: 13, image: "/placeholder.svg?height=240&width=280", description: "Средняя жидкость с мягким сливочным вкусом" },
    { id: 20, name: "ProMax Dual Cartridge", category: "cartridges", manufacturer: "ProMax", taste: "N/A", volume: 2.5, price: 290, stock: 29, image: "/placeholder.svg?height=240&width=280", description: "Двойной картридж для надежного использования" },
    { id: 21, name: "TropicVape Orange", category: "weak", manufacturer: "TropicVape", taste: "Апельсин", volume: 30, price: 430, stock: 20, image: "/placeholder.svg?height=240&width=280", description: "Легкая жидкость с ярким апельсиновым вкусом" },
    { id: 22, name: "CrystalClear Apple", category: "nicotine-free", manufacturer: "CrystalClear", taste: "Яблоко", volume: 50, price: 360, stock: 24, image: "/placeholder.svg?height=240&width=280", description: "Безникотиновая жидкость с чистым яблочным вкусом" },
    { id: 23, name: "PowerSmoke Full", category: "strong", manufacturer: "PowerSmoke", taste: "Полный табак", volume: 30, price: 630, stock: 5, image: "/placeholder.svg?height=240&width=280", description: "Крепкая жидкость с максимальным никотином" },
    { id: 24, name: "MelloWave Honey", category: "medium", manufacturer: "MelloWave", taste: "Мед", volume: 60, price: 510, stock: 15, image: "/placeholder.svg?height=240&width=280", description: "Средняя жидкость с сладким медовым ароматом" },
    { id: 25, name: "ClassicVape Standard", category: "cartridges", manufacturer: "ClassicVape", taste: "N/A", volume: 2, price: 240, stock: 32, image: "/placeholder.svg?height=240&width=280", description: "Стандартный картридж для классических устройств" },
    { id: 26, name: "ZestyLemon Burst", category: "weak", manufacturer: "ZestyLemon", taste: "Лимон", volume: 30, price: 410, stock: 22, image: "/placeholder.svg?height=240&width=280", description: "Легкая жидкость с энергичным лимонным вкусом" },
    { id: 27, name: "VelvetVape Grape", category: "nicotine-free", manufacturer: "VelvetVape", taste: "Виноград", volume: 50, price: 375, stock: 19, image: "/placeholder.svg?height=240&width=280", description: "Безникотиновая жидкость с насыщенным виноградным вкусом" },
    { id: 28, name: "RushNic Premium", category: "strong", manufacturer: "RushNic", taste: "Премиум табак", volume: 30, price: 640, stock: 4, image: "/placeholder.svg?height=240&width=280", description: "Крепкая премиум жидкость с элитным табаком" },
    { id: 29, name: "BalanceVape Berry", category: "medium", manufacturer: "BalanceVape", taste: "Лесная ягода", volume: 60, price: 520, stock: 12, image: "/placeholder.svg?height=240&width=280", description: "Средняя жидкость с балансированным ягодным вкусом" },
    { id: 30, name: "UltraVape Super Cartridge", category: "cartridges", manufacturer: "UltraVape", taste: "N/A", volume: 3.5, price: 330, stock: 25, image: "/placeholder.svg?height=240&width=280", description: "Суперкартридж повышенной емкости и надежности" },
];

const categories = [
    { id: "nicotine-free", name: "Без никотина" },
    { id: "weak", name: "Слабые" },
    { id: "medium", name: "Средние" },
    { id: "strong", name: "Сильные" },
    { id: "cartridges", name: "Картриджи" }
];

const mockReviews = [];

// Storage Keys
const STORAGE_KEYS = {
    USER: 'vape_user',
    CART: 'vape_cart',
    FAVORITES: 'vape_favorites',
    THEME: 'vape_theme'
};

// Utils
const Storage = {
    getUser: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || null,
    setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
    removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),

    getCart: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [],
    setCart: (cart) => localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)),

    getFavorites: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [],
    setFavorites: (favorites) => localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites)),
};

const UI = {
    renderNavbar: () => {
        const navbar = document.getElementById('navbar');
        const user = Storage.getUser();
        const cart = Storage.getCart();

        navbar.innerHTML = `
            <div class="navbar">
                <div class="navbar-logo">
                    <span>V</span>
                    <a href="index.html" style="color: inherit; text-decoration: none;">VAPEBYVAPE</a>
                </div>
                <ul class="navbar-menu">
                    <li><a href="index.html">Главная</a></li>
                    <li><a href="catalog.html">Каталог</a></li>
                    <li><a href="contacts.html">Контакты</a></li>
                </ul>
                <div class="navbar-actions">
                    <button class="cart-icon" onclick="showCartModal()" title="Корзина">
                        🛒
                        <span class="cart-count">${cart.length}</span>
                    </button>
                    <button class="cart-icon" onclick="window.location.href='favorites.html'" title="Избранное">
                        ❤️
                        <span class="cart-count">${Storage.getFavorites().length}</span>
                    </button>
                    ${user ? `
                        <button class="cart-icon" onclick="window.location.href='profile.html'" title="Профиль">
                            👤
                        </button>
                    ` : `
                        <a href="login.html" class="btn btn-gradient btn-small">Вход</a>
                    `}
                </div>
            </div>
        `;
    },

    renderFooter: () => {
        const footer = document.getElementById('footer');
        footer.innerHTML = `
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>О магазине</h3>
                        <ul>
                            <li><a href="index.html">Главная</a></li>
                            <li><a href="catalog.html">Каталог</a></li>
                            <li><a href="contacts.html">Контакты</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Поддержка</h3>
                        <ul>
                            <li><a href="faq.html">Часто задаваемые вопросы</a></li>
                            <li><a href="delivery.html">Доставка</a></li>
                            <li><a href="returns.html">Возвраты</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Информация</h3>
                        <ul>
                            <li><a href="terms.html">Условия использования</a></li>
                            <li><a href="privacy.html">Политика конфиденциальности</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Контакты</h3>
                        <ul>
                            <li><a href="tel:+79999999999">+7 (999) 999-99-99</a></li>
                            <li><a href="mailto:info@vapebyvape.store">info@vapebyvape.store</a></li>
                            <li><a href="https://t.me/vapebyvape" target="_blank">Telegram</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 VAPEBYVAPE.STORE. Все права защищены.</p>
                </div>
            </div>
        `;
    },

    showNotification: (message, type = 'success') => {
        const container = document.getElementById('cart-notification');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    renderProductCard: (product) => {
        const isFavorite = Storage.getFavorites().includes(product.id);
        const availability = product.stock > 0 ? 'в наличии' : 'нет в наличии';
        
        return `
            <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${categories.find(c => c.id === product.category)?.name}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-meta">
                        ${product.volume}мл • ${product.manufacturer}
                    </div>
                    <div class="product-footer">
                        <div class="product-price">${product.price}₽</div>
                        <div class="product-actions">
                            <button class="icon-btn favorite ${isFavorite ? 'active' : ''}" 
                                onclick="event.stopPropagation(); toggleFavorite(${product.id})" 
                                title="В избранное">❤️</button>
                            <button class="icon-btn" 
                                onclick="event.stopPropagation(); addToCart(${product.id})" 
                                title="В корзину">🛒</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Functions
function addToCart(productId) {
    const cart = Storage.getCart();
    const product = mockProducts.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    Storage.setCart(cart);
    UI.renderNavbar();
    UI.showNotification(`${product.name} добавлен в корзину`);
}

function toggleFavorite(productId) {
    const favorites = Storage.getFavorites();
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        UI.showNotification('Товар удален из избранного');
    } else {
        favorites.push(productId);
        UI.showNotification('Товар добавлен в избранное');
    }
    
    Storage.setFavorites(favorites);
    UI.renderNavbar();
    
    // Update favorite buttons
    document.querySelectorAll('.icon-btn.favorite').forEach(btn => {
        const cardId = parseInt(btn.closest('.product-card')?.onclick?.toString().match(/id=(\d+)/)?.[1]);
        if (cardId === productId) {
            btn.classList.toggle('active');
        }
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

function renderStars(rating) {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '✨' : '');
}

// Cart Modal Functions
function showCartModal() {
    const cart = Storage.getCart();
    
    if (cart.length === 0) {
        UI.showNotification('Корзина пуста', 'info');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'cart-modal-overlay';
    modal.innerHTML = `
        <div class="cart-modal">
            <div class="cart-modal-header">
                <h2>Корзина</h2>
                <button class="close-btn" onclick="this.closest('.cart-modal-overlay').remove()">&times;</button>
            </div>
            <div class="cart-modal-content">
                ${cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.price}₽ × ${item.quantity}</p>
                        </div>
                        <div class="cart-item-total">${item.price * item.quantity}₽</div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-modal-footer">
                <div class="cart-total">
                    <strong>Итого:</strong>
                    <span>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}₽</span>
                </div>
                <button class="btn btn-gradient btn-full" onclick="checkout()">Оформить заказ</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function removeFromCart(productId) {
    const cart = Storage.getCart();
    const index = cart.findIndex(item => item.id === productId);
    
    if (index > -1) {
        cart.splice(index, 1);
        Storage.setCart(cart);
        UI.renderNavbar();
        
        // Refresh modal
        document.querySelector('.cart-modal-overlay')?.remove();
        if (cart.length > 0) {
            showCartModal();
        } else {
            UI.showNotification('Товар удален из корзины', 'success');
        }
    }
}

function checkout() {
    const user = Storage.getUser();
    
    if (!user) {
        UI.showNotification('Сначала войдите в аккаунт', 'error');
        document.querySelector('.cart-modal-overlay').remove();
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }

    const cart = Storage.getCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Show address input modal
    const modal = document.querySelector('.cart-modal-overlay');
    const cartModal = modal.querySelector('.cart-modal');
    
    const addressModal = document.createElement('div');
    addressModal.className = 'address-modal-overlay';
    addressModal.innerHTML = `
        <div class="address-modal">
            <h2>Укажите адрес доставки</h2>
            <form id="addressForm" style="display: flex; flex-direction: column; gap: 1rem;">
                <div class="form-group">
                    <label>Адрес доставки</label>
                    <textarea id="address" class="form-input" placeholder="Город, улица, дом, квартира" required></textarea>
                </div>
                <div class="form-group">
                    <label>Номер телефона</label>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <span style="color: var(--color-text-secondary); font-weight: 500;">+375</span>
                        <input type="tel" id="phone" class="form-input" placeholder="291234567" style="flex: 1;" required>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button type="submit" class="btn btn-gradient" style="flex: 1;">Создать заказ</button>
                    <button type="button" class="btn" onclick="this.closest('.address-modal-overlay').remove()" style="flex: 1;">Отмена</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(addressModal);
    
    document.getElementById('addressForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        if (!address || !phone) {
            UI.showNotification('Заполните все поля', 'error');
            return;
        }
        
        if (!/^\d{9,10}$/.test(phone)) {
            UI.showNotification('Введите корректный номер телефона (9-10 цифр)', 'error');
            return;
        }
        
        // Create order
        const orders = JSON.parse(localStorage.getItem('admin_orders')) || [];
        const orderId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
        
        const fullPhone = `+375${phone}`;
        const fullAddress = `Беларусь, ${address}`;
        
        const newOrder = {
            id: orderId,
            userId: user.id,
            userName: user.firstName || 'Клиент',
            userPhone: fullPhone,
            date: new Date().toISOString().split('T')[0],
            items: cart.length,
            total: total,
            status: 'new',
            address: fullAddress,
            details: cart
        };
        
        orders.push(newOrder);
        localStorage.setItem('admin_orders', JSON.stringify(orders));
        
        // Update user orders
        const users = JSON.parse(localStorage.getItem('vape_users')) || [];
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex > -1) {
            if (!users[userIndex].orders) {
                users[userIndex].orders = [];
            }
            users[userIndex].orders.push(orderId);
            localStorage.setItem('vape_users', JSON.stringify(users));
        }
        
        // Send to Telegram
        sendOrderToTelegram(newOrder);
        
        // Clear cart
        Storage.setCart([]);
        UI.renderNavbar();
        
        document.querySelector('.cart-modal-overlay').remove();
        addressModal.remove();
        UI.showNotification(`Заказ ${orderId} создан успешно! Спасибо за покупку.`);
        
        setTimeout(() => window.location.href = 'profile.html', 2000);
    });
    
    addressModal.addEventListener('click', (e) => {
        if (e.target === addressModal) addressModal.remove();
    });
}

function sendOrderToTelegram(order) {
    const telegramToken = localStorage.getItem('telegram_token');
    const telegramChatId = localStorage.getItem('telegram_chat_id');
    
    if (!telegramToken || !telegramChatId) {
        console.log('[v0] Telegram not configured');
        return;
    }
    
    const itemsList = order.details.map(item => 
        `• ${item.name} - ${item.price}₽ x${item.quantity} = ${item.price * item.quantity}₽`
    ).join('\n');
    
    const message = `
📦 НОВЫЙ ЗАКАЗ #${order.id}

Клиент: ${order.userName}
Телефон: ${order.userPhone}
Адрес: ${order.address}

Товары:
${itemsList}

Сумма: ${order.total}₽
Статус: ${order.status}
Дата: ${order.date}
    `;
    
    fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: message.trim()
        })
    }).catch(err => {
        console.log('[v0] Telegram send failed:', err.message);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    UI.renderNavbar();
    UI.renderFooter();
});
