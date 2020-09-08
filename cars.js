const inputsDiv = document.getElementById("line");

const createButton = document.getElementById("createButton");

const brandInput = document.getElementById("Brand");
const dateInput = document.getElementById("Date");
const transmisionInput = document.getElementById("Transmission");
const modelInput = document.getElementById("Model");
const colorInput = document.getElementById("Color");
const hpInput = document.getElementById("HP");

const inputsDivEdit = document.getElementById("editLine");

const editButton = document.getElementById("editButton");
const addButton = document.getElementById("addButton");

const brandInputEdit = document.getElementById("BrandEdit");
const dateInputEdit = document.getElementById("DateEdit");
const transmisionInputEdit = document.getElementById("TransmissionEdit");
const modelInputEdit = document.getElementById("ModelEdit");
const colorInputEdit = document.getElementById("ColorEdit");
const hpInputEdit = document.getElementById("editHp");

const car = JSON.parse(localStorage.getItem("myCarsArray"));

const body = document.getElementsByTagName('body')[0];

const mainDiv = document.createElement('div');
const pagination = document.createElement('div');

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

body.appendChild(mainDiv);
body.appendChild(pagination);
body.appendChild(inputsDiv);
body.appendChild(inputsDivEdit);
body.appendChild(addButton);

const mainTable = document.createElement('table');
mainTable.setAttribute("id", "tableStyle");

const page = 10;
const myCars = ["Model", "Brand", "Date", "Horsepower", "Transmission", "Class", "Remove", "Edit"];
cars = car.slice(0, page)

function table(cars) {
    const row = document.createElement('tr');
    for (let i = 0; i < myCars.length; i++) {
        const th = document.createElement('th');
        th.innerText = (myCars[i]);
        if (i < myCars.length - 2) {
            th.setAttribute('draggable', 'true');
            th.setAttribute('ondragstart', 'dragStart(' + i + ', event)');
            th.setAttribute('ondragover', 'dragOver()');
            th.setAttribute('ondrop', 'onDrop()');
        }
        row.appendChild(th);
    }


    mainTable.appendChild(row);

    for (let i = 0; i < cars.length; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < myCars.length; j++) {
            var td = document.createElement('td');
            cars[i].Remove = "Remove";
            cars[i].Edit = "Edit";
            if (j === myCars.length - 2) {
                td.addEventListener("click", removeField);
            } else if (j === myCars.length - 1) {
                td.addEventListener("click", editDisplay);
            }

            td.setAttribute('data-id', i);
            td.innerText = cars[i][myCars[j]];
            tr.appendChild(td);
            tr.setAttribute("data-order", i);
            mainTable.appendChild(tr);

        }
    }
    mainDiv.appendChild(mainTable);
    pagination.innerHTML = "";

    createPagination();

}

table(car.slice(0, page));

function createPagination() {
    let carPages = Math.ceil(car.length / page);
    let ul = document.createElement('ul');
    ul.setAttribute("id", "pagination");
    let items = [];

    for (let i = 1; i <= carPages; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        ul.appendChild(li);
        items.push(li);
        li.addEventListener('click', function () {
            let numbers = +this.innerHTML;
            let first = (numbers - 1) * page;
            let last = first + page;
            let notes = car.slice(first, last);
            mainTable.innerHTML = "";
            table(notes);
        })
    }

    pagination.appendChild(ul);
}

function dragStart(id, event) {
    event.dataTransfer.setData('id', id);
}
function dragOver() {
    event.preventDefault();
}
function onDrop() {
    let dragId = event.dataTransfer.getData('id');
    let dragColumn = myCars.splice(dragId, 1).toString();
    let thIndex = myCars.indexOf(event.target.innerHTML);
    myCars.splice(thIndex, 0, dragColumn);
    mainTable.innerHTML = "";
    table(car.slice(0, page));
}

function hideShow() {
    if (inputsDiv.style.display !== "block") {
        inputsDiv.style.display = "block";
    } else {
        inputsDiv.style.display = "none";
    };
}

class CarsAdd {
    constructor(Model, Brand, Date, Horsepower, Transmission, carClass) {
        this.Model = Model;
        this.Brand = Brand;
        this.Date = Date;
        this.Horsepower = Horsepower;
        this.Transmission = Transmission;
        this.Class = carClass;
    }
}

function removeField() {
    const result = confirm("Are you sure you want to delete?");
    if (result) {
        let id = event.target.getAttribute('data-id');
        car.splice(id, 1)
        mainTable.innerHTML = "";
        localStorage.setItem("myCarsArray", JSON.stringify(car));
        table(car.slice(0, page));
    }

}
function addCar() {
    let newCars = new CarsAdd(brandInput.value, dateInput.value, transmisionInput.value, modelInput.value, colorInput.value, hpInput.value);
    car.unshift(newCars);
    mainTable.innerHTML = "";
    localStorage.setItem("myCarsArray", JSON.stringify(car));
    table(car.slice(0, page));
    inputsDiv.style.display = "none";
}
createButton.addEventListener('click', addCar);

function editDisplay() {
    const editResult = confirm("Are you sure you want to edit ?");
    if (editResult) {
        let id = event.target.getAttribute('data-id');
        inputsDivEdit.style.display = "block";
        nowEditingIndex = id;
        editFields(id);
    } else {
        inputsDivEdit.style.display = "none";
    }
}

function editFields(i) {
    brandInputEdit.value = cars[i].Brand;
    dateInputEdit.value = cars[i].Date;
    transmisionInputEdit.value = cars[i].Transmission;
    modelInputEdit.value = cars[i].Model;
    colorInputEdit.value = cars[i].Class;
    hpInputEdit.value = cars[i].Horsepower;
}

function update() {
    cars[nowEditingIndex].Brand = brandInputEdit.value;
    cars[nowEditingIndex].Date = dateInputEdit.value;
    cars[nowEditingIndex].Transmission = transmisionInputEdit.value;
    cars[nowEditingIndex].Model = modelInputEdit.value;
    cars[nowEditingIndex].Brand = colorInputEdit.value;
    cars[nowEditingIndex].Brand = hpInputEdit.value;
    mainTable.innerHTML = "";
    localStorage.setItem("myCarsArray", JSON.stringify(car));
    table(car.slice(0, page));
    inputsDivEdit.style.display = "none";
}
editButton.addEventListener('click', update)

function search(){
    let arr = car.filter((item) => {
        for (let key in item) {
            if (item[key].toLowerCase().match(searchInput.value.toLowerCase())) {
                return true;
            }
        }
    })  
    mainTable.innerHTML = "";
    localStorage.setItem("myCarsArray", JSON.stringify(arr));
    table(arr.slice(0, page));
}
searchButton.addEventListener("click", search)

