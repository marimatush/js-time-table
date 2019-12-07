const time = "01:30";
const parts = time.split(':');
console.log(parts);
const hour = parts[0];
console.log(hour);
const hourNumber = parseInt(hour);
console.log(hourNumber);

const extractHour = time => parseInt(time.split(':')[0]);

console.log(extractHour("02:30"));
