import * as XLSX from 'xlsx';

function xlsxbulkar(ev){

  let workBook = null;
  this.jsonData = null;
  const reader = new FileReader();
  const file = ev.target.files[0];
  reader.onload = async (event) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
    this.jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      initial[name] = XLSX.utils.sheet_to_json(sheet);
      return initial;
    }, {});
    this.dataString = JSON.stringify(this.jsonData);
     this.appServiceProvider.console_log("Data:",this.jsonData.data);
    //  console.log("Data:",this.jsonData.data);
    //  console.log("DataArray:",this.dataArray);
     await this.jsonData.data.forEach((data,i)=>{ 
      // console.log("data",data);
       data.gstfullplate = Number(data.fullplate * this.gstValue) / 100;
       let name = data.itemname.toLowerCase();
       data.itemname = name;
       data['seq']=i;
     });

      console.log("Data to upload:",this.jsonData.data);
    //   this.jsonData.data.forEach(element => {
    //     console.log(element);
    //     this.pouchProvider.menulistBulk(element).then((doc=>{
    //     console.log(doc);
        
    //   })).catch(e=>console.log(e));
    //   });
    }
  reader.readAsBinaryString(file);
}

module.exports.xlsxbulkar = xlsxbulkar;