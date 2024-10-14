const delay = (ms) =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    return () => clearTimeout(timer);
  });

export default delay;
