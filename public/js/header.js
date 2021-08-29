$(document).ready(function() {
    loadName();
    loadnotify();
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

var token = getCookie("token");
var tokenSeller = getCookie("tokenSeller")

function logOutClick() {
    setCookie("token", "", 0);
    setCookie("tokenSeller", "", 0);
    localStorage.setItem('userId', JSON.stringify(''));
    window.location = "/"
}

var checkLogin = document.getElementById('checkLogin');
var checkSeller = document.getElementById('CheckSeller')
if (token == "") {
    checkLogin.innerHTML += `<li class="nav-link" style="padding-top: 20px !important;">
                        <a href="/LoginUser" class="btn btn-outline-danger" style="border-radius: 6px;"> Đăng nhập </a>
                    </li>`
} else {
    checkLogin.innerHTML += `<li class="nav-item dropdown" id="nameUsers"> </li>`
}

if (tokenSeller == "") {
    checkSeller.innerHTML += ``
} else {
    checkSeller.innerHTML += `<li class="nav-link" style="padding-top: 20px !important;">
    <a href="/listOrderSeller" class="btn btn-outline-info" style="border-radius: 6px;"> Quản Lý Cửa Hàng </a>
</li>`
}

function checkSearchSeller() {
    var datasearch = document.getElementById('search-input').value;
    localStorage.setItem('searchListSeller', JSON.stringify(datasearch));
}

$('#search-input').keypress(function(event) {

    if (event.keyCode === 13) {
        event.preventDefault();
        checkSearchSeller();
        window.location = "/AllSeller"

    } else {
        $("#search-input").autocomplete({
            source: list
        });
    }
});

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
            document.getElementById('nameUsers').innerHTML = '<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img alt="Generic placeholder image" src="' + image + '" id="imageUser" class="nav-osahan-pic rounded-pill"> ' + data.data.name + ' </a> <div class="dropdown-menu dropdown-menu-right shadow-sm border-0"> <a href="/MyProfileUser"  class="dropdown-item"><i class="icofont-ui-user"></i> Thông tin của tôi </a> <a class="dropdown-item" href="/" onclick="logOutClick()"><i class="icofont-logout"></i> Đăng xuất </a> </div>';

            // document.getElementById('imageUser').src = data.data.avatar;
            // $('#imageUser').append(data.data.avatar);
        }
    });
}

function loadnotify() {
    var text = localStorage.getItem('userId').replaceAll('"', '');
    $.ajax({
        type: "GET",
        data: {
            user_id: text
        },
        url: "/api/comment/notify",
        success: function(data) {
            console.log('data.data.listCmtChild ', data.data.listCmtChild)
            var listdata = data.data.listCmtChild;

            if (listdata == '') {
                document.getElementById('notifies').innerHTML = '<div style="margin-top: 105px;"><span class="font-weight-bold ml-5">Bạn không có thông báo nào!!!</span></div> ';
            } else {
                document.getElementById('notifies').innerHTML = '';
                console.log('listdata.length ', listdata.length)
                for (var i = 0; i < listdata.length; i++) {
                    for (var j = 0; j < listdata[i].length; j++) {
                        let image = (listdata[i][j].image ? listdata[i][j].image : 'image/list/1.png');
                        let d = new Date(listdata[i][j].createdAt);
                        let n;
                        if (d.getUTCDate() < 10) {
                            n = '0' + d.getUTCDate();
                        } else {
                            n = d.getUTCDate();
                        }
                        let m;
                        m = d.getUTCMonth().toLocaleString('en-us', {
                            month: 'short'
                        });
                        let y = d.getUTCFullYear();
                        let dob = n + ', ' + m + ' ' + y;

                        document.getElementById('notifies').innerHTML += `<a class="dropdown-item d-flex align-items-center" href="#">
                                        <div class="mr-3">
                                            <img alt="Generic placeholder image" src="` + image + `" class="mr-3 rounded-pill" style="width: 40px; height: 40px;">
                                        </div>
                                        <div>
                                            <div class="small text-gray-500">` + dob + `</div>
                                            <span>Đã có người cũng bình luận về bình luận của bạn trong sản phẩm <b>` + listdata[i][j].name + `</b> là: "` + listdata[i][j].content + `"</span>
                                        </div>
                                    </a>`;
                    }

                }
            }
        }
    });
}