import React from 'react';
import './App.css';
import Board from "./Board";
import Status from "./Status";
import Button from "./Button";
import { getRandomIntInclusive } from "./helpers";
import {
    MAX_ARRAY_COLUMNS,
    MAX_COLUMN_VALUE,
    MIN_ARRAY_COLUMNS,
    MIN_COLUMN_VALUE, SORT_STEPS_INTERVAL
} from "./consts";

interface AppState {
    arrayData: Array<number>;
    isSorted: boolean;
    sortStatus: SortStatuses;
}

enum SortStatuses {
    WAITING,
    IN_PROGRESS
}

export default class App extends React.Component {
    private sortingTimer: NodeJS.Timer | undefined;

    public state: AppState = {
        arrayData: [],
        isSorted: false,
        sortStatus: SortStatuses.WAITING,
    };

    public componentDidMount(): void {
        this.setArrayWithData();
    }

    private setArrayWithData(): void {
        this.clearSortInterval();

        this.setState({arrayData: this.createArrayWithData()});
    }

    private createArrayWithData(): Array<number> {
        let arrayWithData = [];
        const columnsCount = getRandomIntInclusive(MIN_ARRAY_COLUMNS, MAX_ARRAY_COLUMNS);

        for (let i = 0; i < columnsCount; i++) {
            arrayWithData.push(getRandomIntInclusive(MIN_COLUMN_VALUE, MAX_COLUMN_VALUE));
        }

        return arrayWithData;
    }

    private startSort(): void {
        if (!this.state.isSorted) {
            const arr = [...this.state.arrayData];
            let prev = [...this.state.arrayData];
            this.setState({sortStatus : SortStatuses.IN_PROGRESS});

            this.sortingTimer = setInterval(() => {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] > arr[i + 1]) {

                        const temp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = temp;

                        this.setState({ arrayData: arr });
                        break;
                    }
                }

                if (prev.toString() === arr.toString()) {
                    this.clearSortInterval();

                    this.setState({isSorted: true});
                } else {
                    prev = [...arr];
                }
            }, SORT_STEPS_INTERVAL);
        }
    }

    private pauseSort(): void {
        this.clearSortInterval();
    }

    private clearSortInterval() {
        if (this.sortingTimer) clearInterval(this.sortingTimer);
        this.setState({sortStatus : SortStatuses.WAITING});
    }

    public render() {
        const processControl = (this.state.sortStatus === SortStatuses.WAITING) ?
            <Button event={this.startSort.bind(this)} text='Start' /> :
            <Button event={this.pauseSort.bind(this)} text='Pause' />;

        return (
            <main className='App'>
                <h1>Буль-буль сорт</h1>
                <Board arrayData={this.state.arrayData} />
                <div className='buttons'>
                    <Button event={this.setArrayWithData.bind(this)} text='New set' />
                    { processControl }
                </div>
                <Status status={ this.state.isSorted ? 'Solved' : 'Not solved' } />
            </main>
        )
    }
}

