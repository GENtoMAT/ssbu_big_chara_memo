//doDebugはGAS上のデバッグで使用
function doDebug() {
  const e = {
    parameter: {
      sheetNAME: "踏み台シート",
      data: "マリオ",
    },
  }
  const res = doGet(e)
  console.log("res is")
  //console.log(JSON.parse(res)); //JSON文字列をJSONオブジェクトにする
  //ココのJSON.parseが正常に表示されない。恐らく特殊文字の混入と予想されるが未解決。
  //ただし、ローカルWebサーバー上のJavascriptだと正常に表示される。GAS上のみ発生。
}

//WebアプリのGetメソッドは最初にdoGet()にアクセスする仕様
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let result = []
  let dataObj = []
  try {
    const reqParam = e.parameter
    const sheet = ss.getSheetByName(reqParam.sheetNAME) //シート"踏み台シート"を指定

    //キャラ名をセット
    const charaNAME = reqParam.data
    const range_nameset = sheet.getRange("B1") //書き込み先の範囲
    range_nameset.setValue(charaNAME) // 引数の値をセルに入力
    const range_memo = sheet.getRange("A2:A59")
    dataObj = range_memo.getValues()
  } catch (e) {
    dataObj.push(e)
  } finally {
    result = ContentService.createTextOutput() //GASデータ返しする際の定型文
    result.setMimeType(ContentService.MimeType.JSON)
    result.setContent(JSON.stringify(dataObj.flat()))
    return result
  }
}
