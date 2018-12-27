import { Schedule } from "./schedule";
import { ConcreteInterval } from "./concreteInterval";

let s = new Schedule();
let today = new ConcreteInterval();

let isFree = s.query(today);

let isAppointed = s.appoint(today);

isFree = s.query(today);