// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toJS } from 'immutable';

// Instruments
import Styles from './styles.scss';

// import initialState from './todos';
import Checkbox from 'theme/assets/Checkbox';
import todosActions from 'actions';

// Components
import Task from 'components/Task';

class Scheduler extends Component {
    //state = Store.getState();

    handleSubmit = (event) => event.preventDefault();

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

const mapStateToProps = (state) => {
    console.log(state);

    return { todos: state.get('todos').toJS() };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...todosActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
