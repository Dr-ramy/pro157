# المكتبات والخطوط المرفقة

المكتبات نسخ محلية مثبتة؛ لا يجري تحميلها من CDN عند استخدام التطبيق.

| المكوّن | الإصدار | الوظيفة | الترخيص |
|---|---|---|---|
| Bootstrap RTL CSS | 5.3.3 | عناصر الواجهة العربية والتنسيق | MIT |
| Lucide UMD | 0.468.0 | الأيقونات | ISC |
| Chart.js UMD | 4.4.7 | رسوم البيانات ومؤشرات الموديولات | MIT |
| html2canvas | 1.4.1 | رسم الصفحات والملصق محليًا | MIT |
| html2pdf.js bundle | 0.10.2 | إنشاء PDF باستخدام jsPDF ومكوّناته | MIT والتراخيص المضمّنة |
| Tajawal Regular / Bold | من مستودع Google Fonts | خط عربي محلي | SIL Open Font License 1.1 |

نصوص تراخيص المكتبات في `assets/vendor/licenses/`. يحتوي `html2pdf-bundle-notices.txt` على إشعارات المكونات المتضمنة في الحزمة، ومنها jsPDF وما يعتمد عليه. ترخيص الخط موجود في `assets/fonts/OFL.txt`.

المصادر الأصلية:

- https://getbootstrap.com/
- https://lucide.dev/
- https://www.chartjs.org/
- https://html2canvas.hertzen.com/
- https://github.com/eKoopmans/html2pdf.js
- https://github.com/google/fonts/tree/main/ofl/tajawal

`jsdom 26.1.0` اعتماد تطوير اختياري للاختبارات فقط (MIT)، غير مضمن في ملفات تشغيل التطبيق ولا يُحمّل للمستخدم. قائمة الاعتماد في `tests/package.json`.

تم تنزيل الأصول أثناء التطوير. تتضمن الحزمة `CHECKSUMS.sha256` ببصمات ملفاتها للتحقق من سلامة النقل.
