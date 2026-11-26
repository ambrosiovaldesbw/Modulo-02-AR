const parentOrigin = window.parent.location.origin;
let video;
let open = true;

function report(state) {
  if (open) window.parent.postMessage({ type: "robot-ar-status", state }, parentOrigin);
}

function stopTracks(element) {
  if (!element?.srcObject) return;
  for (const track of element.srcObject.getTracks()) track.stop();
  element.srcObject = null;
}

function stopCamera() {
  open = false;
  stopTracks(video);
}

window.addEventListener("robot-ar-stop", stopCamera, { once: true });
window.addEventListener("pagehide", stopCamera, { once: true });

window.addEventListener("arjs-video-loaded", (event) => {
  video = event.detail.component;
  if (!open) {
    stopTracks(video);
    return;
  }
  for (const track of video.srcObject?.getVideoTracks() ?? []) {
    track.addEventListener("ended", () => report("camera-error"), { once: true });
  }
  report("scanning");
});
window.addEventListener("camera-error", () => report("camera-error"));

if (window.AFRAME?.components["arjs-anchor"]) {
  const scene = document.getElementById("ar-scene").content.cloneNode(true);
  const marker = scene.querySelector("a-marker");
  marker.addEventListener("markerFound", () => report("found"));
  marker.addEventListener("markerLost", () => report("lost"));
  document.body.append(scene);
} else {
  report("load-error");
}
