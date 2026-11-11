import './scss/styles.scss';

import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/base/Models/ProductCatalog';
import { Cart } from './components/base/Models/Cart';
import { Buyer } from './components/base/Models/Buyer';
import { TPayment } from './types/index';
import { Api } from './components/base/Api';
import { LarekApi } from './components/base/Models/LarekApi';
import { API_URL } from './utils/constants';

// 1. Проверка класса ProductCatalog

const productsModel = new ProductCatalog();

console.log('ProductCatalog');

// Проверяем setProducts и getProducts
productsModel.setProducts(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getProducts());

// Проверяем getProduct - получаем товар по id
const firstProductId = apiProducts.items[0].id;
console.log(`Товар с id "${firstProductId}":`, productsModel.getProduct(firstProductId));

// Проверяем getProduct - случай, когда товара нет
console.log('Товар с несуществующим id:', productsModel.getProduct('non-existent-id'));

// Проверяем setSelectedProduct и getSelectedProduct
const selectedProduct = apiProducts.items[1];
productsModel.setSelectedProduct(selectedProduct);
console.log('Выбранный для подробного отображения товар:', productsModel.getSelectedProduct());

// 2. Проверка класса Cart

console.log('\nCart');

const cartModel = new Cart();

// Проверяем addItem и getItems
const product1 = apiProducts.items[0];
const product2 = apiProducts.items[1];
const product3 = apiProducts.items[2];

cartModel.addItem(product1);
cartModel.addItem(product2);
cartModel.addItem(product3);
console.log('Товары в корзине после добавления 3 штук:', cartModel.getItems());

// Проверяем getCount
console.log('Количество товаров в корзине:', cartModel.getCount());

// Проверяем getTotal
console.log('Общая стоимость товаров в корзине:', cartModel.getTotal());

// Проверяем hasItem
console.log(`Есть ли товар "${product1.title}" в корзине:`, cartModel.hasItem(product1.id));
console.log('Есть ли несуществующий товар в корзине:', cartModel.hasItem('non-existent-id'));

// Проверяем removeItem
cartModel.removeItem(product2);
console.log('Товары в корзине после удаления второго:', cartModel.getItems());
console.log('Количество товаров после удаления:', cartModel.getCount());
console.log('Общая стоимость после удаления:', cartModel.getTotal());

// Проверяем clearCart
cartModel.clearCart();
console.log('Товары в корзине после очистки:', cartModel.getItems());
console.log('Количество товаров после очистки:', cartModel.getCount());

// 3. Проверка класса Buyer

console.log('\nBuyer ');

const buyerModel = new Buyer();

// Проверяем валидацию пустых полей
console.log('Валидация пустых полей:', buyerModel.validate());

// Проверяем сеттеры - заполняем поля по одному
buyerModel.setPayment('card' as TPayment);
buyerModel.setEmail('vladmccain@yandex.ru');
console.log('Данные после заполнения payment и email:', buyerModel.getOrderData());
console.log('Валидация после частичного заполнения:', buyerModel.validate());

buyerModel.setPhone('+7 (999) 755-62-43');
buyerModel.setAddress('г. Орёл, ул. Алроса, д. 5');
console.log('Данные после полного заполнения:', buyerModel.getOrderData());
console.log('Валидация после полного заполнения:', buyerModel.validate());

// Проверяем getOrderData
console.log('Итоговый объект данных покупателя:', buyerModel.getOrderData());

// Проверяем clearBuyer
buyerModel.clearBuyer();
console.log('Данные после очистки:', buyerModel.getOrderData());
console.log('Валидация после очистки:', buyerModel.validate());

// 4. Проверка работы с сервером

console.log('\nРабота с сервером');

// Создаём базовый HTTP-клиент без авторизации
const api = new Api(API_URL);

// Создаём специализированный API для «Веб-ларёк»
const larekApi = new LarekApi(api);

// Получаем товары с сервера
larekApi.getProducts()
  .then((data) => {
    console.log('Ответ от сервера:', data);
    
    // Берём массив товаров из полученного объекта
    const productsFromServer = data.items;
    console.log('Массив товаров из ответа сервера:', productsFromServer);
    
    // Сохраняем массив товаров в модели данных каталога
    productsModel.setProducts(productsFromServer);
    
    // Выводим сохранённый каталог из модели в консоль
    console.log('Каталог, сохранённый в модели ProductCatalog:', productsModel.getProducts());
  })
  .catch((err) => {
    console.error('Ошибка при получении товаров с сервера:', err);
  });