import React, { useEffect } from 'react';
import RpgGame from '/Users/safevitya/my-app/src/js/modules/RpgFolder/RpgGame.js';
import "./rpg.css"

const Rpg = () => {

    useEffect(() =>{
        (new RpgGame()).renders();
    });
    
    return(
        <div className="containerRpg">
            <h1 className="rpg-title" id="title"></h1>
            <h1 className="hp">
                <img src="https://getdrawings.com/free-icon/half-life-icon-56.png" className="icon"/> 
                <span id="hp"></span>
            </h1>
            <h1 className="money">
                <img src="https://avatars.mds.yandex.net/i?id=6afc9c0d5378224a55270c2cd7f3a7bcb7735392-5709069-images-thumbs&n=13" className="icon"/> 
                <span id="money"></span>
            </h1>
            <img className="roomImage" id="roomImage" height="400px"/>
            <p className="description" id="description"></p>
            <p className="foundsMoney" id="foundsMoney"></p>
            <div className="exits" id="exits"></div>
        </div>
    );

}
// class Rpg extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     componentDidMount(){
//         (new RpgGame()).renders();
//     }
    
//     render(){
//         return(
//             <div className="containerRpg">
//                 <h1 className="rpg-title" id="title"></h1>
//                 <h1 className="hp">
//                     <img src="https://getdrawings.com/free-icon/half-life-icon-56.png" className="icon"/> 
//                     <span id="hp"></span>
//                 </h1>
//                 <h1 className="money">
//                     <img src="https://avatars.mds.yandex.net/i?id=6afc9c0d5378224a55270c2cd7f3a7bcb7735392-5709069-images-thumbs&n=13" className="icon"/> 
//                     <span id="money"></span>
//                 </h1>
//                 <img className="roomImage" id="roomImage" height="400px"/>
//                 <p className="description" id="description"></p>
//                 <p className="foundsMoney" id="foundsMoney"></p>
//                 <div className="exits" id="exits"></div>
//             </div>
//         );
//     }
// }

export default Rpg;