<img src="">

# ByteBrief

**ByteBrief** is a Chrome extension that uses AI to generate summaries of online articles. It provides quick and accurate overviews, detailed summaries, or key bullet points directly in your browser.

---

## Features

- Summarize articles in **brief**, **detailed**, or **bullet point** formats.
- Works on most websites with article content.
- Copy summaries to clipboard with one click.
- Powered by **Google Gemini AI** for intelligent text summarization.

---

## Demo

![ByteBrief Demo](demo.gif) <!-- Replace with your actual GIF or image -->

---

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this repository folder.
5. Pin the ByteBrief extension to your Chrome toolbar.

---

## Usage

1. Open any article or webpage.
2. Click the **ByteBrief** extension icon.
3. Select the summary type: **Brief**, **Detailed**, or **Bullets**.
4. Click **Summarize** to generate the summary.
5. Copy the summary using the **Copy** button if needed.

---

## Configuration

- Go to the **Options** page to enter your **Google Gemini API key**.
- Your key is securely stored using Chrome’s `storage.sync`.

---

## Tech Stack

- JavaScript
- Chrome Extensions API
- Google Gemini AI

---

## Notes

- Some websites (like `chrome://` pages) do not support content extraction.
- Summaries are truncated for very long articles to avoid API limits.

---

## License

MIT License © [Your Name]
