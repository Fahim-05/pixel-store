
let phoneData;
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        phoneData = data;
        // console.log(phoneData);
        displayData(data)
    });

// const phoneDatas = async() =>{
//     const res = await fetch('data.json');
//     const data = await res.json();
//     displayData(data);
// };
// phoneDatas();




function displayData(data) {
    const cardContainer = document.getElementById('homepage-content');

    data.forEach((element) => {
        // console.log(element);
        const { img, price, name, id } = element;
        const divContainer = document.createElement('div');
        divContainer.classList.add('card', 'bg-base-100', 'shadow-2xl', 'shadow-zinc-900');
        divContainer.innerHTML = `
            <div class=" ">
                    <div class="p-6">
                        <figure><img src="${img}" class="rounded-xl w-full h-[350px]" alt="Shoes" /></figure>
                    </div>
                    <div class="card-body ">
                        <div id="parent-name-icon-container" class="flex justify-between ">
                            <h2 class="card-title">${name}</h2>
                            <div>
                                <span><i class="fa-regular fa-heart mr-4 text-blue-600"></i></span>
                                <span><i class="fa-regular fa-square-minus text-red-500"></i></span>
                            </div>
                        </div>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <p class="font-bold text-xl">Price: $${price}</p>
                        <div class="card-actions justify-between">
                            <label onclick="handleModal('${id}')" for="my-modal-3" class="btn btn-outline btn-accent"><i class=" fa-solid fa-circle-info
                                mr-2"></i>Details</label>
                            <!-- <button class="btn btn-outline btn-accent""><i class=" fa-solid fa-circle-info
                                mr-2"></i>Details</button> -->
                            <button onclick="handleBuyNow('${id}')" class="btn btn-outline btn-error"><i class="fa-solid fa-bag-shopping mr-2"></i>Buy
                                Now</button>
                        </div>
                    </div>
                </div>
            `;

        cardContainer.appendChild(divContainer);
    })
}


//--------------------- modal handle----------------------------
function handleModal(id) {

    const product = phoneData.find((item) => item.id === id);
    console.log(product);
    const { img, name, price } = product;

    const modalContainer = document.getElementById('modal-info');
    modalContainer.innerHTML = `
    <div class="py-4 flex flex-col gap-3">
                    <img src="${img}" class="rounded-2xl" alt="">
                    <h1 class="text-2xl font-bold"><span class="text-cyan-600">Product:</span> ${name}</h1>
                    <p class="text-lg text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                        similique, esse dicta doloribus quo veniam accusamus labore deserunt provident facilis consequatur
                        minus beatae sunt ullam, nihil cumque laudantium nesciunt praesentium!</p>
                    <h3 class="text-cyan-600 text-2xl font-bold">Features:</h3>
                    <p class="text-gray-400 text-lg">Features-1, Features-2, Features-3, Features-4</p>
                    <h1 class="text-2xl font-bold"><span class="text-cyan-600">Price:</span> $${price}</h1>
                </div>
    `;

}


//-------------------------------------- buy handle---------------------------
let count = 0;
let newPrice = 0;
let tax = 0;
let totalPrice = 0;
function handleBuyNow(id) {
    // count++
    count = count+1;
    const product = phoneData.find((item) => item.id === id);
    // console.log(id);
    const { img, name, price } = product;
    newPrice = newPrice+ price;
    tax = newPrice * 0.12;
    totalPrice = tax + newPrice;

    

    const cartContainer = document.getElementById('cart-items-container');
    const div = document.createElement('div');
    div.classList.add('flex', 'flex-col', 'gap-2', 'mb-2');
    div.innerHTML = `
    <div class="">
                        <div class="border-2 border-gray-300 rounded-lg p-2 flex justify-between items-center">
                            <img src="${img}" class="w-[20%]" alt="">
                            <p>${name}</p>
                            <p class="border-2 border-green-500 rounded py-0 px-3 text-center">1</p>
                            <span><i onclick="productDelete('${id}')" class="fa-solid fa-trash text-red-500"></i></span>
    
                        </div>
                    </div>
    `;
    cartContainer.appendChild(div);

    document.getElementById('badge-count').innerText=count;
    document.getElementById('product-count').innerText=count;
    document.getElementById('price').innerText=newPrice.toFixed(2);
    document.getElementById('tax-count').innerText=tax.toFixed(2);
    document.getElementById('total-price').innerText=totalPrice.toFixed(2);


}

function handleClear(){
    document.getElementById('cart-items-container').innerHTML = '';
    document.getElementById('badge-count').innerText='0';
    document.getElementById('product-count').innerText='0';
    document.getElementById('price').innerText='0';
    document.getElementById('tax-count').innerText='0';
    document.getElementById('total-price').innerText='0';

}


function productDelete(id){

    const product = phoneData.filter((item) => item.id !== id);
    // console.log(product);
}