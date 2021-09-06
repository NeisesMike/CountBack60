function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('Count Forward 60 Days')
        .addItem('Students EC-5', 'CountEC5')
        .addItem('Students 5-12', 'Count512')
        .addToUi();
  }
  function CountEC5()
  {
    CallIntoTS(true);
  }
  function Count512()
  {
    CallIntoTS(false);
  }
  function CallIntoTS(isEC5)
  {
    let inputDate = SpreadsheetApp.getActiveSheet().getActiveCell().getValue();
    try
    {
      let test = inputDate.getUTCMonth();
    }
    catch(error)
    {
      SpreadsheetApp.getUi().alert("Count60 Failed. The selected cell was not a valid date.");
      return;
    }
    let month = inputDate.getUTCMonth() + 1;
    let myday = inputDate.getUTCDate();
    let year = inputDate.getUTCFullYear();
    let myDate = month + "/" + myday + "/" + year;
    function AddThisData(inputCalendar, row)
    {
      var out =
      {
        date : inputCalendar.sheets[0].data[0].rowData[row].values[0].formattedValue,
        type : inputCalendar.sheets[0].data[0].rowData[row].values[1].formattedValue
      }
      return out;
    }
    var calendarData = [];
    var sheet1 = year-1 + '-' + (year);
    var sheet2 = year + '-' + (year+1);
    var args1 = {
    ranges: sheet1+'!A1:B365',
    includeGridData: true
    };
    var args2 = {
    ranges: sheet2+'!A1:B365',
    includeGridData: true
    };
    let warnings = "";
    try
    {
      let calendar1 = Sheets.Spreadsheets.get("1fbcCe5pxiVzUnUYdWVLGSbi65A6fgf_o2A-xETki0Xk",args1);
      for(let row=0; row<365; row++)
      {
        calendarData.push(AddThisData(calendar1, row));
      }
    }
    catch(error)
    {
      warnings += "Calendar missing: " + sheet1 + "\n";
    }
    try
    {
      let calendar2 = Sheets.Spreadsheets.get("1fbcCe5pxiVzUnUYdWVLGSbi65A6fgf_o2A-xETki0Xk",args2);
      for(let row=0; row<365; row++)
      {
        calendarData.push(AddThisData(calendar2, row));
      }
    }
    catch(error)
    {
      warnings += "Calendar missing: " + sheet2 + "\n";
    }
    let result = entry(calendarData, myDate, isEC5);
    if(result.msg!=null)
    {
      let errorMsg = "Count60 Error: Failed on Date: " + myDate + "\n";
      SpreadsheetApp.getUi().alert(errorMsg + result.msg + warnings);
      return;
    }
    SpreadsheetApp.getActiveSheet().getActiveCell().setValue(result);
  }
  