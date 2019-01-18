import { Schedule } from "./schedule";
import { ConcreteInterval } from "./concreteInterval";
import * as ms from './util/ms';
import { ok } from "assert";

const assert = require('chai').assert;


// Test data init---------------------------------------------------------------
let s: Schedule;
let today: ConcreteInterval;
let nine: Date;
let ten: Date;
let eleven: Date;
let nineToTen: ConcreteInterval;
let nineToEleven: ConcreteInterval;

let nineElevenScheduleConf: Schedule.WeekIntervalConf;
let nineElevenSchedule: Schedule;

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
        nineToEleven = new ConcreteInterval(nine, eleven);

        nineElevenScheduleConf = {
            'monday': nineToEleven,
            'tuesday': nineToEleven,
            'wednesday': nineToEleven,
            'thursday': nineToEleven,
            'friday': nineToEleven,
            'saturday': nineToEleven,
            'sunday': nineToEleven,
        }

        nineElevenSchedule = new Schedule({
            workingPattern: nineElevenScheduleConf
        });
    });

    // end test data init ------------------------------------------------------

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
    });

    describe('working pattern', () => {
        it('should be able to take working pattern in constructor as concrete interval', () => {
            let s = new Schedule({
                workingPattern: new ConcreteInterval(nine, eleven)
            });
            assert.deepEqual(s.workingPattern, nineElevenScheduleConf);
        });
        it('should be able to take working pattern in constructor as week config', () => {
            let s = new Schedule({
                workingPattern: nineElevenScheduleConf
            });
            assert.deepEqual(s.workingPattern, nineElevenScheduleConf);
        });
        it('should direct a query as expected', () => {
            assert.isOk(!nineElevenSchedule.query(
                new ConcreteInterval(new Date(new Date().setHours(12)))
            ));
            assert.isOk(nineElevenSchedule.query(
                new ConcreteInterval(new Date(new Date().setHours(10)))
            ));
            assert.isOk(nineElevenSchedule.appoint(
                new ConcreteInterval(new Date(new Date().setHours(10)))
            ));
            assert.isOk(!nineElevenSchedule.query(
                new ConcreteInterval(new Date(new Date().setHours(10)))
            ));
        });
    });

    describe('worknig explicit', () => {
        
        it('should be able to take worknig explicit in constructor as part of config', () => {
            let s = new Schedule({
                workingExplicit: [nineToEleven]
            });
            assert.deepEqual(s.workingExplicit, [nineToEleven]);
        });

        it('should be able to reconfigure working explicit', () => {
            s.addWorkingExplicit(nineToEleven);
            assert.isOk(s.workingExplicit.find(interval => interval.equals(nineToEleven)));
        });
        it('should direct a query as expected', () => {
            let today = new ConcreteInterval();
            let okInterval = new ConcreteInterval(new Date(new Date().setHours(20)));
            console.log( today );
            console.log( okInterval );
            
            nineElevenSchedule.addWorkingExplicit(today);
            assert.isOk(
                nineElevenSchedule.query(okInterval)
            );
        });
    });

    
    
});