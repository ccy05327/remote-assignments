const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function requestSync(url) {
  // write code to request url synchronously
  const xhr = new XMLHttpRequest();
  const startTime = Date.now();
  xhr.open("GET", url, false); // synchronous request
  xhr.send();
  if (xhr.status === 200) {
    const endTime = Date.now();
    console.log(endTime - startTime);
    // console.log(xhr.responseText);
  } else {
    console.error(`Error: HTTP status ${xhr.status}`);
  }
}
requestSync(url); // would print out the execution time
requestSync(url);
requestSync(url);
