// Global state
let currentLanguage = localStorage.getItem('language') || 'en';
let currentTheme = localStorage.getItem('theme') || 'default';
let currentAnimation = localStorage.getItem('animation') || 'default';
let uploadedPhoto = null;
let isSender = false;
let shareToken = null;

// Check if user is sender or recipient
function checkUserMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const sender = urlParams.get('sender');
    
    if (sender === 'true' || !token) {
        // User is the sender (no token or explicit sender param)
        isSender = true;
        shareToken = generateShareToken();
        // Update URL to include sender mode
        if (!urlParams.has('sender')) {
            updateURLParam('sender', 'true');
        }
        if (!urlParams.has('token')) {
            updateURLParam('token', shareToken);
        } else {
            shareToken = token;
        }
    } else {
        // User is recipient (has token, no sender param)
        isSender = false;
        shareToken = token;
        loadSharedSettings(token);
    }
}

// Generate unique share token
function generateShareToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Update URL parameter
function updateURLParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.replaceState({}, '', url);
}

// Load shared settings from localStorage using token
function loadSharedSettings(token) {
    try {
        const sharedData = localStorage.getItem(`valentine_${token}`);
        if (sharedData) {
            const data = JSON.parse(sharedData);
            if (data.theme) currentTheme = data.theme;
            if (data.language) currentLanguage = data.language;
            if (data.animation) currentAnimation = data.animation;
            if (data.photo) uploadedPhoto = data.photo;
            
            // Apply loaded settings
            applyTheme(currentTheme);
            updateLanguage(currentLanguage);
            applyAnimation(currentAnimation);
            if (uploadedPhoto) {
                displayPhotoForRecipient(uploadedPhoto);
            }
        }
    } catch (e) {
        console.warn('Could not load shared settings:', e);
    }
}

// Save settings for sharing
function saveSettingsForSharing() {
    const shareData = {
        theme: currentTheme,
        language: currentLanguage,
        animation: currentAnimation,
        photo: uploadedPhoto,
        timestamp: new Date().toISOString()
    };
    
    try {
        localStorage.setItem(`valentine_${shareToken}`, JSON.stringify(shareData));
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            // Try without photo
            delete shareData.photo;
            try {
                localStorage.setItem(`valentine_${shareToken}`, JSON.stringify(shareData));
                return true;
            } catch (e2) {
                return false;
            }
        }
        return false;
    }
}

// Display photo for recipient (read-only)
function displayPhotoForRecipient(photoData) {
    const photoDisplayContainer = document.getElementById('photoDisplayContainer');
    const photoDisplayPreview = document.getElementById('photoDisplayPreview');
    
    if (photoDisplayContainer && photoDisplayPreview) {
        const img = document.createElement('img');
        img.src = photoData;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        
        photoDisplayPreview.innerHTML = '';
        photoDisplayPreview.appendChild(img);
        photoDisplayContainer.style.display = 'block';
    }
}

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ff4757'
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: 6,
            random: true
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: true,
            out_mode: 'out'
        }
    }
});

// DOM Elements
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const content = document.querySelector('.content');
const celebration = document.querySelector('.celebration');
const container = document.querySelector('.container');
const heartElement = document.getElementById('heartElement');
const languageSelect = document.getElementById('languageSelect');
const themeSelect = document.getElementById('themeSelect');
const animationSelect = document.getElementById('animationSelect');
const soundToggle = document.getElementById('soundToggle');
const photoInput = document.getElementById('photoInput');
const photoUploadBtn = document.getElementById('photoUploadBtn');
const photoPreview = document.getElementById('photoPreview');
const shareBtn = document.getElementById('shareBtn');
const saveBtn = document.getElementById('saveBtn');
const exportBtn = document.getElementById('exportBtn');
const shareModal = document.getElementById('shareModal');
const closeShareModal = document.getElementById('closeShareModal');
const shareFacebook = document.getElementById('shareFacebook');
const shareTwitter = document.getElementById('shareTwitter');
const shareWhatsApp = document.getElementById('shareWhatsApp');
const copyLinkBtn = document.getElementById('copyLinkBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check user mode first
    checkUserMode();
    
    // Show/hide UI elements based on mode
    setupUIVisibility();
    
    initializeLanguage();
    initializeTheme();
    initializeAnimation();
    initializeSound();
    initializePhotoUpload();
    initializeShareButtons();
    setupEventListeners();
    initializeAudioOverlay();
    initializeLinkGeneration();
});

// Setup UI visibility based on sender/recipient mode
function setupUIVisibility() {
    const controlsPanel = document.getElementById('controlsPanel');
    const photoUploadContainer = document.getElementById('photoUploadContainer');
    const photoDisplayContainer = document.getElementById('photoDisplayContainer');
    const senderModeIndicator = document.getElementById('senderModeIndicator');
    const saveBtn = document.getElementById('saveBtn');
    
    if (isSender) {
        // Sender mode: show controls and upload
        if (controlsPanel) controlsPanel.style.display = 'flex';
        if (photoUploadContainer) photoUploadContainer.style.display = 'block';
        if (photoDisplayContainer) photoDisplayContainer.style.display = 'none';
        if (senderModeIndicator) senderModeIndicator.style.display = 'flex';
        if (saveBtn) saveBtn.style.display = 'block';
    } else {
        // Recipient mode: hide controls and upload, show display
        if (controlsPanel) controlsPanel.style.display = 'none';
        if (photoUploadContainer) photoUploadContainer.style.display = 'none';
        if (photoDisplayContainer && uploadedPhoto) {
            photoDisplayContainer.style.display = 'block';
        }
        if (senderModeIndicator) senderModeIndicator.style.display = 'none';
        if (saveBtn) saveBtn.style.display = 'none';
    }
}

// Link Generation
function initializeLinkGeneration() {
    const generateLinkBtn = document.getElementById('generateLinkBtn');
    const linkModal = document.getElementById('linkModal');
    const closeLinkModal = document.getElementById('closeLinkModal');
    const copyLinkInputBtn = document.getElementById('copyLinkInputBtn');
    const generatedLink = document.getElementById('generatedLink');
    
    if (generateLinkBtn) {
        generateLinkBtn.addEventListener('click', () => {
            showLinkGenerationModal();
        });
    }
    
    if (closeLinkModal) {
        closeLinkModal.addEventListener('click', () => {
            if (linkModal) linkModal.style.display = 'none';
        });
    }
    
    if (linkModal) {
        linkModal.addEventListener('click', (e) => {
            if (e.target === linkModal) {
                linkModal.style.display = 'none';
            }
        });
    }
    
    if (copyLinkInputBtn && generatedLink) {
        copyLinkInputBtn.addEventListener('click', () => {
            generatedLink.select();
            navigator.clipboard.writeText(generatedLink.value).then(() => {
                copyLinkInputBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyLinkInputBtn.textContent = 'Copy';
                }, 2000);
            });
        });
    }
}

function showLinkGenerationModal() {
    // Save current settings for sharing
    if (!saveSettingsForSharing()) {
        alert('Unable to save settings. Please try again.');
        return;
    }
    
    // Generate shareable URL
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?token=${shareToken}`;
    
    const linkModal = document.getElementById('linkModal');
    const generatedLink = document.getElementById('generatedLink');
    
    if (linkModal && generatedLink) {
        generatedLink.value = shareUrl;
        linkModal.style.display = 'flex';
    }
}

// Audio Enable Overlay
function initializeAudioOverlay() {
    const audioEnableOverlay = document.getElementById('audioEnableOverlay');
    const audioEnableBtn = document.getElementById('audioEnableBtn');
    let heartbeatInterval = null;
    let audioEnabled = false;
    
    const enableAudio = async () => {
        if (audioEnabled) return;
        audioEnabled = true;
        
        // Resume audio context
        await soundManager.resumeAudioContext();
        
        // Hide overlay with animation
        if (audioEnableOverlay) {
            gsap.to(audioEnableOverlay, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    audioEnableOverlay.classList.add('hidden');
                }
            });
        }
        
        // Start heartbeat interval
        if (!heartbeatInterval) {
            heartbeatInterval = setInterval(() => {
                if (soundManager.soundsEnabled) {
                    soundManager.playHeartbeat();
                }
            }, 1400);
        }
        
        // Play a welcome sound
        soundManager.playTone(523.25, 0.2, 'sine', 0.2);
        setTimeout(() => {
            soundManager.playTone(659.25, 0.2, 'sine', 0.2);
        }, 200);
    };
    
    // Enable on button click
    if (audioEnableBtn) {
        audioEnableBtn.addEventListener('click', enableAudio);
    }
    
    // Also enable on any click/touch on the overlay
    if (audioEnableOverlay) {
        audioEnableOverlay.addEventListener('click', (e) => {
            if (e.target === audioEnableOverlay) {
                enableAudio();
            }
        });
    }
    
    // Check if user has already interacted (for returning visitors)
    // If sounds were enabled before, skip the overlay
    const savedSoundState = localStorage.getItem('soundsEnabled');
    if (savedSoundState === 'true') {
        // Still need user interaction, but we can make it less intrusive
        // Show overlay but allow immediate enable
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('touchstart', enableAudio, { once: true });
    }
}

// Language Management
function initializeLanguage() {
    languageSelect.value = currentLanguage;
    updateLanguage(currentLanguage);
}

function updateLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.type === 'file') {
                // Skip file inputs
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    document.documentElement.lang = lang;
    
    // Save to shared settings if sender
    if (isSender && shareToken) {
        saveSettingsForSharing();
    }
}

// Theme Management
function initializeTheme() {
    themeSelect.value = currentTheme;
    applyTheme(currentTheme);
}

function applyTheme(themeName) {
    currentTheme = themeName;
    localStorage.setItem('theme', themeName);
    
    const theme = themes[themeName];
    if (!theme) return;
    
    document.body.style.background = theme.gradient;
    document.body.style.backgroundSize = '400% 400%';
    
    // Update particle color
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        window.pJSDom[0].pJS.particles.color.value = theme.particleColor;
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
    
    // Update heart gradient
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.style.background = theme.heartGradient;
        heart.querySelectorAll(':before, :after').forEach(pseudo => {
            // Note: CSS pseudo-elements can't be directly styled via JS
        });
    }
    
    // Update title gradient via CSS variable
    document.documentElement.style.setProperty('--title-gradient', theme.titleGradient);
    
    // Save to shared settings if sender
    if (isSender && shareToken) {
        saveSettingsForSharing();
    }
}

// Animation Preset Management
function initializeAnimation() {
    animationSelect.value = currentAnimation;
    applyAnimation(currentAnimation);
}

function applyAnimation(animationName) {
    currentAnimation = animationName;
    localStorage.setItem('animation', animationName);
    
    const heart = heartElement;
    if (!heart) return;
    
    // Remove all animation classes
    heart.className = 'heart';
    
    if (animationName !== 'default') {
        heart.classList.add(animationName);
    }
    
    // Save to shared settings if sender
    if (isSender && shareToken) {
        saveSettingsForSharing();
    }
}

// Sound Management
function initializeSound() {
    const savedSoundState = localStorage.getItem('soundsEnabled');
    if (savedSoundState !== null) {
        soundManager.soundsEnabled = savedSoundState === 'true';
        soundToggle.checked = soundManager.soundsEnabled;
    }
}

// Photo Upload Management
function initializePhotoUpload() {
    try {
        const savedPhoto = localStorage.getItem('uploadedPhoto');
        if (savedPhoto) {
            displayPhoto(savedPhoto);
        }
    } catch (e) {
        console.warn('Could not load saved photo:', e);
    }
}

function compressImage(file, maxWidth = 400, maxHeight = 400, quality = 0.8) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function displayPhoto(photoData) {
    const img = document.createElement('img');
    img.src = photoData;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    
    const placeholder = photoPreview.querySelector('.photo-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    photoPreview.innerHTML = '';
    photoPreview.appendChild(img);
    
    const changeBtn = document.createElement('button');
    changeBtn.className = 'photo-upload-btn';
    changeBtn.textContent = translations[currentLanguage].changePhoto || 'Change Photo';
    changeBtn.onclick = () => photoInput.click();
    photoPreview.appendChild(changeBtn);
    
    uploadedPhoto = photoData;
}

// Share Functionality
function initializeShareButtons() {
    // Use the shareable link if sender, otherwise use current URL
    const shareUrl = isSender && shareToken 
        ? `${window.location.origin}${window.location.pathname}?token=${shareToken}`
        : window.location.href;
    
    const title = translations[currentLanguage].title || 'Will You Be My Valentine?';
    const text = translations[currentLanguage].message || 'Every moment with you makes my heart skip a beat...';
    
    if (shareFacebook) {
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    }
    if (shareTwitter) {
        shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    }
    if (shareWhatsApp) {
        shareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Language selector
    languageSelect.addEventListener('change', (e) => {
        updateLanguage(e.target.value);
    });
    
    // Theme selector
    themeSelect.addEventListener('change', (e) => {
        applyTheme(e.target.value);
    });
    
    // Animation selector
    animationSelect.addEventListener('change', (e) => {
        applyAnimation(e.target.value);
    });
    
    // Sound toggle
    soundToggle.addEventListener('change', async (e) => {
        const enabled = await soundManager.toggleSounds();
        localStorage.setItem('soundsEnabled', enabled);
    });
    
    // Photo upload
    photoUploadBtn.addEventListener('click', () => {
        photoInput.click();
    });
    
    photoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Compress image before saving
                const compressedPhoto = await compressImage(file);
                displayPhoto(compressedPhoto);
                
                // Try to save, but handle quota errors
                try {
                    localStorage.setItem('uploadedPhoto', compressedPhoto);
                    // Also save to shared settings if sender
                    if (isSender && shareToken) {
                        saveSettingsForSharing();
                    }
                } catch (storageError) {
                    if (storageError.name === 'QuotaExceededError') {
                        console.warn('Photo too large for localStorage, using in-memory only');
                        // Photo is stored in uploadedPhoto variable, just not in localStorage
                    } else {
                        throw storageError;
                    }
                }
            } catch (error) {
                console.error('Error processing photo:', error);
                alert('Error processing photo. Please try a smaller image.');
            }
        }
    });
    
    // Share button
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (isSender) {
                // For sender, show link generation modal
                showLinkGenerationModal();
            } else {
                // For recipient, show social share modal
                if (shareModal) {
                    shareModal.style.display = 'flex';
                }
            }
        });
    }
    
    closeShareModal.addEventListener('click', () => {
        shareModal.style.display = 'none';
    });
    
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            shareModal.style.display = 'none';
        }
    });
    
    // Copy link
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const shareUrl = isSender && shareToken 
                ? `${window.location.origin}${window.location.pathname}?token=${shareToken}`
                : window.location.href;
            
            navigator.clipboard.writeText(shareUrl).then(() => {
                copyLinkBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyLinkBtn.textContent = 'Copy Link';
                }, 2000);
            });
        });
    }
    
    // Save button
    saveBtn.addEventListener('click', () => {
        saveToLocalStorage();
    });
    
    // Export button
    exportBtn.addEventListener('click', () => {
        exportAsImage();
    });
    
    // No button interactions
noBtn.addEventListener('mouseover', () => {
        soundManager.playNoButton();
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    gsap.to(noBtn, {
        x: randomX,
        y: randomY,
        duration: 0.3,
        ease: 'power1.out'
    });
    
    noBtnClickCount++;
    if (noBtnClickCount > 2) {
        gsap.to(noBtn, {
            scale: Math.max(0.5, 1 - (noBtnClickCount * 0.1)),
            duration: 0.3
        });
    }
});

    // Yes button click
yesBtn.addEventListener('click', () => {
        soundManager.playButtonClick();
        soundManager.playCelebration();
    createConfetti();
    
    gsap.to(content, {
        opacity: 0,
        scale: 1.1,
        duration: 0.5,
        ease: 'back.in',
        onComplete: () => {
            setTimeout(() => {
                window.location.href = 'poem.html';
            }, 500);
        }
    });
});
    
    // Button click sounds
    document.querySelectorAll('.btn, .action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            soundManager.playButtonClick();
        });
    });
}

let noBtnClickCount = 0;

// Save to Local Storage
function saveToLocalStorage() {
    try {
        const saveData = {
            language: currentLanguage,
            theme: currentTheme,
            animation: currentAnimation,
            timestamp: new Date().toISOString()
        };
        
        // Only include photo if it's small enough (estimate: ~1MB max for all data)
        // Check size before including photo
        if (uploadedPhoto) {
            const photoSize = uploadedPhoto.length;
            const estimatedSize = JSON.stringify(saveData).length + photoSize;
            
            // localStorage typically has ~5-10MB limit, but we'll be conservative
            if (estimatedSize < 2000000) { // 2MB limit
                saveData.photo = uploadedPhoto;
            } else {
                console.warn('Photo too large to save, saving settings only');
            }
        }
        
        localStorage.setItem('valentineProposal', JSON.stringify(saveData));
        
        // Show feedback
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        setTimeout(() => {
            saveBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            // Try saving without photo
            try {
                const saveData = {
                    language: currentLanguage,
                    theme: currentTheme,
                    animation: currentAnimation,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('valentineProposal', JSON.stringify(saveData));
                
                const originalText = saveBtn.textContent;
                saveBtn.textContent = 'Saved (photo excluded)';
                setTimeout(() => {
                    saveBtn.textContent = originalText;
                }, 2000);
            } catch (e) {
                alert('Unable to save: Storage quota exceeded. Please clear some space.');
            }
        } else {
            console.error('Error saving:', error);
            alert('Error saving data. Please try again.');
        }
    }
}

// Export as Image
function exportAsImage() {
    if (typeof html2canvas === 'undefined') {
        alert('Export feature requires html2canvas library. Please ensure it is loaded.');
        return;
    }
    
    exportBtn.textContent = 'Exporting...';
    exportBtn.disabled = true;
    
    // Get current theme colors
    const theme = themes[currentTheme] || themes.default;
    const gradientColors = theme.gradient;
    
    // Create a temporary export wrapper
    const exportWrapper = document.createElement('div');
    exportWrapper.id = 'exportWrapper';
    exportWrapper.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${gradientColors};
        background-size: 400% 400%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        padding: 40px;
        box-sizing: border-box;
    `;
    
    // Clone the container
    const containerClone = container.cloneNode(true);
    containerClone.style.cssText = container.style.cssText;
    containerClone.style.position = 'relative';
    containerClone.style.zIndex = '1';
    containerClone.style.margin = '0';
    containerClone.style.maxWidth = '600px';
    containerClone.style.width = '100%';
    // Ensure container background is visible for export
    containerClone.style.background = 'rgba(255, 255, 255, 0.25)';
    containerClone.style.backdropFilter = 'blur(20px) saturate(180%)';
    
    // Hide action buttons and controls in the clone
    const actionButtons = containerClone.querySelector('.action-buttons');
    if (actionButtons) actionButtons.style.display = 'none';
    
    // Handle photo display: show only if photo exists, hide all photo elements if no photo
    const photoUploadContainer = containerClone.querySelector('#photoUploadContainer');
    const photoDisplayContainer = containerClone.querySelector('#photoDisplayContainer');
    const photoDisplayPreview = containerClone.querySelector('#photoDisplayPreview');
    const photoPreview = containerClone.querySelector('#photoPreview');
    
    if (uploadedPhoto) {
        // Photo exists: hide upload container, show display container with photo
        if (photoUploadContainer) photoUploadContainer.style.display = 'none';
        
        if (photoDisplayContainer && photoDisplayPreview) {
            photoDisplayContainer.style.display = 'block';
            
            // Check if photo already exists in upload container, or create it in display container
            const existingImg = photoPreview ? photoPreview.querySelector('img') : null;
            
            if (existingImg) {
                // Copy the image from upload container to display container
                const imgClone = existingImg.cloneNode(true);
                imgClone.style.width = '100%';
                imgClone.style.height = '100%';
                imgClone.style.objectFit = 'cover';
                imgClone.style.borderRadius = '50%';
                photoDisplayPreview.innerHTML = '';
                photoDisplayPreview.appendChild(imgClone);
            } else {
                // Create new image element in display container
                const img = document.createElement('img');
                img.src = uploadedPhoto;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '50%';
                photoDisplayPreview.innerHTML = '';
                photoDisplayPreview.appendChild(img);
            }
        }
    } else {
        // No photo: hide both containers
        if (photoUploadContainer) photoUploadContainer.style.display = 'none';
        if (photoDisplayContainer) photoDisplayContainer.style.display = 'none';
    }
    
    // Ensure all text is visible
    const title = containerClone.querySelector('.title');
    if (title) {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }
    
    const message = containerClone.querySelector('.message');
    if (message) {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
    }
    
    const buttons = containerClone.querySelector('.buttons');
    if (buttons) {
        buttons.style.opacity = '1';
        buttons.style.transform = 'translateY(0)';
    }
    
    // Ensure heart is visible
    const heart = containerClone.querySelector('.heart');
    if (heart) {
        heart.style.animation = 'none';
        heart.style.transform = 'rotate(-45deg) scale(1)';
    }
    
    // Append to wrapper
    exportWrapper.appendChild(containerClone);
    document.body.appendChild(exportWrapper);
    
    // Wait a moment for rendering
    setTimeout(() => {
        html2canvas(exportWrapper, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            logging: false,
            width: exportWrapper.offsetWidth,
            height: exportWrapper.offsetHeight,
            windowWidth: exportWrapper.scrollWidth,
            windowHeight: exportWrapper.scrollHeight
        }).then(canvas => {
            // Create download link
            const link = document.createElement('a');
            link.download = 'valentine-proposal.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
            
            // Clean up
            document.body.removeChild(exportWrapper);
            
            exportBtn.textContent = translations[currentLanguage].export || 'Export';
            exportBtn.disabled = false;
        }).catch(err => {
            console.error('Export failed:', err);
            document.body.removeChild(exportWrapper);
            exportBtn.textContent = translations[currentLanguage].export || 'Export';
            exportBtn.disabled = false;
            alert('Export failed. Please try again.');
        });
    }, 100);
}

// Function to create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    celebration.appendChild(heartsContainer);
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heartsContainer.appendChild(heart);

        gsap.to(heart, {
            y: '-100vh',
            rotation: Math.random() * 360,
            duration: Math.random() * 2 + 2,
            ease: 'power1.out',
            repeat: -1
        });
    }
}

// Function to create confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#ff4757', '#ff6b6b', '#ff8f8f'][Math.floor(Math.random() * 3)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        container.appendChild(confetti);

        gsap.to(confetti, {
            y: '100vh',
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 520,
            duration: Math.random() * 1 + 1,
            ease: 'power1.out',
            onComplete: () => confetti.remove()
        });
    }
}
