$(document).ready(function() {
    var params = (new URL(document.location)).searchParams;
    var idURL = params.get('id');

    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            id: idURL
        },
        url: "/api/user/getbyId",
        success: function(data) {
            console.log(idURL);
            if (idURL == data.data.id && data.data.role_id != '79b9638a-f3e9-4443-9d61-9389a961c628') {
                window.location.href = "/404";
            }

        }
    });
})