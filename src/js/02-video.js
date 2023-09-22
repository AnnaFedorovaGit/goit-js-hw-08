
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
    id: 19231868,
    width: 640
});

player.on('timeupdate', throttle((data) => {
    localStorage.setItem("videoplayer-current-time", data.seconds);
}, 1000));

const timeCode = localStorage.getItem("videoplayer-current-time");

player.setCurrentTime(timeCode).then(function(seconds) {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            alert("The time was less than 0 or greater than the video’s duration");
            break;

        default:
            alert("Some other error occurred");
            break;
    }
});
