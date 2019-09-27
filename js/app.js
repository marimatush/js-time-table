let model = {
    company: 'Mister Spex',
    name: '',
    salary: 0,
    list: []
};

let totalHours = 0;
let workingHours = 0;
let monthlySalary = 0;

const heading = document.querySelector('h1');
const nameField = document.querySelector('#TTNameSurname');
const salaryField = document.querySelector('#TTHourlyWage');
const appOutput = document.querySelector('#TTHours');
const monthlySalaryOutput = document.querySelector('#TTMonthlySalary');
const scrollContainer = document.querySelector('.tt-c-scrollContainer');
const ttDialog = document.querySelector('dialog');
const openDialogButton = document.querySelector('button.tt-button--opendialog');
const closeDialogButton = document.querySelector('button.tt-button--closedialog');
const ttForm = document.querySelector('dialog form');
const ttResetButton = document.querySelector('#TTResetButton');
const addButton = document.querySelector('button.tt-button--add')

const calculate = () => {
    monthlySalary = (totalHours * model.salary).toFixed(2);
};

const extractHour = time => {
    const parts = time.split(":");
    const hour = parts[0];
    return parseInt(hour);
}

const totalTimestamp = value => value.endTime - value.startTime - value.breakDuration;
const hoursOfDay = value => parseFloat(((value.endTime - value.startTime - value.breakDuration) / 1000 / 60 / 60).toFixed(2));
const bySumming = (acc, value) => acc += value;
const allHours = entries => entries.map(hoursOfDay).reduce(bySumming);
const allHoursOutput = (entries) => {
    const total = entries.map(totalTimestamp).reduce(bySumming);
    return msToHHMM(total);
}
const saveModelToLocalStorage = () => localStorage.setItem('myData', JSON.stringify(model));
const getBreakDuration = () => ttForm.elements.TTBreak.valueAsNumber;
const getStartTime = () => ttForm.elements.TTStartTime.valueAsNumber;
const getEndTime = () => ttForm.elements.TTEndTime.valueAsNumber;

const msToHHMM = (ms) => {
    const min = ms / 1000 / 60;
    const hours = min / 60;
    let hh = Math.floor(hours);
    let mm = Math.floor((hours - hh) * 60);
    
    hh = String(hh).padStart(2, '0');
    mm = String(mm).padStart(2, '0');

    return hh + ':' + mm;
}

const convertListIntoTable = (acc, value) => {
    const totalms = totalTimestamp(value);
    const hours = msToHHMM(totalTimestamp(value));

    return `${acc}<tr><td>${value.day}</td><td>${hours} Hours</td></tr>`;
};

const render = (model) => {
    const tableHTMLMString = model.list.reduce(convertListIntoTable, '<table><tbody>') + '</tbody></table>';
    if (model.list.length > 0) {
        totalHours = allHours(model.list);
        workingHours = allHoursOutput(model.list);
    } else {
        totalHours = 0;
        workingHours = 0;
    }  

    calculate();
    heading.innerText = `${model.company} Time Sheet ${model.name}`;
    nameField.value = model.name
    salaryField.value = model.salary
    appOutput.innerText = `${workingHours} Hours`;
    monthlySalaryOutput.innerText = `${monthlySalary} €`;

    scrollContainer.innerHTML = tableHTMLMString;
};

const onNameFieldChanged = (event) => {
    const newName = event.target.value;
    model.name = newName;

    saveModelToLocalStorage();
    console.log(`name field was changed to ${newName}`);
    render(model);
};

const onSalaryFieldChanged = (event) => {
    const newSalary = event.target.value;
    model.salary = newSalary;

    saveModelToLocalStorage();
    console.log(`salary field was changed to ${newSalary}`);
    render(model);
};

const onDialogClosed = () => {
    const returnValue = ttDialog.returnValue;
    console.log(`Dialog is closed with ${returnValue}`);
    if (returnValue !== 'add') {
        return;
    }

    const day = ttForm.elements.TTDay.value;
    const breakDuration = getBreakDuration();
    const startTime = getStartTime();
    const endTime =  getEndTime();

    const newEntry = {
        day,
        startTime,
        endTime,
        breakDuration
    };

    model.list.push(newEntry);
    saveModelToLocalStorage();
    render(model);
};

const onTimesheetReset = (event) => {
    if (model.list.length === 0) {return;}

    if (window.confirm('Are you sure you want to clear Timesheet?')) {
        model.list = [];
        saveModelToLocalStorage();
        render(model);
    }
}

const isStartBeforeEnd = () => (getEndTime() < getStartTime());

const isNegativeWorktime = () => (getEndTime() - getStartTime() - getBreakDuration()) < 0;

const isFutureDate = () => ttForm.elements.TTDay.valueAsDate > new Date();


const onAddButtonClicked = (event) => {
    if (ttForm.reportValidity() === false) {
        event.preventDefault();
        return;
    }

    if (isStartBeforeEnd()) {
        window.alert('End time cannot be earlier than Start time');
        event.preventDefault();
        return;
    }

    if (isNegativeWorktime()) {
        window.alert('Working time cannot be negative');
        event.preventDefault();
        return;
    }

    if (isFutureDate()) {
        window.alert('Working date cannot be in the future');
        event.preventDefault();
        return;
    }    
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Hello, Mister Spex!');
    const myData = localStorage.getItem('myData')

    if(myData !== null) {
        model = JSON.parse(myData)
    }

    nameField.addEventListener('keyup', onNameFieldChanged);
    salaryField.addEventListener('keyup', onSalaryFieldChanged);
    openDialogButton.addEventListener('click', () => {
        ttDialog.showModal();
    });
    closeDialogButton.addEventListener('click', () => {
        ttDialog.close();
    })
    ttDialog.addEventListener('close', onDialogClosed);
    ttResetButton.addEventListener('click', onTimesheetReset);
    addButton.addEventListener('click', onAddButtonClicked);
    render(model);
});


// homework: more validations!!!
// look up some other forms with validations and add to our project
// add a message at the page insted of alerts