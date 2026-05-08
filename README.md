<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LearnX - All in One</title>
  <style>
    /* CSS Styles from style.css */
    :root{
      --bg: #0f172a; --panel: #111827; --muted: #64748b; --text: #e5e7eb;
      --accent: #61dafb; --accent-2: #22c55e; --danger: #ef4444;
      --card: #0b1220; --border: #1f2937; --shadow: 0 10px 30px rgba(0,0,0,.35);
    }
    *{ box-sizing: border-box; }
    html, body{
      margin:0; padding:0; background:var(--bg); color:var(--text);
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      line-height:1.5;
    }
    a{ color:var(--accent); text-decoration:none; cursor: pointer; }
    .navbar{
      position: sticky; top:0; z-index:1000;
      display:flex; align-items:center; justify-content:space-between;
      padding: .8rem 1rem; background: linear-gradient(90deg, #0d1528, #0f172a);
      border-bottom:1px solid var(--border);
    }
    .logo{ font-weight:800; letter-spacing:.5px; color:var(--accent); }
    .tabs{ display:flex; gap:.5rem; flex-wrap:wrap; }
    .tab{
      color:var(--text); padding:.45rem .8rem; border-radius:8px;
      transition: background .2s, color .2s;
    }
    .tab:hover{ background:#162036; }
    .tab.active{ background:var(--accent); color:#0b1220; font-weight:700; }
    .container{ max-width:1100px; margin:0 auto; padding:1.25rem; }
    .grid{ display:grid; gap:1rem; }
    .grid-3{ grid-template-columns: repeat(3, 1fr); }
    .card{ background: var(--card); border:1px solid var(--border); border-radius:14px; padding:1rem; box-shadow: var(--shadow); }
    .hero{ display:grid; gap:1rem; grid-template-columns: 1.4fr .6fr; align-items:center; }
    .btn{
      display:inline-flex; align-items:center; gap:.5rem; background: var(--accent); color:#0b1220;
      padding:.6rem 1rem; border-radius:10px; font-weight:700; border:none; cursor:pointer;
    }
    .btn.secondary{ background:#1f2937; color:var(--text); border:1px solid var(--border); }
    .btn.success{ background:var(--accent-2); color:#052d15; }
    .stats{ display:flex; gap:1rem; flex-wrap:wrap; }
    .stat{ flex:1 1 200px; background:#0c1426; border:1px solid var(--border); padding:1rem; border-radius:12px; }
    .progress{ background:#0c1426; border:1px solid var(--border); border-radius:999px; overflow:hidden; height:14px; }
    .progress .bar{ background: linear-gradient(90deg, var(--accent), #89f7ff); width:0%; height:100%; transition: width .35s ease; }
    .lesson-layout{ display:grid; grid-template-columns: 260px 1fr; gap:1rem; }
    .sidebar{ background:#0c1426; border:1px solid var(--border); border-radius:12px; padding:.75rem; max-height:70vh; overflow:auto; }
    .side-link{ display:block; padding:.5rem .6rem; border-radius:8px; color:#cbd5e1; margin-bottom: 2px; }
    .side-link.active{ background:#14203a; color:#fff; font-weight:700; }
    textarea.code{ width:100%; height:180px; background:#071022; color:#e2e8f0; border:1px solid var(--border); border-radius:10px; padding:.75rem; font-family: monospace; }
    iframe.preview{ width:100%; height:200px; background:#fff; border-radius:10px; border:none; margin-top: 10px; }
    .q-card{ background:var(--card); border:1px solid var(--border); border-radius:12px; padding:1rem; margin-bottom:.75rem; }
    .quiz-option{ display:block; margin:.35rem 0; padding:.5rem; border:1px solid var(--border); border-radius:8px; background:#0c1426; cursor:pointer; }
    .drag-container{ display:flex; gap:.6rem; flex-wrap:wrap; padding:.5rem; min-height: 50px; }
    .draggable{ padding:.45rem .7rem; background:#0c1426; border:1px solid var(--border); border-radius:8px; cursor:grab; }
    .dropzone{ min-height:150px; background:#0c1426; border:2px dashed #2b3548; border-radius:10px; padding:.75rem; }
    .dropzone.correct{ border-color: var(--accent-2); background: #0f1f15; }
    .dropzone.incorrect{ border-color: var(--danger); background: #1b0f12; }
    .footer{ color:#8b9bb5; text-align:center; padding:2rem 1rem; border-top:1px solid var(--border); margin-top:2rem; }
    
    /* Routing Logic CSS */
    .page-section { display: none; }
    .page-section.active { display: block; }
    @media (max-width: 900px){ .grid-3, .hero, .lesson-layout{ grid-template-columns:1fr; } }
  </style>
</head>
<body>

  <header class="navbar">
    <div class="logo">LearnX</div>
    <nav class="tabs">
      <a onclick="showPage('home')" class="tab" id="tab-home">Home</a>
      <a onclick="showPage('lessons')" class="tab" id="tab-lessons">Lessons</a>
      <a onclick="showPage('quiz')" class="tab" id="tab-quiz">Quiz</a>
      <a onclick="showPage('games')" class="tab" id="tab-games">Games</a>
    </nav>
  </header>

  <main class="container">
    <section id="home" class="page-section active">
      <div class="hero card">
        <div>
          <h1>Learn by Doing</h1>
          <p>Interactive lessons, quizzes, and mini‑games. Your progress and XP are saved locally.</p>
          <div class="stats">
            <div class="stat"><div class="label">XP</div><div class="value" data-stat="xp">0</div></div>
            <div class="stat"><div class="label">Streak</div><div class="value" data-stat="streak">0</div></div>
          </div>
          <div style="margin-top:1rem;">
            <button class="btn" onclick="showPage('lessons')">Start Lessons →</button>
            <button class="btn secondary" onclick="showPage('quiz')">Take a Quiz</button>
          </div>
        </div>
        <div class="card">
          <h3>What you’ll get</h3>
          <ul>
            <li>“Try it Yourself” editor</li>
            <li>Progress + XP tracking</li>
            <li>Randomized quizzes</li>
          </ul>
        </div>
      </div>
      <div class="grid grid-3" style="margin-top:1rem;">
        <div class="card"><h3>HTML & CSS</h3><a class="btn" onclick="goToLesson('HTML','intro')">Open Path</a></div>
        <div class="card"><h3>JavaScript</h3><a class="btn" onclick="goToLesson('JavaScript','variables')">Open Path</a></div>
        <div class="card"><h3>Python</h3><a class="btn" onclick="goToLesson('Python','hello')">Open Path</a></div>
      </div>
    </section>

    <section id="lessons" class="page-section">
      <div class="card" style="margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>Lesson Progress</strong>
          <span id="progressText" style="color:#8aa1bf;">0%</span>
        </div>
        <div class="progress"><div class="bar" id="progressBar" style="width:0%"></div></div>
      </div>
      <div class="lesson-layout">
        <aside class="sidebar" id="sidebar"></aside>
        <div class="card">
          <h2 id="lessonTitle">Lesson</h2>
          <div id="lessonContent"></div>
          <div class="editor" id="editorWrap" style="margin-top:1rem;">
            <textarea id="codeArea" class="code"></textarea>
            <div style="display:flex; gap:.5rem; margin-top:10px;">
              <button class="btn" id="runBtn">Run ▶</button>
              <button class="btn success" id="completeBtn">Mark Complete ✓</button>
            </div>
            <iframe id="preview" class="preview"></iframe>
          </div>
        </div>
      </div>
    </section>

    <section id="quiz" class="page-section">
      <div class="quiz-container">
        <h1>Random Quiz</h1>
        <div id="quiz-content"></div>
        <div style="display:flex; gap:.5rem; margin-top:1rem;">
          <button class="btn" id="submitQuiz">Submit</button>
          <button class="btn secondary" onclick="initQuiz()">Shuffle Again</button>
        </div>
        <p id="quiz-result" style="font-weight:700;"></p>
      </div>
    </section>

    <section id="games" class="page-section">
      <div class="card">
        <h2>HTML Tag Order</h2>
        <p>Drag tags into the dropzone to form a valid HTML document.</p>
        <div class="drag-container" id="tags-pool"></div>
        <h3>Drop Here</h3>
        <div class="dropzone" id="dropzone"></div>
        <div style="display:flex; gap:.5rem; margin-top:.75rem;">
          <button class="btn" id="checkGameBtn">Check Order</button>
          <button class="btn secondary" id="resetGameBtn">Reset</button>
        </div>
        <p id="gameResult" style="font-weight:700;"></p>
      </div>
    </section>
  </main>

  <footer class="footer">Built for practice and progress.</footer>

  <script>
    /* MAIN LOGIC (main.js) */
    const STATE_KEY = 'learnx.state';
    const PROG_KEY  = 'learnx.progress';

    window.LearnX = {
      getState() { return JSON.parse(localStorage.getItem(STATE_KEY)) || { xp: 0, streak: 0, lastActive: null }; },
      setState(s) { localStorage.setItem(STATE_KEY, JSON.stringify(s)); this.renderStats(); },
      getProgress() { return JSON.parse(localStorage.getItem(PROG_KEY)) || { lessons: {}, quiz: {}, games: {} }; },
      setProgress(p) { localStorage.setItem(PROG_KEY, JSON.stringify(p)); },
      addXP(amt) { let s = this.getState(); s.xp += amt; this.setState(s); },
      renderStats() {
        const s = this.getState();
        document.querySelectorAll('[data-stat="xp"]').forEach(el => el.textContent = s.xp);
        document.querySelectorAll('[data-stat="streak"]').forEach(el => el.textContent = s.streak);
      }
    };

    /* ROUTING */
    function showPage(pageId) {
      document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
      document.getElementById('tab-' + pageId).classList.add('active');
      if(pageId === 'quiz') initQuiz();
      if(pageId === 'games') initGame();
    }

    /* LESSONS LOGIC (lessons.js) */
    const Curriculum = {
      HTML: [{ slug:'intro', title:'HTML Intro', content:'<p>HTML structures content.</p>', starter:'<h1>Hello World</h1>' }],
      JavaScript: [{ slug:'variables', title:'Variables', content:'<p>Use let and const.</p>', starter:'<script>console.log("Hi");</\script>' }],
      Python: [{ slug:'hello', title:'Hello World', content:'<p>Python Simulation.</p>', starter:'print("Hello World")' }]
    };

    let curLang = 'HTML', curSlug = 'intro';

    function buildSidebar() {
      const side = document.getElementById('sidebar'); side.innerHTML = '';
      for (let lang in Curriculum) {
        const h = document.createElement('h3'); h.textContent = lang; side.appendChild(h);
        Curriculum[lang].forEach(l => {
          const a = document.createElement('a'); a.className = 'side-link' + (l.slug===curSlug?' active':'');
          a.textContent = l.title; a.onclick = () => { curLang=lang; curSlug=l.slug; renderLesson(); buildSidebar(); };
          side.appendChild(a);
        });
      }
    }

    function renderLesson() {
      const lesson = Curriculum[curLang].find(x=>x.slug===curSlug);
      document.getElementById('lessonTitle').textContent = curLang + ' • ' + lesson.title;
      document.getElementById('lessonContent').innerHTML = lesson.content;
      document.getElementById('codeArea').value = lesson.starter;
      document.getElementById('preview').srcdoc = lesson.starter;
      updateProgress();
    }

    function updateProgress() {
      const p = LearnX.getProgress();
      const done = p.lessons[curLang] ? Object.keys(p.lessons[curLang]).length : 0;
      const pct = Math.round((done / Curriculum[curLang].length) * 100);
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('progressText').textContent = pct + '%';
    }

    document.getElementById('runBtn').onclick = () => {
      document.getElementById('preview').srcdoc = document.getElementById('codeArea').value;
    };

    document.getElementById('completeBtn').onclick = () => {
      let p = LearnX.getProgress();
      if(!p.lessons[curLang]) p.lessons[curLang] = {};
      if(!p.lessons[curLang][curSlug]) {
        p.lessons[curLang][curSlug] = true;
        LearnX.setProgress(p);
        LearnX.addXP(15);
        updateProgress();
      }
    };

    function goToLesson(lang, slug) { curLang = lang; curSlug = slug; showPage('lessons'); renderLesson(); buildSidebar(); }

    /* QUIZ LOGIC (quiz.js) */
    const quizPool = [
      { q:'Which tag defines a paragraph?', options:['<p>','<h1>','<div>'], answer:0 },
      { q:'CSS property for text color?', options:['font-style','color','background'], answer:1 },
      { q:'Python function keyword:', options:['function','func','def'], answer:2 }
    ];

    function initQuiz() {
      const cont = document.getElementById('quiz-content'); cont.innerHTML = '';
      quizPool.forEach((q, i) => {
        const div = document.createElement('div'); div.className = 'q-card';
        div.innerHTML = `<p><strong>${i+1}.</strong> ${q.q}</p>` + q.options.map((o, idx) => 
          `<label class="quiz-option"><input type="radio" name="q${i}" value="${idx}"> ${o}</label>`).join('');
        cont.appendChild(div);
      });
      document.getElementById('quiz-result').textContent = '';
      document.getElementById('submitQuiz').disabled = false;
    }

    document.getElementById('submitQuiz').onclick = () => {
      let score = 0;
      quizPool.forEach((q, i) => {
        const sel = document.querySelector(`input[name="q${i}"]:checked`);
        if(sel && parseInt(sel.value) === q.answer) score++;
      });
      document.getElementById('quiz-result').textContent = `Score: ${score}/${quizPool.length}`;
      LearnX.addXP(score * 10);
      document.getElementById('submitQuiz').disabled = true;
    };

    /* GAME LOGIC (games.js) */
    const seq = ['<!DOCTYPE html>', '<html>', '<head>', '</head>', '<body>', '</body>', '</html>'];
    let dragged = null;

    function initGame() {
      const pool = document.getElementById('tags-pool'); pool.innerHTML = '';
      document.getElementById('dropzone').innerHTML = '';
      [...seq].sort(()=>Math.random()-0.5).forEach(t => {
        const d = document.createElement('div'); d.className = 'draggable'; d.draggable = true;
        d.textContent = t; d.ondragstart = () => dragged = d;
        pool.appendChild(d);
      });
    }

    const dz = document.getElementById('dropzone');
    dz.ondragover = e => e.preventDefault();
    dz.ondrop = () => { if(dragged) dz.appendChild(dragged); dragged = null; };

    document.getElementById('checkGameBtn').onclick = () => {
      const res = Array.from(dz.children).map(c => c.textContent);
      const win = JSON.stringify(res) === JSON.stringify(seq);
      const msg = document.getElementById('gameResult');
      msg.textContent = win ? "Perfect! +20 XP" : "Try again!";
      msg.style.color = win ? "#22c55e" : "#ef4444";
      if(win) LearnX.addXP(20);
    };
    document.getElementById('resetGameBtn').onclick = initGame;

    /* INIT */
    document.addEventListener('DOMContentLoaded', () => {
      LearnX.renderStats();
      buildSidebar();
      renderLesson();
    });
  </script>
</body>
</html>
