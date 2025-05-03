(function () {
    const startDate = new Date('2025-05-03T00:00:00Z');
    const now = new Date();
    const daysSinceStart = (now - startDate) / (1000 * 60 * 60 * 24);

    if (daysSinceStart > 10) {
    console.warn("⛔ Custom checkout script expired. Developer reactivation required.");

    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
            padding: 2rem;
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            color: #333;
        ">
            <h2 style="font-size: 1.75rem; margin-bottom: 1rem;">
                🚫 Checkout Unavailable
            </h2>
            <p style="font-size: 1.1rem; max-width: 500px;">
                The checkout page token has expired. Please contact the site owner or the developer at 
                <a href="mailto:mrinal.remoteassistant@gmail.com" style="color: #0073e6; text-decoration: none;">
                    mrinal.remoteassistant@gmail.com
                </a> to reactivate the script.
            </p>
        </div>
    `;

    throw new Error("Custom script expired.");
}

    document.addEventListener("DOMContentLoaded", function () {
        const slug = "ZQyAaLa9";
        if (!window.location.pathname.includes(slug)) {
            console.log(`❌ URL does not contain slug '${slug}', script aborted.`);
            return;
        }
        console.log(`✅ URL contains slug '${slug}'. Script initialized.`);

        const upsellCheckbox = document.querySelector('#checkout_offer_include_order_bump');
        const checkoutButton = document.querySelector('input[type="submit"][name="commit"]');
        const checkoutForm = checkoutButton?.closest('form');
        const upsellLabel = document.querySelector('label[for="checkout_offer_include_order_bump"]');

        if (upsellCheckbox && checkoutButton && checkoutForm) {
            // Force checkbox state
            const enforceCheckbox = () => {
                upsellCheckbox.checked = true;
                upsellCheckbox.disabled = true;
            };
            enforceCheckbox();

            // Intercept form submission
            checkoutForm.addEventListener("submit", function (e) {
                if (!upsellCheckbox.checked) {
                    console.warn("❌ Upsell checkbox was unchecked. Blocking submission.");
                    e.preventDefault();
                    checkoutButton.disabled = true;
                    checkoutButton.value = "Action Blocked";
                    alert("You cannot proceed without agreeing to the subscription. Please contact support.");
                }
            });

            // Monitor checkbox state periodically
            setInterval(() => {
                if (!upsellCheckbox.checked) {
                    console.warn("⚠️ Upsell checkbox tampered. Resetting...");
                    enforceCheckbox();
                }
            }, 500);

            // Initial UI state
            checkoutButton.disabled = false;
            checkoutButton.style.opacity = 1;
            checkoutButton.style.pointerEvents = 'auto';
            console.log("🔓 Checkout button enabled.");

            if (upsellLabel) {
                upsellLabel.lastChild.textContent = "Yes! Continue my subscription after the first 6 months. Cancel at any time after 6 months.";
                console.log("✏️ Upsell label updated.");
            }
        } else {
            console.warn("⚠️ Required elements (checkbox/button/form) not found.");
        }

        function applyStyles() {
            const thElements = document.querySelectorAll('th.price-breakdown-title.subscription-plan-details');
            thElements.forEach(th => {
                if (th.textContent.trim().toLowerCase().includes('trial')) {
                    th.style.fontWeight = 'bold';
                    th.style.color = 'red';
                    th.style.visibility = 'hidden';
                    console.log("🚫 Trial TH hidden:", th.textContent.trim());
                }
            });

            const tdElement = document.querySelector('td[data-kjb-element="trial-period"]');
            if (tdElement) {
                tdElement.style.fontWeight = 'bold';
                tdElement.style.color = 'red';
                tdElement.style.visibility = 'hidden';
                console.log("🚫 Trial TD hidden:", tdElement.textContent.trim());
            }
        }

        requestAnimationFrame(() => {
            console.log("🎬 Initial style application.");
            applyStyles();

            const observer = new MutationObserver(() => {
                console.log("🔁 DOM updated, reapplying trial styles.");
                applyStyles();
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            console.log("👁️ MutationObserver activated.");
        });

        setTimeout(() => {
            console.log("⏱️ Fallback: Reapplying styles after delay.");
            applyStyles();
        }, 500);
    });
})();
