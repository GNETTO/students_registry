

setInterval(() => {
    let h = (new Date()).getHours()
    let m = (new Date()).getMinutes();
    let s = (new Date()).getSeconds();
    h = h.toString();
    if (h.length == 1) {
        h = "0" + h
    }
    m = m.toString();
    if (m.length == 1) {
        m = "0" + m
    }

    s = s.toString();
    if (s.length == 1) {
        s = "0" + s
    }
    document.getElementById("h-arrive").innerHTML = `${h} : ${m} : ${s}`
}, 1000);
