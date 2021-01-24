var editor_rst_variant2 = document.getElementById("editor_rst_variant2")

editor_rst_variant2.addEventListener("paste", function(event) {
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
  var columnWidths = rows[0].map(function(column, columnIndex) {
    return columnWidth(rows, columnIndex)
  })
  var indentString = "    " 
    // Run through it row by row and for each row column by column
    // The first column has a different indent
    // Each cell has its own line
    // The indent is based on 4 spaces, which seems to be quite standard in python
    // .. htmlonly::
    // 
  var rstTableRows = rows.map(function(row, rowIndex) {
    return row.map(function(column, index) {
      if( columnWidths[index]-column.length +1 > 0 ) {
      return column + Array(columnWidths[index] - column.length + 1 ).join(" ")
    } else {
      return column
    }
    }).join(" ") 
  })
    // x
  // underline open
  rstTableRows.splice(1, 0, columnWidths.map(function(width, index) {
    return Array(columnWidths[index]+1).join("=")
  }).join(" ") )
  // first
  rstTableRows.splice(0, 0, columnWidths.map(function(width, index) {
    return Array(columnWidths[index] +1).join("=")
  }).join(" ")  )
  var lenSize = rstTableRows.length
  if( lenSize > 3 ) {
      rstTableRows.splice(lenSize, 0, columnWidths.map(function(width, index) {
        return Array(columnWidths[index] +1).join("=")
      }).join(" ")  )
  }
  // https://www.w3.org/TR/clipboard-apis/#the-paste-action
  // When pasting, the drag data store mode flag is read-only, hence calling
  // setData() from a paste event handler will not modify the data that is
  // inserted, and not modify the data on the clipboard.
  event.target.value = rstTableRows.map(function(row,rowIndex) { return indentString + row }).join("\n")
  return false

})
