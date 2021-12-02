db.settings.insertOne({ sheet_auto_generation: true, xxx: false, display_registre: true });
db.settings.insertOne({ display: true, xxx: false, display_registre: true });
db.settings.insertOne({ sheet_auto_generation: true, xxx: false, display_registre: true });

db.sheets.remove()


db.students.updateMany({ _id: { $ne: 10 } }, { $set: { identifiant: 'comptec' } })


db.students.insertOne({ nom: "Azo", prenoms: "Tiero", email: "azo@gmail.com", habitation: "marcory hlm", phone: "020502366", code_access: 'azo', identifiant: '' })

//File upload {}

let file = document.getElementById("file_chien");
let img_modification = document.getElementById("img_modification");
let image_info = document.getElementById("image-info")
console.log(file)
//console.log( file)
file.addEventListener("change", e => {
    let f = event.target.files[0];
    console.log(typeof f)
    let fType = f.type;

    let validextension = ["image/jpeg", "image/png", "image/jpg"];
    if (fType == validextension[0] || fType == validextension[1] || fType == validextension[2]) {
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            img_modification.src = e.target.result;
        }
        fileReader.readAsDataURL(f);
        image_info.innerHTML = "";
    } else {
        img_modification.src = "";
        file.value = "";
        image_info.innerHTML = "Ce fichier n' est pas un image  ";
        img_modification.src = "assets/solid_svg/exclamation-circle.svg"
    }
})