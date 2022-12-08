//Initialize var
let songIndex = 0;
let audio = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    { songName: "It's Always Blue", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Trap", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "They Mad", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Plug Walk", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Song Title", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "The Safety Dance", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Back It Up", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Song Title", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Song Title", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Let Me Love You", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }



]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handle play pause
masterPlay.addEventListener("click", function () {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        document.getElementById(songIndex).classList.add("fa-circle-pause");
        document.getElementById(songIndex).classList.remove("fa-circle-play");
    }
    else {
        audio.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        document.getElementById(songIndex).classList.remove("fa-circle-pause");
        document.getElementById(songIndex).classList.add("fa-circle-play");
    }

});
//Event listners
audio.addEventListener("timeupdate", function () {
    //Update Seekbar
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", function () {
    audio.currentTime = myProgressBar.value * audio.duration / 100;
});


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        console.log(e.target);
        makeAllPlays();
        gif.style.opacity = 1;
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audio.src = "songs/"+(songIndex+1)+".mp3";
        audio.currentTime = 0;
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    });

});

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    audio.src = "songs/"+(songIndex+1)+".mp3";
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex-=1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    makeAllPlays();
    document.getElementById(songIndex).classList.add("fa-circle-pause");
    audio.src = "songs/"+(songIndex+1)+".mp3";
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})