export const inputHandler = (ev, setState) => {
    setState(ev.target.value);
};

export const inputHandler2 = (ev, value, setState, state) => {
    setState({ ...state, ...{ [value]: ev.target.value } });
};
