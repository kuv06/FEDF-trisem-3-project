import { useState, useEffect } from "react";

const SK="lookbook_users",SEK="lookbook_session",LK="lookbook_login_log";
const getUsers=()=>{try{return JSON.parse(localStorage.getItem(SK)||"[]")}catch{return[]}};
const saveUsers=u=>localStorage.setItem(SK,JSON.stringify(u));
const getSession=()=>{try{return JSON.parse(localStorage.getItem(SEK)||"null")}catch{return null}};
const saveSession=u=>localStorage.setItem(SEK,JSON.stringify(u));
const clearSession=()=>localStorage.removeItem(SEK);
const getLog=()=>{try{return JSON.parse(localStorage.getItem(LK)||"[]")}catch{return[]}};
const addLog=e=>{const l=[e,...getLog()].slice(0,200);localStorage.setItem(LK,JSON.stringify(l))};

const NAV_CATS=["MEN","WOMEN","KIDS","ACCESSORIES"];

const fashionQuotes=[
  {text:"Style is a way to say who you are without having to speak.",author:"Rachel Zoe"},
  {text:"Elegance is not about being noticed, it's about being remembered.",author:"Giorgio Armani"},
  {text:"Dress shabbily and they remember the dress; dress impeccably and they remember the woman.",author:"Coco Chanel"},
  {text:"You can have anything you want in life if you dress for it.",author:"Edith Head"},
  {text:"Fashion is the armor to survive the reality of everyday life.",author:"Bill Cunningham"},
];

const colourCombos=[
  {name:"Navy + Gold",c1:"#0a1628",c2:"#c9a96e"},
  {name:"Cherry + Cream",c1:"#8b0a1a",c2:"#f7f3ec"},
  {name:"Midnight + Silver",c1:"#0d1f3c",c2:"#c0c0c0"},
  {name:"Chocolate + Ivory",c1:"#3b1f10",c2:"#f5f0e8"},
  {name:"Crimson + Gold",c1:"#6b0f1a",c2:"#c9a96e"},
  {name:"Deep Blue + Rust",c1:"#0a1628",c2:"#c1643c"},
  {name:"Plum + Rose Gold",c1:"#4a1040",c2:"#c9a0b0"},
  {name:"Indigo + Blush",c1:"#1a1a4a",c2:"#f5c6d0"},
];

const outfits=[
  {id:1,season:"Summer",cat:"WOMEN",name:"Coastal Breeze",
   img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
   shopItems:[{price:"₹2,499"}]},
  {id:2,season:"Autumn",cat:"WOMEN",name:"Golden Hour",
   img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
   shopItems:[{price:"₹4,999"}]},
  {id:3,season:"Spring",cat:"WOMEN",name:"Petal Soft",
   img:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
   shopItems:[{price:"₹2,799"}]},
  {id:4,season:"Winter",cat:"WOMEN",name:"Library Hours",
   img:"https://images.unsplash.com/photo-1544957992-20514f595d6f?w=600&q=80",
   shopItems:[{price:"₹3,499"}]},
  {id:5,season:"Winter",cat:"MEN",name:"Nordic Noir",
   img:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
   shopItems:[{price:"₹5,999"}]},
  {id:6,season:"Summer",cat:"MEN",name:"Urban Ease",
   img:"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80",
   shopItems:[{price:"₹1,899"}]},
  {id:7,season:"Autumn",cat:"MEN",name:"Sharp Autumn",
   img:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
   shopItems:[{price:"₹3,799"}]},
  {id:8,season:"Spring",cat:"MEN",name:"Morning Track",
   img:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
   shopItems:[{price:"₹2,199"}]},
];

const seedAdmin=()=>{
  const u=getUsers();
  if(!u.find(x=>x.email==="admin@lookbook.com"))
    saveUsers([...u,{id:"admin-001",name:"Admin",email:"admin@lookbook.com",password:"admin123",role:"admin",joinedAt:new Date().toISOString(),stylePersona:"Quiet Luxe",lastLogin:new Date().toISOString()}]);
};

// ─── CSS ───────────────────────────────────────────────────────────────────────
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --steel:#6A89A7;
  --sky:#BDDDFC;
  --cornflower:#88BDF2;
  --slate:#384959;

  --steel-dark:#4a6b8a;
  --steel-darker:#2e4f6a;
  --slate-dark:#252f38;
  --slate-darker:#161e25;
  --slate-deepest:#0d1419;

  font-family:'DM Sans',sans-serif;
}
body{background:var(--slate-darker);color:#fff;min-height:100vh;display:flex;flex-direction:column;}

/* ── TOP NAV ── */
.tnav{
  background:rgba(13,20,25,0.88);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(136,189,242,0.22);
  position:sticky;top:0;z-index:300;height:60px;
  display:flex;align-items:center;padding:0 2rem;gap:0;
}
.tnav-logo{font-family:'Cormorant Garamond',serif;font-size:1.55rem;font-weight:600;font-style:italic;color:#fff;margin-right:1.5rem;cursor:pointer;flex-shrink:0;letter-spacing:0.03em;}
.tnav-logo span{color:var(--cornflower);}
.tnav-cats{display:flex;flex:1;}
.tnav-cat{background:none;border:none;cursor:pointer;padding:0 1rem;height:60px;font-size:0.77rem;font-weight:700;letter-spacing:0.08em;color:rgba(255,255,255,0.6);border-bottom:3px solid transparent;transition:all 0.15s;white-space:nowrap;}
.tnav-cat:hover{color:#fff;border-color:var(--cornflower);}
.tnav-search{flex:1;max-width:360px;margin:0 1rem;display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.07);border:1px solid rgba(136,189,242,0.2);border-radius:4px;padding:0.45rem 0.8rem;transition:border-color 0.2s;}
.tnav-search:focus-within{border-color:rgba(136,189,242,0.6);}
.tnav-search input{background:none;border:none;outline:none;font-size:0.8rem;color:#fff;width:100%;}
.tnav-search input::placeholder{color:rgba(255,255,255,0.35);}
.tnav-right{display:flex;align-items:center;}
.tnav-icon{display:flex;flex-direction:column;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;padding:0 0.75rem;height:60px;font-size:0.6rem;font-weight:600;letter-spacing:0.05em;color:rgba(255,255,255,0.6);gap:0.15rem;text-decoration:none;transition:color 0.15s;position:relative;}
.tnav-icon:hover{color:#fff;}
.tnav-icon .ico{font-size:1.2rem;line-height:1;}

.profile-avatar{width:28px;height:28px;border-radius:50%;background:var(--cornflower);color:var(--slate-darker);display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;}

/* ── PAGE WRAPPERS ── */
.page-navy{background:var(--slate-darker);min-height:calc(100vh - 60px);}

/* ── HOMEPAGE ── */
.hero-banner{
  position:relative;height:580px;overflow:hidden;
  background:linear-gradient(135deg, var(--slate-darker) 0%, var(--slate-dark) 50%, var(--steel-darker) 100%);
  display:flex;align-items:center;
}
.hero-banner::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 70% 50%, rgba(106,137,167,0.35) 0%, transparent 60%),
             radial-gradient(ellipse at 20% 80%, rgba(136,189,242,0.12) 0%, transparent 50%);
  pointer-events:none;z-index:0;
}
.hero-banner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.28;mix-blend-mode:luminosity;}
.hero-content{position:relative;z-index:1;padding:3rem 4rem;max-width:580px;}
.h-eyebrow{font-size:0.67rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--sky);margin-bottom:0.75rem;display:block;}
.h-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2.8rem,5vw,4.5rem);font-weight:300;color:#fff;line-height:1.05;margin-bottom:1rem;}
.h-title em{font-style:italic;color:var(--cornflower);}
.h-quote{color:rgba(255,255,255,0.65);font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.05rem;margin-bottom:1.75rem;line-height:1.4;}
.h-btns{display:flex;gap:0.75rem;flex-wrap:wrap;}
.hbtn{padding:0.68rem 1.75rem;cursor:pointer;font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.18s;border:none;}
.hbtn.primary{background:var(--steel);color:#fff;box-shadow:0 4px 20px rgba(106,137,167,0.5);}
.hbtn.primary:hover{background:var(--steel-dark);box-shadow:0 6px 28px rgba(106,137,167,0.65);}
.hbtn.outline{background:transparent;color:#fff;border:1.5px solid rgba(136,189,242,0.45);}
.hbtn.outline:hover{border-color:var(--sky);background:rgba(136,189,242,0.1);}

.season-quote-bar{
  background:linear-gradient(90deg, rgba(106,137,167,0.25) 0%, rgba(56,73,89,0.6) 100%);
  padding:0.75rem 2rem;text-align:center;
  border-top:1px solid rgba(136,189,242,0.2);
  border-bottom:1px solid rgba(136,189,242,0.2);
}
.sqb-text{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1rem;color:var(--sky);}

.home-sec{padding:2.5rem 2rem;}
.home-sec-title{font-family:'Cormorant Garamond',serif;font-size:1.65rem;font-weight:300;margin-bottom:1.25rem;color:#fff;}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem;}
.cat-tile{border-radius:6px;overflow:hidden;cursor:pointer;position:relative;aspect-ratio:3/4;transition:transform 0.25s,box-shadow 0.25s;border:1px solid rgba(136,189,242,0.18);}
.cat-tile:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.5);}
.cat-tile img{width:100%;height:100%;object-fit:cover;}
.cat-tile-label{position:absolute;bottom:0;left:0;right:0;padding:1rem 0.75rem 0.75rem;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent);color:#fff;font-size:0.78rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;}

.trend-strip{display:flex;gap:1rem;overflow-x:auto;padding-bottom:0.5rem;}
.trend-strip::-webkit-scrollbar{height:3px;}
.trend-strip::-webkit-scrollbar-thumb{background:rgba(136,189,242,0.35);}
.trend-card{flex-shrink:0;width:195px;cursor:pointer;border:1px solid rgba(255,255,255,0.1);transition:box-shadow 0.2s,border-color 0.2s;}
.trend-card:hover{box-shadow:0 4px 20px rgba(0,0,0,0.45);border-color:rgba(136,189,242,0.4);}
.trend-card img{width:100%;height:255px;object-fit:cover;display:block;}
.trend-card-body{padding:0.6rem 0.75rem;}
.tc-name{font-size:0.78rem;font-weight:600;margin-bottom:0.12rem;color:#fff;}
.tc-price{font-size:0.74rem;color:var(--cornflower);font-weight:700;}

.colour-sec{
  padding:2rem 2rem 3rem;
  background:linear-gradient(180deg, rgba(56,73,89,0) 0%, rgba(106,137,167,0.15) 100%);
  border-top:1px solid rgba(255,255,255,0.06);
}
.colour-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:1rem;}
.colour-combo{border:1px solid rgba(136,189,242,0.18);overflow:hidden;cursor:pointer;transition:all 0.2s;}
.colour-combo:hover{border-color:var(--cornflower);transform:translateY(-2px);}
.cc-swatches{display:flex;height:55px;}
.cc-swatch{flex:1;}
.cc-name{padding:0.5rem 0.65rem;font-size:0.69rem;font-weight:600;color:rgba(255,255,255,0.7);}

.promo-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;padding:0 2rem 2.5rem;}
.promo-card{overflow:hidden;position:relative;height:200px;cursor:pointer;transition:transform 0.22s;border:1px solid rgba(136,189,242,0.15);}
.promo-card:hover{transform:scale(1.01);}
.promo-card img{width:100%;height:100%;object-fit:cover;opacity:0.55;}
.promo-card-text{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:1.25rem;background:linear-gradient(to top,rgba(0,0,0,0.8),transparent);}
.promo-label{font-size:0.63rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--sky);margin-bottom:0.25rem;}
.promo-title{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:300;color:#fff;}

/* ── LOGIN ── */
.login-wrap{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
@media(max-width:700px){.login-wrap{grid-template-columns:1fr;}}

.login-left{
  background:linear-gradient(160deg, var(--steel) 0%, var(--steel-darker) 55%, var(--slate-darker) 100%);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:3rem 2rem;position:relative;overflow:hidden;
}
.login-left::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 40% 30%, rgba(189,221,252,0.12) 0%, transparent 55%),
             radial-gradient(ellipse at 80% 80%, rgba(136,189,242,0.1) 0%, transparent 50%);
  pointer-events:none;
}
.login-left::after{
  content:'';position:absolute;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events:none;
}
.login-left-inner{position:relative;z-index:1;max-width:380px;text-align:center;}
.ll-big{font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,6vw,5rem);font-weight:300;font-style:italic;color:#fff;line-height:1;margin-bottom:1rem;text-shadow:0 4px 32px rgba(0,0,0,0.3);}
.ll-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.1rem;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:0.75rem;}
.ll-author{font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);}
.ll-swatches{display:flex;gap:0.6rem;justify-content:center;margin-top:2rem;}
.ll-swatch{width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);}

.login-right{
  background:linear-gradient(160deg, var(--slate-darker) 0%, var(--slate-dark) 100%);
  display:flex;align-items:center;justify-content:center;padding:3rem 2rem;
  position:relative;
}
.login-right::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 80% 20%, rgba(136,189,242,0.07) 0%, transparent 55%);
  pointer-events:none;
}
.lcard{width:100%;max-width:380px;position:relative;z-index:1;}
.l-logo{font-family:'Cormorant Garamond',serif;font-size:1.65rem;font-weight:600;font-style:italic;color:#fff;margin-bottom:0.2rem;}
.l-logo span{color:var(--cornflower);}
.l-tag{color:rgba(255,255,255,0.4);font-size:0.74rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.5rem;}
.l-fashion-quote{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:0.88rem;color:var(--cornflower);margin-bottom:1.5rem;padding:0.75rem 1rem;background:rgba(136,189,242,0.07);border-left:3px solid rgba(136,189,242,0.4);}
.l-tabs{display:flex;border-bottom:1px solid rgba(136,189,242,0.15);margin-bottom:1.5rem;}
.ltab{flex:1;background:none;border:none;cursor:pointer;padding:0.6rem;font-size:0.76rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.35);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all 0.15s;}
.ltab.active{color:var(--sky);border-color:var(--cornflower);}
.fg{margin-bottom:1rem;}
.flbl{display:block;font-size:0.69rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:0.33rem;font-weight:700;}
.finput{width:100%;padding:0.62rem 0.88rem;border:1px solid rgba(136,189,242,0.18);background:rgba(136,189,242,0.06);font-size:0.84rem;color:#fff;outline:none;transition:border-color 0.15s;border-radius:2px;}
.finput:focus{border-color:var(--cornflower);background:rgba(136,189,242,0.1);}
.finput.err{border-color:#ff6b6b;}
.ferr{font-size:0.71rem;color:#ff6b6b;margin-top:0.28rem;}
.lsubmit{width:100%;padding:0.76rem;background:var(--steel);color:#fff;border:none;cursor:pointer;font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.15s;margin-top:0.5rem;box-shadow:0 4px 20px rgba(106,137,167,0.4);}
.lsubmit:hover{background:var(--steel-dark);box-shadow:0 6px 24px rgba(106,137,167,0.5);}
.l-hint{margin-top:0.75rem;font-size:0.69rem;color:rgba(255,255,255,0.25);text-align:center;}
.l-ok{text-align:center;padding:1rem 0;font-size:0.84rem;color:rgba(255,255,255,0.6);}
.l-ok em{color:var(--sky);font-style:normal;font-weight:700;}

/* ── FOOTER ── */
footer{background:var(--slate-deepest);border-top:1px solid rgba(136,189,242,0.1);}
.ft-top{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:2rem;padding:2.5rem 2rem;}
.ftcol-title{font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:1rem;color:var(--cornflower);}
.ftcol ul{list-style:none;}
.ftcol ul li{margin-bottom:0.48rem;}
.ftcol ul li a{font-size:0.76rem;color:rgba(255,255,255,0.35);text-decoration:none;cursor:pointer;transition:color 0.15s;}
.ftcol ul li a:hover{color:var(--sky);}
.ft-div{border:none;border-top:1px solid rgba(255,255,255,0.05);}
.ft-bot{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 2rem;flex-wrap:wrap;gap:0.75rem;}
.ft-logo{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;font-style:italic;color:#fff;}
.ft-logo span{color:var(--cornflower);}
.ft-copy{font-size:0.7rem;color:rgba(255,255,255,0.2);}
.ft-social{display:flex;gap:0.45rem;}
.ft-social a{width:28px;height:28px;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:0.7rem;color:rgba(255,255,255,0.3);text-decoration:none;cursor:pointer;transition:all 0.15s;}
.ft-social a:hover{border-color:var(--cornflower);color:var(--cornflower);}

::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-thumb{background:rgba(136,189,242,0.25);}
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SiteFooter(){
  return(<footer>
    <div className="ft-top">{[
      {title:"Online Shopping",links:["Men's Fashion","Women's Fashion","Kids' Fashion","Accessories"]},
      {title:"Customer Policies",links:["Contact Us","FAQ","Terms of Use","Privacy Policy"]},
      {title:"Experience App On",links:["iOS App Store","Google Play Store"]},
      {title:"About Us",links:["About Lookbook"]},
    ].map(col=><div key={col.title} className="ftcol"><div className="ftcol-title">{col.title}</div><ul>{col.links.map(l=><li key={l}><a>{l}</a></li>)}</ul></div>)}</div>
    <hr className="ft-div"/>
    <div className="ft-bot"><div className="ft-logo">Look<span>book</span> Guide</div><div className="ft-copy">© 2026 Lookbook Guide · Made in India 🇮🇳</div><div className="ft-social">{["IG","FB","TW","YT"].map(s=><a key={s}>{s}</a>)}</div></div>
  </footer>);
}

function HomePage(){
  const catTiles=[
    {label:"Women",img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80"},
    {label:"Men",img:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&q=80"},
    {label:"Kids",img:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80"},
    {label:"Accessories",img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80"},
  ];
  const [quoteIdx]=useState(Math.floor(Math.random()*fashionQuotes.length));
  const q=fashionQuotes[quoteIdx];
  return(<div className="page-navy">
    <div className="hero-banner">
      <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80" alt="hero"/>
      <div className="hero-content">
        <span className="h-eyebrow">Spring — Summer 2026</span>
        <h1 className="h-title">Dress to <em>express,</em><br/>not to impress.</h1>
        <div className="h-quote">"{q.text}" — {q.author}</div>
        <div className="h-btns"><button className="hbtn primary">Explore Lookbook</button><button className="hbtn outline">Shop Women</button></div>
      </div>
    </div>
    <div className="season-quote-bar"><div className="sqb-text">"In Spring, every wardrobe deserves to bloom anew." ✦</div></div>
    <div className="home-sec">
      <div className="home-sec-title">Shop by Category</div>
      <div className="cat-grid">{catTiles.map(c=><div key={c.label} className="cat-tile"><img src={c.img} alt={c.label}/><div className="cat-tile-label">{c.label}</div></div>)}</div>
    </div>
    <div className="colour-sec">
      <div className="home-sec-title" style={{marginBottom:"0.4rem"}}>Colour Combinations That Look Rich ✦</div>
      <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",marginBottom:"1.25rem"}}>Inspired by navy, cherry and chocolate — this season's power palette.</p>
      <div className="colour-grid">{colourCombos.map(cc=><div key={cc.name} className="colour-combo"><div className="cc-swatches"><div className="cc-swatch" style={{background:cc.c1}}/><div className="cc-swatch" style={{background:cc.c2}}/></div><div className="cc-name">{cc.name}</div></div>)}</div>
    </div>
    <div className="home-sec" style={{paddingTop:0}}>
      <div className="home-sec-title">Trending Now</div>
      <div className="trend-strip">{outfits.map(o=><div key={o.id} className="trend-card"><img src={o.img} alt={o.name}/><div className="trend-card-body"><div className="tc-name">{o.name}</div><div className="tc-price">{o.shopItems[0]?.price} onwards</div></div></div>)}</div>
    </div>
    <div className="promo-row">
      <div className="promo-card"><img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80" alt="Men"/><div className="promo-card-text"><div className="promo-label">Men's Edit</div><div className="promo-title">Sharp Autumn Looks</div></div></div>
      <div className="promo-card"><img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80" alt="Accessories"/><div className="promo-card-text"><div className="promo-label">Accessories</div><div className="promo-title">Gold Hour Edit</div></div></div>
    </div>
    <SiteFooter/>
  </div>);
}

function LoginPage({onLogin}){
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [errors,setErr]=useState({});
  const [success,setOk]=useState("");
  const [quoteIdx]=useState(Math.floor(Math.random()*fashionQuotes.length));
  const quote=fashionQuotes[quoteIdx];
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const validate=()=>{const e={};if(mode==="signup"&&!form.name.trim())e.name="Name required";if(!form.email.includes("@"))e.email="Valid email required";if(form.password.length<6)e.password="6+ characters";if(mode==="signup"&&form.password!==form.confirm)e.confirm="Passwords don't match";return e;};
  const submit=()=>{
    const e=validate();if(Object.keys(e).length){setErr(e);return;}setErr({});
    const users=getUsers();
    if(mode==="signup"){
      if(users.find(u=>u.email===form.email)){setErr({email:"Email already registered"});return;}
      const nu={id:Date.now().toString(),name:form.name.trim(),email:form.email.toLowerCase(),password:form.password,role:"user",joinedAt:new Date().toISOString(),stylePersona:null,lastLogin:new Date().toISOString()};
      saveUsers([...users,nu]);saveSession(nu);addLog({action:`${nu.name} signed up`,email:nu.email,time:new Date().toISOString(),type:"signup"});
      setOk(`Welcome, ${nu.name}!`);setTimeout(()=>onLogin(nu),900);
    } else {
      const u=users.find(u=>u.email===form.email.toLowerCase()&&u.password===form.password);
      if(!u){setErr({password:"Invalid email or password"});return;}
      const updated=users.map(x=>x.id===u.id?{...x,lastLogin:new Date().toISOString()}:x);
      saveUsers(updated);const fresh=updated.find(x=>x.id===u.id);saveSession(fresh);
      addLog({action:`${fresh.name} logged in`,email:fresh.email,time:new Date().toISOString(),type:"login"});
      onLogin(fresh);
    }
  };
  return(
    <div className="login-wrap">
      <div className="login-left">
        <div className="login-left-inner">
          <div className="ll-big">Look<br/>book</div>
          <div className="ll-quote">"{quote.text}"</div>
          <div className="ll-author">— {quote.author}</div>
          <div className="ll-swatches">{[
            {hex:"#8b0a1a"},{hex:"#0a1628"},{hex:"#c1643c"},
            {hex:"#0d1f3c"},{hex:"#4a0610"},{hex:"#c9a0b0"},{hex:"#c9a96e"}
          ].map(s=><div key={s.hex} className="ll-swatch" style={{background:s.hex}}/>)}</div>
        </div>
      </div>
      <div className="login-right">
        <div className="lcard">
          <div className="l-logo">Look<span>book</span> Guide</div>
          <div className="l-tag">Your personal style companion</div>
          <div className="l-fashion-quote">"Fashion is the instant language." — Miuccia Prada</div>
          <div className="l-tabs">
            <button className={`ltab${mode==="login"?" active":""}`} onClick={()=>{setMode("login");setErr({});setOk("");}}>Sign In</button>
            <button className={`ltab${mode==="signup"?" active":""}`} onClick={()=>{setMode("signup");setErr({});setOk("");}}>Create Account</button>
          </div>
          {success?<div className="l-ok">✦ <em>{success}</em> Setting up your profile…</div>:(
            <>
              {mode==="signup"&&<div className="fg"><label className="flbl">Full Name</label><input className={`finput${errors.name?" err":""}`} placeholder="Sophia Mehra" value={form.name} onChange={e=>set("name",e.target.value)}/>{errors.name&&<div className="ferr">{errors.name}</div>}</div>}
              <div className="fg"><label className="flbl">Email</label><input className={`finput${errors.email?" err":""}`} type="email" placeholder="you@email.com" value={form.email} onChange={e=>set("email",e.target.value)}/>{errors.email&&<div className="ferr">{errors.email}</div>}</div>
              <div className="fg"><label className="flbl">Password</label><input className={`finput${errors.password?" err":""}`} type="password" placeholder="••••••••" value={form.password} onChange={e=>set("password",e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>{errors.password&&<div className="ferr">{errors.password}</div>}</div>
              {mode==="signup"&&<div className="fg"><label className="flbl">Confirm Password</label><input className={`finput${errors.confirm?" err":""}`} type="password" placeholder="••••••••" value={form.confirm} onChange={e=>set("confirm",e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>{errors.confirm&&<div className="ferr">{errors.confirm}</div>}</div>}
              <button className="lsubmit" onClick={submit}>{mode==="signup"?"Create Account & Discover My Style →":"Sign In →"}</button>
              <div className="l-hint">Demo admin: <strong>admin@lookbook.com</strong> / <strong>admin123</strong></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [search,setSearch]=useState("");

  useEffect(()=>{
    seedAdmin();
    const s=getSession();
    if(s){const fresh=getUsers().find(u=>u.id===s.id);if(fresh)setUser(fresh);}
  },[]);

  const handleLogin=u=>setUser(u);
  const handleLogout=()=>{clearSession();setUser(null);};

  if(!user) return(<><style>{CSS}</style><LoginPage onLogin={handleLogin}/></>);

  return(<>
    <style>{CSS}</style>

    <nav className="tnav">
      <div className="tnav-logo">Look<span>book</span></div>
      <div className="tnav-cats">{NAV_CATS.map(cat=><button key={cat} className="tnav-cat">{cat}</button>)}</div>
      <div className="tnav-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input placeholder="Search for products, brands and more" value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div className="tnav-right">
        <button className="tnav-icon"><span className="ico">🔔</span><span>Alerts</span></button>
        <button className="tnav-icon" onClick={handleLogout}>
          <div className="profile-avatar">{user.name.slice(0,2).toUpperCase()}</div>
          <span>Sign Out</span>
        </button>
        <button className="tnav-icon"><span className="ico">♡</span><span>Wishlist</span></button>
        <button className="tnav-icon"><span className="ico">🛍</span><span>Bag</span></button>
      </div>
    </nav>

    <HomePage/>
  </>);
}
