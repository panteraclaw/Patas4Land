import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { listings, users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

// API key auth for bot
const API_KEY = process.env.BOT_API_KEY || 'patas4land_bot_secret_key'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { listingId, sellerId, imageUrl, thumbnailUrl, price, tags } = body

    if (!listingId || !sellerId || !imageUrl || !price) {
      return NextResponse.json({ 
        error: 'Missing required fields: listingId, sellerId, imageUrl, price' 
      }, { status: 400 })
    }

    const [listing] = await db.insert(listings).values({
      id: listingId,
      sellerId: sellerId,
      imageUrl: imageUrl,
      thumbnailUrl: thumbnailUrl || null,
      price: price.toString(),
      tags: tags || [],
      status: 'active',
    }).returning()

    return NextResponse.json({ success: true, listing })
  } catch (error: any) {
    console.error('Error creating listing:', error)
    return NextResponse.json({ 
      error: 'Failed to create listing',
      details: error.message 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const results = await db
      .select({
        id: listings.id,
        imageUrl: listings.imageUrl,
        thumbnailUrl: listings.thumbnailUrl,
        price: listings.price,
        tags: listings.tags,
        status: listings.status,
        views: listings.views,
        purchases: listings.purchases,
        createdAt: listings.createdAt,
        sellerUsername: users.telegramUsername,
        sellerWallet: users.monadWallet,
        sellerAge: users.age,
        sellerCountry: users.country,
        sellerBio: users.bio,
      })
      .from(listings)
      .leftJoin(users, eq(listings.sellerId, users.id))
      .where(eq(listings.status, 'active'))
      .orderBy(desc(listings.createdAt))

    return NextResponse.json({ success: true, listings: results })
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Failed to fetch listings',
      details: error.message 
    }, { status: 500 })
  }
}
