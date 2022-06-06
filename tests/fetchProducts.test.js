require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1 - Verificar se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('2 - Ao chamar a função fetchProducts com o argumento "computador", teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('4 - Ao chamar a função fetchProducts com o argumento "computador", o retorno da função é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const response =  await fetchProducts('computador');
    expect(response).toStrictEqual(computadorSearch.results);
  });

  it('5 - Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem:"You must provide an url"', async () => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  });
});
