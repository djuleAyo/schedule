import { ConcreteInterval } from "./concreteInterval";
import * as ms from './util/ms';
import { Schedule } from "./schedule";

let ten = new Date();
let eleven = new Date();
let twelve = new Date();
let nine = new Date();


let emptySchedule = new Schedule();
let today = new ConcreteInterval();
nine = new Date();
nine.setHours(9, 0, 0, 0);
ten = new Date();
ten.setHours(10, 0, 0, 0);
eleven = new Date();
eleven.setHours(11, 0, 0, 0);
twelve = new Date();
twelve.setHours(12, 0, 0, 0);
let nineToTen = new ConcreteInterval(nine, ten);
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

let nineElevenSchedule = new Schedule({
    workingPattern: nineElevenScheduleConf
});

let nineTen = new ConcreteInterval(nine, ten);
let elevenTwelve = new ConcreteInterval(
    new Date(ten.getTime() - ms.days),
    new Date(twelve.getTime() - ms.days)
);

let s = new Schedule({
    // workingPattern: nineElevenScheduleConf,
    excludePattern: nineElevenScheduleConf
});

console.log( nineElevenSchedule.query(
    new ConcreteInterval(new Date(new Date().setHours(12)))
) );
console.log( nineElevenSchedule.query(
    new ConcreteInterval(new Date(new Date().setHours(10)))
) );
console.log( nineElevenSchedule.appoint(
    new ConcreteInterval(new Date(new Date().setHours(10)))
));

console.log( 
    nineElevenSchedule.query(  
        new ConcreteInterval(new Date(ten.getTime() + ms.minutes))
    )
);




// assert.isOk(!nineElevenSchedule.query(
//     new ConcreteInterval(new Date(new Date().setHours(10)))
// ));

// nineElevenSchedule.query(new ConcreteInterval(
//     new Date(ten.getTime() + ms.minutes), 
//     new Date(eleven.getTime() - ms.minutes
// )));


