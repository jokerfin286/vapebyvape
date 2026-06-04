// Admin Panel Logic
class AdminManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.adminUser = { name: 'Администратор' };
        this.products = JSON.parse(localStorage.getItem('admin_products')) || [...mockProducts];
        this.orders = JSON.parse(localStorage.getItem('admin_orders')) || this.generateMockOrders();
        this.users = JSON.parse(localStorage.getItem('vape_users')) || [];

        this.initializeAdmin();
        this.attachEventListeners();
    }

    generateMockOrders() {
        return [
            {
                id: 'ORD-001',
                customerId: 1,
                customerName: 'Иван Петров',
                customerPhone: '+79991234567',
                items: [{ productId: 1, quantity: 2 }],
                total: 900,
                status: 'completed',
                date: '2024-12-15'
            },
            {
                id: 'ORD-002',
                customerId: 2,
                customerName: 'Мария Сидорова',
                customerPhone: '+79992345678',
                items: [{ productId: 2, quantity: 1 }, { productId: 5, quantity: 3 }],
                total: 1200,
                status: 'shipped',
                date: '2024-12-14'
            }
        ];
    }

    initializeAdmin() {
        this.renderDashboard();
        this.renderProductsTable();
        this.renderOrdersTable();
        this.renderUsersTable();
        this.renderReviewsTable();
    }

    attachEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.switchPage(page);
            });
        });

        // Products
        document.getElementById('addProductBtn').addEventListener('click', () => this.openProductModal());

        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', (e) => this.handleProductSubmit(e));
        }

        // Modals
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });

        // Settings
        const settingsForm = document.getElementById('settingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => this.handleSettingsSubmit(e));
        }

        // Logout
        document.getElementById('adminLogout').addEventListener('click', () => {
            if (confirm('Выйти из админ панели?')) {
                window.location.href = 'index.html';
            }
        });
    }

    switchPage(page) {
        this.currentPage = page;

        // Update nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // Update page content
        document.querySelectorAll('.page-content').forEach(content => {
            content.classList.remove('active');
            if (content.dataset.page === page) {
                content.classList.add('active');
            }
        });

        // Update title
        const titles = {
            dashboard: 'Главная',
            products: 'Управление товарами',
            orders: 'Управление заказами',
            users: 'Управление пользователями',
            reviews: 'Управление отзывами',
            settings: 'Настройки'
        };
        document.getElementById('pageTitle').textContent = titles[page] || page;
    }

    // Dashboard
    renderDashboard() {
        document.getElementById('totalProducts').textContent = this.products.length;
        document.getElementById('totalUsers').textContent = this.users.length;
        document.getElementById('totalOrders').textContent = this.orders.length;
        
        const totalRevenue = this.orders.reduce((sum, order) => sum + order.total, 0);
        document.getElementById('totalRevenue').textContent = `₽ ${totalRevenue.toLocaleString()}`;

        const recentOrders = this.orders.slice(0, 5);
        const recentOrdersHtml = recentOrders.map(order => `
            <div class="order-item-admin">
                <div>${order.id}</div>
                <div>${order.customerName}</div>
                <div>${order.total}₽</div>
                <span class="status-badge status-${order.status}">${this.getStatusText(order.status)}</span>
            </div>
        `).join('');

        document.getElementById('recentOrders').innerHTML = recentOrdersHtml;
    }

    // Products Management
    renderProductsTable() {
        const tbody = document.getElementById('productsTable');
        if (!tbody) return;

        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}₽</td>
                <td>${categories.find(c => c.id === product.category)?.name}</td>
                <td>${product.stock > 0 ? `✓ ${product.stock}` : '✗ Нет'}</td>
                <td class="table-actions">
                    <button class="btn btn-secondary btn-small" onclick="admin.editProduct(${product.id})">✎</button>
                    <button class="btn btn-danger btn-small" onclick="admin.deleteProduct(${product.id})">✕</button>
                </td>
            </tr>
        `).join('');
    }

    openProductModal(productId = null) {
        const modal = document.getElementById('productModal');
        const form = document.getElementById('productForm');

        if (productId) {
            const product = this.products.find(p => p.id === productId);
            document.getElementById('productModalTitle').textContent = 'Редактировать товар';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productManufacturer').value = product.manufacturer;
            document.getElementById('productTaste').value = product.taste;
            document.getElementById('productVolume').value = product.volume;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productImage').value = product.image;
        } else {
            document.getElementById('productModalTitle').textContent = 'Добавить товар';
            form.reset();
            document.getElementById('productId').value = '';
        }

        modal.style.display = 'flex';
    }

    handleProductSubmit(e) {
        e.preventDefault();

        const id = document.getElementById('productId').value;
        const productData = {
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseInt(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            manufacturer: document.getElementById('productManufacturer').value,
            taste: document.getElementById('productTaste').value,
            volume: parseInt(document.getElementById('productVolume').value),
            stock: parseInt(document.getElementById('productStock').value),
            image: document.getElementById('productImage').value,
            rating: 0,
            reviews: 0
        };

        if (id) {
            const product = this.products.find(p => p.id == id);
            Object.assign(product, productData);
        } else {
            productData.id = Math.max(...this.products.map(p => p.id), 0) + 1;
            this.products.push(productData);
        }

        localStorage.setItem('admin_products', JSON.stringify(this.products));
        document.getElementById('productModal').style.display = 'none';
        this.renderProductsTable();
        this.renderDashboard();
        UI.showNotification('Товар сохранен');
    }

    editProduct(productId) {
        this.openProductModal(productId);
    }

    deleteProduct(productId) {
        if (confirm('Вы уверены, что хотите удалить этот товар?')) {
            this.products = this.products.filter(p => p.id !== productId);
            localStorage.setItem('admin_products', JSON.stringify(this.products));
            this.renderProductsTable();
            this.renderDashboard();
            UI.showNotification('Товар удален');
        }
    }

    // Orders Management
    renderOrdersTable() {
        const tbody = document.getElementById('ordersTable');
        if (!tbody) return;

        tbody.innerHTML = this.orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${order.total}₽</td>
                <td><span class="status-badge status-${order.status}">${this.getStatusText(order.status)}</span></td>
                <td>${order.date}</td>
                <td class="table-actions">
                    <button class="btn btn-secondary btn-small" onclick="admin.openOrderModal('${order.id}')">✎</button>
                </td>
            </tr>
        `).join('');
    }

    openOrderModal(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const itemsHtml = order.items.map(item => {
            const product = this.products.find(p => p.id === item.productId);
            return `
                <div class="order-detail-item">
                    <span>${product?.name}</span>
                    <span>x${item.quantity}</span>
                </div>
            `;
        }).join('');

        document.getElementById('orderDetails').innerHTML = `
            <div class="order-detail-item">
                <span class="order-detail-label">Номер заказа</span>
                <span class="order-detail-value">${order.id}</span>
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Клиент</span>
                <span class="order-detail-value">${order.customerName}</span>
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Телефон</span>
                <span class="order-detail-value">${order.customerPhone}</span>
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Дата</span>
                <span class="order-detail-value">${order.date}</span>
            </div>
            <div style="margin: 1rem 0; padding: 1rem 0; border-top: 1px solid rgba(77, 124, 255, 0.1);">
                <div class="order-detail-label" style="margin-bottom: 0.5rem;">Товары</div>
                ${itemsHtml}
            </div>
            <div class="order-detail-item">
                <span class="order-detail-label">Сумма</span>
                <span class="order-detail-value">${order.total}₽</span>
            </div>
        `;

        document.getElementById('orderStatus').value = order.status;
        document.getElementById('orderModal').style.display = 'flex';
        
        document.getElementById('updateOrderBtn').onclick = () => {
            order.status = document.getElementById('orderStatus').value;
            localStorage.setItem('admin_orders', JSON.stringify(this.orders));
            document.getElementById('orderModal').style.display = 'none';
            this.renderOrdersTable();
            this.renderDashboard();
            UI.showNotification('Статус заказа обновлен');
        };
    }

    // Users Management
    renderUsersTable() {
        const tbody = document.getElementById('usersTable');
        if (!tbody) return;

        tbody.innerHTML = this.users.map(user => {
            const userOrders = this.orders.filter(o => o.customerId === user.id).length;
            return `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.email}</td>
                    <td>${formatDate(user.registerDate)}</td>
                    <td>${userOrders}</td>
                    <td class="table-actions">
                        <button class="btn btn-danger btn-small" onclick="admin.deleteUser(${user.id})">✕</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    deleteUser(userId) {
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            this.users = this.users.filter(u => u.id !== userId);
            localStorage.setItem('vape_users', JSON.stringify(this.users));
            this.renderUsersTable();
            this.renderDashboard();
            UI.showNotification('Пользователь удален');
        }
    }

    // Reviews Management
    renderReviewsTable() {
        const tbody = document.getElementById('reviewsTable');
        if (!tbody) return;

        tbody.innerHTML = mockReviews.map(review => {
            const product = this.products.find(p => p.id === review.productId);
            return `
                <tr>
                    <td>${review.id}</td>
                    <td>${product?.name}</td>
                    <td>${review.author}</td>
                    <td>${review.rating}⭐</td>
                    <td><span class="status-badge status-confirmed">Опубликован</span></td>
                    <td class="table-actions">
                        <button class="btn btn-danger btn-small" onclick="admin.deleteReview(${review.id})">✕</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    deleteReview(reviewId) {
        if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            UI.showNotification('Отзыв удален');
        }
    }

    // Settings
    handleSettingsSubmit(e) {
        e.preventDefault();
        const settings = {
            storeName: document.getElementById('storeName').value,
            storePhone: document.getElementById('storePhone').value,
            storeEmail: document.getElementById('storeEmail').value,
            telegramToken: document.getElementById('telegramToken').value,
            telegramChatId: document.getElementById('telegramChatId').value
        };
        
        // Save to localStorage
        localStorage.setItem('admin_settings', JSON.stringify(settings));
        localStorage.setItem('telegram_token', document.getElementById('telegramToken').value);
        localStorage.setItem('telegram_chat_id', document.getElementById('telegramChatId').value);
        
        UI.showNotification('Настройки сохранены');
    }

    getStatusText(status) {
        const statusMap = {
            'new': 'Новый',
            'confirmed': 'Подтвержден',
            'packed': 'Собран',
            'shipped': 'Отправлен',
            'completed': 'Завершен'
        };
        return statusMap[status] || status;
    }
}

// Initialize
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminManager();
    
    // Handle logout
    const logoutBtn = document.getElementById('adminLogout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Вы уверены, что хотите выйти?')) {
                localStorage.removeItem('admin_logged_in');
                localStorage.removeItem('admin_login_time');
                window.location.href = '../admin-login.html';
            }
        });
    }
});
