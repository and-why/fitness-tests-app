// Data

var dataController = (function() {

    var Record = function(id, date, cardio1, cardio2, upper, lower, core, flex, choiceCardio, choiceUpper, choiceCore) {
        this.id = id;
        this.date = date;
        this.cardio1 = cardio1;
        this.cardio2 = cardio2;
        this.upper = upper;
        this.lower = lower;
        this.core = core;
        this.flex = flex;
        this.choiceCardio = choiceCardio;
        this.choiceUpper = choiceUpper;
        this.choiceCore = choiceCore;
        }

    if(localStorage.getItem('AFAfitnessAppdataStore')){
        var data = localStorage.getItem('AFAfitnessAppdataStore');
        data = JSON.parse(data);
    } else {
        var data = {
            profile: {
                age: 0,
                gender: 0
            } ,
            resultsInd: []
        }
    };

    return {
        
        

        addNewRecord: function(age, gender, cardio1, cardio2, upper, lower, core, flex, choiceCardio, choiceUpper, choiceCore) {
            let date, newItem, ID;

            date = new Date();
            date = date.toLocaleDateString('en-GB');
             if(data.resultsInd.length > 0){
                ID = data.resultsInd[data.resultsInd.length - 1].id + 1;
            } else {
                ID = 0;
            }

            newItem = new Record(ID, date, cardio1, cardio2, upper, lower, core, flex, choiceCardio, choiceUpper, choiceCore);

            data.resultsInd.push(newItem);
            data.profile.age = age;
            data.profile.gender = gender;

            UIController.writeResults(data.resultsInd);

            dataController.storeData(data);
        },

        deleteFromData: function(id) {
            
            id = parseInt(id);
            console.log(id);
            var ids, index;

            ids = data.resultsInd.map((e) => e.id);

            index = ids.indexOf(id);

            if (index !== -1) {data.resultsInd.splice(index,1)};

            UIController.writeResults(data.resultsInd);
            console.log(data);
            dataController.storeData(data);
            return data;
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

        storeData: function(data) {
            localStorage.setItem('AFAfitnessAppdataStore', JSON.stringify(data));
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

        submitBtn: '.submit',

        scoresBreakdown: '.score__breakdown',
        delete__record: '.delete__record'
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

        writeResults: function(resultsArr) {

            const headers = `<div class="results__row__wrapper">
          <div class="row__titles">Date</div>
          <div class="row__titles">Cardio Test</div>
          <div class="row__titles">Cardio Result</div>
          <div class="row__titles">Upper body</div>
          <div class="row__titles">Lower body</div>
          <div class="row__titles">Core</div>
          <div class="row__titles">Flexibility</div>
        </div>`


            document.querySelector(DOMstrings.scoresBreakdown).textContent = ' ';
            document.querySelector(DOMstrings.scoresBreakdown).insertAdjacentHTML('beforeend', headers)
            for(let i = 0; i < resultsArr.length; i++){
                
                if(resultsArr[i].id == undefined) {
                    continue;
                } else {

                html = `
        <div id="${resultsArr[i].id}" class="results__row__wrapper">
          <div class="results__ind"><span class="result__date">${resultsArr[i].date}</span></div>
          <div class="results__ind"><span class="result__cardio-test">${resultsArr[i].choiceCardio}</span></div>
          <div class="results__ind"><span class="result__cardio">${resultsArr[i].cardio1}-${resultsArr[i].cardio2}</span></div>
          <div class="results__ind"><span class="result__upper">${resultsArr[i].upper}</span> <span class="result__upper-test">(${resultsArr[i].choiceUpper})</span></div>
          <div class="results__ind"><span class="result__lower">${resultsArr[i].lower}</span>s </div>
          <div class="results__ind"><span class="result__core">${resultsArr[i].core}</span>s (${resultsArr[i].choiceCore})</div>
          <div class="results__ind"><span class="result__flex">${resultsArr[i].flex}</span>cm</div>
          <button class="delete__record">x</button>
        </div>
        `
            document.querySelector(DOMstrings.scoresBreakdown).insertAdjacentHTML('beforeend', html);

            }
        }
        },

        deleteRecord: function() {
           dataController.deleteFromData(this.parentNode.id);
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
                
            
            document.querySelectorAll(dom.delete__record).forEach((e) => e.addEventListener('click', UICtrl.deleteRecord));

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
            dataCtrl.addNewRecord(input.age, input.gender, input.cardio1, input.cardio2, input.upper, input.lower, input.core, input.flex, input.choiceCardio, input.choiceUpper, input.choiceCore);

            // add record from array (even if local stored) and put them in the display region



        }


    return {
        init: function(){

            if(localStorage.getItem('AFAfitnessAppdataStore')){
                    var data = localStorage.getItem('AFAfitnessAppdataStore');
                    data = JSON.parse(data);
                } else {
                    var data = {
                        profile: {
                            age: 0,
                            gender: 0
                        } ,
                        resultsInd: []
                    }
                };

            UIController.writeResults(data.resultsInd);
            setupEventListeners();
        }
    }

})(dataController, UIController);


var calculator = (function(){
    
})();



controller.init();




