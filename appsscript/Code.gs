function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const getSheetRows = (sheetName) => {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return [];
    const [headers, ...rows] = sheet.getDataRange().getValues();
    
    return rows
      .filter(row => row.some(cell => cell !== "" && cell !== null)) // Strip empty rows
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => { if (h !== "") obj[h] = row[i]; });
        return obj;
      });
  };

  const result = {
    c: {},
    attrib_c: {},
    skills_c: {},
    cbw_c: {},
    e_h_c: {},
    weapons_c: {},
    armor_c: {},
    gear_c: {},
    dictionary: {},
    mods: []
  };

  getSheetRows("c").forEach(row => {
    if (row.character_id !== undefined && row.character_id !== "") {
      result.c[row.character_id] = row;
    }
  });

  const relationalTabs = ["attrib_c","skills_c", "cbw_c", "e_h_c", "weapons_c", "armor_c", "gear_c"];
  relationalTabs.forEach(tab => {
    getSheetRows(tab).forEach(row => {
      const id = row.character_id;
      if (id !== undefined && id !== "") {
        if (!result[tab][id]) result[tab][id] = [];
        result[tab][id].push(row);
      }
    });
  });

  result.mods = getSheetRows("mods");

  getSheetRows("dictionary").forEach(row => {
    if (row.source_id) {
      const key = String(row.source_id).trim().toLowerCase();
      result.dictionary[key] = {
        source_type: row.source_type || "",
        source_id: row.source_id,
        sourcebook: row.sourcebook || "",
        page: row.page !== "" && row.page !== null ? Number(row.page) : null,
        description: row.description || "",
        dimension_1: row.dimension_1 || null, // Linked Attr / Requirements / Severity
        metric_1: row.metric_1 !== "" && row.metric_1 !== null ? Number(row.metric_1) : null, // Price
        metric_2: row.metric_2 !== "" && row.metric_2 !== null ? Number(row.metric_2) : null  // Strain
      };
    }
  });

  const template = HtmlService.createTemplateFromFile('index');
  template.result = result;
  return template.evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}