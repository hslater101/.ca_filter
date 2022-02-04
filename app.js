let my_form = document.querySelector("#csv-form");
let csv_file = document.querySelector("#csv-input");
let filtered_data = [];
let filtered_emails = [];
let canada_data = [];
let canada_emails = [];
let canada_emails_and_ids = [];
let canada_ids = [];
let canada_obj = {}
let csv_content = [];
let filtered_ids = [];
let filtered_emails_and_ids = [];
let filtered_obj = {};
my_form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csv_file.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    const data = csv_to_array(text);

    console.log("data is inputted!");
    for (let i = 0; i < data.length; i++) {
      if (!data[i]["Recips.Address"].endsWith(".ca")) {
        filtered_data.push(data[i]);
        filtered_ids.push(data[i]['Recips.RecipID']);
        filtered_emails.push(data[i]["Recips.Address"]);
      } else {
        canada_data.push(data[i]);
        canada_ids.push(data[i]['Recips.RecipID']);
        canada_emails.push(data[i]["Recips.Address"]);
      }
    }
      for (let i = 0; i < filtered_emails.length; i++) {
          filtered_obj = {'id': filtered_ids[i], 'email': filtered_emails[i]};
          filtered_emails_and_ids.push(filtered_obj);

      }
      for (let i = 0; i < canada_emails.length; i++) {
        canada_obj = {'id': canada_ids[i], 'email': canada_emails[i]};
        canada_emails_and_ids.push(canada_obj);

    }

    console.log(`Original File Length: ${data.length}`);
    console.log(`Filtered File Length: ${filtered_emails.length}`);
    console.log(`Canada-based Emails Removed: ${canada_emails.length}`);
  
 
    csv_content += canada_emails.join(',', '\n');  
    csv_content += "\n";  
    let hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv_content);  
    hiddenElement.target = '_blank';  
    hiddenElement.download = 'Canada Emails.csv';  
    hiddenElement.click();  
  };
    
  reader.readAsText(input);
});
function csv_to_array(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  return arr;
}
