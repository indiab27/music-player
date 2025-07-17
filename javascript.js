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

  let musicList = [
    { name: "Espresso", artist: "Sabrina Carpenter", path: "songs/Sabrina Carpenter - Espresso.mp3", cover: "images/Espresso_-_Sabrina_Carpenter.png" },
    { name: "Abracadabra", artist: "Lady Gaga", path: "songs/Lady Gaga - Abracadabra.mp3", cover: "images/Lady_Gaga cover.jpg" },
    { name: "Sweet Dreams", artist: "JHOPE ft Miguel", path: "songs/JHOPE (feat. Miguel) - Sweet Dreams.mp3", cover: "images/J-Hope_&_Miguel_-_Sweet_Dreams.jpg" },
    { name: "Birds of a Feather", artist: "Billie Eilish", path: "songs/Billie Eilish - BIRDS OF A FEATHER.mp3", cover: "images/billie eilish_Birds of a feather.png" },
    { name: "Not Like Us", artist: "Kendrick Lamar", path: "songs/Kendrick Lamar - Not Like Us.mp3", cover: "images/Not Like Us_ Kendrick Lamar.jpg" },
    { name: "Apple", artist: "Charli XCX", path: "songs/Charli XCX - Apple.mp3", cover: "images/Charli_XCX_-_Brat_(album_cover).png" }
  ];

  const originalOrder = [...musicList];

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const loadTrack = (index) => {
    const track = musicList[index];
    audio.src = track.path;
    trackName.textContent = track.name;
    artistName.textContent = track.artist;
    displayImage.innerHTML = `<img src="${track.cover}" alt="Cover" width="200">`;

    seekBar.value = 0;
    currentTimeDisplay.textContent = "00:00";
    durationDisplay.textContent = "00:00";

    audio.addEventListener('loadedmetadata', () => {
      seekBar.max = audio.duration;
      durationDisplay.textContent = formatTime(audio.duration);
    }, { once: true });

    if (isPlaying) {
      audio.play().then(() => {
        playIcon.src = "images/pause.png";
      }).catch(err => {
        console.error("Autoplay failed:", err);
        isPlaying = false;
        playIcon.src = "images/play.png";
      });
    } else {
      playIcon.src = "images/play.png";
    }
  };

  playButton.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play().then(() => {
        isPlaying = true;
        playIcon.src = "images/pause.png";
      }).catch(err => {
        console.error("Playback failed:", err);
      });
    } else {
      audio.pause();
      isPlaying = false;
      playIcon.src = "images/play.png";
    }
  });

  audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    if (audio.ended) {
      nextButton.click();
    }
  });

  seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
  });

  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
  });

  shuffleButton.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleIcon.classList.toggle('active', isShuffle);
    shuffleButton.classList.toggle('active');

    if (isShuffle) {
      // Shuffle the musicList array
      const currentTrackData = musicList[currentTrack];
      musicList = musicList
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      // Update currentTrack index to current song's new position
      currentTrack = musicList.findIndex(track => track.path === currentTrackData.path);

      // Immediately change to a random track
      // Pick a random index different from currentTrack for more variety
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * musicList.length);
      } while (randomIndex === currentTrack);
      currentTrack = randomIndex;
      loadTrack(currentTrack);

    } else {
      // Restore original order
      const currentTrackData = musicList[currentTrack];
      musicList = [...originalOrder];

      // Update currentTrack index based on original order
      currentTrack = musicList.findIndex(track => track.path === currentTrackData.path);
      loadTrack(currentTrack);
    }
  });

  nextButton.addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % musicList.length;
    loadTrack(currentTrack);
  });

  previousButton.addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + musicList.length) % musicList.length;
    loadTrack(currentTrack);
  });

  // Initial load
  loadTrack(currentTrack);
});
