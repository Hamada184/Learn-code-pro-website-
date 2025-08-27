// Core state and utilities for LearnX (XP, streaks, progress)
(function(){
  const STATE_KEY = 'learnx.state';
  const PROG_KEY  = 'learnx.progress';

  // state: xp, streak, lastActive
  const defaultState = { xp: 0, streak: 0, lastActive: null };
  const defaultProgress = {
    lessons: {},   // { HTML: {slug:true}, CSS: {slug:true}, ... }
    quiz: { completed:false, bestScore:0 },
    games: { tagOrder:false }
  };

  function getState(){ return JSON.parse(localStorage.getItem(STATE_KEY)) || {...defaultState}; }
  function setState(s){ localStorage.setItem(STATE_KEY, JSON.stringify(s)); }
  function getProgress(){ return JSON.parse(localStorage.getItem(PROG_KEY)) || JSON.parse(JSON.stringify(defaultProgress)); }
  function setProgress(p){ localStorage.setItem(PROG_KEY, JSON.stringify(p)); }

  // Streak logic (daily)
  function updateStreak(){
    const s = getState();
    const today = new Date().toDateString();
    if (s.lastActive !== today){
      const y = new Date(); y.setDate(y.getDate()-1);
      s.streak = (s.lastActive === y.toDateString()) ? (s.streak+1) : 1;
      s.lastActive = today;
      setState(s);
    }
  }

  function addXP(amount){
    const s = getState();
    s.xp += amount;
    setState(s);
    renderHeaderStats();
  }

  function renderHeaderStats(){
    // Update any stat placeholders present on page
    const s = getState();
    const xpEl = document.querySelector('[data-stat="xp"]');
    const stEl = document.querySelector('[data-stat="streak"]');
    if (xpEl) xpEl.textContent = s.xp;
    if (stEl) stEl.textContent = s.streak;
  }

  function markLessonComplete(lang, slug){
    const p = getProgress();
    p.lessons[lang] = p.lessons[lang] || {};
    if (!p.lessons[lang][slug]){
      p.lessons[lang][slug] = true;
      setProgress(p);
      addXP(15); // reward per lesson completion
    }
  }

  function markQuizComplete(score, total){
    const p = getProgress();
    const pct = total ? Math.round((score/total)*100) : 0;
    p.quiz.completed = true;
    p.quiz.bestScore = Math.max(p.quiz.bestScore || 0, pct);
    setProgress(p);
    addXP(score * 10);
  }

  function markGameComplete(name){
    const p = getProgress();
    p.games[name] = true;
    setProgress(p);
    addXP(20);
  }

  function setActiveTab(){
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.tabs .tab').forEach(a=>{
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === path);
    });
  }

  // Expose for other scripts
  window.LearnX = {
    getState, setState, getProgress, setProgress,
    addXP, markLessonComplete, markQuizComplete, markGameComplete
  };

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    updateStreak();
    renderHeaderStats();
    setActiveTab();
  });
})();