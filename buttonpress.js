// playerCore.js

export const musicList = [
  { name: "Track One", artist: "Sabrina Carpenter", path: "music/1.mp3", cover: "images/1.jpg" },
  { name: "Track Two", artist: "Lady Gaga", path: "songs/Lady Gaga - Abracadabra.mp3", cover: "images/2.jpg" },
  { name: "Track Three", artist: "JHOPE ft Miguel", path: "songs/JHOPE (feat. Miguel) - Sweet Dreams.mp3", cover: "images/3.jpg" }
];

export let currentTrack = 0;
export let isPlaying = false;
export let isShuffle = false;

export let audio, trackName, artistName, displayImage, seekBar, currentTimeDisplay, durationDisplay, playIcon;

export const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
};

export const loadTrack = (index) => {
  const track = musicList[index];
  audio.src = track.path;
  trackName.textContent = track.name;
  artistName.textContent = track.artist;
  displayImage.innerHTML = `<img src="${track.cover}" alt="Cover" width="200">`;
  seekBar.value = 0;
  currentTimeDisplay.textContent = "0:00";
  durationDisplay.textContent = "0:00";

  audio.addEventListener('loadedmetadata', () => {
    seekBar.max = audio.duration;
    durationDisplay.textContent = formatTime(audio.duration);
  });

  if (isPlaying) {
    audio.play();
  }
};
