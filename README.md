# YouTube Embed Link Generator

A simple, single-page web application that allows users to easily generate customized YouTube embed codes with various player options.

## Features

- **Easy URL Parsing**: Simply paste any YouTube URL and the tool automatically extracts the video ID
- **Comprehensive Player Options**:
  - Autoplay control
  - Show/hide player controls
  - Video info display toggle
  - Loop functionality
  - Modest branding option
- **Timing Controls**: Set custom start and end times for videos
- **Custom Dimensions**: Specify exact width and height for the embed
- **Privacy Enhanced Mode**: Use youtube-nocookie.com for better privacy
- **Live Preview**: See exactly how your embed will look
- **One-Click Copy**: Copy the generated embed code to clipboard instantly

## Usage

1. Visit the [GitHub Pages site](https://nosilleg.github.io/youtube-player-options/)
2. Paste your YouTube URL in the input field
3. Customize the player options as needed
4. Click "Generate Embed Code"
5. Copy the generated code and use it in your website

## Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

The tool also automatically extracts timestamp information from URLs with `t=` or `start=` parameters.

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter`: Generate embed code
- `Ctrl/Cmd + C` (when textarea is focused): Copy embed code

## GitHub Pages

This application is designed to work seamlessly with GitHub Pages. Simply enable GitHub Pages for your repository and the site will be available at `https://[username].github.io/[repository-name]/`.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
