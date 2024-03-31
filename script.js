'use strict'

const nameInput = document.querySelector('[name="name"]');
const surNameInput = document.querySelector('[name="surName"]');
const ageInput = document.querySelector('[name="age"]');
const genderSelect = document.querySelector('[name="gender"]');
const childrenCheckbox = document.querySelector('.children-checkbox');
const workSelect = document.querySelector('[name="work-select"]');

const driverBox = document.querySelector('.driver-data');
const driverCheckbox = document.querySelectorAll('.driver-checkbox');
const drivingExperienceInput = document.querySelector('[name="driving-experience"]');

const plumberBox = document.querySelector('.plumber-data');
const categoryInput = document.querySelector('[name="category"]');
const workExperienceInput = document.querySelector('[name="work-experience"]');

const saveBtn = document.querySelector('.button_save');
const deleteBtn = document.querySelector('.button_delete');

const dataOutputTable = document.querySelector('.table');
const tableNameOutput = document.querySelector('.table-name-output');
const tableDataOutput = document.querySelector('.table-data-output');

const arrWorkers = [];

const arrRusName = {
	_name: 'имя',
	_surName: 'фамилия',
	_age: 'возраст',
	_gender: 'пол',
	_children: 'дети',
	profession: 'специальность',
	_driverCategory: 'водительское уд.',
	_drivingExperience: 'стаж вождения',
	_category: 'рязряд',
	_workExperience: 'стаж работы'

};

let dataLS = JSON.parse(localStorage.getItem('newWorker'));

class Worker {
	constructor(name, surName, age, gender, children) {
		this._name = name;
		this._surName = surName;
		this._age = age;
		this._gender = gender;
		this._children = children;
	}
	get name() {
		return this._name;
	}
	get surName() {
		return this._surName;
	}
	get age() {
		return this._age;
	}
	get gender() {
		return this._gender;
	}
	get children() {
		return this._children;
	}
	set name(arg) {
		this._name = arg;
	}
	set surName(arg) {
		this._surName = arg;
	}
	set age(arg) {
		this._age = arg;
	}
	set gender(arg) {
		this._gender = arg;
	}
	set children(arg) {
		this._children = arg;
	}
}

class Driver extends Worker {
	constructor(name, surName, age, gender, children, driverCategory, drivingExperience) {
		super(name, surName, age, gender, children);
		this.profession = 'водитель';
		this._driverCategory = driverCategory;
		this._drivingExperience = drivingExperience;
	}
	get driverCategory() {
		return this._driverCategory;
	}
	get drivingExperience() {
		return this._drivingExperience;
	}
	set driverCategory(arg) {
		this._driverCategory = arg;
	}
	set drivingExperience(arg) {
		this._drivingExperience = arg;
	}
}

class Plumber extends Worker {
	constructor(name, surName, age, gender, children, category, workExperience) {
		super(name, surName, age, gender, children);
		this.profession = 'слесарь';
		this._category = category;
		this._workExperience = workExperience;
	}
	get сategory() {
		return this._сategory;
	}
	get workExperience() {
		return this._workExperience;
	}
	set сategory(arg) {
		this._сategory = arg;
	}
	set workExperience(arg) {
		this._workExperience = arg;
	}
}

workSelect.addEventListener('change', function () {
	if (workSelect[workSelect.selectedIndex].value === 'driver') {
		driverBox.style.display = 'block';
	} else {
		driverBox.style.display = 'none';
	}
	if (workSelect[workSelect.selectedIndex].value === 'plumber') {
		plumberBox.style.display = 'block';
	} else {
		plumberBox.style.display = 'none';
	}
});

saveBtn.addEventListener('click', function (event) {
	event.preventDefault();
	let newWorker;

	if (workSelect[workSelect.selectedIndex].value === 'driver') {
		newWorker = new Driver();
		newWorker.drivingExperience = drivingExperienceInput.value;
		newWorker.driverCategory = '';
		driverCheckbox.forEach((item) => {
			if (item.checked) {
				newWorker.driverCategory += item.value;
			}
		});
	} else if (workSelect[workSelect.selectedIndex].value === 'plumber') {
		newWorker = new Plumber();
		newWorker.сategory = categoryInput.value;
		newWorker.workExperience = workExperienceInput.value;
	} else {
		newWorker = new Worker();
	}

	newWorker.name = (nameInput.value.trim() === '' ? 'нет данных' : nameInput.value);
	newWorker.surName = surNameInput.value;
	newWorker.age = ageInput.value;
	newWorker.gender = genderSelect.value;
	newWorker.children = (childrenCheckbox.checked == false ? 'нет' : 'есть');

	arrWorkers.push(newWorker);

	localStorage.setItem('newWorker', JSON.stringify(newWorker));


	showDataOutput();
	clearInputForm();



});

const showDataOutput = function () {
	dataOutputTable.style.display = 'block';
	dataLS = JSON.parse(localStorage.getItem('newWorker'));
	tableNameOutput.innerHTML = '';
	tableDataOutput.innerHTML = '';

	for (let key in dataLS) {
		const td = document.createElement('td');
		for (let rusName in arrRusName) {
			if (rusName === key)
				td.innerText = arrRusName[rusName];
			tableNameOutput.append(td);
		}


	}
	for (let key in dataLS) {
		const td = document.createElement('td');
		td.innerText = dataLS[key];
		tableDataOutput.append(td);
	}
}

const clearInputForm = function () {
	nameInput.value = '';
	surNameInput.value = '';
	ageInput.value = '';
	genderSelect.value = '';
	childrenCheckbox.checked = false;
	drivingExperienceInput.value = '';
	driverCheckbox.forEach((item) => {
		item.checked = false;
	});
	categoryInput.value = '';
	workExperienceInput.value = '';
};


deleteBtn.addEventListener('click', () => {
	localStorage.clear();
	dataOutputTable.style.display = 'none';
});


if (dataLS) {
	showDataOutput();
}