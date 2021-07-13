[![view on npm](http://img.shields.io/npm/v/table-layout.svg)](https://www.npmjs.org/package/table-layout)
[![npm module downloads](http://img.shields.io/npm/dt/table-layout.svg)](https://www.npmjs.org/package/table-layout)
[![Build Status](https://travis-ci.org/75lb/table-layout.svg?branch=master)](https://travis-ci.org/75lb/table-layout)
[![Dependency Status](https://david-dm.org/75lb/table-layout.svg)](https://david-dm.org/75lb/table-layout)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# table-layout
Generates plain-text tables from JSON recordset input (array of objects). Useful for presenting text in column layout or data in table layout in text-based user interfaces. Also [available as a command-line tool](https://github.com/75lb/table-layout-cli).

## Synopsis

```
> const Table = require('table-layout')
> const issues = require('./example/issues')

> const table = new Table(issues, { maxWidth: 60 })
> console.log(table.toString())

 15134  Coveralls has no source available   ndelangen     0
 15133  Fixing --preserve-symlinks.         phestermcs    0
        Enhancing node to exploit.
 15131  Question - Confused about NPM's     the1mills     0
        local installation philosophy
 15130  Question - global npm cache         ORESoftware   0
        directory if user is root?
 15127  how to installa gulp fontfacegen    aramgreat     0
        on Windows 10
 15097  Cannot install package from         mastertinner  3
        tarball out of package.json entry
        generated by npm
 15067  npm "SELF_SIGNED_CERT_IN_CHAIN"     LegendsLyfe   3
        error when installing discord.js
        with .log

```

## API Reference

* [table-layout](#module_table-layout)
    * [Table](#exp_module_table-layout--Table) ⏏
        * [new Table(data, [options])](#new_module_table-layout--Table_new)
        * [table.renderLines()](#module_table-layout--Table+renderLines) ⇒ <code>Array.&lt;string&gt;</code>
        * [table.toString()](#module_table-layout--Table+toString) ⇒ <code>string</code>
        * [Table~columnOption](#module_table-layout--Table..columnOption)

<a name="exp_module_table-layout--Table"></a>

### Table ⏏
Recordset data in (array of objects), text table out.

**Kind**: Exported class  
<a name="new_module_table-layout--Table_new"></a>

#### new Table(data, [options])
**Params**

- data <code>Array.&lt;object&gt;</code> - input data
- [options] <code>object</code> - optional settings
    - [.maxWidth] <code>number</code> - maximum width of layout
    - [.noWrap] <code>boolean</code> - disable wrapping on all columns
    - [.noTrim] <code>boolean</code> - disable line-trimming
    - [.break] <code>boolean</code> - enable word-breaking on all columns
    - [.columns] [<code>columnOption</code>](#module_table-layout--Table..columnOption) - array of column-specific options
    - [.ignoreEmptyColumns] <code>boolean</code> - if set, empty columns or columns containing only whitespace are not rendered.
    - [.padding] <code>object</code> - Padding values to set on each column. Per-column overrides can be set in the `options.columns` array.
        - [.left] <code>string</code> - Defaults to a single space.
        - [.right] <code>string</code> - Defaults to a single space.

**Example**  
```js
> Table = require('table-layout')
> jsonData = [{
  col1: 'Some text you wish to read in table layout',
  col2: 'And some more text in column two. '
}]
> table = new Table(jsonData, { maxWidth: 30 })
> console.log(table.toString())
 Some text you  And some more
 wish to read   text in
 in table      column two.
 layout
```
<a name="module_table-layout--Table+renderLines"></a>

#### table.renderLines() ⇒ <code>Array.&lt;string&gt;</code>
Identical to `.toString()` with the exception that the result will be an array of lines, rather than a single, multi-line string.

**Kind**: instance method of [<code>Table</code>](#exp_module_table-layout--Table)  
<a name="module_table-layout--Table+toString"></a>

#### table.toString() ⇒ <code>string</code>
Returns the input data as a text table.

**Kind**: instance method of [<code>Table</code>](#exp_module_table-layout--Table)  
<a name="module_table-layout--Table..columnOption"></a>

#### Table~columnOption
**Kind**: inner typedef of [<code>Table</code>](#exp_module_table-layout--Table)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | column name, must match a property name in the input |
| [width] | <code>number</code> | A specific column width. Supply either this or a min and/or max width. |
| [minWidth] | <code>number</code> | column min width |
| [maxWidth] | <code>number</code> | column max width |
| [nowrap] | <code>boolean</code> | disable wrapping for this column |
| [break] | <code>boolean</code> | enable word-breaking for this columns |
| [padding] | <code>object</code> | padding options |
| [padding.left] | <code>string</code> | a string to pad the left of each cell (default: `' '`) |
| [padding.right] | <code>string</code> | a string to pad the right of each cell (default: `' '`) |


* * *

&copy; 2015-18 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).