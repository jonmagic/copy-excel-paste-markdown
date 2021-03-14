function columnWidth(rows, columnIndex) {
  return Math.max.apply(null, rows.map(function(row) {
    return row[columnIndex].length
  }))
}

function split_to_rows(data) {
  return data.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(function(row) {
    row = row.replace('\n', ' ')
    return row.split("\t")
  })
}

function convert_to_md(data) {
  var rows=split_to_rows(data)
  var colAlignments = []
  var columnWidths = rows[0].map(function(column, columnIndex) {
    var alignment = "l"
    var re = /^(\^[lcr])/i
    var m = column.match(re)
    if (m) {
        var align = m[1][1].toLowerCase()
        if (align === "c") {
          alignment = "c"
        } else if (align === "r") {
          alignment = "r"
        }
      }
    colAlignments.push(alignment)
    column = column.replace(re, "")
    rows[0][columnIndex] = column
    return columnWidth(rows, columnIndex)
  })
  var markdownRows = rows.map(function(row, rowIndex) {
    // | Name         | Title | Email Address  |
    // |--------------|-------|----------------|
    // | Jane Atler   | CEO   | jane@acme.com  |
    // | John Doherty | CTO   | john@acme.com  |
    // | Sally Smith  | CFO   | sally@acme.com |
    return "| " + row.map(function(column, index) {
      return column + Array(columnWidths[index] - column.length + 1).join(" ")
    }).join(" | ") + " |"
    row.map

  })
  markdownRows.splice(1, 0, "|" + columnWidths.map(function(width, index) {
    var prefix = ""
    var postfix = ""
    var adjust = 0
    var alignment = colAlignments[index]
    if (alignment === "r") {
      postfix = ":"
      adjust = 1
    } else if (alignment == "c") {
      prefix = ":"
      postfix = ":"
      adjust = 2
    }
    return prefix + Array(columnWidths[index] + 3 - adjust).join("-") + postfix
  }).join("|") + "|")

  return markdownRows.join("\n")
}

function convert_to_listtable(data) {
  var rows=split_to_rows(data)
  // remove the unwanted characters that have no effect in restructured text
  var firstRow=rows[0].map(function(column,columnIndex){
          var re = /^(\^[lcr])/i
          return(column.replace(re, ""))
  })
  rows[0]=firstRow
    // Run through it row by row and for each row column by column
    // The first column has a different indent
    // Each cell has its own line
  var rstListTableRows = rows.map(function(row, rowIndex) {
    return row.map(function(column, index) {
      var indentString = ( index > 0 ) ? "\t  - " : "\t* - "
      return indentString + column
    }).join("\n") 
  })

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
  return ".. list-table:: Title"+"\n" + "\t:widths: " + columnWidths + "\n"  + "\t:header-rows: 1" + "\n\n" + rstListTableRows.join("\n")
}

function convert_to_variant1(data) {
  var rows=split_to_rows(data)
  var firstRow=rows[0].map(function(column,columnIndex){
          var re = /^(\^[lcr])/i
          return(column.replace(re, ""))
  })
  rows[0]=firstRow
  var columnWidths = rows[0].map(function(column, columnIndex) {
    return columnWidth(rows, columnIndex)
  })
  var indentString = "\t" 
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
          for(i=lastRow-1;i>3;i=i-1) {
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
  return rstTableRows.map(function(row,rowIndex) { return indentString + row }).join("\n")
}

function convert_to_variant2(data) {
  var rows=split_to_rows(data)
  var firstRow=rows[0].map(function(column,columnIndex){
          var re = /^(\^[lcr])/i
          return(column.replace(re, ""))
  })
  rows[0]=firstRow
  var columnWidths = rows[0].map(function(column, columnIndex) {
    return columnWidth(rows, columnIndex)
  })
  var indentString = "\t" 
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
  return rstTableRows.map(function(row,rowIndex) { return indentString + row }).join("\n")
}

// the below line adds nothing, it just serves to make the mocha testing work
// from the directory this file is in simply run `mocha` (if you have it installed)
// to perform the tests
exports.convert_to_md=convert_to_md;
exports.convert_to_listtable=convert_to_listtable;
exports.convert_to_variant1=convert_to_variant1;
exports.convert_to_variant2=convert_to_variant2;
