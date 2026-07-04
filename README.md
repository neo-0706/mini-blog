# Mini Blog — UI (نسخه ۱.۰)

رابط کاربری یک وبلاگ کوچک (Mini Blog)، طراحی‌شده با **HTML5** و **CSS3** خالص. این نسخه فقط روی طراحی UI و ساختار صفحه تمرکز دارد و هیچ منطق جاوااسکریپتی ندارد؛ ساختار به‌گونه‌ای آماده شده که در نسخه‌های بعدی بتوان قابلیت‌های پویا را به‌راحتی روی آن پیاده کرد.

---

## ساختار فایل‌ها

```
mini-blog/
├── index.html   # ساختار صفحه (Semantic HTML)
└── style.css    # استایل‌دهی کامل (CSS Variables, Flexbox, Grid)
```

---

## تکنولوژی‌ها

| مورد | توضیح |
|---|---|
| HTML5 | ساختار سمانتیک (`header`, `section`, `article`, `form`) |
| CSS3 | Flexbox، CSS Grid، CSS Variables، Animation |
| فونت | [Vazirmatn](https://fonts.google.com/specimen/Vazirmatn) از Google Fonts |
| فریم‌ورک | ندارد — بدون Bootstrap / Tailwind / JavaScript |

---

## ویژگی‌های طراحی

- طراحی مینیمال و مدرن، الهام‌گرفته از سبک Linear / Notion / Vercel
- کاملاً **Responsive** و **Mobile First** (موبایل، تبلت، لپ‌تاپ، دسکتاپ)
- رنگ‌بندی یکپارچه از طریق CSS Variables در `:root`
- کارت‌های با Border Radius نرم، Shadow ملایم و افکت Hover (بالا آمدن کارت)
- ورودی‌ها (Input/Textarea) با Focus حرفه‌ای و Transition روان
- انیمیشن‌های ورود (Fade In)، Hover Lift و افکت Ripple-like روی دکمه‌ها (فقط CSS)
- پشتیبانی از `prefers-reduced-motion` برای کاربرانی که انیمیشن کمتر می‌خواهند
- Focus قابل مشاهده برای ناوبری با صفحه‌کلید (Accessibility)

---

## پالت رنگی

| نام | مقدار | مصرف |
|---|---|---|
| پس‌زمینه | `#f5f7fb` | پس‌زمینه کلی صفحه |
| سطح کارت‌ها | `#ffffff` | کارت‌ها و فرم |
| رنگ اصلی | `#4f46e5` | دکمه Publish، آواتار، لینک‌ها |
| هشدار / ویرایش | `#f59e0b` | دکمه Edit |
| خطر / حذف | `#ef4444` | دکمه Delete |
| متن اصلی | `#1f2937` | متن‌ها |

تمام مقادیر بالا در `style.css` داخل `:root` به‌صورت متغیر (`--color-*`) تعریف شده‌اند و تغییر آن‌ها کل تم رنگی صفحه را به‌روزرسانی می‌کند.

---

## ساختار DOM (آماده برای توسعه با JavaScript)

```
.container
│
├── .site-header
│
├── .post-form-section
│   └── #post-form
│       ├── #author-input
│       ├── #title-input
│       ├── #content-input
│       └── #publish-btn
│
└── .posts-section
    ├── #posts-count
    └── #posts-list
        └── .post-card[data-post-id]
            ├── .post-card__author / __title / __excerpt
            └── .post-card__actions
                ├── [data-action="edit"]
                └── [data-action="delete"]
```

### راهنمای اتصال JavaScript در نسخه‌های بعدی

- **افزودن پست:** رویداد `submit` را روی `#post-form` بگیرید، مقادیر `#author-input`, `#title-input`, `#content-input` را بخوانید و یک `.post-card` جدید به `#posts-list` اضافه کنید.
- **نمایش پست‌ها:** پست‌ها را در یک آرایه (یا `localStorage`) نگه دارید و `#posts-list` را بر اساس آن رندر کنید.
- **حذف پست:** روی دکمه‌هایی با `data-action="delete"` گوش دهید و با استفاده از `data-post-id` روی همان کارت، آن را از DOM و از آرایه داده‌ها حذف کنید.
- **ویرایش پست:** روی دکمه‌هایی با `data-action="edit"` گوش دهید، مقادیر کارت مربوطه را داخل فرم بریزید و حالت فرم را به «حالت ویرایش» تغییر دهید.
- شمارنده `Posts (5)` در `#posts-count` باید بعد از هر افزودن/حذف به‌صورت پویا آپدیت شود.

---

## اجرای پروژه

هیچ نصب یا Build مورد نیاز نیست. کافی است فایل `index.html` را مستقیماً در مرورگر باز کنید:

```bash
# مثلاً با یک سرور محلی ساده (اختیاری)
npx serve .
```

یا صرفاً دابل‌کلیک روی `index.html`.

---

## نقشه راه (Roadmap)

- [ ] افزودن پست جدید با JavaScript
- [ ] ذخیره‌سازی پست‌ها در `localStorage`
- [ ] ویرایش پست‌های موجود
- [ ] حذف پست با تأیید (Confirm Modal)
- [ ] اعتبارسنجی فرم (Validation) پیش از ارسال
- [ ] حالت خالی (Empty State) پویا هنگام نبود پست

---

## لایسنس

این پروژه صرفاً جهت نمونه‌کار (Portfolio) و یادگیری طراحی شده است.
