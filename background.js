function onPrintRequested(printJob, resultCallback) {
  console.log("onPrintRequested")
  console.log(printJob);
}

function onGetPrintersRequested(resultCallback) {
  console.log("onGetPrintersRequested")
  resultCallback([{
    id: "printer-mike",
    name: "Michael's Printer",
    description: "Michael's custom printer that can call JS"
  }])
}

chrome.runtime.onInstalled.addListener(() => {
    console.log("onInstalled");
    chrome.printerProvider.onPrintRequested.addListener(onPrintRequested)
    chrome.printerProvider.onGetPrintersRequested.addListener(onGetPrintersRequested)
});
