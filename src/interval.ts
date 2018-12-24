export class Interval {
    
    readonly start: Date;
    readonly end: Date;

    constructor();
    constructor(start: Date);
    constructor(start: Date, end: Date);
    constructor(start: Date, duration: number);
    constructor(...args)
    {
        if (args.length === 0) {
            this.start = new Date();
            this.start.setHours(0, 0, 0, 0);

            this.end = new Date();
            this.end.setHours(23, 59, 59, 999);
            return;
        }

        if (args.length === 2 && args[1].constructor == Date) {
            let end = args[1];
            let start = args[0];
    
            if (end < start) throw new Error('Invalid interval. End must be after start.');

            this.start = start;
            this.end = end;

            return;
        }

        if (args.length === 2 && typeof(args[1]) === 'number') {
            let duration = args[1];
            let start = args[0];
            
            this.start = start;
            this.end = new Date(start.getTime() + duration);

            return;
        }

        if (args.length === 1) {
            let start = args[0];

            this.start = start;
            this.end = new Date(start.getTime());

            return;
        }

    }

    public intersect(interval: Interval) {
        if(this.contains(interval)) return interval;

        if(this.contains(interval.start) && !this.contains(interval.end)) {
            return new Interval(interval.start, this.end);
        }

        if(this.contains(interval.end) && !this.contains(interval.start)) {
            return new Interval(this.start, interval.end);
        }

        return undefined;
    }

    public contains(date: Date): boolean;
    public contains(interval: Interval): boolean;
    public contains(...args) {
        
        if (args.length === 1) {

            if (args[0].constructor === Date) {
                if(this.start < args[0] && this.end > args[0]) 
                    return true;
                else 
                    return false;
            }

            if(args[0].constructor === Interval) {
                let interval = args[0];

                if (this.start <= interval.start && this.end >= interval.end)
                    return true;
                else 
                    return false;
            }
        }
    }

    
    public minus(interval: Interval): [Interval, Interval] | Interval | undefined
    {
        if (interval.contains(this)) return undefined;
        if (!this.intersect(interval)) return this;
        
        if (this.contains(interval)) 
            return [
                new Interval(this.start, interval.start),
                new Interval(interval.end, this.end)
            ];

        if (this.contains(interval.start))
            return new Interval(this.start, interval.start);


        if (this.contains(interval.end))
            return new Interval(interval.end, this.end);

        return [undefined, undefined];
    }
}