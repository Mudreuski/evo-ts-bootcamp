import React, { MouseEventHandler } from 'react';
import './App.css';

type State = {
    event: MouseEventHandler<HTMLButtonElement>;
    text: string;
};

export default class Button extends React.Component<State> {
    public render() {
        return (
            <button onClick={ this.props.event }>{ this.props.text }</button>
        )
    }
}

