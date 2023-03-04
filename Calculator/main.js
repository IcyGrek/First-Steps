class Calculator{
    constructor(upperScreen_el,lowerScreen_el){
        this.upperScreen_el = upperScreen_el
        this.lowerScreen_el = lowerScreen_el
        this.clear()
    }

    clear(){
        this.lowerScreen = '';
        this.upperScreen = '';
        this.operation = undefined;
    }

    delete(){
        this.lowerScreen = this.lowerScreen.toString().slice(0,-1)
    }

    addNumber(number){
        if(number === '.' && this.lowerScreen.includes('.')) return;
        this.lowerScreen = this.lowerScreen.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.lowerScreen === '') return;
        if(this.upperScreen !== ''){
            this.compute()
        }
        this.operation = operation;
        this.upperScreen = this.lowerScreen;
        this.lowerScreen = '';
        
    }

    compute(){
        let computation;
        const upper = parseFloat(this.upperScreen);
        const lower = parseFloat(this.lowerScreen);
        if(isNaN(upper) || isNaN(lower)) return;
        switch (this.operation){
            case '+':
                computation = upper + lower
                break;
            case '-':
                computation = upper - lower
                break;
            case '*':
                computation = upper * lower
                break;
            case '÷' :
                computation = upper / lower
                break;
            default:
                return;  
        }
        this.lowerScreen = computation;
        this.operation = undefined;
        this.upperScreen = '';
    }

    getDisplayNumber(number){
        const strNumber = number.toString();
        const intNumbers = parseFloat(strNumber.split('.')[0]);
        const decNumbers = strNumber.split('.')[1];
        let intDisplay;
        if(isNaN(intNumbers)){
            intDisplay = '';
        } else{
            intDisplay = intNumbers.toLocaleString('en', {
                maximumFractioncDigits : 0 })
        }
        if(decNumbers != null){
            return `${intDisplay}.${decNumbers}`
        } else{
            return intDisplay;
        }
    }

    updateScreen(){
        this.lowerScreen_el.innerText = this.getDisplayNumber(this.lowerScreen);
        if(this.operation != null){
            this.upperScreen_el.innerText = `${this.getDisplayNumber(this.upperScreen)} ${this.operation}`;
        } else{
            this.upperScreen_el.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const all_clearButtom = document.querySelector('[data-all-clear]');
const upperScreen_el = document.querySelector('[data-upper-screen]');
const lowerScreen_el = document.querySelector('[data-lower-screen]');
const balanceButton = document.querySelector('[data-scam]');

const calculator = new Calculator(upperScreen_el,lowerScreen_el)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText)
        calculator.updateScreen()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateScreen()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateScreen();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateScreen();
})

all_clearButtom.addEventListener('click', button => {
    calculator.clear();
    calculator.updateScreen();
})

balanceButton.addEventListener('click', button =>{
    alert('Nu ti sho durak blyat?')
})