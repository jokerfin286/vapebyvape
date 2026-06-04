// Authentication Logic
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('vape_users')) || [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    handleLogin(e) {
        e.preventDefault();
        const errors = {};

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validation
        if (!email) {
            errors.email = 'Email обязателен';
        } else if (!this.validateEmail(email)) {
            errors.email = 'Введите корректный email';
        }

        if (!password) {
            errors.password = 'Пароль обязателен';
        }

        // Clear errors
        document.getElementById('emailError').textContent = '';
        document.getElementById('passwordError').textContent = '';

        // Show errors
        if (Object.keys(errors).length > 0) {
            if (errors.email) {
                document.getElementById('emailError').textContent = errors.email;
                document.getElementById('emailError').classList.add('show');
            }
            if (errors.password) {
                document.getElementById('passwordError').textContent = errors.password;
                document.getElementById('passwordError').classList.add('show');
            }
            return;
        }

        // Check credentials
        const user = this.users.find(u => u.email === email && u.password === password);

        if (user) {
            Storage.setUser({
                id: user.id,
                firstName: user.firstName,
                email: user.email,
                dateOfBirth: user.dateOfBirth,
                registerDate: user.registerDate
            });
            UI.showNotification('Добро пожаловать!');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            document.getElementById('emailError').textContent = 'Неверные учетные данные';
            document.getElementById('emailError').classList.add('show');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const errors = {};

        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim();
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validation
        if (!firstName) {
            errors.firstName = 'Имя обязательно';
        } else if (firstName.length < 2) {
            errors.firstName = 'Имя должно содержать минимум 2 символа';
        }

        if (!email) {
            errors.email = 'Email обязателен';
        } else if (!this.validateEmail(email)) {
            errors.email = 'Введите корректный email';
        } else if (this.users.some(u => u.email === email)) {
            errors.email = 'Этот email уже зарегистрирован';
        }

        if (!dateOfBirth) {
            errors.dob = 'Дата рождения обязательна';
        } else {
            const birthDate = new Date(dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18) {
                errors.dob = 'Вам должно быть минимум 18 лет';
            }
        }

        if (!phone) {
            errors.phone = 'Введите номер телефона';
        } else if (!/^\d{9,10}$/.test(phone)) {
            errors.phone = 'Введите корректный номер телефона (9-10 цифр)';
        }

        if (!password) {
            errors.password = 'Пароль обязателен';
        } else if (!this.validatePassword(password)) {
            errors.password = 'Пароль должен содержать минимум 6 символов';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
        }

        // Clear errors
        document.getElementById('firstNameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('dobError').textContent = '';
        document.getElementById('phoneError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('confirmPasswordError').textContent = '';

        // Show errors
        if (Object.keys(errors).length > 0) {
            if (errors.firstName) {
                document.getElementById('firstNameError').textContent = errors.firstName;
                document.getElementById('firstNameError').classList.add('show');
            }
            if (errors.email) {
                document.getElementById('emailError').textContent = errors.email;
                document.getElementById('emailError').classList.add('show');
            }
            if (errors.dob) {
                document.getElementById('dobError').textContent = errors.dob;
                document.getElementById('dobError').classList.add('show');
            }
            if (errors.phone) {
                document.getElementById('phoneError').textContent = errors.phone;
                document.getElementById('phoneError').classList.add('show');
            }
            if (errors.password) {
                document.getElementById('passwordError').textContent = errors.password;
                document.getElementById('passwordError').classList.add('show');
            }
            if (errors.confirmPassword) {
                document.getElementById('confirmPasswordError').textContent = errors.confirmPassword;
                document.getElementById('confirmPasswordError').classList.add('show');
            }
            return;
        }

        // Create user
        const fullPhone = `+375${phone}`;
        const newUser = {
            id: Date.now(),
            firstName,
            email,
            password,
            phone: fullPhone,
            dateOfBirth,
            registerDate: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('vape_users', JSON.stringify(this.users));

        Storage.setUser({
            id: newUser.id,
            firstName: newUser.firstName,
            email: newUser.email,
            phone: newUser.phone,
            dateOfBirth: newUser.dateOfBirth,
            registerDate: newUser.registerDate
        });

        UI.showNotification('Аккаунт создан успешно!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});
