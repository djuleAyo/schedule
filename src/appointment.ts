import { Interval } from "./interval";

export class Appointment {

    public data: any;
    
    constructor(
        readonly interval: Interval
    ) {
        
    }
}