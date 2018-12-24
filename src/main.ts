import { Schedule } from "./schedule";
import { Interval } from "./interval";

let s = new Schedule();
let today = new Interval();

let isFree = s.query(today);

let isAppointed = s.appoint(today);

isFree = s.query(today);