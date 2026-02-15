import { pgTable, text, varchar, decimal, timestamp, integer, boolean, jsonb, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table (sellers + buyers)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  telegramUsername: varchar("telegram_username", { length: 255 }).unique(),
  telegramId: varchar("telegram_id", { length: 255 }).unique(),
  monadWallet: varchar("monad_wallet", { length: 42 }).notNull().unique(),
  alias: varchar("alias", { length: 255 }), // Display name
  role: varchar("role", { length: 20 }).notNull().default("buyer"), // "seller" | "buyer" | "both"
  balance: decimal("balance", { precision: 18, scale: 8 }).default("0"),
  isVerified: boolean("is_verified").default(false),
  // Seller profile fields (FunWithFeet style)
  age: integer("age"), // Seller age
  country: varchar("country", { length: 2 }), // ISO country code (US, MX, etc)
  bio: text("bio"), // Seller description/bio
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Listings table (content posted)
export const listings = pgTable("listings", {
  id: varchar("id", { length: 255 }).primaryKey(), // UUID from bot
  sellerId: integer("seller_id").references(() => users.id).notNull(),
  sellerAlias: varchar("seller_alias", { length: 255 }), // Display name instead of username
  imageUrl: text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url"), // Optional optimized version
  price: decimal("price", { precision: 10, scale: 4 }).notNull(), // MON price
  priceUSD: decimal("price_usd", { precision: 10, scale: 2 }), // USDC equivalent
  title: varchar("title", { length: 255 }),
  description: text("description"),
  category: varchar("category", { length: 255 }), // Category from predefined list
  tags: jsonb("tags").default([]), // ["feet", "verified", etc]
  status: varchar("status", { length: 20 }).notNull().default("active"), // "active" | "removed" (no "sold" - can be bought multiple times)
  views: integer("views").default(0),
  purchases: integer("purchases").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Transactions table (purchases)
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  listingId: varchar("listing_id", { length: 255 }).references(() => listings.id).notNull(),
  buyerId: integer("buyer_id").references(() => users.id).notNull(),
  sellerId: integer("seller_id").references(() => users.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 4 }).notNull(), // Total paid
  currency: varchar("currency", { length: 10 }).notNull().default("MON"), // "MON" | "USDC"
  platformFee: decimal("platform_fee", { precision: 10, scale: 4 }).notNull(), // 10%
  reforestationAmount: decimal("reforestation_amount", { precision: 10, scale: 4 }).notNull(), // 10% of total
  sellerAmount: decimal("seller_amount", { precision: 10, scale: 4 }).notNull(), // 90%
  txHash: varchar("tx_hash", { length: 66 }), // Monad transaction hash
  status: varchar("status", { length: 20 }).notNull().default("pending"), // "pending" | "completed" | "failed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Reforestation tracking
export const reforestation = pgTable("reforestation", {
  id: serial("id").primaryKey(),
  totalAmount: decimal("total_amount", { precision: 18, scale: 8 }).notNull(),
  treesPlanted: integer("trees_planted").default(0),
  lastUpdate: timestamp("last_update").defaultNow().notNull(),
  metadata: jsonb("metadata"), // Certificates, links, etc
});

// Bot sessions (optional, for state management)
export const botSessions = pgTable("bot_sessions", {
  id: serial("id").primaryKey(),
  telegramId: varchar("telegram_id", { length: 255 }).notNull(),
  state: varchar("state", { length: 50 }), // "awaiting_price" | "awaiting_confirmation" | etc
  data: jsonb("data"), // Temporary data
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  listings: many(listings),
  purchasesAsBuyer: many(transactions, { relationName: "buyer" }),
  salesAsSeller: many(transactions, { relationName: "seller" }),
}));

export const listingsRelations = relations(listings, ({ one, many }) => ({
  seller: one(users, {
    fields: [listings.sellerId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  listing: one(listings, {
    fields: [transactions.listingId],
    references: [listings.id],
  }),
  buyer: one(users, {
    fields: [transactions.buyerId],
    references: [users.id],
    relationName: "buyer",
  }),
  seller: one(users, {
    fields: [transactions.sellerId],
    references: [users.id],
    relationName: "seller",
  }),
}));
