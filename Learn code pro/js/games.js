// Mini-game: Arrange HTML skeleton in correct order
(function(){
  const sequence = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '<title>My Page</title>',
    '</head>',
    '<body>',
    '<h1>Hello World</h1>',
    '</body>',
    '</html>'
  ];
  function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

  const tagWrap = document.getElementById('tags');
  const dropzone = document.getElementById('dropzone');
  const checkBtn = document.getElementById('checkBtn');
  const resetBtn = document.getElementById('resetBtn');
  const result = document.getElementById('gameResult');

  let dragged = null;

  function renderPool(){
    tagWrap.innerHTML = '';
    shuffle([...sequence]).forEach(tag=>{
      const el = document.createElement('div');
      el.textContent = tag; el.className = 'draggable'; el.draggable = true;
      el.addEventListener('dragstart', e=> dragged = el);
      tagWrap.appendChild(el);
    });
  }

  dropzone.addEventListener('dragover', e=> e.preventDefault());
  dropzone.addEventListener('drop', e=>{
    e.preventDefault();
    if (dragged){ dropzone.appendChild(dragged); dragged = null; }
  });

  function check(){
    const arr = Array.from(dropzone.children).map(x=>x.textContent.trim());
    if (arr.length !== sequence.length){
      result.textContent = 'Place all tags before checking.'; result.style.color = '#fbbf24'; // amber
      dropzone.classList.remove('correct','incorrect');
      return;
    }
    const ok = JSON.stringify(arr) === JSON.stringify(sequence);
    if (ok){
      result.textContent = 'Perfect! +20 XP';
      result.style.color = '#22c55e';
      dropzone.classList.add('correct'); dropzone.classList.remove('incorrect');
      LearnX.markGameComplete('tagOrder');
      checkBtn.disabled = true;
      checkBtn.textContent = 'Completed ✓';
    } else {
      result.textContent = 'Not quite. Reorder and try again.';
      result.style.color = '#ef4444';
      dropzone.classList.add('incorrect'); dropzone.classList.remove('correct');
    }
  }

  function reset(){
    result.textContent = '';
    dropzone.innerHTML = '';
    tagWrap.innerHTML = '';
    dropzone.classList.remove('correct','incorrect');
    checkBtn.disabled = false; checkBtn.textContent = 'Check Order';
    renderPool();
  }

  checkBtn.addEventListener('click', check);
  resetBtn.addEventListener('click', reset);

  document.addEventListener('DOMContentLoaded', ()=>{
    renderPool();
  });
})();