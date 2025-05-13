const rowCount = 36;
const foodUnit = 100;
const timeUnit = 16.67;

function formatMinutes(totalMinutes) {
    totalMinutes = Math.floor(totalMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) {
        if (minutes > 0) {
            return `${hours}h${minutes}m`;
        }
        else {
            return `${hours}h`;
        }
    }
    else {
        return `${minutes}m`;
    }
}

function updateTable(selector, begin, end)
{
    const tbody = document.querySelector(selector);
    for (let i = begin; i <= end; i++) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        cell1.textContent = i * foodUnit;
        cell2.textContent = formatMinutes(i * timeUnit);

        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
    }
}

updateTable('#table-left tbody', 1, rowCount/2);
updateTable('#table-right tbody', rowCount/2+1, rowCount);
