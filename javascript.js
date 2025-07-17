// playerUI.js

import {
  audio, musicList, currentTrack, isPlaying, isShuffle,
  formatTime, loadTrack
} from './playerCore.js';

import * as core from './playerCore.js';

document.addEventListener('DOMContentLoaded', () => {
  // Assign DOM elements to core module variables
  core.audio = document.getElementById('audio');
  core.playIcon = document.getElementById('play-icon');
  const playButton = document.getElementById('play');
  const nextButton = document.getElementById('next');
  const previousButton = document.getElementById('previous');
  const shuffleButton = document.getElementById('shuffle');
  const shuffleIcon = document.getElementById('shuffle-icon');
  const volumeSlider = document.getElementById('volume-slider');

  core.seekBar = document.querySelector('.seekbar');
  core.currentTimeDisplay = document.querySelector('.current-time');
  core.durationDisplay = document.querySelector('.song-duration');

  core.trackName = document.getElementById('track-name');
  core.artistName = document.getElementById('artist-name');
  core.displayImage = document.querySelector('.display-image');

  // Load the first track
  loadTrack(currentTrack);

  // Play / Pause
  playButton.addEventListener('click', () => {
    if (core.isPlaying) {
      core.audio.pause();
      core.playIcon.src = "images/play.png";
      core.isPlaying = false;
    } else {
      core.audio.play();
      core.playIcon.src = "images/pause.png";
      core.isPlaying = true;
    }
  });

  // Time update and auto-next
  core.audio.addEventListener('timeupdate', () => {
    core.seekBar.value = core.audio.currentTime;
    core.currentTimeDisplay.textContent = formatTime(core.audio.currentTime);

    if (core.audio.currentTime >= core.audio.duration) {
      nextButton.click();
    }
  });

  // Seek bar control
  core.seekBar.addEventListener('input', () => {
    core.audio.currentTime = core.seekBar.value;
  });

  // Volume
  volumeSlider.addEventListener('input', () => {
    core.audio.volume = volumeSlider.value / 100;
  });

  // Shuffle toggle
  shuffleButton.addEventListener('click', () => {
    core.isShuffle = !core.isShuffle;
    shuffleIcon.classList.toggle('active', core.isShuffle);
    shuffleButton.classList.toggle('active');
  });

  // Next track
  nextButton.addEventListener('click', () => {
    if (core.isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * musicList.length);
      } while (randomIndex === core.currentTrack);
      core.currentTrack = randomIndex;
    } else {
      core.currentTrack = (core.currentTrack + 1) % musicList.length;
    }
    loadTrack(core.currentTrack);
    if (core.isPlaying) core.audio.play();
  });

  // Previous track
  previousButton.addEventListener('click', () => {
    core.currentTrack = (core.currentTrack - 1 + musicList.length) % musicList.length;
    loadTrack(core.currentTrack);
    if (core.isPlaying) core.audio.play();
  });
});
