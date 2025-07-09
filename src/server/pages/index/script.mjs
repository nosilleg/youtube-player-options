// DOM Elements
let youtubeUrlInput;
let parseUrlButton;
let copyUrlButton;
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
let relatedVideos;

/**
 * Initializes the application by setting up event listeners and DOM elements.
 */
function initializeApp() {
  // Get DOM elements
  youtubeUrlInput = document.querySelector("#youtubeUrl");
  parseUrlButton = document.querySelector("#parseUrl");
  copyUrlButton = document.querySelector("#copyUrl");
  embedUrlInput = document.querySelector("#embedUrl");
  previewContainer = document.querySelector("#previewContainer");

  // Option elements
  autoplay = document.querySelector("#autoplay");
  controls = document.querySelector("#controls");
  showinfo = document.querySelector("#showinfo");
  loop = document.querySelector("#loop");
  modestbranding = document.querySelector("#modestbranding");
  startTime = document.querySelector("#startTime");
  endTime = document.querySelector("#endTime");
  privacyMode = document.querySelector("#privacyMode");
  color = document.querySelector("#color");
  relatedVideos = document.querySelector("#rel");

  bindEvents();
}

/**
 * Binds event listeners to DOM elements for user interactions and live updates.
 */
function bindEvents() {
  parseUrlButton.addEventListener("click", parseYouTubeUrl);
  copyUrlButton.addEventListener("click", copyToClipboard);

  // Live updating - listen to all form changes
  youtubeUrlInput.addEventListener("input", handleLiveUpdate);
  youtubeUrlInput.addEventListener("paste", () => {
    setTimeout(handleLiveUpdate, 100);
  });

  // Live update on all option changes
  for (const element of [
    autoplay,
    controls,
    showinfo,
    loop,
    modestbranding,
    privacyMode,
    color,
    relatedVideos,
  ]) {
    element.addEventListener("change", handleLiveUpdate);
  }

  for (const element of [startTime, endTime]) {
    element.addEventListener("input", handleLiveUpdate);
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts);
}

/**
 * Handles live updates when form inputs change by clearing messages and regenerating the embed URL.
 */
function handleLiveUpdate() {
  clearMessages();
  generateEmbedUrl();
}

/**
 * Parses the YouTube URL input and updates form fields based on detected parameters.
 */
function parseYouTubeUrl() {
  const url = youtubeUrlInput.value.trim();
  if (!url) {
    showMessage("Please enter a YouTube URL", "error");
    return;
  }

  try {
    const urlObject = new URL(url);
    const searchParameters = urlObject.searchParams;

    // Extract and set form values from URL parameters
    if (searchParameters.has("autoplay")) {
      autoplay.checked = searchParameters.get("autoplay") === "1";
    }
    if (searchParameters.has("controls")) {
      controls.checked = searchParameters.get("controls") !== "0";
    }
    if (searchParameters.has("showinfo")) {
      showinfo.checked = searchParameters.get("showinfo") !== "0";
    }
    if (searchParameters.has("loop")) {
      loop.checked = searchParameters.get("loop") === "1";
    }
    if (searchParameters.has("modestbranding")) {
      modestbranding.checked = searchParameters.get("modestbranding") === "1";
    }
    if (searchParameters.has("start")) {
      startTime.value = searchParameters.get("start");
    }
    if (searchParameters.has("end")) {
      endTime.value = searchParameters.get("end");
    }
    if (searchParameters.has("color")) {
      color.value = searchParameters.get("color");
    }
    if (searchParameters.has("rel")) {
      relatedVideos.value = searchParameters.get("rel");
    }

    // Extract timestamp from t parameter
    if (searchParameters.has("t")) {
      const tValue = searchParameters.get("t");
      const timeMatch = tValue.match(/(\d+)/);
      if (timeMatch) {
        startTime.value = timeMatch[1];
      }
    }

    showMessage("URL parameters parsed and applied to form!", "success");
    generateEmbedUrl();
  } catch {
    showMessage("Invalid URL format", "error");
  }
}

/**
 * Extracts the video ID from a YouTube URL.
 *
 * @param {string} url - The YouTube URL to extract the video ID from.
 * @returns {{ type: string, id: string } | null} The video information object or null if not found.
 */
function extractVideoId(url) {
  const videoPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of videoPatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Extracts the playlist ID from a YouTube URL.
 *
 * @param {string} url - The YouTube URL to extract the playlist ID from.
 * @returns {string|null} The playlist ID if found, otherwise null.
 */
function extractPlaylistId(url) {
  const playlistPattern = /[?&]list=([^&\n?#]+)/;
  const match = url.match(playlistPattern);
  return match ? match[1] : null;
}

/**
 * Generates the YouTube embed URL based on the current form input and updates the preview.
 */
function generateEmbedUrl() {
  const url = youtubeUrlInput.value.trim();
  if (!url) {
    embedUrlInput.value = "";
    previewContainer.innerHTML = "<p>Enter a YouTube URL to see preview</p>";
    return;
  }

  const videoInfo = extractVideoId(url);
  const playlistId = extractPlaylistId(url);

  if (!videoInfo && !playlistId) {
    showMessage(
      "Invalid YouTube URL. Please enter a valid YouTube video or playlist URL.",
      "error",
    );
    embedUrlInput.value = "";
    previewContainer.innerHTML = "<p>Invalid URL</p>";
    return;
  }

  let embedUrl;

  if (playlistId) {
    // Handle playlist
    embedUrl = buildPlaylistEmbedUrl(
      playlistId,
      videoInfo ? videoInfo.id : null,
    );
  } else if (videoInfo) {
    // Handle individual video
    embedUrl = buildVideoEmbedUrl(videoInfo.id);
  }

  embedUrlInput.value = embedUrl;
  showPreview(embedUrl);
  clearMessages();
}

/**
 * Builds the YouTube embed URL for an individual video based on the current form options.
 *
 * @param {string} videoId - The YouTube video ID to embed.
 * @returns {string} The constructed embed URL.
 */
function buildVideoEmbedUrl(videoId) {
  const baseUrl = privacyMode.checked
    ? "https://www.youtube-nocookie.com/embed/"
    : "https://www.youtube.com/embed/";

  const parameters = new URLSearchParams();

  // Player controls
  if (autoplay.checked) parameters.set("autoplay", "1");
  if (!controls.checked) parameters.set("controls", "0");
  if (!showinfo.checked) parameters.set("showinfo", "0");
  if (loop.checked) {
    parameters.set("loop", "1");
    parameters.set("playlist", videoId); // Required for loop to work
  }
  if (modestbranding.checked) parameters.set("modestbranding", "1");

  // Display options
  if (color.value !== "white") parameters.set("color", color.value);
  if (relatedVideos.value !== "1") parameters.set("rel", relatedVideos.value);

  // Timing
  const startTimeValue = Number(startTime.value);
  if (startTimeValue && startTimeValue > 0)
    parameters.set("start", startTimeValue.toString());

  const endTimeValue = Number(endTime.value);
  if (endTimeValue && endTimeValue > 0)
    parameters.set("end", endTimeValue.toString());

  const queryString = parameters.toString();
  return baseUrl + videoId + (queryString ? "?" + queryString : "");
}

/**
 * Builds the YouTube embed URL for a playlist based on the current form options.
 *
 * @param {string} playlistId - The YouTube playlist ID to embed.
 * @param {string|null} videoId - Optional video ID to start the playlist from a specific video.
 * @returns {string} The constructed playlist embed URL.
 */
function buildPlaylistEmbedUrl(playlistId, videoId = null) {
  const baseUrl = privacyMode.checked
    ? "https://www.youtube-nocookie.com/embed/"
    : "https://www.youtube.com/embed/";

  const parameters = new URLSearchParams();
  parameters.set("listType", "playlist");
  parameters.set("list", playlistId);

  // If we have a specific video, use it as the starting video
  if (videoId) {
    parameters.set("index", "1"); // Start with first video by default
  }

  // Player controls
  if (autoplay.checked) parameters.set("autoplay", "1");
  if (!controls.checked) parameters.set("controls", "0");
  if (!showinfo.checked) parameters.set("showinfo", "0");
  if (loop.checked) parameters.set("loop", "1");
  if (modestbranding.checked) parameters.set("modestbranding", "1");

  // Display options
  if (color.value !== "white") parameters.set("color", color.value);
  if (relatedVideos.value !== "1") parameters.set("rel", relatedVideos.value);

  // Timing (only start time is relevant for playlists)
  const startTimeValue = Number(startTime.value);
  if (startTimeValue && startTimeValue > 0)
    parameters.set("start", startTimeValue.toString());

  const queryString = parameters.toString();
  const path = videoId ?? "";

  return baseUrl + path + "?" + queryString;
}

/**
 * Displays the YouTube embed preview iframe with the given embed URL.
 *
 * @param {string} embedUrl - The YouTube embed URL to display in the preview.
 */
function showPreview(embedUrl) {
  const previewWidth = Math.min(560, window.innerWidth - 40);
  const previewHeight = Math.floor((previewWidth * 9) / 16); // 16:9 aspect ratio

  previewContainer.innerHTML = `
        <iframe width="${previewWidth}" height="${previewHeight}" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;
}

/**
 * Copies the generated embed URL to the clipboard and provides user feedback.
 * Uses the Clipboard API if available, otherwise falls back to execCommand.
 */
async function copyToClipboard() {
  const embedUrl = embedUrlInput.value;
  if (!embedUrl) {
    showMessage("No URL to copy", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(embedUrl);
    showMessage("URL copied to clipboard!", "success");

    // Visual feedback
    const originalText = copyUrlButton.textContent;
    copyUrlButton.textContent = "Copied!";
    copyUrlButton.style.background = "#28a745";

    setTimeout(() => {
      copyUrlButton.textContent = originalText;
      copyUrlButton.style.background = "";
    }, 2000);
  } catch {
    // Fallback for older browsers
    embedUrlInput.select();
    document.execCommand("copy");
    showMessage("URL copied to clipboard!", "success");
  }
}

/**
 * Handles keyboard shortcuts for copying the embed URL when focused on the output input.
 *
 * @param {KeyboardEvent} event - The keyboard event object.
 */
function handleKeyboardShortcuts(event) {
  // Ctrl/Cmd + C when focused on URL output to copy
  if (
    (event.ctrlKey || event.metaKey) &&
    event.key === "c" &&
    document.activeElement === embedUrlInput
  ) {
    event.preventDefault();
    copyToClipboard();
  }
}

/**
 * Displays a message to the user above the form.
 *
 * @param {string} text - The message text to display.
 * @param {'success'|'error'} type - The type of message to display.
 */
function showMessage(text, type) {
  clearMessages();

  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;

  const form = document.querySelector("#embedForm");
  form.insertBefore(message, form.firstChild);

  // Auto-remove success messages after 3 seconds
  if (type === "success") {
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 3000);
  }
}

/**
 * Removes all message elements from the DOM.
 */
function clearMessages() {
  const messages = document.querySelectorAll(".message");
  for (const message of messages) {
    if (message.parentNode) {
      message.remove();
    }
  }
}

/**
 * Initializes the YouTube Embed URL Generator application and sets up responsive preview handling.
 */
export function init() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    initializeApp();
  }

  // Add responsive preview handling
  window.addEventListener("resize", () => {
    if (embedUrlInput && embedUrlInput.value) {
      showPreview(embedUrlInput.value);
    }
  });
}

globalThis.document.addEventListener("DOMContentLoaded", () => {
  init();
});

export const forTestingOnly = {
  extractVideoId,
  extractPlaylistId,
};
