import { NextResponse } from 'next/server';

export async function GET() {
  // حط رابط الجوجل سكريبت بتاعك هنا بالظبط
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVBOVyJAsvczQ02uKMHqeMY52EPcqEDV2NIfSRA7Fgji7z65Gvrf_xQsSycz2lm2gv/exec';

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'GET',
      redirect: 'follow', // إجبار السيرفر على تتبع إعادة توجيه جوجل للوصول للداتا
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return NextResponse.json({ error: `جوجل رد بـ خطأ: ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server Route Error:", error);
    return NextResponse.json({ error: "فشل في جلب البيانات من السيرفر" }, { status: 500 });
  }
}