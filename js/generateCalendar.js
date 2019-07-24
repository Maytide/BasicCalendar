
var tbody = document.getElementById("tbody_");

times = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

for (i = 0; i < times.length; i++) {
    
    for (j = 0; j < 4; j++) {
        var tr = document.createElement("tr");
        if (j === 0) {
            var td = document.createElement("td");
            td.className = "hour"
            td.rowSpan = 4
            var span = document.createElement("span");
            var text = document.createTextNode(times[i].toString() + ":00");
            span.appendChild(text)
            td.appendChild(span)
            tr.appendChild(td)
        }
        for (k = 0; k < 7; k++) {
            var td = document.createElement("td");
            tr.appendChild(td)
        }
        tbody.appendChild(tr);
    }
}