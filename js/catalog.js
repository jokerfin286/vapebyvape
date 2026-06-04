// Catalog Page Logic
class CatalogManager {
    constructor() {
        this.filters = {
            search: '',
            category: [],
            manufacturer: [],
            taste: [],
            volume: [],
            priceMin: 0,
            priceMax: 5000,
            inStock: false
        };
        this.sortBy = 'popular';
        this.initializeFilters();
    }

    initializeFilters() {
        // Only initialize if we're on the catalog page
        if (!document.getElementById('categoryFilters')) return;

        this.renderFilterOptions();
        this.attachEventListeners();
        this.applyFilters();
    }

    getUniqueValues(field) {
        return [...new Set(mockProducts.map(p => p[field]))].filter(v => v);
    }

    renderFilterOptions() {
        // Categories
        const categoryFilters = document.getElementById('categoryFilters');
        if (categoryFilters) {
            categoryFilters.innerHTML = categories.map(cat => `
                <label class="checkbox-label">
                    <input type="checkbox" class="filter-checkbox category-filter" value="${cat.id}">
                    <span>${cat.name}</span>
                </label>
            `).join('');
        }

        // Manufacturers
        const manufacturers = this.getUniqueValues('manufacturer');
        const manufacturerFilters = document.getElementById('manufacturerFilters');
        if (manufacturerFilters) {
            manufacturerFilters.innerHTML = manufacturers.map(mfg => `
                <label class="checkbox-label">
                    <input type="checkbox" class="filter-checkbox manufacturer-filter" value="${mfg}">
                    <span>${mfg}</span>
                </label>
            `).join('');
        }

        // Tastes
        const tastes = this.getUniqueValues('taste').filter(t => t !== 'N/A');
        const tasteFilters = document.getElementById('tasteFilters');
        if (tasteFilters) {
            tasteFilters.innerHTML = tastes.map(taste => `
                <label class="checkbox-label">
                    <input type="checkbox" class="filter-checkbox taste-filter" value="${taste}">
                    <span>${taste}</span>
                </label>
            `).join('');
        }

        // Volumes
        const volumes = this.getUniqueValues('volume').sort((a, b) => a - b);
        const volumeFilters = document.getElementById('volumeFilters');
        if (volumeFilters) {
            volumeFilters.innerHTML = volumes.map(vol => `
                <label class="checkbox-label">
                    <input type="checkbox" class="filter-checkbox volume-filter" value="${vol}">
                    <span>${vol} мл</span>
                </label>
            `).join('');
        }
    }

    attachEventListeners() {
        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Category filters
        document.querySelectorAll('.category-filter').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.filters.category.push(e.target.value);
                } else {
                    this.filters.category = this.filters.category.filter(c => c !== e.target.value);
                }
                this.applyFilters();
            });
        });

        // Manufacturer filters
        document.querySelectorAll('.manufacturer-filter').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.filters.manufacturer.push(e.target.value);
                } else {
                    this.filters.manufacturer = this.filters.manufacturer.filter(m => m !== e.target.value);
                }
                this.applyFilters();
            });
        });

        // Taste filters
        document.querySelectorAll('.taste-filter').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.filters.taste.push(e.target.value);
                } else {
                    this.filters.taste = this.filters.taste.filter(t => t !== e.target.value);
                }
                this.applyFilters();
            });
        });

        // Volume filters
        document.querySelectorAll('.volume-filter').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.filters.volume.push(parseInt(e.target.value));
                } else {
                    this.filters.volume = this.filters.volume.filter(v => v !== parseInt(e.target.value));
                }
                this.applyFilters();
            });
        });

        // Price range
        const priceMin = document.getElementById('priceMin');
        const priceMax = document.getElementById('priceMax');
        if (priceMin && priceMax) {
            priceMin.addEventListener('input', (e) => {
                this.filters.priceMin = parseInt(e.target.value);
                document.getElementById('priceMinDisplay').textContent = this.filters.priceMin;
                this.applyFilters();
            });
            priceMax.addEventListener('input', (e) => {
                this.filters.priceMax = parseInt(e.target.value);
                document.getElementById('priceMaxDisplay').textContent = this.filters.priceMax;
                this.applyFilters();
            });
        }

        // In stock filter
        const inStockFilter = document.getElementById('inStockFilter');
        if (inStockFilter) {
            inStockFilter.addEventListener('change', (e) => {
                this.filters.inStock = e.target.checked;
                this.applyFilters();
            });
        }

        // Clear filters
        const clearBtn = document.getElementById('clearFilters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearFilters());
        }

        // Sort
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.applyFilters();
            });
        }
    }

    filterProducts() {
        let filtered = mockProducts;

        // Search
        if (this.filters.search) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(this.filters.search) ||
                p.description.toLowerCase().includes(this.filters.search) ||
                p.taste.toLowerCase().includes(this.filters.search)
            );
        }

        // Category
        if (this.filters.category.length > 0) {
            filtered = filtered.filter(p => this.filters.category.includes(p.category));
        }

        // Manufacturer
        if (this.filters.manufacturer.length > 0) {
            filtered = filtered.filter(p => this.filters.manufacturer.includes(p.manufacturer));
        }

        // Taste
        if (this.filters.taste.length > 0) {
            filtered = filtered.filter(p => this.filters.taste.includes(p.taste));
        }

        // Volume
        if (this.filters.volume.length > 0) {
            filtered = filtered.filter(p => this.filters.volume.includes(p.volume));
        }

        // Price
        filtered = filtered.filter(p => p.price >= this.filters.priceMin && p.price <= this.filters.priceMax);

        // Stock
        if (this.filters.inStock) {
            filtered = filtered.filter(p => p.stock > 0);
        }

        return filtered;
    }

    sortProducts(products) {
        const sorted = [...products];

        switch (this.sortBy) {
            case 'new':
                return sorted.reverse();
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'popular':
            default:
                return sorted.sort((a, b) => b.reviews - a.reviews);
        }
    }

    applyFilters() {
        let products = this.filterProducts();
        products = this.sortProducts(products);

        const container = document.getElementById('productsContainer');
        const noProducts = document.getElementById('noProducts');
        const resultsCount = document.getElementById('resultsCount');

        if (products.length === 0) {
            container.innerHTML = '';
            noProducts.style.display = 'block';
            resultsCount.textContent = 'Товары не найдены';
        } else {
            container.innerHTML = products.map(p => UI.renderProductCard(p)).join('');
            noProducts.style.display = 'none';
            resultsCount.textContent = `Показано ${products.length} товаров`;
        }
    }

    clearFilters() {
        this.filters = {
            search: '',
            category: [],
            manufacturer: [],
            taste: [],
            volume: [],
            priceMin: 0,
            priceMax: 5000,
            inStock: false
        };

        // Reset UI
        document.getElementById('searchInput').value = '';
        document.getElementById('priceMin').value = 0;
        document.getElementById('priceMax').value = 5000;
        document.getElementById('priceMinDisplay').textContent = '0';
        document.getElementById('priceMaxDisplay').textContent = '5000';
        document.getElementById('inStockFilter').checked = false;
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);

        this.applyFilters();
    }
}

// Home Page Logic
function renderHomePageProducts() {
    // Popular Products
    const popularProducts = document.getElementById('popularProducts');
    if (popularProducts) {
        const popular = mockProducts
            .sort((a, b) => b.reviews - a.reviews)
            .slice(0, 6);
        popularProducts.innerHTML = popular.map(p => UI.renderProductCard(p)).join('');
    }

    // New Products
    const newProducts = document.getElementById('newProducts');
    if (newProducts) {
        const newest = mockProducts.slice(-6);
        newProducts.innerHTML = newest.map(p => UI.renderProductCard(p)).join('');
    }

    // Categories
    const categoriesGrid = document.getElementById('categories');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = categories.map(cat => {
            const count = mockProducts.filter(p => p.category === cat.id).length;
            return `
                <div class="category-card" onclick="window.location.href='catalog.html?category=${cat.id}'">
                    <h3 class="category-name">${cat.name}</h3>
                    <p>${count} товаров</p>
                </div>
            `;
        }).join('');
    }

    // Reviews
    const reviewsGrid = document.getElementById('reviews');
    if (reviewsGrid) {
        reviewsGrid.innerHTML = mockReviews.map(rev => {
            const product = mockProducts.find(p => p.id === rev.productId);
            return `
                <div class="review-card">
                    <div class="review-card-rating">${renderStars(rev.rating)}</div>
                    <p class="review-card-text">"${rev.text}"</p>
                    <div class="review-card-author">— ${rev.author} о ${product?.name}</div>
                </div>
            `;
        }).join('');
    }
}

// Initialize catalog
document.addEventListener('DOMContentLoaded', () => {
    // Only run catalog initialization if we're on catalog page
    if (document.getElementById('categoryFilters')) {
        window.catalogManager = new CatalogManager();
    }

    // Render home page content
    renderHomePageProducts();
});
