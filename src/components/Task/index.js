// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.scss';
import Checkbox from 'theme/assets/Checkbox';
import Delete from 'theme/assets/Delete';
import Edit from 'theme/assets/Edit';
import Star from 'theme/assets/Star';

export default class Task extends Component {
    constructor () {
        super();
        this.state = {
            readOnly: true,
            value:    '',
        };
        this.checkInUpdate = ::this._checkInUpdate;
    }

    componentWillMount () {
        const { message } = this.props;

        this.setState({ value: message, readOnly: true });
    }

    complete = () => {
        const { id, complete } = this.props;

        complete(id);
    };

    changePriority = () => {
        const { id, changePriority } = this.props;

        changePriority(id);
    };

    deleteTask = () => {
        const { id, deleteTask } = this.props;

        deleteTask(id);
    };

    editTask = () => {
        const { completed } = this.props;
        const { value } = this.state;

        if (!completed) {
            this.setState({ value, readOnly: false });
        }
    };

    _checkInUpdate (event) {
        const { value, readOnly } = this.state;

        if (event.key === 'Enter' && !readOnly) {
            const { id, updateTask, message } = this.props;

            if (value === '') {
                this.setState({ value: message, readOnly: false });
            } else {
                updateTask({ id, message: value });
                this.setState({ value, readOnly: true });
            }
        }
    }

    changeTask = (event) =>
        this.setState({ value: event.target.value, readOnly: false });

    render () {
        const { completed, important } = this.props;
        const { readOnly, value: valueInput } = this.state;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div>
                    <Checkbox
                        checked = { completed }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this.complete }
                    />
                    <input
                        maxLength = { 46 }
                        readOnly = { readOnly }
                        size = { 46 }
                        type = 'text'
                        value = { valueInput }
                        onChange = { this.changeTask }
                        onKeyPress = { this.checkInUpdate }
                    />
                </div>
                <div>
                    <Star
                        checked = { important }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.changePriority }
                    />
                    <Edit
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.editTask }
                    />
                    <Delete
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this.deleteTask }
                    />
                </div>
            </li>
        );
    }
}
