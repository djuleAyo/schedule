import { Appointment } from "./appointment";
import { ConcreteInterval } from "./concreteInterval";
import * as ms from './util/ms';

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
    readonly workingPattern: Schedule.Conf = {};

    /**
     * With no arguments the schedule represents timeline. It is infinite.
     * These can only be a root in schedule tree.
     */
    constructor();
    constructor(conf: Schedule.Conf);
    constructor(...args) {

        // super(new Interval(new Date(0), new Date(Number['MAX_SAFE_INTEGER'])));
        if (args.length === 1) {
            let conf = args[0];
            if (conf.workingPattern) {
                if (conf.workingPattern.constructor == ConcreteInterval)
                    this.initWorkingPatternInterval(conf.workingPattern);
                else
                    this.workingPattern = conf.workingPattern;
            }
        }
    
    }
    private initWorkingPatternInterval(interval: ConcreteInterval): void
    {
        ms.dayNames.forEach(dayName => {
            this.workingPattern[dayName] = interval;
        });
    }    

    public appoint(interval: ConcreteInterval): boolean
    {
        const isFree = this.query(interval);
        if (!isFree) return false;

        this.appointments.push(new Appointment(interval));
        return true;
    }

    public query(interval: ConcreteInterval): boolean
    {
        let retVal = true;

        // check if interval meets workingPattern
        
        if (
            !this.workingPattern[ms.dayNames[interval.start.getUTCDay() - 1]]
            .softContains(interval)    
        ) {
            return false;
        }

        // check if interval is not contained in existing appointments
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
    export type WeekIntervalConf = ConcreteInterval | {
        "monday"?: ConcreteInterval,
        "tuesday"?: ConcreteInterval,
        "wednesday"?: ConcreteInterval,
        "thursday"?: ConcreteInterval,
        "friday"?: ConcreteInterval,
        "saturday"?: ConcreteInterval,
        "sunday"?: ConcreteInterval
    };
    
    /**
     * Precedence is as follows:
     * queryMiddler - disables all other conf
     * Explicit - overrides patterns
     * patters - the lowest
     */
    export type Conf = {
        workingPattern?: WeekIntervalConf,
        workingExplicit?: Array<ConcreteInterval>,
        excludePattern?: WeekIntervalConf,
        excludeExplicit?: Array<ConcreteInterval>,
        queryMiddler?: (Interval) => boolean,

        cooldown?: number,
        minDuration?: number,
        timeUnit?: number
    };
}
