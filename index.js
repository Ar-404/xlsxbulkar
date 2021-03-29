var  XLSX = require('xlsx');
var workBook = null;
var jsonData = null;
var reader = new FileReader();
var file = null;
var data =null;

function xlsxbulkar(ev){

  console.log("get :",ev);
  file = ev.target.files[0];
  console.log("file :",file);
  reader.onload = async (event) => {
    data = reader.result;
    // console.log(data);
    workBook = XLSX.read(data, { type: 'binary' });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      let sheet = workBook.Sheets[name];
      console.log("sheet :",sheet);
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {});
    let dataString = JSON.stringify(jsonData);
     console.log("Data:",jsonData.Sheet1);
     console.log("DataArray:",dataString);

      jsonData.data.forEach(element => {
        console.log(element);
      });
    }
  reader.readAsBinaryString(file);
}

module.exports.xlsxbulkar = xlsxbulkar;