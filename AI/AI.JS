const api = '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';
const inp = document.getElementById('inp');
const images = document.querySelector('.images');


const getImages = async() => {

    // make a requist to openai api 

    const methods = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${api}`
        },
        body:JSON.stringify(
            {
                "prompt":inp.value,
                "n":3,                    //عدد الصور ال هتطلع 
                "size":"256x256"
            }
        )


    }
    const res = await fetch("https://api.openai.com/v1/images/generations", methods)
    // parse the Response as json
    const data = await res.json()
    const listImages = data.data;
    // console.log(data)
    listImages.map(photo => {
        const container = document.createElement("div")
        images.append(container)
        const img =  document.createElement("img")
        container.append(img)
        img.src = photo.url



    })

}
















