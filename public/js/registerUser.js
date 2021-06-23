function register() {
    var userName = document.getElementById('userName').value.trim();
    var password = document.getElementById('inputPassword').value.trim();
    var email = document.getElementById('inputEmail').value.trim();
    var address = document.getElementById('inputAddress').value.trim();
    var date = document.getElementById('date').value.trim();
    var phone = document.getElementById('inputPhone').value.trim();

    var regEmail = /^\w+@[a-zA-Z]{1,}/i;
    var regPhone = /^\d{11}/i;


    if (userName == "") {
        document.getElementById('userName').setAttribute('class', 'form-control border-danger');
        document.getElementById('messageName').innerHTML = 'User Name is empty';
    } else {
        document.getElementById('userName').setAttribute('class', 'form-control');
        document.getElementById('messageName').innerHTML = '';
    }

    if (password == "") {
        document.getElementById('inputPassword').setAttribute('class', 'form-control border-danger');
        document.getElementById('messagePass').innerHTML = 'Password is empty';
    } else {
        document.getElementById('inputPassword').setAttribute('class', 'form-control');
        document.getElementById('messagePass').innerHTML = '';
    }

    if (regEmail.test(email) == false) {
        document.getElementById('inputEmail').setAttribute('class', 'form-control border-danger');
        document.getElementById('messageEmail').innerHTML = 'invalid Email';
    } else {
        document.getElementById('inputEmail').setAttribute('class', 'form-control');
        document.getElementById('messageEmail').innerHTML = '';
    }

    if (address == "") {
        document.getElementById('inputAddress').setAttribute('class', 'form-control border-danger');
        document.getElementById('messageAddress').innerHTML = 'Address is empty';
    } else {
        document.getElementById('inputAddress').setAttribute('class', 'form-control');
        document.getElementById('messageAddress').innerHTML = '';
    }

    if (date == "") {
        document.getElementById('date').setAttribute('class', 'form-control border-danger');
        document.getElementById('messageDate').innerHTML = 'You have not selected date';
    } else {
        document.getElementById('date').setAttribute('class', 'form-control');
        document.getElementById('messageDate').innerHTML = '';
    }

    if (regPhone.test(phone) == false) {
        document.getElementById('inputPhone').setAttribute('class', 'form-control border-danger');
        document.getElementById('messagePhone').innerHTML = 'invalid Phone';
    } else {
        document.getElementById('inputPhone').setAttribute('class', 'form-control');
        document.getElementById('messagePhone').innerHTML = '';
    }


}