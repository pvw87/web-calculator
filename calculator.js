window.onload = function() {

	// Get all operator buttons and attach click event function
	var ops_btns = document.getElementsByClassName('operators')[0];
	ops_btns.addEventListener("click", storeVal, false);

	// Get all number buttons and attach click event function
	var nums = document.getElementsByClassName('numbers')[0];
	nums.addEventListener("click", addToDisplay, false);

	// Get the = button to calculate result and attach click event
	var result = document.getElementById('result');
	result.addEventListener("click", calculate, false);

	// Get the clear button to clear the display and attach click event
	var clear = document.getElementById('clear');
	clear.addEventListener("click", clearDisplay, false);

	// Get the delete button and attach click event
	var backspace = document.getElementById('backspace');
	backspace.addEventListener("click", deleteLastNumber, false);

	// Get the theme buttons and attach click event
	var theme = document.getElementsByClassName('theme_buttons')[0];
	theme.addEventListener("click", changeTheme, false);

	// Display input for the results, input numbers
	var disp = document.getElementById('output');

	// Object to store input value, operation
	var obj = {};

	// Function called when operator button is clicked
	// stores the existing number in the display and the operation to the obj object
	function storeVal(e){
		if (e.target !== e.currentTarget) {
			var clickedItem = e.target;
			obj.prevValue = Number(disp.value);
			obj.operator = clickedItem.id;
			disp.value='';
			if (clickedItem.id == 'root'){
				result.click();
			}
		}
		e.stopPropagation();
	}

	// Function called when a number button is clicked
	// adds to the display when multiple number buttons are clicked
	// checks to allow just one . in the number
	function addToDisplay(e){
		if ((e.target !== e.currentTarget) && (e.target.tagName.toLowerCase() === 'button')){
			var clickedItem = e.target.innerHTML;
			if (clickedItem == '.'){
				if (disp.value.indexOf('.') === -1){
					disp.value += clickedItem;	
				}
			}
			else{
				disp.value += clickedItem;
			}
		}
		e.stopPropagation();
	}

	// function called when = button is pressed.
	// calculates the result based on the previous value stored in obj, operator and the current value
	// on the display
	function calculate(e){
		var result = 0;
		var currValue = Number(disp.value);
		
		switch (obj.operator) {
			case "add":
				result = obj.prevValue + currValue;
				break;
			case "subtract":
				result = obj.prevValue - currValue;
				break;
			case "multiply":
				result = obj.prevValue * currValue;
				break;
			case 'divide':
				result = obj.prevValue/currValue;
				break;
			case 'root':
				result = Math.pow(obj.prevValue, 0.5)
				break;
		}
		disp.value = result;
		e.stopPropagation();
	}

	// clear display function
	function clearDisplay (e) {
		disp.value = '';
		obj = {};
		e.stopPropagation();
	}

	// deletes the last entered number
	function deleteLastNumber (e) {
		disp.value = disp.value.slice(0,-1);
		e.stopPropagation();
	}

	// toggle between dark and light theme
	function changeTheme(e){
		if (e.target !== e.currentTarget){
			if (e.target.id == 'light_theme'){
				document.getElementById('calc').setAttribute('class', 'calculator light');
			}
			else if (e.target.id == 'dark_theme'){
				document.getElementById('calc').setAttribute('class', 'calculator dark');
			}
		}
		e.stopPropagation();
	}
}