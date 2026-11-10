const HEADERS = ['受信日時', '名前', 'メールアドレス', '現所属', '生年月日', '電話番号', 'その他・備考', '受付ID'];

function setup() {
  const properties = PropertiesService.getScriptProperties();
  let id = properties.getProperty('SPREADSHEET_ID');
  if (!id) {
    const book = SpreadsheetApp.create('BAMP! エントリー回答');
    book.setSpreadsheetTimeZone('Asia/Tokyo');
    book.setSpreadsheetLocale('ja_JP');
    const sheet = book.getSheets()[0].setName('回答');
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#eeeeee');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidths(2, 1, 160);
    sheet.setColumnWidth(3, 250);
    sheet.setColumnWidth(4, 240);
    sheet.setColumnWidths(5, 2, 150);
    sheet.setColumnWidth(7, 400);
    sheet.setColumnWidth(8, 300);
    sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length).createFilter();
    id = book.getId();
    properties.setProperty('SPREADSHEET_ID', id);
  }
  console.log('https://docs.google.com/spreadsheets/d/' + id + '/edit');
}

function parseSubmission(body) {
  const data = JSON.parse(body).form_data;
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid payload');
  const fields = ['名前', 'email', '現所属', '生年月日', '電話番号', 'その他・備考', '受付ID'];
  const values = fields.map((key, index) => {
    const value = data[key] == null ? '' : data[key];
    if (typeof value !== 'string' || value.length > (index === 5 ? 5000 : 254)) throw new Error('Invalid field');
    return value.trim();
  });
  if (values.slice(0, 4).some(value => !value)) throw new Error('Missing field');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[1])) throw new Error('Invalid email');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(values[6])) throw new Error('Invalid receipt ID');
  const match = /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/.exec(values[3]);
  if (!match) throw new Error('Invalid birthday');
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  if (year < 1000 || date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day || date > new Date()) throw new Error('Invalid birthday');
  return values;
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    if (!event || !event.postData || event.postData.contents.length > 24000) throw new Error('Invalid request');
    const values = parseSubmission(event.postData.contents);
    lock.waitLock(20000);
    const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!id) throw new Error('Not configured');
    const sheet = SpreadsheetApp.openById(id).getSheetByName('回答');
    const last = sheet.getLastRow();
    const receiptId = values[6];
    if (last > 1 && sheet.getRange(2, 8, last - 1, 1).createTextFinder(receiptId).matchEntireCell(true).findNext()) {
      return jsonOutput({ok: true, duplicate: true});
    }
    const safeValues = values.map(value => /^[=+\-@\t\r]/.test(value) ? "'" + value : value);
    const row = last + 1;
    if (row > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 1000);
    sheet.getRange(row, 2, 1, 7).setNumberFormat('@');
    sheet.getRange(row, 1).setNumberFormat('yyyy/mm/dd hh:mm:ss');
    sheet.getRange(row, 1, 1, 8).setValues([[new Date(), ...safeValues]]);
    sheet.getRange(row, 1, 1, 8).setVerticalAlignment('top').setWrap(true);
    SpreadsheetApp.flush();
    return jsonOutput({ok: true});
  } catch (error) {
    console.error('Entry webhook failed: ' + error.message);
    return jsonOutput({ok: false});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function jsonOutput(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
