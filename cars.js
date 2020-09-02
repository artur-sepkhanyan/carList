let inputFirstLine = document.createElement("div");
let inputSecondLine = document.createElement("div");
let brandInput = document.createElement("input");
let addButton = document.createElement("button");
addButton.innerText = "Add Car";
brandInput.setAttribute("placeholder","Brand");
let dateInput = document.createElement("input");
dateInput.setAttribute("placeholder","Date");
let transmisionInput = document.createElement("input");
transmisionInput.setAttribute("placeholder","Transmision");
let modelInput = document.createElement("input");
modelInput.setAttribute("placeholder","Model");
let colorInput = document.createElement("input");
colorInput.setAttribute("placeholder","Color");
let hpInput = document.createElement("input");
hpInput.setAttribute("placeholder","HP");
let inputsDiv = document.createElement("div");
let createButton = document.createElement("button");
createButton.innerText = "Create";
inputsDiv.appendChild(inputFirstLine);
inputsDiv.appendChild(inputSecondLine);
inputsDiv.appendChild(createButton);
inputFirstLine.appendChild(brandInput);
inputFirstLine.appendChild(dateInput);
inputFirstLine.appendChild(transmisionInput);
inputSecondLine.appendChild(modelInput);
inputSecondLine.appendChild(colorInput);
inputSecondLine.appendChild(hpInput);
inputsDiv.setAttribute("id","line");

const car = JSON.parse(localStorage.getItem("myCarsArray"));

const body = document.getElementsByTagName('body')[0];

let mainDiv = document.createElement('div');
let pagination = document.createElement('div');

body.appendChild(mainDiv);
body.appendChild(pagination);
body.appendChild(inputsDiv);
body.appendChild(addButton);

let mainTable = document.createElement('table');
mainTable.setAttribute("id","tableStyle");

const page = 10;
const myCars = ["Model","Brand","Date","Horsepower","Transmission","Class","Remove"];
cars = car.slice(0, page)

function table(cars) {
    let row = document.createElement('tr');
    for(let i = 0; i < myCars.length; i++){
        let th = document.createElement('th');
        th.innerText = (myCars[i]);
        // th.setAttribute('draggable', true);
        // th.addEventListener('dragstart', ondragstart(i, event));
        // th.addEventListener('dragend', function(e){ dragEnd(e) });
        // th.addEventListener('drop', function(e) { drop(e) })
        row.appendChild(th);
    }
    mainTable.appendChild(row);

    for(var i = 0; i < cars.length; i++) {
        var tr = document.createElement('tr');
        for(var j = 0; j < myCars.length; j++){
            var td = document.createElement('td');
            cars[i].Remove = "<--";
            td.addEventListener("click", (event) => {
                const result = confirm("Are you sure you want to delete?");
                if(result){
                        const id = event.target.getAttribute('data-id');
                        car.splice(id, 1)
                            
                        mainTable.innerHTML = "";
                        localStorage.setItem("myCarsArray", JSON.stringify(car));
                        table(car.slice(0, page));
                }
            })
            td.setAttribute('data-id',i);

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

function createPagination () {
    let carPages = Math.ceil(car.length / page);
    let ul = document.createElement('ul');
    ul.setAttribute("id", "pagination");
    let items = [];

    for(let i = 1; i <= carPages; i++){
        let li = document.createElement('li');
        li.innerHTML = i;
        ul.appendChild(li);
        items.push(li);
    }

    for(let item of items){
         item.addEventListener('click', function(){
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

function dragOver() {
    event.preventDefault();
}
function dragEnd(event) {
    
}
function drop(event) {
    
}

addButton.onclick = function(){
    if (inputsDiv.style.display !== "block") {
        inputsDiv.style.display = "block";
      } else {
        inputsDiv.style.display = "none";
      };
}

 class CarsAdd {
    constructor(Model,Brand,Date,Horsepower,Transmission,carClass){
        this.Model = Model;
        this.Brand = Brand;
        this.Date = Date;
        this.Horsepower = Horsepower;
        this.Transmission = Transmission;
        this.Class = carClass;
    }
}
function addCar(){
    let newCars = new CarsAdd(brandInput.value,dateInput.value,transmisionInput.value,modelInput.value,colorInput.value,hpInput.value);
    debugger
    car.unshift(newCars);
    mainTable.innerHTML = "";
    localStorage.setItem("myCarsArray", JSON.stringify(car));
    table(car.slice(0, page));
}
createButton.addEventListener('click', addCar);

