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
    state = {
        editable: true,
    };

    complete = () => {
        const { id, complete } = this.props;

        complete(id);
    };

    changePriority = () => {
        const { id, changePriority } = this.props;

        changePriority(id);
    };

    editTask = () => {
        const { completed } = this.props;

        if (!completed) {
            this.setState({ editable: false });
        }
    };

    deleteTask = () => {
        const { id, deleteTask } = this.props;

        deleteTask(id);
    };

    updateTask = (event) => {
        const { id, updateTask } = this.props;

        updateTask(id, event.target.value);
    };

    render () {
        const { completed, important, message, id } = this.props;
        const { editable } = this.state;

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
                        readOnly = { editable }
                        size = { 46 }
                        type = 'text'
                        value = { message }
                        // onChange = { this.updateTask }
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
