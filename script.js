const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.append(button.innerText);
        cal.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.operator(button.innerText);
        cal.updateDisplay();
    })
})

clearButton.addEventListener('click', button => {
    cal.clear();
    cal.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    cal.delete()
    cal.updateDisplay();
})

equalsButton.addEventListener('click', button => {
    cal.calculate()
    cal.updateDisplay();
})


class Calculator{
    constructor(previousTextElement, currentTextElement)
    {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

    delete()
    {
        this.current = this.current.toString().slice(0, -1);
    }

    clear()
    {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    append(number)
    {
        if(number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString();
    }

    operator(operation)
    {
        if(this.current === '') return
        if(this.previous !== '')
        {
            this.calculate();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    calculate()
    {
        const a = parseFloat(this.previous);
        const b = parseFloat(this.current);
        let result;
        if(isNaN(a) || isNaN(b))
        {
            return;
        }
        switch(this.operation)
        {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '÷':
                result = a / b;
                break;
            default:
                return;
        }

        this.current = result;
        this.operation = undefined;
        this.previous = '';
        
    }

    updateDisplay()
    {
        this.currentTextElement.innerText = this.current;
        if(this.operation != null)
        {
            this.previousTextElement.innerText = `${this.previous} ${this.operation}`;
        }
        else{
            this.previousTextElement.innerText = '';
        }
    }

}

const cal = new Calculator(previousTextElement, currentTextElement);




