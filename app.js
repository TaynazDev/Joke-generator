(function(){
  // Sound effects (using Web Audio API for beeps and boops)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playSound(type) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    switch(type) {
      case 'newJoke':
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.3);
        break;
      case 'favorite':
        // Airhorn sound - loud blast with quick sweep down
        oscillator.frequency.value = 400;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.8);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.8);
        // Add second oscillator for richer airhorn effect
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.frequency.value = 600;
        osc2.type = 'sawtooth';
        gain2.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        osc2.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.8);
        osc2.start(audioCtx.currentTime);
        osc2.stop(audioCtx.currentTime + 0.8);
        break;
      case 'copy':
        oscillator.frequency.value = 600;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.15);
        break;
    }
  }

  // Confetti effect
  function createConfetti() {
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#22c55e', '#a855f7', '#ec4899', '#f97316', '#06b6d4', '#eab308'];
    
    for(let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        
        if(p.y < canvas.height + 20) {
          active = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
          ctx.restore();
        }
      });

      if(active) requestAnimationFrame(animate);
      else canvas.remove();
    }
    animate();
  }

  const jokes = [
    { id: 'j1', text: "Why did the teddy bear say no to dessert? Because she was stuffed.", kidSafe: true, tags: ['animals'] },
    { id: 'j2', text: "What do you call cheese that isn't yours? Nacho cheese.", kidSafe: true, tags: ['food'] },
    { id: 'j3', text: "Why did the student eat his homework? Because the teacher said it was a piece of cake!", kidSafe: true, tags: ['school','food'] },
    { id: 'j4', text: "How does a penguin build its house? Igloos it together.", kidSafe: true, tags: ['animals'] },
    { id: 'j5', text: "Why did the scarecrow win an award? Because he was outstanding in his field.", kidSafe: true, tags: ['farm'] },
    { id: 'j6', text: "I told my computer I needed a break, and it said 'No problem — I'll go to sleep.'", kidSafe: true, tags: ['tech'] },
    { id: 'j7', text: "Why don’t eggs tell jokes? They’d crack each other up.", kidSafe: true, tags: ['food'] },
    { id: 'j8', text: "What do you call a boomerang that won’t come back? A stick.", kidSafe: true, tags: ['random'] },
    { id: 'j9', text: "Why did the bicycle fall over? It was two-tired.", kidSafe: true, tags: ['vehicles'] },
    { id: 'j10', text: "Why did the math book look sad? It had too many problems.", kidSafe: true, tags: ['school'] },
    { id: 'j11', text: "What do you call a sleeping bull? A bulldozer.", kidSafe: true, tags: ['animals'] },
    { id: 'j12', text: "What do you call a bear with no teeth? A gummy bear!", kidSafe: true, tags: ['animals','food'] },
  ];

  const els = {
    jokeCard: document.querySelector('.joke-card'),
    jokeText: document.getElementById('jokeText'),
    newJokeBtn: document.getElementById('newJokeBtn'),
    favoriteBtn: document.getElementById('favoriteBtn'),
    shareBtn: document.getElementById('shareBtn'),
    copyBtn: document.getElementById('copyBtn'),
    historyBtn: document.getElementById('historyBtn'),
    favoritesBtn: document.getElementById('favoritesBtn'),
    kidModeToggle: document.getElementById('kidModeToggle'),
    kidModeLabel: document.getElementById('kidModeLabel'),
    historyDialog: document.getElementById('historyDialog'),
    favoritesDialog: document.getElementById('favoritesDialog'),
    historyList: document.getElementById('historyList'),
    favoritesList: document.getElementById('favoritesList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    closeHistoryBtn: document.getElementById('closeHistoryBtn'),
    clearFavoritesBtn: document.getElementById('clearFavoritesBtn'),
    closeFavoritesBtn: document.getElementById('closeFavoritesBtn'),
  };

  const storage = {
    get(key, fallback){
      try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }catch{ return fallback }
    },
    set(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch{} }
  };

  let state = {
    current: null,
    kidMode: !!storage.get('kidMode', false),
    history: storage.get('jokeHistory', []),
    favorites: storage.get('jokeFavorites', []),
  };

  function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }
  function getPool(){ return state.kidMode ? jokes.filter(j=>j.kidSafe) : jokes }
  function setKidMode(on){ state.kidMode = !!on; storage.set('kidMode', state.kidMode); els.kidModeToggle.checked = state.kidMode; els.kidModeLabel.textContent = `Kid Mode: ${state.kidMode? 'On':'Off'}` }
  function isFavorite(id){ return state.favorites.includes(id) }
  function toggleFavorite(id){
    const idx = state.favorites.indexOf(id);
    const isAdding = idx < 0;
    if(idx>=0) state.favorites.splice(idx,1); else state.favorites.push(id);
    storage.set('jokeFavorites', state.favorites);
    updateFavoriteBtn();
    if(isAdding) {
      playSound('favorite');
      createConfetti();
    }
  }
  function updateFavoriteBtn(){
    if(!state.current) return;
    const on = isFavorite(state.current.id);
    els.favoriteBtn.textContent = on ? '★ Favorited' : '♡ Favorite';
    els.favoriteBtn.setAttribute('aria-pressed', String(on));
  }
  function showJoke(j){
    state.current = j;
    els.jokeCard.classList.remove('new-joke');
    void els.jokeCard.offsetWidth; // Force reflow
    els.jokeCard.classList.add('new-joke');
    els.jokeText.textContent = j.text;
    // add to history (dedupe consecutive)
    if(!state.history.length || state.history[state.history.length-1] !== j.id){
      state.history.push(j.id);
      // keep last 100
      if(state.history.length>100) state.history = state.history.slice(-100);
      storage.set('jokeHistory', state.history);
    }
    updateFavoriteBtn();
  }
  function newJoke(){
    playSound('newJoke');
    const pool = getPool();
    if(pool.length===0){ els.jokeText.textContent = 'No jokes available for this mode.'; return; }
    let next = pickRandom(pool);
    // avoid immediate repeat
    if(state.current && pool.length>1){
      let attempts = 0;
      while(next.id===state.current.id && attempts<5){ next = pickRandom(pool); attempts++; }
    }
    showJoke(next);
  }
  function idToJoke(id){ return jokes.find(j=>j.id===id) }
  function renderList(container, ids, options){
    container.innerHTML = '';
    if(!ids.length){
      const empty = document.createElement('div');
      empty.className = 'item';
      empty.innerHTML = '<div class="text" style="color:#94a3b8">Nothing here yet.</div>';
      container.appendChild(empty);
      return;
    }
    ids.slice().reverse().forEach(id=>{
      const j = idToJoke(id); if(!j) return;
      const row = document.createElement('div'); row.className='item';
      const text = document.createElement('div'); text.className='text'; text.textContent=j.text;
      const actions = document.createElement('div'); actions.className='actions-row';
      const viewBtn = document.createElement('button'); viewBtn.className='btn'; viewBtn.textContent='View'; viewBtn.onclick=()=>{ showJoke(j); if(options && options.close) options.close(); };
      const favBtn = document.createElement('button'); favBtn.className='btn'; favBtn.textContent=isFavorite(j.id)?'Unfavorite':'Favorite'; favBtn.onclick=()=>{ toggleFavorite(j.id); favBtn.textContent=isFavorite(j.id)?'Unfavorite':'Favorite'; };
      actions.append(viewBtn, favBtn);
      row.append(text, actions);
      container.appendChild(row);
    });
  }
  async function shareCurrent(){
    if(!state.current) return;
    const text = state.current.text + '\n— via Family-Friendly Joke Generator';
    const url = location.origin + location.pathname + `?j=${encodeURIComponent(state.current.id)}&kid=${state.kidMode?1:0}`;
    if(navigator.share){
      try{ await navigator.share({ title: 'A Joke For You', text, url }); return }catch(e){ /* fallthrough */ }
    }
    try{ await navigator.clipboard.writeText(text + '\n' + url); toast('Copied to clipboard!'); }catch{ toast('Copy failed — select and copy manually.'); }
  }
  async function copyCurrent(){
    if(!state.current) return;
    playSound('copy');
    try{ await navigator.clipboard.writeText(state.current.text); toast('Joke copied!'); }catch{ toast('Copy failed — select and copy manually.'); }
  }
  function toast(msg){
    const t = document.createElement('div');
    t.textContent = msg; t.style.position='fixed'; t.style.bottom='20px'; t.style.left='50%'; t.style.transform='translateX(-50%) translateY(100px)'; t.style.background='linear-gradient(135deg,#a855f7,#ec4899)'; t.style.border='2px solid #fff'; t.style.padding='12px 18px'; t.style.borderRadius='12px'; t.style.color='#fff'; t.style.zIndex='9999'; t.style.boxShadow='0 10px 30px rgba(168,85,247,0.5)'; t.style.fontWeight='600'; t.style.transition='transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease';
    document.body.appendChild(t);
    setTimeout(()=>{ t.style.transform='translateX(-50%) translateY(0)'; }, 10);
    setTimeout(()=>{ t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(-20px)'; }, 1400);
    setTimeout(()=>{ t.remove() }, 1800);
  }
  function openDialog(d){ try{ d.showModal(); }catch{ d.setAttribute('open',''); } }
  function closeDialog(d){ try{ d.close(); }catch{ d.removeAttribute('open'); } }

  // Wire events
  els.newJokeBtn.addEventListener('click', newJoke);
  els.favoriteBtn.addEventListener('click', ()=>{ if(state.current) toggleFavorite(state.current.id) });
  els.shareBtn.addEventListener('click', shareCurrent);
  els.copyBtn.addEventListener('click', copyCurrent);
  els.historyBtn.addEventListener('click', ()=>{ renderList(els.historyList, state.history, { close: ()=>closeDialog(els.historyDialog) }); openDialog(els.historyDialog); });
  els.favoritesBtn.addEventListener('click', ()=>{ renderList(els.favoritesList, state.favorites, { close: ()=>closeDialog(els.favoritesDialog) }); openDialog(els.favoritesDialog); });
  els.clearHistoryBtn.addEventListener('click', ()=>{ state.history=[]; storage.set('jokeHistory', state.history); renderList(els.historyList, state.history, { close: ()=>closeDialog(els.historyDialog) });});
  els.clearFavoritesBtn.addEventListener('click', ()=>{ state.favorites=[]; storage.set('jokeFavorites', state.favorites); renderList(els.favoritesList, state.favorites, { close: ()=>closeDialog(els.favoritesDialog) }); updateFavoriteBtn(); });
  els.closeHistoryBtn.addEventListener('click', ()=> closeDialog(els.historyDialog));
  els.closeFavoritesBtn.addEventListener('click', ()=> closeDialog(els.favoritesDialog));
  els.kidModeToggle.addEventListener('change', (e)=>{ setKidMode(!!e.target.checked); });

  // Init
  setKidMode(state.kidMode);
  // Load from URL if present
  const params = new URLSearchParams(location.search);
  const id = params.get('j');
  const kid = params.get('kid');
  if(kid!==null){ setKidMode(kid==='1' || kid==='true'); }
  const byId = id && jokes.find(j=>j.id===id);
  if(byId){ showJoke(byId); }
  else { newJoke(); }
})();
