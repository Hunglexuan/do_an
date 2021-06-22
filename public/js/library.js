
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function check(event) {
    event.preventDefault();
    var email = document.forms["myForm"]["email"].value;
    var password = document.forms["myForm"]["password"].value;

    if (email == "" || email == null
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

// function checkBlank() {
//     if ($("#inputEmailAddress").val() == null) {
//         alert("Please Enter Email")
//     } else if ($("#inputPassword").val() == null) {
//         alert("Please Enter Password")
//     }
// }

// $("#btn").click(function Login(e) {
//     checkBlank();
//     e.preventDefault();
//     $.ajax({
//         type: "POST",
//         url: "/api/auth/login",
//         data: {
//             email: $("#inputEmailAddress").val(),
//             password: $("#inputPassword").val()
//         },
//     }).then(function (data) {
//         if (!data.error) {
//             window.location.href = "/index"
//             alert("Login Success!")
//         } else {
//             alert("Login Fail!")
//         }
//     })
// });

