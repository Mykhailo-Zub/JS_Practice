export const extractValue = (event) => {
  return typeof event === "object" ? event.target.value : event;
};
