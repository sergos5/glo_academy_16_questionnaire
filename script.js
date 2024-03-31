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

const showWorkerSelect = document.querySelector('[name="show-worker-select"]');

let dataLS = JSON.parse(localStorage.getItem('workers'));
let arrWorkers = [];
if (dataLS && dataLS != []) arrWorkers = dataLS;
const arrRusName = {
	_name: 'имя',
	_surName: 'фамилия',
	_age: 'возраст',
	_gender: 'пол',
	_children: 'дети',
	profession: 'специальность',
	_driverCategory: 'категории',
	_сategory: 'разряд',
	_drivingExperience: 'стаж вождения',
	_workExperience: 'стаж работы'
};

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
		this._сategory = category;
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

const chooseWorkDataBlock = function () {
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
};

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
	newWorker.surName = (surNameInput.value.trim() === '' ? 'нет данных' : surNameInput.value);
	newWorker.age = (ageInput.value.trim() === '' ? 'нет данных' : ageInput.value);
	newWorker.gender = (genderSelect.value === '' ? 'еще не определился' : genderSelect.value);
	newWorker.children = (childrenCheckbox.checked == false ? 'нет' : 'есть');

	arrWorkers.push(newWorker);

	localStorage.setItem('workers', JSON.stringify(arrWorkers));

	addWorkerList();
	clearInputForm();
});

const addWorkerList = function () {
	dataLS = JSON.parse(localStorage.getItem('workers'));
	showWorkerSelect.innerHTML = ' <option value="" selected>Выберите сотрудника</option>';
	if (dataLS) {
		dataLS.forEach((item) => {
			const option = document.createElement('option');
			option.innerText = item._surName;
			option.value = item._surName;
			showWorkerSelect.append(option);
		});
	}
};

const showDataOutput = function () {
	dataOutputTable.style.display = 'block';
	dataLS = JSON.parse(localStorage.getItem('workers'));
	dataLS.forEach((item) => {
		if (item._surName == showWorkerSelect[showWorkerSelect.selectedIndex].value) {
			tableNameOutput.innerHTML = '';
			tableDataOutput.innerHTML = '';
			for (let key in item) {
				const td = document.createElement('td');
				for (let rusName in arrRusName) {
					if (key == rusName) {
						td.innerText = arrRusName[rusName];
					}
				}
				tableNameOutput.append(td);
			}
			for (let key in item) {
				const td = document.createElement('td');
				td.innerText = item[key];
				tableDataOutput.append(td);
			}
		}
		if (showWorkerSelect.selectedIndex === 0) dataOutputTable.style.display = 'none';
	});
};

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
	workSelect.selectedIndex = 0;
	chooseWorkDataBlock();
	dataOutputTable.style.display = 'none';
};

const deleteWorker = function () {
	arrWorkers = [];
	dataLS = JSON.parse(localStorage.getItem('workers'));
	dataLS.forEach((item, index) => {
		if (item._surName !== showWorkerSelect[showWorkerSelect.selectedIndex].value) {
			arrWorkers.push(item);
		}
	})
	//localStorage.clear();
	localStorage.setItem('workers', JSON.stringify(arrWorkers));
	addWorkerList();
	dataOutputTable.style.display = 'none';
};


workSelect.addEventListener('change', chooseWorkDataBlock);
showWorkerSelect.addEventListener('change', showDataOutput);
deleteBtn.addEventListener('click', deleteWorker);

addWorkerList();