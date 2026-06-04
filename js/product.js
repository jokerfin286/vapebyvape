// Product Page Logic
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

function renderProductPage() {
    const productId = getProductIdFromUrl();
    const product = mockProducts.find(p => p.id === productId);

    if (!product) {
        document.getElementById('productContent').innerHTML = `
            <div class="empty-state">
                <p>Товар не найден</p>
                <a href="catalog.html" class="btn btn-gradient">Вернуться в каталог</a>
            </div>
        `;
        return;
    }

    // Update page title
    document.title = `${product.name} - VAPEBYVAPE.STORE`;
    document.getElementById('breadcrumbProduct').textContent = product.name;

    const productReviews = mockReviews.filter(r => r.productId === productId);
    const isFavorite = Storage.getFavorites().includes(productId);
    const availability = product.stock > 0;

    const html = `
        <div class="product-detail">
            <div class="product-gallery">
                <div class="product-gallery-main">
                    <img src="${product.image}" alt="${product.name}">
                </div>
            </div>

            <div class="product-details-section">
                <div class="product-details-header">
                    <h1>${product.name}</h1>
                    <div class="rating">
                        ${renderStars(product.rating)} (${product.reviews} отзывов)
                    </div>
                </div>

                <div class="product-specs">
                    <div class="spec-item">
                        <span class="spec-label">Категория</span>
                        <span class="spec-value">${categories.find(c => c.id === product.category)?.name}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Производитель</span>
                        <span class="spec-value">${product.manufacturer}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Вкус</span>
                        <span class="spec-value">${product.taste}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Объем</span>
                        <span class="spec-value">${product.volume} мл</span>
                    </div>
                </div>

                <div class="product-price-large">${product.price}₽</div>

                <div class="product-availability">
                    <span class="availability-badge ${availability ? 'in-stock' : 'out-of-stock'}">
                        ${availability ? `✓ В наличии (${product.stock} шт)` : '✗ Нет в наличии'}
                    </span>
                </div>

                <div class="product-actions-large">
                    <button class="btn btn-gradient" onclick="addToCart(${productId})" ${!availability ? 'disabled' : ''}>
                        🛒 Добавить в корзину
                    </button>
                    <button class="btn btn-secondary ${isFavorite ? 'btn-gradient' : ''}" onclick="toggleFavoriteDetail(${productId})">
                        ${isFavorite ? '❤️ В избранном' : '🤍 В избранное'}
                    </button>
                </div>

                <div class="product-description-section">
                    <h2>Описание</h2>
                    <p>${product.description}</p>
                </div>
            </div>
        </div>

        <div class="reviews-section">
            <h2 class="section-title">Отзывы (${productReviews.length})</h2>
            
            ${productReviews.length > 0 ? `
                <div style="margin-bottom: 2rem;">
                    ${productReviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <div>
                                    <div class="review-author">${review.author}</div>
                                    <div class="review-rating">${renderStars(review.rating)}</div>
                                </div>
                                <div class="review-date">${formatDate(review.date)}</div>
                            </div>
                            <p class="review-text">"${review.text}"</p>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">Пока нет отзывов. Будьте первым!</p>
            `}
        </div>
    `;

    document.getElementById('productContent').innerHTML = html;

    // Render related products
    renderRelatedProducts(productId, product.category);
}

function renderRelatedProducts(currentProductId, category) {
    const relatedProducts = mockProducts
        .filter(p => p.category === category && p.id !== currentProductId)
        .slice(0, 6);

    const container = document.getElementById('relatedProducts');
    if (container) {
        container.innerHTML = relatedProducts.length > 0 
            ? relatedProducts.map(p => UI.renderProductCard(p)).join('')
            : '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary);">Похожих товаров не найдено</p>';
    }
}

function toggleFavoriteDetail(productId) {
    toggleFavorite(productId);
    renderProductPage();
}

// Favorites Page Logic
function renderFavoritesPage() {
    const favorites = Storage.getFavorites();
    const favoriteProducts = mockProducts.filter(p => favorites.includes(p.id));

    const container = document.getElementById('favoritesContainer');
    const emptyState = document.getElementById('emptyFavorites');

    if (favoriteProducts.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        container.innerHTML = favoriteProducts.map(p => UI.renderProductCard(p)).join('');
        emptyState.style.display = 'none';
    }
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productContent')) {
        renderProductPage();
    }

    if (document.getElementById('favoritesContainer')) {
        renderFavoritesPage();
    }
});
