import { ConcreteInterval } from "./concreteInterval";
import * as ms from './util/ms';
import { Schedule } from "./schedule";

let ten = new Date();
let eleven = new Date();
let twelve = new Date();
let nine = new Date();

ten.setHours(10, 0, 0, 0);
eleven.setHours(11, 0, 0, 0);
twelve.setHours(12, 0, 0, 0);
nine.setHours(9, 0, 0, 0);

let nineToEleven = new ConcreteInterval(nine, eleven);

let nineElevenScheduleConf = {
    'monday': nineToEleven,
    'tuesday': nineToEleven,
    'wednesday': nineToEleven,
    'thursday': nineToEleven,
    'friday': nineToEleven,
    'saturday': nineToEleven,
    'sunday': nineToEleven,
}

let nineTen = new ConcreteInterval(nine, ten);
let elevenTwelve = new ConcreteInterval(
    new Date(ten.getTime() - ms.days),
    new Date(twelve.getTime() - ms.days)
);

let s = new Schedule({
    // workingPattern: nineElevenScheduleConf,
    excludePattern: nineElevenScheduleConf
})

let testVal = new ConcreteInterval(twelve)
console.log( s.query(testVal) );
