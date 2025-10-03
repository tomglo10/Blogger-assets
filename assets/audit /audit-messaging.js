(function () {
  const payload = { type: "auditCheck", source: "blogger-overlay" };

  // Safe messaging wrapper
  function sendAuditMessage(data) {
    try {
      chrome.runtime.sendMessage(data, response => {
        if (chrome.runtime.lastError) {
          console.warn("Extension messaging failed:", chrome.runtime.lastError.message);
        } else {
          console.log("Audit response received:", response);
        }
      });
    } catch (e) {
      console.error("Messaging exception:", e);
    }
  }

  // Trigger messaging only if Chrome extension APIs are available
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
    sendAuditMessage(payload);
  } else {
    console.info("Messaging API not available—likely not in extension context.");
  }
})();
