// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS } from 'immutable';
import FlipMove from 'react-flip-move';

// Instruments
import Styles from './styles.scss';
import Checkbox from 'theme/assets/Checkbox';
import todosActions from 'actions';
import { sortByPriority } from 'selectors/sortByPriiority';
import { sortByCompleted } from 'selectors/sortByCompleted';

// Components
import Task from 'components/Task';

class Scheduler extends Component {
    constructor () {
        super();
        this.state = { stateSave: {}};
    }

    componentWillMount () {
        const { actions } = this.props;

        actions.readTask();
        const t = setTimeout(() => {
            const stateSave = fromJS(this.props);

            this.setState({ stateSave });
            clearTimeout(t);
        }, 1000);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { actions } = this.props;
        const adder = event.target.adder.value;

        if (adder !== '') {
            actions.createTask(adder);
            event.target.adder.value = '';
        }
    };

    changePriority = (id) => {
        const { todos, actions } = this.props;
        const todo = fromJS(todos).filter((task) => task.get('id') === id);
        const todoUpdate = todo.setIn([0, 'favorite'], !todo.get('favorite'));

        return this.setState(actions.changePriority(todoUpdate));
    };

    completeAll = () => {
        const { todos, actions } = this.props;
        const flag = todos.every((todo) => todo.completed);

        return this.setState(
            actions.allComplete({ flag, todos: fromJS(todos) })
        );
    };

    completeTask = (id) => {
        const { todos, actions } = this.props;
        const todo = fromJS(todos).filter((task) => task.get('id') === id);
        const todoUpdate = todo.setIn([0, 'completed'], !todo.get('completed'));

        this.setState(actions.completeTask(todoUpdate));
    };

    searchBy = (event) => {
        const { actions } = this.props;
        const { stateSave } = this.state;

        // reset to init
        this.setState(actions.resetList(stateSave));

        return this.setState(actions.searchTask(event.target.value));
    };

    deleteTask = (id) => {
        const { actions } = this.props;

        return this.setState(actions.deleteTask(id));
    };

    updateTask = (task) => {
        const { actions, todos } = this.props;
        const todoFilter = fromJS(todos).filter(
            (todo) => todo.get('id') === task.id
        );
        const taskToUpdate = todoFilter.map((todo) =>
            todo.set('message', task.message)
        );

        return this.setState(actions.updateTask(taskToUpdate));
    };

    render () {
        const { todos } = this.props;
        const allCompleted = todos.every((todo) => todo.completed);
        const todoList = todos.map(
            ({ id, message, completed, favorite: important }) => (
                <Task
                    changePriority = { this.changePriority }
                    className = 'tile'
                    complete = { this.completeTask }
                    completed = { completed }
                    deleteTask = { this.deleteTask }
                    id = { id }
                    important = { important }
                    key = { id }
                    message = { message }
                    updateTask = { this.updateTask }
                />
            )
        );

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            onChange = { this.searchBy }
                        />
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
                        <FlipMove
                            maintainContainerHeight
                            duration = { 500 }
                            easing = 'ease-out'
                            enterAnimation = 'fade'
                            leaveAnimation = 'fade'
                            staggerDelayBy = { 20 }
                            staggerDurationBy = { 20 }
                            typeName = 'ul'>
                            {todoList}
                        </FlipMove>
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

const mapStateToProps = (state) => sortByCompleted(sortByPriority(state));

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...todosActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
