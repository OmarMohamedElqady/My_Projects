let tittle = document.getElementById('tittle')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood = 'create';
let tmp;

console.log(tittle, price, taxes, ads, discount, total, count, category, submit)


// get total    ==> اول function

function get_total(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result ;
        total.style.background ='#040'
    }else{
        total.innerHTML = '';
        total.style.background ='#a00d02';

    }
}

// create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
// let dataPro = [];

submit.onclick = function(){                //هتحفظ الداتا لما اضغط 
    let newPro = {                          //opject
        tittle:tittle.value.toLowerCase(),
        ads:ads.value,
        price:price.value,
        discount:discount.value,
        taxes:taxes.value,
        count:count.value,
        category:category.value.toLowerCase(),
        total:total.innerHTML
    }

    if(tittle.value !=''
    && price.value != ''
    && category.value != ''
    && newPro.count < 101){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0 ; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
            }else{
                dataPro[  tmp  ] = newPro;
                mood = 'create' ;
                submit.innerHTML = 'create';
                count.style.display = 'block' ;
            }
            clearData()
    }

    localStorage.setItem('product',JSON.stringify(dataPro) );
    console.log(dataPro);


    showData()

}

// save localstorage

// clear inputs
function clearData(){
    tittle.value='';
    ads.value = '';
    price.value ='';
    discount.value = '';
    taxes.value = '';
    count.value = '' ;
    category.value = '';
    total.innerHTML = '';
}


// read
function showData(){
    get_total();

    let table = '';
    for (let i = 0; i < dataPro.length; i++) {         //لو عندي array فيها عناصر دايما بعمل loop
        table += `

        <tr>
            <td>${i}</td>
            <td>${dataPro[i].tittle}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

        </tr>

        `
    }
    document.getElementById('tbody').innerHTML = table ;

    let btnDelete = document.getElementById('deleteAll');

    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
showData()              ////معناها بشغل ال function علطول 

// conut                ==> اعمل create لكذا منتج

//delete
function deleteData(i){
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0)
    showData()
}


//update

function updateData(i){
    tittle.value = dataPro[i].tittle;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro.category;

    get_total()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i ;
    scroll({                                //يلطلع بالسهم لوحده
        top : 0,
        behavior : 'smooth'                 //ببطأ
    })
}

//search

let searchMode = 'tittle' ;

function getSearchMood(id){

    let search = document.getElementById('search');

    if(id ==='SearchTitle'){
        searchMode = 'tittle';
        // search.placeholder = 'Search by tittle';
    }else{
        searchMode = 'category';
        // search.placeholder = 'Search by category';

    }

    search.placeholder = 'Search by '+searchMode;

    search.focus();
    search.value = '';
    showData();

}

function SearchData(value)
{
    let table = '';

    for(let i=0 ; i < dataPro.length ; i++){
    if(searchMode == 'tittle')
    {
            if(dataPro[i].tittle.includes(value.toLowerCase())){

                table += `

                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].tittle}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

                </tr>

                `
            }



}else{
        if(dataPro[i].category.includes(value.toLowerCase())){

            table += `

            <tr>
                <td>${i}</td>
                <td>${dataPro[i].tittle}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

            </tr>

            `
        }

    }


}
document.getElementById('tbody').innerHTML = table ;

}
//clean data

