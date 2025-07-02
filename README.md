# YouTube Embed URL Generator

A simple, single-page web application that allows users to easily generate customized YouTube embed URLs with various player options.

## Features

- **Easy URL Parsing**: Simply paste any YouTube URL (videos or playlists) and the tool automatically generates the embed URL
- **Playlist Support**: Works with both individual videos and YouTube playlists
- **Live Updates**: Form updates the generated URL in real-time as you change options
- **URL Parameter Extraction**: Parse existing YouTube URLs to populate form options
- **Comprehensive Player Options**:
  - Autoplay control
  - Show/hide player controls
  - Video info display toggle
  - Loop functionality
  - Modest branding option
  - Color selection (white/red)
  - Related videos control (limited to same channel by default)
- **Timing Controls**: Set custom start and end times for videos
- **Privacy Enhanced Mode**: Use youtube-nocookie.com for better privacy (enabled by default)
- **Live Preview**: See exactly how your embed will look
- **One-Click Copy**: Copy the generated embed URL to clipboard instantly

## Usage

1. Visit the [GitHub Pages site](https://nosilleg.github.io/youtube-player-options/)
2. Paste your YouTube URL (video or playlist) in the input field
3. The embed URL will update automatically as you change options
4. Use "Parse URL" to extract existing parameters from your input URL
5. Copy the generated URL and use it as the `src` attribute in your iframe

## Supported YouTube URL Formats

### Videos
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

### Playlists
- `https://www.youtube.com/playlist?list=PLAYLIST_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID`

The tool automatically extracts timestamp and parameter information from URLs with `t=`, `start=`, `autoplay=`, `loop=`, etc.

## Example Usage

Input URL:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30
```

Generated embed URL:
```
https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?showinfo=0&rel=0&start=30
```

Use in HTML:
```html
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?showinfo=0&rel=0&start=30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
```

## Keyboard Shortcuts

- `Ctrl/Cmd + C` (when URL output is focused): Copy embed URL

## GitHub Pages

This application is designed to work seamlessly with GitHub Pages. Simply enable GitHub Pages for your repository and the site will be available at `https://[username].github.io/[repository-name]/`.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
