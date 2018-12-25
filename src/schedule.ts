import { Appointment } from "./appointment";
import { Interval } from "./interval";

/**
 * 4 main characteristics:
 * 
 * 1. it's a composite pattern
 * 2. User can add nodes relative to parrent or absolute as Date respesentations
 * 3. User can easily describe interval patterns such as: from 4 to 6 on mondays
 * and sundays, etc.
 * 4. These are no overlaps in appointments - this is what makes the schedule
 * simple.
 */
export class Schedule {
    
    readonly appointments: Array<Appointment> = [];

    /**
     * With no arguments the schedule represents timeline. It is infinite.
     * These can only be a root in schedule tree.
     */
    constructor();
    constructor(conf: Schedule.Conf);
    constructor(...args) {

        // super(new Interval(new Date(0), new Date(Number['MAX_SAFE_INTEGER'])));
        if (args.length === 1) {

        }
    
    }
    

    public appoint(interval: Interval): boolean
    {
        const isFree = this.query(interval);
        if (!isFree) return false;

        this.appointments.push(new Appointment(interval));
        return true;
    }

    public query(interval: Interval): boolean
    {
        let retVal = true;
        this.appointments.forEach(appointment => {
            if(appointment.interval.intersect(interval)) retVal = false;
        });
        return retVal;
    }
}

export module Schedule
{
    /**
     * If only interval is provided it is applied to all days
     * If both interval and days are provided then days takes precedence
     */
    export type WeekIntervalConf = Interval | {
        "mo"?: Interval,
        "tu"?: Interval,
        "we"?: Interval,
        "th"?: Interval,
        "fr"?: Interval,
        "sa"?: Interval,
        "su"?: Interval
    };
    /**
     * Precedence is as follows:
     * queryMiddler - disables all other conf
     * Explicit - overrides patterns
     * patters - the lowest
     */
    export type Conf = {
        workingPattern?: WeekIntervalConf,
        workingExplicit?: Array<Interval>,
        excludePattern?: WeekIntervalConf,
        excludeExplicit?: Array<Interval>,
        queryMiddler?: (Interval) => boolean
    };
}
