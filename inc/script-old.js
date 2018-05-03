
if(localStorage.fitnessApp_dataStore) {
	data = localStorage.getItem('fitnessApp_dataStore');
	data = JSON.parse(data);
} else {
	var data = {
		details:{
			age: 0,
			gender: 0
		},
		choice: {
			cardio: 'step',
			upper: 'toes',
			core: 'plank'
		},
		inputs: {
			cardio1: [],
			cardio2: [],
			upper: [],
			lower: [],
			core: [],
			flex: []
		},
		results: {
			cardio: [],
			upper: [],
			lower: [],
			core: [],
			flex: [],
			overall: []
		}
	}
}


document.querySelector('#choice__cardio').addEventListener('click', function() {
	if(document.querySelector('#choice__cardio').value == 'beep') {
		document.querySelector('.input__cardio2').classList.remove("hidden");
		document.querySelector('.input__cardio1').placeholder = "Level";
		document.querySelector('.input__cardio2').placeholder = "Shuttles";
	} else {
		document.querySelector('.input__cardio2').classList.add("hidden");
		document.querySelector('.input__cardio1').placeholder = "Heart Rate";

	}
});
document.querySelector('#choice__core').addEventListener('click', function() {
	if(document.querySelector('#choice__core').value == 'plank') {;
		document.querySelector('.input__core').placeholder = "Seconds";
	} else {
		document.querySelector('.input__core').placeholder = "Reps";
	}

});


console.log(data);

document.querySelector('.submit').addEventListener('click', function() {
  	
  	storeDetails();
	
	if(data.details.age == 0){
	  	document.querySelector('.input__age').classList.add("error");
	  	document.querySelector('.input__age').placeholder = 'Enter Age!';
	} else {
		runDetails();
		sumResults();
		document.querySelector('.input__age').classList.remove("error");
	}


  
});



var storeDetails = function() {
	// store personal
	data.details.age = document.querySelector('.input__age').value;
	data.details.gender = document.querySelector('#input__gender').value;
	// store test choices
	data.choice.cardio.push(document.querySelector('#choice__cardio').value);
	data.choice.upper.push(document.querySelector('#choice__upper').value);
	data.choice.core.push(document.querySelector('#choice__core').value);
	// inputs for tests
	data.inputs.cardio1.push(document.querySelector('.input__cardio1').value);
	data.inputs.cardio2.push(document.querySelector('.input__cardio2').value);
	data.inputs.upper.push(document.querySelector('.input__upper').value);
	data.inputs.lower.push(document.querySelector('.input__lower').value);
	data.inputs.core.push(document.querySelector('.input__core').value);
	data.inputs.flex.push(document.querySelector('.input__flex').value);
}

var runDetails = function() {
	if(data.choice.cardio == 'step'){
		cardioStep();
	} else {
		cardioBeep();
	};
	if(data.choice.upper == 'toes'){
		upperToes();
	} else {
		upperKnees();
	};
	if(data.choice.core == 'plank'){
		corePlank();
	} else {
		coreCurl();
	};
	lower();
	flex();

	
}


var cardioStep = function () {
	var ageGp = 0;

	if(data.details.age<=25){ageGp=0;}
    else if(data.details.age<=35){ageGp=1;}
    else if(data.details.age<=45){ageGp=2;}
    else if(data.details.age<=55){ageGp=3;}
    else if(data.details.age<=65){ageGp=4;}
    else {ageGp=5;};

	if(data.details.gender == 1) {
		var maleValS = [[128,116,105,99,89,78],[128,117,107,99,89,80],[130,119,112,103,96,82],[132,122,116,105,97,86],[129,120,112,103,97,85],[130,120,113,103,96,87]];

		if (data.inputs.cardio1 >= maleValS[ageGp][0]) {
          data.results.cardio = 0;
        } else if (data.inputs.cardio1 >= maleValS[ageGp][1]){
          data.results.cardio = 4;
        } else if (data.inputs.cardio1 >= maleValS[ageGp][2]){
          data.results.cardio = 7;
        } else if (data.inputs.cardio1 >= maleValS[ageGp][3]){
          data.results.cardio = 12;
        } else if (data.inputs.cardio1 >= maleValS[ageGp][4]){
          data.results.cardio = 15;
        } else if (data.inputs.cardio1 >= maleValS[ageGp][5]){
          data.results.cardio = 17;
        } else if (data.inputs.cardio1 == 0) {
          data.results.cardio = 0;
        } else {
          data.results.cardio = 20;
        }

	} else {
		var femValS = [[140,126,117,108,98,84],[138,126,119,111,99,87,],[140,128,118,110,102,89],[132,129,120,115,104,93],[139,128,118,112,97,94],[134,128,122,115,102,89]];	

		if (data.inputs.cardio1 >= femValS[ageGp][0]) {
          data.results.cardio = 0;
        } else if (data.inputs.cardio1 >= femValS[ageGp][1]){
          data.results.cardio = 4;
        } else if (data.inputs.cardio1 >= femValS[ageGp][2]){
          data.results.cardio = 7;
        } else if (data.inputs.cardio1 >= femValS[ageGp][3]){
          data.results.cardio = 12;
        } else if (data.inputs.cardio1 >= femValS[ageGp][4]){
          data.results.cardio = 15;
        } else if (data.inputs.cardio1 >= femValS[ageGp][5]){
          data.results.cardio = 17;
        } else if (data.inputs.cardio1 == 0) {
          data.results.cardio = 0;
        } else {
          data.results.cardio = 20;
        }
	}
}

var cardioBeep = function () {
	
	var vo2level = (3.46 * (+data.inputs.cardio1 + +data.inputs.cardio2 / (+data.inputs.cardio2 * 0.4325 + 7.0048)) + 12.2).toFixed(2);

	var ageGp = 0;

    if(data.details.age<=25){ageGp=0;}
    else if(data.details.age<=35){ageGp=1;}
    else if(data.details.age<=45){ageGp=2;}
    else if(data.details.age<=55){ageGp=3;}
    else if(data.details.age<=65){ageGp=4;}
    else {ageGp=5;};

    if(data.details.gender == 1){
        var maleValB=[[61,57,52,46,42,38],[52,49,43,39,36,33],[47,43,39,36,32,29],[42,40,35,32,30,26],[37,35,31,29,26,22],[30,30,26,25,22,20],[0,0,0,0,0,0]];

    if(vo2level >= maleValB[ageGp][0]){
            data.results.cardio = 20;
        } else if (vo2level >= maleValB[ageGp][1]){
            data.results.cardio = 17;
        } else if (vo2level >= maleValB[ageGp][2]){
            data.results.cardio = 15;
        } else if (vo2level >= maleValB[ageGp][3]){
            data.results.cardio = 12;
        } else if (vo2level >= maleValB[ageGp][4]){
            data.results.cardio = 7;
        } else if (vo2level >= maleValB[ageGp][5]){
            data.results.cardio = 4;
        } else {
            data.results.cardio = 0;
        } 
    } else {
            var femValB=[[57,53,46,41,38,33],[47,45,38,34,32,28],[42,39,34,31,28,25],[38,35,31,28,25,22],[33,31,27,25,22,19],[28,26,22,20,18,17],[0,0,0,0,0,0]];
        if(vo2level >= femValB[ageGp][0]){
            data.results.cardio = 20;
        } else if (vo2level >= femValB[ageGp][1]){
            data.results.cardio = 17;
        } else if (vo2level >= femValB[ageGp][2]){
            data.results.cardio = 15;
        } else if (vo2level >= femValB[ageGp][3]){
            data.results.cardio = 12;
        } else if (vo2level >= femValB[ageGp][4]){
            data.results.cardio = 7;
        } else if (vo2level >= femValB[ageGp][5]){
            data.results.cardio = 4;
        } else {
            data.results.cardio = 0;
        }

}
}

var upperToes = function () {
	
	var ageGp = 0;

    if(data.details.age<=19){ageGp=0;}
    else if(data.details.age<=29){ageGp=1;}
    else if(data.details.age<=39){ageGp=2;}
    else if(data.details.age<=49){ageGp=3;}
    else if(data.details.age<=59){ageGp=4;}
    else {ageGp=5;};

    if(data.details.gender == 1){
        var maleValB=[[57,47,35,19,11,4],[48,39,30,17,10,4],[42,34,25,13,8,2],[35,28,21,11,6,1],[32,25,18,9,5,1],[31,24,17,6,3,1],[0,0,0,0,0,0]];

        if(data.inputs.upper >= maleValB[ageGp][0]) {
        	data.results.upper = 20;
        } else if (data.inputs.upper >= maleValB[ageGp][1]) {
        	data.results.upper = 17;
        } else if (data.inputs.upper >= maleValB[ageGp][2]) {
        	data.results.upper = 15;
        } else if (data.inputs.upper >= maleValB[ageGp][3]) {
        	data.results.upper = 12;
        } else if (data.inputs.upper >= maleValB[ageGp][4]) {
        	data.results.upper = 7;
        } else if (data.inputs.upper >= maleValB[ageGp][5]) {
        	data.results.upper = 4;
        } else {
        	data.results.upper = 0;
        }
	} else {
		var femValB=[[36,27,21,11,6,2],[37,30,23,12,7,2],[38,30,22,10,5,1],[32,25,18,8,4,1],[26,21,15,7,3,1],[24,21,15,7,3,1],[0,0,0,0,0,0]];

		if(data.inputs.upper >= femValB[ageGp][0]) {
        	data.results.upper = 20;
        } else if (data.inputs.upper >= femValB[ageGp][1]) {
        	data.results.upper = 17;
        } else if (data.inputs.upper >= femValB[ageGp][2]) {
        	data.results.upper = 15;
        } else if (data.inputs.upper >= femValB[ageGp][3]) {
        	data.results.upper = 12;
        } else if (data.inputs.upper >= femValB[ageGp][4]) {
        	data.results.upper = 7;
        } else if (data.inputs.upper >= femValB[ageGp][5]) {
        	data.results.upper = 4;
        } else {
        	data.results.upper = 0;
        }
	} 
}
var upperKnees = function () {
	upperToes();
	data.results.upper = data.results.upper / 2;
}
var lower = function () {
	
	if(data.details.gender == 1) {
		if(data.inputs.lower > 100) {
			data.results.lower = 20;
		} else if (data.inputs.lower >= 75) {
			data.results.lower = 15;
		} else if (data.inputs.lower >= 50) {
			data.results.lower = 10;
		} else if (data.inputs.lower >= 25) {
			data.results.lower = 5;
		} else if (data.inputs.lower >= 10) {
			data.results.lower = 3;
		} else {
			data.results.lower = 0;
		}
	
	} else {
		if(data.inputs.lower > 60) {
			data.results.lower = 20;
		} else if (data.inputs.lower >= 45) {
			data.results.lower = 15;
		} else if (data.inputs.lower >= 35) {
			data.results.lower = 10;
		} else if (data.inputs.lower >= 20) {
			data.results.lower = 5;
		} else if (data.inputs.lower >= 9) {
			data.results.lower = 3;
		} else {
			data.results.lower = 0;
		}
	}
}
var corePlank = function () {
	
	if(data.details.gender == 1) {
		if(data.inputs.core >= 129) {
			data.results.core = 20;
		} else if (data.inputs.core >= 107) {
			data.results.core = 15;
		} else if (data.inputs.core >= 77) {
			data.results.core = 10;
		} else if (data.inputs.core >= 30) {
			data.results.core = 5;
		} else {
			data.results.core = 0;
		}
	} else {
		if(data.inputs.core >= 122) {
			data.results.core = 20;
		} else if (data.inputs.core >= 91) {
			data.results.core = 15;
		} else if (data.inputs.core >= 63) {
			data.results.core = 10;
		} else if (data.inputs.core >= 25) {
			data.results.core = 5;
		} else {
			data.results.core = 0;
		}
	}

}

var coreCurl = function () {
	var ageGp = 0;

    if(data.details.age<=25){ageGp=0;}
    else if(data.details.age<=35){ageGp=1;}
    else if(data.details.age<=45){ageGp=2;}
    else if(data.details.age<=55){ageGp=3;}
    else if(data.details.age<=65){ageGp=4;}
    else {ageGp=5;};

    if(data.details.gender == 1){
        var maleValB=[[50,44,39,35,31,25],[46,40,35,31,29,22],[42,35,30,27,23,17],[36,29,25,22,18,13],[32,25,21,17,13,9],[29,22,19,15,11,7],[0,0,0,0,0,0]];

         if(data.inputs.core >= maleValB[ageGp][0]) {
        	data.results.core = 20;
        } else if (data.inputs.core >= maleValB[ageGp][1]) {
        	data.results.core = 17;
        } else if (data.inputs.core >= maleValB[ageGp][2]) {
        	data.results.core = 15;
        } else if (data.inputs.core >= maleValB[ageGp][3]) {
        	data.results.core = 12;
        } else if (data.inputs.core >= maleValB[ageGp][4]) {
        	data.results.core = 7;
        } else if (data.inputs.core >= maleValB[ageGp][5]) {
        	data.results.core = 4;
        } else {
        	data.results.core = 0;
        }
	} else {
		var femValB=[[44,37,33,29,25,18],[40,33,29,25,21,13],[34,27,23,19,15,7],[28,22,18,14,10,5],[25,18,13,10,7,3],[24,17,14,11,5,2],[0,0,0,0,0,0]];

		if(data.inputs.core >= femValB[ageGp][0]) {
        	data.results.core = 20;
        } else if (data.inputs.core >= femValB[ageGp][1]) {
        	data.results.core = 17;
        } else if (data.inputs.core >= femValB[ageGp][2]) {
        	data.results.core = 15;
        } else if (data.inputs.core >= femValB[ageGp][3]) {
        	data.results.core = 12;
        } else if (data.inputs.core >= femValB[ageGp][4]) {
        	data.results.core = 7;
        } else if (data.inputs.core >= femValB[ageGp][5]) {
        	data.results.core = 4;
        } else {
        	data.results.core = 0;
        }
	} 
}

var flex = function () {
	
	if(data.details.gender == 1) {
		if(data.inputs.flex > 27) {
			data.results.flex = 20;
		} else if (data.inputs.flex >= 17) {
			data.results.flex = 17;
		} else if (data.inputs.flex >= 6) {
			data.results.flex = 15;
		} else if (data.inputs.flex >= 0) {
			data.results.flex = 12;
		} else if (data.inputs.flex >= -8) {
			data.results.flex = 7;
		} else if (data.inputs.flex >= -20) {
			data.results.flex = 4;
		} else  {
			data.results.flex = 0;
		}
	} else {
		if(data.inputs.flex > 30) {
			data.results.flex = 20;
		} else if (data.inputs.flex >= 21) {
			data.results.flex = 17;
		} else if (data.inputs.flex >= 11) {
			data.results.flex = 15;
		} else if (data.inputs.flex >= 1) {
			data.results.flex = 12;
		} else if (data.inputs.flex >= -7) {
			data.results.flex = 7;
		} else if (data.inputs.flex >= -15) {
			data.results.flex = 4;
		} else  {
			data.results.flex = 0;
		}
	}
}

var sumResults = function() {
	data.results.overall = +data.results.cardio + +data.results.upper + +data.results.lower + +data.results.core + +data.results.flex;

	document.querySelector('.fitness__score').textContent = data.results.overall;

	document.querySelector('.results__cardio').textContent = data.results.cardio;
	document.querySelector('.results__upper').textContent = data.results.upper;
	document.querySelector('.results__lower').textContent = data.results.lower;
	document.querySelector('.results__core').textContent = data.results.core;
	document.querySelector('.results__flex').textContent = data.results.flex;

	localStorage.setItem('fitnessApp_dataStore', JSON.stringify(data));

}



function init() {
	sumResults();
}

init();







