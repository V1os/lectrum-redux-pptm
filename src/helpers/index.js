import Immutable from 'immutable';

export const sortTaskByAZ = (list, name) => {
    if (list instanceof Immutable.List) {
        return list.sort((taskPrev, taskNext) => {
            if (!taskPrev.get(name) && taskNext.get(name)) {
                return 1;
            }

            if (taskPrev.get(name) && !taskNext.get(name)) {
                return -1;
            }

            if (taskPrev.get(name) === taskNext.get(name)) {
                return 0;
            }

            return 0;
        });
    }

    throw Error('Type not implemented');
};

export const sortTaskByZA = (list, name) => {
    if (list instanceof Immutable.List) {
        return list.sort((taskPrev, taskNext) => {
            if (!taskPrev.get(name) && taskNext.get(name)) {
                return -1;
            }

            if (taskPrev.get(name) && !taskNext.get(name)) {
                return 1;
            }

            if (taskPrev.get(name) === taskNext.get(name)) {
                return 0;
            }

            return 0;
        });
    }

    throw Error('Type not implemented');
};
