import { Schedule } from "./schedule";
import { ConcreteInterval } from "./concreteInterval";
import * as ms from './util/ms';

const assert = require('chai').assert;

let s: Schedule;
let today: ConcreteInterval;
let nine: Date;
let ten: Date;
let eleven: Date;
let nineToTen: ConcreteInterval;

describe('Schedule', () => {

    beforeEach(() => {
        s = new Schedule();
        today = new ConcreteInterval();
        nine = new Date();
        nine.setHours(9, 0, 0, 0);
        ten = new Date();
        ten.setHours(10, 0, 0, 0);
        eleven = new Date();
        eleven.setHours(11, 0, 0, 0);
        nineToTen = new ConcreteInterval(nine, ten);
    })

    it('should show any interval as free after contruction w/o args', () => {
        assert.isOk(s.query(new ConcreteInterval(new Date())));
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
        let i1 = new ConcreteInterval(nine, ms.hours);
        let i2 = new ConcreteInterval(ten, ms.hours);
        let i3 = new ConcreteInterval(eleven, ms.hours);

        assert.isOk(
            s.appoint(i1)
            && s.appoint(i2)
            && s.appoint(i3)
            && s.appointments.length === 3
        );
    });

    it('should not schedule when not free', () => {
        let i1 = new ConcreteInterval(nine, ms.hours + 11 * ms.minutes);
        let subinterval = new ConcreteInterval(nine, ms.hours);

        assert.isOk(s.appoint(i1));
        assert.isOk(!s.appoint(i1));
        assert.isOk(!s.appoint(subinterval));
    })
    
});