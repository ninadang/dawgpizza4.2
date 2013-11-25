//File merges information from menu.js and menu.html. to
//create a dynamic menu.

$(function(){
	//console.log("ready!");
	pizzaRender(com.dawgpizza.menu.pizzas);
	dRender(com.dawgpizza.menu.drinks, '.drinks', 'dr');
	dRender(com.dawgpizza.menu.desserts, '.desserts', 'de');
}); //on ready function



function pizzaRender(entries){
	var instance;
	var template = $('.pizza');
	var food = $('.food');
	$.each(entries, function(){
	    instance = template.clone();
	   	instance.find('.name').html(this.name);
	    instance.find('.desc').html(this.description);
	    instance.find('.pizza-s').html(this.prices[0]);
	    instance.find('.pizza-m').html(this.prices[1]);
	    instance.find('.pizza-l').html(this.prices[2]);
	    instance.removeClass('template');
        food.append(instance);

	}); //for each pizza, input name, description, and price
}


function dRender(entries, type, suffix){
	var instance;
	var template = $(type);
	var food = $('.food-' + suffix);
	$.each(entries, function(){
	    instance = template.clone();
	   	instance.find('.name-' + suffix).html(this.name);
	    instance.find('.price-' + suffix).html(this.price);
	    
	    instance.removeClass('template');
        food.append(instance);

	}); //for each drink, input name and price
	
}


