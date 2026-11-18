"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGeminiChat, Message } from "@/hooks/useGeminiChat";
import { Image as ImageIcon, Video, Bot, User, Loader2, ExternalLink, ListTree, ChevronDown } from "lucide-react";

export type ChatMedia = {
  type: "image" | "youtube";
  url: string;
};

export type ExtendedMessage = Message & {
  media?: ChatMedia;
};

type GeminiChatModalProps = {
  trigger: React.ReactNode;
};

// 🏗️ 0. قائمة العناصر (المواضيع) التي ستظهر في القائمة المنسدلة
const TOPICS: { label: string; prompt: string }[] = [
  {
    label: "الأهداف التربوية",
    prompt:
      "اشرح لي مفهوم الأهداف التربوية ومستوياتها وأنواعها (المعرفية والمهارية والوجدانية)، وكيفية صياغتها سلوكيًا بطريقة صحيحة، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "التخطيط للتدريس",
    prompt:
      "اشرح لي مفهوم التخطيط للتدريس وأهميته وأنواعه (السنوي، الفصلي، واليومي)، موضحًا العناصر الأساسية لخطة الدرس الناجحة، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "تحليل المحتوى",
    prompt:
      "اشرح لي مفهوم تحليل المحتوى الدراسي وأهميته للمعلم، موضحًا خطواته ومكوناته الأساسية (الحقائق، المفاهيم، التعميمات، المهارات، والقيم)، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "عرض الدرس",
    prompt:
      "اشرح لي مهارة عرض الدرس، موضحًا خطوات التنفيذ الفعال، وكيفية تنظيم الأفكار، وتوظيف الأنشطة التعليمية لضمان تفاعل الطلاب، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "التهيئة والتمهيد للدرس",
    prompt:
      "اشرح لي مهارة التهيئة والتمهيد للدرس وأهميتها، موضحًا أنواع التهيئة (التوجيهية، الانتقالية، التقويمية) وأساليب تنفيذها لجذب انتباه الطلاب، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "التعزيز",
    prompt:
      "اشرح لي مفهوم التعزيز في العملية التعليمية وأهميته، موضحًا أنواعه (اللفظي، غير اللفظي، المادي، والمعنوي) وضوابط استخدامه بفعالية داخل الصف، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "استثارة الدافعية للتعلم",
    prompt:
      "اشرح لي مفهوم استثارة الدافعية للتعلم وأهميتها، موضحًا أبرز الاستراتيجيات والأساليب التي يستخدمها المعلم لتحفيز الطلاب وزيادة مشاركتهم، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "التنوع في طرق التدريس",
    prompt:
      "اشرح لي أهمية التنوع في طرق التدريس لمراعاة الفروق الفردية، موضحًا أبرز استراتيجيات التدريس الحديثة والنشطة وكيفية اختيار الطريقة المناسبة للدرس، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "استخدام الوسائل التعليمية",
    prompt:
      "اشرح لي مفهوم الوسائل التعليمية وتقنيات التعليم وأهميتها، موضحًا أنواعها ومعايير اختيارها وتوظيفها بفعالية أثناء شرح الدرس، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "طرح الأسئلة الصفية",
    prompt:
      "اشرح لي مهارة صياغة وطرح الأسئلة الصفية، موضحًا مستويات الأسئلة (التفكير الدنيا والعليا)، وآداب توجيهها وتلقي إجابات الطلاب، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "إدارة الصف",
    prompt:
      "اشرح لي مفهوم إدارة الصف وأهميتها في توفير بيئة تعليمية آمنة ومنظمة، موضحًا أبرز استراتيجيات ضبط الصف والتعامل مع المشكلات السلوكية، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "غلق الدرس",
    prompt:
      "اشرح لي مهارة غلق الدرس وأهميتها في تثبيت المعلومات، موضحًا أنواع الغلق (المراجعة، النقل) وأساليب إنهاء الحصة الدراسية بفعالية، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
  {
    label: "التقويم",
    prompt:
      "اشرح لي مفهوم التقويم التربوي والفرق بينه وبين القياس والتقييم، موضحًا أنواعه (القبلي، التكويني، الختامي) وأدواته المختلفة، واعرض لي صورة وفيديو يوضحان ذلك.",
  },
];

export default function GeminiChatModal({ trigger }: GeminiChatModalProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [input, setInput] = useState("");
  const [isFetchingMedia, setIsFetchingMedia] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { sendMessage, loading, error } = useGeminiChat();

  // 🏗️ 1. أوامر صارمة لمنع الروابط العشوائية وإجبار النموذج على الأكواد
  const base = useMemo(
    () =>
      `أنت معلم ومرشد ذكي. أجب باختصار وبدقة.
      🚨 أوامر صارمة جداً للنظام (System Instructions):
      1. ممنوع منعاً باتاً كتابة أي روابط إنترنت (URLs) حقيقية (مثل روابط يوتيوب أو ويكيبيديا) داخل إجابتك.
      2. إذا طلب الطالب "صورة" أو كان الشرح يحتاج صورة، اكتب فقط هذا الكود في سطر مستقل: [صورة: الكلمة المفتاحية للبحث]
      3. إذا طلب الطالب "فيديو" أو كان الشرح يحتاج فيديو، اكتب فقط هذا الكود في سطر مستقل: [فيديو: الكلمة المفتاحية للبحث]
      لا تقم بإضافة أي روابط فعلية، اكتفِ بالشرح واستخدام الأكواد أعلاه فقط.`,
    []
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isFetchingMedia]);

  // 🏗️ 2. تم تعديل الدالة لتقبل نص مخصص (customText) حتى تستخدمه القائمة المنسدلة
  // مباشرةً دون الحاجة لانتظار تحديث الـ state الخاص بحقل الإدخال (input)
  const handleSend = async (customText?: string) => {
    if (loading || isFetchingMedia) return;
    const trimmed = (customText ?? input).trim();
    if (!trimmed) return;

    const newUserMessage: ExtendedMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const systemMessage: Message = { sender: "system", text: base };
    const conversationForApi = [systemMessage, ...messages.slice(-10), newUserMessage];

    const reply = await sendMessage(conversationForApi);
    let finalReplyText = reply ?? "❌ تعذر الحصول على رد من المساعد.";
    let detectedMedia: ChatMedia | undefined = undefined;

    // محاولة اصطياد الأكواد المخفية
    const imageMatch = finalReplyText.match(/\[صورة:(.*?)\]/);
    const videoMatch = finalReplyText.match(/\[فيديو:(.*?)\]/);

    if (imageMatch || videoMatch) {
      setIsFetchingMedia(true);
      try {
        if (imageMatch) {
          const searchKeyword = imageMatch[1].trim();
          finalReplyText = finalReplyText.replace(imageMatch[0], "");
          // جلب مؤقت للصور (لاحقاً يمكنك تغييره للـ API الخاص بك)
          detectedMedia = { type: "image", url: `https://image.pollinations.ai/prompt/${encodeURIComponent(searchKeyword)}` };
        } else if (videoMatch) {
          const searchKeyword = videoMatch[1].trim();
          finalReplyText = finalReplyText.replace(videoMatch[0], "");
          // مؤقتاً نضع فيديو تعريفي، لاحقاً سنربطه بـ Youtube API
          detectedMedia = { type: "youtube", url: `dQw4w9WgXcQ` };
        }
      } catch (err) {
        console.error("خطأ في جلب الوسائط", err);
      } finally {
        setIsFetchingMedia(false);
      }
    }

    const aiMessage: ExtendedMessage = {
      sender: "ai",
      text: finalReplyText.trim(),
      media: detectedMedia,
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  // 🏗️ 3. دالة تُستدعى عند الضغط على أي عنصر من القائمة المنسدلة
  // تعمل بنفس آلية الإرسال العادية تماماً (نفس المسار الذي يمر به أي سؤال يكتبه المستخدم)
  const handleTopicClick = (prompt: string) => {
    if (loading || isFetchingMedia) return;
    handleSend(prompt);
  };

  // 🏗️ 4. دالة ذكية لتحويل أي رابط عشوائي يكتبه الـ AI إلى زر أزرق أنيق بدلاً من نص طويل مشوه
  const renderFormattedText = (text: string) => {
    // التقاط الروابط (Markdown أو العادية)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        // تنظيف الرابط من الأقواس الملتصقة به في الماركداون
        const cleanUrl = part.replace(/[)\]]+$/, '');
        return (
          <a
            key={i}
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md hover:underline break-all"
          >
            <ExternalLink size={14} />
            رابط خارجي
          </a>
        );
      }
      return <span key={i}>{part.replace(/[\[\]()]/g, '') /* تنظيف أقواس الماركداون العشوائية */}</span>;
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setInput(""); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* 🏗️ 5. تكبير العرض ليصبح max-w-5xl بدلاً من max-w-3xl */}
      <DialogContent dir="rtl" className="w-[95vw] max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden shadow-2xl border-none z-[99999]">

        <DialogHeader className="p-4 border-b bg-slate-50 flex flex-row items-center justify-between gap-3">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-indigo-700">
            <Bot className="w-6 h-6" />
            المعلم الذكي
          </DialogTitle>

          {/* 🏗️ 6. القائمة المنسدلة الجديدة: تحتوي على الـ 5 عناصر */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                disabled={loading || isFetchingMedia}
                className="h-10 gap-2 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold"
              >
                <ListTree className="w-4 h-4" />
                اختر موضوعاً
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 z-[999999] text-right"
              style={{ direction: "rtl" }}
            >
              {TOPICS.map((topic, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={() => handleTopicClick(topic.prompt)}
                  className="whitespace-normal leading-relaxed py-2 cursor-pointer justify-end text-right"
                >
                  {topic.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>

        <div ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-100/50">

          {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
               <Bot className="w-16 h-16 opacity-50" />
               <p className="text-lg">مرحباً! اسألني أي شيء، أو اختر موضوعاً من القائمة أعلاه، أو اطلب مني صورة أو فيديو للتوضيح.</p>
             </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === "user" ? "flex-row" : "flex-row-reverse"}`}>

              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-blue-100 text-blue-600" : "bg-indigo-100 text-indigo-600"}`}>
                {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"}`}>

                <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px]">
                  {msg.sender === "ai" ? renderFormattedText(msg.text) : msg.text}
                </p>

                {msg.media?.type === "image" && (
                  <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={msg.media.url} alt="محتوى تعليمي" className="w-full h-auto object-cover max-h-72" />
                  </div>
                )}

                {msg.media?.type === "youtube" && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-slate-200 relative pt-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${msg.media.url}`}
                      title="فيديو تعليمي"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {(loading || isFetchingMedia) && (
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Bot size={18} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-none flex items-center gap-3 text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">
                  {isFetchingMedia ? "جاري جلب الوسائط المرئية..." : "يحلل البيانات..."}
                </span>
              </div>
            </div>
          )}
          {error && <p className="text-red-500 text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}
        </div>

        <div className="p-4 bg-white border-t flex gap-3">
          <Input
            className="flex-1 h-12 text-base bg-slate-50 border-slate-200 focus-visible:ring-indigo-500 rounded-xl"
            placeholder="مثال: اشرح لي الجاذبية واعرض لي فيديو يوضحها..."
            value={input}
            disabled={loading || isFetchingMedia}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={() => handleSend()}
            disabled={loading || isFetchingMedia || !input.trim()}
            className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md transition-all active:scale-95"
          >
            إرسال
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}