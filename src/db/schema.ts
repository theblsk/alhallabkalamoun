import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  boolean,
  numeric,
  integer,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Enums
export const userRole = pgEnum('user_role', ['ADMIN', 'CUSTOMER', 'MANAGER']);

// Users (Clerk IDs as PK)
export const Users = pgTable(
  'users',
  {
    id: text('id').primaryKey().notNull(), // Clerk user id
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email'),
    phoneNumber: text('phone_number').notNull(),
    role: userRole('role').notNull().default('CUSTOMER'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex('users_email_unique').on(table.email)]
);

// Categories
export const Categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Menu Items
export const MenuItems = pgTable('menu_items', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => Categories.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Orders
export const Orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    userId: text('user_id').references(() => Users.id, {
      onDelete: 'set null',
    }),
    customerFirstName: text('customer_first_name').notNull(),
    customerLastName: text('customer_last_name').notNull(),
    customerPhoneNumber: text('customer_phone_number').notNull(),
    customerEmail: text('customer_email'),
    orderType: text('order_type').notNull(), // validated via CHECK below
    deliveryAddress: text('delivery_address'),
    status: text('status').notNull().default('PENDING'),
    totalAmount: numeric('total_amount', { precision: 10, scale: 2 })
      .notNull()
      .default('0'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check('orders_order_type_check', sql`${table.orderType} IN ('PICKUP','DELIVERY')`),
    check(
      'orders_status_check',
      sql`${table.status} IN ('PENDING','CONFIRMED','IN_PROGRESS','READY_FOR_PICKUP','DELIVERING','COMPLETED','CANCELLED')`
    ),
    check(
      'orders_delivery_address_required',
      sql`(${table.orderType} = 'DELIVERY' AND ${table.deliveryAddress} IS NOT NULL) OR (${table.orderType} = 'PICKUP')`
    ),
  ]
);

// Order Items
export const OrderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => Orders.id, { onDelete: 'cascade' }),
    menuItemId: uuid('menu_item_id')
      .notNull()
      .references(() => MenuItems.id),
    quantity: integer('quantity').notNull(),
    unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
    // subtotal is a GENERATED column (quantity * unit_price) - don't insert/update this
    subtotal: numeric('subtotal', { precision: 10, scale: 2 }),
  },
  (table) => [
    check('order_items_quantity_check', sql`${table.quantity} > 0`),
    check('order_items_unit_price_check', sql`${table.unitPrice} >= 0`),
  ]
);

// Notifications (Twilio logs)
export const Notifications = pgTable(
  'notifications',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => Orders.id, { onDelete: 'cascade' }),
    recipientPhone: text('recipient_phone').notNull(),
    messageType: text('message_type').notNull(), // validated via CHECK below
    messageBody: text('message_body').notNull(),
    twilioSid: text('twilio_sid'),
    status: text('status').notNull().default('SENT'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      'notifications_message_type_check',
      sql`${table.messageType} IN ('ORDER_PLACED','STATUS_UPDATE')`
    ),
    check(
      'notifications_status_check',
      sql`${table.status} IN ('SENT','FAILED','DELIVERED')`
    ),
  ]
);