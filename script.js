class Calculator {
    constructor(prevDiv, currDiv) {
        this.prevDiv = prevDiv
        this.currDiv = currDiv
    }
    
    appendNumber(number) {
        if (number === '.' && this.currDiv.innerText.includes('.')) return 
        this.currDiv.innerText = this.currDiv.innerText.toString() + number.toString()
    }

    selectOperation(operation) {
        if (this.currDiv.innerText === '') return
        if (this.prevDiv.innerText !== '') {
            this.calculate()
        }
        this.prevDiv.innerText = this.currDiv.innerText
        this.currDiv.innerText = ''
        this.operation = operation
    }

    calculate() {
        let calculated
        let prev = parseFloat(this.prevDiv.innerText)
        let curr = parseFloat(this.currDiv.innerText)
        switch (this.operation) {
            case '+':
                calculated = prev + curr
                break;
            case '-':
                calculated = prev - curr
                break;
            case '*':
                calculated = prev * curr
                break;
            case '÷':
                calculated = prev / curr
                break;
            default:
                return
        }
        this.currDiv.innerText = calculated
        this.prevDiv.innerText = ''
        this.operation = ''
    }

    delete() {
        this.currDiv.innerText = this.currDiv.innerText.slice(0, -1)
    }

    clear() {
        this.prevDiv.innerText = ''
        this.currDiv.innerText = ''
        this.operation = undefined
    }
}

const prevDiv = document.querySelector('.prev')
const currDiv = document.querySelector('.curr')

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-operation]')
const delButton = document.querySelector('[data-delete]')
const eqButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-allclear]')


const calculator = new Calculator(prevDiv, currDiv)

/* All clear */
acButton.addEventListener('click', () => {
    calculator.clear()
})

/* Delete one number / character */
delButton.addEventListener('click', () => {
    calculator.delete()
})

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)        
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)        
    })
})

eqButton.addEventListener('click', () => {
    calculator.calculate()    
})