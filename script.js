const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
// Adicionei um span onde vai o preço do item, embaixo da imagem;
  section.appendChild(createCustomElement('span', 'item_price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// MINHAS FUNÇÕES;

// Coloca minhas seções na página;
const appendChild = (parent, child) => {
  const element = document.querySelector(parent);
  element.appendChild(child);
};

// Organiza os itens trazidos do json da API em sku, name, image, price;
const items = async () => {
  const response = await fetchProducts('computador');
  const result = response.map((item) => ({ sku: item.id,
    name: item.title,
    image: item.thumbnail,
    price: item.price,
   }));

// createProductItemElement cria minhas seções e o appendChild coloca eles dentro da minha página;
  result.forEach((item) => {
    appendChild('.items', createProductItemElement(item));
  });
};

window.onload = () => {
  items();
};
