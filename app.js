(function(){
  // Preload A-Team theme sound
  const aTeamTheme = new Audio('the-a-team-2010-theme-from-the-a-team1.wav');
  aTeamTheme.preload = 'auto';
  
  // Preload pity the fool sound
  const pitySound = new Audio('pitythefool.mp3');
  pitySound.preload = 'auto';
  
  // Preload plan sound
  const planSound = new Audio('plan.mp3');
  planSound.preload = 'auto';
  
  // Preload pistol shot sound
  const pistolShot = new Audio('pistol-shot.mp3');
  pistolShot.preload = 'auto';
  
  // Sound effects (using Web Audio API for beeps and boops)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }
  
  function playSound(type) {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
    
      switch(type) {
        case 'newJoke':
          oscillator.frequency.value = 440;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
          break;
        case 'favorite':
          // Airhorn sound - loud blast with quick sweep down
          oscillator.frequency.value = 400;
          oscillator.type = 'sawtooth';
          gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
          oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.8);
          // Add second oscillator for richer airhorn effect
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.frequency.value = 600;
          osc2.type = 'sawtooth';
          gain2.gain.setValueAtTime(0.3, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
          osc2.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.8);
          osc2.start(ctx.currentTime);
          osc2.stop(ctx.currentTime + 0.8);
          break;
        case 'copy':
          oscillator.frequency.value = 600;
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
          break;
      }
    } catch(e) {
      // Silently fail if audio context not available
      console.log('Audio context error:', e);
    }
  }

  // Confetti effect
  function createConfetti() {
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#dc2626', '#2c3e50', '#f5f5f5', '#991b1b', '#0a0a0a'];
    
    for(let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * 500 - 100,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 5 + 3,
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

  // Thumbs down emoji explosion
  function createThumbsDownExplosion() {
    const canvas = document.createElement('canvas');
    canvas.className = 'explosion-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const particles = [];
    const emojis = ['👎', '😠', '😡', '💢'];
    
    for(let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = Math.random() * 8 + 5;
      particles.push({
        x: centerX,
        y: centerY,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        size: Math.random() * 30 + 30,
        opacity: 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 20 - 10,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.3; // gravity
        p.opacity -= 0.015;
        p.rotation += p.rotationSpeed;
        
        if(p.opacity > 0) {
          active = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.font = `${p.size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.emoji, 0, 0);
          ctx.restore();
        }
      });

      if(active) requestAnimationFrame(animate);
      else canvas.remove();
    }
    animate();
  }

  const jokes = [
    { id: 'j1', setup: "Why did Hannibal always smile?", punchline: "Because he loved it when a plan comes together... even if it's just his grocery list!", kidSafe: true, tags: ['a-team'] },
    { id: 'j2', setup: "What does Mr. T eat for breakfast?", punchline: "He doesn't eat breakfast—breakfast pities the fool who tries to wake him up early!", kidSafe: true, tags: ['a-team'] },
    { id: 'j3', setup: "Why doesn't B.A. Baracus like to fly?", punchline: "Because even tough guys are allowed to have their ups and downs... mostly downs!", kidSafe: true, tags: ['a-team'] },
    { id: 'j4', setup: "Why was Face so good at disguises?", punchline: "Because he always put his best face forward!", kidSafe: true, tags: ['a-team'] },
    { id: 'j5', setup: "What's black, red, and can't stop moving?", punchline: "The A-Team van—it's got places to go and bad guys to catch!", kidSafe: true, tags: ['a-team'] },
    { id: 'j6', setup: "Why did Hannibal wear so many disguises?", punchline: "He wanted to keep his identity under wraps!", kidSafe: true, tags: ['a-team'] },
    { id: 'j7', setup: "How much does Mr. T's gold jewelry weigh?", punchline: "A ton of pity for anyone who tries to steal it!", kidSafe: true, tags: ['a-team'] },
    { id: 'j8', setup: "What's the A-Team's least favorite type of mission?", punchline: "Anything that requires B.A. to get on a plane—they have to plan around his plan to avoid the plan!", kidSafe: true, tags: ['a-team'] },
    { id: 'j9', setup: "Why is the A-Team so good at construction?", punchline: "Because they can build a tank out of spare parts in 20 minutes!", kidSafe: true, tags: ['a-team'] },
    { id: 'j10', setup: "Why did Mr. T refuse to drink the milk?", punchline: "He only drinks his milk when HE says so—he pities the cow who disagrees!", kidSafe: true, tags: ['a-team'] },
    { id: 'j11', setup: "Why does Hannibal always have a cigar?", punchline: "So he can say 'I love it when a plan comes together' with extra drama!", kidSafe: true, tags: ['a-team'] },
    { id: 'j12', setup: "Why is Murdock the best pilot?", punchline: "Because he's always flying high—even when he's on the ground!", kidSafe: true, tags: ['a-team'] },
    { id: 'j13', setup: "How does the A-Team always escape?", punchline: "They've got a van with a plan and a team that never says 'can't'!", kidSafe: true, tags: ['a-team'] },
    { id: 'j14', setup: "Why did Face always get them out of trouble?", punchline: "Because he knew how to face the facts and charm his way through!", kidSafe: true, tags: ['a-team'] },
    { id: 'j15', setup: "What's B.A.'s favorite room?", punchline: "The workshop—where he can wrench away his problems!", kidSafe: true, tags: ['a-team'] },
    { id: 'j16', setup: "Why can't the Military Police ever catch the A-Team?", punchline: "Because the A-Team is always one step ahead and two disguises better!", kidSafe: true, tags: ['a-team'] },
    { id: 'j17', setup: "Why does Murdock stay at the VA hospital?", punchline: "Free room service and the perfect alibi—plus the pudding cups!", kidSafe: true, tags: ['a-team'] },
    { id: 'j18', setup: "What's faster than a speeding bullet and painted red, black, and grey?", punchline: "The A-Team van when they're being chased by the MPs!", kidSafe: true, tags: ['a-team'] },
    { id: 'j19', setup: "What's Mr. T's golden rule?", punchline: "Treat others with respect... or prepare to be pitied!", kidSafe: true, tags: ['a-team'] },
    { id: 'j20', setup: "Why does every A-Team mission succeed?", punchline: "Because with Hannibal's plans, Face's charm, B.A.'s muscles, and Murdock's flying—they're an A+ team!", kidSafe: true, tags: ['a-team'] },
  ];

  const els = {
    jokeCard: document.querySelector('.joke-card'),
    jokeText: document.getElementById('jokeText'),
    jokeAnswer: document.getElementById('jokeAnswer'),
    newJokeBtn: document.getElementById('newJokeBtn'),
    revealBtn: document.getElementById('revealBtn'),
    favoriteBtn: document.getElementById('favoriteBtn'),
    dislikeBtn: document.getElementById('dislikeBtn'),
    shareBtn: document.getElementById('shareBtn'),
    copyBtn: document.getElementById('copyBtn'),
    historyBtn: document.getElementById('historyBtn'),
    favoritesBtn: document.getElementById('favoritesBtn'),
    historyDialog: document.getElementById('historyDialog'),
    favoritesDialog: document.getElementById('favoritesDialog'),
    dislikesDialog: document.getElementById('dislikesDialog'),
    historyList: document.getElementById('historyList'),
    favoritesList: document.getElementById('favoritesList'),
    dislikesList: document.getElementById('dislikesList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    closeHistoryBtn: document.getElementById('closeHistoryBtn'),
    clearFavoritesBtn: document.getElementById('clearFavoritesBtn'),
    closeFavoritesBtn: document.getElementById('closeFavoritesBtn'),
    dislikesBtn: document.getElementById('dislikesBtn'),
    clearDislikesBtn: document.getElementById('clearDislikesBtn'),
    closeDislikesBtn: document.getElementById('closeDislikesBtn'),
  };

  const storage = {
    get(key, fallback){
      try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }catch{ return fallback }
    },
    set(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch{} }
  };

  let state = {
    current: null,
    revealed: false,
    history: storage.get('jokeHistory', []),
    favorites: storage.get('jokeFavorites', []),
    dislikes: storage.get('jokeDislikes', []),
  };

  function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)] }
  function isFavorite(id){ return state.favorites.includes(id) }
  function isDisliked(id){ return state.dislikes.includes(id) }
  function toggleFavorite(id){
    const idx = state.favorites.indexOf(id);
    const isAdding = idx < 0;
    if(idx>=0) state.favorites.splice(idx,1); else state.favorites.push(id);
    // Remove from dislikes if favoriting
    if(isAdding) {
      const disIdx = state.dislikes.indexOf(id);
      if(disIdx>=0) state.dislikes.splice(disIdx,1);
      storage.set('jokeDislikes', state.dislikes);
    }
    storage.set('jokeFavorites', state.favorites);
    updateFavoriteBtn();
    updateDislikeBtn();
    if(isAdding) {
      planSound.currentTime = 0;
      planSound.play().catch(e => console.log('Audio play failed:', e));
      createConfetti();
    }
  }
  function toggleDislike(id){
    const idx = state.dislikes.indexOf(id);
    const isAdding = idx < 0;
    if(idx>=0) state.dislikes.splice(idx,1); else {
      state.dislikes.push(id);
      // Remove from favorites if disliking
      const favIdx = state.favorites.indexOf(id);
      if(favIdx>=0) state.favorites.splice(favIdx,1);
      storage.set('jokeFavorites', state.favorites);
    }
    storage.set('jokeDislikes', state.dislikes);
    updateFavoriteBtn();
    updateDislikeBtn();
    if(isAdding) {
      // Play pity the fool sound
      pitySound.currentTime = 0;
      pitySound.play().catch(e => console.log('Audio play failed:', e));
      createThumbsDownExplosion();
    }
  }
  function updateFavoriteBtn(){
    if(!state.current) return;
    const on = isFavorite(state.current.id);
    els.favoriteBtn.textContent = on ? '★ Favorited' : '♡ Favorite';
    els.favoriteBtn.setAttribute('aria-pressed', String(on));
  }
  function updateDislikeBtn(){
    if(!state.current) return;
    const on = isDisliked(state.current.id);
    els.dislikeBtn.textContent = on ? '👎 Disliked' : '👎 Dislike';
    els.dislikeBtn.setAttribute('aria-pressed', String(on));
  }
  function showJoke(j){
    console.log('showJoke called with:', j);
    state.current = j;
    state.revealed = false;
    els.jokeCard.classList.remove('new-joke');
    void els.jokeCard.offsetWidth; // Force reflow
    els.jokeCard.classList.add('new-joke');
    els.jokeText.textContent = j.setup;
    els.jokeAnswer.textContent = j.punchline;
    console.log('Setup text set to:', els.jokeText.textContent);
    console.log('jokeText element:', els.jokeText);
    els.jokeAnswer.classList.remove('revealed');
    els.revealBtn.textContent = '🤔 Reveal Answer';
    els.revealBtn.disabled = false;
    // add to history (dedupe consecutive)
    if(!state.history.length || state.history[state.history.length-1] !== j.id){
      state.history.push(j.id);
      // keep last 100
      if(state.history.length>100) state.history = state.history.slice(-100);
      storage.set('jokeHistory', state.history);
    }
    updateFavoriteBtn();
    updateDislikeBtn();
  }
  function revealAnswer(){
    if(state.revealed || !state.current) return;
    state.revealed = true;
    els.jokeAnswer.classList.add('revealed');
    els.revealBtn.textContent = '✓ Revealed';
    els.revealBtn.disabled = true;
    // Play A-Team theme sound
    aTeamTheme.currentTime = 0;
    aTeamTheme.play().catch(e => console.log('Audio play failed:', e));
  }

  function newJoke(){
    pistolShot.currentTime = 0;
    pistolShot.play().catch(e => console.log('Audio play failed:', e));
    if(jokes.length===0){ els.jokeText.textContent = 'No jokes available.'; return; }
    // Filter out disliked jokes
    const availableJokes = jokes.filter(j => !state.dislikes.includes(j.id));
    if(availableJokes.length === 0){ els.jokeText.textContent = 'All jokes have been disliked! Clear dislikes to see more.'; return; }
    let next = pickRandom(availableJokes);
    // avoid immediate repeat
    if(state.current && availableJokes.length>1){
      let attempts = 0;
      while(next.id===state.current.id && attempts<5){ next = pickRandom(availableJokes); attempts++; }
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
      const text = document.createElement('div'); text.className='text'; text.textContent=j.setup + ' ' + j.punchline;
      const actions = document.createElement('div'); actions.className='actions-row';
      const viewBtn = document.createElement('button'); viewBtn.className='btn'; viewBtn.textContent='View'; viewBtn.onclick=()=>{ showJoke(j); if(options && options.close) options.close(); };
      const favBtn = document.createElement('button'); favBtn.className='btn'; favBtn.textContent=isFavorite(j.id)?'Unfavorite':'Favorite'; favBtn.onclick=()=>{ toggleFavorite(j.id); favBtn.textContent=isFavorite(j.id)?'Unfavorite':'Favorite'; };
      actions.append(viewBtn, favBtn);
      // Add undislike button for dislikes list
      if(options && options.isDislikes){
        const undislikeBtn = document.createElement('button'); undislikeBtn.className='btn'; undislikeBtn.textContent='Undislike'; undislikeBtn.onclick=()=>{ toggleDislike(j.id); row.remove(); if(state.dislikes.length === 0) renderList(container, state.dislikes, options); };
        actions.appendChild(undislikeBtn);
      }
      row.append(text, actions);
      container.appendChild(row);
    });
  }
  async function shareCurrent(){
    if(!state.current) return;
    const text = state.current.setup + '\n' + state.current.punchline + '\n— via A-Team Joke Generator';
    const url = location.origin + location.pathname + `?j=${encodeURIComponent(state.current.id)}`;
    if(navigator.share){
      try{ await navigator.share({ title: 'A Joke For You', text, url }); return }catch(e){ /* fallthrough */ }
    }
    try{ await navigator.clipboard.writeText(text + '\n' + url); toast('Copied to clipboard!'); }catch{ toast('Copy failed — select and copy manually.'); }
  }
  async function copyCurrent(){
    if(!state.current) return;
    playSound('copy');
    const fullText = state.current.setup + '\n' + state.current.punchline;
    try{ await navigator.clipboard.writeText(fullText); toast('Joke copied!'); }catch{ toast('Copy failed — select and copy manually.'); }
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
  els.revealBtn.addEventListener('click', revealAnswer);
  els.favoriteBtn.addEventListener('click', ()=>{ if(state.current) toggleFavorite(state.current.id) });
  els.dislikeBtn.addEventListener('click', ()=>{ if(state.current) toggleDislike(state.current.id) });
  els.shareBtn.addEventListener('click', shareCurrent);
  els.copyBtn.addEventListener('click', copyCurrent);
  els.historyBtn.addEventListener('click', ()=>{ renderList(els.historyList, state.history, { close: ()=>closeDialog(els.historyDialog) }); openDialog(els.historyDialog); });
  els.favoritesBtn.addEventListener('click', ()=>{ renderList(els.favoritesList, state.favorites, { close: ()=>closeDialog(els.favoritesDialog) }); openDialog(els.favoritesDialog); });
  els.dislikesBtn.addEventListener('click', ()=>{ renderList(els.dislikesList, state.dislikes, { close: ()=>closeDialog(els.dislikesDialog), isDislikes: true }); openDialog(els.dislikesDialog); });
  els.clearHistoryBtn.addEventListener('click', ()=>{ state.history=[]; storage.set('jokeHistory', state.history); renderList(els.historyList, state.history, { close: ()=>closeDialog(els.historyDialog) });});
  els.clearFavoritesBtn.addEventListener('click', ()=>{ state.favorites=[]; storage.set('jokeFavorites', state.favorites); renderList(els.favoritesList, state.favorites, { close: ()=>closeDialog(els.favoritesDialog) }); updateFavoriteBtn(); });
  els.clearDislikesBtn.addEventListener('click', ()=>{ state.dislikes=[]; storage.set('jokeDislikes', state.dislikes); renderList(els.dislikesList, state.dislikes, { close: ()=>closeDialog(els.dislikesDialog) }); updateDislikeBtn(); });
  els.closeHistoryBtn.addEventListener('click', ()=> closeDialog(els.historyDialog));
  els.closeFavoritesBtn.addEventListener('click', ()=> closeDialog(els.favoritesDialog));
  els.closeDislikesBtn.addEventListener('click', ()=> closeDialog(els.dislikesDialog));

  // Init
  console.log('Initializing joke generator...');
  console.log('Total jokes:', jokes.length);
  // Load from URL if present
  const params = new URLSearchParams(location.search);
  const id = params.get('j');
  const byId = id && jokes.find(j=>j.id===id);
  if(byId){ 
    console.log('Loading joke from URL:', byId);
    showJoke(byId); 
  }
  else { 
    console.log('Loading random joke');
    newJoke(); 
  }
  console.log('Joke generator initialized');
})();
