const image = document.querySelector('img');//querySelector allows us to select any element/class/id
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio'); //querySelector allows us to select any element/class/id
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
];


//  check if Playing
let isPlaying = false;

//Play
function playSong(){   
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play()
}

//Pause
function pauseSong(){  
    isPlaying = false; 
    playBtn.classList.replace('fa-pause', 'fa-play' );
    playBtn.setAttribute('title', 'Play');
    music.pause()
}

// Play or Pause Event Listener
// condition ? exprIfTrue : exprIfFalse
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
//textContent to change the value of the title, we don't want to change the element itself
title.textContent = song.displayName; // or innerText - no reflow for textContent / faster
artist.textContent = song.artist;
music.src = `music/${song.name}.mp3`;
image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & time

function updateProgressBar(e){
    if (isPlaying){
       const {duration, currentTime} = e.srcElement;
       // console.log(duration, currentTime);
       
       //Update progress bar width
       const progressPercent = (currentTime / duration) * 100;
        // console.log(progressPercent);
       progress.style.width = `${progressPercent}%`;

       // Calculate display for duration
       const durationMinutes = Math.floor(duration / 60);
       //console.log('minutes', durationMinutes);
       let durationSeconds = Math.floor(duration % 60);
       if (durationSeconds < 10){
        durationSeconds = `0${durationSeconds}`;
       }
       //console.log ('seconds', durationSeconds);
       //durationEl.textContent=`${durationMinutes}:${durationSeconds}`;

       // Delay switvhing duration element to avoid NaN (Not a number)
       if (durationSeconds){
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
       }

       // Calculate display for current
       const currentMinutes = Math.floor(currentTime / 60);
       //console.log('minutes', currentMinutes);
       let currentSeconds = Math.floor(currentTime % 60);
       if (currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`;
       }
       //console.log ('seconds', currentSeconds);
       currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
     }
}

// Set Progress Bar
 function setProgressBar(e) {
    const width = this.clientWidth;
    //console.log('width', width);
    const clickX = e.offsetX;
    //console.log('clickX', clickX);
    const { duration } = music;
    // console.log(clickX / width);
    //console.log((clickX / width) * duration); // value in seconds -- to be used for the progress bar
    music.currentTime = (clickX / width) * duration;
 }

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

    