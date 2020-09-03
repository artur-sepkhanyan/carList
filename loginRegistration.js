const registeredUsers = localStorage.getItem('users');
const users = registeredUsers ? JSON.parse(registeredUsers) : [];
const reg = document.getElementById('rgstr_btn');
const log = document.getElementById('log_btn');
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const numbers = /[0-9]/g;
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
let store = () => {
    let nameSurname = document.forms[0].name.value;
    let email = document.forms[0].email.value;
    let pw = document.forms[0].pw.value;
    let cpw = document.forms[0].cpw.value;
    let myUsers = new User(nameSurname, email, pw);

    if (!email || !pw || !pw.match(numbers)
        || !pw.match(upperCaseLetters) || !pw.match(lowerCaseLetters)
        || pw !== cpw) {
        alert('Please fill in all the fields')
    } else {
        users.push(myUsers);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Your account has been created');
        console.log(typeof (users));
    }
}

let check = () => {
    let email = document.forms[0].userName.value;
    let pass = document.forms[0].uservalue;

    const user = users.find(el => {
        return el.email === email && el.pass === pass;
    });
    if (user) {
        alert('You are logged in.');
    } else {
        alert('User not found');
    }
}
//reg.addEventListener('click', store);
//log.addEventListener('click', check);