let actionCounter = 0; 
let currentTheme = 'light';
let currentTab = 'all';
let currentFilter = 'all';
function formatProductStatus(name, inStock) {
    const status = inStock ? "In stock" : "Out of stock";
    return `PRODUCT STATUS "${name.toUpperCase()}": ${status}`;
}
function calculateTotalInStock(items) {
    let totalSum = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].inStock) {
            totalSum += items[i].price;
        }
    }
    return totalSum;
}
function toggleThemeLogic() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    
    if (currentTheme === 'light') {
        body.classList.add('dark-theme');
        themeBtn.textContent = '☀️ Light theme';
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark-theme');
        themeBtn.textContent = '🌙 Dark theme';
        currentTheme = 'light';
    }
}
// Product catalog - MICE local, KEYBOARDS from Unsplash
const products = [
    { name: "Logitech G Pro X Superlight", price: 3999, inStock: true, discount: true, category: "mouse", image: "images/mice/pod.jpeg", details: { sensor: "HERO 25K", dpi: "100-25,600", weight: "63 g", connection: "LIGHTSPEED wireless", battery: "70 hours", description: "Ultra-light wireless mouse for esports" } },
    { name: "Razer DeathAdder V3", price: 2499, inStock: true, discount: false, category: "mouse", image: "images/mice/portable_charger.jpeg", details: { sensor: "Focus Pro 30K", dpi: "100-30,000", weight: "59 g", connection: "Wired USB", cable: "SpeedFlex 2m", description: "Legendary ergonomic mouse for gamers" } },
    { name: "SteelSeries Rival 3", price: 899, inStock: false, discount: false, category: "mouse", image: "images/mice/vv.jpeg", details: { sensor: "TrueMove Core", dpi: "100-8,500", weight: "77 g", connection: "Wired USB", rgb: "3-zone backlight", description: "Budget mouse with excellent quality" } },
    { name: "Logitech MX Master 3S", price: 3299, inStock: true, discount: true, category: "mouse", image: "images/mice/wireless.jpeg", details: { sensor: "Darkfield 8K DPI", dpi: "200-8,000", weight: "141 g", connection: "Bluetooth + USB", battery: "70 days", description: "Professional mouse for productivity" } },
    { name: "Razer Viper Ultimate", price: 4199, inStock: true, discount: false, category: "mouse", image: "images/mice/wired.jpeg", details: { sensor: "Focus+ 20K", dpi: "100-20,000", weight: "74 g", connection: "HyperSpeed wireless", battery: "70 hours", description: "Ambidextrous premium mouse" } },
    { name: "HyperX Pulsefire Haste", price: 1299, inStock: false, discount: false, category: "mouse", image: "images/mice/usb.jpeg", details: { sensor: "PixArt PAW3335", dpi: "100-16,000", weight: "59 g", connection: "Wired USB", cable: "HyperFlex 1.8m", description: "Ultra-light mouse for fast gaming" } },
    { name: "Corsair Dark Core RGB Pro", price: 2799, inStock: true, discount: false, category: "mouse", image: "images/mice/power-pack.jpeg", details: { sensor: "PMW3392", dpi: "100-18,000", weight: "133 g", connection: "Bluetooth + 2.4GHz", battery: "50 hours", description: "Wireless mouse with RGB backlight" } },
    { name: "Glorious Model O", price: 1599, inStock: true, discount: true, category: "mouse", image: "images/mice/multi.jpeg", details: { sensor: "Pixart PMW3360", dpi: "400-12,000", weight: "67 g", connection: "Wired USB", cable: "Ascended 2m", description: "Honeycomb design for minimal weight" } },
    { name: "Finalmouse Starlight-12", price: 8999, inStock: false, discount: false, category: "mouse", image: "images/mice/iphone_cables.jpeg", details: { sensor: "PAW3370", dpi: "400-3,200", weight: "42 g", connection: "Wireless 2.4GHz", battery: "100 hours", description: "Lightest wireless mouse in the world" } },
    { name: "Zowie EC2", price: 2199, inStock: true, discount: false, category: "mouse", image: "images/mice/smartphones.jpeg", details: { sensor: "PMW3360", dpi: "400-3,200", weight: "82 g", connection: "Wired USB", cable: "2 meters", description: "Esports mouse without software" } },
    { name: "AJAZZ AK820 Pro", price: 6767, inStock: true, discount: true, category: "keyboard", image: "images/mice/pouches.jpeg", details: { layout: "75% (82 keys)", switches: "Hot-swap mechanical", connection: "Tri-mode (USB-C/BT/2.4GHz)", battery: "4000 mAh", features: "Gasket mount, RGB, TFT screen", description: "Premium 75% keyboard with screen" } },
    { name: "Mchose Mix 87", price: 4900, inStock: false, discount: false, category: "keyboard", image: "images/mice/hp.jpeg", details: { layout: "TKL (87 keys)", switches: "Mechanical Hot-swap", connection: "USB-C wired", keycaps: "PBT Double-shot", features: "RGB Per-key, Gasket", description: "Compact TKL for productivity" } },
    { name: "Yunzii B75 Pro MAX", price: 3600, inStock: true, discount: false, category: "keyboard", image: "images/mice/double_usb.jpeg", details: { layout: "75% (81 keys)", switches: "Hot-swappable", connection: "Tri-mode wireless", battery: "3750 mAh", features: "Knob, RGB, South-facing", description: "Affordable 75% with great sound" } },
    { name: "Wooting HE87", price: 9000, inStock: true, discount: true, category: "keyboard", image: "images/mice/cables.jpeg", details: { layout: "TKL (87 keys)", switches: "Lekker Hall Effect", connection: "USB-C wired", polling: "1000 Hz", features: "Analog input, Rapid Trigger", description: "Analog keyboard for esports" } },
    { name: "ASUS ROG ACE75 HE", price: 10000, inStock: false, discount: false, category: "keyboard", image: "images/mice/ba.jpeg", details: { layout: "75% (83 keys)", switches: "ROG NX Hall Effect", connection: "Tri-mode (USB/BT/2.4GHz)", battery: "4000 mAh", features: "OLED display, RGB, Knob", description: "Top gaming keyboard from ASUS" } },
    { name: "Keychron K8 Pro", price: 3499, inStock: true, discount: true, category: "keyboard", image: "images/mice/c.jpeg", details: { layout: "TKL (87 keys)", switches: "Hot-swap Gateron/Cherry", connection: "USB-C + Bluetooth", battery: "4000 mAh", features: "QMK/VIA, RGB, Mac/Win", description: "Versatile TKL for all platforms" } },
    { name: "Ducky One 3", price: 4299, inStock: true, discount: false, category: "keyboard", image: "images/mice/head_charger.jpeg", details: { layout: "Full-size (104 keys)", switches: "Cherry MX", connection: "USB-C wired", keycaps: "PBT Doubleshot", features: "RGB, Hot-swap PCB", description: "Premium classic from Ducky" } },
    { name: "Corsair K70 RGB", price: 5199, inStock: true, discount: false, category: "keyboard", image: "images/mice/h.jpeg", details: { layout: "Full-size (104 keys)", switches: "Cherry MX RGB", connection: "Wired USB", polling: "1000 Hz", features: "RGB per-key, Media keys", description: "Gaming keyboard with aluminum body" } },
    { name: "NuPhy Air75", price: 3899, inStock: false, discount: false, category: "keyboard", image: "images/mice/banner.jpeg", details: { layout: "75% Ultra-slim", switches: "Low-profile Gateron", connection: "Tri-mode wireless", battery: "4000 mAh", features: "Mac-style, RGB, 12mm thickness", description: "Thinnest mechanical keyboard" } },
    { name: "Earpods", price: 120, inStock: true, discount: true, category: "keyboard", image: "images/mice/earpods.jpeg", details: { layout: "75% (84 )", switches: "Hot-swap", connection: "Tri-mode (USB/BT/2.4GHz)", battery: "3750 mAh", features: "RGB, Compact design", description: "High quality pods" } }
];
function updateTabCounts() {
    document.getElementById('count-all').textContent = products.length;
    document.getElementById('count-mice').textContent = products.filter(p => p.category === 'mouse').length;
    document.getElementById('count-keyboards').textContent = products.filter(p => p.category === 'keyboard').length;
}
function showProductDetails(product) {
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('product-details-content');
    const categoryIcon = product.category === 'mouse' ? '🖱️' : '⌨️';
    let detailsHTML = '<div class="product-full-details">';
    detailsHTML += `<h2>${categoryIcon} ${product.name}</h2>`;
    detailsHTML += `<div class="detail-image-wrapper"><img src="${product.image}" alt="${product.name}" class="detail-image" onerror="this.src='https://via.placeholder.com/500x500/7209B7/FFFFFF?text=No+Image'"></div>`;
    detailsHTML += `<div class="detail-price ${product.discount ? 'discount-price' : ''}">${product.price} UAH</div>`;
    detailsHTML += `<div class="detail-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">${product.inStock ? '✅ In stock' : '❌ Out of stock'}</div>`;
    if (product.discount) detailsHTML += '<div class="detail-badge">🔥 Discount!</div>';
    detailsHTML += '<div class="detail-specs"><h3>📋 Specifications</h3>';
    for (let [key, value] of Object.entries(product.details)) {
        if (key !== 'description') {
            const label = { sensor:'Sensor', dpi:'DPI', weight:'Weight', connection:'Connection', battery:'Battery', cable:'Cable', rgb:'Backlight', layout:'Layout', switches:'Switches', keycaps:'Keycaps', polling:'Polling Rate', features:'Features' }[key] || key;
            detailsHTML += `<div class="spec-row"><span class="spec-label">${label}:</span><span class="spec-value">${value}</span></div>`;
        }
    }
    detailsHTML += '</div><p class="detail-description">'+product.details.description+'</p>';
    detailsHTML += '<button class="detail-order-btn" onclick="openOrderModal(); closeProductModal();">Place order</button></div>';
    const style = `<style>.product-full-details{text-align:center}.detail-image-wrapper{margin:20px 0}.detail-image{max-width:100%;height:auto;border-radius:12px}.detail-price{font-size:2em;font-weight:bold;color:#C77DFF;margin:15px 0}.detail-price.discount-price{color:#7FFF00}.detail-status{font-size:1.2em;margin:10px 0;font-weight:600}.detail-status.in-stock{color:#7FFF00}.detail-status.out-of-stock{color:#FF6B9D}.detail-badge{display:inline-block;background:linear-gradient(135deg,#7FFF00,#39FF14);color:#0F0A1F;padding:8px 20px;border-radius:20px;font-weight:bold;margin:10px 0}.detail-specs{background:rgba(114,9,183,0.1);padding:20px;border-radius:10px;margin:20px 0;text-align:left}.detail-specs h3{color:#C77DFF;margin-bottom:15px;text-align:center}.spec-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(199,125,255,0.2)}.spec-label{color:#B0B0B0;font-weight:500}.spec-value{color:#E8E8E8;font-weight:600}.detail-description{color:#B0B0B0;font-style:italic;margin:20px 0}.detail-order-btn{width:100%;padding:15px;background:linear-gradient(135deg,#7209B7,#B24BF3);color:white;border:none;border-radius:8px;font-size:1.1em;font-weight:bold;cursor:pointer;transition:all 0.3s ease}.detail-order-btn:hover{transform:translateY(-2px);box-shadow:0 6px 30px rgba(178,75,243,0.6)}</style>`;
    content.innerHTML = style + detailsHTML;
    modal.classList.add('active');
}
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}
function renderProducts() {
    const container = document.getElementById('product-list');
    const productSelect = document.getElementById('product');
    container.innerHTML = ''; 
    productSelect.innerHTML = '<option value="">-- Select product --</option>';
    let filteredProducts = products;
    if (currentTab === 'mice') filteredProducts = filteredProducts.filter(p => p.category === 'mouse');
    else if (currentTab === 'keyboards') filteredProducts = filteredProducts.filter(p => p.category === 'keyboard');
    if (currentFilter === 'inStock') filteredProducts = filteredProducts.filter(p => p.inStock);
    else if (currentFilter === 'discount') filteredProducts = filteredProducts.filter(p => p.discount);
    filteredProducts.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.dataset.index = index;
        let badgeHTML = '';
        if (item.discount) badgeHTML = '<span class="product-badge discount">Discount</span>';
        else if (!item.inStock) badgeHTML = '<span class="product-badge">Out of stock</span>';
        let priceClass = item.discount ? "discount-price" : "";
        let statusClass = item.inStock ? "in-stock" : "out-of-stock";
        let statusText = item.inStock ? "✅ In stock" : "❌ Out of stock";
        div.innerHTML = `<div class="product-front">${badgeHTML}<div class="product-image-wrapper"><img src="${item.image}" alt="${item.name}" class="product-image" loading="lazy" onerror="this.src='https://via.placeholder.com/500x500/7209B7/FFFFFF?text=${item.category === 'mouse' ? 'Mouse' : 'Keyboard'}'"></div><h3>${item.name}</h3><p class="product-price ${priceClass}">${item.price} UAH</p><p class="product-status ${statusClass}">${statusText}</p><small style="color:#B0B0B0;font-size:0.8em;">Click for details</small></div>`;
        div.addEventListener('click', () => showProductDetails(item));
        container.appendChild(div);
        if (item.inStock) {
            const option = document.createElement('option');
            option.value = item.name;
            const categoryIcon = item.category === 'mouse' ? '🖱️' : '⌨️';
            option.textContent = `${categoryIcon} ${item.name} - ${item.price} UAH`;
            productSelect.appendChild(option);
        }
    });
    if (filteredProducts.length === 0) container.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">No products found</p>';
}
function openOrderModal() {
    document.getElementById('order-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeOrderModal() {
    document.getElementById('order-modal').classList.remove('active');
    document.body.style.overflow = '';
}
// Mobile menu
document.getElementById('mobile-menu-btn').addEventListener('click', () => document.getElementById('mobile-menu').classList.add('active'));
document.getElementById('mobile-menu-close').addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('active'));
document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('active')));
// Open order form
document.getElementById('order-nav-btn').addEventListener('click', (e) => { e.preventDefault(); openOrderModal(); });
document.getElementById('order-mobile-btn').addEventListener('click', (e) => { e.preventDefault(); openOrderModal(); });
document.getElementById('modal-close').addEventListener('click', closeOrderModal);
document.getElementById('modal-overlay').addEventListener('click', closeOrderModal);
document.getElementById('product-modal-close').addEventListener('click', closeProductModal);
document.getElementById('product-modal-overlay').addEventListener('click', closeProductModal);
// Theme button
document.getElementById('theme-btn').addEventListener('click', () => { actionCounter++; console.group(`🎨 Action #${actionCounter}: Theme change`); toggleThemeLogic(); console.groupEnd(); });
// Calculation button
document.getElementById('calc-btn').addEventListener('click', () => { actionCounter++; console.group(`💰 Action #${actionCounter}: Calculation`); const total = calculateTotalInStock(products); const inStockProducts = products.filter(p => p.inStock); console.table(inStockProducts); document.getElementById('status-message').innerText = `💰 Total value: ${total} UAH (${inStockProducts.length} pcs.)`; console.groupEnd(); });
// Admin
const systemAccess = (() => ({ checkAccess: (password) => password === "67" ? "Access granted" : "Access denied" }))();
document.getElementById('admin-btn').addEventListener('click', () => alert(systemAccess.checkAccess(prompt("Password (hint: 67):"))));
// Rendering
updateTabCounts();
renderProducts();
// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', function() { document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); currentTab = this.dataset.tab; renderProducts(); }));
// Filters
document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', function() { document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); currentFilter = this.dataset.filter; renderProducts(); }));
// Search
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    if (!query) { document.getElementById('search-error').textContent = "❌ Enter name!"; return; }
    const found = products.find(p => p.name.toLowerCase().includes(query));
    if (found) {
        document.getElementById('search-error').textContent = "";
        document.getElementById('search-result').textContent = `✅ Search: ${found.name}`;
        if (found.category === 'mouse') document.querySelector('[data-tab="mice"]').click();
        else document.querySelector('[data-tab="keyboards"]').click();
        setTimeout(() => showProductDetails(found), 300);
    } else {
        document.getElementById('search-error').textContent = "❌ Searh here";
        document.getElementById('search-result').textContent = "";
    }
    searchInput.value = "";
});
searchInput.addEventListener('input', () => document.getElementById('search-error').textContent = "");
// Practical 3.3
const titleEl = document.getElementById("main-title");
const extraInfoContainer = document.querySelector("#extra-info");
titleEl.textContent = `S & T Accessories Hub | ${titleEl.textContent}`;
extraInfoContainer.innerHTML = `<div style="background: linear-gradient(135deg, #7209B7 0%, #B24BF3 100%); color: #fff; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center; box-shadow: 0 0 30px rgba(178, 75, 243, 0.5);"><h2>🔥S & T Accessories Hub</h2><p>Premium Tech Accessories Store</p></div>`;

// ========== FORM VALIDATION & WHATSAPP REDIRECT (FIXED) ==========
// Ensure success message element exists (if not, create it)
if (!document.getElementById('success-message')) {
    let msgDiv = document.createElement('div');
    msgDiv.id = 'success-message';
    msgDiv.className = 'success-message';
    document.querySelector('#order-modal .modal-content').appendChild(msgDiv);
}

const validators = {
    fullName: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ']+\s+[a-zA-Zа-яА-ЯіІїЇєЄґҐ']+.*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^.{5,}$/,  // Accept any phone (minimum 5 chars)
    address: /.{10,}/
};

const formFields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    address: document.getElementById('address'),
    product: document.getElementById('product'),
    comment: document.getElementById('comment'),
    terms: document.getElementById('terms')
};

function showError(field, msg) {
    formFields[field].classList.add('invalid');
    const errorSpan = document.getElementById(`${field}-error`);
    if (errorSpan) errorSpan.textContent = msg;
}
function clearError(field) {
    if (formFields[field]) {
        formFields[field].classList.remove('invalid');
        formFields[field].classList.add('valid');
    }
    const errorSpan = document.getElementById(`${field}-error`);
    if (errorSpan) errorSpan.textContent = '';
}
function validateField(field, value) {
    if (field !== 'comment' && !value.trim()) {
        showError(field, 'Required field');
        return false;
    }
    if (field === 'fullName' && !validators.fullName.test(value)) {
        showError(field, 'Enter first and last name');
        return false;
    }
    if (field === 'email' && !validators.email.test(value)) {
        showError(field, 'Invalid email');
        return false;
    }
    if (field === 'phone' && !validators.phone.test(value)) {
        showError(field, 'Enter a valid phone number');
        return false;
    }
    if (field === 'address' && value.length < 10) {
        showError(field, 'Minimum 10 characters');
        return false;
    }
    if (field === 'product' && !value) {
        showError(field, 'Select a product');
        return false;
    }
    if (field === 'terms' && !formFields.terms.checked) {
        showError(field, 'Consent required');
        return false;
    }
    clearError(field);
    return true;
}

// Submit handler - WhatsApp direct
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const data = {};
    for (let field in formFields) {
        const value = field === 'terms' ? formFields[field].checked : formFields[field].value;
        if (!validateField(field, value)) isValid = false;
        data[field] = value;
    }
    
    if (!isValid) {
        // Show a generic error at the top
        const msg = document.getElementById('success-message');
        msg.innerHTML = `<h3 style="color:#FF6B9D;">❌ Please fix errors above</h3>`;
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 3000);
        return;
    }
    
    // Build WhatsApp message
    const phoneNumber = '260964173406'; // Your number (no +)
    let message = `Hello, I would like to place an order:%0A`;
    message += `%0A*Name:* ${data.fullName}`;
    message += `%0A*Email:* ${data.email}`;
    message += `%0A*Phone:* ${data.phone}`;
    message += `%0A*Address:* ${data.address}`;
    message += `%0A*Product:* ${data.product}`;
    message += `%0A*Comment:* ${data.comment || 'None'}`;
    message += `%0A%0AThank you!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Try to open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success
    const msg = document.getElementById('success-message');
    msg.innerHTML = `<h3>✅ Redirecting to WhatsApp...</h3><p>If WhatsApp does not open, <a href="${whatsappUrl}" target="_blank">click here</a></p>`;
    msg.classList.add('show');
    
    // Reset form and close modal after delay
    document.getElementById('orderForm').reset();
    // Clear any valid/invalid styles
    for (let field in formFields) {
        if (formFields[field] && formFields[field].classList) {
            formFields[field].classList.remove('valid', 'invalid');
        }
    }
    
    setTimeout(() => {
        msg.classList.remove('show');
        closeOrderModal();
    }, 4000);
});