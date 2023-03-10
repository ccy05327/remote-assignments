const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function requestCallback(url, callback) {
  // write code to request url asynchronously
  const xhr = new XMLHttpRequest();
  const startTime = Date.now();
  xhr.open("GET", url, true); // asynchronous request
  xhr.onload = function () {
    const endTime = Date.now();
    if (xhr.status === 200) {
      callback(endTime - startTime);
    } else {
      callback(null, `Error: HTTP status ${xhr.status}`, endTime - startTime);
    }
  };

  xhr.send();
}
function requestPromise(url) {
  // write code to request url asynchronously with Promise
  const startTime = Date.now();
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); // asynchronous request
    xhr.onload = function () {
      const endTime = Date.now();
      if (xhr.status === 200) {
        resolve(endTime - startTime);
      } else {
        reject({
          error: `Error: HTTP status ${xhr.status}`,
          time: endTime - startTime,
        });
      }
    };

    xhr.send();
  });
}
async function requestAsyncAwait(url) {
  // write code to request url asynchronously
  // you should call requestPromise here and get the result using async/await.
  try {
    const result = await requestPromise(url); // make asynchronous request with Promise
    console.log(result);
  } catch (errorData) {
    console.error(errorData.error);
    console.log(errorData);
  }
}
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);
