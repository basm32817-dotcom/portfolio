# ABO BASSEM — Mohamed Bassem Saleh Portfolio

A premium, bilingual (English / Arabic) portfolio for **Mohamed Bassem Saleh (ABO BASSEM)** — Software Developer, IT Specialist, and Network Security Trainee.

The site is fully static: HTML, CSS, and vanilla JavaScript. No build step and no server required.

**Repository:** https://github.com/basm32817-dotcom/cv  
**Live site:** https://basm32817-dotcom.github.io/cv/ (after GitHub Pages is enabled)

---

## التشغيل محلياً

افتح `index.html` مباشرة في المتصفح، أو شغّل سيرفر محلي بسيط (مستحسن عشان معاينة ملفات PDF والسيرة الذاتية):

```bash
# باستخدام Node
npx serve .

# أو باستخدام Python
python -m http.server 8000
```

ثم افتح `http://localhost:8000`.

---

## الملفات

```
index.html                  هيكل الصفحة + SEO + أيقونات SVG
manifest.json               بيانات تثبيت الموقع (PWA)
assets/css/styles.css       التصميم الكامل + الوضع الفاتح/الداكن + RTL
assets/css/cyber.css        الطبقة البصرية للأمن السيبراني والشبكات والحركات
assets/js/data.js           كل المحتوى القابل للتعديل (المشاريع، الشهادات، المهارات، التواصل)
assets/js/i18n.js           نصوص الواجهة بالإنجليزي والعربي
assets/js/app.js            التفاعل: العرض، الفلترة، النوافذ، النموذج، اللغة، السيرة الذاتية
assets/images/              الصور والأيقونات وصور المشاريع والشهادات
assets/certificates/        ملفات الشهادات PDF
assets/vendor/jspdf.umd.min.js   مكتبة توليد السيرة الذاتية PDF
scripts/generate-assets.cjs سكربت توليد الأصول (اختياري)
```

---

## تعديل المحتوى

كل المحتوى في **`assets/js/data.js`**:

| الجزء | ماذا تعدل |
| --- | --- |
| `profile` | الاسم، اللقب، المسمى المهني، البريد، الهاتف، واتساب، GitHub، LinkedIn، Facebook، الصورة الشخصية، معرض الصور، الإحصائيات |
| `projects` | المشاريع: العنوان، الوصف، المزايا، التقنيات، صورة المشروع، رابط العرض المباشر، رابط GitHub |
| `certificates` | الشهادات: العنوان، الجهة المانحة، التاريخ، المدة، الصورة، ملفات PDF |
| `skills` | المهارات مقسّمة إلى برمجة / شبكات / أمن / أدوات |
| `timeline` | مراحل رحلة التعلم |
| `settings` | اللغة والثيم الافتراضيان، رابط نموذج التواصل، رابط الموقع |
| `contact` | إعدادات نموذج التواصل |

### تغيير صور الهيرو

الصور الشخصية في `profile.photos` داخل `data.js`، وأول صورة هي الصورة الافتراضية (`profile.avatar`):

```js
photos: [
  'assets/images/profile/profile-1.jpg',
  'assets/images/profile/profile-2.jpg',
  'assets/images/profile/profile-3.jpg'
]
```

حط صورك في `assets/images/profile/` بنفس الأسماء أو غيّر المسارات. لو خليت صورة واحدة بس، بتختفي نقط التنقل تلقائياً. المقاس المناسب 3:4 (مثلاً 900×1200).

### إضافة شهادة جديدة

1. ضع ملف PDF داخل `assets/certificates/`.
2. ضع صورة مصغرة داخل `assets/images/certificates/`.
3. أضف عنصراً جديداً في مصفوفة `certificates` داخل `data.js` بنفس الشكل.
4. حدّث الصفحة — ستظهر البطاقة تلقائياً.

### إضافة مشروع جديد

أضف عنصراً في `projects` بنفس الحقول الموجودة، وضع صورة المشروع في `assets/images/projects/`.
لو المشروع مش منشور، اترك `live: ''` — الموقع هيعرضه كـ «دراسة حالة» بدون رابط مكسور.

---

## بيانات التواصل الحقيقية

حالياً رقم الهاتف وواتساب مضافان (`01113522323` / `+201113522323`)، وباقي بيانات التواصل (البريد، LinkedIn، Facebook) **فارغة عن قصد**، والموقع يعرضها كمساحات قابلة للتعديل مع شرح طريقة الإضافة.

املأ الحقول التالية في `profile` داخل `data.js`:

```js
email: 'you@example.com',
phone: '+20 10 1234 5678',
whatsapp: '201012345678',        // كود الدولة بدون + أو مسافات
linkedin: 'https://www.linkedin.com/in/your-name',
facebook: 'https://www.facebook.com/your-name',
```

بمجرد إضافتها تظهر تلقائياً في الهيرو، قسم التواصل، والفوتر.

---

## نموذج التواصل

- **بدون إعداد**: النموذج يتحقق من البيانات محلياً ويعرض رسالة واضحة أنه لم يتم إرسال شيء (وضع تجريبي صادق)، مع زر لفتح تطبيق البريد.
- **بإعداد endpoint**: ضع رابط Formspree / Getform / أي API في `settings.contactEndpoint` أو `contact.formEndpoint` وسيتم الإرسال فعلياً عبر `fetch`.

```js
settings: {
  contactEndpoint: 'https://formspree.io/f/xxxxxxx'
}
```

---

## السيرة الذاتية PDF

زر «تحميل السيرة الذاتية» (في الهيدر، قسم About، والقائمة الموبايل) يولّد PDF بالإنجليزية داخل المتصفح باستخدام jsPDF، ويحتوي على:

- الاسم والمسمى وبيانات التواصل
- الملخص المهني
- المهارات التقنية
- المشاريع المختارة
- الشهادات
- رحلة التعلم

اسم الملف يُعدّل من `profile.cvFileName`.

---

## اللغة والثيم

- زر الكرة الأرضية يبدّل بين العربية والإنجليزية مع دعم كامل لـ RTL.
- زر الشمس/القمر يبدّل الوضع الداكن/الفاتح.
- الاختيار محفوظ في `localStorage` تحت `ab-lang` و`ab-theme`.

---

## النشر على GitHub Pages

- المستودع: https://github.com/basm32817-dotcom/cv
- الرابط بعد التفعيل: https://basm32817-dotcom.github.io/cv/
- التفعيل: Settings → Pages → Source: **Deploy from a branch** → Branch: **main** → Folder: **/ (root)**.
- `canonical` و`og:url` و`og:image` و`settings.siteUrl` محدّثين بالفعل على الرابط الحقيقي.

---

## ملاحظات

- لا توجد نسب مهارات وهمية، ولا عملاء أو نتائج مفبركة.
- كل الروابط الخارجية تفتح في تبويب جديد مع `rel="noopener noreferrer"`.
- الموقع يحترم `prefers-reduced-motion` ويوقف الحركات لمن يفضل ذلك.
- الصور والشهادات الحالية محلية وقابلة للاستبدال.
