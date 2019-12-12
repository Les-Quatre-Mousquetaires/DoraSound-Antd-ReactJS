/*
 * Created by @tranphuquy19 on 11/12/2019
 * Email: tranphuquy19@gmail.com
 */
import config from './config';

const getRoundTime = (time, duration) => {
    if (typeof time === 'number' && typeof duration === 'number') {
        return Math.round((time / duration) * 100);
    } else return 0;
}

const getSeekTime = (seekValue, duration) => {
    if (typeof seekValue === 'number' && typeof duration === 'number') {
        return seekValue / 100 * duration;
    } else return null;
}
const fancyTimeFormat = (time) => {
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
const convertToPlayerItemObject = (obj) => {
    return `${config.API_URL}/resources/audios/${obj.src}`;

}
export {
    getRoundTime,
    getSeekTime,
    fancyTimeFormat,
    convertToPlayerItemObject
}
