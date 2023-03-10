// calcula o preço final e coloca no html usando os ids;
const finalPrice = async () => {
  const cart = await document.getElementsByClassName('cart__item');
  let acc = 0;
  for (let i = 0; i < cart.length; i += 1) {
    acc += parseFloat(cart[i].id);
  }
  const price = await document.getElementsByClassName('total-price')[0];
  price.innerText = acc;
};

// coloca minhas seções na página;
const appendChild = (parent, child) => {
  const element = document.querySelector(parent);
  element.appendChild(child);
};
// remove um item do carrinho quando clica nele;
const cartItemClickListener = (event) => {
  event.target.parentElement.removeChild(event.target);
  finalPrice();
};

// cria um item pro carrinho;
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.id = salePrice;
  return li;
};

// função q pega as informações do item clicado, e cria um objeto com nome, id e preço;
const addCart = async (event) => {
  const item = event.target.parentElement.children[0].innerText;
  const response = await fetchItem(item);
  const object = {
    sku: response.id,
    name: response.title,
    salePrice: response.price,
  };
// coloca no carrinho;
  const cartItem = createCartItemElement(object);
  appendChild('.cart__items', cartItem);
  finalPrice();
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};
// adicionei uma possivel função ao elemento;
const createCustomElement = (element, className, innerText, func) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;

  // coloca um evento no botão q eu quiser; 
  e.onclick = func;
  return e;
};

/* const createCustomElementButton = (element, className, innerText, func) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  e.onclick = func;
  return e;
};
*/

const createProductItemElement = ({ sku, name, image, salePrice }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  // adicionei um span onde vai o preço do item, embaixo da imagem;
  section.appendChild(createCustomElement('span', 'item_price', `R$ ${salePrice}`));
  section.appendChild(createCustomElement('button',
    'item__add',
    'Adicionar ao carrinho!',
    addCart));
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// MINHAS FUNÇÕES;

// organiza os itens trazidos do json da API em sku, name, image, price;
const items = async () => {
  const response = await fetchProducts('computador');
  const result = response.map((item) => ({
    sku: item.id,
    name: item.title,
    image: item.thumbnail,
    salePrice: item.price,
  }));

  // createProductItemElement cria minhas seções e o appendChild coloca eles dentro da minha página;
  result.forEach((item) => {
    appendChild('.items', createProductItemElement(item));
  });
};

const emptyCart = () => {
  const cart = document.getElementById('cartList');
  cart.innerHTML = '';
  const price = document.getElementsByClassName('total-price');
  price[0].innerText = '';
};

const addEvent = () => {
  const emptyButton = document.getElementsByClassName('empty-cart');
  emptyButton[0].addEventListener('click', emptyCart);
};

window.onload = () => {
  items();
  addEvent();
};