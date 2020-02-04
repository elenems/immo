const initState = {
  user: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'LOG_IN': return { ...state };
    default: return { ...state };
  }
};
