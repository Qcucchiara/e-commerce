import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { Role } from '../src/utils/Types/enums';
const prisma = new PrismaClient();

async function main() {
  // Create roles
  const guestRole = await prisma.role.create({
    data: { role: Role.GUEST },
  });

  const userRole = await prisma.role.create({
    data: { role: Role.CUSTOMER },
  });

  const sellerRole = await prisma.role.create({
    data: { role: Role.SELLER },
  });

  const adminRole = await prisma.role.create({
    data: { role: Role.ADMIN },
  });

  // Create users
  const users = [
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'StrongPassword123!',
      pseudo: 'johndoe',
      avatar: 'john_avatar_url.jpg',
      role_id: userRole.id,
      pseudo_id: 1,
      activate_token: 'activation_token_john',
    },
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      password: 'AnotherPass456!',
      pseudo: 'janesmith',
      avatar: 'jane_avatar_url.jpg',
      role_id: sellerRole.id,
      pseudo_id: 1,
      activate_token: 'activation_token_jane',
    },
    {
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      password: 'Secure789Pass!',
      pseudo: 'alicej',
      avatar: 'alice_avatar_url.jpg',
      role_id: guestRole.id,
      pseudo_id: 1,
      activate_token: 'activation_token_alice',
    },
    {
      first_name: 'Quentin',
      last_name: 'Cucchiara',
      email: 'qcucchiara@gmail.com',
      password: 'Secure789Pass!',
      pseudo: 'Phost',
      avatar: 'quentin_avatar_url.jpg',
      role_id: guestRole.id,
      pseudo_id: 1,
      activate_token: 'activation_token_quentin',
    },
  ];

  for (const user of users) {
    const password_hash = await argon.hash(user.password);
    await prisma.user.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        pseudo: user.pseudo,
        avatar: user.avatar,
        role_id: user.role_id,
        pseudo_id: user.pseudo_id,
        activate_token: user.activate_token,
        password_hash: password_hash,
      },
    });
  }

  // Create categories
  const categories = [
    {
      name: 'Stationery',
      slug: 'stationery',
      image: 'stationery_image_url.jpg',
    },
    { name: 'Furniture', slug: 'furniture', image: 'furniture_image_url.jpg' },
    {
      name: 'Electronics',
      slug: 'electronics',
      image: 'electronics_image_url.jpg',
    },
    {
      name: 'Books',
      slug: 'books',
      image: 'books_image_url.jpg',
    },
    {
      name: 'Clothing',
      slug: 'clothing',
      image: 'clothing_image_url.jpg',
    },
    {
      name: 'Toys',
      slug: 'toys',
      image: 'toys_image_url.jpg',
    },
    {
      name: 'Groceries',
      slug: 'groceries',
      image: 'groceries_image_url.jpg',
    },
    {
      name: 'Sports',
      slug: 'sports',
      image: 'sports_image_url.jpg',
    },
    {
      name: 'Beauty',
      slug: 'beauty',
      image: 'beauty_image_url.jpg',
    },
    {
      name: 'Automotive',
      slug: 'automotive',
      image: 'automotive_image_url.jpg',
    },
    {
      name: 'Garden',
      slug: 'garden',
      image: 'garden_image_url.jpg',
    },
    {
      name: 'Health',
      slug: 'health',
      image: 'health_image_url.jpg',
    },
    {
      name: 'Pet Supplies',
      slug: 'pet-supplies',
      image: 'pet_supplies_image_url.jpg',
    },
    {
      name: 'Jewelry',
      slug: 'jewelry',
      image: 'jewelry_image_url.jpg',
    },
    {
      name: 'Footwear',
      slug: 'footwear',
      image: 'footwear_image_url.jpg',
    },
  ];

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  // Create products
  const products = [
    {
      name: 'Pen',
      slug: 'pen',
      image: 'pen_image_url.jpg',
      description: 'A smooth writing ballpoint pen.',
      price: 1.25,
      stock: 100,
      promo: 0.1,
      categories: ['Stationery'],
    },
    {
      name: 'Notebook',
      slug: 'notebook',
      image: 'notebook_image_url.jpg',
      description: 'A 200-page lined notebook.',
      price: 3.5,
      stock: 50,
      promo: 0.05,
      categories: ['Furniture', 'Electronics'],
    },
    {
      name: 'Desk',
      slug: 'desk',
      image: 'desk_image_url.jpg',
      description: 'A sturdy office desk.',
      price: 150.0,
      stock: 20,
      promo: 0,
      categories: ['Stationery', 'Furniture', 'Electronics'],
    },
    {
      name: 'Laptop',
      slug: 'laptop',
      image: 'laptop_image_url.jpg',
      description: 'A high performance laptop.',
      price: 1200.0,
      stock: 30,
      promo: 0.15,
      categories: ['Electronics'],
    },
    {
      name: 'Fiction Book',
      slug: 'fiction-book',
      image: 'fiction_book_image_url.jpg',
      description: 'An engaging fiction novel.',
      price: 12.99,
      stock: 200,
      promo: 0.2,
      categories: ['Books'],
    },
    {
      name: 'T-shirt',
      slug: 't-shirt',
      image: 'tshirt_image_url.jpg',
      description: 'A comfortable cotton t-shirt.',
      price: 9.99,
      stock: 150,
      promo: 0.1,
      categories: ['Clothing'],
    },
    {
      name: 'Action Figure',
      slug: 'action-figure',
      image: 'action_figure_image_url.jpg',
      description: 'A collectible action figure.',
      price: 19.99,
      stock: 80,
      promo: 0.05,
      categories: ['Toys'],
    },
    {
      name: 'Apple',
      slug: 'apple',
      image: 'apple_image_url.jpg',
      description: 'A fresh red apple.',
      price: 0.5,
      stock: 500,
      promo: 0,
      categories: ['Groceries'],
    },
    {
      name: 'Soccer Ball',
      slug: 'soccer-ball',
      image: 'soccer_ball_image_url.jpg',
      description: 'A durable soccer ball.',
      price: 25.0,
      stock: 70,
      promo: 0.1,
      categories: ['Sports'],
    },
    {
      name: 'Shampoo',
      slug: 'shampoo',
      image: 'shampoo_image_url.jpg',
      description: 'A nourishing shampoo.',
      price: 8.99,
      stock: 120,
      promo: 0.15,
      categories: ['Beauty'],
    },
    {
      name: 'Car Wax',
      slug: 'car-wax',
      image: 'car_wax_image_url.jpg',
      description: 'A high-gloss car wax.',
      price: 14.99,
      stock: 60,
      promo: 0.05,
      categories: ['Automotive'],
    },
    {
      name: 'Garden Shovel',
      slug: 'garden-shovel',
      image: 'garden_shovel_image_url.jpg',
      description: 'A sturdy garden shovel.',
      price: 22.0,
      stock: 40,
      promo: 0,
      categories: ['Garden'],
    },
    {
      name: 'Vitamin C',
      slug: 'vitamin-c',
      image: 'vitamin_c_image_url.jpg',
      description: 'A bottle of vitamin C tablets.',
      price: 15.0,
      stock: 100,
      promo: 0.1,
      categories: ['Health'],
    },
    {
      name: 'Dog Food',
      slug: 'dog-food',
      image: 'dog_food_image_url.jpg',
      description: 'A bag of premium dog food.',
      price: 35.0,
      stock: 50,
      promo: 0.2,
      categories: ['Pet Supplies'],
    },
    {
      name: 'Necklace',
      slug: 'necklace',
      image: 'necklace_image_url.jpg',
      description: 'A beautiful gold necklace.',
      price: 200.0,
      stock: 25,
      promo: 0.1,
      categories: ['Jewelry'],
    },
    {
      name: 'Running Shoes',
      slug: 'running-shoes',
      image: 'running_shoes_image_url.jpg',
      description: 'A pair of comfortable running shoes.',
      price: 80.0,
      stock: 100,
      promo: 0.1,
      categories: ['Footwear'],
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        image: product.image,
        description: product.description,
        price: product.price,
        stock: product.stock,
        promo: product.promo,
      },
    });

    for (const category of product.categories) {
      await prisma.product_Has_Category.create({
        data: {
          product_id: createdProduct.id,
          category_id: (
            await prisma.category.findUnique({
              where: { name: category },
            })
          ).id,
        },
      });
    }
  }

  // Create orders
  const orders = [
    {
      user_id: (
        await prisma.user.findUnique({
          where: { email: 'john.doe@example.com' },
        })
      ).id,
      Order_has_Product: {
        create: [
          {
            product_id: (
              await prisma.product.findUnique({ where: { name: 'Pen' } })
            ).id,
            quantity: 2,
          },
          {
            product_id: (
              await prisma.product.findUnique({ where: { name: 'Notebook' } })
            ).id,
            quantity: 1,
          },
        ],
      },
    },
    {
      user_id: (
        await prisma.user.findUnique({
          where: { email: 'jane.smith@example.com' },
        })
      ).id,
      Order_has_Product: {
        create: [
          {
            product_id: (
              await prisma.product.findUnique({ where: { name: 'Desk' } })
            ).id,
            quantity: 1,
          },
        ],
      },
    },
  ];

  for (const order of orders) {
    await prisma.order.create({ data: order });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
