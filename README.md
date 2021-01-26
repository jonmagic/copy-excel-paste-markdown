# Copy Excel Paste Markdown

Copy a table in Excel (or other spreadsheet programs) and paste it as a Markdown table.

![demo](https://cl.ly/120h1K2Q1Y3H/Screen%20Recording%202016-08-31%20at%2010.31%20PM.gif)

## Column Alignments

You can optionally specify column alignment information by prepending one of the following to the column heading names in Excel:

* ^c  - center alignment
* ^r  - right alignment
* ^l   - left alignment (the default)

For example: enter the following in Excel to right-align the second column and center-align the third column:

| animal | ^rweight | ^ccolor  |
|--------|----------|----------|
| dog    | 30lb     | tan      |
| dog    | 85lb     | black    |
| cat    | 18lb     | calico   |

This will produce the following markdown table when pasted:

```markdown
| animal | weight | color  |
|--------|-------:|:------:|
| dog    | 30lb   | tan    |
| dog    | 85lb   | black  |
| cat    | 18lb   | calico |
```

## Contributors

- @jonmagic
- [@thisdavej](https://github.com/thisdavej)
- [@JohnTube](https://github.com/JohnTube)
- [@mhlavacek](https://github.com/mhlavacek)
