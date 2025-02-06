songs = ["A_Rate.mp3", "Main_Mera_Dill.mp3", "tum_mere_ho.mp3"]; // Fixed folder path
let currentIndex = 0;
let isPlaying = false;
const audio = document.getElementById("audio");
const songList = document.getElementById("songList");
const player = document.getElementById("player");
const progressBar = document.getElementById("progressBar");
const playPauseBtn = document.getElementById("playPauseBtn");
const currentSong = document.getElementById("currentSong");
const v = document.querySelector(".v");
songList.style.display = "none";
player.style.display = "none";
playPauseBtn.addEventListener("click", () => {
  if (songList.style.display === "block") {
    songList.style.display = "none";
    player.style.display = "none";
  } else {
    songList.innerHTML = "";
    playPauseBtn.classList.add("act");
    v.innerHTML = "|| Pause"; // Change to pause symbol

    songs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song
        .replace("audio/", "")
        .replace(/_/g, " ")
        .replace(".mp3", ""); // Fixed folder path
      li.dataset.index = index;
      li.addEventListener("click", () => {
        playSong(index);
        v.innerHTML = "|| Pause"; // Change to pause symbol
      });
      songList.appendChild(li);
    });
    songList.style.display = "block";
    player.style.display = "block";
    if (!isPlaying) {
      isPlaying = true;
      playSong(0);
    }
  }
    highlightCurrentSong();
});

function playSong(index) {
  currentIndex = index;
  audio.src = songs[currentIndex];
  currentSong.textContent =
    "Now Playing : " +
    songs[currentIndex]
      .replace("audio/", "")
      .replace(/_/g, " ")
      .replace(".mp3", "");
  audio.play();
  highlightCurrentSong();
}


function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

function highlightCurrentSong() {
  const songItems = document.querySelectorAll("#songList li");
  songItems.forEach((item, index) => {
    item.classList.toggle("active-song", index === currentIndex);
  });
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
  }
});

function seek(event) {
  const percent = event.offsetX / event.target.offsetWidth;
  audio.currentTime = percent * audio.duration;
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    v.innerHTML = "|| Pause"; // Change to pause symbol
    playPauseBtn.classList.add("act");
  } else {
    audio.pause();
    isPlaying = false;
    v.innerHTML = "▶ Play"; // Change back to play symbol
    playPauseBtn.classList.remove("act");
  }
}

audio.addEventListener("ended", nextSong);
