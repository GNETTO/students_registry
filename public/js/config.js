//alert('config js')

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
let tab = document.getElementById('config-table-body');


let helper = {};

helper.AjaxRequest = function (method, ajaxr, action, query) {

    return new Promise((resolve, reject) => {

        ajaxr.open(method, `${action}?${query}`);
        ajaxr.send(null);
        resolve(ajaxr)
    }
    )
}

helper.checkAjaxOject = function () {
    return new Promise((resolve, reject) => {
        let ajaxr;
        try {
            ajaxr = new XMLHttpRequest();
        } catch (e) {
            try {
                ajaxr = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (e) {
                try {
                    ajaxr = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (e) {
                    //alert("La connexion Ajax a échoué .")
                    reject(ajaxr);
                }
            }
        }
        resolve(ajaxr);

    })
}

function AjaxRequest(method, action, query, callback) {

    helper.checkAjaxOject().
        then(ajaxr => {

            ajaxr.onreadystatechange = function () {

                if (ajaxr.readyState == 4) {
                    callback(ajaxr)
                }
            }


            if (method == "GET") {
                ajaxr.open("GET", `${action}?${query}`);
                ajaxr.send(null);
            } else if (method == "POST") {

                ajaxr.open("POST", `${action}`, true);
                ajaxr.send(query);
            }

        }).
        catch(failure => {
            console.log(failure)
        })
}


/*AjaxRequest("GET", "/administration/congig_data", {}, ajaxr => {
    if (ajaxr.responseText) {
        console.log("Enregistrement reussie")
        //console.log(ajaxr.responseText)
        r = JSON.parse(ajaxr.responseText); console.log(typeof r['sheet_auto_generation'])
        let keys = Object.keys(r); //console.log(keys);
        keys.forEach((elt) => {
            tab.appendChild(
                Mydoc("tr", {}, {},
                    Mydoc('td', {}, {}, elt), Mydoc('td', {}, {}, r[elt])
                )
            )
            console.log(elt)
        })
    } else {
        alert("Echec d enregistrement");
        console.log(ajaxr.responseText);
    }
})*/
let all_config;

axios.get("/administration/config_data").then(response => {

    let configs = response.data;
    let keys = Object.keys(configs)

    keys.forEach((elt) => {
        if (elt != '_id') {
            tab.appendChild(
                Mydoc("tr", {}, {}, '', c => { },
                    Mydoc('td', {}, {}, '', c => { }, elt),
                    Mydoc('td', {}, {}, '', c => { },
                        Mydoc('input', { class: 'config-checkbox', type: 'checkbox', 'data-label': elt }, { onclick: checks }, configs[elt], (e, c) => { e.checked = c }, "")
                    )
                )
            )
        }
    })
}).catch(error => {

}).then(d => {
    console.log('request with axios sent')
    all_config = document.querySelectorAll(".config-checkbox");
})


function checks(e) {
    res = e.currentTarget;

}

function valide_config() {

    let updates = {};
    Array.prototype.map.call(all_config, element => {
        //console.log(element.checked)
        updates[element.getAttribute('data-label')] = element.checked;
        //formdata.append('exil', element.checked)
    })

    axios.post("/administration/config_data", updates).then(response => {

        console.log(response)
    }).catch(error => {

    }).then(d => {
        console.log('config validation succeeded')

    })
}
