$(document).ready(function () {
   loadName();
   loadProfile();
});

function logOutClick() {
   setCookie("token", "", 0);
   window.location = "/"
}

var token = getCookie("token");
$("#btnLogout").click(function (res) {
   setCookie("token", " ", 0);
})

function setCookie(cname, cvalue, exdays) {
   const d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
   let expires = "expires=" + d.toUTCString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

function loadName() {
   var text = localStorage.getItem('sellerId').replaceAll('"', '');
   $.ajax({
      type: "GET",
      dataType: "json",
      data: {
         id: text
      },
      url: "/api/user/getbyId",
      success: function (data) {
         document.getElementById('nameSeller').innerHTML = '<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img alt="Generic placeholder image" src="' + data.data.avatar + '" class="nav-osahan-pic rounded-pill mr-2" style="width: 32px !important; height: 32px !important;"> ' + data.data.name + ' </a> <div class="dropdown-menu dropdown-menu-right shadow-sm border-0"> <a class="dropdown-item" href="/LoginSeller" onclick="logOutClick()"><i class="icofont-logout"></i> Logout </a> </div>';
      }
   });
}

$('#switchShop').click(function () {
   var text = localStorage.getItem('sellerId').replaceAll('"', '');
   let switchShop = $('#switchShop').is(":checked")
   $.ajax({
      url: '/api/user/status',
      method: 'GET',
      data: {
         id: text,
         shop_status: switchShop,
      },
   }).then(function (data) {
      console.log(data)
      if (switchShop == true) {
         document.getElementById('statusShop').innerHTML = 'Shop đang mở cửa'
         document.getElementById('statusShop').style.color = "Green"
      } else {

         document.getElementById('statusShop').innerHTML = 'Shop đang đóng cửa'
         document.getElementById('statusShop').style.color = "red"
      }
   })
})

function loadProfile() {
   var text = localStorage.getItem('sellerId').replaceAll('"', '');
   $.ajax({
      url: '/api/user/getbyId',
      method: 'GET',
      data: {
         id: text,
      },
   }).then(function (data) {
      console.log(data.data.shop_status)
      if (data.data.shop_status == true) {
         document.getElementById('switchShop').checked = true
         document.getElementById('statusShop').innerHTML = 'Shop đang mở cửa'
         document.getElementById('statusShop').style.color = "Green"
      } else {
         document.getElementById('switchShop').checked = false
         document.getElementById('statusShop').innerHTML = 'Shop đang đóng cửa'
         document.getElementById('statusShop').style.color = "red"
      }
   })
}
