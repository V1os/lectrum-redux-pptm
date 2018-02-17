// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.scss';
import Checkbox from 'theme/assets/Checkbox';
import todosActions from 'actions';
import { getUniqueID } from 'helpers';
import { sortByPriority } from 'selectors/sortByPriiority';
import { sortByCompleted } from 'selectors/sortByCompleted';

// Components
import Task from 'components/Task';

class Scheduler extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        const { actions } = this.props;
        const data = new FormData(event.target);
        const adder = data.get('adder');

        if (adder !== '') {
            const task = {
                id:        getUniqueID(3),
                completed: false,
                important: false,
                message:   data.get('adder'),
            };

            this.setState(actions.addTask(task));
            event.target.adder.value = '';
        }
    };

    complete = (id) => {
        const { actions } = this.props;

        return this.setState(actions.updateComplete(id));
    };

    changePriority = (id) => {
        const { actions } = this.props;

        return this.setState(actions.changePriority(id));
    };

    completeAll = () => {
        const { todos, actions } = this.props;
        const flag = todos.every((todo) => todo.completed);

        return this.setState(actions.allComplete(flag));
    };

    render () {
        console.log(this.props, this.state);
        const { todos } = this.props;
        const allCompleted = todos.every((todo) => todo.completed);
        const todoList = todos.map(({ id, message, completed, important }) => (
            <Task
                changePriority = { this.changePriority }
                complete = { this.complete }
                completed = { completed }
                id = { id }
                important = { important }
                key = { id }
                message = { message }
            />
        ));

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>
                    <section>
                        <form onSubmit = { this.handleSubmit }>
                            <input
                                maxLength = { '46' }
                                name = { 'adder' }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>{todoList}</ul>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { allCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this.completeAll }
                        />
                        <code>Все задачи выполнены</code>
                    </footer>
                </main>
            </section>
        );
    }
}

//const mapStateToProps = (state) => state.toJS();
const mapStateToProps = (state) => sortByCompleted(sortByPriority(state));

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...todosActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
