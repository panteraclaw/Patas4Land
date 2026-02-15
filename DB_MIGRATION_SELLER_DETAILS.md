# Database Migration: Seller Profile Details

## Overview
Adding FunWithFeet-style seller profile fields to support rich marketplace listings.

## New Fields in `users` Table

```sql
ALTER TABLE users ADD COLUMN age INTEGER;
ALTER TABLE users ADD COLUMN country VARCHAR(2); -- ISO 3166-1 alpha-2 (US, MX, BR, etc)
ALTER TABLE users ADD COLUMN bio TEXT;
```

## Field Descriptions

### `age` (integer, nullable)
- Seller's age in years
- Used for display on listing cards
- Example: `25`

### `country` (varchar(2), nullable)
- ISO 3166-1 alpha-2 country code
- Used to display flag emoji on cards
- Examples: `US`, `MX`, `BR`, `CO`, `AR`
- Frontend converts to flag emoji automatically

### `bio` (text, nullable)
- Seller's profile description/bio
- Displayed on listing cards (truncated to 2 lines)
- Max length: ~500 chars (recommended)
- Example: "Professional model based in LA. High quality content, custom requests welcome 💕"

## API Changes

### GET `/api/listings/create`

**Response now includes:**
```json
{
  "success": true,
  "listings": [
    {
      "id": "listing-123",
      "imageUrl": "https://...",
      "price": "10.00",
      "sellerUsername": "@seller123",
      "sellerAge": 25,           // NEW
      "sellerCountry": "US",     // NEW
      "sellerBio": "Model from LA...",  // NEW
      ...
    }
  ]
}
```

### POST `/api/listings/create`

No changes required. Seller details are fetched from `users` table via JOIN.

## Bot Integration

When a user first creates a listing, the bot should prompt for:

1. **Age** (optional): "How old are you? (optional)"
2. **Country** (optional): "What country are you from? (US/MX/BR/etc)"
3. **Bio** (optional): "Add a short bio for your profile (optional)"

Store these in the `users` table when the seller signs up or updates their profile.

## Frontend Display

**Listing Card Layout:**
```
┌────────────────────┐
│                    │
│   Preview Image    │ (blurred, aspect 4:5)
│                    │
├────────────────────┤
│ @username 🇺🇸      │ (username + flag)
│ 25 years old       │ (age)
│ ─────────────────  │
│ "Model from LA..." │ (bio, 2 lines max)
│ Gallery available  │
│ ─────────────────  │
│ [View Profile]     │ (CTA button)
└────────────────────┘
```

## Optional: Future Enhancements

- `rating` (decimal): Average star rating
- `reviewCount` (integer): Number of reviews
- `joinedDate` (timestamp): When seller joined (use existing `createdAt`)
- `galleryCount` (integer): Number of photos in gallery
- `customRequestsEnabled` (boolean): Accepts custom requests

## Migration Script

Run this on your Neon database:

```sql
-- Add new columns to users table
ALTER TABLE users 
  ADD COLUMN age INTEGER,
  ADD COLUMN country VARCHAR(2),
  ADD COLUMN bio TEXT;

-- Optional: Add indexes if needed
CREATE INDEX idx_users_country ON users(country);
```

---

**Status:** ✅ Schema updated, API updated, frontend ready
**Next:** Run migration on Neon DB + update bot to collect these fields
