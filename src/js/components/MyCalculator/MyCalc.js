import React, { useEffect, useRef, useState } from 'react';
import useCalculator from '../../modules/Calculator/useCalculator.js';
import "./mycalc.css";

const MyCalc = () => {

    let aRef = useRef();
    let bRef = useRef();
    let cRef = useRef();

    const operandHandler = useCalculator(aRef, bRef, cRef);

    return(<div className="calculator">
        <textarea ref={aRef} placeholder="Первое слагаемое"></textarea>
        <textarea ref={bRef} placeholder="Второе слагаемое"></textarea>
        <div className="buttons">
            <button className="operand"
            onClick={() => operandHandler('add')}>+</button>
            <button className="operand"
            onClick={() => operandHandler('sub')}>-</button>
            <button className="operand"
            onClick={() => operandHandler('mult')}>×</button>
            <button className="operand"
            onClick={() => operandHandler('div')}>÷</button>
            <button className="operand"
            onClick={() => operandHandler('pow')}>^</button>
            <button className="operand"
            onClick={() => operandHandler('prod')}>Prod</button>
            <button className="operand"
            onClick={() => operandHandler('zero')}>Zero</button>
            <button className="operand"
            onClick={() => operandHandler('one')}>One</button>
            <button className="operand"
            onClick={() => operandHandler('getValue')}>Value</button>
        </div>
        <textarea ref={cRef} placeholder="Результат"></textarea>
    </div>

    )
}

export default MyCalc;
// class MyCalc extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     operandHandler(event){
//         const A = document.getElementById('A').value;
//         const B = document.getElementById('B').value;
//         const calc = new Calculator();
//         const C = calc[event](calc.getEntity(A), calc.getEntity(B));
//         document.getElementById('C').value = C.toString();
//     }

//     render(){
//         return(
            // <div className="calculator">
            //     <textarea id='A' placeholder="Первое слагаемое"></textarea>
            //     <textarea id='B' placeholder="Второе слагаемое"></textarea>
            //     <div className="buttons">
            //         <button className="operand"
            //         onClick={() => this.operandHandler('add')}>+</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('sub')}>-</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('mult')}>×</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('div')}>÷</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('pow')}>^</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('prod')}>Prod</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('zero')}>Zero</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('one')}>One</button>
            //         <button className="operand"
            //         onClick={() => this.operandHandler('getValue')}>Value</button>
            //     </div>
            //     <textarea id="C" placeholder="Результат"></textarea>
            // </div>
//         );
//     }
// }

// export default MyCalc;