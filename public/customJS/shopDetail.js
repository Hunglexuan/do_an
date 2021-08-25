// ************************************************
// Shopping Cart API
// ************************************************



var params = (new URL(document.location)).searchParams;
var idSellerURL = params.get('id');
var idUser = localStorage.getItem('userId').replaceAll('"', '');
var cart_TEMP = JSON.parse(sessionStorage.getItem('shoppingCart'))

// localStorage.getItem('billID').replaceAll('"', '');

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================

    displayCartInDB(idUser);

    var shopID = !isEmptyObj(cart_TEMP) && cart_TEMP.billID ? cart_TEMP.billID : "";
    var userID = idUser

    var status = 0
    var address = ""
    var voucherCode = null

    var billID = !isEmptyObj(cart_TEMP) && cart_TEMP.billID ? cart_TEMP.billID : "";
    //localStorage.getItem('billID')?localStorage.getItem('billID').replaceAll('"', ''):"";

    var listCart = !isEmptyObj(cart_TEMP) && cart_TEMP.listCart.length > 0 ? cart_TEMP.listCart : [];
    var cart = {
        shopID,
        userID,
        status,
        address,
        voucherCode,
        billID,
        listCart
    }

    // sessionStorage.setItem('shoppingCart', JSON.stringify(cart));

    function saveCartInDB() {
        $.ajax({
            url: "/api/bill/create",
            type: "POST",
            data: {
                "cart": cart
            }
        }).then(function(data) {


            if (data.message == "SUCCESS") {

                console.log("111111", data);
                cart.billID = data.data
                sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
            } else {
                console.log("22222222", cart);

            }
        })
    }

    function displayCartInDB(idUserT) {
        $.ajax({
            url: "/api/bill/listCart?userID=" + idUserT,
            type: "GET",
        }).then(function(data) {

            sessionStorage.setItem("shoppingCart", JSON.stringify(data.data));
            return data.data;
        });
    }

    function isEmptyObj(obj) {
        if (!obj) {
            return true;

        }
        return obj && Object.keys(obj).length === 0 && obj.constructor === Object

    }


    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));

        saveCartInDB()
    }

    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(id, name, price, count) {

            for (var item in cart.listCart) {
                if (cart.listCart[item].id === id) {
                    cart.listCart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = {
                id: id,
                name: name,
                price: price,
                count: count,
            }
            cart.listCart.push(item);
            saveCart()

        }
        // Set count from item
    obj.setCountForItem = function(id, count) {
        for (var i in cart.listCart) {
            if (cart.listCart[item].id === id) {
                cart.listCart[item].count = count;
                break;
            }
        }
        saveCart();
    };
    // Remove item from cart
    obj.removeItemFromCart = function(id) {
        for (var item in cart.listCart) {
            if (cart.listCart[item].id === id) {
                cart.listCart[item].count--;
                if (cart.listCart[item].count === 0) {
                    cart.listCart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(id) {
        for (var item in cart.listCart) {
            if (cart.listCart[item].id === id) {
                cart.listCart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item = 0; item < cart.listCart.length; item++) {
            totalCount += cart.listCart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item = 0; item < cart.listCart.length; item++) {
            totalCart += cart.listCart[item].price * cart.listCart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }



    obj.finalCart = function(voucher_price) {
        var finalCart = 0;
        var totalCart = obj.totalCart();
        finalcart = totalCart - voucher_price;
        return finalCart;
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];

        for (var i = 0; i < cart.listCart.length; i++) {
            item = cart.listCart[i];
            itemCopy = item;

            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }

        return cartCopy;

    }

    obj.getCart = function() {
        return cart

    }


    return obj;
})();



function addToCartFunc() {
    var cartTemp = shoppingCart.getCart();

    var currentShopID = cartTemp.shopID;
    var shopID = $(this).data('seller');
    console.log("id shop cua san pham", shopID);
    console.log("id shop hien tai ", currentShopID);
    console.log("trang thai", currentShopID == shopID);

    if (currentShopID == shopID) {
        var id = $(this).data('id');
        var name = $(this).data('name');

        var price = Number($(this).data('price'));


        shoppingCart.addItemToCart(id, name, price, 1);
        displayCart();

    } else {

        var cart_tmp = shoppingCart.getCart();
        cart_tmp.shopID = shopID;
        cart_tmp.listCart = [];

        sessionStorage.setItem('shoppingCart', JSON.stringify(cart_tmp));

        var id = $(this).data('id');
        var name = $(this).data('name');

        var price = Number($(this).data('price'));
        console.log(price);

        shoppingCart.addItemToCart(id, name, price, 1);
        displayCart();

    }


}


// Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});



function displayCart() {

    var cartArray = shoppingCart.getCart();
    console.log("display", cartArray);
    var output = "";

    for (var i = 0; i < cartArray.listCart.length; i++) {

        output +=
            "<tr>" +

            "<td style='padding:1'>" + cartArray.listCart[i].name + "</td>" +
            "<td style='padding:1'>" + cartArray.listCart[i].price + "</td>" +
            "<td style='padding:1'><div class='input-group-1' style='display:flex'><button class='minus-item input-group-addon btn btn-primary' data-id=" + cartArray.listCart[i].id + ">-</button>" +
            "<input type='number' style='text-align:center !important ; width:50px ' class='item-count form-control' data-name='" + cartArray.listCart[i].name + "' value='" + cartArray.listCart[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-id=" + cartArray.listCart[i].id + ">+</button></div></td>" +
            "<td  style='padding:1'><button class='delete-item btn btn-danger' data-id=" + cartArray.listCart[i].id + ">X</button></td>" + " = " +
            "<td style='padding:1'>" + cartArray.listCart[i].price * cartArray.listCart[i].count + "</td>" +
            "</tr>";
    }
    console.log(shoppingCart.totalCount());
    // $(".name-Store").html()
    $('#show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('#show-cart').on("click", ".delete-item", function(event) {
    var id = $(this).data('id');
    shoppingCart.removeItemFromCartAll(id);

    displayCart();
})


// -1
$('#show-cart').on("click", ".minus-item", function(event) {
        var id = $(this).data('id');
        shoppingCart.removeItemFromCart(id);
        displayCart();
    })
    // +1
$('#show-cart').on("click", ".plus-item", function(event) {
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id);
    displayCart();
})

// Item count input
$('#show-cart').on("change", ".item-count", function(event) {
    var id = $(this).data('id');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(id, count);
    displayCart();
});

displayCart();