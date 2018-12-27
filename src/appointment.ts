import { ConcreteInterval } from "./concreteInterval";

export class Appointment {

    public data: any;
    
    constructor(
        readonly interval: ConcreteInterval
    ) {
        
    }
}