import React from 'react';
import Menu from '/Users/safevitya/my-app/src/js/components/Menu/Menu.js';
import Esse from '/Users/safevitya/my-app/src/js/components/Esse/Esse.js';
import Nothing from '/Users/safevitya/my-app/src/js/components/Nothing/Nothing';
import Targets from '/Users/safevitya/my-app/src/js/components/Target/Targets.js';
import Rpg from '/Users/safevitya/my-app/src/js/components/Rpg/Rpg.js';
import MyCalc from '/Users/safevitya/my-app/src/js/components/MyCalculator/MyCalc.js';
import Graph2D from '/Users/safevitya/my-app/src/js/components/Graph/Graph2D.js';
import Graph3D from '/Users/safevitya/my-app/src/js/components/Graph3D/Graph3D.js';
import { useState } from "react";

const App = () => {
  const [page, setPage] = useState('Graph3D');
    return(
      (<div>
        <Menu showPage = {setPage}/>
          {page === 'Rpg' && <Rpg/>}
          {page === 'Graph3D' && <Graph3D/>}
          {page === 'Graph2D' && <Graph2D/>}
          {page === 'MyCalc' && <MyCalc/>}
          {page === 'Targets' && <Targets/>}
          {page === 'Esse' && <Esse/>}
          {page === 'Nothing' && <Nothing/>}
      </div>)
    );
}

export default App;

//App.tsx
// импорты
// export enum EPAGE{
//   MyCalc,
//   Graph3D,
//   Graph2D,
//   Targets,
//   Esse,
//   Nothing,
//   Rpg,
// }

// const App : React.FC = () => {
//   const [page, setPage] = useState<EPAGE>(EPAGE.Graph3D);
//   return(
//     (<div>
//       <Menu showPage = {setPage}/>
//         {page === EPAGE.Rpg && <Rpg/>}
//         {page === EPAGE.Graph3D && <Graph3D/>}
//         {page === EPAGE.Graph2D && <Graph2D/>}
//         {page === EPAGE.MyCalc && <MyCalc/>}
//         {page === EPAGE.Targets && <Targets/>}
//         {page === EPAGE.Esse && <Esse/>}
//         {page === EPAGE.Nothing && <Nothing/>}
//     </div>)
//   );
// }
// export default App;