document.addEventListener('DOMContentLoaded', () => {

    // --- Master Tab Switcher Engine ---
    window.switchView = function(targetPageId) {
        // 1. Hide all pages, show the target page
        document.querySelectorAll('.app-page').forEach(page => {
            page.classList.remove('active');
        });
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 2. Synchronize Top Workspace Active Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            // Check if the button's data attribute matches the target page
            if (btn.getAttribute('data-target') === targetPageId) {
                btn.classList.add('active');
            }
        });

        // 3. Smooth scroll back to top of layout view
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- Explicit Event Binding for Workspace Buttons ---
    // This intercepts clicks directly via JavaScript to guarantee reactivity
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.getAttribute('data-target');
            if (target) {
                switchView(target);
            }
        });
    });

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
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert('🛒 Successfully added to your Kenan Cart basket!');
            switchView('cart-page');
        });
    }

    window.processFinalOrder = function() {
        alert('🎉 Success! Your Kenan dispatch tracking details are being processed.');
        switchView('store-page');
    };
});
