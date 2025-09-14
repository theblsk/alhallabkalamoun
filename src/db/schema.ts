import { pgEnum, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', ['ADMIN', 'CUSTOMER', 'MANAGER'])

export const Users = pgTable('users', {
  id: text('id').primaryKey().notNull(),
  email: text('email').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phoneNumber: text('phone_number'),
  role: userRole('role').notNull().default('CUSTOMER'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
    uniqueIndex('users_email_unique').on(table.email),
  ]
);


