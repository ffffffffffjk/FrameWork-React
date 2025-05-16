const Figures = ({figure, delFigure, index, figures}) => {

    const setFigure = (event) => figure.f = new figures[event.target.value];

    const setPolygonColor = (event) => figure.polygonColor = event.target.value;

    const setPointsShow= (event) => figure.pointsShow = event.target.checked;
 
    const setEdgesShow = (event) => figure.edgesShow = event.target.checked;
 
    const setPolygonsShow = (event) => figure.polygonsShow = event.target.checked;

    const setCenterX = (event) => figure.x = event.target.value;

    const setCenterY = (event) => figure.y = event.target.value;

    const setCenterZ = (event) => figure.z = event.target.value;

    return (<div className="controls">
                <select 
                    id="SelectFigure" 
                    defaultValue={'Cube'}
                    onChange={setFigure}
                >
                    <option value="Cube">Куб</option>
                    <option value="Pyramid">Пирамида</option>
                    <option value="Cone">Конус</option>
                    <option value="Sphere">Сфера</option>
                    <option value="Thor">Тор</option>
                    <option value="Cylinder">Цилиндр</option>
                    <option value="Bottle">Бутылка Клейна</option>
                    <option value="HyperbolicCylinder">Гиперболический цилиндр</option>
                    <option value="ParabolicCylinder">Параболический цилиндр</option>
                    <option value="EllipticCylinder">Эллиптический цилиндр</option>
                    <option value="Hyperboloid">Однополостный гиперболоид</option>
                    <option value="BicavidHyperboloid">Двуполостный гиперболоид</option>
                    <option value="Ellipsoid">Эллипсоид</option>
                    <option value="SecondCone">Конус второго порядка</option>
                    <option value="EllipticParaboloid">Эллиптический параболоид</option>
                    <option value="HyperbolicParaboloid">Гиперболический параболоид</option>
                </select>
                <div className="color-picker">
                    <input type="color"
                        id="polygonColor" 
                        defaultValue={"#4D8BFF"}
                        onChange={setPolygonColor}
                    />
                    <label>Цвет полигонов</label>
                </div>
                <div className="color-picker">
                <label>Координата центра</label>
                    <input type="input"
                        id="centerX" 
                        defaultValue={0}
                        onChange={setCenterX}
                        placeholder="x"
                    />
                    <input type="input"
                        id="centerY" 
                        defaultValue={0}
                        onChange={setCenterY}
                        placeholder="y"
                    />
                    <input type="input"
                        id="centerZ" 
                        defaultValue={30}
                        onChange={setCenterZ}
                        placeholder="z"
                    />
                </div>
                <div className="checkbox-group">
                    <input 
                        type="checkbox" 
                        id="pointsShow" 
                        defaultChecked={figure.pointsShow} 
                        onChange={setPointsShow}
                    />
                    <label htmlFor="pointsShow">Точки</label>

                    <input 
                        type="checkbox" 
                        id="edgesShow" 
                        defaultChecked={figure.edgesShow} 
                        onChange={setEdgesShow}
                    />
                    <label htmlFor="edgesShow">Ребра</label>
            
                    <input 
                        type="checkbox" 
                        id="polygonsShow" 
                        defaultChecked={figure.polygonsShow}
                        onChange={setPolygonsShow}
                    />
                    <label htmlFor="polygonsShow">Полигоны</label>
                    </div>

                    <button onClick={() => delFigure(index)}>Удалить</button>
            </div>
            );
}

export default Figures;