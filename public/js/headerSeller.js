$(document).ready(function () {
   loadName();
});

function logOutClick() {
   setCookie("token", "", 0);
   window.location = "/"
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
