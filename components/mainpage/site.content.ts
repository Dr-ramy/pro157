export type HomeVariant = "classic" | "news";

/**
 * Content blocks supported by ContentSection renderer
 */
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "divider" }
  | { type: "link"; label: string; href: string; external?: boolean }
  | {
      type: "callout";
      variant?: "info" | "warning" | "success";
      title?: string;
      text: string;
    };

export type ContentCard =
  | {
      id: "authors" | "intro" | "goals" | "content";
      title: string;
      collapsible: boolean;
      /**
       * New (recommended): structured blocks
       */
      blocks: ContentBlock[];
      /**
       * Legacy (optional): keep for backward-compatibility while migrating
       */
      lines?: string[];
    }
  | {
      id: string; // allow future cards without changing types
      title: string;
      collapsible: boolean;
      blocks: ContentBlock[];
      lines?: string[];
    };

export const siteContent = {
  home: {
    variant: "classic" as HomeVariant,

    layout:
      {
        backgroundClass: "bg-background",
        // أمثلة:
        // "bg-muted"
        // "bg-slate-50"
        // "bg-gradient-to-b from-background to-muted"
        // "bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]"
        // "bg-zinc-900 text-zinc-100"
      },

    social:
      {
        facebook: "https://www.facebook.com/yourpage",
        whatsapp: "https://wa.me/1234567890",
      },

    labels:
      {
        login: "تسجيل الدخول",
        admin: "لوحة المشرف",
        profile: "الملف الشخصي",
        logout: "خروج",
        more: "المزيد",
        less: "إخفاء",
      },

    // أقسام الصفحة وروابطها
    sections:
      [
        { id: "authors", label: "المؤلفون" },
        { id: "intro", label: "مقدمة" },
        { id: "goals", label: "الأهداف" },
        { id: "content", label: "المحتوى" },
      ],

    title:   " برنامج تدريبي قائم على الدعم التعليمي الذكي لتنمية الأداء الأكاديمي والمهارات الرقمية لدى معلمي الجغرافيا بالمرحلة الإعدادية في العراق ",

    contentCards: [
      {
        id: "authors",
        title: "المؤلفون",
        collapsible: false,

        // ✅ Structured blocks
        blocks: [
          { type: "paragraph", text: "اعداد/ إسماعيل سعد إسماعيل " },
          { type: "divider" },

          { type: "subheading", text: "الإشراف" },
          { type: "paragraph", text: "أ.د/ أماني على السيد رجب  " },
          { type: "paragraph", text: " أستاذ المناهج وطرق تدريس الدراسات الاجتماعية ورئيس القسم" },
          { type: "paragraph", text: "كلية التربية – جامعة المنصورة" },

          { type: "divider" },

          { type: "paragraph", text: "د/ أميرة عزت محمود عبد العزيز " },
          { type: "paragraph", text: "مدرس المناهج وطرق تدريس الدراسات الاجتماعية" },
          { type: "paragraph", text: "كلية التربية – جامعة المنصورة" },

        ],
      },

{
  id: "intro",
  title: "مقدمة",
  collapsible: true,
  blocks: [
    {
      type: "paragraph",
      text: `شهد العالم تطورًا هائلًا وسريعًا في مجال تكنولوجيا المعلومات والاتصالات والذي أحدث تحولات جذرية في ميدان التعليم والتعلم، غير أن استخدام مواقع الويب التفاعلية مع الذكاء الاصطناعي خاصة شكل أهمية خاصة كمكون أساسي وحيوي في هذا المجال؛ حيث أتاح إمكانيات متقدمة وفريدة، ساهمت بشكل فاعل في تحول عميق لعمليات التعليم والتعلم وتحسين جودته، وذلك لما تحققه من اتاحة أقصى درجات التفاعل بين المحتوى والمتعلم، مما يسهم في رفع كفاءة العملية التعليمية وتحقيق الأهداف المرجوة، ويعد الدعم التعليمي الذكي أحد المكونات الأساسية في جميع نظم التعليم والتعلم الإلكتروني والتقليدي
والتوجهات الحديثة للتدريس تلغي ما كان سائدًا عنه قديمًا، فلم تعد عملية نقل المعلومات هي المهمة الوحيدة للتدريس، ولكنه نشاط مخطط يهدف إلى تحقيق نواتج تعليمية مرغوبة لدى المتعلمين، ففي الوقت الذي يعيش فيه المتعلم في عالم كسرت فيه حواجز المعرفة، وحتى نجعل التعليم يواكب الركب الحضاري، والتنافس التقني، وعالمية المعرفة، فلابد أن نبحث عن نوع جديد من التدريس يكون الإنجاز لدى المتعلم محققًا للمهارات التي يتطلبها هذا العصر، والدعم التعليمي الذكي الذي يقدم من خلال نظم ذكية قائمة على الذكاء الاصطناعي يمكن أن يكون محققًا لهذا.`
    }

  ]
},
{
  id: "goals",
  title: "الأهداف",
  collapsible: true,
  blocks: [
    { type: "subheading", text: "الأهداف العامة " },
    {
  type: "bullets",
  items: [
  "يهدف البرنامج إلى تنمية الأداء الأكاديمي والمهارات الرقمية لدى معلمي الجغرافيا بالعراق."
]

    },
    { type: "divider" },
    { type: "subheading", text: "الأهداف الخاصة" },
    {
      type: "numbered",
      items: [
        "تنمية مهارات إعداد الأهداف التعليمة بطريقة إبداعية في مادة الجغرافيا.",
        "تنمية مهارات تخطيط الدرس في مادة الجغرافيا",
        "تنمية مهارات التحليل لمحتوى الدرس في مادة الجغرافيا.",
        "تنمية مهارات التهيئة الإبداعية والتمهيد للدرس في مادة الجغرافيا.",
        "تنمية مهارات التعزيز في عملية تدريس الجغرافيا.",
        "تنمية مهارات استثارة الدافعية في عملية تدريس الجغرافيا.",
        "تنمية مهارات انتقاء طريقة التدريس المناسبة لمحتوى الدرس في مادة الجغرافيا.",
        "تنمية مهارات تحديد واختيار الوسيلة التعليمية المناسبة لتدريس الجغرافيا.",
        "تنمية مهارات إعداد وصياغة الأسئلة الصفية في مادة الجغرافيا.",
        "تنمية مهارات إدارة الصف بطريقة إبداعية.",
        "تنمية مهارات تقويم المحتوى في مادة الجغرافيا.",
        "تنمية مهارات الإعداد النهائي للدرس التكنولوجي وتنفيذه في الجغرافيا.",
        "تنمية الأداء الأكاديمي لمعلمي الجغرافيا بالعراق وأثره على طلابهم.",
        "تنمية المهارات الرقمية لدى معلمي الجغرافيا بالعراق وأثره على طلابهم."
      ],

    },
  ],
}, 
{
  id: "content",
  title: "المحتوى",
  collapsible: false,


  blocks: [
    {
      type: "subheading",
      text: "الموديول الأول: مهارات تخطيط الدرس"
    },
    {
      type: "bullets",
      items: [
        "الأول: الأهداف التربوية",
        "الثاني: التخطيط للتدريس",
        "الثالث: تحليل المحتوى"
      ],
    },

    { type: "divider" },

    {
      type: "subheading",
      text: "الوحدة الثانية: مهارات تنفيذ الدرس"
    },
    {
      type: "bullets",
      items: [
        "الرابع: عرض الدرس",
        "الخامس: التهيئة والتمهيد للدرس",
        "السادس: التعزيز",
        "السابع: استثارة الدافعية للتعلم",
        "الثامن: التنوع في طرق التدريس",
        "التاسع: استخدام الوسائل التعليمية",
        "العاشر: طرح الأسئلة الصفية",
        "الحادي عشر: إدارة الصف",
        "الثاني عشر: غلق الدرس"
      ],
    },

    { type: "divider" },

    {
      type: "subheading",
      text: "الموديول الثالث: التقويم"
    },
    {
      type: "bullets",
      items: [
        "الثالث عشر: التقويم"
      ],
    },


  ],
},
    ] satisfies ContentCard[],
  },

} as const;
