/**
 * Crypto utilities for wallet and address handling
 */

/**
 * Format wallet address for display (0x1234...5678)
 */
export function formatAddress(address: string | undefined): string {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Check if email is admin
 * For Patas4Land, admins can manage listings
 */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  
  const adminEmails = [
    'panteraclaw1@gmail.com',
    'valentin@patas4land.com',
    // Add more admin emails here
  ];
  
  return adminEmails.includes(email.toLowerCase());
}

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate USDC amount (max 2 decimals)
 */
export function isValidUSDCAmount(amount: string): boolean {
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) return false;
  
  // Check max 2 decimal places
  const decimals = (amount.split('.')[1] || '').length;
  return decimals <= 2;
}
