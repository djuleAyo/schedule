import { Schedule } from "./schedule";
import { Interval } from "./interval";

const assert = require('chai').assert;

let s: Schedule;
let today: Interval;
let nine: Date;
let ten: Date;
let nineToTen: Interval;

describe('Schedule', () => {

    beforeEach(() => {
        s = new Schedule();
        today = new Interval();
        nine = new Date();
        nine.setHours(9, 0, 0, 0);
        ten = new Date();
        ten.setHours(10, 0, 0, 0);
        nineToTen = new Interval(nine, ten);
    })

    it('should show any interval as free after contruction w/o args', () => {
        assert.isOk(s.query(new Interval(new Date())));
    });

    it('should be able to appoint a free interval', () => {
        let isAppointed = s.appoint(today);

        assert(isAppointed);
        assert(s.appointments.length === 1);
    });

    it('should show taken intervals as such in a query', () => {
        s.appoint(today);

        console.log('today');
        console.log(today);

        console.log('schedule');
        console.log(JSON.stringify(s, null, 2));

        assert.equal(s.query(today), false);
    });
    
});