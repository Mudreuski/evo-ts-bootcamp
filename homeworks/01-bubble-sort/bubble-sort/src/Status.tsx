import React from 'react';
import './App.css';

interface StatusProps {
    status: string
}

const Status = (props: StatusProps) => {
    return (
        <div>
            <span>{ props.status }</span>
        </div>
    );
};

export default Status;
