import ISO6391 from 'iso-639-1';

export namespace util {


    export function languageCode(code?: string): string {
        if (!code) {
            return "Unknown"
        }
        return ISO6391.getName(code);
    };

    function appendZero(digit: number): string {

        if (digit > 9) {
            return digit.toString();
        }
        return `0${digit}`;
    }


    export function urlParameter(key: string) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    }

    export function formatDuration(duration?: number): string {

        if (!duration || duration < 0) {
            return "00:00:00";
        }

        const seconds = duration % 60;
        const minutes = Math.round((duration / 60) % 60);
        const hours = Math.round(duration / 3600);
        return `${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)}`;
    }

    export function formatDate(dateStr?: string): string | null {

        if (!dateStr) {
            return null;
        }

        const date = Date.parse(dateStr)
        const formatter = new Intl.DateTimeFormat(navigator.language, {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour12: false,
            timeZone: 'UTC'
        });

        return formatter.format(date);

    }
}

export default util;

// format(7406);