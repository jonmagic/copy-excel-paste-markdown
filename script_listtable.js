var editor_rst_listtable = document.getElementById("editor_rst_listtable")

editor_rst_listtable.addEventListener("paste", function(event) {
  var clipboard = event.clipboardData
  var data = clipboard.getData('text/plain').trim()

  if(looksLikeTable(data)) {
    event.preventDefault()
  }else{
    return 
  }

  var rows = data.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(function(row) {
    console.log(row)
    return row.split("\t")
  })
    // Get the table
    // Run through it row by row and for each row column by column
    // The first column has a different indent
    // Each cell has its own line
    // The indent is based on 4 spaces, which seems to be quite standard in python
  var rstListTableRows = rows.map(function(row, rowIndex) {
    return row.map(function(column, index) {
      var indentString = ( index > 0 ) ? "      - " : "    * - "
      return indentString + column 
    }).join("\n") 
  })

  // https://www.w3.org/TR/clipboard-apis/#the-paste-action
  // When pasting, the drag data store mode flag is read-only, hence calling
  // setData() from a paste event handler will not modify the data that is
  // inserted, and not modify the data on the clipboard.
  var columnWidths = ""
  if(rows[0].length>1) {
    var columnWidth = Math.floor(100 / rows[0].length)
    var firstColumnWidth = 100 - columnWidth*(rows[0].length-1)
    columnWidths = rows[0].map(function(column,index) {
      return  "" + ( index > 0 ) ? columnWidth : firstColumnWidth 
    }).join(" ")
  } else {
    columnWidths = "" + 100
  }
  event.target.value = ".. list-table:: Title"+"\n" + "    :widths: " + columnWidths + "\n"  + "    :header-rows: 1" + "\n\n" + rstListTableRows.join("\n")
  return false
})
