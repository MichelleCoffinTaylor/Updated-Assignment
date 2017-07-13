// //  Google Map
// function initMap() {

// 	var directionsService = new google.maps.DirectionsService;
// 	var directionsDisplay = new google.maps.DirectionsRenderer;
// 	var map = new google.maps.Map(document.getElementById('map'), {
			
// 			center:{
// 			//  This is where the map will be positioned when loaded
// 			lat: -41.3508692,
// 			lng: 174.6383904
// 			},
// 		//  This is how far the map will be zoomed in
// 		zoom: 8,
// 		//  Enabling the user to drag around the map
// 		draggable: true,
// 		//  Disabling the double click zoom (NOT NEEDED FOR MOBILE)
// 		disableDoubleClickZoom: true,
// 		//  Disabling the use of a scroll wheel (NOT NEEDED FOR MOBILE)
// 		scrollwheel: false,
// 		//  Disabling toggling between the different map types
// 		//  eg. Map and satellite
// 		mapTypeControl: false,
// 		//  Disabling the ability to open the map fullscreen
// 		fullscreenControl: false,
// 			//  Changing the position of the zoom control buttons
// 			zoomControl: true,
// 				zoomControlOptions: {
// 				position: google.maps.ControlPosition.TOP_LEFT
// 			},
// 		});
// //  Directions (Starting Point to End Point)
// directionsDisplay.setMap(map);

// 	var onChangeHandler = function() {
// 	calculateAndDisplayRoute(directionsService, directionsDisplay);
// 	};
// 	document.getElementById('start').addEventListener('change', onChangeHandler);
// 	document.getElementById('end').addEventListener('change', onChangeHandler);
// }

// function calculateAndDisplayRoute(directionsService, directionsDisplay) {
// 	directionsService.route({
// 	origin: document.getElementById('start').value,
// 	destination: document.getElementById('end').value,
// 	travelMode: 'DRIVING'
// 	}, function(response, status) {
// 		if (status === 'OK') {
// 			directionsDisplay.setDirections(response);
// 		} else {

// 		}
// 	});
// }

function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
		
			center:{
			//  This is where the map will be positioned when loaded
			lat: -41.3508692,
			lng: 174.6383904
			},
		//  This is how far the map will be zoomed in
		zoom: 8,
		//  Enabling the user to drag around the map
		draggable: true,
		//  Disabling the double click zoom (NOT NEEDED FOR MOBILE)
		disableDoubleClickZoom: true,
		//  Disabling the use of a scroll wheel (NOT NEEDED FOR MOBILE)
		scrollwheel: false,
		//  Disabling toggling between the different map types
		//  eg. Map and satellite
		mapTypeControl: false,
		//  Disabling the ability to open the map fullscreen
		fullscreenControl: false,
			//  Changing the position of the zoom control buttons
			zoomControl: true,
				zoomControlOptions: {
				position: google.maps.ControlPosition.TOP_LEFT
			},
		});

		new AutocompleteDirectionsHandler(map);
	  }

	  function AutocompleteDirectionsHandler(map) {
		this.map = map;
		this.originPlaceId = null;
		this.destinationPlaceId = null;
		this.travelMode = 'DRIVING';
		var originInput = document.getElementById('start');
		var destinationInput = document.getElementById('end');
		this.directionsService = new google.maps.DirectionsService;
		this.directionsDisplay = new google.maps.DirectionsRenderer;
		this.directionsDisplay.setMap(map);

		// var originAutocomplete = new google.maps.places.Autocomplete(
  //      originInput, {
  //          placeIdOnly: true,
  //          componentRestrictions: {
  //              country: 'NZ'
  //          }
  //      });

  var options = {
  	types: ['establishment']
  };
  autocomplete = new google.maps.places.Autocomplete(originInput, options);
   var destinationAutocomplete = new google.maps.places.Autocomplete(
       destinationInput, {
           placeIdOnly: true,
           componentRestrictions: {
               country: 'NZ'
           }
       });
		// this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
		this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

		// this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
		// this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
		// this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
	  }

	  // Sets a listener on a radio button to change the filter type on Places
	  // Autocomplete.

	  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
		var me = this;
		autocomplete.bindTo('bounds', this.map);
		autocomplete.addListener('place_changed', function() {
		  var place = autocomplete.getPlace();
		  if (!place.place_id) {
			window.alert("Please select an option from the dropdown list.");
			return;
		  }
		  if (mode === 'ORIG') {
			me.originPlaceId = place.place_id;
		  } else {
			me.destinationPlaceId = place.place_id;
		  }
		  me.route();
		});

	  };

	  AutocompleteDirectionsHandler.prototype.route = function() {
		if (!this.originPlaceId || !this.destinationPlaceId) {
		  return;
		}
		var me = this;

		this.directionsService.route({
		  origin: {'placeId': this.originPlaceId},
		  destination: {'placeId': this.destinationPlaceId},
		  travelMode: 'DRIVING'
		}, function(response, status) {
		  if (status === 'OK') {
			me.directionsDisplay.setDirections(response);
		  } else {
			window.alert('Directions request failed due to ' + status);
		  }
		});
	  };

//  Form Validation
$(document).ready(function(){

	//  By default all of the input fields won't be valid as they would be empty
	//  Set all varaibles to false
	var ValidNumberOfPeople = false;
	var ValidStartingPoint = false;
	var ValidEndPoint = false;
	var ValidFirstName = false;
	var ValidLastName = false;
	var ValidEmail = false;
	var ValidConfirmEmail = false;

	//  When the submit button is pressed
	$("#ContinueToPayment").click(function(event){
		event.preventDefault();
		//The form should only submit when all of the input field variables are true
		if(ValidNumberOfPeople === true && ValidStartingPoint === true && ValidEndPoint === true && ValidFirstName === true && ValidLastName === true && ValidEmail === true && ValidConfirmEmail === true){
			$("#FormValidation").submit();
		}
	});

	//  Starting Point
	$("#start")
		.focus(function(){
			//For if statements you dont need to give a = value
			//If you leave it then the code will assume you want it to be true
			//if(x=true) and if(x) both mean the same thing and are expecting the value of true
			//This line calls the required function and passes through the current element (Go to required function) 
			if(required($(this))){
				//If the value of true gets returned from the required function then proceed with these lines
				ValidStartingPoint = false;
				return;
			}
			//If all of the functions return a value of false then it will skip all of the if statements
			//Then we just want to turn ValidFirstName to true;
			ValidStartingPoint = true;
		})

	//  End Point
	$("#end")
		.focus(function(){
			//For if statements you dont need to give a = value
			//If you leave it then the code will assume you want it to be true
			//if(x=true) and if(x) both mean the same thing and are expecting the value of true
			//This line calls the required function and passes through the current element (Go to required function) 
			if(required($(this))){
				//If the value of true gets returned from the required function then proceed with these lines
				ValidEndPoint = false;
				return;
			}
			//If all of the functions return a value of false then it will skip all of the if statements
			//Then we just want to turn ValidFirstName to true;
			ValidEndPoint = true;
		})

	//  First Name
	$("#FirstName")
		.focus(function(){
			//For if statements you dont need to give a = value
			//If you leave it then the code will assume you want it to be true
			//if(x=true) and if(x) both mean the same thing and are expecting the value of true
			//This line calls the required function and passes through the current element (Go to required function) 
			if(required($(this))){
				//If the value of true gets returned from the required function then proceed with these lines
				ValidFirstName = false;
				return;
			} else if(minLen($(this), 1)){
				ValidFirstName = false;
				return;
			}
			//If all of the functions return a value of false then it will skip all of the if statements
			//Then we just want to turn ValidFirstName to true;
			ValidFirstName = true;
		})

	//  Last Name
	$("#LastName")
		.focus(function(){
			//For if statements you dont need to give a = value
			//If you leave it then the code will assume you want it to be true
			//if(x=true) and if(x) both mean the same thing and are expecting the value of true
			//This line calls the required function and passes through the current element (Go to required function) 
			if(required($(this))){
				//If the value of true gets returned from the required function then proceed with these lines
				ValidLastName = false;
				return;
			} else if(minLen($(this), 1)){
				ValidLastName = false;
				return;
			}
			//If all of the functions return a value of false then it will skip all of the if statements
			//Then we just want to turn ValidFirstName to true;
			ValidLastName = true;
		})

	//  Email
	$("#Email")
		.focus(function(){
			//For if statements you dont need to give a = value
			//If you leave it then the code will assume you want it to be true
			//if(x=true) and if(x) both mean the same thing and are expecting the value of true
			//This line calls the required function and passes through the current element (Go to required function) 
			if(required($(this))){
				//If the value of true gets returned from the required function then proceed with these lines
				ValidEmail = false;
				return;
			} else if(minLen($(this), 1)){
				ValidEmail = false;
				return;
			}
			//If all of the functions return a value of false then it will skip all of the if statements
			//Then we just want to turn ValidFirstName to true;
			ValidEmail = true;
		})

	//  ConfirmEmail
	$("#ConfirmEmail")
		.focus(function(){
			//For if statements you dont need to give a = value
			//If you leave it then the code will assume you want it to be true
			//if(x=true) and if(x) both mean the same thing and are expecting the value of true
			//This line calls the required function and passes through the current element (Go to required function) 
			if(required($(this))){
				//If the value of true gets returned from the required function then proceed with these lines
				ValidConfirmEmail = false;
				return;
			} else if(minLen($(this), 1)){
				ValidConfirmEmail = false;
				return;
			}
			//If all of the functions return a value of false then it will skip all of the if statements
			//Then we just want to turn ValidFirstName to true;
			ValidConfirmEmail = true;
		})

});

function required(element){
	//the required function is looking for a value to be passed through it
	//we have been passing $(this) which means that whatever value you pass through it becomes element
	if(element.val().length === 0){
		//Check to see if there is anything in the input field
		//If there isnt then add the error code
		element.parent().find("span.input-errors").text("This field is required");
		//Because we are writing a short hand if statement, it is looking for a value of true to be able
		//to continue with the statement.
		//What we are doing is we want to return a value back to it and it should be true or false
		//if we return true then we are saying that there is errors so then whatever is in the if statement will run
		return true;
	} else {
		//If the value is more than 0 characters then we want to empty the span
		element.parent().find("span.input-errors").empty();
		//Because we are writing a short hand if statement, it is looking for a value of true to be able
		//to continue with the statement.
		//What we are doing is we want to return a value back to it and it should be true or false
		//if we return false then we are saying that there are no errors so then whatever is in the if statement won't run
		return false;
	}
}

//  Mix it Up

$(function(){
		//  
		var $PeopleTraveling = $("#PeopleTraveling"),
			$TransportOptions = $("#TransportOptions");
		  
		$TransportOptions.mixItUp();
		  
		$PeopleTraveling.on("change", function(){
			$TransportOptions.mixItUp("filter", this.value);
		});
	});

//  Only having one check box checked at a time

$("input:checkbox").on('click', function() {
  // in the handler, 'this' refers to the box clicked on
  var $box = $(this);
  if ($box.is(":checked")) {
	// the name of the box is retrieved using the .attr() method
	// as it is assumed and expected to be immutable
	var group = "input:checkbox[name='" + $box.attr("name") + "']";
	// the checked state of the group/box on the other hand will change
	// and the current value is retrieved using .prop() method
	$(group).prop("checked", false);
	$box.prop("checked", true);
  } else {
	$box.prop("checked", false);
  }
});

//  Number of People Traveling (Plus and Minus) - OVERALL MIN AND MAX

//  Variables
var increase = $("#plus");
var decrease = $("#minus");
//  Placeholder Value in input field
var inputValue = $("#NumberOfDays")[0].value;
var NumberOfDays = $("#NumberOfDays")[0];
//  Selected Vehicle PricePerDay
var CurrentVehiclePricePerDay;
//  Selected Vehicle CostOfFuel
var CurrentVehicleCostOfFuel;

//  Max
var DaysMax = NumberOfDays.max;

//  Min
var DaysMin = NumberOfDays.min;

//  Plus
increase.click(function(){
	inputValue = Number(inputValue);
	if(inputValue < DaysMax){
		inputValue += 1;
		NumberOfDays.value = "";
		NumberOfDays.value = inputValue;
		//  Changing the input value of TotalVehiclePrice
		$("input[name=VehiclePrice]").val(CurrentVehiclePricePerDay * inputValue);
		//  Changing the input value of CostOfFuel
		$("input[name=CostOfFuel]").val(CostOfFuel * DaysMin);
		return;
	}
});

//  Minus
decrease.click(function(){
	if(inputValue > DaysMin){
		inputValue -= 1;
		NumberOfDays.value = "";
		NumberOfDays.value = inputValue;
		//  Changing the input value of TotalVehiclePrice
		$("input[name=VehiclePrice]").val(CurrentVehiclePricePerDay * inputValue);
		//  Changing the input value of CostOfFuel
		$("input[name=CostOfFuel]").val(CostOfFuel * DaysMin);
		return;
	}
});

// Transport

//  Petrol Price as of Friday 30th June - $1.859/L

//  Motorbike 1 person – $109/day - min 1 day, max 5 days, 3.7L/100km
//  Small car 1-2 people – $129/day - min 1 day, max 10 days, 8.5L/100km
//  Large car 1-5 people – $144/day - min 3 days, max 10 days, 9.7L/100km
//  Motor home 2-6 people – $200/day - min 2 days, max 15 days, 17L/100km

//  Put all Vehicles into an array and give them a min and a max
//  for how many days your can be traveling in them for

var CostOfFuel = (1.859);
var Vehicles = [
	{
		//  Vehicle
		Vehicle : "MotorBike",
		//  Number of Days
		MinNumberOfDays : 1,
		MaxNumberOfDays : 5,
		//  Price of vehicle per day
		PricePerDay : 109,
		//  Cost of Fuel
		AmountOfFuel : 3.7
	},
	{
		//  Vehicle
		Vehicle : "SmallCar",
		//  Number of Days
		MinNumberOfDays : 1,
		MaxNumberOfDays : 10,
		//  Price of vehicle per day
		PricePerDay : 129,
		//  Cost of Fuel
		AmountOfFuel : 8.5
	},
	{
		//  Vehicle
		Vehicle : "LargeCar",
		//  Number of Days
		MinNumberOfDays : 3,
		MaxNumberOfDays : 10,
		//  Price of vehicle per day
		PricePerDay : 144,
		//  Cost of Fuel
		AmountOfFuel : 9.7
	},
	{
		//  Vehicle
		Vehicle : "MotorHome",
		//  Number of Days
		MinNumberOfDays : 2,
		MaxNumberOfDays : 15,
		//  Price of vehicle per day
		PricePerDay : 200,
		//  Cost of Fuel
		AmountOfFuel : 17
	}
];

console.log(Vehicles);

//  When Chosen vehicle is selected min and max values will change
//  for number of days traveling
$("input[name=TransportOptionsAvaliable]").change(function(){
	if($("input[name=TransportOptionsAvaliable]").is(":checked")){
		//  All options that can be selected
		var SelectedTransportOption = $(this)[0].value;
		//  Running over all of the vehicles in the Object and
		//  Selecting their min and max number of days
		for (var i = 0; i < Vehicles.length; i++) {
			if(Vehicles[i].Vehicle === SelectedTransportOption){
				DaysMin = Vehicles[i].MinNumberOfDays;
				DaysMax = Vehicles[i].MaxNumberOfDays;
				CurrentVehiclePricePerDay = Vehicles[i].PricePerDay;
				//  Changing the input value of TotalVehiclePrice
				$("input[name=VehiclePrice]").val(CurrentVehiclePricePerDay * DaysMin);
				//  Changing the input value of CostOfFuel
				CurrentVehicleCostOfFuel = Vehicles[i].CostOfFuel;
				$("input[name=CostOfFuel]").val(CostOfFuel * DaysMin);
				break;
			}
		}
		//  Changing the input value to the SelectedTransportOptions
		//  Min and Max number of days
		inputValue = "";
		inputValue = DaysMin;
		NumberOfDays.value = "";
		NumberOfDays.value = DaysMin;

	} else{

	}
});

//  Changing the input value directly (0.00 PlaceHolder Value for TotalVehiclePrice)
$("input[name=VehiclePrice]").val("0.00");
//  Changing the input value directly (0.00 PlaceHolder value for CostOfFuel)
$("input[name=CostOfFuel]").val("0.00");
//  Changing the input value directly (0.00 PlaceHolder value for CostOfFuel)
$("input[name=Total]").val("0.00");

