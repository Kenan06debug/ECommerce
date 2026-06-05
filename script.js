document.addEventListener('DOMContentLoaded', () => {

    // --- Tab Switcher Logic Router ---
    window.switchView = function(targetPageId) {
        // Toggle view blocks
        document.querySelectorAll('.app-page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(targetPageId).classList.add('active');

        // Synchronize Active Switcher Buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('onclick').includes(targetPageId)) {
                btn.classList.add('active');
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Detail Gallery Controller ---
    window.changePreview = function(element) {
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        element.classList.add('active');
        
        const imgSrc = element.getAttribute('src');
        document.getElementById('galleryMain').setAttribute('src', imgSrc);
    };

    // --- Cart Adjustments & Totals ---
    window.adjustQty = function(btn, changeValue) {
        const valueHolder = btn.parentElement.querySelector('.qty-display-val');
        let currentQty = parseInt(valueHolder.textContent);
        
        currentQty += changeValue;
        if (currentQty < 1) return;

        valueHolder.textContent = currentQty;
        
        // Compute Cost Changes using Naira (Base price: 749,000)
        // Using LocaleString to add standard Nigerian currency comma separations (e.g., 1,498,000)
        const basePrice = 749000;
        const totalCost = basePrice * currentQty;
        const formattedTotal = totalCost.toLocaleString('en-NG');
        
        document.getElementById('cartSubtotal').textContent = `₦${formattedTotal}`;
    };

    window.removeCartItem = function(btn) {
        if(confirm("Remove this item from your basket?")) {
            btn.closest('.cart-row-item').innerHTML = `<p style="padding:20px;color:#888;">Your cart is empty.</p>`;
            document.getElementById('cartSubtotal').textContent = `₦0`;
            document.querySelector('.cart-count-badge').textContent = '0';
        }
    };

    // --- Call to Action Triggers ---
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        alert('🛒 Successfully added to your Kenan Cart basket!');
        switchView('cart-page');
    });

    window.processFinalOrder = function() {
        alert('🎉 Success! Your Kenan dispatch tracking details are being processed.');
        switchView('store-page');
    };
});
