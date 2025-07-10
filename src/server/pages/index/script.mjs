const iso6391Codes = [
  "aa",
  "ab",
  "ae",
  "af",
  "ak",
  "am",
  "an",
  "ar",
  "as",
  "av",
  "ay",
  "az",
  "ba",
  "be",
  "bg",
  "bi",
  "bm",
  "bn",
  "bo",
  "br",
  "bs",
  "ca",
  "ce",
  "ch",
  "co",
  "cr",
  "cs",
  "cu",
  "cv",
  "cy",
  "da",
  "de",
  "dv",
  "dz",
  "ee",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "ff",
  "fi",
  "fj",
  "fo",
  "fr",
  "fy",
  "ga",
  "gd",
  "gl",
  "gn",
  "gu",
  "gv",
  "ha",
  "he",
  "hi",
  "ho",
  "hr",
  "ht",
  "hu",
  "hy",
  "hz",
  "ia",
  "id",
  "ie",
  "ig",
  "ii",
  "ik",
  "io",
  "is",
  "it",
  "iu",
  "ja",
  "jv",
  "ka",
  "kg",
  "ki",
  "kj",
  "kk",
  "kl",
  "km",
  "kn",
  "ko",
  "kr",
  "ks",
  "ku",
  "kv",
  "kw",
  "ky",
  "la",
  "lb",
  "lg",
  "li",
  "ln",
  "lo",
  "lt",
  "lu",
  "lv",
  "mg",
  "mh",
  "mi",
  "mk",
  "ml",
  "mn",
  "mr",
  "ms",
  "mt",
  "my",
  "na",
  "nb",
  "nd",
  "ne",
  "ng",
  "nl",
  "nn",
  "no",
  "nr",
  "nv",
  "ny",
  "oc",
  "oj",
  "om",
  "or",
  "os",
  "pa",
  "pi",
  "pl",
  "ps",
  "pt",
  "qu",
  "rm",
  "rn",
  "ro",
  "ru",
  "rw",
  "sa",
  "sc",
  "sd",
  "se",
  "sg",
  "si",
  "sk",
  "sl",
  "sm",
  "sn",
  "so",
  "sq",
  "sr",
  "ss",
  "st",
  "su",
  "sv",
  "sw",
  "ta",
  "te",
  "tg",
  "th",
  "ti",
  "tk",
  "tl",
  "tn",
  "to",
  "tr",
  "ts",
  "tt",
  "tw",
  "ty",
  "ug",
  "uk",
  "ur",
  "uz",
  "ve",
  "vi",
  "vo",
  "wa",
  "wo",
  "xh",
  "yi",
  "yo",
  "za",
  "zh",
  "zu",
];

/**
 * Supported YouTube embed parameters, their valid values, YouTube defaults, and this site's defaults.
 */
const YOUTUBE_EMBED_PARAMETERS = {
  autoplay: {
    type: "option",
    validValues: [0, 1],
    booleanOnValue: 1,
    youtubeDefault: 0,
    siteDefault: 0,
  },
  cc_lang_pref: {
    type: "option",
    validValues: iso6391Codes,
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  cc_load_policy: {
    type: "option",
    validValues: [1, undefined],
    booleanOnValue: 1,
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  color: {
    type: "option",
    validValues: ["red", "white"],
    youtubeDefault: "red",
    siteDefault: "white",
  },
  controls: {
    type: "option",
    validValues: [0, 1],
    booleanOnValue: 1,
    youtubeDefault: 1,
    siteDefault: 1,
  },
  disablekb: {
    type: "option",
    validValues: [0, 1],
    booleanOnValue: 1,
    youtubeDefault: 0,
    siteDefault: 0,
  },
  enablejsapi: {
    type: "option",
    validValues: [0, 1],
    booleanOnValue: 1,
    youtubeDefault: 0,
    siteDefault: 0,
  },
  end: {
    type: "input",
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  fs: {
    type: "option",
    validValues: [0, 1],
    booleanOnValue: 1,
    youtubeDefault: 1,
    siteDefault: 1,
  },
  hl: {
    type: "input",
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  iv_load_policy: {
    type: "option",
    validValues: [1, 3],
    youtubeDefault: 1,
    siteDefault: 1,
  },
  list: {
    type: "input",
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  listType: {
    type: "option",
    validValues: [undefined, "playlist", "user_uploads"],
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  loop: {
    type: "option",
    validValues: [0, 1],
    booleanOnValue: 1,
    youtubeDefault: 0,
    siteDefault: 0,
  },
  origin: {
    type: "input",
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  playlist: {
    type: "input",
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
  playsinline: {
    type: "option",
    validValues: [0, 1],
    booleanOnValue: 1,
    youtubeDefault: 0,
    siteDefault: 0,
  },
  rel: {
    type: "option",
    validValues: [0, 1],
    youtubeDefault: 1,
    siteDefault: 0,
  },
  start: {
    type: "input",
    youtubeDefault: 0,
    siteDefault: 0,
  },
  widget_referrer: {
    type: "input",
    youtubeDefault: undefined,
    siteDefault: undefined,
  },
};

const references = {
  // DOM Elements
  youtubeUrlInput: document.querySelector("#youtubeUrl"),
  parseUrlButton: document.querySelector("#parseUrl"),
  copyUrlButton: document.querySelector("#copyUrl"),
  embedUrlInput: document.querySelector("#embedUrl"),
  previewContainer: document.querySelector("#previewContainer"),
  // Option elements
  ...Object.fromEntries(
    Object.keys(YOUTUBE_EMBED_PARAMETERS).map((key) => {
      return [key, document.querySelector(`#${key}`)];
    }),
  ),
};

/**
 * Binds event listeners to DOM elements for user interactions and live updates.
 */
function bindEvents() {
  // Only run in browser context
  if ((references.parseUrlButton ?? null) === null) {
    return;
  }

  references.parseUrlButton.addEventListener("click", parseYouTubeUrl);
  references.copyUrlButton.addEventListener("click", copyToClipboard);

  // Live updating - listen to all form changes
  references.youtubeUrlInput.addEventListener("input", handleLiveUpdate);
  references.youtubeUrlInput.addEventListener("paste", () => {
    setTimeout(handleLiveUpdate, 100);
  });

  for (const [key, value] of Object.entries(YOUTUBE_EMBED_PARAMETERS)) {
    const element = references[key];
    if (!element) {
      console.warn(`Element for ${key} not found in the DOM`);
      continue;
    }

    if (value.type === "input") {
      references[key].addEventListener("input", handleLiveUpdate);
    } else if (value.type === "option") {
      references[key].addEventListener("change", handleLiveUpdate);
    }
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
  const url = references.youtubeUrlInput.value.trim();
  if (!url) {
    showMessage("Please enter a YouTube URL", "error");
    return;
  }

  try {
    const urlObject = new URL(url);
    const searchParameters = urlObject.searchParams;

    for (const [key, value] of searchParameters.entries()) {
      if (key in YOUTUBE_EMBED_PARAMETERS) {
        const parameterSettings = YOUTUBE_EMBED_PARAMETERS[key];
        const element = references[key];
        if (!element) {
          // Skip if the element is not found
          continue;
        }
        if (parameterSettings.type === "input") {
          element.value = value;
        } else if (parameterSettings.type === "option") {
          // eslint-disable-next-line unicorn/no-lonely-if
          if (parameterSettings.validValues.includes(value)) {
            element.value = value;
          }
        }
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
    /(?:youtube\.com\/watch\?.*?v=|youtu\.be\/|youtube(?:-nocookie)?\.com\/embed\/|youtube\.com\/v\/|youtube\-nocookie\.com\/embed\/)([^&\n?#]+)/i,
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
  const url = references.youtubeUrlInput.value.trim();
  if (!url) {
    references.embedUrlInput.value = "";
    references.previewContainer.innerHTML =
      "<p>Enter a YouTube URL to see preview</p>";
    return;
  }

  const videoId = extractVideoId(url);
  const playlistId = extractPlaylistId(url);

  if (!videoId && !playlistId) {
    showMessage(
      "Invalid YouTube URL. Please enter a valid YouTube video or playlist URL.",
      "error",
    );
    references.embedUrlInput.value = "";
    references.previewContainer.innerHTML = "<p>Invalid URL</p>";
    return;
  }

  let embedUrl;

  if (playlistId) {
    // Handle playlist
    embedUrl = buildPlaylistEmbedUrl(playlistId, videoId);
  } else if (videoId) {
    // Handle individual video
    embedUrl = buildVideoEmbedUrl(videoId);
  }

  references.embedUrlInput.value = embedUrl;
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

  for (const [key, value] of Object.entries(YOUTUBE_EMBED_PARAMETERS)) {
    const element = references[key];
    if (!element) continue; // Skip if the element is not found

    if (value.type === "input") {
      if (element.value) {
        parameters.set(key, element.value);
      }
    } else if (value.type === "option") {
      // Value is a boolean or a list
      if (Object.hasOwn(value, "booleanOnValue")) {
        // Boolean option
        let selectedValue = element.checked
          ? value.booleanOnValue
          : value.validValues.find((v) => v !== value.booleanOnValue);
        if (selectedValue !== value.youtubeDefault) {
          parameters.set(key, selectedValue.toString());
        }
      } else {
        // List option
        if (
          (value.validValues.includes(element.value) &&
            element.value !== value.youtubeDefault) ||
          (value.validValues.includes(Number(element.value)) &&
            Number(element.value) !== value.youtubeDefault)
        ) {
          parameters.set(key, element.value);
        }
      }
    }
  }

  if (parameters.has("loop")) {
    parameters.set("playlist", videoId); // Required for loop to work
    parameters.delete("listType"); // Remove listType if set
    parameters.delete("list"); // Remove list if set
  }

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

  references.previewContainer.innerHTML = `
        <iframe width="${previewWidth}" height="${previewHeight}" src="${embedUrl}" title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>
    `;
}

/**
 * Copies the generated embed URL to the clipboard and provides user feedback.
 * Uses the Clipboard API if available, otherwise falls back to execCommand.
 */
async function copyToClipboard() {
  const embedUrl = references.embedUrlInput.value;
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
    references.embedUrlInput.select();
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
    document.activeElement === references.embedUrlInput
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
  bindEvents();

  // Add responsive preview handling
  window.addEventListener("resize", () => {
    if (references.embedUrlInput && references.embedUrlInput.value) {
      showPreview(references.embedUrlInput.value);
    }
  });
}

init();

export const forTestingOnly = {
  extractVideoId,
  extractPlaylistId,
};
