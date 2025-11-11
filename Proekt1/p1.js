// HTML 
const loginPage = document.getElementById('loginPage');  
const mainPage = document.getElementById('mainPage');    
const loginBtn = document.getElementById('loginBtn');
const guestBtn = document.getElementById('guestBtn');
const loginAgainBtn = document.getElementById('loginAgainBtn');
const loginMessage = document.getElementById('loginMessage');

// НАЈАВА
let eNajavenKorisnik = false;  

// ЛАЈКОВИ И КОМЕНТАРИ
const brojLikes = {};  
const komentari = {};  

// ПРОВЕРКА ДАЛИ КОРИСНИКОТ Е НАЈАВЕН
function proveriNajava(funcijaAkcija) {
  if(eNajavenKorisnik){
    funcijaAkcija();
  } else {
    alert("Морате да се најавите за да лајкнете или коментирате!");
  }
}

// НАЈАВА
loginBtn.addEventListener('click', ()=>{
  const korisnickoIme = document.getElementById('username').value;
  const lozinka = document.getElementById('password').value;

  if(korisnickoIme && lozinka){
    loginPage.style.display = 'none';
    mainPage.style.display = 'block';
    eNajavenKorisnik = true;
    loginMessage.innerText = '';
  } else {
    loginMessage.innerText = "Внесете корисничко име и лозинка!";
  }
});

// ПРОДОЛЖИ БЕЗ НАЈАВА
guestBtn.addEventListener('click', ()=>{
  loginPage.style.display = 'none';
  mainPage.style.display = 'block';
  eNajavenKorisnik = false;
});

// ПОВТОРНА НАЈАВА ЗА КОМЕНТАРИ И ЛАЈКОВИ
loginAgainBtn.addEventListener('click', ()=>{
  loginPage.style.display = 'flex';
  mainPage.style.display = 'none';
});

// ЛАЈКОВИ
document.querySelectorAll('.like-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    proveriNajava(()=>{
      const id = btn.dataset.id;
      brojLikes[id] = (brojLikes[id] || 0) + 1;
      btn.querySelector('.like-count').innerText = brojLikes[id];
    });
  });
});

// КОМЕНТАРИ
document.querySelectorAll('.comment-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    proveriNajava(()=>{
      const id = btn.dataset.id;
      const inputPolje = document.querySelector(`.comment-input[data-id="${id}"]`);
      const listaKomentari = document.querySelector(`.comment-list[data-id="${id}"]`);
      const komentar = inputPolje.value.trim();

      if(komentar){
        if(!komentari[id]) komentari[id] = [];
        komentari[id].push(komentar);

        const li = document.createElement('li');
        li.innerText = komentar;
        listaKomentari.appendChild(li);
        inputPolje.value = '';
      }
    });
  });
});

// АНКЕТА
const formaAnketa = document.getElementById('surveyForm');
const rezultatAnketa = document.getElementById('surveyResult');

formaAnketa.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(!eNajavenKorisnik){
    alert("Морате да се најавите за да ја пополните анкетата!");
    return;
  }

  const formData = new FormData(formaAnketa);
  let rezultat = '';
  formData.forEach((value, key)=>{ rezultat += `${key}: ${value} | ` });
  rezultatAnketa.innerText = "Вашиот резултат: " + rezultat;
});

// ЛОКАЛНО ВРЕМЕ ТОКИО
function updateTokyoTime() {
  const tokyoOffset = 9; // ТОКИО Е UTC+9
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const tokyoTime = new Date(utc + (3600000 * tokyoOffset));

  const hours = String(tokyoTime.getHours()).padStart(2, '0');
  const minutes = String(tokyoTime.getMinutes()).padStart(2, '0');
  const seconds = String(tokyoTime.getSeconds()).padStart(2, '0');

  document.getElementById('timeDisplay').innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTokyoTime, 1000);
updateTokyoTime();
