// ************************************************
// Shopping Cart API
// ************************************************

var params = (new URL(document.location)).searchParams;
var idURL = params.get('id');

var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  var shopID = {
    shopID : idURL
  }
  cart.push(shopID);

  // sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  
  // Constructor
  function Item(id,name, price, count) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};
  
  // Add to cart
  obj.addItemToCart = function(id,name, price, count) {
    saveCart()
    for(var item in cart) {
      if(cart[item].id === id) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(id,name, price, count);
    cart.push(item);
    
    
   
  }
  // Set count from item
  obj.setCountForItem = function(id, count) {
    for(var i in cart) {
      if (cart[i].id === id) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(id) {
      for(var item in cart) {
        if(cart[item].id === id) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(id) {
    for(var item in cart) {
      if(cart[item].id === id) {
        cart.splice(item, 1);
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
    for(var item = 1 ; item < cart.length ;item++) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item = 1 ; item < cart.length ;item++) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

 
  return obj;
})();


 
// Add item
function addToCartFunc(){
  var cartArray1 = shoppingCart.listCart();
  if(cartArray1[0].shopID == idURL){
    console.log("id dung",cartArray1[0].shopID);
    var id = $(this).data('id');
    var name = $(this).data('name');
  
    var price = Number($(this).data('price'));
  
    shoppingCart.addItemToCart(id,name, price, 1);
    displayCart();
  }else{

    // console.log("id doi lan 1",idURL);
    // cart=[];
    // shoppingCart.shopID
    // cart.push(shopID);
    var id = $(this).data('id');
    var name = $(this).data('name');
  
    var price = Number($(this).data('price'));
  
    shoppingCart.addItemToCart(id,name, price, 1);
    displayCart();
  }
  
  
}


// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  
  for(var i=1 ; i < cartArray.length ; i++) {
    output += 
    "<tr>" +
    "<td>" +cartArray[i].name +"</td>" +
    "<td>(" +cartArray[i].price +")</td>" +
    "<td><div class='input-group-1' style='display:flex'><button class='minus-item input-group-addon btn btn-primary' data-id=" +cartArray[i].id +">-</button>" +
    "<input type='number' class='item-count form-control' data-name='" +cartArray[i].name +"' value='" +cartArray[i].count +"'>" +
    "<button class='plus-item btn btn-primary input-group-addon' data-id=" +cartArray[i].id +">+</button></div></td>" +
    "<td><button class='delete-item btn btn-danger' data-id=" +cartArray[i].id +">X</button></td>" +" = " +
    "<td>" +cartArray[i].total +"</td>" +
    "</tr>";
  }
  
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

