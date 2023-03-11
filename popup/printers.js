// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function onPrintRequested(printJob, resultCallback) {
  console.log(printJob);
}

function createPrintersTable() {
  chrome.printing.getPrinters(function (printers) {
    const tbody = document.createElement('tbody');

    for (let i = 0; i < printers.length; ++i) {
      const printer = printers[i];
      chrome.printing.getPrinterInfo(printer.id, function (response) {
        const columnValues = [
          printer.id,
          printer.name,
          printer.description,
          printer.uri,
          printer.source,
          printer.isDefault,
          printer.recentlyUsedRank,
          JSON.stringify(response.capabilities),
          response.status
        ];

        let tr = document.createElement('tr');
        for (const columnValue of columnValues) {
          const td = document.createElement('td');
          td.appendChild(document.createTextNode(columnValue));
          td.setAttribute('align', 'center');
          tr.appendChild(td);
        }

        const printTd = document.createElement('td');
        printTd.appendChild(
          createPrintButton(function () {
            onPrintButtonClicked(
              printer.id,
              response.capabilities.printer.dpi.option[0]
            );
          })
        );
        tr.appendChild(printTd);

        tbody.appendChild(tr);
      });
    }

    const table = document.getElementById('printersTable');
    table.appendChild(tbody);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.printerProvider.onPrintRequested.addListener(onPrintRequested)
});
