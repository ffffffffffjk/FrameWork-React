import { useState } from "react";
import Func from "./Func";

const UI = ({funcs}) => {

    let [count, setCount] = useState(funcs.length);

    const addFunction = () => {
        funcs.push({
            f : (x) => 0,
            color : 'blue',
            width : 1
        });
        setCount(funcs.length);
    };

    const delFunction = (index) => {
        funcs.splice(index, 1);
        setCount(funcs.length);
    }

    return(
    <>
        <button  id="addFunction" onClick={addFunction}>Добавить функцию</button>
        <div className="func-list">
            {funcs.map((func, index) => 
                <Func key = {index}
                func = {func}
                index = {index}
                delFunction = {delFunction}/>)
            }
        </div>
    </>
    );
}

export default UI;