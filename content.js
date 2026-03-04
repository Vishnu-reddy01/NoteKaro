chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const video = document.querySelector("video");

  if (!video) {
    sendResponse(null);
    return;
  }

  // Send timestamp + video ID
  if (request.type === "GET_DATA") {
    const params = new URLSearchParams(window.location.search);
    const videoId = params.get("v");

    sendResponse({
      time: video.currentTime,
      videoId
    });
  }

  // Seek video
  if (request.type === "SEEK_VIDEO") {
    video.currentTime = request.time;
  }
});