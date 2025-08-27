// Lessons data + rendering (supports multiple languages)
(function(){
  // Minimal sample curriculum (expand freely)
  const Curriculum = {
    HTML: [
      { slug:'intro', title:'HTML Intro', type:'html',
        content:`<p>HTML structures content with elements like headings, paragraphs, and links.</p>`,
        starter:`<h1>Hello World</h1>\n<p>This is a paragraph.</p>` },
      { slug:'links', title:'Links', type:'html',
        content:`<p>Use the <code>&lt;a&gt;</code> tag to create hyperlinks.</p>`,
        starter:`<a href="https://example.com" target="_blank">Visit example.com</a>` }
    ],
    CSS: [
      { slug:'selectors', title:'Selectors', type:'html',
        content:`<p>Selectors target elements. Try changing the color below.</p>`,
        starter:`<style>p { color: crimson; }</style>\n<p>Styled paragraph</p>` },
      { slug:'flexbox', title:'Flexbox', type:'html',
        content:`<p>Flexbox arranges items in a row or column.</p>`,
        starter:`<style>.row{display:flex; gap:8px}.box{background:#eee;padding:8px}</style>\n<div class="row"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>` }
    ],
    JavaScript: [
      { slug:'variables', title:'Variables', type:'js',
        content:`<p>Use <code>let</code> and <code>const</code> to declare variables.</p>`,
        starter:`<h3>Open Console</h3><script>let x=5; const y=3; console.log('x+y=', x+y);<\/script>` },
      { slug:'dom', title:'DOM Basics', type:'html',
        content:`<p>Manipulate the DOM with JS.</p>`,
        starter:`<button onclick="document.getElementById('msg').textContent='Clicked!'">Click</button>\n<p id="msg">Hello</p>` }
    ],
    Python: [
      { slug:'hello', title:'Hello World', type:'text',
        content:`<p>Python runs outside the browser. We simulate output below.</p>`,
        starter:`print("Hello World")` }
    ]
  };

  // Elements
  const sidebarEl = document.getElementById('sidebar');
  const titleEl = document.getElementById('lessonTitle');
  const contentEl = document.getElementById('lessonContent');
  const editorWrap = document.getElementById('editorWrap');
  const codeArea = document.getElementById('codeArea');
  const preview = document.getElementById('preview');
  const runBtn = document.getElementById('runBtn');
  const completeBtn = document.getElementById('completeBtn');
  const progressBar = document.getElementById('progressBar');

  // State
  let currentLang = 'HTML';
  let currentSlug = 'intro';

  function readHash(){
    // URL format: #Language/slug
    if (location.hash.startsWith('#')){
      const raw = decodeURIComponent(location.hash.slice(1));
      const [lang, slug] = raw.split('/');
      if (Curriculum[lang]){
        currentLang = lang;
        currentSlug = slug || Curriculum[lang][0].slug;
      }
    }
  }

  function buildSidebar(){
    sidebarEl.innerHTML = '';
    Object.keys(Curriculum).forEach(lang=>{
      const h = document.createElement('h3'); h.textContent = lang;
      sidebarEl.appendChild(h);
      Curriculum[lang].forEach(lesson=>{
        const a = document.createElement('a');
        a.href = `#${encodeURIComponent(lang)}/${lesson.slug}`;
        a.textContent = lesson.title;
        a.className = 'side-link';
        if (lang===currentLang && lesson.slug===currentSlug) a.classList.add('active');
        a.addEventListener('click', (e)=>{ e.preventDefault(); location.hash = a.getAttribute('href'); onRoute(); });
        sidebarEl.appendChild(a);
      });
    });
  }

  function renderLesson(){
    const lesson = Curriculum[currentLang].find(x=>x.slug===currentSlug) || Curriculum[currentLang][0];
    titleEl.textContent = `${currentLang} • ${lesson.title}`;
    contentEl.innerHTML = `<div class="card">${lesson.content}</div>`;

    // Progress width within this language
    updateProgressWidth();

    // Editor or simulated console
    if (lesson.type === 'html' || lesson.type === 'js'){
      editorWrap.style.display = 'grid';
      codeArea.value = lesson.starter;
      preview.srcdoc = lesson.starter;
      runBtn.disabled = false;
      completeBtn.disabled = false;
    } else {
      // Text-based (e.g., Python) — show code snippet + fake console
      editorWrap.style.display = 'grid';
      codeArea.value = lesson.starter;
      preview.srcdoc = `<pre style="padding:10px; font-family:monospace;">${lesson.starter}\n\n# Output (simulated)\nHello World</pre>`;
      runBtn.disabled = false;
      completeBtn.disabled = false;
    }
  }

  function runCode(){
    const lesson = Curriculum[currentLang].find(x=>x.slug===currentSlug);
    const code = codeArea.value;
    if (lesson.type === 'html' || lesson.type === 'js'){
      preview.srcdoc = code;
    } else {
      // Simulated REPL for non-web languages
      preview.srcdoc = `<pre style="padding:10px; font-family:monospace;">${code}\n\n# Output (simulated)\n✓ Ran successfully</pre>`;
    }
    // First run encourages XP via completion action
  }

  function completeLesson(){
    LearnX.markLessonComplete(currentLang, currentSlug);
    updateProgressWidth();
    completeBtn.textContent = 'Completed ✓';
    completeBtn.classList.add('success');
  }

  function updateProgressWidth(){
    const prog = LearnX.getProgress();
    const total = (Curriculum[currentLang] || []).length;
    const completed = prog.lessons[currentLang] ? Object.keys(prog.lessons[currentLang]).length : 0;
    const pct = total ? Math.round((completed/total)*100) : 0;
    progressBar.style.width = pct + '%';
  }

  function onRoute(){
    readHash();
    buildSidebar();
    renderLesson();
  }

  // Bind events
  runBtn.addEventListener('click', runCode);
  completeBtn.addEventListener('click', completeLesson);
  window.addEventListener('hashchange', onRoute);

  // Init
  document.addEventListener('DOMContentLoaded', onRoute);
})();