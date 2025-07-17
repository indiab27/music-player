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
    { name: "Track One", artist: "Sabrina Carpenter", path: "music/1.mp3", cover: "images/1.jpg" },
    { name: "Track Two", artist: "Lady Gaga", path: "songs/Lady Gaga - Abracadabra.mp3", cover: "images/2.jpg" },
    { name: "Track Three", artist: "JHOPE ft Miguel", path: "songs/JHOPE (feat. Miguel) - Sweet Dreams.mp3", cover: "images/3.jpg" }
  ];

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  };

  const loadTrack = (index) => {
    const track = musicList[index];
    audio.src = track.path;
    trackName.textContent = track.name;
    artistName.textContent = track.artist;
    displayImage.innerHTML = `<img src="${track.cover}" alt="Cover" width="200">`;

    seekBar.value = 0;
    seekBar.max = 0;
    currentTimeDisplay.textContent = "00:00";
    durationDisplay.textContent = "00:00";

    audio.addEventListener('loadedmetadata', () => {
      seekBar.max = audio.duration;
      durationDisplay.textContent = formatTime(audio.duration);
    }, { once: true });

    if (isPlaying) {
      audio.play().then(() => {
        playIcon.src = "images/pause.png";
        isPlaying = true;
      }).catch(err => console.error("Playback failed:", err));
    } else {
      playIcon.src = "images/play.png";
    }
  };

  // Play/Pause toggle
  playButton.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playIcon.src = "images/play.png";
      isPlaying = false;
    } else {
      audio.play().then(() => {
        playIcon.src = "images/pause.png";
        isPlaying = true;
      }).catch(err => {
        console.error("Playback error:", err);
      });
    }
  });

  // Seek bar updates while song plays
  audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);

    if (audio.ended) {
      nextButton.click(); // auto next
    }
  });

  // Seekbar interaction
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
  });

  // Previous track
  previousButton.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + musicList.length) % musicList.length;
    loadTrack(currentTrack);
  });

  // Load the first track
  loadTrack(currentTrack);
});
