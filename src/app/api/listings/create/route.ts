import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

// Simple API key auth (upgrade to JWT later)
const API_KEY = process.env.BOT_API_KEY || 'patas4land_bot_secret_key'

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar API key
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse form data
    const formData = await request.formData()
    const file = formData.get('image') as File
    const price = formData.get('price') as string
    const seller = formData.get('seller') as string
    const sellerWallet = formData.get('sellerWallet') as string
    const tags = formData.get('tags') as string
    const listingId = formData.get('listingId') as string

    if (!file || !price || !seller || !sellerWallet) {
      return NextResponse.json({ 
        error: 'Missing required fields: image, price, seller, sellerWallet' 
      }, { status: 400 })
    }

    // 3. Upload image to Vercel Blob
    const blob = await put(`listings/${listingId || Date.now()}.${file.name.split('.').pop()}`, file, {
      access: 'public',
    })

    // 4. Create listing object (save to DB in next iteration)
    const listing = {
      id: listingId || `listing_${Date.now()}`,
      imageUrl: blob.url,
      price: parseFloat(price),
      seller,
      sellerWallet,
      tags: tags ? tags.split(',') : [],
      createdAt: new Date().toISOString(),
      status: 'active'
    }

    // TODO: Save to database (Neon/Drizzle)
    // For now, return success

    return NextResponse.json({
      success: true,
      listing,
      message: 'Listing created successfully'
    })

  } catch (error: any) {
    console.error('Error creating listing:', error)
    return NextResponse.json({ 
      error: 'Failed to create listing',
      details: error.message 
    }, { status: 500 })
  }
}

// GET endpoint to list all listings
export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from database
    // For now, return mock data
    
    const mockListings = [
      {
        id: 'listing_1',
        imageUrl: '/placeholder-feet.jpg',
        price: 0.1,
        seller: '@Daniellagart',
        sellerWallet: '0x123...',
        tags: ['feet', 'verified'],
        status: 'active'
      }
    ]

    return NextResponse.json({
      success: true,
      listings: mockListings
    })

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Failed to fetch listings',
      details: error.message 
    }, { status: 500 })
  }
}
