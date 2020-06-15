function Validator(options){

	function validate(inputElement, rule){
		var erroElement = inputElement.parentElement.querySelector(options.errorSelector);
		var erroMessage = rule.test(inputElement.value);
		console.log(erroMessage);
		if(erroMessage){
			erroElement.innerHTML = erroMessage;
			inputElement.parentElement.classList.add('invalid');
		}else{
			erroElement.innerHTML =  '';
			inputElement.parentElement.classList.remove('invalid');
		}
	}

	var formElement = document.querySelector(options.form);

	if(formElement){
		options.rules.forEach(function(rule){
			var inputElement = formElement.querySelector(rule.selector);
			if(inputElement){
				//xu ly khi nguoi dung blur ra ngoai
				inputElement.onblur = function(){
					validate(inputElement, rule);
				}
				// xu ly khi nguoi dung  nhap input thi phai mat erroMessage
				inputElement.oninput = function(){
					var erroElement = inputElement.parentElement.querySelector(options.errorSelector);
					erroElement.innerHTML =  '';
					inputElement.parentElement.classList.remove('invalid');
				}
			}
		});
	}
}

Validator.isRequired = function(selector){
	return {
		selector: selector,
		test: function(value){
			return value.trim() ? undefined : 'vui long nhap truong nay'
		}
	};
}
Validator.isEmail = function(selector){
	return {
		selector: selector,
		test: function(value){
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : 'truong nay phai la email'
		}
	};
}
Validator.minLength = function(selector, min){
	return {
		selector: selector,
		test: function(value){
			return value.length >= min ? undefined : 'vui long toi thieu ' + min + ' ki tu'
		}
	};
}