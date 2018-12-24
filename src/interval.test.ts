import { Interval } from "./interval";
import * as ms from './util/ms';

let assert = require('chai').assert;

let ten = new Date();
let eleven = new Date();
let twelve = new Date();
let nine = new Date();

describe('Interval', () => {

    beforeEach(() => {
        ten.setHours(10, 0, 0, 0);
        eleven.setHours(11, 0, 0, 0);
        twelve.setHours(12, 0, 0, 0);
        nine.setHours(9, 0, 0, 0);
    });

    it('should construct today by default', () => {
        let i = new Interval();
        let now = new Date();

        assert.isOk(i.start.getTime() === now.setHours(0, 0, 0, 0));
        assert.isOk(i.end.getTime() === now.setHours(23, 59, 59, 999));
    });

    it('should take 1 arg - date and make 0 duration interval', () => {
        let now = new Date();

        let i = new Interval(now);

        assert.isOk(i.start === now);
        assert.isOk(i.start.getTime() === i.end.getTime());
    });

    it('should take 2 dates', () => {
        let now = new Date();
        let later = new Date(now.getTime() + ms.minutes);

        let i = new Interval(now, later);

        assert.isOk(now === i.start);
        assert.isOk(later === i.end);

    });

    it('should throw if end is before start', () => {
        let now = new Date();
        let before = new Date(now.getTime() - 24 * ms.hours);

        assert.throws(() => {
            let i = new Interval(now, before);
        });
    });

    describe('contains', () => {
        it('should return true for: is now in today?', () => {
            let i = new Interval();
            let now = new Date();

            assert.isOk(i.contains(now));
        });

        it('should return false for: is yesterday this time in today', () => {
            let i = new Interval();
            let now = new Date( new Date().getTime() - 24 * 60 * 60 * 1000);
            
            assert.isOk(!i.contains(now));
        });

        it('should contain it self', () => {
            let i = new Interval();
            assert.isOk(i.contains(i));
        });

        it('should be true for: today contains now-interval', () => {
            let i = new Interval();
            let now = new Interval(new Date());

            assert.isOk(i.contains(now));
        });

        it('should be true for: 10-12 contains 10-11', () => {

            let i1 = new Interval(ten, twelve);
            let i2 = new Interval(ten, eleven);

            assert.isOk(i1.contains(i2));
        });

        it('should be false for: 10-12 contains 9-11', () => {

            let i1 = new Interval(ten, twelve);
            let i2 = new Interval(nine, eleven);

            assert.isOk(!i1.contains(i2));
        });
    });

    describe('intersect', () => {
        it('should returt the original if contained', () => {
            let i1 = new Interval(ten, twelve);
            let i2 = new Interval(ten, eleven);

            assert.isOk(i1.intersect(i2) === i2);
        });

        it('should return intersected interval', () => {
            let i1 = new Interval(nine, eleven);
            let i2 = new Interval(ten, twelve);

            let actual1 = i1.intersect(i2);
            let actual2 = i2.intersect(i1);
            let expected = new Interval(ten, eleven);

            assert.isOk(actual1.start.getTime() === expected.start.getTime());
            assert.isOk(actual2.start.getTime() === expected.start.getTime());

            assert.isOk(actual1.end.getTime() === expected.end.getTime());
            assert.isOk(actual2.end.getTime() === expected.end.getTime());
        });
    });
    
});