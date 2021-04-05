var  XLSX = require('xlsx');
var workBook = null;
var jsonData = null;
var reader = new FileReader();
var file = null;
var data =null;

function xlsxbulkar(ev){
  return new Promise((resolve, reject)=>{
  file = ev.target.files[0];
  console.log("file :",file);
  reader.onload = async (event) => {
    data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      let sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {});
    resolve(jsonData.data);
    }
  reader.readAsBinaryString(file);
  })
}

module.exports.xlsxbulkar = xlsxbulkar;