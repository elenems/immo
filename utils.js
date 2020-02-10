export const dispatchShowCard = (show, hide, text, type, isInProcess) => {
  if (!isInProcess) {
    show({ text, type });
    setTimeout(() => {
      hide();
    }, 3500);
  }
};
