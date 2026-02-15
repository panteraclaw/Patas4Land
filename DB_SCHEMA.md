# 🗄️ Database Schema - Patas4Land

## Overview

5 tablas principales para marketplace + bot integration.

---

## Tables

### 1. `users`

Sellers y buyers del marketplace.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_username VARCHAR(255) UNIQUE,
  telegram_id VARCHAR(255) UNIQUE,
  monad_wallet VARCHAR(42) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'buyer', -- 'seller' | 'buyer' | 'both'
  balance DECIMAL(18,8) DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

**Uso del bot:**
```sql
-- Registrar nuevo user
INSERT INTO users (telegram_username, telegram_id, monad_wallet, role)
VALUES ('@username', '123456', '0x02BBde...', 'seller')
RETURNING id, monad_wallet;

-- Buscar user existente
SELECT * FROM users WHERE telegram_id = '123456';
```

---

### 2. `listings`

Contenido publicado en el marketplace.

```sql
CREATE TABLE listings (
  id VARCHAR(255) PRIMARY KEY, -- UUID from bot (ej: "879e5e7c")
  seller_id INTEGER NOT NULL REFERENCES users(id),
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  price DECIMAL(10,4) NOT NULL, -- En MON
  price_usd DECIMAL(10,2), -- Equivalente USDC
  title VARCHAR(255),
  description TEXT,
  tags JSONB DEFAULT '[]', -- ["feet", "verified"]
  status VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active' | 'sold' | 'removed'
  views INTEGER DEFAULT 0,
  purchases INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

**Uso del bot:**
```sql
-- Crear listing cuando user manda foto
INSERT INTO listings (id, seller_id, image_url, price, tags)
VALUES (
  '879e5e7c',
  1, -- seller_id del user
  'https://blob.vercel.../photo.jpg',
  0.1,
  '["feet", "verified"]'::jsonb
)
RETURNING *;

-- Listar contenido disponible
SELECT 
  l.id, l.image_url, l.price, l.tags,
  u.telegram_username as seller
FROM listings l
JOIN users u ON l.seller_id = u.id
WHERE l.status = 'active'
ORDER BY l.created_at DESC;
```

---

### 3. `transactions`

Compras realizadas en el marketplace.

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  listing_id VARCHAR(255) NOT NULL REFERENCES listings(id),
  buyer_id INTEGER NOT NULL REFERENCES users(id),
  seller_id INTEGER NOT NULL REFERENCES users(id),
  amount DECIMAL(10,4) NOT NULL, -- Total pagado
  currency VARCHAR(10) NOT NULL DEFAULT 'MON',
  platform_fee DECIMAL(10,4) NOT NULL, -- 10% del total
  reforestation_amount DECIMAL(10,4) NOT NULL, -- 10% del total
  seller_amount DECIMAL(10,4) NOT NULL, -- 90% del total
  tx_hash VARCHAR(66), -- Hash de transacción Monad
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending' | 'completed' | 'failed'
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP
);
```

**Uso del bot:**
```sql
-- Registrar compra
INSERT INTO transactions (
  listing_id, buyer_id, seller_id,
  amount, platform_fee, reforestation_amount, seller_amount
)
VALUES (
  '879e5e7c',
  2, -- buyer_id
  1, -- seller_id
  0.1,
  0.01, -- 10%
  0.01, -- 10%
  0.09  -- 90%
)
RETURNING id;

-- Actualizar con tx hash cuando se complete
UPDATE transactions 
SET status = 'completed', tx_hash = '0xabc...', completed_at = NOW()
WHERE id = 1;
```

---

### 4. `reforestation`

Tracking del impacto ambiental.

```sql
CREATE TABLE reforestation (
  id SERIAL PRIMARY KEY,
  total_amount DECIMAL(18,8) NOT NULL,
  trees_planted INTEGER DEFAULT 0,
  last_update TIMESTAMP DEFAULT NOW() NOT NULL,
  metadata JSONB -- Certificates, org links, etc
);
```

---

### 5. `bot_sessions`

Estado temporal del bot (opcional).

```sql
CREATE TABLE bot_sessions (
  id SERIAL PRIMARY KEY,
  telegram_id VARCHAR(255) NOT NULL,
  state VARCHAR(50), -- 'awaiting_price' | 'awaiting_confirmation'
  data JSONB, -- { listingId, photoUrl, etc }
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP
);
```

---

## Connection String para Bot

```env
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/patas4land?sslmode=require
```

---

## Queries Comunes del Bot

### Registrar nuevo seller
```sql
INSERT INTO users (telegram_username, telegram_id, monad_wallet, role)
VALUES ($1, $2, $3, 'seller')
ON CONFLICT (telegram_id) DO UPDATE SET updated_at = NOW()
RETURNING id, monad_wallet;
```

### Crear listing
```sql
INSERT INTO listings (id, seller_id, image_url, price, tags, status)
VALUES ($1, $2, $3, $4, $5::jsonb, 'active')
RETURNING id, image_url, price, created_at;
```

### Listar contenido para buyer
```sql
SELECT 
  l.id,
  l.image_url,
  l.price,
  l.tags,
  u.telegram_username as seller,
  l.views,
  l.purchases
FROM listings l
JOIN users u ON l.seller_id = u.id
WHERE l.status = 'active'
ORDER BY l.created_at DESC
LIMIT 20;
```

### Procesar compra
```sql
BEGIN;

-- 1. Crear transaction
INSERT INTO transactions (listing_id, buyer_id, seller_id, amount, platform_fee, reforestation_amount, seller_amount)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id;

-- 2. Marcar listing como vendido (si es única)
UPDATE listings SET status = 'sold', purchases = purchases + 1 WHERE id = $1;

-- 3. Actualizar balance del seller
UPDATE users SET balance = balance + $7 WHERE id = $3;

COMMIT;
```

---

## Migration Script

```bash
# Generar migration
npx drizzle-kit generate

# Aplicar a Neon
npx drizzle-kit push
```

---

## Ejemplo de integración en bot

```typescript
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Cuando user manda foto
async function createListing(telegramId: string, imageUrl: string, price: number) {
  // 1. Get user
  const [user] = await sql`
    SELECT id FROM users WHERE telegram_id = ${telegramId}
  `
  
  if (!user) throw new Error('User not found')
  
  // 2. Create listing
  const listingId = crypto.randomUUID().slice(0, 8)
  
  const [listing] = await sql`
    INSERT INTO listings (id, seller_id, image_url, price, tags)
    VALUES (${listingId}, ${user.id}, ${imageUrl}, ${price}, '["feet"]'::jsonb)
    RETURNING *
  `
  
  return listing
}
```

---

**Ready to connect!** 🚀
