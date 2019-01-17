import * as ms from './util/ms';
import { Schedule } from "./schedule";
import { ConcreteInterval } from "./concreteInterval";

let s = new Schedule();
let today = new ConcreteInterval();

// let isFree = s.query(today);

// let isAppointed = s.appoint(today);

// isFree = s.query(today);


let ten = new Date();
let eleven = new Date();
let twelve = new Date();
let nine = new Date();

ten.setHours(10, 0, 0, 0);
eleven.setHours(11, 0, 0, 0);
twelve.setHours(12, 0, 0, 0);
nine.setHours(9, 0, 0, 0);


let nineTen = new ConcreteInterval(nine, ten);
let yesterdayIn = new Date(nine.getTime() - 24 * ms.hours + 25);
let yesterdayOut = new Date(nine.getTime() - 24 * ms.hours - 25);

console.log( nineTen );
console.log( yesterdayIn );
console.log( yesterdayOut );

console.log( nineTen.softContains(yesterdayIn));
