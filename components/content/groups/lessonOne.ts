import type { ButtonItem } from "@/components/content/mainitems/types";

export const lessonOne = {
  items: <ButtonItem[]>
[
    //عشان تضيف فيديو من اليوتيوب خد الرابط من embed
    { type: "button", id: "1vid0", text: "الأهداف ", icon: "intro", time: "" },
    { type: "button", id: "1act1", text: " الاختبار القبلي", icon: "activity" },
    { type: "button", id: "1act2", text: "نشاط  ", icon: "activity" },
    { type: "button", id: "1vid1", text: " الأهداف التعليمية  ", icon: "video" },
    { type: "button", id: "1vid2", text: "  مستويات الأهداف التعليمية ", icon: "video" },
    { type: "button", id: "1vid3", text: "  مصادر اشتقاق الأهداف ", icon: "video" },
    { type: "button", id: "1vid4", text: "  أهمية تحديد الأهداف ", icon: "video" },
    { type: "button", id: "1vid5", text: "  الأهداف السلوكية ", icon: "video" },
    { type: "button", id: "1vid6", text: "   نمط ميجر الخماسي", icon: "video" },
    { type: "button", id: "1vid7", text: "   شروط صياغة الهدف", icon: "video" },
    { type: "button", id: "1vid8", text: " الأخطاء الشائعة  ", icon: "video" },
    { type: "button", id: "1vid9", text: "  تصنيف الأهداف التعليمية ", icon: "video" },
    { type: "button", id: "1vid10", text: " تصنيف بلوم  ", icon: "video" },
    { type: "button", id: "1vid1", text: "   الأهداف الوجدانية", icon: "video" },
    { type: "button", id: "1vid12", text: "  الأهداف المهارية ", icon: "video" },
    { type: "button", id: "1act3", text: " التقويم ", icon: "activity" },

    //{ type: "modal", id: "yt-lesson1", text: "دورة الماء في الطبيعة ", icon: "intro" },
],

  videoMap: 
  {
    "1vid0": "  /videos/vid1/vid0.mp4    ",
    "1vid1": "  /videos/vid1/vid1.mp4    ",
    "1vid2": "  /videos/vid1/vid2.mp4    ",
    "1vid3": "  /videos/vid1/vid3.mp4    ",
    "1vid4": "  /videos/vid1/vid4.mp4    ",
    "1vid5": "  /videos/vid1/vid5.mp4    ",
    "1vid6": "  /videos/vid1/vid6.mp4    ",
    "1vid7": "  /videos/vid1/vid7.mp4    ",
    "1vid8": "  /videos/vid1/vid8.mp4    ",
    "1vid9": "  /videos/vid1/vid9.mp4    ",
    "1vid10": " /videos/vid1/vid10.mp4   ",
    "1vid11": " /videos/vid1/vid11.mp4   ",
    "1vid12": " /videos/vid1/vid12.mp4   ",
    "1vid13": " /videos/vid1/vid13.mp4   ",
    "1vid14": " /videos/vid1/vid14.mp4   ",
    "1vid15": " /videos/vid1/vid15.mp4   ",
    "1vid16": " /videos/vid1/vid16.mp4   ",
  },

formLinks: {
  "1act1":  "https://forms.gle/M9aQw4Ehqp3xN5bm6 ",
  "1act2":  "https://forms.gle/vHoF6s9TArwEoq3M9 ",
  "1act3":  "https://forms.gle/dq7LswSowcTFoEXq8 ",
  "1act4":  " ",
  "1act5":  " ",
  "1act6":  " ",
  "1act7":  " ",
  "1act8":  " ",
  "1act9":  "",
  "1act10": "",
  "1act11": "",
  "1act12": "",
  "1act13": "",
  "1act14": "",
},

}