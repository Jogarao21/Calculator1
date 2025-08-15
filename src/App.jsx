import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDoubleZero = () => {
    if (waitingForOperand) {
      setDisplay('0');
      setWaitingForOperand(false);
    } else if (display !== '0') {
      setDisplay(display + '00');
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const deleteDigit = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const percentage = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      // If there's a pending operation, calculate percentage of the previous value
      const percentValue = (previousValue * inputValue) / 100;
      setDisplay(String(percentValue));
    } else {
      // Simple percentage conversion
      const value = inputValue / 100;
      setDisplay(String(value));
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ onClick, type = 'number', children, ...props }) => (
    <button
      onClick={onClick}
      className={`calculator__button calculator__button--${type}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="calculator-app fade-in">
      <div className="calculator">
        {/* Display */}
        <div className="calculator__display">
          <div className="calculator__display-text">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="calculator__grid">
          {/* First Row */}
          <Button onClick={clear} type="clear">
            AC
          </Button>
          <Button onClick={deleteDigit} type="delete">
            DEL
          </Button>
          <Button onClick={percentage} type="percentage">
            %
          </Button>
          <Button onClick={() => performOperation('÷')} type="operator">
            ÷
          </Button>

          {/* Second Row */}
          <Button onClick={() => inputNumber(7)} type="number">
            7
          </Button>
          <Button onClick={() => inputNumber(8)} type="number">
            8
          </Button>
          <Button onClick={() => inputNumber(9)} type="number">
            9
          </Button>
          <Button onClick={() => performOperation('×')} type="operator">
            ×
          </Button>

          {/* Third Row */}
          <Button onClick={() => inputNumber(4)} type="number">
            4
          </Button>
          <Button onClick={() => inputNumber(5)} type="number">
            5
          </Button>
          <Button onClick={() => inputNumber(6)} type="number">
            6
          </Button>
          <Button onClick={() => performOperation('-')} type="operator">
            -
          </Button>

          {/* Fourth Row */}
          <Button onClick={() => inputNumber(1)} type="number">
            1
          </Button>
          <Button onClick={() => inputNumber(2)} type="number">
            2
          </Button>
          <Button onClick={() => inputNumber(3)} type="number">
            3
          </Button>
          <Button onClick={() => performOperation('+')} type="operator">
            +
          </Button>

          {/* Fifth Row */}
          <Button onClick={() => inputNumber(0)} type="number">
            0
          </Button>
          <Button onClick={inputDoubleZero} type="number">
            00
          </Button>
          <Button onClick={inputDecimal} type="number">
            .
          </Button>
          <Button onClick={handleEquals} type="equals">
            =
          </Button>
        </div>

        {/* Footer */}
        <div className="calculator__footer">
          Tap numbers and operators to calculate
        </div>
      </div>
    </div>
  );
};

export default App;