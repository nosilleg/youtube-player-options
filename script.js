// YouTube Embed URL Generator - ES Module Implementation

// DOM Elements
let youtubeUrlInput;
let parseUrlBtn;
let copyUrlBtn;
let embedUrlInput;
let previewContainer;

// Option elements
let autoplay;
let controls;
let showinfo;
let loop;
let modestbranding;
let startTime;
let endTime;
let privacyMode;
let color;
let rel;

// Initialize the application
function initializeApp() {
    // Get DOM elements
    youtubeUrlInput = document.getElementById('youtubeUrl');
    parseUrlBtn = document.getElementById('parseUrl');
    copyUrlBtn = document.getElementById('copyUrl');
    embedUrlInput = document.getElementById('embedUrl');
    previewContainer = document.getElementById('previewContainer');
    
    // Option elements
    autoplay = document.getElementById('autoplay');
    controls = document.getElementById('controls');
    showinfo = document.getElementById('showinfo');
    loop = document.getElementById('loop');
    modestbranding = document.getElementById('modestbranding');
    startTime = document.getElementById('startTime');
    endTime = document.getElementById('endTime');
    privacyMode = document.getElementById('privacyMode');
    color = document.getElementById('color');
    rel = document.getElementById('rel');

    bindEvents();
}

// Bind event listeners
function bindEvents() {
    // URL parsing
    parseUrlBtn.addEventListener('click', parseYouTubeUrl);
    copyUrlBtn.addEventListener('click', copyToClipboard);
    
    // Live updating - listen to all form changes
    youtubeUrlInput.addEventListener('input', handleLiveUpdate);
    youtubeUrlInput.addEventListener('paste', () => {
        setTimeout(handleLiveUpdate, 100);
    });
    
    // Live update on all option changes
    [autoplay, controls, showinfo, loop, modestbranding, privacyMode, color, rel].forEach(element => {
        element.addEventListener('change', handleLiveUpdate);
    });
    
    [startTime, endTime].forEach(element => {
        element.addEventListener('input', handleLiveUpdate);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle live updates
function handleLiveUpdate() {
    clearMessages();
    generateEmbedUrl();
}

// Parse YouTube URL and extract parameters
function parseYouTubeUrl() {
    const url = youtubeUrlInput.value.trim();
    if (!url) {
        showMessage('Please enter a YouTube URL', 'error');
        return;
    }

    try {
        const urlObj = new URL(url);
        const searchParams = urlObj.searchParams;
        
        // Extract and set form values from URL parameters
        if (searchParams.has('autoplay')) {
            autoplay.checked = searchParams.get('autoplay') === '1';
        }
        if (searchParams.has('controls')) {
            controls.checked = searchParams.get('controls') !== '0';
        }
        if (searchParams.has('showinfo')) {
            showinfo.checked = searchParams.get('showinfo') !== '0';
        }
        if (searchParams.has('loop')) {
            loop.checked = searchParams.get('loop') === '1';
        }
        if (searchParams.has('modestbranding')) {
            modestbranding.checked = searchParams.get('modestbranding') === '1';
        }
        if (searchParams.has('start')) {
            startTime.value = searchParams.get('start');
        }
        if (searchParams.has('end')) {
            endTime.value = searchParams.get('end');
        }
        if (searchParams.has('color')) {
            color.value = searchParams.get('color');
        }
        if (searchParams.has('rel')) {
            rel.value = searchParams.get('rel');
        }
        
        // Extract timestamp from t parameter
        if (searchParams.has('t')) {
            const tValue = searchParams.get('t');
            const timeMatch = tValue.match(/(\d+)/);
            if (timeMatch) {
                startTime.value = timeMatch[1];
            }
        }

        showMessage('URL parameters parsed and applied to form!', 'success');
        generateEmbedUrl();
    } catch (error) {
        showMessage('Invalid URL format', 'error');
    }
}

// Extract video/playlist ID from YouTube URL
function extractVideoId(url) {
    // Video URL patterns
    const videoPatterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of videoPatterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return { type: 'video', id: match[1] };
        }
    }
    
    return null;
}

// Extract playlist ID from YouTube URL
function extractPlaylistId(url) {
    const playlistPattern = /[?&]list=([^&\n?#]+)/;
    const match = url.match(playlistPattern);
    return match ? match[1] : null;
}

// Generate embed URL
function generateEmbedUrl() {
    const url = youtubeUrlInput.value.trim();
    if (!url) {
        embedUrlInput.value = '';
        previewContainer.innerHTML = '<p>Enter a YouTube URL to see preview</p>';
        return;
    }

    const videoInfo = extractVideoId(url);
    const playlistId = extractPlaylistId(url);
    
    if (!videoInfo && !playlistId) {
        showMessage('Invalid YouTube URL. Please enter a valid YouTube video or playlist URL.', 'error');
        embedUrlInput.value = '';
        previewContainer.innerHTML = '<p>Invalid URL</p>';
        return;
    }

    let embedUrl;
    
    if (playlistId) {
        // Handle playlist
        embedUrl = buildPlaylistEmbedUrl(playlistId, videoInfo ? videoInfo.id : null);
    } else if (videoInfo) {
        // Handle individual video
        embedUrl = buildVideoEmbedUrl(videoInfo.id);
    }

    embedUrlInput.value = embedUrl;
    showPreview(embedUrl);
    clearMessages();
}

// Build video embed URL
function buildVideoEmbedUrl(videoId) {
    const baseUrl = privacyMode.checked 
        ? 'https://www.youtube-nocookie.com/embed/' 
        : 'https://www.youtube.com/embed/';
    
    const params = new URLSearchParams();

    // Player controls
    if (autoplay.checked) params.set('autoplay', '1');
    if (!controls.checked) params.set('controls', '0');
    if (!showinfo.checked) params.set('showinfo', '0');
    if (loop.checked) {
        params.set('loop', '1');
        params.set('playlist', videoId); // Required for loop to work
    }
    if (modestbranding.checked) params.set('modestbranding', '1');

    // Display options
    if (color.value !== 'white') params.set('color', color.value);
    if (rel.value !== '1') params.set('rel', rel.value);

    // Timing
    const startTimeValue = parseInt(startTime.value);
    if (startTimeValue && startTimeValue > 0) params.set('start', startTimeValue.toString());
    
    const endTimeValue = parseInt(endTime.value);
    if (endTimeValue && endTimeValue > 0) params.set('end', endTimeValue.toString());

    const queryString = params.toString();
    return baseUrl + videoId + (queryString ? '?' + queryString : '');
}

// Build playlist embed URL
function buildPlaylistEmbedUrl(playlistId, videoId = null) {
    const baseUrl = privacyMode.checked 
        ? 'https://www.youtube-nocookie.com/embed/' 
        : 'https://www.youtube.com/embed/';
    
    const params = new URLSearchParams();
    params.set('listType', 'playlist');
    params.set('list', playlistId);

    // If we have a specific video, use it as the starting video
    if (videoId) {
        params.set('index', '1'); // Start with first video by default
    }

    // Player controls
    if (autoplay.checked) params.set('autoplay', '1');
    if (!controls.checked) params.set('controls', '0');
    if (!showinfo.checked) params.set('showinfo', '0');
    if (loop.checked) params.set('loop', '1');
    if (modestbranding.checked) params.set('modestbranding', '1');

    // Display options
    if (color.value !== 'white') params.set('color', color.value);
    if (rel.value !== '1') params.set('rel', rel.value);

    // Timing (only start time is relevant for playlists)
    const startTimeValue = parseInt(startTime.value);
    if (startTimeValue && startTimeValue > 0) params.set('start', startTimeValue.toString());

    const queryString = params.toString();
    const path = videoId ? videoId : '';
    return baseUrl + path + '?' + queryString;
}

// Show preview
function showPreview(embedUrl) {
    const previewWidth = Math.min(560, window.innerWidth - 40);
    const previewHeight = Math.floor(previewWidth * 9 / 16); // 16:9 aspect ratio
    
    previewContainer.innerHTML = `
        <iframe width="${previewWidth}" height="${previewHeight}" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;
}

// Copy URL to clipboard
async function copyToClipboard() {
    const embedUrl = embedUrlInput.value;
    if (!embedUrl) {
        showMessage('No URL to copy', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(embedUrl);
        showMessage('URL copied to clipboard!', 'success');
        
        // Visual feedback
        const originalText = copyUrlBtn.textContent;
        copyUrlBtn.textContent = 'Copied!';
        copyUrlBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyUrlBtn.textContent = originalText;
            copyUrlBtn.style.background = '';
        }, 2000);
    } catch (err) {
        // Fallback for older browsers
        embedUrlInput.select();
        document.execCommand('copy');
        showMessage('URL copied to clipboard!', 'success');
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + C when focused on URL output to copy
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && 
        document.activeElement === embedUrlInput) {
        e.preventDefault();
        copyToClipboard();
    }
}

// Show message
function showMessage(text, type) {
    clearMessages();
    
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

// Clear messages
function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Add responsive preview handling
window.addEventListener('resize', () => {
    if (embedUrlInput.value) {
        showPreview(embedUrlInput.value);
    }
});