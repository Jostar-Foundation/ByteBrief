document.getElementById("summarize").addEventListener("click", async () => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = '<div class="loading"><div class="loader"></div></div>';

  const summaryType = document.getElementById("summary-type").value;

  // Get API key from storage
  chrome.storage.sync.get(["geminiApiKey"], async (result) => {
    const apiKey = result.geminiApiKey;
    if (!apiKey) {
      resultDiv.innerHTML =
        "API key not found. Please set your API key in the extension options.";
      return;
    }

    // Get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab) {
        resultDiv.innerText = "No active tab found.";
        return;
      }

      // Force inject content.js (works even on SPA pages)
      chrome.scripting.executeScript(
        { target: { tabId: tab.id }, files: ["content.js"] },
        () => {
          // Send message to content script
          chrome.tabs.sendMessage(tab.id, { type: "GET_ARTICLE_TEXT" }, async (res) => {

            // Handle "no content script" error
            if (chrome.runtime.lastError) {
              console.error("Runtime error:", chrome.runtime.lastError.message);
              resultDiv.innerText = "Failed to extract article text from this page.";
              return;
            }

            if (!res || !res.text) {
              resultDiv.innerText = "Could not extract article text from this page.";
              return;
            }

            try {
              const summary = await getGeminiSummary(res.text, summaryType, apiKey);
              resultDiv.innerText = summary;
            } catch (error) {
              console.error("API error:", error);
              resultDiv.innerText = `Error: ${error.message || "Failed to generate summary."}`;
            }
          });
        }
      );
    });
  });
});

document.getElementById("copy-btn").addEventListener("click", () => {
  const summaryText = document.getElementById("result").innerText;

  if (summaryText && summaryText.trim() !== "") {
    navigator.clipboard.writeText(summaryText).then(() => {
      const copyBtn = document.getElementById("copy-btn");
      const originalText = copyBtn.innerText;
      copyBtn.innerText = "Copied!";
      setTimeout(() => (copyBtn.innerText = originalText), 2000);
    });
  }
});

// Updated Gemini API call
async function getGeminiSummary(text, summaryType, apiKey) {
  const maxLength = 8000; // truncate large text
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) : text;

  let prompt = "";
  switch (summaryType) {
    case "brief":
      prompt = `Summarize this article in 2-3 sentences:\n${truncatedText}`;
      break;
    case "detailed":
      prompt = `Provide a detailed summary of this article:\n${truncatedText}`;
      break;
    case "bullets":
      prompt = `Summarize this article in 5-7 key points, each starting with "- ":\n${truncatedText}`;
      break;
    default:
      prompt = `Summarize this article:\n${truncatedText}`;
  }

  // Use the latest supported model
  const model = "gemini-2.5-flash"; // Change if ListModels shows another supported model
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 }
      })
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("GEMINI API ERROR:", err);
      throw new Error(err.error?.message || "Gemini API request failed");
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary. Please try again later.");
  }
}
