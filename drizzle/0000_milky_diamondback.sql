-- Drizzle-generated DDL
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'CUSTOMER', 'MANAGER');
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"image_url" text,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"recipient_phone" text NOT NULL,
	"message_type" text NOT NULL,
	"message_body" text NOT NULL,
	"twilio_sid" text,
	"status" text DEFAULT 'SENT' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "notifications_message_type_check" CHECK ("notifications"."message_type" IN ('ORDER_PLACED','STATUS_UPDATE')),
	CONSTRAINT "notifications_status_check" CHECK ("notifications"."status" IN ('SENT','FAILED','DELIVERED'))
);
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"menu_item_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	CONSTRAINT "order_items_quantity_check" CHECK ("order_items"."quantity" > 0),
	CONSTRAINT "order_items_unit_price_check" CHECK ("order_items"."unit_price" >= 0)
);
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"customer_first_name" text NOT NULL,
	"customer_last_name" text NOT NULL,
	"customer_phone_number" text NOT NULL,
	"customer_email" text,
	"order_type" text NOT NULL,
	"delivery_address" text,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"total_amount" numeric(10, 2) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "orders_order_type_check" CHECK ("orders"."order_type" IN ('PICKUP','DELIVERY')),
	CONSTRAINT "orders_status_check" CHECK ("orders"."status" IN ('PENDING','CONFIRMED','IN_PROGRESS','READY_FOR_PICKUP','DELIVERING','COMPLETED','CANCELLED')),
	CONSTRAINT "orders_delivery_address_required" CHECK (("orders"."order_type" = 'DELIVERY' AND "orders"."delivery_address" IS NOT NULL) OR ("orders"."order_type" = 'PICKUP'))
);
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text,
	"phone_number" text NOT NULL,
	"role" "user_role" DEFAULT 'CUSTOMER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_item_id_menu_items_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");

-- Convert subtotal to generated column
ALTER TABLE "order_items" DROP COLUMN "subtotal";
ALTER TABLE "order_items" ADD COLUMN "subtotal" numeric(10,2) GENERATED ALWAYS AS ("quantity" * "unit_price") STORED;

-- Enable Row Level Security
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "menu_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "order_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notifications" ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Note: Your app must run SET app.current_user_id = '<clerk_user_id>'; per request

-- USERS policies
CREATE POLICY "users_self_select" ON "users"
  FOR SELECT
  USING ("users"."id" = current_setting('app.current_user_id', true));

CREATE POLICY "users_self_update" ON "users"
  FOR UPDATE
  USING ("users"."id" = current_setting('app.current_user_id', true));

CREATE POLICY "users_admin_manage" ON "users"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM "users" u
      WHERE u.id = current_setting('app.current_user_id', true)
        AND u.role = 'ADMIN'
    )
  );

CREATE POLICY "users_manager_view" ON "users"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM "users" u
      WHERE u.id = current_setting('app.current_user_id', true)
        AND u.role = 'MANAGER'
    )
  );

-- CATEGORIES policies
CREATE POLICY "categories_public_select" ON "categories"
  FOR SELECT
  USING (true);

CREATE POLICY "categories_manage" ON "categories"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM "users" u
      WHERE u.id = current_setting('app.current_user_id', true)
        AND u.role IN ('ADMIN','MANAGER')
    )
  );

-- MENU ITEMS policies
CREATE POLICY "menu_items_public_select" ON "menu_items"
  FOR SELECT
  USING (true);

CREATE POLICY "menu_items_manage" ON "menu_items"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM "users" u
      WHERE u.id = current_setting('app.current_user_id', true)
        AND u.role IN ('ADMIN','MANAGER')
    )
  );

-- ORDERS policies
CREATE POLICY "orders_customer_insert" ON "orders"
  FOR INSERT
  WITH CHECK (
    "orders"."user_id" IS NULL
    OR "orders"."user_id" = current_setting('app.current_user_id', true)
  );

CREATE POLICY "orders_customer_select" ON "orders"
  FOR SELECT
  USING ("orders"."user_id" = current_setting('app.current_user_id', true));

CREATE POLICY "orders_customer_update" ON "orders"
  FOR UPDATE
  USING ("orders"."user_id" = current_setting('app.current_user_id', true));

CREATE POLICY "orders_staff_manage" ON "orders"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM "users" u
      WHERE u.id = current_setting('app.current_user_id', true)
        AND u.role IN ('ADMIN','MANAGER')
    )
  );

-- ORDER ITEMS policies
CREATE POLICY "order_items_customer_access" ON "order_items"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM "orders" o
      WHERE o.id = "order_items"."order_id"
        AND o.user_id = current_setting('app.current_user_id', true)
    )
  );

CREATE POLICY "order_items_staff_manage" ON "order_items"
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM "users" u
      WHERE u.id = current_setting('app.current_user_id', true)
        AND u.role IN ('ADMIN','MANAGER')
    )
  );

-- NOTIFICATIONS policies
CREATE POLICY "notifications_staff_select" ON "notifications"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM "users" u
      WHERE u.id = current_setting('app.current_user_id', true)
        AND u.role IN ('ADMIN','MANAGER')
    )
  );