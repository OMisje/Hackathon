// console.log("Hello world");

var five = require("johnny-five");
var snapshot = require("./snapshot.js");

var board = new five.Board({
	repl: false,
	debug: false
});

board.on("ready", function() {
	console.log("Board is ready");
	var motion = new five.Motion(8);
	var led = new five.Led(9);
	var button = new five.Button({
		pin: 7,
		invert: true
	});
	led.off();

	var temp = new five.Thermometer({
		controller: "DS18B20",
		pin: 2
	});

	button.on("press", function() {
		led.toggle();
		console.log("Temperature " + temp.celsius + "C");
		snapshot.takeSnapshot(function callback(err) {
			if (err) {
				console.log('Unable to take camera snapshot ', err);
			}
		});
	});
	
	motion.on("calibrated", function() {
		console.log("Motion calibrated");
	});
	
	motion.on("motionend", function() {
		console.log("Motion ended");
		led.off();
	});
	
	motion.on("motionstart", function() {
		console.log("Motion detected");
		led.on();
		
		snapshot.takeSnapshot(function callback(err) {
			if (err) {
				console.log('Unable to take camera snapshot ', err);
			}
		});
	});
	
	// button.on("release", function() {
// 		led.toggle();
//	});
	

});

