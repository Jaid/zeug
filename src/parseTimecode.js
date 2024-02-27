import { firstMatch } from 'super-regex';
const regex = /^\s*((?<hours>\d+)\s*:)?\s*((?<minutes>\d+)\s*:)?\s*(?<seconds>(?<fullSeconds>\d+)(\.(?<secondsFractalDigits>\d+))?)\s*$/;
export const parseTimecode = (input) => {
    const match = firstMatch(regex, input, {
        timeout: 1000,
    })?.namedGroups;
    console.log(match);
    if (match === undefined) {
        return;
    }
    return match;
};
export const timecodeToSeconds = (timecode) => {
    const parsed = parseTimecode(timecode);
    if (parsed === undefined) {
        return;
    }
    const hours = parsed.hours ? Number(parsed.hours) : 0;
    const secondsFromHours = hours * 60 * 60;
    const minutes = parsed.minutes ? Number(parsed.minutes) : 0;
    const secondsFromMinutes = minutes * 60;
    const seconds = Number(parsed.seconds);
    return secondsFromHours + secondsFromMinutes + seconds;
};
export const timecodeToSecondsString = (timecode) => {
    const parsed = parseTimecode(timecode);
    if (parsed === undefined) {
        return;
    }
    const hours = parsed.hours ? Number(parsed.hours) : 0;
    const secondsFromHours = hours * 60 * 60;
    const minutes = parsed.minutes ? Number(parsed.minutes) : 0;
    const secondsFromMinutes = minutes * 60;
    const seconds = Number(parsed.fullSeconds);
    const fullSeconds = secondsFromHours + secondsFromMinutes + seconds;
    if (parsed.secondsFractalDigits === undefined) {
        return fullSeconds.toString();
    }
    return `${fullSeconds}.${parsed.secondsFractalDigits}`;
};
export const timecodeToMs = (timecode) => {
    const seconds = timecodeToSeconds(timecode);
    if (seconds === undefined) {
        return;
    }
    return Math.trunc(seconds * 1000);
};
