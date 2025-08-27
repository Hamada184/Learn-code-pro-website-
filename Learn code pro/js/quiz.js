// Randomized quiz with XP and consistent styling
(function(){
  const pool = [
    { q:'Which tag defines a paragraph?', options:['<p>','<h1>','<div>'], answer:0 },
    { q:'CSS property for text color?', options:['font-style','color','background'], answer:1 },
    { q:'Declare a block-scoped variable in JS:', options:['var','let','static'], answer:1 },
    { q:'Python function keyword:', options:['function','func','def'], answer:2 },
    { q:'SQL command to retrieve data:', options:['SELECT','PICK','FETCHALL'], answer:0 },
    { q:'C++ file extension is commonly:', options:['.cp','.cpp','.ccp'], answer:1 },
    { q:'Which creates a link?', options:['<a>','<link>','<href>'], answer:0 },
    { q:'Flexbox main axis property:', options:['justify-content','align-items','z-index'], answer:0 }
  ];

  function shuffle(a){ return a.sort(()=>Math.random()-0.5); }
  const questions = shuffle([...pool]).slice(0, 5);

  const quizEl = document.getElementById('quiz');
  const resultEl = document.getElementById('result');
  const submitBtn = document.getElementById('submitQuiz');

  function render(){
    quizEl.innerHTML = '';
    questions.forEach((q,i)=>{
      const card = document.createElement('div');
      card.className = 'q-card';
      const opts = q.options.map((opt,idx)=>`
        <label class="quiz-option">
          <input type="radio" name="q${i}" value="${idx}"> ${opt}
        </label>`).join('');
      card.innerHTML = `<p><strong>${i+1}.</strong> ${q.q}</p>${opts}`;
      quizEl.appendChild(card);
    });
  }

  function submit(){
    let score = 0;
    questions.forEach((q,i)=>{
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if (sel && Number(sel.value) === q.answer) score++;
    });
    resultEl.textContent = `You scored ${score}/${questions.length}`;
    LearnX.markQuizComplete(score, questions.length);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitted ✓';
  }

  submitBtn.addEventListener('click', submit);
  document.addEventListener('DOMContentLoaded', render);
})();