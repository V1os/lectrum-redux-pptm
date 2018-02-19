import Immutable from 'immutable';
export const getUniqueID = (length = 15) => {
    if (typeof length !== 'number') {
        throw new Error('The function argument should be a number!');
    }

    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

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
