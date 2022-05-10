class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        if(this.currentOperand==''&&this.previousOperand!=''){
            this.operation= undefined
            this.currentOperand = this.previousOperand
            return
        }
       this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    appendNumber(number){
        if (number ==='.'&&this.currentOperand.includes('.')){
            return;
        }
        this.currentOperand = this.currentOperand.toString()+number.toString()
    }

    chooseOperation(operation){
        if(isNaN(parseFloat(this.currentOperand))) return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        this.operation = operation
        
    }

    compute(){
        
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(this.operation==''||isNaN(prev)||isNaN(curr)) return
        if(this.operation=='+') this.currentOperand = prev+curr
        if(this.operation=='-') this.currentOperand = prev-curr
        if(this.operation=='*') this.currentOperand = prev*curr
        if(this.operation=='÷') this.currentOperand = prev/curr
        this.previousOperand=''
        this.operation = undefined
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

      updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
    
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})