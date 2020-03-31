function onOff(){
    document
    .querySelector("#modal")
    .classList
    .toggle("hide");

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

//fields são os campos do formulario
function checkFields(event){
    // console.log(event.target.title.value)
    // console.log(event.target["title"].value)

    const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]
    const isEmpty = valuesToCheck.find(function(value){
        const checkIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()
        if (checkIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty){
        event.preventDefault() //nao deixa enviar o formulario
        alert("Por favor, preencha todos os campos")

    }
    // for (let value of valuesToCheck){
    //     console.log(event.target[value].value)
    // }
}



