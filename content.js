console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector('video');
  if (video) {
    if (request.action === "pauseVideo" && !video.paused) {
      video.pause();
    } else if (request.action === "resumeVideo" && video.paused) {
      video.play();
    }
  }
});
