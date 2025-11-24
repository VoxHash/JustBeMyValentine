// Sound effects using Web Audio API
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.soundsEnabled = true;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.soundsEnabled = false;
        }
    }

    async resumeAudioContext() {
        if (!this.audioContext) return;
        
        try {
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            // If already running, return success
            return this.audioContext.state === 'running';
        } catch (e) {
            console.warn('Could not resume AudioContext:', e);
            return false;
        }
    }

    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.soundsEnabled || !this.audioContext) return;

        // Ensure AudioContext is running
        if (this.audioContext.state === 'suspended') {
            // Don't try to resume here, it needs user gesture
            return; // Skip this play, will work after user enables audio
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playHeartbeat() {
        if (!this.soundsEnabled) return;
        // Heartbeat sound: two quick beats
        this.playTone(200, 0.1, 'sine', 0.2);
        setTimeout(() => {
            this.playTone(200, 0.1, 'sine', 0.2);
        }, 150);
    }

    playButtonClick() {
        if (!this.soundsEnabled) return;
        // Short click sound
        this.playTone(800, 0.1, 'sine', 0.15);
    }

    playCelebration() {
        if (!this.soundsEnabled) return;
        // Celebration melody
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 0.3, 'sine', 0.25);
            }, index * 150);
        });
    }

    playNoButton() {
        if (!this.soundsEnabled) return;
        // Lower tone for "no"
        this.playTone(300, 0.2, 'sine', 0.15);
    }

    async toggleSounds() {
        this.soundsEnabled = !this.soundsEnabled;
        if (this.soundsEnabled && this.audioContext) {
            await this.resumeAudioContext();
        }
        return this.soundsEnabled;
    }
}

// Create global sound manager instance
const soundManager = new SoundManager();

