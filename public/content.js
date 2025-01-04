chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
  if (message.action === "getAccount") {
    const accountElement = document.querySelector('.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6');
    const accountName = accountElement ? accountElement.innerText : "Không tìm thấy tài khoản.";
    console.log("Account found:", accountName);
    sendResponse({ account: accountName });
  }
});
