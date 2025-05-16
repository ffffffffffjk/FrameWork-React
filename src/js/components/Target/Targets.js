import Shot from '/Users/safevitya/my-app/src/js/modules/Shot/Shot.js';
import "./targets.css";
import { useRef } from 'react';

const Targets = () =>  {
    const countRef = useRef();
    const resultRef = useRef();

    const targetShotHandler = () => {
        const count = countRef.current.value - 0;
        if (count > 0) {
            const shotResult = (new Shot()).shootToTarget(count);
            resultRef.current.innerHTML = 'Результат: ' + shotResult;
        }
    }

    return(
        <div className="container">
            <h1 className="mainText">Стрельба по мишеням</h1>
            <input className="target-input" ref={countRef} id="countShots" placeholder="Сколько раз стреляем"/>
            <img 
                className="shot-image" 
                id="shotButton" 
                src="https://cdn.vectorstock.com/i/500p/91/73/a-black-and-white-an-ak-47-rifle-vector-38169173.jpg" 
                alt="Автомат"
                onClick={targetShotHandler}
            />
            <span className="target-result" ref={resultRef} id="result">Результат:</span>
        </div>
    )

}

export default Targets;