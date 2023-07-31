<div style="text-align:center">

![logo](docs/assets/logo_white.webp#gh-dark-mode-only)
![logo](docs/assets/logo.webp#gh-light-mode-only)

</div>


> An easy Way to Read and Write XLSX file.
>
> Simple version of by [read-excel-file](https://github.com/catamphetamine/read-excel-file) &copy; [Nikolay](https://github.com/catamphetamine) for reading XLSX file.<br/>
> Using [FileSaver.js](https://github.com/eligrey/FileSaver.js) &copy; [Eli Grey](https://github.com/eligrey) to automatically download the output file.

### NPM

```
npm i --save @wayfu/simple-xlsx
```

In your app.js import and initialized the module like normal.

```js
import XLSX from "@wayfu/simple-xlsx";
```

### Vanilla

If you wish to skip the modular build and NOT use npm you can use the vanilla build like so:

### CDN

```html
<script src="https://unpkg.com/@wayfu/simple-xlsx@latest/dist/index.min.js"></script>
```

## How to use it:
### Read File
From file input
```html
<input type="file" id="input" />

<script>
    let input = document.querySelector("#input");
    
    // File.
    input.addEventListener('change', () => {
        XLSX.read(input.files[0]).then((rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.
        });
    });
</script>
```
From Blob
```js
fetch('https://example.com/spreadsheet.xlsx')
  .then(response => response.blob())
  .then(blob => XLSX.read(blob))
  .then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
  });
```
From ArrayBuffer
```js
// ArrayBuffer.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
//
// Could be obtained from:
// * File
// * Blob
// * Base64 string
//
XLSX.read(arrayBuffer).then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.
})
```
Using Async/Await function
```js
async function readExcel(file){
    let sheetData = await XLSX.read(file);

    // `sheetData` is an array of rows
    // each row being an array of cells.
    // do something with `sheetData`.
}

readExcel(arrayBuffer);
```

### Write File
Write XLSX function will automatically download it via Browser. By Using `XLSX.write()` you can write an excel file from your data. For example.
```js
// The data it self can be 2 dimensional array data[row][column]

let data = [
    ['first-name', 'last-name'], // this is the first row
    ['John', 'Doe'] // this is the second row
];

// XLSX.write accept at least 2 parameter (can be 3).
// First parameter is the data it self
// Second parameter is the name of the file
// and Third parameter (optional) is the name of the sheet
XLSX.write(data, 'users');
// This output is create and downloading `users.xlsx` file
```

### Options
`XLSX.read()` also accept option as second parameter. The option parameter is an object. Here is the default option value.
```js
{
    sheet: 1,                   // sheet number/name (string|number)
    trim: false,                // Trim the value data or not (boolean)
    epoch1904: false,           // Is it epoch1904? (boolean)
    transformData: undefined,   // Function for transforming the data 
}
```
```js
// Usage
XLSX.read(arrayBuffer, { sheet: 2 })
    .then((rows) => {
        // `rows` is an array of rows from sheet 2
        // each row being an array of cells.
    })
```
## TypeScript

This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.

## License
Copyright &copy; 2023 [Wayfu](https://github.com/wayfu-id) under [ISC](LICENSE) License