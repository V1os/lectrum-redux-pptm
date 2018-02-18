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
    complete = () => {
        const { id, complete } = this.props;

        complete(id);
    };

    changePriority = () => {
        const { id, changePriority } = this.props;

        changePriority(id);
    };

    editTask = (message) => {
        const { id, editTask } = this.props;

        editTask(id, message);
    };

    deleteTask = () => {
        const { id, deleteTask } = this.props;

        deleteTask(id);
    };

    render () {
        const { completed, important, message } = this.props;

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
                    <code>{message}</code>
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
