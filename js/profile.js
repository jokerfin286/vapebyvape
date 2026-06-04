// Profile Page Logic
class ProfileManager {
    constructor() {
        this.user = Storage.getUser();
        if (!this.user) {
            window.location.href = 'login.html';
            return;
        }

        this.initializeProfile();
        this.attachEventListeners();
    }

    initializeProfile() {
        this.renderProfileTab();
        this.renderOrdersTab();
        this.renderFavoritesTab();
        this.renderSettingsTab();
    }

    attachEventListeners() {
        // Tab switching
        document.querySelectorAll('.profile-menu-item').forEach(btn => {
            if (btn.id !== 'logoutBtn') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const tabName = btn.dataset.tab;
                    this.switchTab(tabName);
                });
            }
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите выйти?')) {
                Storage.removeUser();
                window.location.href = 'index.html';
            }
        });

        // Settings form
        const settingsForm = document.getElementById('settingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => this.handleSettingsSubmit(e));
        }
    }

    switchTab(tabName) {
        // Update menu
        document.querySelectorAll('.profile-menu-item').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update content
        document.querySelectorAll('.profile-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });
    }

    renderProfileTab() {
        document.getElementById('profileName').textContent = this.user.firstName;
        document.getElementById('profileEmail').textContent = this.user.email;
        document.getElementById('profileDob').textContent = formatDate(this.user.dateOfBirth);
        document.getElementById('profileRegDate').textContent = formatDate(this.user.registerDate);
    }

    renderOrdersTab() {
        const ordersContainer = document.getElementById('ordersContainer');
        const noOrders = document.getElementById('noOrders');

        // Get user's actual orders from localStorage
        const allOrders = JSON.parse(localStorage.getItem('admin_orders')) || [];
        const userOrders = allOrders.filter(order => order.userId === this.user.id);

        if (userOrders.length === 0) {
            ordersContainer.innerHTML = '';
            noOrders.style.display = 'block';
        } else {
            ordersContainer.innerHTML = userOrders.map(order => `
                <div class="order-item">
                    <div class="order-header">
                        <div>
                            <div class="order-id">Заказ ${order.id}</div>
                            <div style="font-size: 0.85rem; color: var(--color-text-secondary);">
                                ${formatDate(order.date)}
                            </div>
                        </div>
                        <span class="order-status ${order.status}">${this.getStatusText(order.status)}</span>
                    </div>
                    <div class="order-details-small">
                        <div>
                            <strong>Товаров:</strong> ${order.items}
                        </div>
                        <div>
                            <strong>Сумма:</strong> ${order.total}₽
                        </div>
                        <div>
                            <strong>Адрес:</strong> ${order.address}
                        </div>
                    </div>
                </div>
            `).join('');
            noOrders.style.display = 'none';
        }
    }

    renderFavoritesTab() {
        const favorites = Storage.getFavorites();
        const favoriteProducts = mockProducts.filter(p => favorites.includes(p.id));

        const container = document.getElementById('profileFavorites');
        const noFavorites = document.getElementById('noFavorites');

        if (favoriteProducts.length === 0) {
            container.innerHTML = '';
            noFavorites.style.display = 'block';
        } else {
            container.innerHTML = favoriteProducts.map(p => UI.renderProductCard(p)).join('');
            noFavorites.style.display = 'none';
        }
    }

    renderSettingsTab() {
        document.getElementById('settingName').value = this.user.firstName;
    }

    handleSettingsSubmit(e) {
        e.preventDefault();

        const newName = document.getElementById('settingName').value.trim();
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        const errors = {};

        if (newName && newName.length < 2) {
            errors.name = 'Имя должно содержать минимум 2 символа';
        }

        if (newPassword && newPassword.length < 6) {
            errors.password = 'Пароль должен содержать минимум 6 символов';
        }

        if (newPassword !== confirmNewPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
        }

        if (Object.keys(errors).length > 0) {
            UI.showNotification('Проверьте ошибки в форме', 'error');
            return;
        }

        // Update user
        if (newName) {
            this.user.firstName = newName;
        }

        Storage.setUser(this.user);

        // Update local users list if password changed
        if (newPassword) {
            const users = JSON.parse(localStorage.getItem('vape_users')) || [];
            const userIndex = users.findIndex(u => u.id === this.user.id);
            if (userIndex > -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('vape_users', JSON.stringify(users));
            }
        }

        UI.showNotification('Настройки сохранены');
        
        // Clear password fields
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmNewPassword').value = '';
        
        this.renderProfileTab();
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
document.addEventListener('DOMContentLoaded', () => {
    new ProfileManager();
});
