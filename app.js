const byId = (id) => document.getElementById(id);
const welcome = byId("welcome");
const start = byId("start");
const arView = byId("ar-view");
const arHeading = byId("ar-title");
const cameraFeed = byId("camera-feed");
const fullscreen = byId("fullscreen");
const arNotice = byId("ar-notice");
const welcomeNotice = byId("welcome-notice");
const previewNotice = byId("preview-notice");
const states = {
  loading: ["Solicitando acceso a la cámara", "Acepta el permiso en el navegador para continuar."],
  scanning: ["Apunta tu cámara hacia el marcador", "Encuadra el cuadrado HIRO completo."],
  found: ["Marcador HIRO detectado", "El robot está anclado al marcador."],
  lost: ["Apunta tu cámara hacia el marcador", "Se perdió el HIRO. Vuelve a encuadrarlo."],
  "camera-error": ["No se pudo abrir la cámara", "Revisa el permiso del navegador, cierra la cámara y vuelve a iniciar."],
  "load-error": ["No se pudo cargar la realidad aumentada", "Revisa tu conexión y vuelve a iniciar desde el menú."],
};

let previewScene;
let cameraFrame;

if (window.AFRAME) {
  const previewContent = byId("preview-scene").content.cloneNode(true);
  previewScene = previewContent.querySelector("a-scene");
  previewScene.addEventListener("renderstart", () => { previewNotice.hidden = true; }, { once: true });
  byId("preview").append(previewContent);
} else {
  previewNotice.textContent = "No se pudo cargar la vista previa 3D. Revisa tu conexión.";
}

function updateTracking(state) {
  const [title, tip] = states[state];
  byId("tracking").dataset.state = state.endsWith("-error") ? "error" : state;
  byId("tracking-title").textContent = title;
  byId("tracking-tip").textContent = tip;
}

function openCamera() {
  if (cameraFrame) return;
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
    welcomeNotice.textContent = "Abre Robot AR desde una dirección HTTPS o localhost con cámara para iniciar.";
    welcomeNotice.hidden = false;
    return;
  }

  welcomeNotice.hidden = true;
  arNotice.hidden = true;
  previewScene?.pause();
  welcome.hidden = true;
  arView.hidden = false;
  document.body.classList.add("scanning");
  updateTracking("loading");

  const frame = document.createElement("iframe");
  frame.title = "Cámara y escena de realidad aumentada";
  frame.tabIndex = -1;
  frame.allow = "camera 'self'; microphone 'none'";
  const head = byId("camera-head").innerHTML;
  const scene = byId("camera-scene").innerHTML;
  frame.srcdoc = '<!doctype html><html lang="es"><head>' + head +
    '</head><body class="camera-document">' + scene + '</body></html>';
  cameraFrame = frame;
  cameraFeed.append(frame);
  arHeading.focus();
}

function closeCamera() {
  if (!cameraFrame) return;
  cameraFrame.contentWindow?.dispatchEvent(new Event("robot-ar-stop"));
  cameraFrame.remove();
  cameraFrame = null;

  if (document.fullscreenElement === arView) {
    document.exitFullscreen().catch(() => {});
  }
  arView.hidden = true;
  document.body.classList.remove("scanning");
  welcome.hidden = false;
  previewScene?.play();
  previewScene?.resize();
  start.focus();
}

window.addEventListener("message", (event) => {
  if (!cameraFrame || event.origin !== location.origin || event.source !== cameraFrame.contentWindow) return;
  if (event.data?.type !== "robot-ar-status" || !Object.hasOwn(states, event.data.state)) return;
  updateTracking(event.data.state);
});

fullscreen.addEventListener("click", async () => {
  arNotice.hidden = true;
  try {
    if (document.fullscreenElement === arView) {
      await document.exitFullscreen();
    } else {
      await arView.requestFullscreen();
    }
  } catch {
    if (cameraFrame) {
      arNotice.textContent = "La pantalla completa no está disponible en este navegador.";
      arNotice.hidden = false;
    }
  }
});
document.addEventListener("fullscreenchange", () => {
  fullscreen.textContent = document.fullscreenElement === arView ? "Salir de pantalla completa" : "Pantalla completa";
});

start.addEventListener("click", openCamera);
byId("close").addEventListener("click", closeCamera);
byId("print").addEventListener("click", () => window.print());

window.addEventListener("pageshow", (event) => {
  if (event.persisted) closeCamera();
});
