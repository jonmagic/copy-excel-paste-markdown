var editor_markdown = document.getElementById("editor_markdown")
var editor_rst_listtable = document.getElementById("editor_rst_listtable")
var editor_rst_variant1 = document.getElementById("editor_rst_variant1")
var editor_rst_variant2 = document.getElementById("editor_rst_variant2")

editor_markdown.addEventListener("paste", function(event) {
  var clipboard = event.clipboardData
  var data = clipboard.getData('text/plain').trim()

  if(looksLikeTable(data)) {
    event.preventDefault()
  }else{
    return
  }

  event.target.value = convert_to_md(data)
  return false
})

editor_rst_listtable.addEventListener("paste", function(event) {
  var clipboard = event.clipboardData
  var data = clipboard.getData('text/plain').trim()

  if(looksLikeTable(data)) {
    event.preventDefault()
  }else{
    return 
  }

  event.target.value = convert_to_listtable(data)
  return false
})

editor_rst_variant1.addEventListener("paste", function(event) {
  var clipboard = event.clipboardData
  var data = clipboard.getData('text/plain').trim()
  if(looksLikeTable(data)) {
    event.preventDefault()
  }else{
    return
  }
  event.target.value =  convert_to_variant1(data)
  return false
})

editor_rst_variant2.addEventListener("paste", function(event) {
  var clipboard = event.clipboardData
  var data = clipboard.getData('text/plain').trim()
  if(looksLikeTable(data)) {
    event.preventDefault()
  }else{
    return
  }
  event.target.value = convert_to_variant2(data)
  return false
})
