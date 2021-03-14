# Copy Excel Paste Markdown

You can clone the repo and then point your browser to the cloned `index.html`.

Copy a table in Excel (or other spreadsheet programs) and paste it as a Markdown table.

![demo](https://cl.ly/120h1K2Q1Y3H/Screen%20Recording%202016-08-31%20at%2010.31%20PM.gif)

## Column Alignments

You can optionally specify column alignment information by prepending one of the following to the column heading names in Excel:

* ^c  - center alignment
* ^r  - right alignment
* ^l   - left alignment (the default)

For example: enter the following csv in Excel to right-align the second column and center-align the third column:

```
animal,^rweight,^ccolor
dog,30lb,tan
dog,85lb,black
cat,18lb,calico
```

This will produce the following markdown table when pasted:

```markdown
| animal | weight | color  |
|--------|-------:|:------:|
| dog    | 30lb   | tan    |
| dog    | 85lb   | black  |
| cat    | 18lb   | calico |
```

and the output table with thus look like

| animal | weight | color  |
|--------|-------:|:------:|
| dog    | 30lb   | tan    |
| dog    | 85lb   | black  |
| cat    | 18lb   | calico |

## Added features for reStructured Text

Another simple markup language is [reStructuredText](https://docutils.sourceforge.io/rst.html). The `index.html` now contains three extra text areas for the three table variants that exist in reST.

reST has three options for creating tables.

- List tables. These are ideal for tables where you want to fold the text. 
- Simple tables. This is a bit of a misnomer: these are most like markdown tables
- Multicell or grid tables. These are similar to markdown as well.

Note that reStructuredText does not support the alignment of cells. Hence the alignment is ignored.

You can find more information [here](https://docutils.sourceforge.io/docs/user/rst/quickref.html).

## Simple Mocha tests

If you have [mocha](https://mochajs.org/) installed you can run the tests in the test directory.

# Contributors

- @jonmagic
- [@thisdavej](https://github.com/thisdavej)
- [@JohnTube](https://github.com/JohnTube)
- [@mhlavacek](https://github.com/mhlavacek)
