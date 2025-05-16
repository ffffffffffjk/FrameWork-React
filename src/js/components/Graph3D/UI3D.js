import { useState } from "react";
import Figures from "./Figures";

const UI3D = ({scene, figures}) => {

    let [count, setCount] = useState(scene.length);
    
    const addFunction = () => {
        scene.push({
            f: new figures['Cube'],
            polygonColor: "#4D8BFF",
            pointsShow: true,
            polygonsShow: true,
            edgesShow: true,
            z : 30,
            x : 0,
            y : 0
        });
        setCount(scene.length);
    };

    const delFigure = (index) => {
        scene.splice(index, 1);
        setCount(scene.length);
    }

    return (
        <>
        <button  id="addFunction" onClick={addFunction}>Добавить фигуру</button>
        <div className="figure-list">
            {scene.map((figure, index) => 
                <Figures
                    key = {index}
                    figure = {figure}
                    figures = {figures}
                    delFigure = {delFigure}
                    index = {index}
                />)
            }
        </div>
    </>
    );
}

export default UI3D;