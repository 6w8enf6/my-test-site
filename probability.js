function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : null;
}

function calculateProbability() {
    let formulaParts = [];
    let probability = 1.0;
    let factorCounts = {};

    function addFactor(factor) {
    probability *= factor;
    factorCounts[factor] = (factorCounts[factor] || 0) + 1;
    }

    // 性別
    if (getRadioValue("gender") === "指定あり") {
    addFactor(0.5);
    }

    // ステータス1〜7
    for (let i = 1; i <= 7; i++) {
    const value = getRadioValue(`status${i}`);
    if (value === "低") addFactor(0.45);
    else if (value === "高") addFactor(0.55);
    }

    // カラー1〜6
    for (let i = 1; i <= 6; i++) {
    const value = getRadioValue(`color${i}`);
    if (value === "指定あり") addFactor(0.5);
    }

    // 数式を構築
    for (const [factor, count] of Object.entries(factorCounts)) {
    if (count === 1) {
        formulaParts.push(`${factor}`);
    } else {
        formulaParts.push(`${factor}^${count}`);
    }
    }

    const formula = formulaParts.join(" * ") + ` = ${probability.toFixed(4)} (${(probability * 100).toFixed(2)}%)`;
    document.getElementById("formula").textContent = `${formula}`;

    // 確率表の更新
    const targets = [0.10, 0.25, 0.33, 0.50, 0.60, 0.70, 0.80, 0.90, 0.95];
    const tbody = document.querySelector("#probTable tbody");
    tbody.innerHTML = "";

    targets.forEach(target => {
    let n = 1;
    while (1 - Math.pow(1 - probability, n) < target) {
        n++;
        if (n > 1000000) break;
    }

    const row = document.createElement("tr");
    const cellTarget = document.createElement("td");
    cellTarget.textContent = `${Math.round(target * 100)}%`;

    const cellTries = document.createElement("td");
    cellTries.textContent = `${n} 回`;

    row.appendChild(cellTarget);
    row.appendChild(cellTries);
    tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    calculateProbability();
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
    radio.addEventListener("change", calculateProbability);
    });
});