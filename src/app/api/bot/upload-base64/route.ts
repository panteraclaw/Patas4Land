/**
 * Upload endpoint for Telegram bot (Base64 variant)
 * Receives base64-encoded images and uploads them to Vercel Blob
 */

import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// API key auth for bot
const API_KEY = process.env.BOT_API_KEY || 'patas4land_bot_secret_key';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Validate API key
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { image, filename, contentType } = body;

    if (!image) {
      return NextResponse.json(
        { error: 'No image data provided' },
        { status: 400 }
      );
    }

    // Parse base64 data
    let base64Data = image;
    if (image.startsWith('data:')) {
      // Remove data URI prefix if present
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        base64Data = matches[2];
      }
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Validate size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (buffer.length > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Max size: 10MB' },
        { status: 400 }
      );
    }

    // Generate filename
    const ext = contentType?.split('/')[1] || 'jpg';
    const cleanFilename = filename 
      ? filename.replace(/[^a-zA-Z0-9.-]/g, '_')
      : `image-${Date.now()}.${ext}`;
    const blobPath = `listings/${Date.now()}-${cleanFilename}`;

    // Upload to Vercel Blob
    const blob = await put(blobPath, buffer, {
      access: 'public',
      addRandomSuffix: true,
      contentType: contentType || 'image/jpeg',
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: blob.pathname,
      size: buffer.length,
      contentType: contentType || 'image/jpeg',
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
