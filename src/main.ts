import { ConcreteInterval } from "./concreteInterval";
import { Schedule } from "./schedule";

let nine = new Date();
nine.setHours(9, 0, 0, 0);
let ten = new Date();
ten.setHours(10, 0, 0, 0);
let eleven = new Date();
eleven.setHours(11, 0, 0, 0);

let nineToEleven = new ConcreteInterval(nine, eleven);

const nineElevenScheduleConf = {
    'monday': nineToEleven,
    'tuesday': nineToEleven,
    'wednesday': nineToEleven,
    'thursday': nineToEleven,
    'friday': nineToEleven,
    'saturday': nineToEleven,
    'sunday': nineToEleven,
}

let nineElevenSchedule = new Schedule({
    workingPattern: nineElevenScheduleConf
});

let today = new ConcreteInterval();
let okInterval = new ConcreteInterval(new Date(new Date().setHours(20)));
console.log( today );
console.log( okInterval );

nineElevenSchedule.addWorkingExplicit(today);
console.log( nineElevenSchedule.query(okInterval) );
