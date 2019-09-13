const s1 = model.list;

const s2 = hoursOfDay(s1[0]);

const s3 = s1.map(hoursOfDay);
const s4 = s3.reduce((acc, value) => acc += value);

const allHours = entries => entries.map(hoursOfDay).reduce((acc, value) => acc += value);