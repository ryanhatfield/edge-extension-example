importScripts('./cdd.js')

function sendBytesSomewhere(pdf) {
  console.log('sendBytesSomewhere')
  console.log('pdf:', pdf)

  pdf.arrayBuffer().then((arrayBuffer) => {
    console.log(arrayBuffer)
  })
}

function openInNewWindow(pdf) {
  var blobURL = URL.createObjectURL(pdf)
  window.open(blobURL)
}

// The onPrintRequested event is fired after the print dialog has been closed
function onPrintRequested(printJob, resultCallback) {
  console.log('onPrintRequested')
  sendBytesSomewhere(printJob.document)
  resultCallback('OK')
}

// The onGetPrintersRequested event is fired when the dialog opens
// Returns an id, name, and description for the custom printer
function onGetPrintersRequested(resultCallback) {
  console.log('onGetPrintersRequested')
  resultCallback([
    {
      id: 'printer-mike',
      name: "Michael's Printer",
      description: "Michael's custom printer that can call JS",
    },
  ])
}

// The onGetCapabilityRequested event is fired after the dialog opens,
// AND after the printer is selected. If the printer was previously used,
// this event is fired immidiately after onGetPrintersRequested.
// Returns a Cloud Device Description
function onGetCapabilityRequested(printerId, resultCallback) {
  console.log('onGetCapabilityRequested')
  console.log(printerId)
  // const { href } = new URL('cdd.js', location.href)
  // __shimport__.load(href).then((CDD) => {
  resultCallback(CDD)
  // })
}

// This adds a lambda function, and can be used for initialization
chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled')
})

// These add event listeners for the background service worker,
// This is fired when edge enables the extension, and remains running in the background.
chrome.printerProvider.onPrintRequested.addListener(onPrintRequested)
chrome.printerProvider.onGetPrintersRequested.addListener(
  onGetPrintersRequested
)
chrome.printerProvider.onGetCapabilityRequested.addListener(
  onGetCapabilityRequested
)
