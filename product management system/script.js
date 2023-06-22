let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let moode = 'creat';
let tmp;

// total
function getotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = 'red'; 
    }
}



//  creat
let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}
    



    submit.onclick = function(){
        var newPro = {
            title: title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.value,
            count:count.value,
            category: category.value.toLowerCase(),
        }
//count
if(title.value != '' && count.value < 100){
    if(moode === 'Create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro); 
        }
    }else{
        dataPro[   tmp   ] = newPro;
        moode = 'Create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
}
//locale
        localStorage.setItem('product',    JSON.stringify(dataPro)   )
        clear()
        showData()
    }
  
    
//clear input
    function clear(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    }


//read
    function showData(){
        getotal()
        let table = '';
        for(let i = 1; i < dataPro.length;i++){
            table += `
        <tr>
            <td>${i}</td>  
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updatedata(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>
        `
        }
        document.getElementById('tbody').innerHTML = table;
        let btnDelete = document.getElementById('deleteAll');
        if(dataPro.length > 0){
            btnDelete.innerHTML = `
            <button onclick="deleteAll()">delete All (${dataPro.length})</button>
            `
        }else{
            btnDelete.innerHTML = '';
        }
    }
    showData()


//Delete
    function deletedata(i){
        dataPro.splice(i,1);
        localStorage.product = JSON.stringify(dataPro);
        showData();
    }


//Delete All
    function deleteAll(){
        localStorage.clear()
        dataPro.splice(0)
        showData();
    }


//update
    function updatedata(i){
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        getotal()
        count.style.display = 'none' ;
        category.value = dataPro[i].category;
        submit.innerHTML = 'Update';
        moode = 'Update';
        tmp = i;
        scroll({
            top:0,
            behavior:'smooth',
        })
        }


//searche
let searcheMoode = 'title';

function getSearcheMoode(id){
    let search = document.getElementById('search');
    if(id == 'SearchTitle'){
        searcheMoode = 'title';
    }else{
        searcheMoode = 'category';
    }
    search.placeholder = 'Search By '+searcheMoode;
    search.focus()
    search.value = '';
    showData()
}


function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searcheMoode == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
              table += `
                <tr>
                  <td>${i}</td>  
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick="updatedata(${i})" id="update">update</button></td>
                  <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
              `;
            }
        }else{
                if (dataPro[i].category.includes(value.toLowerCase())) {
                  table += `
                    <tr>
                      <td>${i}</td>  
                      <td>${dataPro[i].title}</td>
                      <td>${dataPro[i].price}</td>
                      <td>${dataPro[i].taxes}</td>
                      <td>${dataPro[i].ads}</td>
                      <td>${dataPro[i].discount}</td>
                      <td>${dataPro[i].total}</td>
                      <td>${dataPro[i].category}</td>
                      <td><button onclick="updatedata(${i})" id="update">update</button></td>
                      <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                    </tr>
                  `;
                }
              }
        }
    document.getElementById('tbody').innerHTML = table;
  }
  


