/**
 * Type definitions for Patas4Land
 * Exports Drizzle schema types and frontend form interfaces
 */

// Re-export schema table types (inferred from Drizzle)
export type { 
  users as User,
  listings as Listing, 
  transactions as Transaction,
  reforestation as Reforestation,
  botSessions as BotSession
} from '../db/schema';

// Inferred insert types (for creating new records)
import type { InferInsertModel } from 'drizzle-orm';
import type { users, listings, transactions, botSessions } from '../db/schema';

export type NewUser = InferInsertModel<typeof users>;
export type NewListing = InferInsertModel<typeof listings>;
export type NewTransaction = InferInsertModel<typeof transactions>;
export type NewBotSession = InferInsertModel<typeof botSessions>;

// Frontend form interfaces
export interface ListingFormData {
  imageUrl: string;
  price: number;
  title?: string;
  description?: string;
  tags?: string[];
}

export interface UserProfileData {
  telegramUsername?: string;
  monadWallet: string;
  role: 'seller' | 'buyer' | 'both';
}

export interface TransactionFormData {
  listingId: string;
  amount: number;
  currency: 'MON' | 'USDC';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
