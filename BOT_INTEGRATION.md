# 🤖 Bot Integration Guide

## Overview

El bot PataMonad puede subir contenido al marketplace via API.

## Endpoint

**POST** `https://patas4land.vercel.app/api/listings/create`

## Authentication

```
Authorization: Bearer patas4land_bot_secret_key_CHANGE_THIS
```

⚠️ Cambia el API key en producción (archivo `.env`)

## Request Format

**Content-Type:** `multipart/form-data`

**Fields:**
- `image` (File) - Foto a subir
- `price` (string) - Precio en MON (ej: "0.1")
- `seller` (string) - Username del seller (ej: "@Daniellagart")
- `sellerWallet` (string) - Wallet Monad del seller
- `tags` (string, optional) - Tags separados por coma (ej: "feet,verified")
- `listingId` (string, optional) - ID único del listing

## Example (Node.js)

```javascript
const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('image', fs.createReadStream('photo.jpg'));
form.append('price', '0.1');
form.append('seller', '@username');
form.append('sellerWallet', '0x02BBde...');
form.append('tags', 'feet,verified');
form.append('listingId', '879e5e7c');

const response = await fetch('https://patas4land.vercel.app/api/listings/create', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer patas4land_bot_secret_key_CHANGE_THIS'
  },
  body: form
});

const data = await response.json();
console.log(data);
```

## Example (Python)

```python
import requests

files = {'image': open('photo.jpg', 'rb')}
data = {
    'price': '0.1',
    'seller': '@username',
    'sellerWallet': '0x02BBde...',
    'tags': 'feet,verified',
    'listingId': '879e5e7c'
}

headers = {
    'Authorization': 'Bearer patas4land_bot_secret_key_CHANGE_THIS'
}

response = requests.post(
    'https://patas4land.vercel.app/api/listings/create',
    files=files,
    data=data,
    headers=headers
)

print(response.json())
```

## Response

**Success (200):**
```json
{
  "success": true,
  "listing": {
    "id": "879e5e7c",
    "imageUrl": "https://xxx.public.blob.vercel-storage.com/...",
    "price": 0.1,
    "seller": "@Daniellagart",
    "sellerWallet": "0x02BBde...",
    "tags": ["feet", "verified"],
    "createdAt": "2026-02-15T05:30:00.000Z",
    "status": "active"
  },
  "message": "Listing created successfully"
}
```

**Error (401):**
```json
{
  "error": "Unauthorized"
}
```

**Error (400):**
```json
{
  "error": "Missing required fields: image, price, seller, sellerWallet"
}
```

## Bot Flow

1. User manda foto al bot
2. Bot procesa y pide precio
3. Bot hace POST al API con la foto
4. API sube a Vercel Blob
5. API retorna URL + listing ID
6. Bot confirma al user: "✅ Listado en marketplace!"

## GET Listings

**GET** `https://patas4land.vercel.app/api/listings/create`

Retorna todos los listings activos (no requiere auth).

```json
{
  "success": true,
  "listings": [
    {
      "id": "listing_1",
      "imageUrl": "https://...",
      "price": 0.1,
      "seller": "@Daniellagart",
      "tags": ["feet", "verified"]
    }
  ]
}
```

## TODO

- [ ] Conectar a Neon DB (persistencia)
- [ ] Agregar paginación
- [ ] Implementar búsqueda/filtros
- [ ] Webhook para notificar ventas
- [ ] Rate limiting

---

**Integration Status:** ✅ API Ready | ⏳ DB Pending
