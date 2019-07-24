
var tbody = document.getElementById("tbody_");

times = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];

for (i = 0; i < times.length; i++) {
    for (j = 0; j < 4; j++) {
        var tr = document.createElement("tr");
        if (j === 0) {
            var td = document.createElement("td");
            td.className = "hour";
            td.rowSpan = 4;

            var span = document.createElement("span");
            var text = document.createTextNode(times[i].toString() + ":00");
            span.appendChild(text);
            td.appendChild(span);
            tr.appendChild(td);
        }
        for (k = 0; k < 7; k++) {
            var td = document.createElement("td");

            var span = document.createElement("span");
            // var text = document.createTextNode(28*i + 7*j + k);
            var text = document.createTextNode(" ");
            span.appendChild(text);
            td.appendChild(span);
            tr.appendChild(td)
        }
        tbody.appendChild(tr);
    }
    
}

function range(start, end) {
    // Python-like range function
    return Array(end - start).fill().map((_, idx) => start + idx)
}

function timeToIndex(day, start_hour, start_min, end_hour, end_min) {
    
    var colIdx = 0;
    switch(day){
        case 'Monday': colIdx = 0; break;
        case 'Tuesday': colIdx = 1; break;
        case 'Wednesday': colIdx = 2; break;
        case 'Thursday': colIdx = 3; break;
        case 'Friday': colIdx = 4; break;
        case 'Saturday': colIdx = 5; break;
        case 'Sunday': colIdx = 6; break;
        default: colIdx = 0; break;
    }

    var rowIdxStart = 0;
    switch(start_hour){
        case '8': rowIdxStart = 0; break;
        case '9': rowIdxStart = 4; break;
        case '10': rowIdxStart = 8; break;
        case '11': rowIdxStart = 12; break;
        case '12': rowIdxStart = 16; break;
        case '1': rowIdxStart = 20; break;
        case '2': rowIdxStart = 24; break;
        case '3': rowIdxStart = 28; break;
        case '4': rowIdxStart = 32; break;
        case '5': rowIdxStart = 36; break;
        case '6': rowIdxStart = 40; break;
        case '7': rowIdxStart = 44; break;
        default: rowIdxStart = 0; break;
    }
    switch(start_min){
        case '00': rowIdxStart += 0; break;
        case '15': rowIdxStart += 1; break;
        case '30': rowIdxStart += 2; break;
        case '45': rowIdxStart += 3; break;
        default: rowIdxStart += 0; break;
    }
    var rowIdxEnd = 0;
    switch(end_hour){
        case '8': rowIdxEnd = 0; break;
        case '9': rowIdxEnd = 4; break;
        case '10': rowIdxEnd = 8; break;
        case '11': rowIdxEnd = 12; break;
        case '12': rowIdxEnd = 16; break;
        case '1': rowIdxEnd = 20; break;
        case '2': rowIdxEnd = 24; break;
        case '3': rowIdxEnd = 28; break;
        case '4': rowIdxEnd = 32; break;
        case '5': rowIdxEnd = 36; break;
        case '6': rowIdxEnd = 40; break;
        case '7': rowIdxEnd = 44; break;
        default: rowIdxEnd = 0; break;
    }
    switch(end_min){
        case '00': rowIdxEnd += 0; break;
        case '15': rowIdxEnd += 1; break;
        case '30': rowIdxEnd += 2; break;
        case '45': rowIdxEnd += 3; break;
        default: rowIdxEnd += 0; break;
    }

    rowRange = range(rowIdxStart, rowIdxEnd);
    if (rowRange === undefined || rowRange.length == 0) {
        rowRange = [rowIdxStart];
    }

    colRange = []
    for (row of rowRange) {
        colVal = colIdx;
        switch(row % 4) {
            case 1: colVal += 1; break;
            default: break;
        }
        colRange.push(colVal);
    }
    return [rowRange, colRange];
}

var tbody_children = tbody.childNodes;
var row_tr_count = 4*7 + 1;

for (i = 0; i < classList.length; i++) {
    currentClass = classList[i];
    times = currentClass['time'];
    for (time of times) {
        day = time['day'];
        start = time['start'];
        end = time['end'];

        start_info = start.split(':');
        start_hour = start_info[0];
        start_min = start_info[1];
        end_info = end.split(':');
        end_hour = end_info[0];
        end_min = end_info[1];

        tableData = timeToIndex(day, start_hour, start_min, end_hour, end_min);
        rowRange = tableData[0];
        colRange = tableData[1];

        for (j = 0; j < rowRange.length; j++){
            rowSlot = rowRange[j];
            colSlot = colRange[j];

            weekdays = tbody_children[rowSlot].childNodes;
            weekdays[colSlot].style.backgroundColor = currentClass['color'];
            if (j === 0) weekdays[colSlot].innerHTML = currentClass['class'];
            if (j === 1) weekdays[colSlot].innerHTML = currentClass['name'];
        }
    }
    
}