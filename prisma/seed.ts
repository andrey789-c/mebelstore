import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Данные для категорий
const categories = [
  {
    id: 1,
    name: 'Диваны',
    slug: 'divan',
  },
  {
    id: 2,
    name: 'Кресла',
    slug: 'chairs',
  },
  {
    id: 3,
    name: 'Столы',
    slug: 'tables',
  },
  {
    id: 4,
    name: 'Стулья',
    slug: 'stools',
  },
  {
    id: 5,
    name: 'Шкафы',
    slug: 'wardrobes'
  },
];

const products = [
  {
    id: 1,
    name: 'Крутой диван 1',
    price: '1000',
    discount_price: '800',
    slug: 'product1',
    categoryId: 1,
  },
  {
    id: 2,
    name: 'Угловой диван "Комфорт"',
    price: '1500',
    discount_price: '1200',
    slug: 'product2',
    categoryId: 1,
  },
  {
    id: 3,
    name: 'Диван "Модерн"',
    price: '2000',
    discount_price: '1800',
    slug: 'product3',
    categoryId: 1,
  },
  {
    id: 4,
    name: 'Диван-кровать "Универсал"',
    price: '1700',
    discount_price: '1500',
    slug: 'product4',
    categoryId: 1,
  },
  {
    id: 5,
    name: 'Диван "Премиум" с кожанной обивкой',
    price: '3000',
    discount_price: '2500',
    slug: 'product5',
    categoryId: 1,
  },
  {
    id: 6,
    name: 'Компактный диван "Мини"',
    price: '900',
    discount_price: '750',
    slug: 'product6',
    categoryId: 1,
  },
  {
    id: 7,
    name: 'Диван "Семейный" 3-х местный',
    price: '2200',
    discount_price: '2000',
    slug: 'product7',
    categoryId: 1,
  },
  {
    id: 8,
    name: 'Диван "Классик" с деревянными ножками',
    price: '1900',
    discount_price: '1700',
    slug: 'product8',
    categoryId: 1,
  },
  {
    id: 9,
    name: 'Диван "Лофт" промышленный стиль',
    price: '2400',
    discount_price: '2200',
    slug: 'product9',
    categoryId: 1,
  },
  {
    id: 10,
    name: 'Диван "Минимализм"',
    price: '1600',
    discount_price: '1400',
    slug: 'product10',
    categoryId: 1,
  },

  // Категория: Кресла (id: 2)
  {
    id: 11,
    name: 'Кресло "Офисное"',
    price: '500',
    discount_price: '400',
    slug: 'product11',
    categoryId: 2,
  },
  {
    id: 12,
    name: 'Кресло-качалка',
    price: '700',
    discount_price: '600',
    slug: 'product12',
    categoryId: 2,
  },
  {
    id: 13,
    name: 'Кресло "Геймерское"',
    price: '1200',
    discount_price: '1000',
    slug: 'product13',
    categoryId: 2,
  },
  {
    id: 14,
    name: 'Кресло "Релакс" с массажем',
    price: '1500',
    discount_price: '1300',
    slug: 'product14',
    categoryId: 2,
  },
  {
    id: 15,
    name: 'Кожаное кресло "Люкс"',
    price: '1800',
    discount_price: '1600',
    slug: 'product15',
    categoryId: 2,
  },
  {
    id: 16,
    name: 'Кресло "Подвесное"',
    price: '900',
    discount_price: '800',
    slug: 'product16',
    categoryId: 2,
  },
  {
    id: 17,
    name: 'Кресло "Бархатное"',
    price: '950',
    discount_price: '850',
    slug: 'product17',
    categoryId: 2,
  },
  {
    id: 18,
    name: 'Кресло "Детское"',
    price: '400',
    discount_price: '350',
    slug: 'product18',
    categoryId: 2,
  },
  {
    id: 19,
    name: 'Кресло "Складное" для кемпинга',
    price: '300',
    discount_price: '250',
    slug: 'product19',
    categoryId: 2,
  },
  {
    id: 20,
    name: 'Кресло "Винтаж"',
    price: '1100',
    discount_price: '950',
    slug: 'product20',
    categoryId: 2,
  },

  // Категория: Столы (id: 3)
  {
    id: 21,
    name: 'Стол обеденный "Большой"',
    price: '800',
    discount_price: '700',
    slug: 'product21',
    categoryId: 3,
  },
  {
    id: 22,
    name: 'Стол журнальный',
    price: '400',
    discount_price: '350',
    slug: 'product22',
    categoryId: 3,
  },
  {
    id: 23,
    name: 'Стол компьютерный',
    price: '600',
    discount_price: '550',
    slug: 'product23',
    categoryId: 3,
  },
  {
    id: 24,
    name: 'Стол барный',
    price: '700',
    discount_price: '650',
    slug: 'product24',
    categoryId: 3,
  },
  {
    id: 25,
    name: 'Стол раскладной',
    price: '500',
    discount_price: '450',
    slug: 'product25',
    categoryId: 3,
  },
  {
    id: 26,
    name: 'Стол письменный "Классик"',
    price: '750',
    discount_price: '700',
    slug: 'product26',
    categoryId: 3,
  },
  {
    id: 27,
    name: 'Стол кухонный угловой',
    price: '900',
    discount_price: '800',
    slug: 'product27',
    categoryId: 3,
  },
  {
    id: 28,
    name: 'Стол "Минимализм"',
    price: '550',
    discount_price: '500',
    slug: 'product28',
    categoryId: 3,
  },
  {
    id: 29,
    name: 'Стол "Лофт" промышленный',
    price: '1200',
    discount_price: '1100',
    slug: 'product29',
    categoryId: 3,
  },
  {
    id: 30,
    name: 'Стол детский',
    price: '350',
    discount_price: '300',
    slug: 'product30',
    categoryId: 3,
  },

  // Категория: Стулья (id: 4)
  {
    id: 31,
    name: 'Стул обеденный "Базовый"',
    price: '200',
    discount_price: '180',
    slug: 'product31',
    categoryId: 4,
  },
  {
    id: 32,
    name: 'Стул барный',
    price: '250',
    discount_price: '220',
    slug: 'product32',
    categoryId: 4,
  },
  {
    id: 33,
    name: 'Стул офисный',
    price: '300',
    discount_price: '280',
    slug: 'product33',
    categoryId: 4,
  },
  {
    id: 34,
    name: 'Стул "Премиум" кожаный',
    price: '500',
    discount_price: '450',
    slug: 'product34',
    categoryId: 4,
  },
  {
    id: 35,
    name: 'Стул складной',
    price: '150',
    discount_price: '130',
    slug: 'product35',
    categoryId: 4,
  },
  {
    id: 36,
    name: 'Стул детский',
    price: '180',
    discount_price: '160',
    slug: 'product36',
    categoryId: 4,
  },
  {
    id: 37,
    name: 'Стул "Винтаж"',
    price: '350',
    discount_price: '320',
    slug: 'product37',
    categoryId: 4,
  },
  {
    id: 38,
    name: 'Стул "Минимализм"',
    price: '280',
    discount_price: '250',
    slug: 'product38',
    categoryId: 4,
  },
  {
    id: 39,
    name: 'Стул "Лофт" промышленный',
    price: '400',
    discount_price: '380',
    slug: 'product39',
    categoryId: 4,
  },
  {
    id: 40,
    name: 'Стул "Комфорт" с подлокотниками',
    price: '450',
    discount_price: '420',
    slug: 'product40',
    categoryId: 4,
  },

  // Категория: Шкафы (id: 5)
  {
    id: 41,
    name: 'Шкаф-купе 3-х створчатый',
    price: '2500',
    discount_price: '2300',
    slug: 'product41',
    categoryId: 5,
  },
  {
    id: 42,
    name: 'Шкаф книжный',
    price: '1200',
    discount_price: '1100',
    slug: 'product42',
    categoryId: 5,
  },
  {
    id: 43,
    name: 'Шкаф для одежды',
    price: '1800',
    discount_price: '1700',
    slug: 'product43',
    categoryId: 5,
  },
  {
    id: 44,
    name: 'Шкаф угловой',
    price: '2000',
    discount_price: '1900',
    slug: 'product44',
    categoryId: 5,
  },
  {
    id: 45,
    name: 'Шкаф "Минимализм"',
    price: '1500',
    discount_price: '1400',
    slug: 'product45',
    categoryId: 5,
  },
  {
    id: 46,
    name: 'Шкаф детский',
    price: '1300',
    discount_price: '1200',
    slug: 'product46',
    categoryId: 5,
  },
  {
    id: 47,
    name: 'Шкаф для обуви',
    price: '800',
    discount_price: '750',
    slug: 'product47',
    categoryId: 5,
  },
  {
    id: 48,
    name: 'Шкаф "Лофт" промышленный',
    price: '2200',
    discount_price: '2100',
    slug: 'product48',
    categoryId: 5,
  },
  {
    id: 49,
    name: 'Шкаф-витрина',
    price: '1700',
    discount_price: '1600',
    slug: 'product49',
    categoryId: 5,
  },
  {
    id: 50,
    name: 'Шкаф "Классик" с резьбой',
    price: '3000',
    discount_price: '2800',
    slug: 'product50',
    categoryId: 5,
  },
];

async function main() {
  await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category,
      })
    )
  );

  await Promise.all(
    products.map((product) =>
      prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: product,
      })
    )
  );

  console.log('Категории и товары созданы!');
}

main()
  .then(() => console.log('Сидирование завершено успешно!'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });