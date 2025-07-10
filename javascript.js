document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play');
  const playIcon = document.getElementById('play-icon');
  const audio = document.getElementById('audio');
  let isPlaying = false;

  playButton.addEventListener('click', () => {
    if (isPlaying) {
      // Stop the song and reset
      audio.pause();
      audio.currentTime = 0;
      playIcon.src = 'images/play.png';
      playIcon.alt = 'Play';
      isPlaying = false;
    } else {
      // Play the song
      audio.play();
      playIcon.src = 'images/pause.png';
      playIcon.alt = 'Pause';
      isPlaying = true;
    }
  });

  // Optional: When the song ends, revert to play icon
  audio.addEventListener('ended', () => {
    playIcon.src = 'play.png';
    playIcon.alt = 'Play';
    isPlaying = false;
  });
});
