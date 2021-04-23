const KEYS={
    products:'products',
    productsId:'productId'
}





export function generateProductId(){
    if(localStorage.getItem(KEYS.productsId)==null){
        localStorage.setItem(KEYS.productsId,'0')
    }
    var id = parseInt(localStorage.getItem(KEYS.productsId))
    localStorage.setItem(KEYS.productsId,(++id).toString())
    return id;
}

export function getallProducts(){
    if(localStorage.getItem(KEYS.products)==null){
        localStorage.setItem(KEYS.products,JSON.stringify([]))
    }
    return JSON.parse(localStorage.getItem(KEYS.products));
}

export function insertProduct(data){
    let products = getallProducts();
    data['id'] = generateProductId();
    products.push(data);
    localStorage.setItem(KEYS.products,JSON.stringify(products))

}

export function deleteProduct(id){
    let products = getallProducts();
    products = products.filter(x=>x.id!=id);
    localStorage.setItem(KEYS.products,JSON.stringify(products))
}