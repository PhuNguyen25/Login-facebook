// popup.js
document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getUserInfo' }, function(response) {
        if (response) {
          // Hiển thị thông tin tài khoản Facebook trong popup
          document.getElementById('name').innerText = `Name: ${response.name}`;
          document.getElementById('profilePic').src = response.picture;
        } else {
          document.getElementById('name').innerText = "Not logged in to Facebook";
        }
      });
    });
  });
  