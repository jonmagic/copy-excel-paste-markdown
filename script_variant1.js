var editor_rst_variant1 = document.getElementById("editor_rst_variant1")

editor_rst_variant1.addEventListener("paste", function(event) {
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
    // Get the table
    // Run through it row by row and for each row column by column
    // The first column has a different indent
    // Each cell has its own line
    // The indent is based on 4 spaces, which seems to be quite standard in python
    // +======+=====+========+==========+
    // | naam | int | letter | fraction |
    // +======+=====+========+==========+
    // | aap  | 1   | a      | 0.333333 |
    // +------+-----+--------+----------+
    // | noot | 2   | b      | 0.250000 |
    // +------+-----+--------+----------+
    // | mies | 3   | c      | 0.200000 |
    // +======+=====+========+==========+
  var rstTableRows = rows.map(function(row, rowIndex) {
    return  "| " + row.map(function(column, index) {
      return column + Array(columnWidths[index] - column.length + 1).join(" ")
    }).join(" | ") + " |"
  })
  
  var lenSize = rstTableRows.length
  if(lenSize>1) {
      rstTableRows.splice(1, 0, "+" + columnWidths.map(function(width, index) {
        return  Array(columnWidths[index] + 3).join("=")
      }).join("+") + "+")
  } else {
      // if there is only one row, then is the last one
      rstTableRows.splice(1, 0, "+" + columnWidths.map(function(width, index) {
        return  Array(columnWidths[index] + 3).join("-")
      }).join("+") + "+")
  }
  rstTableRows.splice(0, 0, "+" + columnWidths.map(function(width, index) {
    return  Array(columnWidths[index] + 3).join("-")
  }).join("+") + "+")

  lenSize = rstTableRows.length

  if( lenSize > 3 ) {
      // the last row
      rstTableRows.splice(lenSize, 0, "+" + columnWidths.map(function(width, index) {
        return  Array(columnWidths[index] + 3).join("-")
      }).join("+") + "+")
      // Now we need to look whether we have more than 5, if so then we need to do the 
      // normal table inserts
      lenSize = rstTableRows.length
      if(lenSize > 5) {
          var lastRow = lenSize - 1
          console.log("lastRow is " + lastRow)
          for(i=lastRow-1;i>3;i=i-1) {
              console.log("i     is " + i)
              rstTableRows.splice(i, 0, "+" + columnWidths.map(function(width, index) {
                return  Array(columnWidths[index] + 3).join("-")
              }).join("+") + "+")
          }
      }    
  }
  // https://www.w3.org/TR/clipboard-apis/#the-paste-action
  // When pasting, the drag data store mode flag is read-only, hence calling
  // setData() from a paste event handler will not modify the data that is
  // inserted, and not modify the data on the clipboard. 
    // In other words, we cannot already reset the clipboard from here, leaving it to the user to manually copy 
    // the text in the text area
    // Some say this need the htmlonly directive ... but rst2html does not know about it
  event.target.value =  rstTableRows.map(function(row,rowIndex) { return indentString + row }).join("\n")
  return false
})
