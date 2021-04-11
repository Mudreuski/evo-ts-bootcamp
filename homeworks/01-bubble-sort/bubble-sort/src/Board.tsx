import React from 'react';
import './App.css';

interface BoardProps {
    arrayData: Array<number>
}

const Board = (props: BoardProps) => {
    const arrayData = props.arrayData;

    return (
        <div className='board'>
            {arrayData.map(( item, index ) => (
                <div key={index} className='column' style={{ height: `${item}px` }}></div>
            ))}
        </div>
    );
};

export default Board;
