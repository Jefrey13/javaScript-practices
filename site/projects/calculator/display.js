class Display {
    constructor(previousValueDisplay, currentValueDisplay) {
        this.currentValueDisplay = currentValueDisplay;
        this.previousValueDisplay = previousValueDisplay;
        this.calculator = new Calculator();
        this.operationType = undefined;
        this.currentValue = '';
        this.previousValue = '';
        this.operations = {
            add: '+',
            divide: '%',
            multiply: 'x',
            subtract: '-',
        };
    }

    deleteDigit() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
        this.displayValues();
    }

    clearAll() {
        this.currentValue = '';
        this.previousValue = '';
        this.operationType = undefined;
        this.displayValues();
    }

    compute(operation) {
        this.operationType !== 'equals' && this.performCalculation();
        this.operationType = operation;
        this.previousValue = this.currentValue || this.previousValue;
        this.currentValue = '';
        this.displayValues();
    }

    addNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();
        this.displayValues();
    }

    displayValues() {
        this.currentValueDisplay.textContent = this.currentValue;
        this.previousValueDisplay.textContent = `${this.previousValue} ${this.operations[this.operationType] || ''}`;
    }

    performCalculation() {
        const previousValue = parseFloat(this.previousValue);
        const currentValue = parseFloat(this.currentValue);

        if (isNaN(currentValue) || isNaN(previousValue)) return;
        this.currentValue = this.calculator[this.operationType](previousValue, currentValue);
    }
}
