function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TrafficLights");
    const data = JSON.parse(e.postData.contents);
  
    for (let i = 0; i < data.length; i++) {
      const light = data[i];
      const row = light.id + 1; 
      sheet.getRange(row, 4).setValue(light.isActive);
    }
  
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  