'use strict';
Lab.Assessment={
 skill(id){
  const r=Lab.state.skills[id]; if(!r)return {practiced:false,complete:false,attempts:0,score:null,progress:0,independence:null,support:'—'};
  const phases=['diagnosis','practice','transfer'];const first=phases.map(p=>r.attempts.find(a=>a.phase===p)).filter(Boolean);
  return {practiced:r.attempts.length>0,complete:r.complete,attempts:r.attempts.length,score:first.length?Math.round(100*first.filter(a=>a.correct).length/first.length):null,
   progress:r.complete?100:Math.round(25*(!!first.find(a=>a.phase==='diagnosis')+!!r.passed.practice+!!r.passed.transfer)),
   independence:first.length?Math.round(100*first.filter(a=>a.correct&&!a.hints).length/first.length):null,
   support:Lab.SmartSupportEngine.levels[r.support],hints:r.hintEvents.length};
 },
 summary(){const rows=Lab.skills.map(s=>this.skill(s.id));const practiced=rows.filter(r=>r.practiced);const events=Object.values(Lab.state.skills).flatMap(r=>['diagnosis','practice','transfer'].map(p=>r.attempts.find(a=>a.phase===p)).filter(Boolean));
 return {practiced:practiced.length,complete:rows.filter(r=>r.complete).length,attempts:rows.reduce((n,r)=>n+r.attempts,0),objective:events.length?Math.round(100*events.filter(e=>e.correct).length/events.length):null,independence:events.length?Math.round(100*events.filter(e=>e.correct&&!e.hints).length/events.length):null,needs:Lab.skills.filter(s=>{const r=this.skill(s.id);return r.practiced&&(r.score<67||!r.complete);})};},
 digital(){
  const evidence=Object.fromEntries(Lab.digitalSkills.map(([id])=>[id,[]]));
  Lab.skills.forEach(s=>{const r=Lab.state.skills[s.id];if(r?.complete&&r.digitalText.trim().length>=25)(s.digital||[]).forEach(id=>evidence[id].push('مهمة مكتوبة ومراجعة ذاتية: '+s.title));});
  const p=Lab.state.project;const valid=i=>p.completed.includes(i)&&Lab.Project.issues(p,i).length===0;
  if(valid(2)){evidence.search.push('توثيق مسار بحث ومعلومات ومصادر');evidence.verify.push('تسجيل فحوص المصدر ومبررات ملاءمته');}
  if(valid(3))evidence.data.push('تنظيم بيانات مرتبطة بمصادر وتفسيرها');
  if(valid(4))evidence.create.push('إنشاء منتج رقمي ومعاينته');
  if(valid(4)&&p.blocks.some(b=>b.type==='image'))evidence.media.push('إدراج صورة مع وصف ومصدر');
  if(valid(5))evidence.present.push('إعداد ملخص عرض وإجابات مناقشة');
  if(valid(6))evidence.assess.push('إتمام بطاقة تقدير يدوية مع أدلة');
  return Lab.digitalSkills.map(([id,title])=>({id,title,evidence:evidence[id],practiced:evidence[id].length>0}));
 },
 recommendations(){const a=this.summary();if(!a.practiced)return ['ابدأ بالتشخيص في إحدى المهارات لبناء توصيات من أدائك الفعلي.'];const list=a.needs.map(s=>'أعد ممارسة «'+s.title+'» وراجع تفسير القرارات قبل تقليل الدعم.');if(a.independence<67)list.push('استخدم التلميحات عند الحاجة، ثم أعد التطبيق في مهمة مستقلة.');if(!list.length)list.push('انقل ما تدربت عليه إلى درس فعلي واطلب مراجعة زميل لخطة التدريس.');return list;}
};
