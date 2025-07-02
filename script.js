// YouTube Embed Link Generator Script

class YouTubeEmbedGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.youtubeUrlInput = document.getElementById('youtubeUrl');
        this.parseUrlBtn = document.getElementById('parseUrl');
        this.generateBtn = document.getElementById('generateEmbed');
        this.copyBtn = document.getElementById('copyCode');
        this.outputSection = document.getElementById('output');
        this.embedCodeTextarea = document.getElementById('embedCode');
        this.previewContainer = document.getElementById('previewContainer');
        
        // Options
        this.autoplay = document.getElementById('autoplay');
        this.controls = document.getElementById('controls');
        this.showinfo = document.getElementById('showinfo');
        this.loop = document.getElementById('loop');
        this.modestbranding = document.getElementById('modestbranding');
        this.startTime = document.getElementById('startTime');
        this.endTime = document.getElementById('endTime');
        this.width = document.getElementById('width');
        this.height = document.getElementById('height');
        this.privacyMode = document.getElementById('privacyMode');
    }

    bindEvents() {
        this.parseUrlBtn.addEventListener('click', () => this.parseYouTubeUrl());
        this.generateBtn.addEventListener('click', () => this.generateEmbedCode());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.youtubeUrlInput.addEventListener('input', () => this.clearMessages());
        this.youtubeUrlInput.addEventListener('paste', () => {
            setTimeout(() => this.parseYouTubeUrl(), 100);
        });
    }

    parseYouTubeUrl() {
        const url = this.youtubeUrlInput.value.trim();
        if (!url) {
            this.showMessage('Please enter a YouTube URL', 'error');
            return;
        }

        const videoId = this.extractVideoId(url);
        if (!videoId) {
            this.showMessage('Invalid YouTube URL. Please enter a valid YouTube video URL.', 'error');
            return;
        }

        this.showMessage('YouTube URL parsed successfully!', 'success');
        
        // Extract timestamp if present in URL
        const timestamp = this.extractTimestamp(url);
        if (timestamp) {
            this.startTime.value = timestamp;
        }
    }

    extractVideoId(url) {
        // YouTube URL patterns
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    }

    extractTimestamp(url) {
        // Extract timestamp from URL (t=123s or start=123)
        const timePatterns = [
            /[?&]t=(\d+)/,
            /[?&]start=(\d+)/,
            /[?&]t=(\d+)s/
        ];

        for (const pattern of timePatterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return parseInt(match[1]);
            }
        }
        return null;
    }

    generateEmbedCode() {
        const url = this.youtubeUrlInput.value.trim();
        if (!url) {
            this.showMessage('Please enter a YouTube URL first', 'error');
            return;
        }

        const videoId = this.extractVideoId(url);
        if (!videoId) {
            this.showMessage('Invalid YouTube URL', 'error');
            return;
        }

        const embedUrl = this.buildEmbedUrl(videoId);
        const embedCode = this.buildEmbedCode(embedUrl);

        this.embedCodeTextarea.value = embedCode;
        this.showPreview(embedUrl);
        this.outputSection.style.display = 'block';
        this.showMessage('Embed code generated successfully!', 'success');
    }

    buildEmbedUrl(videoId) {
        const baseUrl = this.privacyMode.checked 
            ? 'https://www.youtube-nocookie.com/embed/' 
            : 'https://www.youtube.com/embed/';
        
        const params = new URLSearchParams();

        // Player controls
        if (this.autoplay.checked) params.set('autoplay', '1');
        if (!this.controls.checked) params.set('controls', '0');
        if (!this.showinfo.checked) params.set('showinfo', '0');
        if (this.loop.checked) {
            params.set('loop', '1');
            params.set('playlist', videoId); // Required for loop to work
        }
        if (this.modestbranding.checked) params.set('modestbranding', '1');

        // Timing
        const startTime = parseInt(this.startTime.value);
        if (startTime && startTime > 0) params.set('start', startTime.toString());
        
        const endTime = parseInt(this.endTime.value);
        if (endTime && endTime > 0) params.set('end', endTime.toString());

        const queryString = params.toString();
        return baseUrl + videoId + (queryString ? '?' + queryString : '');
    }

    buildEmbedCode(embedUrl) {
        const width = this.width.value || '560';
        const height = this.height.value || '315';

        return `<iframe width="${width}" height="${height}" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    }

    showPreview(embedUrl) {
        const width = Math.min(parseInt(this.width.value) || 560, 560);
        const height = Math.min(parseInt(this.height.value) || 315, 315);
        
        this.previewContainer.innerHTML = `
            <iframe width="${width}" height="${height}" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
    }

    async copyToClipboard() {
        const embedCode = this.embedCodeTextarea.value;
        if (!embedCode) {
            this.showMessage('No embed code to copy', 'error');
            return;
        }

        try {
            await navigator.clipboard.writeText(embedCode);
            this.showMessage('Embed code copied to clipboard!', 'success');
            
            // Visual feedback
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = 'Copied!';
            this.copyBtn.style.background = '#28a745';
            
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
                this.copyBtn.style.background = '#28a745';
            }, 2000);
        } catch (err) {
            // Fallback for older browsers
            this.embedCodeTextarea.select();
            document.execCommand('copy');
            this.showMessage('Embed code copied to clipboard!', 'success');
        }
    }

    showMessage(text, type) {
        this.clearMessages();
        
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        const form = document.getElementById('embedForm');
        form.insertBefore(message, form.firstChild);
        
        // Auto-remove success messages after 3 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 3000);
        }
    }

    clearMessages() {
        const messages = document.querySelectorAll('.message');
        messages.forEach(message => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        });
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new YouTubeEmbedGenerator();
});

// Add some utility functions for enhanced user experience
document.addEventListener('DOMContentLoaded', () => {
    // Auto-resize textarea based on content
    const textarea = document.getElementById('embedCode');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to generate embed code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('generateEmbed').click();
        }
        
        // Ctrl/Cmd + C when focused on output to copy code
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && 
            document.activeElement === document.getElementById('embedCode')) {
            document.getElementById('copyCode').click();
        }
    });

    // Add tooltips for better UX
    const tooltips = {
        'autoplay': 'Video will start playing automatically when loaded',
        'controls': 'Show/hide player controls (play, pause, volume, etc.)',
        'showinfo': 'Show video title and uploader info',
        'loop': 'Video will restart when it reaches the end',
        'modestbranding': 'Reduces YouTube branding in the player',
        'privacyMode': 'Uses youtube-nocookie.com for enhanced privacy'
    };

    Object.entries(tooltips).forEach(([id, tooltip]) => {
        const element = document.getElementById(id);
        if (element) {
            element.parentElement.title = tooltip;
        }
    });
});