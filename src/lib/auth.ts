/**
 * Authentication utilities for Patas4Land
 * Simple in-memory auth system for MVP
 * Backend team can integrate real DB later
 */

import bcrypt from 'bcryptjs';

// Whitelist for signup (only martinagorozo1@proton.me for now)
const WHITELISTED_EMAILS = [
  'martinagorozo1@proton.me',
  'panteraclaw1@gmail.com', // Admin access
];

// In-memory user store (replace with DB later)
interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  isAdmin: boolean;
  createdAt: Date;
}

const users: Map<string, User> = new Map();

// Seed admin user for development
const seedAdminUser = async () => {
  if (users.size === 0) {
    const adminHash = await bcrypt.hash('admin123', 10);
    users.set('martinagorozo1@proton.me', {
      id: 'admin-1',
      email: 'martinagorozo1@proton.me',
      name: 'Martina Gorozo',
      passwordHash: adminHash,
      isAdmin: true,
      createdAt: new Date(),
    });
  }
};

// Initialize admin on module load
seedAdminUser();

/**
 * Check if email is whitelisted for signup
 */
export function isWhitelisted(email: string): boolean {
  return WHITELISTED_EMAILS.includes(email.toLowerCase());
}

/**
 * Create a new user
 */
export async function createUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const normalizedEmail = email.toLowerCase();

  // Check if user already exists
  if (users.has(normalizedEmail)) {
    const error = new Error('Email already registered');
    (error as any).code = '23505'; // Postgres unique violation code
    throw error;
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user: User = {
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email: normalizedEmail,
    name,
    passwordHash,
    isAdmin: normalizedEmail === 'martinagorozo1@proton.me' || normalizedEmail === 'panteraclaw1@gmail.com',
    createdAt: new Date(),
  };

  users.set(normalizedEmail, user);

  return user;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const normalizedEmail = email.toLowerCase();
  return users.get(normalizedEmail) || null;
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  return Array.from(users.values()).map((user) => ({
    ...user,
    passwordHash: '[REDACTED]', // Don't expose hashes
  }));
}

/**
 * Delete user (admin only)
 */
export async function deleteUser(email: string): Promise<boolean> {
  const normalizedEmail = email.toLowerCase();
  return users.delete(normalizedEmail);
}

/**
 * Update user profile
 */
export async function updateUser(
  email: string,
  updates: Partial<Pick<User, 'name'>>
): Promise<User | null> {
  const normalizedEmail = email.toLowerCase();
  const user = users.get(normalizedEmail);

  if (!user) return null;

  const updatedUser = { ...user, ...updates };
  users.set(normalizedEmail, updatedUser);

  return updatedUser;
}
