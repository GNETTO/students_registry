db.settings.insertOne({ sheet_auto_generation: true, xxx: false, display_registre: true });


//File upload 

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