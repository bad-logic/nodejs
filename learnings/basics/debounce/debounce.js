let callCount = 0;

const fakeApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callCount++;
      console.log("call made = ", callCount);
      resolve();
    }, 300);
  });
};

function debounce(callback) {
  let timeoutId;
  return function () {
    console.log({ timeoutId });
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, 800);
    console.log({ timeoutId });
  };
}

const debounceFakeCall = debounce(fakeApiCall);

debounceFakeCall();
debounceFakeCall();
debounceFakeCall();
debounceFakeCall();
debounceFakeCall();
