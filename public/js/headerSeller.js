$(document).ready(function () {
   loadName();
   loadProfile();
   loadnotify();
});

function logOutClick() {
   console.log("vao");
   setCookie("token", "", 0);
   window.location = "/LoginSeller"
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
       success: function(data) {

           let image = (data.data.avatar ? data.data.avatar : 'image/list/1.png');
           document.getElementById('nameSeller').innerHTML = '<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img alt="Generic placeholder image" src="' + image + '" id="imageUser" class="nav-osahan-pic rounded-pill" style="height:32px;width:32px;margin-right:5px;" > ' + data.data.name + ' </a> <div class="dropdown-menu dropdown-menu-right shadow-sm border-0"> <button class="dropdown-item" onclick="idURL(' + "'" + data.data.id + "'" + ')"><i class="icofont-ui-user"></i> Thông tin của tôi </button> <a class="dropdown-item"  onclick="logOutClick()"><i class="icofont-logout"></i> Đăng xuất </a> </div>';

           // document.getElementById('imageUser').src = data.data.avatar;
           // $('#imageUser').append(data.data.avatar);
       }
   });
}

function idURL(idURL) {
   let id = "?id=" + idURL;
   window.location.href = '/MyProfileForSeller' + id;
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

function loadnotify() {
   var text = localStorage.getItem('sellerId').replaceAll('"', '');
   $.ajax({
       type: "GET",
       data: {
           user_id: text
       },
       url: "/api/comment/notifySeller",
       success: function(data) {
         
          var listComent = data.data.listCmt
          if (listComent == '') {
                  document.getElementById('notifies').innerHTML = '<div style="margin-top: 105px;"><span class="font-weight-bold ml-5">Bạn không có thông báo nào!!!</span></div> ';
            }else{
               
               for(var i = 0 ; i < listComent.length ; i++){

                  var template = `<a class="dropdown-item d-flex align-items-center" onclick=GotoComment(`+text+`)>
                                    <div class="mr-3">
                                          <img alt="Generic placeholder image" src="` + listComent[i].image + `" class="mr-3 rounded-pill" style="width: 40px; height: 40px;">
                                    </div>
                                    <div>
                                          <div class="small text-gray-500">` + new Date(listComent[i].createdAt).toLocaleDateString('en-GB') + `</div>
                                          <span>`+listComent[i].userName+ `bình luận về sản phẩm của bạn  <b>` + listComent[i].name + `</b> là: "` + listComent[i].content + `"</span>
                                    </div>
                                 </a>`
                  $("#notiForSeller").append(template);           
               }
                   
            }
         
       }
   });

}

// function GotoComment(id){
//    window.location.href =`/ShopDetail`
// }
