let model = {
    company: 'Mister Spex',
    name: '',
    salary: 0,
    list: [
        {
            day: '2019-08-20',
            startTime: 8,
            endTime: 17,
            breakDuration: 1
        },
        {
            day: '2019-08-25',
            startTime: 10,
            endTime: 21,
            breakDuration: 2
        },
        {
            day: '2019-08-29',
            startTime: 9,
            endTime: 15,
            breakDuration: 0.5
        }
    ]
};

const toHoursOfDay = value => value.endTime - value.startTime - value.breakDuration;

const s1 = model.list;
console.log(s1);

const s2 = toHoursOfDay(s1[0]);
console.log(s2);

const s3 = s1.map(toHoursOfDay);
console.log(s3);

const bySumming = (acc, value) => acc += value;

const s4 = s3.reduce((acc, value) => acc += value);
console.log(s4);

const allHours = entries => entries.map(toHoursOfDay).reduce(bySumming);
