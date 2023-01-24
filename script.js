console.log("Welcome To My spotify Clone..");

//Initializing the variables:
let songIndex = 10;
let audioElement = new Audio(`songs/${songIndex}.mp3`);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

//Creating the songLists:
let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Khasa Aala Chahar", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//Aadding the eventlistners now:    
masterPlay.addEventListener('click', () => {
    //conditio whwether its paused or not:
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
        //Changing the song Playname through song index:
        document.getElementById('masterSongName').innerText = songs[songIndex - 1].songName;
        //changng the icons:
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

    }

    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime) / (audioElement.duration) * 100;
    myProgressBar.value = progress;
    //automatically starting a next song:
    if (progress == 100) {
        songIndex = (songIndex) % 10 + 1;
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.play();

        makeAllPlays();
        document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
        document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
    }
});

//Changing the song time while moving the Progress Bar:
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value) / 100) * audioElement.duration;
});


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = e.target.id;
        //changing the audioElement:
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        document.getElementById('masterSongName').innerText = songs[songIndex - 1].songName;

        //changing the pProgressBar:
        myProgressBar.value = ((audioElement.currentTime) / (audioElement.duration)) * 100;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

//making the next button and previous button:
document.getElementById('previous').addEventListener('click', () => {

    if (songIndex == 1) {
        songIndex = 10;
    }

    else {
        songIndex--;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    document.getElementById('masterSongName').innerText = songs[songIndex - 1].songName;
    myProgressBar.value = ((audioElement.currentTime) / (audioElement.duration)) * 100;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    //editing the symbol of currently played song to a new value;
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
});

document.getElementById('next').addEventListener('click', () => {

    if (songIndex == 10) {
        songIndex = 1;
    }

    else {
        songIndex++;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    document.getElementById('masterSongName').innerText = songs[songIndex - 1].songName;
    // console.log(songs[songIndex - 1].songName);
    myProgressBar.value = ((audioElement.currentTime) / (audioElement.duration)) * 100;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    //editing the symbol of currently played song to a new value;
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-play-circle');
    document.getElementById(`${songIndex}`).classList.add('fa-pause-circle');
});