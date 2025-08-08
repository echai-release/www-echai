class CookieConsent {
    constructor() {
        this.storageKey = 'echai-cookie-consent';
        this.cookieName = 'echai-cookie-consent'; // Fallback
        this.cookieExpiry = 365; // days
        this.init();
    }    
    
    init() {
        // Check if user has already made a choice
        const consent = this.getConsent();
        if (!consent) {
            this.showBanner();
        } else {
            // Apply stored preferences
            this.applyConsentSettings(consent);
            // Show floating preferences link after consent is given
            this.createFloatingPreferencesLink();
        }
        
        this.bindEvents();
    }

    showBanner() {
        // Create banner HTML
        const bannerHTML = `
            <div id="cookie-consent-banner" class="cookie-consent-banner">
                <div class="cookie-consent-content">
                    <div class="cookie-consent-text">
                        <p>We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies. 
                        <a href="/privacy-policy.html" target="_blank">Learn more about our privacy policy</a>.</p>
                    </div>                    <div class="cookie-consent-buttons">
                        <button id="cookie-accept" class="cookie-consent-btn cookie-consent-accept">Accept All</button>
                        <button id="cookie-decline" class="cookie-consent-btn cookie-consent-decline">Decline</button>
                        <button id="cookie-settings" class="cookie-consent-btn cookie-consent-settings">Customize</button>
                    </div>
                </div>
            </div>
        `;

        // Add banner to page
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        
        // Show banner with animation
        setTimeout(() => {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.classList.add('show');
            }
        }, 100);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-accept') {
                this.acceptCookies();
            } else if (e.target.id === 'cookie-decline') {
                this.declineCookies();
            } else if (e.target.id === 'cookie-settings') {
                this.showSettings();
            }
        });
    }    
    
    acceptCookies() {
        const consentData = {
            status: 'accepted',
            timestamp: Date.now(),
            preferences: {
                essential: true,
                analytics: true,
                marketing: true
            }
        };
        
        this.setConsent(consentData);
        this.hideBanner();
        this.applyConsentSettings(consentData);
        
        // Create floating preferences link for future access
        setTimeout(() => {
            this.createFloatingPreferencesLink();
        }, 500);
    }    
    
    declineCookies() {
        const consentData = {
            status: 'declined',
            timestamp: Date.now(),
            preferences: {
                essential: true,
                analytics: false,
                marketing: false
            }
        };
        
        this.setConsent(consentData);
        this.hideBanner();
        this.applyConsentSettings(consentData);
        
        // Create floating preferences link for future access
        setTimeout(() => {
            this.createFloatingPreferencesLink();
        }, 500);
    }
    
    showSettings() {
        this.createSettingsModal();
    }

    createSettingsModal() {
        // Remove existing modal if present
        const existingModal = document.getElementById('cookie-settings-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const currentConsent = this.getConsent();
        const preferences = currentConsent ? currentConsent.preferences : {
            essential: true,
            analytics: false,
            marketing: false
        };

        const modalHTML = `
            <div id="cookie-settings-modal" class="cookie-settings-modal">
                <div class="cookie-settings-overlay"></div>
                <div class="cookie-settings-content">
                    <div class="cookie-settings-header">
                        <h3>Cookie Preferences</h3>
                        <button class="cookie-settings-close">&times;</button>
                    </div>
                    <div class="cookie-settings-body">
                        <p>We use different types of cookies to optimize your experience on our website. Choose which cookies you allow us to use.</p>
                        
                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <div class="cookie-category-info">
                                    <h4>Essential Cookies</h4>
                                    <p>These cookies are necessary for the website to function and cannot be disabled.</p>
                                </div>
                                <div class="cookie-toggle">
                                    <input type="checkbox" id="essential-toggle" checked disabled>
                                    <label for="essential-toggle" class="toggle-slider disabled"></label>
                                </div>
                            </div>
                        </div>

                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <div class="cookie-category-info">
                                    <h4>Analytics Cookies</h4>
                                    <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
                                </div>
                                <div class="cookie-toggle">
                                    <input type="checkbox" id="analytics-toggle" ${preferences.analytics ? 'checked' : ''}>
                                    <label for="analytics-toggle" class="toggle-slider"></label>
                                </div>
                            </div>
                            <div class="cookie-details">
                                <strong>Used for:</strong> Google Analytics, page views, user behavior analysis
                            </div>
                        </div>

                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <div class="cookie-category-info">
                                    <h4>Marketing Cookies</h4>
                                    <p>Used to deliver personalized content and advertisements relevant to you.</p>
                                </div>
                                <div class="cookie-toggle">
                                    <input type="checkbox" id="marketing-toggle" ${preferences.marketing ? 'checked' : ''}>
                                    <label for="marketing-toggle" class="toggle-slider"></label>
                                </div>
                            </div>
                            <div class="cookie-details">
                                <strong>Used for:</strong> Chatbot personalization, targeted content, advertising
                            </div>
                        </div>
                    </div>
                    <div class="cookie-settings-footer">
                        <button class="cookie-btn cookie-btn-secondary" id="decline-all-settings">Decline All</button>
                        <button class="cookie-btn cookie-btn-secondary" id="accept-all-settings">Accept All</button>
                        <button class="cookie-btn cookie-btn-primary" id="save-settings">Save Preferences</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Show modal with animation
        setTimeout(() => {
            const modal = document.getElementById('cookie-settings-modal');
            if (modal) {
                modal.classList.add('show');
            }
        }, 10);

        this.bindSettingsEvents();
    }

    bindSettingsEvents() {
        const modal = document.getElementById('cookie-settings-modal');
        if (!modal) return;

        // Close modal events
        const closeBtn = modal.querySelector('.cookie-settings-close');
        const overlay = modal.querySelector('.cookie-settings-overlay');
        
        closeBtn?.addEventListener('click', () => this.closeSettingsModal());
        overlay?.addEventListener('click', () => this.closeSettingsModal());

        // Button events
        const declineAllBtn = modal.querySelector('#decline-all-settings');
        const acceptAllBtn = modal.querySelector('#accept-all-settings');
        const saveBtn = modal.querySelector('#save-settings');

        declineAllBtn?.addEventListener('click', () => {
            modal.querySelector('#analytics-toggle').checked = false;
            modal.querySelector('#marketing-toggle').checked = false;
            this.saveSettingsFromModal();
        });

        acceptAllBtn?.addEventListener('click', () => {
            modal.querySelector('#analytics-toggle').checked = true;
            modal.querySelector('#marketing-toggle').checked = true;
            this.saveSettingsFromModal();
        });

        saveBtn?.addEventListener('click', () => this.saveSettingsFromModal());

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSettingsModal();
            }
        });
    }

    saveSettingsFromModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (!modal) return;

        const analyticsChecked = modal.querySelector('#analytics-toggle')?.checked || false;
        const marketingChecked = modal.querySelector('#marketing-toggle')?.checked || false;

        const consentData = {
            status: (analyticsChecked || marketingChecked) ? 'customized' : 'essential-only',
            timestamp: Date.now(),
            preferences: {
                essential: true,
                analytics: analyticsChecked,
                marketing: marketingChecked
            }
        };        this.setConsent(consentData);
        this.applyConsentSettings(consentData);
        this.closeSettingsModal();
        this.hideBanner();
        
        // Show success message
        this.showSuccessMessage('Cookie preferences saved successfully!');
        
        // Ensure floating link is available for future access
        setTimeout(() => {
            this.createFloatingPreferencesLink();
        }, 500);
    }

    closeSettingsModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    showSuccessMessage(message) {
        // Remove existing success message
        const existing = document.getElementById('cookie-success-message');
        if (existing) existing.remove();

        const successHTML = `
            <div id="cookie-success-message" class="cookie-success-message">
                <div class="cookie-success-content">
                    <span class="cookie-success-icon">✓</span>
                    <span class="cookie-success-text">${message}</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', successHTML);
        
        const successEl = document.getElementById('cookie-success-message');
        setTimeout(() => successEl?.classList.add('show'), 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (successEl) {
                successEl.classList.remove('show');
                setTimeout(() => successEl.remove(), 300);
            }
        }, 3000);
    }    
    
    applyConsentSettings(consentData) {
        if (consentData.preferences.analytics) {
            // this.enableAnalytics();
        } else {
            // this.disableAnalytics();
        }
        
        if (consentData.preferences.marketing) {
            // this.enableMarketing();
        } else {
            // this.disableMarketing();
        }
        
        // Essential cookies are always enabled
        this.enableEssential();
        
        // Dispatch custom event for other scripts to listen to
        this.dispatchConsentEvent(consentData);
    }

    dispatchConsentEvent(consentData) {
        const event = new CustomEvent('cookieConsentChanged', {
            detail: {
                status: consentData.status,
                preferences: consentData.preferences,
                timestamp: consentData.timestamp
            }
        });
        document.dispatchEvent(event);
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }    
    
    enableEssential() {
        // Essential functionality always enabled
        console.log('Essential cookies enabled');
    }

    enableAnalytics() {
        // Enable Google Analytics and other analytics
        console.log('Analytics enabled');
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    disableAnalytics() {
        console.log('Analytics disabled');
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    enableMarketing() {
        // Enable marketing/advertising cookies
        console.log('Marketing enabled');
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted'
            });
        }
        
        // Enable chatbot tracking if needed
        if (window.EChaiCopilot) {
            console.log('Chatbot marketing tracking enabled');
        }
    }

    disableMarketing() {
        console.log('Marketing disabled');
        
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied'
            });
        }
    }    

    // Modern storage methods with fallback
    setConsent(consentData) {
        try {
            // Primary: localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(consentData));
            
            // Fallback: cookie (for server-side access if needed)
            this.setCookie(this.cookieName, consentData.status, this.cookieExpiry);
        } catch (e) {
            // If localStorage fails, use cookie only
            console.warn('localStorage not available, using cookie fallback');
            this.setCookie(this.cookieName, consentData.status, this.cookieExpiry);
        }
    }

    getConsent() {
        try {
            // Primary: localStorage
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const consentData = JSON.parse(stored);
                
                // Check if consent is expired (older than 1 year)
                const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
                if (consentData.timestamp && consentData.timestamp > oneYearAgo) {
                    return consentData;
                } else {
                    // Expired consent, remove it
                    this.clearConsent();
                    return null;
                }
            }
        } catch (e) {
            console.warn('localStorage not available, checking cookie fallback');
        }
        
        // Fallback: check cookie
        const cookieValue = this.getCookie(this.cookieName);
        if (cookieValue) {
            return {
                status: cookieValue,
                timestamp: Date.now(),
                preferences: {
                    essential: true,
                    analytics: cookieValue === 'accepted',
                    marketing: cookieValue === 'accepted'
                }
            };
        }
        
        return null;
    }

    clearConsent() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (e) {
            console.warn('localStorage not available for clearing');
        }
        
        // Clear cookie
        this.setCookie(this.cookieName, '', -1);
    }

    // Cookie helper methods (for fallback)
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Utility method to check storage availability
    isStorageAvailable(type) {
        try {
            const storage = window[type];
            const test = '__storage_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
   }    

   // Public method to show consent banner again (for settings page)
    showConsentBanner() {
        this.showBanner();
    }

    // Public method to get current consent status
    getCurrentConsent() {
        return this.getConsent();
    }

    // Public method to update specific preferences
    updatePreferences(preferences) {
        const currentConsent = this.getConsent();
        if (currentConsent) {
            currentConsent.preferences = { ...currentConsent.preferences, ...preferences };
            currentConsent.timestamp = Date.now();
            this.setConsent(currentConsent);
            this.applyConsentSettings(currentConsent);        }
    }

    // Create floating preferences link for easy access
    createFloatingPreferencesLink() {
        // Don't create if one already exists
        if (document.getElementById('cookie-preferences-float')) {
            return;
        }

        const floatingLink = document.createElement('a');
        floatingLink.id = 'cookie-preferences-float';
        floatingLink.className = 'cookie-preferences-link';
        floatingLink.href = '#';
        floatingLink.innerHTML = '<span class="cookie-icon">🍪</span> Cookie Preferences';
        floatingLink.setAttribute('aria-label', 'Manage cookie preferences');
        
        floatingLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.openSettings();
        });

        document.body.appendChild(floatingLink);

        // Add show animation after a brief delay
        setTimeout(() => {
            floatingLink.classList.add('show');
        }, 1000);
    }

    // Public method to open settings modal
    openSettings() {
        this.createSettingsModal();
    }

    // Public method to reset all consent (for testing or user request)
    resetConsent() {
        this.clearConsent();
        // Show banner again
        this.showBanner();
    }

    // Public method to check if a specific cookie category is allowed
    isAllowed(category) {
        const consent = this.getConsent();
        return consent?.preferences?.[category] || false;
    }

    // Public method to get consent summary
    getConsentSummary() {
        const consent = this.getConsent();
        if (!consent) {
            return {
                hasConsent: false,
                status: 'no-consent',
                lastUpdated: null,
                preferences: null
            };
        }
        
        return {
            hasConsent: true,
            status: consent.status,
            lastUpdated: new Date(consent.timestamp),
            preferences: consent.preferences,
            daysUntilExpiry: Math.ceil((consent.timestamp + (365 * 24 * 60 * 60 * 1000) - Date.now()) / (24 * 60 * 60 * 1000))
        };
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enterpriseChaiConsent = new CookieConsent();
});
