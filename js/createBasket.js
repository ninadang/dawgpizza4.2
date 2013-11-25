// Global variable Basket
var pizza = com.dawgpizza.menu.pizzas;
var desserts = com.dawgpizza.menu.desserts;
var drinks = com.dawgpizza.menu.drinks;
var basket = new Array();

function total() {
    var total = 0;
    for(var idx = 0; idx < basket.length; ++idx){
        var current = basket[idx];
        total += current.cost;
    }
    total += total * .095;
    return total.toFixed(2);
}

function tax(total) {
    total = total * .095;
    return total.toFixed(2);
}

function name(p) {
    return p.name + "    " + "($" + p.cost + ")" + "<br>";
}

// Basket items
function makeBasketItem(item, type) {
    var foodType;
    if(type == 'de'){
        foodType = desserts;
    }else if(type == 'dr'){
        foodType = drinks;
    }else{
        foodType = pizza;
    }

    var label;
    for(var idx = 0; idx < foodType.length; ++idx){
        var current = foodType[idx];
        if (current.name == item){
            label = foodType[idx];
        }
    }

    if (foodType == pizza){
        var price;
        if(type == 's'){
            price = 0;
        }else if(type == 'm'){
            price = 1;
        }else{
            price = 2;
        }

        var obj = {
            name: label.name,
            cost: label.prices[price]
        }

    }else{
        var obj = {
            name: label.name,
            cost: label.price
        }
    }
    return obj;
}

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()

//On-Ready
$(function() { 

    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] 
    }; //cart data

    $(".order").click(function(event) {
        var newCartItem = {
            type: this.getAttribute('pizza.type'),
            name: this.getAttribute('pizza.name'),
            size: this.getAttribute('pizza.size'),
            price: this.getAttribute('pizza.price')
        };
        cart.items.push(newCartItem);

        //Display in shopping cart
        var id = event.target.id.split("=");
        console.log(id);
        var item = id[0];
        var type = id[1];
        var p = makeBasketItem(item, type);
        basket.push(p);  
        $("#cart-container").append(name(p));
        $("#tax-price").html(tax(total()));
        $("#total-price").html(total());   
    });

    $('.signup-form').submit(function(){
        var signupForm = $(this);
        var addr1Input = signupForm.find('input[name="addr-1"]');
        var addr1Value = addr1Input.val();
        if(addr1Value.length > 0){
                var zipInput = signupForm.find('input[name="zip"]');
                var zipValue = zipInput.val();
                if(zipValue.length == 0){
                        alert('Please provide a zip code.');
                        return false;
                }
        }
        var min = total();
        if(min < 20){
            alert('Please place a minimum order of $20');
            return false;
        }

        postCart(cart, $('.cart-form')); //submit here?
    }); //Submit signup

    $('.empty').click(function(){
        alert("test");     //alert not registering
        basket = new Array();
    });

    $('.place-order').click(function(){
        alert("test"); //alert not registering
        postCart(cart, $('.cart-form'));
    });
});