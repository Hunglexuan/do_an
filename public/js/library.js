
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function check(event) {
    event.preventDefault();


    var email = document.forms["myForm"]["email"].value;
    var email = document.forms["myForm"]["password"].value;

    if (email == "" || email == null || !validateEmail(email)
        || password == "" || password == null) {
       console.log('1111111111111');
    }
    else {
        // event.preventDefault();

        if (screen.width < 1024) {
            formData = {
                'email': email,
                'password': password
            }
        }
        else {
            formData = {
                'email': email,
                'password': password
            }
        }
        loadForm(formData);


    }
}
function loadForm(formData) {
    $.ajax({
        type: "POST",
        url: "/api/auth/login",
        data: formData,
        success: function () {
            setTimeout(() => {
                window.location.href = '/';
            }, 2500)
        }
    });
}