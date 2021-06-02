import ISO6391 from 'iso-639-1';


export function languageCode(code?: string): string {
    if (!code) {
        return "Unknown"
    }
    return ISO6391.getName(code);
};


export default languageCode;


function appendZero(digit: number): string {

    if (digit > 9) {
        return digit.toString();
    }
    return `0${digit}`;
}

export function format_duration(duration?: number): string {

    if (!duration || duration < 0) {
        return "00:00:00";
    }

    let seconds = duration % 60;
    let minutes = Math.round((duration / 60) % 60);
    let hours = Math.round(duration / 3600);

    return `${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)}`;
}

// format(7406);