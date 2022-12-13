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

// Array.prototype.contains = function (obj) {
//   var i = 0;
//   for (; i < this.length; i++) {
//     if (this[i] === obj) return true;
//   }
//   return false;
// };
