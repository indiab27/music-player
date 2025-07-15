document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play');
  const playIcon = document.getElementById('play-icon');
  const audio = document.getElementById('audio');
  const nextButton = document.getElementById('next');
  const previousButton = document.getElementById('previous');
  const shuffleButton = document.getElementById('shuffle');
  const shuffleIcon = document.getElementById('shuffle-icon');
  const volumeSlider = document.getElementById('volume-slider');

  const seekBar = document.querySelector('.seekbar');
  const currentTimeDisplay = document.querySelector('.current-time');
  const durationDisplay = document.querySelector('.song-duration');

  const trackName = document.getElementById('track-name');
  const artistName = document.getElementById('artist-name');
  const displayImage = document.querySelector('.display-image');

  let isPlaying = false;
  let isShuffle = false;
  let currentTrack = 0;

  const musicList = [
    { name: "Track One", artist: "Artist A", path: "music/1.mp3", cover: "images/1.jpg" },
    { name: "Track Two", artist: "Artist B", path: "music/2.mp3", cover: "images/2.jpg" },
    { name: "Track Three", artist: "Artist C", path: "music/3.mp3", cover: "images/3.jpg" }
  ];

  const loadTrack = (index) => {
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

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  };

  // Play/Pause
  playButton.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playIcon.src = "images/play.png";
      isPlaying = false;
    } else {
      audio.play();
      playIcon.src = "images/pause.png";
      isPlaying = true;
    }
  });

  // Seek Bar update
  audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);

    if (audio.currentTime >= audio.duration) {
      nextButton.click();
    }
  });

  seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
  });

  // Volume control
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });

  // Shuffle toggle
  shuffleButton.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleIcon.classList.toggle('active', isShuffle);
    shuffleButton.classList.toggle('active');
  });

  // Next track
  nextButton.addEventListener('click', () => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * musicList.length);
      } while (randomIndex === currentTrack);
      currentTrack = randomIndex;
    } else {
      currentTrack = (currentTrack + 1) % musicList.length;
    }
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
  });

  // Previous track
  previousButton.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + musicList.length) % musicList.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
  });

  // Load first track
  loadTrack(currentTrack);
});
