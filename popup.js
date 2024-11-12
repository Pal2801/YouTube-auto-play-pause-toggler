document.getElementById('toggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.runtime.sendMessage({ action: 'toggleExtension', enabled });
  });
  