declare interface String {
    prettyMoney: () => string;
    prettyNumber: () => string;
    formatHTML: () => string;
    formatH1: () => String;
    getNumberOfDayFromNow: () => string;
    convertToDay: () => string;
}
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';

declare interface Array<T> {
    contains: (obj: T) => boolean;
}
