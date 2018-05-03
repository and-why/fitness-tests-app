// Data

var dataController = (function() {

    var Record = function(id, date, cardio1, cardio2, upper, lower, core, flex) {
        this.id = id;
        this.date = date;
        this.cardio1 = cardio1;
        this.cardio2 = cardio2;
        this.upper = upper;
        this.lower = lower;
        this.core = core;
        this.flex = flex;
    }

    let data = {
        profile: {
            age: 0,
            gender: 0
        } ,
        resultsInd: []
    }

    return {
        
        addNewRecord: function(age, gender, cardio1, cardio2, upper, lower, core, flex) {
            let date, newItem, ID;

            date = new Date();
            date = date.toLocaleDateString('en-GB');
             if(data.resultsInd.length > 0){
                ID = data.resultsInd[data.resultsInd.length - 1].id + 1;
            } else {
                ID = 0;
            }

            newItem = new Record(ID, date, cardio1, cardio2, upper, lower, core, flex);

            data.resultsInd.push(newItem);
            data.profile.age = age;
            data.profile.gender = gender;

            UIController.writeResults(data.resultsInd);
        },


        runCalculations: function(age, gender, cardio1, cardio2, upper, lower, core, flex, choiceCardio, choiceUpper, choiceCore) {
            let resultCardio, resultUpper, resultLower, resultCore, resultFlex;

            let runDetails = function() {
                if(choiceCardio == 'step'){
                    cardioStep();
                } else {
                    cardioBeep();
                };
                if(choiceUpper == 'toes'){
                    upperToes();
                } else {
                    upperKnees();
                };
                if(choiceCore == 'plank'){
                    corePlank();
                } else {
                    coreCurl();
                };
                lower();
                flex(); 
            };

            

           // addNewRecord(age, gender, resultCardio, resultUpper, resultLower, resultCore, resultFlex);

        },

        testing: function() {
            console.log(data);
        }
        

    }


})();


var UIController = (function() {

    const DOMstrings = {
        input__age: '.input__age',
        input__gender: '#input__gender',
        
        choice__cardio: '#choice__cardio',
        choice__core: '#choice__core',
        choice__upper: '#choice__upper',
        input__cardio1: '.input__cardio1',
        input__cardio2: '.input__cardio2',
        input__upper: '.input__upper',
        input__lower: '.input__lower',
        input__core: '.input__core',
        input__flex: '.input__flex',

        submitBtn: '.submit'
    }

    return  {
        getInput: function() {
            return {
                age: document.querySelector(DOMstrings.input__age).value,
                gender: document.querySelector(DOMstrings.input__gender).value,
                cardio1: document.querySelector(DOMstrings.input__cardio1).value,
                cardio2: document.querySelector(DOMstrings.input__cardio2).value,
                upper: document.querySelector(DOMstrings.input__upper).value,
                lower: document.querySelector(DOMstrings.input__lower).value,
                core: document.querySelector(DOMstrings.input__core).value,
                flex: document.querySelector(DOMstrings.input__flex).value,
                choiceCardio: document.querySelector(DOMstrings.choice__cardio).value,
                choiceCore: document.querySelector(DOMstrings.choice__core).value,
                choiceUpper: document.querySelector(DOMstrings.choice__upper).value
            }
        },



        getDomStrings: function(){
            return DOMstrings;
        },

        writeResults: function(data) {
            console.log(data)
            for(let i = 0; i < data.length; i++){
                var html = `
        <div class="results__row__wrapper">
          <div class="results__ind"><span class="result__date">${data[i]}</span></div>
          <div class="results__ind"><span class="result__cardio-test">${data[i]}</span></div>
          <div class="results__ind"><span class="result__cardio">${data[i]}</span></div>
          <div class="results__ind"><span class="result__upper">${data[i]}</span> <span class="result__upper-test">(${data[i]})</span></div>
          <div class="results__ind"><span class="result__lower">${data[i]}</span>s</div>
          <div class="results__ind"><span class="result__core">${data[i]}</span>s</div>
          <div class="results__ind"><span class="result__flex">${data[i]}</span>cm</div>
        </div>
        `


            }
        }
    }
    



})();



var controller = (function(dataCtrl, UICtrl) {

        var dom = UICtrl.getDomStrings(); 

        // dropdown menu change value

        var setupEventListeners = function() {
    
            document.querySelector(dom.choice__cardio).addEventListener('change', function() {
                if(document.querySelector(dom.choice__cardio).value == 'beep') {
                    document.querySelector(dom.input__cardio2).classList.remove("hidden");
                    document.querySelector(dom.input__cardio1).placeholder = "Level";
                    document.querySelector(dom.input__cardio2).placeholder = "Shuttles";
                } else {
                    document.querySelector(dom.input__cardio2).classList.add("hidden");
                    document.querySelector(dom.input__cardio1).placeholder = "Heart Rate";
                }
            });
            document.querySelector(dom.choice__core).addEventListener('change', function() {
                if(document.querySelector(dom.choice__core).value == 'plank') {;
                    document.querySelector(dom.input__core).placeholder = "Seconds";
                } else {
                    document.querySelector(dom.input__core).placeholder = "Reps";
                }
            });
                
            


            document.querySelector(dom.submitBtn).addEventListener('click', ctrlAddRecord);
    
            document.addEventListener('keypress', function(event) {
                if(event.keyCode === 13 || event.which === 13) {
                    ctrlAddRecord();
                }
            });
        }
        var ctrlAddRecord = function() {
            // store new record in array

            input = UICtrl.getInput();
            console.log(input)
            dataCtrl.addNewRecord(input.age, input.gender, input.cardio1, input.cardio2, input.upper, input.lower, input.core, input.flex);

            // add record from array (even if local stored) and put them in the display region



        }


    return {
        init: function(){
            
            if(localStorage.getItem('AFAdataStore')){
                let data = localStorage.getItem('AFAdataStore');
                data.JSON.parse(data);
            }
            dataController.runCalculations();
            setupEventListeners();
        }
    }

})(dataController, UIController);


var calculator = (function(){
    
})();



controller.init();
