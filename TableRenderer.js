/**
 * 表格渲染器
 * @param {string} dataString 數據字符串
 * @param {string} rowSepararator 行分隔符
 * @param {string} columnSeparator 列分隔符
 * @param {string[]} columnNames 欄位標題數組
 * @param {number} pageSize 單頁大小
 */
function TableRenderer(dataString, rowSepararator, columnSeparator, columnNames, pageSize) {
    if (!dataString || dataString.trim() == "") {
        throw new Error("DataString can't be empty");
    }
    if (!rowSepararator || rowSepararator.trim() == "") {
        throw new Error("RowSeparator can't be empty");
    }
    if (!columnSeparator || columnSeparator.trim() == "") {
        throw new Error("ColumnSeparator can't be empty");
    }
    if (!columnNames || !Array.isArray(columnNames) || columnNames.length < 1) {
        throw new Error("ColumnNames can't be empty");
    }
    if (!pageSize) {
        pageSize = 10;
    } else if (pageSize && !Number.isInteger(pageSize)) {
        throw new Error("PageSize can only be number");
    }
    this.pageSize = pageSize;
    this.dataString = dataString;
    this.rowSepararator = rowSepararator;
    this.columnSeparator = columnSeparator;
    this.columnNames = columnNames;
    this.currentPageIndex = 1;
}

/**
 * 將數據字符串轉換爲方便操作的二位字符串數組
 * @returns 方便操作的二位字符串數組
 */
TableRenderer.prototype.toTable = function () {
    let columns = this.dataString.split(this.columnSeparator);
    let rowCount = 0;
    let columnCount = columns.length;
    let rowData = [];
    for (let column of columns) {
        let items = column.split(this.rowSepararator);
        rowCount = items.length;
        rowData.push(items);
    }
    let a = []
    for (let rowIndex = 0; rowIndex < rowCount - 1; rowIndex++) {
        let record = [];
        for (let columIndex = 0; columIndex < columnCount; columIndex++) {
            record.push(rowData[columIndex][rowIndex]);
        }
        a.push(record);
    }
    return a;
}

/**
 * 創建表格頭部
 * @param {{name:string,fn:()=>{}}} operations 操作選項
 * @returns 表格頭部元素
 */
TableRenderer.prototype.renderTableHeader = function (operations) {
    let headElement = document.createElement("thead");
    headElement.style.backgroundColor = "#2177C7";
    headElement.style.color = "#fff";
    let trElement = document.createElement("tr");
    let thElement = document.createElement("th");
    thElement.innerHTML = "#";
    trElement.appendChild(thElement);

    for (let columnName of this.columnNames) {
        let thElement = document.createElement("th");
        thElement.innerHTML = columnName;
        thElement.style.border = "1px #ddd solid";
        thElement.style.padding = "0 1px";
        trElement.appendChild(thElement);
    }
    headElement.appendChild(trElement);
    if (operations) {
        let thElement = document.createElement("th");
        thElement.innerHTML = "操作";
        thElement.style.border = "1px #ddd solid";
        thElement.style.padding = "0 1px";
        trElement.appendChild(thElement);
    }
    return headElement;
}

/**
 * 渲染表格正文
 * @param {OperatorOption[]} operations 操作選項
 * @returns 表格正文元素
 */
TableRenderer.prototype.renderTableBody = function (operations) {
    let tableData = this.toTable(this.dataString, this.rowSepararator, this.columnSeparator);
    let bodyElement = document.createElement("tbody");
    let index = 1;
    for (let rowData of tableData) {
        let trElement = document.createElement("tr");
        let indexTdElement = document.createElement("td");
        indexTdElement.innerHTML = index++;
        trElement.appendChild(indexTdElement);
        trElement.style.transition = "all 0.5s ease";

        for (let columnData of rowData) {
            let tdElement = document.createElement("td");
            tdElement.innerHTML = columnData;
            trElement.appendChild(tdElement);
        }
        if (operations) {
            let tdElement = document.createElement("td");
            for (let operation of operations) {
                if (!(operation instanceof OperatorOption)) {
                    throw new Error("Operation must be instance of OperationOption");
                }
                let btn = document.createElement("button");
                btn.style.outline = "none";
                btn.style.cursor = "pointer";
                btn.style.border = "none";
                btn.style.borderRadius = "5px";
                btn.style.margin = "2px";
                btn.type = "button";
                btn.style.minWidth = "50px";
                btn.style.height = "30px";
                btn.style.backgroundColor = "#fff";
                btn.innerHTML = operation.name;
                btn.addEventListener("click", () => operation.callback(rowData));
                tdElement.appendChild(btn);
            }
            trElement.appendChild(tdElement);
        }
        bodyElement.appendChild(trElement);
    }
    return bodyElement;
}

/**
 * 
 * @param {string} tableParentSelector 表格父容器css選擇器
  * @param {{name:string,fn:()=>{}}} operations 操作選項
 */
TableRenderer.prototype.render = function (tableParentSelector, operations) {
    let tableElementParent = document.querySelector(tableParentSelector);
    let tableElement = document.createElement("table");
    tableElement.style.width = "100%";
    tableElement.style.textAlign = "center";
    tableElement.style.borderCollapse = "collapse";
    let headElement = this.renderTableHeader(operations);
    let bodyElement = this.renderTableBody(operations);
    tableElement.appendChild(headElement);
    tableElement.appendChild(bodyElement);
    tableElementParent.appendChild(tableElement);
}

/**
 * 操作的回調方法
 * @param {string[]} rowItems 對象數組
 */
function Callback(rowItems) {

}

/**
 * 配置
 * @param {string} name 操作器標題
 * @param {Callback} callback 回調方法
 */
function OperatorOption(name, callback) {
    if (typeof name != "string" || name.trim() == "") {
        throw new Error("Operator name must be non-empty string");
    }
    if (typeof callback != "function") {
        throw new Error("Operator callback must be string");
    }
    this.name = name;
    this.callback = callback;
}


