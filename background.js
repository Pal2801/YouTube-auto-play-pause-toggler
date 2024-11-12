let currentTabId = null;
let extensionEnabled = true;

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (!extensionEnabled) return;

  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url.includes("youtube.com/watch")) {
      if (currentTabId && currentTabId !== activeInfo.tabId) {
        chrome.tabs.sendMessage(currentTabId, { action: "pauseVideo" }).catch(console.error);
      }
      chrome.tabs.sendMessage(activeInfo.tabId, { action: "resumeVideo" }).catch(console.error);
    } else if (currentTabId) {
      chrome.tabs.sendMessage(currentTabId, { action: "pauseVideo" }).catch(console.error);
    }
    currentTabId = activeInfo.tabId;
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleExtension") {
    extensionEnabled = message.enabled;
  }
});
