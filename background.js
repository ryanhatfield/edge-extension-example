// This is a `Cloud Device Description`, more information here:
// https://developers.google.com/cloud-print/docs/cdd#cdd
const CDD = {
  version: '1.0',
  printer: {
    supported_content_type: [
      { content_type: 'application/pdf', min_version: '1.5' },
      { content_type: 'image/jpeg' },
      { content_type: 'text/plain' },
    ],
    input_tray_unit: [
      {
        vendor_id: 'tray',
        type: 'INPUT_TRAY',
      },
    ],
    marker: [
      {
        vendor_id: 'black',
        type: 'INK',
        color: { type: 'BLACK' },
      },
      {
        vendor_id: 'color',
        type: 'INK',
        color: { type: 'COLOR' },
      },
    ],
    cover: [
      {
        vendor_id: 'front',
        type: 'CUSTOM',
        custom_display_name: 'front cover',
      },
    ],
    vendor_capability: [],
    color: {
      option: [
        { type: 'STANDARD_MONOCHROME' },
        { type: 'STANDARD_COLOR', is_default: true },
        {
          vendor_id: 'ultra-color',
          type: 'CUSTOM_COLOR',
          custom_display_name: 'Best Color',
        },
      ],
    },
    copies: {
      default: 1,
      max: 100,
    },
    media_size: {
      option: [
        {
          name: 'ISO_A4',
          width_microns: 210000,
          height_microns: 297000,
          is_default: true,
        },
        {
          name: 'NA_LEGAL',
          width_microns: 215900,
          height_microns: 355600,
        },
        {
          name: 'NA_LETTER',
          width_microns: 215900,
          height_microns: 279400,
        },
      ],
    },
  },
}

function sendWithFtps(pdf, callback) {
  console.log('sendWithFtps')
  console.log('pdf:', pdf)
}

// The onPrintRequested event is fired after the print dialog has been closed
function onPrintRequested(printJob, resultCallback) {
  console.log('onPrintRequested')
  sendWithFtps(printJob)
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
  resultCallback(CDD)
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
