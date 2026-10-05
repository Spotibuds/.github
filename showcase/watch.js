const player = document.querySelector("#player");
const status = document.querySelector("#status");
const copy = document.querySelector("#copy");
const title = document.querySelector("#video-title");
let videos = [];
let active;
let pendingSeek = null;
const timeLabel = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

function selectVideo() {
  const id = location.hash.slice(1).split("&")[0];
  const chosen = videos.find((video) => video.id === id) || videos[0];
  if (!chosen || chosen === active) return;
  active = chosen;
  pendingSeek = null;
  player.pause();
  title.textContent = chosen.title;
  document.title = `${chosen.title} · Watch Spotibuds`;
  document.querySelector("#description").textContent = chosen.description;
  player.setAttribute("aria-label", `${chosen.title} demo video`);
  player.poster = `posters/${chosen.id}.jpg`;
  player.replaceChildren();
  const track = document.createElement("track");
  Object.assign(track, {
    kind: "captions",
    label: "English",
    srclang: "en",
    src: `captions/${chosen.id}.vtt`,
  });
  player.append(track);
  player.src = `videos/${chosen.file}`;
  status.textContent = "Loading video…";
  player.load();
  document.querySelectorAll(".choice").forEach((link) => {
    if (link.dataset.id === chosen.id)
      link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
  const chapters = chosen.chapters.map((chapter) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chapter";
    const stamp = document.createElement("time");
    stamp.textContent = timeLabel(chapter.start);
    button.append(stamp, document.createTextNode(chapter.title));
    button.addEventListener("click", () => {
      pendingSeek = chapter.start;
      if (player.readyState >= 1) {
        player.currentTime = pendingSeek;
        pendingSeek = null;
      }
      player.play().catch(() => {
        status.textContent = "Chapter selected. Press play to continue.";
      });
    });
    li.append(button);
    return li;
  });
  document.querySelector("#chapters").replaceChildren(...chapters);
  copy.disabled = false;
}
player.addEventListener("loadedmetadata", () => {
  if (pendingSeek !== null) {
    player.currentTime = pendingSeek;
    pendingSeek = null;
  }
  status.textContent = `Ready to watch · ${timeLabel(player.duration)}`;
});
player.addEventListener("playing", () => {
  status.textContent = "Playing";
});
player.addEventListener("waiting", () => {
  status.textContent = "Buffering…";
});
player.addEventListener("pause", () => {
  if (player.readyState >= 1 && !player.ended) status.textContent = "Paused";
});
player.addEventListener("ended", () => {
  status.textContent = "Finished. Choose another demo to explore more.";
});
player.addEventListener("error", () => {
  status.replaceChildren(document.createTextNode("Video could not load. "));
  const retry = document.createElement("button");
  retry.textContent = "Try again";
  retry.addEventListener("click", () => {
    status.textContent = "Loading video…";
    player.load();
  });
  status.append(retry);
});
copy.addEventListener("click", async () => {
  const url = new URL(location.href);
  url.hash = active.id;
  try {
    await navigator.clipboard.writeText(url.href);
    status.textContent = "Video link copied.";
  } catch {
    status.textContent = `Copy this video link: ${url.href}`;
  }
});
window.addEventListener("hashchange", selectVideo);
try {
  const response = await fetch("videos.json");
  if (!response.ok) throw new Error("Video list unavailable");
  videos = await response.json();
  const links = videos.map((video) => {
    const link = document.createElement("a");
    link.href = `#${video.id}`;
    link.className = "choice";
    link.dataset.id = video.id;
    const image = document.createElement("img");
    image.src = `posters/${video.id}.jpg`;
    image.alt = "";
    image.loading = "lazy";
    const text = document.createElement("span");
    const name = document.createElement("strong");
    name.textContent = video.title;
    const duration = document.createElement("small");
    duration.textContent = video.duration;
    text.append(name, duration);
    link.append(image, text);
    return link;
  });
  document.querySelector("#videos").replaceChildren(...links);
  selectVideo();
} catch {
  status.textContent =
    "The demo list could not load. Refresh the page to try again.";
}
