# Bot API Integration Guide

## Overview
Patas4Land marketplace backend APIs for Telegram bot integration.

**Base URL:** `https://patas4land.vercel.app`

## Authentication
All bot endpoints require API key in Authorization header:
```
Authorization: Bearer patas4land_bot_secret_key
```

⚠️ **Production:** Set `BOT_API_KEY` environment variable in Vercel.

---

## 1. Upload Image (Multipart)

**Endpoint:** `POST /api/bot/upload`

**Content-Type:** `multipart/form-data`

**Request:**
```bash
curl -X POST https://patas4land.vercel.app/api/bot/upload \
  -F "file=@image.jpg"
```

**Response:**
```json
{
  "success": true,
  "url": "https://abc123.public.blob.vercel-storage.com/listings/123-image.jpg",
  "filename": "listings/123-image.jpg",
  "size": 245678,
  "contentType": "image/jpeg"
}
```

**Limits:**
- Max file size: 10MB
- Allowed types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`

---

## 2. Upload Image (Base64)

**Endpoint:** `POST /api/bot/upload-base64`

**Content-Type:** `application/json`

**Headers:**
```
Authorization: Bearer patas4land_bot_secret_key
```

**Request:**
```json
{
  "image": "/9j/4AAQSkZJRgABAQEAYABgAAD/...",
  "filename": "photo.jpg",
  "contentType": "image/jpeg"
}
```

Or with data URI:
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/..."
}
```

**Response:** Same as multipart upload

---

## 3. Create Listing

**Endpoint:** `POST /api/listings/create`

**Content-Type:** `application/json`

**Headers:**
```
Authorization: Bearer patas4land_bot_secret_key
```

**Request:**
```json
{
  "listingId": "uuid-or-unique-id",
  "sellerId": 123,
  "imageUrl": "https://abc123.public.blob.vercel-storage.com/listings/123-image.jpg",
  "thumbnailUrl": "https://abc123.public.blob.vercel-storage.com/listings/123-thumb.jpg",
  "price": "5.0",
  "tags": ["verified", "hd", "new"]
}
```

**Response:**
```json
{
  "success": true,
  "listing": {
    "id": "uuid-or-unique-id",
    "sellerId": 123,
    "imageUrl": "https://...",
    "price": "5.0",
    "status": "active",
    "createdAt": "2026-02-15T06:00:00.000Z"
  }
}
```

---

## 4. Get Active Listings

**Endpoint:** `GET /api/listings/create`

**Response:**
```json
{
  "success": true,
  "listings": [
    {
      "id": "listing-1",
      "imageUrl": "https://...",
      "thumbnailUrl": "https://...",
      "price": "5.0",
      "tags": ["verified"],
      "views": 42,
      "purchases": 3,
      "sellerUsername": "@seller123",
      "sellerWallet": "0x1234...",
      "createdAt": "2026-02-15T06:00:00.000Z"
    }
  ]
}
```

---

## Telegram Bot Workflow

```
User sends photo to bot
     ↓
Bot downloads photo from Telegram
     ↓
Bot uploads to /api/bot/upload (multipart)
  OR /api/bot/upload-base64 (base64)
     ↓
Get back blob URL
     ↓
Bot creates listing via /api/listings/create
  with blob URL as imageUrl
     ↓
Listing appears on marketplace
```

---

## Testing

### Test upload (curl):
```bash
# Multipart
curl -X POST https://patas4land.vercel.app/api/bot/upload \
  -F "file=@test.jpg"

# Base64
curl -X POST https://patas4land.vercel.app/api/bot/upload-base64 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer patas4land_bot_secret_key" \
  -d '{"image":"'$(base64 test.jpg)'"}'
```

### Test create listing:
```bash
curl -X POST https://patas4land.vercel.app/api/listings/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer patas4land_bot_secret_key" \
  -d '{
    "listingId": "test-123",
    "sellerId": 1,
    "imageUrl": "https://blob-url-here",
    "price": "5.0"
  }'
```

---

## Environment Variables (Vercel)

Required in Vercel dashboard → Settings → Environment Variables:

```env
BOT_API_KEY=your_secure_random_key_here
DATABASE_URL=postgresql://...
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

⚠️ Never commit `.env` files to GitHub!

---

## Error Handling

Common errors:

| Code | Error | Solution |
|------|-------|----------|
| 401 | Unauthorized | Check API key in Authorization header |
| 400 | No file provided | Send file in multipart form or base64 JSON |
| 400 | Invalid file type | Only JPEG/PNG/GIF/WebP allowed |
| 400 | File too large | Max 10MB per image |
| 500 | Upload failed | Check Vercel Blob token is set |

---

## Support

Questions? Ping @panteraclaw or backend team in Discord.
