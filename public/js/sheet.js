
let Mydoc = function (tag, properties, methods, checked, action, ...childrens) {
    properties = properties || {};

    let doc = document.createElement(tag);
    let props = Object.keys(properties); //console.log(props);
    for (let prop of props) {
        doc.setAttribute(prop, properties[prop]);
    }

    //console.log(childrens.length);
    if (methods) Object.assign(doc, methods);

    for (let child of childrens) {

        if (typeof child == "string" || typeof child == "number" || typeof child == "null") {
            doc.appendChild(document.createTextNode(childrens))
        } else {
            doc.appendChild(child);
        }
    }
    action(doc, checked);
    return doc;
}

let tab = document.getElementById('tab-list-emargement');

let row_sheet = document.querySelectorAll('.row-sheet');

Array.prototype.map.call(row_sheet, tr => {
    tr.addEventListener('click', event => {
        //console.log(event.currentTarget)
        s = {};
        s.sheet = event.currentTarget.getAttribute('data-idsheet');

        axios.post("/administration/registre/presence", s,).then(response => {
            console.log(response)
            tab.innerHTML = "";
            let list = Array.from(response.data);

            console.log(response.data)
            for (let val of list) {
                console.log(typeof val)
                tab.appendChild(
                    Mydoc("tr", {}, {}, false, (c, e) => { },
                        Mydoc("td", {}, {}, false, (c, e) => { }, val.student.nom + " " + val.student.prenoms),
                        Mydoc("td", {}, {}, false, (c, e) => { }, val.ha),
                        Mydoc("td", {}, {}, false, (c, e) => { }, val.hd)

                    )
                )
            }
        }).catch(error => {

        }).then(d => {
            console.log('config validation succeeded axios')

        })
    }, true)
})

//click the first sheet
row_sheet[0].click();



