const Func = ({func, index, delFunction}) => {
    const setFunction = (event) => {
        
        if (event.key === "Enter"){
            try{
                func.f = eval(`(x) => {return ${event.target.value};}`);
            } catch(e){
                console.log(e);
            }
        }
    }

    const setColor = (event) => {
        func.color = event.target.value;
    }

    const setWidth = (event) => {
        func.width = event.target.value;
    }
    
    return (
    <div className="func-row">
        <input 
            defaultValue={func.f} 
            onKeyDown={setFunction}
            placeholder="Функция"
        />

        <input
            defaultValue={func.width}
            onKeyUp={setWidth}
            placeholder="Толщина"
        />

        <input
            className='funcColor' 
            type='color'
            defaultValue={func.color}
            onKeyUp={setColor}
            placeholder="Цвет"
        />
        
        <button 
            onClick={() => delFunction(index)}
        >Удалить</button>
    </div>)
}

export default Func;