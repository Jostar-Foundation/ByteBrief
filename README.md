<img width="100%" src="https://github.com/Jostar-Foundation/ByteBrief/blob/main/ByteBrief/images/bytebrief%20banner.png">

# ByteBrief — An AI-powered News Summarizer
**ByteBrief** is a Chrome extension that uses AI to generate summaries of online articles. It provides quick and accurate overviews, detailed summaries, or key bullet points directly in your browser.

<!-- Source Code Badge -->
<a href="https://github.com/Jostar-Foundation/ByteBrief/tree/main/ByteBrief" target="_blank">
  <img src="https://img.shields.io/badge/Source%20Code-4D5054?style=for-the-badge&logo=github&logoColor=white" alt="Source Code Badge"></a>

<!-- Gemini API Badge -->
<a href="https://ai.google.com/gemini/" target="_blank">
  <img src="https://img.shields.io/badge/Gemini%20API-4D5054?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API Badge"></a>

<!-- HTML Badge -->
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML Badge"></a>

<!-- JavaScript Badge -->
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge"></a>

<!-- Chrome Extension Badge -->
<a href="https://developer.chrome.com/docs/extensions/" target="_blank">
  <img src="https://img.shields.io/badge/Chrome%20Extension-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Chrome Extension Badge">
</a>

| **Section** | **Details** |
|------------|-------------|
| 🚀 **Features** | - Summarize articles in brief, detailed, or bullet point formats.<br>- Works on most websites with article content.<br>- Copy summaries to clipboard with one click.<br>- Powered by Google Gemini AI for intelligent text summarization. |
| 💻 **Installation** | - Clone or download this repository.<br>- Open Chrome and navigate to `chrome://extensions/`.<br>- Enable Developer mode (top right).<br>- Click **Load unpacked** and select this repository folder.<br>- Pin the **ByteBrief** extension to your Chrome toolbar. |
| 📝 **Usage** | - Open any article or webpage.<br>- Click the ByteBrief extension icon.<br>- Select the summary type: Brief, Detailed, or Bullets.<br>- Click **Summarize** to generate the summary.<br>- Copy the summary using the **Copy** button if needed. |
| ⚙️ **Configuration** | - Go to the Options page to enter your Google Gemini API key.<br>- Your key is securely stored using Chrome’s `storage.sync`. |


### ⚠️ Notes

- Some websites (like `chrome://` pages) do not support content extraction.
- Summaries are truncated for very long articles to avoid API limits.

> [!IMPORTANT]
>
> **Error:**  
> - Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.
>
> **Cause:**  
> - The popup tried to send a message to the content script (`content.js`) before it was injected or on unsupported pages like `chrome://` or `chrome-extension://`.
>
> **Solution:**  
> - Ensured the content script is **injected dynamically** if missing using `chrome.scripting.executeScript`.  
> - Checked for `chrome.runtime.lastError` before using the response.  
> - Confirmed messages are sent to **active tabs** using `chrome.tabs.query`.
> - ByteBrief Official Website -> https://bytebriefs.netlify.app/

### 🛠 Key Fixes Implemented

- **Dynamic Content Script Injection:** Ensures the message can always reach a content script.
- **Runtime Error Handling:** Catches `runtime.lastError` to prevent unhandled exceptions.
- **Updated Gemini API Call:** Uses a supported model and correct request format.
- **API Key Validation:** Checks for presence of API key and guides the user to enter it in options.
- **Truncation of Long Articles:** Prevents request failures due to API limits.
- **Improved User Feedback:** Loader animation and meaningful error messages in popup.

### 📄 Overview

<div align="center">
  <img width="100%" src="https://github.com/Jostar-Foundation/ByteBrief/blob/main/ByteBrief/images/api-key-input.png">
  <img width="100%" src="https://github.com/Jostar-Foundation/ByteBrief/blob/main/ByteBrief/images/extension.png">
  <img width="100%" src="https://github.com/Jostar-Foundation/ByteBrief/blob/main/ByteBrief/images/extension-example.png">
  <img width="100%" src="https://github.com/Jostar-Foundation/ByteBrief/blob/main/ByteBrief/images/bytebrief-foot.png">
</div>

---

<div align="center">
  ⚠️ This README is uniquely designed by Joshua Thadi.
</div>
