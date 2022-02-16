const mainAction = (type, value) => {
  return {
    type: type,
    payload: value,
  };
};

export default mainAction;
