import * as ms from './util/ms';

export class DailyInterval {

    readonly start: number;
    readonly end: number;

    constructor(start?: Date | number, end?: Date | number);
    constructor(...args) {
        
        if (args.length === 0) {
            this.start === 0;
            this.end === 24 * ms.hours - 1;
            return;
        }
        let start, end;

        if (args.length > 0) {
            start = typeof(args[0]) === 'number' ? args[0] : ms.inTheDay(args[0]);
        } else {
            this.start = 0;
        }

        if (args.length > 1) {
            end = typeof(args[1] === 'number' ? args[1] : ms.inTheDay(args[1]));
        } else {
            end = start;
        }

        this.start = start;
        this.end = end;
    }
}