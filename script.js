const WA = "62 81285219899"; // ganti dengan nomor WhatsApp Anda
function kirimWA(teks){
  const url = `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(teks)}`;
  const w = window.open(url, "_blank");
  if(!w) window.location.href = url; // jika popup diblokir
}
const rp = n => "Rp " + n.toLocaleString("id-ID");

const MENU = [
  {id:1,nama:"Ayam bakar kecap",kat:"Makanan Utama",harga:16000,emoji:"🍛",img:"ayam-bakar.jpg",desc:"ayam yg di ungkep dengan bumbu rempah dan kecap."},
  {id:2,nama:"Ayam goreng kremes",kat:"Makanan Utama",harga:16000,emoji:"🥘",img:"ayam-kremes.jpg",desc:"ayam goreng bumbu kuning dilengkapi dengan kremesan sagu dan tepung beras."},
  {id:3,nama:"Soto betawi",kat:"Makanan Utama",harga:25000,emoji:"🍲",img:"soto-betawi.jpg",desc:"soto kuah santan dan susu dengan isian daging sapi"},
  {id:4,nama:"nasi bakar ayam suwir pedas",kat:"Makanan Utama",harga:12000,emoji:"🍲",img:"nasi-bakar.jpg",desc:"nasi gurih yang diisi dengan isian suwiran ayam yang dibungkus daun pisang lalu di bakar"},

  {id:5,nama:"Urap sayur",kat:"Sayur",harga:10000,emoji:"🥗",img:"urap-sayur.jpg",desc:"sayuran yg di campur dengan kelapa parut yang dimasak dengan bumbu kencur"},
  {id:6,nama:"Sayur Asem",kat:"Sayur",harga:10000,emoji:"🥬",img:"sayur-asem.jpg",desc:"Sayur kuah asam segar dengan jagung dan kacang panjang."},

  {id:7,nama:"Tahu isi pedas",kat:"Camilan",harga:3000,emoji:"🍢",img:"tahu-isi.jpg"},
  {id:8,nama:"Martabak telur daging",kat:"Camilan",harga:3000,emoji:"🥟",img:"martabak-telur.jpg"},

  {id:10,nama:"Es timun serut",kat:"Minuman",harga:15000,emoji:"🧋",img:"es-timun-serut.jpg",desc:" minuman timun yang diserut , diberi air gula dan perasan lemon "},

  {id:12,nama:"Bubur singkong",kat:"Dessert",harga:10000,emoji:"🍧",img:"bubur-singkong.jpg",desc:"bubur yang terbuat dari singkong yang di tumbuh lalu dimasak dengan gula merah, yang disiram kuah santan"},
];

const PAKET = [
  {id:"p1",nama:"Paket 20K",harga:20000,min:1,pop:false,isi:["Nasi","Ayam goreng kremes atau ayam bakar","Sambal & lalapan"]},
  {id:"p2",nama:"Paket 25K",harga:25000,min:1,pop:false,isi:["Nasi","Ayam goreng kremes atau ayam bakar","Tumisan atau tahu tempe","Sambal","Kerupuk"]},
  {id:"p3",nama:"Paket 28K",harga:28000,min:1,pop:false,isi:["Nasi","Ayam goreng kremes atau bakar","Tumisan atau tahu tempe","Sambal","Kerupuk","Buah"]},
  {id:"p4",nama:"Snack Box",harga:12000,min:1,pop:false,isi:["2 kue basah","1 gorengan"]}
];

let activeCat = "Semua";

/* ---------- Tombol "Ingin memesan?" ---------- */
function bukaCatatan(){ document.getElementById("payModal").classList.add("show"); }
function tutupCatatan(){ document.getElementById("payModal").classList.remove("show"); }
document.getElementById("poBtn").onclick = bukaCatatan;
document.getElementById("payModal").addEventListener("click",e=>{ if(e.target.id==="payModal") tutupCatatan(); });
document.getElementById("payModalBox").innerHTML = `<h3>Ingin memesan?</h3>
  <p style="margin:10px 0">Untuk memesan sistem kita PO dulu yah :)<br>
  Hubungi no ini jika minat:<br><b><a href="https://wa.me/6281285219899" target="_blank" rel="noopener" style="color:var(--primary)">081285219899</a></b></p>
  <p>Sekian terima kasih</p>
  <button class="btn" onclick="tutupCatatan()">Tutup</button>
  <small class="sign">- admin oryzacatering</small>`;


/* ---------- Tabs ---------- */
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));
  t.classList.add("active");
  document.getElementById(t.dataset.tab).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}));

/* ---------- Menu ---------- */
function renderChips(){
  const cats = ["Semua",...new Set(MENU.map(m=>m.kat))];
  const el = document.getElementById("chips");
  el.innerHTML = cats.map(c=>`<button class="chip ${c===activeCat?"active":""}" data-c="${c}">${c}</button>`).join("");
  el.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{activeCat=b.dataset.c;renderChips();renderMenu();});
}
function renderMenu(){
  const q = document.getElementById("search").value.toLowerCase().trim();
  const list = MENU.filter(m=>(activeCat==="Semua"||m.kat===activeCat)&&(m.nama.toLowerCase().includes(q)||(m.desc||"").toLowerCase().includes(q)));
  document.getElementById("menuGrid").innerHTML = list.map(m=>`
    <article class="card">
      ${m.img ? `<img class="photo" src="${m.img}" alt="${m.nama}" data-emoji="${m.emoji}" loading="lazy">` : `<div class="emoji">${m.emoji}</div>`}
      <div class="body">
        <span class="cat">${m.kat}</span>
        <h3>${m.nama}</h3>
        <p>${m.desc || ""}</p>
        <div class="row"><span class="price">${rp(m.harga)}</span></div>
      </div>
    </article>`).join("");
  document.querySelectorAll("#menuGrid img.photo").forEach(img=>{
    img.onerror = ()=>{ const d=document.createElement("div"); d.className="emoji"; d.textContent=img.dataset.emoji; img.replaceWith(d); };
  });
  document.getElementById("empty").style.display = list.length?"none":"block";
}
document.getElementById("search").addEventListener("input",renderMenu);

/* ---------- Katering ---------- */
function renderPaket(){
  document.getElementById("paketGrid").innerHTML = PAKET.map(p=>`
    <div class="paket ${p.pop?"pop":""}">
      ${p.pop?'<span class="tag">Terlaris</span>':""}
      <h3>${p.nama}</h3>
      <div class="harga">${rp(p.harga)}</div><small>per porsi · min. ${p.min} porsi</small>
      <ul>${p.isi.map(i=>`<li>${i}</li>`).join("")}</ul>
      <button class="btn ${p.pop?"":"ghost"}" onclick="bukaCatatan()">Ingin memesan?</button>
    </div>`).join("");
}
/* ---------- Toast ---------- */
let tt;
function toast(t){ const el=document.getElementById("toast"); el.textContent=t; el.classList.add("show"); clearTimeout(tt); tt=setTimeout(()=>el.classList.remove("show"),1800); }

/* Init */
renderChips(); renderMenu(); renderPaket();