import React from 'react';
import "./style.css";

const Menu  = ({showPage}) => {
    const pages = ['Start',
        'Esse',
        'Targets', 
        'Graph2D', 
        'Rpg', 
        'MyCalc', 
        'Graph3D'
    ];

    return (
        <div className='menu-container'>
            {pages.map(((page, index) => (
                <button key = {index} className='menu-item' 
                onClick = {() => showPage(page)}>{`${page}`}</button>
            )))}
        </div>
    );
}

export default Menu;


// Menu.tsx

// import {EPAGE}

// type TMenu = {
//     showPage : (page : EPGAE) => void;
// }

// const Menu : React.FC<TMenu>({
//     showPage
// }) => {
//     return (
//         <div className='menu-container'>
//             {pages.map(((page, index) => (
//                 <button key = {index} className='menu-item' 
//                 onClick = {() => showPage(EPAGE.Graph3D)}>{`${EPAGE.Graph3D}`}</button>
//             )))}
//         </div>
//     );
// }