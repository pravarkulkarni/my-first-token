class WorldClock {
    constructor() {
        this.currentTimezone = null;
        this.savedLocations = [];
        this.updateInterval = null;
        this.init();
    }

    async init() {
        await this.loadSettings();
        this.setupEventListeners();
        this.startClock();
        this.renderSavedLocations();
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get(['currentTimezone', 'savedLocations']);
            this.currentTimezone = result.currentTimezone || null;
            this.savedLocations = result.savedLocations || [];
            
            if (this.currentTimezone) {
                document.getElementById('timezoneSelect').value = this.currentTimezone;
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    async saveSettings() {
        try {
            await chrome.storage.sync.set({
                currentTimezone: this.currentTimezone,
                savedLocations: this.savedLocations
            });
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    setupEventListeners() {
        const timezoneSelect = document.getElementById('timezoneSelect');
        const saveButton = document.getElementById('saveButton');
        const clearButton = document.getElementById('clearButton');

        timezoneSelect.addEventListener('change', (e) => {
            this.currentTimezone = e.target.value;
            this.updateDisplay();
        });

        saveButton.addEventListener('click', () => {
            this.saveCurrentLocation();
        });

        clearButton.addEventListener('click', () => {
            this.clearCurrentSelection();
        });
    }

    startClock() {
        this.updateDisplay();
        // Update every second
        this.updateInterval = setInterval(() => {
            this.updateDisplay();
            this.updateSavedLocationTimes();
        }, 1000);
    }

    updateDisplay() {
        const timeElement = document.getElementById('currentTime');
        const locationElement = document.getElementById('currentLocation');
        const dateElement = document.getElementById('currentDate');

        if (!this.currentTimezone) {
            timeElement.textContent = '--:--:--';
            locationElement.textContent = 'Select a timezone';
            dateElement.textContent = '--- --, ----';
            return;
        }

        try {
            const now = new Date();
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: this.currentTimezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const dateFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: this.currentTimezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            timeElement.textContent = timeFormatter.format(now);
            locationElement.textContent = this.getLocationName(this.currentTimezone);
            dateElement.textContent = dateFormatter.format(now);
        } catch (error) {
            console.error('Error formatting time:', error);
            timeElement.textContent = 'Error';
            locationElement.textContent = 'Invalid timezone';
            dateElement.textContent = 'Error';
        }
    }

    getLocationName(timezone) {
        const select = document.getElementById('timezoneSelect');
        const option = select.querySelector(`option[value="${timezone}"]`);
        return option ? option.textContent : timezone.replace(/_/g, ' ');
    }

    async saveCurrentLocation() {
        if (!this.currentTimezone) {
            this.showNotification('Please select a timezone first', 'error');
            return;
        }

        // Check if location already exists
        const exists = this.savedLocations.some(loc => loc.timezone === this.currentTimezone);
        if (exists) {
            this.showNotification('Location already saved', 'warning');
            return;
        }

        const locationData = {
            timezone: this.currentTimezone,
            name: this.getLocationName(this.currentTimezone),
            id: Date.now().toString()
        };

        this.savedLocations.push(locationData);
        await this.saveSettings();
        this.renderSavedLocations();
        this.showNotification('Location saved!', 'success');
    }

    async removeLocation(locationId) {
        this.savedLocations = this.savedLocations.filter(loc => loc.id !== locationId);
        await this.saveSettings();
        this.renderSavedLocations();
        this.showNotification('Location removed', 'info');
    }

    clearCurrentSelection() {
        this.currentTimezone = null;
        document.getElementById('timezoneSelect').value = '';
        this.updateDisplay();
        this.saveSettings();
    }

    renderSavedLocations() {
        const container = document.getElementById('locationsList');
        
        if (this.savedLocations.length === 0) {
            container.innerHTML = '<div class="empty-state">No saved locations</div>';
            return;
        }

        container.innerHTML = this.savedLocations.map(location => `
            <div class="location-item" data-timezone="${location.timezone}">
                <div>
                    <div class="location-name">${location.name}</div>
                    <div class="location-time" id="time-${location.id}">--:--:--</div>
                </div>
                <button class="delete-btn" data-id="${location.id}">×</button>
            </div>
        `).join('');

        // Add event listeners for location items and delete buttons
        container.querySelectorAll('.location-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-btn')) {
                    const timezone = item.dataset.timezone;
                    this.currentTimezone = timezone;
                    document.getElementById('timezoneSelect').value = timezone;
                    this.updateDisplay();
                    this.saveSettings();
                }
            });
        });

        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const locationId = btn.dataset.id;
                this.removeLocation(locationId);
            });
        });

        this.updateSavedLocationTimes();
    }

    updateSavedLocationTimes() {
        this.savedLocations.forEach(location => {
            const timeElement = document.getElementById(`time-${location.id}`);
            if (timeElement) {
                try {
                    const now = new Date();
                    const formatter = new Intl.DateTimeFormat('en-US', {
                        timeZone: location.timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    });
                    timeElement.textContent = formatter.format(now);
                } catch (error) {
                    timeElement.textContent = 'Error';
                }
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create a simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 15px;
            border-radius: 5px;
            color: white;
            font-size: 12px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const colors = {
            success: '#2ecc71',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };

        notification.style.backgroundColor = colors[type] || colors.info;
        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => notification.style.opacity = '1', 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize the world clock when the popup opens
document.addEventListener('DOMContentLoaded', () => {
    window.worldClock = new WorldClock();
});

// Clean up when popup closes
window.addEventListener('beforeunload', () => {
    if (window.worldClock) {
        window.worldClock.destroy();
    }
});