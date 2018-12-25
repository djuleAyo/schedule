import { Schedule } from "./schedule";
import { Interval } from "./interval";
import * as ms from './util/ms';

const assert = require('chai').assert;

let s: Schedule;
let today: Interval;
let nine: Date;
let ten: Date;
let eleven: Date;
let nineToTen: Interval;

describe('Schedule', () => {

    beforeEach(() => {
        s = new Schedule();
        today = new Interval();
        nine = new Date();
        nine.setHours(9, 0, 0, 0);
        ten = new Date();
        ten.setHours(10, 0, 0, 0);
        eleven = new Date();
        eleven.setHours(11, 0, 0, 0);
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

        assert.equal(s.query(today), false);
    });

    it('should schedule adjecent intervals', () => {
        let i1 = new Interval(nine, ms.hours);
        let i2 = new Interval(ten, ms.hours);
        let i3 = new Interval(eleven, ms.hours);

        assert.isOk(
            s.appoint(i1)
            && s.appoint(i2)
            && s.appoint(i3)
            && s.appointments.length === 3
        );
    });

    it('should not schedule when not free', () => {
        let i1 = new Interval(nine, ms.hours + 11 * ms.minutes);
        let subinterval = new Interval(nine, ms.hours);

        assert.isOk(s.appoint(i1));
        assert.isOk(!s.appoint(i1));
        assert.isOk(!s.appoint(subinterval));
    })
    
});