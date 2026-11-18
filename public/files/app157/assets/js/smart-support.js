'use strict';
/* One rule engine shared by training and all project stages. No model or API. */
Lab.SmartSupportEngine = class SmartSupportEngine {
 static levels=['منخفض','متوسط','مرتفع'];
 static fresh(){return {phase:'diagnosis',passed:{},attempts:[],hintEvents:[],support:1,streak:0,draft:'',checks:[false,false,false],digitalText:'',complete:false,order:null,classification:[],feedback:null};}
 static assess(record,phase,correct,answer){
  const hints=record.hintEvents.filter(e=>e.phase===phase).length;
  const event={phase,correct,answer,hints,support:record.support,time:new Date().toISOString()};
  record.attempts.push(event);
  if(correct){record.streak++;record.support=Math.max(0,record.support-1);record.passed[phase]=true;}
  else{record.streak=0;record.support=Math.min(2,record.support+1);}
  return event;
 }
 static hint(record,skill,example=false){
  const count=record.hintEvents.filter(e=>e.phase===record.phase).length;
  const index=example?2:Math.min(count,2);
  record.hintEvents.push({phase:record.phase,index,time:new Date().toISOString()});
  record.support=Math.min(2,Math.max(record.support,index));
  return skill.hints[index];
 }
 static describe(record,skill){
  const failed=record.attempts.filter(e=>e.phase===record.phase&&!e.correct).length;
  const recent=record.hintEvents.filter(e=>e.phase===record.phase).at(-1);
  return {need:record.complete?'اكتملت الممارسة والمراجعة الذاتية. جرّب تطبيق الفكرة في درس فعلي.':record.phase==='diagnosis'?'نبدأ بمهمة قصيرة لتحديد نقطة انطلاقك.':failed?'نحتاج إلى مراجعة سبب القرار وربطه بهدف النشاط.':record.phase==='final'?'حوّل قرارك إلى تصميم مكتوب، وراجع جودته بنفسك أو مع المعلم.':'طبّق الفكرة في موقف جديد مع تقليل الاعتماد على المساعدة.',goal:skill.goal,hint:recent?skill.hints[recent.index]:'ابدأ بمحاولة مستقلة، ثم اطلب تلميحًا عند الحاجة.',level:this.levels[record.support]};
 }
 static project(project,stage){
  const issues=Lab.Project.issues(project,stage);
  const trials=project.stageAttempts[stage]||0;
  return {issues,level:issues.length?this.levels[Math.min(2,1+(trials>0?1:0))]:'منخفض',need:issues.length?issues[0]:'عناصر المرحلة متاحة. راجع جودتها قبل اعتمادها.',goal:Lab.Project.goals[stage],hint:issues.length?(trials>1?Lab.Project.examples[stage]:Lab.Project.hints[stage]):'انتقل إلى مرحلة جديدة؛ اكتمال العناصر لا يعني تلقائيًا إتقان المحتوى.'};
 }
};
