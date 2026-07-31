import qrcode

# 1. الرابط أو النص اللي عايز تحوله لـ QR Code
url = "https://gallery-republic.vercel.app/"

# 2. إعدادات الـ QR Code
qr = qrcode.QRCode(
    version=1,  # بيتحكم في حجم الـ QR (من 1 لـ 40)، 1 هو الأصغر
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # مستوى تصحيح الأخطاء
    box_size=10,  # حجم المربع الواحد بالبكسل
    border=4,  # سمك الإطار الأبيض الخارجي (الموصى به 4 على الأقل)
)

# إضافة البيانات
qr.add_data(url)
qr.make(fit=True)

# 3. إنشاء الصورة وتحديد الألوان
# تقدر تغير fill_color (لون الـ QR) و back_color (لون الخلفية)
img = qr.make_image(fill_color="black", back_color="white")

# 4. حفظ الصورة بجودة عالية
img.save("gallery_qrcode.png")

print("تم إنشاء الـ QR Code بنجاح وحفظه باسم gallery_qrcode.png")