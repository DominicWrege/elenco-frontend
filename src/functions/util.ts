import ISO6391 from 'iso-639-1';
import { stripHtml } from 'string-strip-html';
import { FeedModerator } from '../models/feeds';

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
            year: '2-digit',
            month: 'numeric',
            day: 'numeric',
            hour12: false,
            timeZone: 'UTC'
        });

        return formatter.format(date);

    }


    export function scrollTop(): void {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

    }

    export function removeRows(selectedRows: number[], feeds: FeedModerator[]): FeedModerator[] {

        for (const id of selectedRows) {
            const index = feeds.findIndex((feed: FeedModerator) => feed.id === id);
            feeds.splice(index, 1);
        }
        return [...feeds];
    }

    export function removeHtml(text?: string) {
        if (!text) {
            return "";
        }
        return stripHtml(text ?? "").result;
    }
}

export default util;

// format(7406);