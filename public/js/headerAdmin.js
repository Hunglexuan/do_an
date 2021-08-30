$(document).ready(function() {
    loadName();
   
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


var tokenAdmin = getCookie("tokenAdmin")

function logOutClick() {
    setCookie("token", "", 0);
    setCookie("tokenAdmin", "", 0);
    localStorage.setItem('userId', JSON.stringify(''));
    window.location = "/LoginAdmin"
}
var checkLoginAdmin = document.getElementById('checkLoginAdmin');
if (tokenAdmin == "") {
    checkLoginAdmin.innerHTML += `<li class="nav-link" style="padding-top: 20px !important;">
                        <a href="/LoginAdmin" class="btn btn-outline-danger" style="border-radius: 6px;"> Đăng nhập </a>
                    </li>`
} else {
    checkLoginAdmin.innerHTML += `<li class="nav-item dropdown" id="nameUsers"> </li>`
}


function loadName() {

    var text = localStorage.getItem('userId').replaceAll('"', '');
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            id: text
        },
        url: "/api/user/getbyId", 
        success: function(data) {
            
            let image = (data.data.avatar ? data.data.avatar : 'image/list/1.png');
            document.getElementById('nameUsers').innerHTML = '<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img alt="Generic placeholder image" src="' + image + '" id="imageUser" class="nav-osahan-pic rounded-pill" style="height:32px;width:32px;margin-right:5px;"> ' + data.data.name + ' </a> <div class="dropdown-menu dropdown-menu-right shadow-sm border-0">  <a class="dropdown-item"  onclick="logOutClick()"><i class="icofont-logout"></i> Đăng xuất </a> </div>';

            // document.getElementById('imageUser').src = data.data.avatar;
            // $('#imageUser').append(data.data.avatar);
        }
    });
}