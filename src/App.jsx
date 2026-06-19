import { useState, useEffect, useRef } from "react";

const SK="lookbook_users",SEK="lookbook_session",LK="lookbook_login_log",CK="lookbook_cart";
const getUsers=()=>{try{return JSON.parse(localStorage.getItem(SK)||"[]")}catch{return[]}};
const saveUsers=u=>localStorage.setItem(SK,JSON.stringify(u));
const getSession=()=>{try{return JSON.parse(localStorage.getItem(SEK)||"null")}catch{return null}};
const saveSession=u=>localStorage.setItem(SEK,JSON.stringify(u));
const clearSession=()=>localStorage.removeItem(SEK);
const getLog=()=>{try{return JSON.parse(localStorage.getItem(LK)||"[]")}catch{return[]}};
const addLog=e=>{const l=[e,...getLog()].slice(0,200);localStorage.setItem(LK,JSON.stringify(l))};
const getCart=()=>{try{return JSON.parse(localStorage.getItem(CK)||"[]")}catch{return[]}};
const saveCart=c=>localStorage.setItem(CK,JSON.stringify(c));

const NAV_CATS=["MEN","WOMEN","KIDS","ACCESSORIES"];
const seasons=["All","Spring","Summer","Autumn","Winter"];

const fashionQuotes=[
  {text:"Style is a way to say who you are without having to speak.",author:"Rachel Zoe"},
  {text:"Elegance is not about being noticed, it's about being remembered.",author:"Giorgio Armani"},
  {text:"Dress shabbily and they remember the dress; dress impeccably and they remember the woman.",author:"Coco Chanel"},
  {text:"You can have anything you want in life if you dress for it.",author:"Edith Head"},
  {text:"Fashion is the armor to survive the reality of everyday life.",author:"Bill Cunningham"},
];

const richColors=[
  {name:"Sage Green",hex:"#9cad8f"},{name:"Olive",hex:"#6b6b35"},
  {name:"Deep Forest Green",hex:"#1d4a2a"},{name:"Chocolate",hex:"#3b1f10"},
  {name:"Terracotta",hex:"#c1643c"},{name:"Santal Blush",hex:"#b87a8a"},
  {name:"Mauve",hex:"#c9a0b0"},{name:"Light Pink",hex:"#f5c6d0"},
  {name:"Burgundy",hex:"#5c1a1a"},{name:"Cherry Red",hex:"#8b0000"},
  {name:"Dark Chocolate",hex:"#2c1a0e"},{name:"Black",hex:"#111111"},
  {name:"Deep Navy",hex:"#0a1628"},
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

// NEW PAGE BACKGROUND COLORS
const PAGE_COLORS={
  home:"#0a1628",        // Deep Navy
  women:"#1c0e08",       // Dark Chocolate
  men:"#0d1f3c",         // Deep Blue
  kids:"#5a0a14",        // Cherry Red Dark
  accessories:"#0f0f2e", // Deep Indigo
  cart:"#080f1e",        // Very deep navy
  wishlist:"#1a0008",    // Deep crimson black
  tips:"#0a1628",        // Deep navy
  quiz:"#06060f",        // Near black indigo
  history:"#1c0410",     // Deep cherry
  admin:"#0d1f3c",       // Deep blue
  builder:"#1c0e08",     // Dark chocolate
  login_left:"#8b0a1a",  // Cherry red
};

const outfits=[
  {id:1,season:"Summer",cat:"WOMEN",name:"Coastal Breeze",
   tags:["casual","beach","airy"],
   items:["Linen co-ord set","Straw tote bag","Espadrilles","Tortoise sunglasses"],
   tip:"Stick to a monochromatic palette for an effortless summery look.",
   img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
   colors:["Sage Green","Light Pink","Navy + Gold"],sizes:["XS","S","M","L","XL"],
   shopItems:[
     {name:"Linen Co-ord Set",price:"₹2,499",store:"ZARA",url:"https://www.zara.com/in/en/woman-linen-l1382.html",sizes:["XS","S","M","L","XL"]},
     {name:"Straw Tote Bag",price:"₹1,299",store:"H&M",url:"https://www2.hm.com/en_in/productpage.1083019001.html",sizes:["One Size"]},
     {name:"Espadrilles",price:"₹1,799",store:"Myntra",url:"https://www.myntra.com/espadrilles",sizes:["36","37","38","39","40","41"]},
   ]},
  {id:2,season:"Autumn",cat:"WOMEN",name:"Golden Hour",
   tags:["layered","earthy","work"],
   items:["Camel trench coat","Knit turtleneck","Wide-leg trousers","Ankle boots"],
   tip:"Layer textures — smooth leather over chunky knit creates rich contrast.",
   img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
   colors:["Chocolate","Terracotta","Cherry + Cream"],sizes:["XS","S","M","L","XL","XXL"],
   shopItems:[
     {name:"Camel Trench Coat",price:"₹4,999",store:"ZARA",url:"https://www.zara.com/in/en/woman-coats-jackets-l1303.html",sizes:["XS","S","M","L","XL"]},
     {name:"Knit Turtleneck",price:"₹1,499",store:"H&M",url:"https://www2.hm.com/en_in/productpage.0968603001.html",sizes:["S","M","L","XL"]},
     {name:"Wide-Leg Trousers",price:"₹2,199",store:"Myntra",url:"https://www.myntra.com/trousers-pants/women",sizes:["XS","S","M","L","XL"]},
     {name:"Ankle Boots",price:"₹3,299",store:"Nykaa",url:"https://www.nykaafashion.com/boots",sizes:["36","37","38","39","40"]},
   ]},
  {id:3,season:"Spring",cat:"WOMEN",name:"Petal Soft",
   tags:["feminine","floral","romantic"],
   items:["Floral midi dress","Strappy sandals","Mini crossbody bag","Gold hoops"],
   tip:"Pair florals with a neutral shoe to let the print breathe.",
   img:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
   colors:["Mauve","Santal Blush","Light Pink"],sizes:["XS","S","M","L","XL"],
   shopItems:[
     {name:"Floral Midi Dress",price:"₹2,799",store:"ZARA",url:"https://www.zara.com/in/en/woman-dresses-l1066.html",sizes:["XS","S","M","L","XL"]},
     {name:"Strappy Sandals",price:"₹1,599",store:"Myntra",url:"https://www.myntra.com/heeled-sandals",sizes:["36","37","38","39","40","41"]},
     {name:"Mini Crossbody Bag",price:"₹1,999",store:"H&M",url:"https://www2.hm.com/en_in/productpage.0990398001.html",sizes:["One Size"]},
   ]},
  {id:4,season:"Winter",cat:"WOMEN",name:"Library Hours",
   tags:["academic","preppy","smart"],
   items:["Plaid blazer","High-waist skirt","Loafers","Book tote"],
   tip:"Plaid works best when the rest of the outfit stays solid.",
   img:"https://images.unsplash.com/photo-1544957992-20514f595d6f?w=600&q=80",
   colors:["Chocolate","Midnight + Silver","Cherry Red"],sizes:["XS","S","M","L","XL"],
   shopItems:[
     {name:"Plaid Blazer",price:"₹3,499",store:"ZARA",url:"https://www.zara.com/in/en/woman-blazers-l1035.html",sizes:["XS","S","M","L","XL"]},
     {name:"High-Waist Skirt",price:"₹1,699",store:"H&M",url:"https://www2.hm.com/en_in/productpage.1098015001.html",sizes:["XS","S","M","L","XL"]},
     {name:"Classic Loafers",price:"₹2,499",store:"Myntra",url:"https://www.myntra.com/loafers",sizes:["36","37","38","39","40","41"]},
   ]},
  {id:5,season:"Winter",cat:"MEN",name:"Nordic Noir",
   tags:["moody","minimal","layered"],
   items:["Oversized wool coat","Black turtleneck","Slim trousers","Chelsea boots"],
   tip:"All-black with one statement texture piece keeps winter looks sharp.",
   img:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
   colors:["Deep Navy","Dark Chocolate","Navy + Gold"],sizes:["S","M","L","XL","XXL"],
   shopItems:[
     {name:"Oversized Wool Coat",price:"₹5,999",store:"ZARA",url:"https://www.zara.com/in/en/man-coats-l838.html",sizes:["S","M","L","XL","XXL"]},
     {name:"Black Turtleneck",price:"₹1,299",store:"H&M",url:"https://www2.hm.com/en_in/productpage.0968603001.html",sizes:["S","M","L","XL"]},
     {name:"Chelsea Boots",price:"₹2,999",store:"Myntra",url:"https://www.myntra.com/chelsea-boots",sizes:["40","41","42","43","44","45"]},
   ]},
  {id:6,season:"Summer",cat:"MEN",name:"Urban Ease",
   tags:["casual","streetwear","relaxed"],
   items:["Linen shirt","Chino shorts","Canvas sneakers","Crossbody bag"],
   tip:"Keep colours neutral and let silhouette do the work for summer.",
   img:"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80",
   colors:["Sage Green","Olive","Terracotta"],sizes:["S","M","L","XL","XXL"],
   shopItems:[
     {name:"Linen Shirt",price:"₹1,899",store:"H&M",url:"https://www2.hm.com/en_in/productpage.0968121001.html",sizes:["S","M","L","XL","XXL"]},
     {name:"Chino Shorts",price:"₹1,499",store:"Myntra",url:"https://www.myntra.com/chino-shorts",sizes:["28","30","32","34","36"]},
     {name:"Canvas Sneakers",price:"₹2,299",store:"Myntra",url:"https://www.myntra.com/canvas-shoes",sizes:["40","41","42","43","44","45"]},
   ]},
  {id:7,season:"Autumn",cat:"MEN",name:"Sharp Autumn",
   tags:["smart-casual","earthy","work"],
   items:["Corduroy blazer","White OCBD shirt","Dark chinos","Suede loafers"],
   tip:"Corduroy and suede are the definitive autumn textures for men.",
   img:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
   colors:["Terracotta","Chocolate","Deep Blue + Rust"],sizes:["S","M","L","XL","XXL"],
   shopItems:[
     {name:"Corduroy Blazer",price:"₹3,799",store:"ZARA",url:"https://www.zara.com/in/en/man-blazers-l838.html",sizes:["S","M","L","XL"]},
     {name:"OCBD Shirt",price:"₹1,299",store:"H&M",url:"https://www2.hm.com/en_in/productpage.0817359001.html",sizes:["S","M","L","XL","XXL"]},
     {name:"Dark Chinos",price:"₹1,799",store:"Myntra",url:"https://www.myntra.com/chinos",sizes:["28","30","32","34","36"]},
   ]},
  {id:8,season:"Spring",cat:"MEN",name:"Morning Track",
   tags:["sporty","fresh","activewear"],
   items:["Track jacket","Joggers","Chunky sneakers","Cap"],
   tip:"Tonal sportswear in one colour family is effortless and always works.",
   img:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
   colors:["Deep Navy","Sage Green","Navy + Gold"],sizes:["S","M","L","XL","XXL"],
   shopItems:[
     {name:"Track Jacket",price:"₹2,199",store:"Myntra",url:"https://www.myntra.com/track-jackets",sizes:["S","M","L","XL","XXL"]},
     {name:"Joggers",price:"₹1,399",store:"H&M",url:"https://www2.hm.com/en_in/productpage.0777186006.html",sizes:["S","M","L","XL","XXL"]},
     {name:"Chunky Sneakers",price:"₹3,499",store:"Myntra",url:"https://www.myntra.com/platform-sneakers",sizes:["40","41","42","43","44","45"]},
   ]},
  {id:9,season:"Spring",cat:"KIDS",name:"Garden Play",
   tags:["playful","colourful","casual"],
   items:["Floral smock dress","Mary Jane flats","Mini backpack","Hair clips set"],
   tip:"Bright prints and comfortable shoes make the perfect kids' spring look.",
   img:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
   colors:["Mauve","Light Pink","Sage Green"],sizes:["2Y","4Y","6Y","8Y","10Y"],
   shopItems:[
     {name:"Floral Smock Dress",price:"₹999",store:"H&M Kids",url:"https://www2.hm.com/en_in/kids/girls-2-8y.html",sizes:["2Y","4Y","6Y","8Y","10Y"]},
     {name:"Mary Jane Flats",price:"₹799",store:"Myntra",url:"https://www.myntra.com/girls-mary-jane",sizes:["28","29","30","31","32","33"]},
     {name:"Mini Backpack",price:"₹649",store:"Myntra",url:"https://www.myntra.com/kids-bags",sizes:["One Size"]},
   ]},
  {id:10,season:"Autumn",cat:"KIDS",name:"School Cool",
   tags:["back-to-school","practical","fun"],
   items:["Denim jacket","Graphic tee","Cargo trousers","Trainers"],
   tip:"Denim is the most durable and versatile kids' fabric — invest in a good jacket.",
   img:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
   colors:["Dark Chocolate","Terracotta","Cherry Red"],sizes:["2Y","4Y","6Y","8Y","10Y","12Y"],
   shopItems:[
     {name:"Denim Jacket",price:"₹1,299",store:"H&M Kids",url:"https://www2.hm.com/en_in/kids/girls-2-8y.html",sizes:["2Y","4Y","6Y","8Y","10Y"]},
     {name:"Graphic Tee",price:"₹499",store:"Myntra",url:"https://www.myntra.com/kids-tshirts",sizes:["2Y","4Y","6Y","8Y","10Y","12Y"]},
     {name:"Cargo Trousers",price:"₹899",store:"Myntra",url:"https://www.myntra.com/kids-trousers",sizes:["2Y","4Y","6Y","8Y","10Y"]},
   ]},
  {id:11,season:"Winter",cat:"KIDS",name:"Cosy Bundle",
   tags:["warm","layered","cute"],
   items:["Puffer jacket","Thermal turtleneck","Corduroy trousers","Ankle boots"],
   tip:"Layer thermals underneath for extra warmth without bulk.",
   img:"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
   colors:["Cherry Red","Chocolate","Dark Chocolate"],sizes:["2Y","4Y","6Y","8Y","10Y"],
   shopItems:[
     {name:"Puffer Jacket",price:"₹1,799",store:"H&M Kids",url:"https://www2.hm.com/en_in/kids/girls-2-8y.html",sizes:["2Y","4Y","6Y","8Y","10Y"]},
     {name:"Thermal Turtleneck",price:"₹699",store:"Myntra",url:"https://www.myntra.com/kids-thermals",sizes:["2Y","4Y","6Y","8Y","10Y"]},
     {name:"Corduroy Trousers",price:"₹999",store:"Myntra",url:"https://www.myntra.com/kids-trousers",sizes:["2Y","4Y","6Y","8Y","10Y"]},
   ]},
  {id:12,season:"Summer",cat:"KIDS",name:"Beach Bub",
   tags:["summer","beach","bright"],
   items:["Swim shorts","Rash guard","Flip flops","Bucket hat"],
   tip:"UV-protective rash guards are a must for beach days with kids.",
   img:"https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80",
   colors:["Sage Green","Light Pink","Terracotta"],sizes:["2Y","4Y","6Y","8Y","10Y"],
   shopItems:[
     {name:"Swim Shorts",price:"₹599",store:"H&M Kids",url:"https://www2.hm.com/en_in/kids/boys-2-8y.html",sizes:["2Y","4Y","6Y","8Y","10Y"]},
     {name:"Rash Guard",price:"₹749",store:"Myntra",url:"https://www.myntra.com/kids-swimwear",sizes:["2Y","4Y","6Y","8Y","10Y"]},
     {name:"Bucket Hat",price:"₹349",store:"Myntra",url:"https://www.myntra.com/kids-hats",sizes:["One Size"]},
   ]},
  /* ── Extra Women outfits to cover all seasons ── */
  {id:13,season:"Winter",cat:"WOMEN",name:"Snow Minimal",
   tags:["minimal","monochrome","chic"],
   items:["Oversized cashmere sweater","Straight-leg jeans","Snow boots","Knit beret"],
   tip:"An oversized knit in cream or oatmeal is winter's ultimate statement piece.",
   img:"https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80",
   colors:["Deep Navy","Mauve","Midnight + Silver"],sizes:["XS","S","M","L","XL"],
   shopItems:[
     {name:"Cashmere Sweater",price:"₹3,999",store:"ZARA",url:"https://www.zara.com/in/en/woman-knitwear-l1091.html",sizes:["XS","S","M","L","XL"]},
     {name:"Straight-Leg Jeans",price:"₹2,299",store:"H&M",url:"https://www2.hm.com/en_in/productpage.1084980001.html",sizes:["XS","S","M","L","XL"]},
     {name:"Snow Boots",price:"₹4,499",store:"Myntra",url:"https://www.myntra.com/boots",sizes:["36","37","38","39","40"]},
   ]},
  {id:14,season:"Summer",cat:"WOMEN",name:"Sun Sundress",
   tags:["breezy","feminine","vacation"],
   items:["Crochet sundress","Slide sandals","Raffia clutch","Shell jewellery"],
   tip:"Crochet and natural fibres are summer's most tactile and breathable choice.",
   img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
   colors:["Santal Blush","Light Pink","Mauve"],sizes:["XS","S","M","L","XL"],
   shopItems:[
     {name:"Crochet Sundress",price:"₹2,199",store:"ZARA",url:"https://www.zara.com/in/en/woman-dresses-l1066.html",sizes:["XS","S","M","L","XL"]},
     {name:"Slide Sandals",price:"₹1,199",store:"Myntra",url:"https://www.myntra.com/slides",sizes:["36","37","38","39","40","41"]},
     {name:"Raffia Clutch",price:"₹1,499",store:"H&M",url:"https://www2.hm.com/en_in/productpage.0990398001.html",sizes:["One Size"]},
   ]},
];

const accessories=[
  // ── Bags ──
  {id:"a1",name:"Structured Leather Tote",price:"₹4,499",store:"ZARA",
   img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
   url:"https://www.zara.com/in/en/woman-bags-l1024.html",tag:"Bags",sizes:["One Size"],
   seasons:["Spring","Summer","Autumn","Winter"],
   desc:"Clean structured tote in pebbled leather — the workhorse of any wardrobe."},
  {id:"a2",name:"Mini Crossbody Bag",price:"₹1,799",store:"Myntra",
   img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80",
   url:"https://www.myntra.com/sling-bags/women",tag:"Bags",sizes:["One Size"],
   seasons:["Spring","Summer"],
   desc:"Lightweight mini crossbody for hands-free warm-weather outings."},
  {id:"a3",name:"Raffia Basket Bag",price:"₹1,499",store:"H&M",
   img:"https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?w=400&q=80",
   url:"https://www2.hm.com/en_in/productpage.0990398001.html",tag:"Bags",sizes:["One Size"],
   seasons:["Summer"],
   desc:"Woven raffia basket bag — the quintessential beach and holiday accessory."},
  {id:"a4",name:"Quilted Chain Bag",price:"₹3,499",store:"ZARA",
   img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
   url:"https://www.zara.com/in/en/woman-bags-l1024.html",tag:"Bags",sizes:["One Size"],
   seasons:["Autumn","Winter"],
   desc:"Quilted chain-strap evening bag that elevates any formal or party look."},
  // ── Jewellery ──
  {id:"a5",name:"Gold Hoop Earrings",price:"₹899",store:"Myntra",
   img:"https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80",
   url:"https://www.myntra.com/earrings/women",tag:"Jewellery",sizes:["One Size"],
   seasons:["Spring","Summer","Autumn","Winter"],
   desc:"Classic medium gold hoops — the one earring that works with every outfit."},
  {id:"a6",name:"Layered Necklace Set",price:"₹1,299",store:"Myntra",
   img:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
   url:"https://www.myntra.com/necklaces/women",tag:"Jewellery",sizes:["One Size"],
   seasons:["Spring","Summer"],
   desc:"Dainty layered chains in gold tone, sold as a three-piece set."},
  {id:"a7",name:"Beaded Bracelet Stack",price:"₹649",store:"H&M",
   img:"https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80",
   url:"https://www2.hm.com/en_in/productpage.0875123001.html",tag:"Jewellery",sizes:["One Size"],
   seasons:["Spring","Summer","Autumn","Winter"],
   desc:"Colourful bead bracelets worn stacked — playful and easy to mix."},
  // ── Eyewear ──
  {id:"a8",name:"Tortoise Sunglasses",price:"₹899",store:"H&M",
   img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
   url:"https://www2.hm.com/en_in/productpage.0890456001.html",tag:"Eyewear",sizes:["One Size"],
   seasons:["Spring","Summer"],
   desc:"Classic tortoise-shell oval frames — timeless UV protection all season."},
  // ── Scarves ──
  {id:"a9",name:"Silk Twill Scarf",price:"₹1,499",store:"Myntra",
   img:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
   url:"https://www.myntra.com/scarf/women",tag:"Scarves",sizes:["One Size"],
   seasons:["Spring","Autumn"],
   desc:"Printed silk twill scarf — wear around neck, head, or bag handle."},
  {id:"a10",name:"Chunky Knit Scarf",price:"₹999",store:"H&M",
   img:"https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&q=80",
   url:"https://www2.hm.com/en_in/productpage.0968603001.html",tag:"Scarves",sizes:["One Size"],
   seasons:["Autumn","Winter"],
   desc:"Oversized ribbed knit scarf in warm wool blend — essential winter layering."},
  // ── Hair ──
  {id:"a11",name:"Velvet Scrunchie Set",price:"₹349",store:"Nykaa",
   img:"https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?w=400&q=80",
   url:"https://www.nykaa.com/hair-accessories",tag:"Hair",sizes:["One Size"],
   seasons:["Spring","Summer","Autumn","Winter"],
   desc:"Five-pack of velvet and satin scrunchies in seasonal tones — gentle on hair."},
  {id:"a12",name:"Acetate Claw Clip",price:"₹249",store:"Myntra",
   img:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
   url:"https://www.myntra.com/hair-accessories/women",tag:"Hair",sizes:["One Size"],
   seasons:["Spring","Summer","Autumn","Winter"],
   desc:"Oversized acetate claw clip for an effortless up-do — trending and practical."},
  {id:"a13",name:"Satin Headband",price:"₹399",store:"Myntra",
   img:"https://images.unsplash.com/photo-1610828552-dc2c0d7ac5f1?w=400&q=80",
   url:"https://www.myntra.com/hair-accessories/women",tag:"Hair",sizes:["One Size"],
   seasons:["Spring","Summer"],
   desc:"Padded satin headband — a polished finishing touch for any feminine look."},
  // ── Hats ──
  {id:"a14",name:"Wide Brim Sun Hat",price:"₹999",store:"H&M",
   img:"https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=400&q=80",
   url:"https://www2.hm.com/en_in/productpage.0977281001.html",tag:"Hats",sizes:["S/M","L/XL"],
   seasons:["Summer","Spring"],
   desc:"Floppy wide-brim hat in woven straw — sun protection done stylishly."},
  // ── Belts ──
  {id:"a15",name:"Leather Waist Belt",price:"₹799",store:"Myntra",
   img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
   url:"https://www.myntra.com/belts",tag:"Belts",sizes:["S","M","L","XL"],
   seasons:["Autumn","Winter","Spring"],
   desc:"Slim genuine leather belt with gold buckle — cinch any silhouette effortlessly."},
];

const quizQuestions=[
  {q:"What's your ideal weekend plan?",opts:["Gallery hop & slow café mornings","Hiking & outdoor adventure","Rooftop brunch & socialising","Cozy bookshop & home evenings"]},
  {q:"Your go-to colour palette?",opts:["Neutrals & earth tones","Bold brights & statement hues","Soft pastels & blush tones","All black, always"]},
  {q:"Pick your dream shoe:",opts:["Loafers or ballet flats","Chunky sneakers or trail runners","Strappy heeled sandals","Chelsea or combat boots"]},
  {q:"How would friends describe your style?",opts:["Polished & refined","Energetic & cool","Dreamy & romantic","Edgy & intentional"]},
  {q:"Your go-to fashion decade for inspo?",opts:["70s & 90s minimalism","90s streetwear & Y2K","60s & 70s florals","80s avant-garde & goth"]},
];
const answerWeights=[
  [[3,0,0,1],[0,3,0,1],[0,1,3,0],[1,0,0,3]],
  [[3,0,0,0],[0,0,1,3],[0,0,3,1],[0,0,0,3]],
  [[3,0,0,1],[0,3,0,0],[0,0,3,1],[1,0,0,3]],
  [[3,0,0,1],[0,3,0,0],[0,0,3,0],[0,0,0,3]],
  [[2,1,0,1],[0,3,0,1],[0,0,3,0],[0,0,0,3]],
];
const quizResults=[
  {label:"Quiet Luxe",emoji:"✦",desc:"Understated elegance with elevated basics.",
   palette:["#c9a96e","#8b7355","#f7f3ec","#0a1628"],
   tips:[{icon:"◈",title:"Invest in Basics",body:"A perfectly cut camel coat does more than ten trendy pieces."},{icon:"✦",title:"Tonal Dressing",body:"Build outfits in one colour family — beige, ivory, and tan."},{icon:"❋",title:"Minimal Accessories",body:"One statement piece anchors the whole look."},{icon:"⟡",title:"Texture Over Print",body:"Let fabric do the storytelling instead of patterns."}]},
  {label:"Sporty Chic",emoji:"◎",desc:"Athleisure meets street — functional and fresh.",
   palette:["#2d6a4f","#40916c","#d8f3dc","#1b1b1b"],
   tips:[{icon:"◎",title:"Mix Athletic & Tailored",body:"Track pants with a blazer — the contrast is the point."},{icon:"✦",title:"Monochrome Sport",body:"Head-to-toe matching sets look intentional."},{icon:"❋",title:"Statement Sneaker",body:"Let the sneaker be the hero."},{icon:"⟡",title:"Functional Accessories",body:"Crossbody bags and caps blend practicality with style."}]},
  {label:"Romantic Bloom",emoji:"❋",desc:"Soft silhouettes and florals that feel timeless.",
   palette:["#f4a7b9","#e8cdd7","#fff0f3","#6d3b47"],
   tips:[{icon:"❋",title:"Floral Formula",body:"Pair a bold floral with a neutral shoe."},{icon:"✦",title:"Volume Balance",body:"Voluminous skirt + fitted top."},{icon:"◈",title:"Delicate Layering",body:"Dainty gold necklaces in varying lengths."},{icon:"⟡",title:"Soft Colour Mixing",body:"Blush with sage, lavender with butter yellow."}]},
  {label:"Dark Editorial",emoji:"◈",desc:"Moody, minimal, and always intentional.",
   palette:["#0a1628","#3d2b1f","#6b4c3b","#f0ebe4"],
   tips:[{icon:"◈",title:"Texture is Everything",body:"All-black needs texture play — leather against velvet."},{icon:"✦",title:"Proportional Drama",body:"Oversized silhouettes with one sharp element."},{icon:"❋",title:"Statement Architecture",body:"Exaggerated shoulders, asymmetric hems."},{icon:"⟡",title:"Monochrome Mastery",body:"Varying shades of black read as sophisticated."}]},
];

const builderPieces={
  top:["Silk blouse","Crop tank","Linen shirt","Turtleneck","Oversized blazer","Off-shoulder top"],
  bottom:["Wide-leg trousers","Mini skirt","Cargo shorts","Midi skirt","Flared jeans","Tailored shorts"],
  shoes:["Loafers","Chunky sneakers","Heeled sandals","Chelsea boots","Ballet flats","Platform mules"],
  bag:["Mini crossbody","Structured tote","Clutch","Canvas backpack","Baguette bag","Bucket bag"],
};
const builderSizes={
  top:["XS","S","M","L","XL","XXL"],
  bottom:["XS/28","S/30","M/32","L/34","XL/36"],
  shoes:["36","37","38","39","40","41","42"],
  bag:["One Size"],
};
const personaSuggestions={
  "Quiet Luxe":{top:0,bottom:0,shoes:0,bag:1,note:"Silk blouse + wide-leg trousers + loafers = effortless quiet luxury."},
  "Sporty Chic":{top:1,bottom:2,shoes:1,bag:3,note:"Crop tank + cargo shorts + chunky sneakers is peak sporty chic."},
  "Romantic Bloom":{top:5,bottom:3,shoes:2,bag:4,note:"Off-shoulder + midi skirt + heeled sandals radiates romantic elegance."},
  "Dark Editorial":{top:4,bottom:5,shoes:3,bag:2,note:"Oversized blazer + tailored shorts + Chelsea boots — editorial perfection."},
};

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
  /* BRAND PALETTE */
  --steel:#6A89A7;       /* Steel Blue — primary brand */
  --sky:#BDDDFC;         /* Sky Blue — light accent */
  --cornflower:#88BDF2;  /* Cornflower — mid accent */
  --slate:#384959;       /* Slate Navy — deep / text */

  /* Derived tones */
  --steel-dark:#4a6b8a;
  --steel-darker:#2e4f6a;
  --slate-dark:#252f38;
  --slate-darker:#161e25;
  --slate-deepest:#0d1419;
  --sky-muted:#a5c8e8;
  --cornflower-dark:#5fa0d8;

  /* Utility */
  --warm:#c9a96e;--warm-light:#e8d9bf;--pink:#ff3f6c;--green:#0db27f;
  --cream:#f7f3ec;

  /* Legacy aliases (keep existing class references working) */
  --navy:var(--slate-darker);
  --navy-mid:var(--slate-dark);
  --navy-light:#2e4050;
  --cherry:var(--steel-darker);
  --cherry-mid:var(--steel-dark);
  --cherry-dark:#253545;
  --choc:var(--slate-deepest);
  --choc-mid:var(--slate-darker);
  --choc-light:var(--slate-dark);
  --indigo:#1a2a3a;
  --indigo-mid:#1e3145;
  --ink:#0a1018;

  --sage:#9cad8f;--olive:#6b6b35;
  --terra:var(--cornflower);--mauve:#c9a0b0;
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
.tnav-cat:hover{color:#fff;}
.tnav-cat.active{color:var(--sky);border-color:var(--cornflower);}
.tnav-search{flex:1;max-width:360px;margin:0 1rem;display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.07);border:1px solid rgba(136,189,242,0.2);border-radius:4px;padding:0.45rem 0.8rem;transition:border-color 0.2s;}
.tnav-search:focus-within{border-color:rgba(136,189,242,0.6);}
.tnav-search input{background:none;border:none;outline:none;font-size:0.8rem;color:#fff;width:100%;}
.tnav-search input::placeholder{color:rgba(255,255,255,0.35);}
.tnav-right{display:flex;align-items:center;}
.tnav-icon{display:flex;flex-direction:column;align-items:center;justify-content:center;background:none;border:none;cursor:pointer;padding:0 0.75rem;height:60px;font-size:0.6rem;font-weight:600;letter-spacing:0.05em;color:rgba(255,255,255,0.6);gap:0.15rem;text-decoration:none;transition:color 0.15s;position:relative;}
.tnav-icon:hover{color:#fff;}
.tnav-icon .ico{font-size:1.2rem;line-height:1;}
.cart-badge{position:absolute;top:8px;right:4px;background:var(--steel);color:#fff;border-radius:50%;width:14px;height:14px;font-size:0.52rem;display:flex;align-items:center;justify-content:center;font-weight:700;}

/* ── PROFILE DROPDOWN ── */
.profile-wrap{position:relative;}
.profile-avatar{width:28px;height:28px;border-radius:50%;background:var(--cornflower);color:var(--slate-darker);display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:700;}
.profile-dropdown{position:absolute;top:66px;right:0;width:280px;background:var(--slate-darker);border:1px solid rgba(136,189,242,0.25);box-shadow:0 16px 48px rgba(0,0,0,0.65);z-index:400;animation:dropIn 0.18s ease;}
@keyframes dropIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
.pd-welcome{padding:1.25rem;}
.pd-welcome-title{font-size:1rem;font-weight:700;color:#fff;margin-bottom:0.2rem;}
.pd-welcome-sub{font-size:0.76rem;color:rgba(255,255,255,0.5);}
.pd-login-btn{display:block;margin:0.75rem 0 0;padding:0.6rem;border:1.5px solid var(--cornflower);background:none;color:var(--cornflower);font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-align:center;cursor:pointer;text-transform:uppercase;transition:all 0.15s;width:100%;}
.pd-login-btn:hover{background:var(--cornflower);color:var(--slate-darker);}
.pd-divider{border:none;border-top:1px solid rgba(136,189,242,0.15);}
.pd-section{padding:0.5rem 0;}
.pd-item{display:flex;align-items:center;gap:0.75rem;padding:0.55rem 1.25rem;cursor:pointer;font-size:0.82rem;color:rgba(255,255,255,0.75);transition:background 0.12s;}
.pd-item:hover{background:rgba(136,189,242,0.1);}
.pd-item .pd-icon{font-size:1rem;width:20px;text-align:center;flex-shrink:0;}
.pd-user-info{padding:0.85rem 1.25rem;border-bottom:1px solid rgba(136,189,242,0.15);}
.pd-user-name{font-size:0.85rem;font-weight:700;color:#fff;}
.pd-user-email{font-size:0.72rem;color:rgba(255,255,255,0.45);}
.pd-persona{display:inline-block;margin-top:0.3rem;font-size:0.62rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;background:rgba(136,189,242,0.18);color:var(--sky);padding:0.15rem 0.5rem;}
.pd-signout{width:100%;background:none;border:none;padding:0.7rem 1.25rem;text-align:left;font-size:0.8rem;color:rgba(255,255,255,0.4);cursor:pointer;border-top:1px solid rgba(136,189,242,0.15);transition:color 0.15s;}
.pd-signout:hover{color:var(--cornflower);}

/* ── SUBNAV ── */
.subnav{
  background:rgba(10,16,24,0.75);
  backdrop-filter:blur(8px);
  border-bottom:1px solid rgba(136,189,242,0.1);
  display:flex;overflow-x:auto;padding:0 2rem;
  position:sticky;top:60px;z-index:290;
}
.subnav::-webkit-scrollbar{display:none;}
.snbtn{background:none;border:none;cursor:pointer;padding:0.72rem 1rem;font-size:0.72rem;font-weight:500;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.45);border-bottom:2px solid transparent;white-space:nowrap;transition:all 0.15s;}
.snbtn:hover{color:rgba(255,255,255,0.8);}
.snbtn.active{color:var(--sky);border-color:var(--cornflower);font-weight:700;}

/* ── PAGE WRAPPERS ── */
.page-navy{background:var(--slate-darker);min-height:calc(100vh - 106px);}
.page-navy-mid{background:var(--slate-dark);min-height:calc(100vh - 106px);}
.page-choc{background:var(--slate-deepest);min-height:calc(100vh - 106px);}
.page-choc-mid{background:linear-gradient(135deg,var(--slate-deepest) 0%,var(--slate-darker) 100%);min-height:calc(100vh - 106px);}
.page-cherry{background:var(--steel-darker);min-height:calc(100vh - 106px);}
.page-indigo{background:linear-gradient(135deg,var(--slate-darker) 0%,var(--steel-darker) 100%);min-height:calc(100vh - 106px);}
.page-ink{background:var(--slate-deepest);min-height:calc(100vh - 106px);}
.page-deep-cherry{background:var(--steel-darker);min-height:calc(100vh - 106px);}
.page-deepnavy{background:var(--slate-deepest);min-height:calc(100vh - 106px);}

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

/* Colour combos section */
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

/* ── LOOKBOOK GRID ── */
.lkwrap{padding:1.5rem 2rem 3rem;}
.lk-hdr{margin-bottom:1rem;}
.lk-title{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:300;color:#fff;}
.lk-count{font-size:0.76rem;color:rgba(255,255,255,0.45);margin-top:0.2rem;}
.season-bar{display:flex;gap:0.45rem;flex-wrap:wrap;margin-bottom:1.25rem;}
.sbtn{background:rgba(255,255,255,0.07);border:1px solid rgba(136,189,242,0.2);padding:0.28rem 0.85rem;font-size:0.72rem;letter-spacing:0.07em;text-transform:uppercase;cursor:pointer;color:rgba(255,255,255,0.6);transition:all 0.15s;}
.sbtn.active,.sbtn:hover{background:var(--steel);color:#fff;border-color:var(--steel);font-weight:700;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;}

/* ── CARD ── */
.card{background:rgba(0,0,0,0.3);border:1px solid rgba(136,189,242,0.12);opacity:0;animation:fadeUp 0.4s ease forwards;transition:box-shadow 0.2s,border-color 0.2s;}
.card:hover{box-shadow:0 8px 30px rgba(0,0,0,0.5);border-color:rgba(136,189,242,0.35);}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
.card-img-wrap{position:relative;overflow:hidden;aspect-ratio:3/4;}
.card-img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform 0.5s;}
.card:hover .card-img{transform:scale(1.04);}
.season-badge{position:absolute;top:10px;left:10px;background:rgba(13,20,25,0.9);color:var(--sky);font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.55rem;}
.wbtn{position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.2);width:32px;height:32px;border-radius:50%;font-size:1.05rem;cursor:pointer;color:rgba(255,255,255,0.6);transition:all 0.15s;}
.wbtn.on{color:var(--cornflower);border-color:var(--cornflower);}
.wbtn:hover{transform:scale(1.12);}
.card-body{padding:1rem;}
.cname{font-size:0.92rem;font-weight:600;margin-bottom:0.3rem;color:#fff;}
.tags{display:flex;gap:0.3rem;flex-wrap:wrap;margin-bottom:0.5rem;}
.tag{font-size:0.63rem;color:rgba(255,255,255,0.4);}
.color-dots{display:flex;gap:0.3rem;margin-bottom:0.65rem;align-items:center;}
.color-dot{width:13px;height:13px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.15);}
.color-dot-label{font-size:0.6rem;color:rgba(255,255,255,0.4);}
.items-list{list-style:none;margin-bottom:0.85rem;}
.items-list li{font-size:0.77rem;color:rgba(255,255,255,0.6);padding:0.14rem 0;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;gap:0.4rem;}
.items-list li::before{content:"—";color:var(--cornflower);}
.card-actions{display:flex;gap:0.45rem;flex-wrap:wrap;}
.bsm{font-size:0.69rem;letter-spacing:0.06em;text-transform:uppercase;padding:0.32rem 0.8rem;cursor:pointer;border:1px solid rgba(255,255,255,0.18);background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.75);transition:all 0.15s;}
.bsm:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.35);}
.bsm.shop{border-color:var(--cornflower);color:var(--cornflower);font-weight:700;}
.bsm.shop:hover{background:var(--cornflower);color:var(--slate-darker);}
.bsm.addcart{border-color:#0db27f;color:#0db27f;font-weight:700;}
.bsm.addcart:hover{background:#0db27f;color:#fff;}
.tip-box{margin-top:0.65rem;padding:0.55rem 0.8rem;background:rgba(136,189,242,0.1);border-left:3px solid var(--cornflower);font-size:0.75rem;font-style:italic;color:rgba(255,255,255,0.7);}

/* ── SHOP MODAL ── */
.modal-ov{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.75);display:flex;align-items:flex-end;justify-content:center;}
@media(min-width:600px){.modal-ov{align-items:center;padding:1rem;}}
.modal-box{
  background:linear-gradient(160deg, var(--slate-dark) 0%, var(--slate-darker) 100%);
  border:1px solid rgba(136,189,242,0.25);
  width:100%;max-width:520px;max-height:92vh;overflow-y:auto;padding:2rem;
  border-radius:12px 12px 0 0;animation:slideUp 0.26s ease;
}
@media(min-width:600px){.modal-box{border-radius:10px;animation:popIn 0.2s ease;}}
@keyframes slideUp{from{transform:translateY(40px);opacity:0;}to{transform:translateY(0);opacity:1;}}
@keyframes popIn{from{transform:scale(0.94);opacity:0;}to{transform:scale(1);opacity:1;}}
.mhdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;}
.mname{font-size:1.2rem;font-weight:700;color:#fff;}
.mclose{background:none;border:1px solid rgba(255,255,255,0.2);width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:1rem;color:rgba(255,255,255,0.6);transition:all 0.15s;}
.mclose:hover{background:rgba(255,255,255,0.12);}
.mimg{width:100%;height:200px;object-fit:cover;object-position:top;border-radius:6px;margin-bottom:1.25rem;}
.mlabel{font-size:0.67rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--sky);margin-bottom:0.75rem;font-weight:700;}
.sitem{border-bottom:1px solid rgba(255,255,255,0.08);padding:0.85rem 0;}
.sitem:last-child{border-bottom:none;}
.si-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.55rem;}
.si-name{font-size:0.84rem;font-weight:600;margin-bottom:0.1rem;color:#fff;}
.si-store{font-size:0.7rem;color:rgba(255,255,255,0.4);}
.si-price{font-size:0.98rem;font-weight:700;margin-right:0.55rem;color:#fff;}
.si-btn{background:var(--cornflower);color:var(--slate-darker);border:none;padding:0.33rem 0.85rem;cursor:pointer;font-size:0.68rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;display:inline-block;transition:all 0.15s;}
.si-btn:hover{background:var(--sky);}
.size-row{display:flex;gap:0.35rem;flex-wrap:wrap;align-items:center;}
.size-lbl{font-size:0.64rem;color:rgba(255,255,255,0.4);margin-right:0.2rem;letter-spacing:0.06em;text-transform:uppercase;}
.sz-btn{border:1px solid rgba(136,189,242,0.25);background:rgba(136,189,242,0.06);padding:0.2rem 0.48rem;font-size:0.65rem;cursor:pointer;color:rgba(255,255,255,0.7);transition:all 0.12s;font-weight:600;}
.sz-btn:hover{border-color:var(--cornflower);}
.sz-btn.selected{background:var(--cornflower);color:var(--slate-darker);border-color:var(--cornflower);}
.sz-addcart{border:1px solid #0db27f;background:none;color:#0db27f;padding:0.22rem 0.7rem;font-size:0.65rem;font-weight:700;cursor:pointer;letter-spacing:0.04em;text-transform:uppercase;transition:all 0.12s;}
.sz-addcart:hover{background:#0db27f;color:#fff;}
.sz-added{color:#0db27f;font-size:0.7rem;font-weight:700;}

/* ── ACCESSORIES ── */
.acc-page{padding:1.5rem 2rem 3rem;}
.acc-hdr h2{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:300;color:#fff;margin-bottom:0.2rem;}
.acc-hdr p{font-size:0.81rem;color:rgba(255,255,255,0.45);margin-bottom:1.25rem;}
.acc-filters{display:flex;gap:0.45rem;flex-wrap:wrap;margin-bottom:1.5rem;}
.afbtn{background:rgba(255,255,255,0.07);border:1px solid rgba(136,189,242,0.2);padding:0.28rem 0.85rem;font-size:0.71rem;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;color:rgba(255,255,255,0.6);transition:all 0.15s;}
.afbtn.active,.afbtn:hover{background:var(--steel);color:#fff;border-color:var(--steel);font-weight:700;}
.acc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1.25rem;}
.accard{background:rgba(255,255,255,0.04);border:1px solid rgba(136,189,242,0.12);cursor:pointer;transition:all 0.2s;}
.accard:hover{border-color:rgba(136,189,242,0.4);box-shadow:0 4px 20px rgba(0,0,0,0.4);}
.accard img{width:100%;aspect-ratio:1;object-fit:cover;display:block;}
.accbody{padding:0.75rem;}
.actag{font-size:0.6rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--cornflower);margin-bottom:0.18rem;}
.acname{font-size:0.83rem;font-weight:600;margin-bottom:0.18rem;color:#fff;}
.acrow{display:flex;align-items:center;justify-content:space-between;margin-top:0.4rem;}
.acprice{font-size:0.86rem;font-weight:700;color:#fff;}
.acbtn{background:var(--steel);color:#fff;border:none;padding:0.28rem 0.72rem;font-size:0.66rem;font-weight:700;cursor:pointer;text-decoration:none;display:inline-block;letter-spacing:0.05em;transition:all 0.15s;}
.acbtn:hover{background:var(--cornflower);color:var(--slate-darker);}
.ac-sizes{display:flex;gap:0.3rem;flex-wrap:wrap;margin-top:0.4rem;}

/* ── CART ── */
.cart-page{padding:2rem;}
.cart-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;margin-bottom:0.25rem;color:#fff;}
.cart-sub{font-size:0.8rem;color:rgba(255,255,255,0.4);margin-bottom:1.5rem;}
.cart-empty{text-align:center;padding:4rem 2rem;color:rgba(255,255,255,0.4);}
.cart-empty-ico{font-size:3rem;margin-bottom:1rem;}
.cart-layout{display:grid;grid-template-columns:1fr 340px;gap:2rem;align-items:start;}
@media(max-width:800px){.cart-layout{grid-template-columns:1fr;}}
.cart-item{display:flex;gap:1rem;padding:1.25rem 0;border-bottom:1px solid rgba(255,255,255,0.07);}
.ci-img{width:90px;height:110px;object-fit:cover;object-position:top;flex-shrink:0;border:1px solid rgba(136,189,242,0.12);}
.ci-info{flex:1;}
.ci-outfit{font-size:0.7rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--cornflower);margin-bottom:0.2rem;}
.ci-name{font-size:0.9rem;font-weight:600;margin-bottom:0.15rem;color:#fff;}
.ci-store{font-size:0.72rem;color:rgba(255,255,255,0.4);}
.ci-size{font-size:0.7rem;color:var(--sky);font-weight:700;margin-top:0.2rem;}
.ci-price{font-size:1rem;font-weight:700;color:#fff;margin-top:0.4rem;}
.ci-remove{background:none;border:none;font-size:0.72rem;color:rgba(255,255,255,0.3);cursor:pointer;text-decoration:underline;margin-top:0.4rem;display:block;transition:color 0.15s;}
.ci-remove:hover{color:var(--steel);}
.cart-summary{
  background:linear-gradient(160deg, rgba(56,73,89,0.7) 0%, rgba(22,30,37,0.9) 100%);
  border:1px solid rgba(136,189,242,0.2);
  padding:1.5rem;position:sticky;top:130px;
}
.cs-title{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:1.25rem;color:var(--sky);}
.cs-row{display:flex;justify-content:space-between;font-size:0.82rem;padding:0.4rem 0;border-bottom:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.75);}
.cs-row.total{font-weight:700;font-size:0.92rem;border-bottom:none;margin-top:0.4rem;color:#fff;}
.cs-checkout{width:100%;margin-top:1.25rem;padding:0.82rem;background:var(--steel);color:#fff;border:none;cursor:pointer;font-size:0.82rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;transition:all 0.15s;box-shadow:0 4px 16px rgba(106,137,167,0.35);}
.cs-checkout:hover{background:var(--steel-dark);}
.cs-continue{width:100%;margin-top:0.5rem;padding:0.7rem;background:none;color:rgba(255,255,255,0.65);border:1px solid rgba(136,189,242,0.22);cursor:pointer;font-size:0.78rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;transition:all 0.15s;}
.cs-continue:hover{border-color:var(--cornflower);}

/* ── BUILDER ── */
.section{padding:2rem;max-width:1100px;}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:300;margin-bottom:0.35rem;color:#fff;}
.sec-sub{color:rgba(255,255,255,0.45);font-size:0.81rem;margin-bottom:1.5rem;}
.sug-banner{display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;background:rgba(136,189,242,0.1);border:1px solid rgba(136,189,242,0.25);margin-bottom:1.5rem;flex-wrap:wrap;}
.sug-icon{font-size:1.25rem;}
.sug-text{flex:1;}
.sug-label{font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--sky);margin-bottom:0.18rem;}
.sug-note{font-size:0.79rem;color:rgba(255,255,255,0.65);}
.sug-apply{background:var(--cornflower);color:var(--slate-darker);border:none;padding:0.38rem 1rem;cursor:pointer;font-size:0.72rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap;}
.sug-apply:hover{background:var(--sky);}
.builder-layout{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.5rem;}
@media(max-width:700px){.builder-layout{grid-template-columns:1fr;}}
.bdr-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;}
@media(max-width:640px){.bdr-grid{grid-template-columns:repeat(2,1fr);}}
.bdr-col{display:flex;flex-direction:column;gap:0.35rem;}
.bdr-lbl{font-size:0.61rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--sky);margin-bottom:0.18rem;font-weight:700;}
.bdr-item{background:rgba(255,255,255,0.05);border:1px solid rgba(136,189,242,0.15);padding:0.48rem 0.72rem;cursor:pointer;font-size:0.78rem;text-align:left;transition:all 0.15s;color:rgba(255,255,255,0.7);}
.bdr-item:hover{border-color:var(--cornflower);color:#fff;}
.bdr-item.sel{background:rgba(56,73,89,0.7);color:var(--sky);border-color:var(--cornflower);font-weight:700;}
.bdr-result{display:flex;gap:0.55rem;flex-wrap:wrap;align-items:center;padding:0.9rem 1.2rem;background:rgba(0,0,0,0.3);border:1px solid rgba(136,189,242,0.18);}
.br-lbl{font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--sky);}
.br-item{background:rgba(56,73,89,0.6);color:rgba(255,255,255,0.8);padding:0.18rem 0.58rem;font-size:0.75rem;border:1px solid rgba(136,189,242,0.18);}
.builder-preview{background:rgba(0,0,0,0.3);border:1px solid rgba(136,189,242,0.18);padding:1.5rem;}
.bp-title{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;margin-bottom:1rem;color:#fff;}
.bp-outfit-display{background:rgba(0,0,0,0.4);border-radius:6px;padding:1.5rem;margin-bottom:1rem;text-align:center;}
.bp-figure{font-size:4rem;line-height:1;margin-bottom:0.5rem;}
.bp-items-display{display:flex;flex-direction:column;gap:0.4rem;margin-bottom:1rem;}
.bp-item-row{display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.7rem;background:rgba(56,73,89,0.5);border-left:3px solid var(--cornflower);}
.bp-item-name{font-size:0.78rem;color:rgba(255,255,255,0.8);}
.bp-item-cat{font-size:0.6rem;color:var(--sky);text-transform:uppercase;letter-spacing:0.06em;}
.bp-style-tip{padding:0.75rem 1rem;background:rgba(106,137,167,0.12);border-left:3px solid var(--steel);margin-bottom:1rem;}
.bpst-label{font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--sky);margin-bottom:0.3rem;font-weight:700;}
.bpst-text{font-size:0.78rem;font-style:italic;color:rgba(255,255,255,0.7);line-height:1.5;}
.bp-size-section{margin-bottom:1rem;}
.bp-size-lbl{font-size:0.66rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--sky);margin-bottom:0.5rem;font-weight:700;}
.bp-cat-label{font-size:0.7rem;font-weight:600;color:rgba(255,255,255,0.7);margin-bottom:0.25rem;margin-top:0.6rem;}
.bp-sizes-row{display:flex;gap:0.3rem;flex-wrap:wrap;margin-bottom:0.4rem;}
.bp-add-bag{width:100%;padding:0.72rem;background:var(--steel);color:#fff;border:none;cursor:pointer;font-size:0.8rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;transition:all 0.15s;margin-top:0.5rem;box-shadow:0 4px 16px rgba(106,137,167,0.3);}
.bp-add-bag:hover{background:var(--steel-dark);}
.bp-add-bag:disabled{background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.35);cursor:not-allowed;box-shadow:none;}
.bp-added-note{text-align:center;font-size:0.75rem;color:#0db27f;margin-top:0.4rem;font-weight:700;}
.colour-palette-panel{margin-top:1.5rem;padding:1.25rem;background:rgba(0,0,0,0.2);border:1px solid rgba(136,189,242,0.1);}
.cpp-title{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:400;margin-bottom:0.75rem;color:#fff;}
.rich-colors{display:flex;flex-wrap:wrap;gap:0.5rem;}
.rich-color-item{display:flex;align-items:center;gap:0.45rem;cursor:pointer;transition:transform 0.15s;}
.rich-color-item:hover{transform:scale(1.05);}
.rc-swatch{width:26px;height:26px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);}
.rc-name{font-size:0.65rem;color:rgba(255,255,255,0.45);}

/* ── QUIZ PORTAL ── */
.qportal{position:fixed;inset:0;z-index:600;background:linear-gradient(135deg, var(--slate-deepest) 0%, var(--steel-darker) 50%, var(--slate-darker) 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;overflow-y:auto;}
.qportal::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%, rgba(136,189,242,0.08) 0%, transparent 60%);pointer-events:none;}
.qp-inner{position:relative;z-index:1;width:100%;max-width:580px;}
.qp-hdr{text-align:center;margin-bottom:2.5rem;}
.qp-logo{font-family:'Cormorant Garamond',serif;font-size:1.55rem;font-weight:300;font-style:italic;color:var(--cornflower);margin-bottom:0.5rem;}
.qp-welcome{font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:300;color:#fff;line-height:1.2;margin-bottom:0.5rem;}
.qp-welcome em{font-style:italic;color:var(--sky);}
.qp-sub{color:rgba(255,255,255,0.4);font-size:0.8rem;}
.qcard{background:rgba(56,73,89,0.75);border:1px solid rgba(136,189,242,0.2);padding:2.5rem 2rem;backdrop-filter:blur(8px);}
.qpbar{height:2px;background:rgba(255,255,255,0.08);margin-bottom:1.75rem;overflow:hidden;}
.qpfill{height:100%;background:var(--steel);transition:width 0.4s ease;}
.qstep{font-size:0.65rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--sky);margin-bottom:0.6rem;}
.qq{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:400;margin-bottom:1.25rem;line-height:1.3;color:#fff;}
.qopts{display:flex;flex-direction:column;gap:0.5rem;}
.qopt{background:rgba(255,255,255,0.04);border:1px solid rgba(136,189,242,0.15);padding:0.82rem 1.1rem;cursor:pointer;font-size:0.84rem;text-align:left;transition:all 0.18s;color:rgba(255,255,255,0.75);display:flex;align-items:center;gap:0.75rem;}
.qopt::before{content:'';min-width:16px;height:16px;border-radius:50%;border:1.5px solid rgba(136,189,242,0.3);transition:all 0.18s;flex-shrink:0;}
.qopt:hover{border-color:var(--cornflower);background:rgba(136,189,242,0.12);}
.qopt:hover::before{border-color:var(--cornflower);background:var(--cornflower);}
.qr-card{background:rgba(56,73,89,0.75);border:1px solid rgba(136,189,242,0.2);padding:2.5rem 2rem;backdrop-filter:blur(8px);}
.qr-hdr{padding:1.75rem;margin-bottom:1.5rem;background:rgba(0,0,0,0.4);color:#fff;position:relative;overflow:hidden;border:1px solid rgba(136,189,242,0.18);}
.qr-hdr::before{content:attr(data-emoji);position:absolute;right:-10px;top:-20px;font-size:7rem;opacity:0.05;}
.qr-plabel{font-size:0.63rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--sky);margin-bottom:0.4rem;}
.qr-pname{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:300;font-style:italic;margin-bottom:0.4rem;color:#fff;}
.qr-pdesc{font-size:0.83rem;color:rgba(255,255,255,0.55);line-height:1.6;}
.qr-palette{display:flex;gap:0.4rem;margin-top:0.9rem;}
.qr-swatch{width:24px;height:24px;border-radius:50%;border:2px solid rgba(255,255,255,0.1);}
.qt-label{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:300;margin-bottom:0.85rem;color:#fff;}
.qt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(195px,1fr));gap:0.7rem;margin-bottom:1.25rem;}
.qt-card{background:rgba(0,0,0,0.3);border:1px solid rgba(136,189,242,0.1);padding:1rem;}
.qt-icon{font-size:1rem;color:var(--sky);margin-bottom:0.35rem;}
.qt-title{font-family:'Cormorant Garamond',serif;font-size:1rem;margin-bottom:0.3rem;color:#fff;}
.qt-body{font-size:0.73rem;color:rgba(255,255,255,0.5);line-height:1.55;}
.qa-row{display:flex;gap:0.65rem;flex-wrap:wrap;}
.btn-p{background:var(--steel);color:#fff;border:none;padding:0.62rem 1.4rem;cursor:pointer;font-size:0.77rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;transition:all 0.15s;box-shadow:0 4px 16px rgba(106,137,167,0.35);}
.btn-p:hover{background:var(--steel-dark);}
.btn-o{background:none;color:rgba(255,255,255,0.65);border:1px solid rgba(136,189,242,0.25);padding:0.62rem 1.4rem;cursor:pointer;font-size:0.77rem;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;transition:all 0.15s;}
.btn-o:hover{border-color:var(--cornflower);}

/* ── LOGIN ── */
.login-wrap{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;}
@media(max-width:700px){.login-wrap{grid-template-columns:1fr;}}

/* LEFT: Steel Blue */
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

/* RIGHT: Slate */
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
.finput option{background:var(--slate-dark);color:#fff;}
.ferr{font-size:0.71rem;color:#ff6b6b;margin-top:0.28rem;}
.lsubmit{width:100%;padding:0.76rem;background:var(--steel);color:#fff;border:none;cursor:pointer;font-size:0.78rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.15s;margin-top:0.5rem;box-shadow:0 4px 20px rgba(106,137,167,0.4);}
.lsubmit:hover{background:var(--steel-dark);box-shadow:0 6px 24px rgba(106,137,167,0.5);}
.l-hint{margin-top:0.75rem;font-size:0.69rem;color:rgba(255,255,255,0.25);text-align:center;}
.l-ok{text-align:center;padding:1rem 0;font-size:0.84rem;color:rgba(255,255,255,0.6);}
.l-ok em{color:var(--sky);font-style:normal;font-weight:700;}

/* ── TIPS ── */
.tips-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem;}
.tip-card{background:rgba(255,255,255,0.04);border:1px solid rgba(136,189,242,0.1);padding:1.5rem;transition:all 0.2s;}
.tip-card:hover{border-color:rgba(136,189,242,0.28);background:rgba(136,189,242,0.06);}
.tip-icon{font-size:1.25rem;color:var(--sky);margin-bottom:0.6rem;}
.tip-title{font-family:'Cormorant Garamond',serif;font-size:1.05rem;margin-bottom:0.4rem;color:#fff;}
.tip-body{font-size:0.77rem;color:rgba(255,255,255,0.5);line-height:1.6;}

/* ── WISHLIST / HISTORY ── */
.list-sec{max-width:600px;}
.list-sec .empty{color:rgba(255,255,255,0.4);font-size:0.84rem;padding:1rem 0;}
.wish-item{display:flex;justify-content:space-between;align-items:center;padding:0.72rem 0;border-bottom:1px solid rgba(255,255,255,0.07);}
.wi-name{font-size:0.88rem;font-weight:600;color:#fff;}
.wi-season{font-size:0.67rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.06em;}
.rm-btn{background:none;border:1px solid rgba(106,137,167,0.35);color:var(--sky);font-size:0.67rem;padding:0.16rem 0.5rem;cursor:pointer;letter-spacing:0.06em;text-transform:uppercase;transition:all 0.15s;font-weight:700;}
.rm-btn:hover{background:var(--steel);color:#fff;border-color:var(--steel);}
.hist-item{padding:0.5rem 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.77rem;color:rgba(255,255,255,0.45);display:flex;gap:0.5rem;}
.hist-item::before{content:"→";color:var(--cornflower);}

/* ── ADMIN ── */
.admin-wrap{padding:2rem;max-width:1100px;}
.adm-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.75rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,0.08);flex-wrap:wrap;gap:1rem;}
.adm-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:#fff;}
.adm-badge{font-size:0.61rem;letter-spacing:0.1em;text-transform:uppercase;background:var(--steel);color:#fff;padding:0.18rem 0.6rem;}
.adm-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,0.08);margin-bottom:1.75rem;}
.adm-tab{background:none;border:none;cursor:pointer;padding:0.72rem 1.1rem;font-size:0.74rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:rgba(255,255,255,0.35);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all 0.15s;}
.adm-tab.active{color:#fff;border-color:var(--cornflower);}
.adm-stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:1rem;margin-bottom:1.75rem;}
.stat-card{background:rgba(0,0,0,0.3);border:1px solid rgba(136,189,242,0.18);padding:1.2rem;}
.snum{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:300;color:var(--cornflower);}
.slbl{font-size:0.68rem;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-top:0.18rem;font-weight:700;}
.atsec{font-size:0.88rem;font-weight:700;margin-bottom:1rem;color:rgba(255,255,255,0.5);letter-spacing:0.04em;}
.adm-table{width:100%;border-collapse:collapse;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.08);}
.adm-table th{text-align:left;padding:0.68rem 0.9rem;font-size:0.63rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);border-bottom:1px solid rgba(255,255,255,0.07);background:rgba(0,0,0,0.2);font-weight:700;}
.adm-table td{padding:0.62rem 0.9rem;font-size:0.79rem;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.7);}
.adm-table tr:last-child td{border-bottom:none;}
.adm-table tr:hover td{background:rgba(136,189,242,0.05);}
.ptag{font-size:0.62rem;letter-spacing:0.06em;text-transform:uppercase;padding:0.16rem 0.48rem;background:rgba(136,189,242,0.12);color:var(--sky);font-weight:700;}
.noptag{color:rgba(255,255,255,0.2);font-style:italic;font-size:0.73rem;}
.del-btn{background:none;border:1px solid rgba(106,137,167,0.3);color:var(--sky);font-size:0.64rem;padding:0.13rem 0.48rem;cursor:pointer;text-transform:uppercase;letter-spacing:0.05em;transition:all 0.15s;font-weight:700;}
.del-btn:hover{background:var(--steel);color:#fff;}
.adm-empty{color:rgba(255,255,255,0.3);font-size:0.82rem;padding:2rem 0;text-align:center;}
.log-item{display:flex;align-items:center;gap:0.75rem;padding:0.58rem 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.79rem;color:rgba(255,255,255,0.65);}
.log-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.log-time{font-size:0.68rem;color:rgba(255,255,255,0.25);white-space:nowrap;}
.online-dot{width:7px;height:7px;border-radius:50%;background:#0db27f;display:inline-block;margin-right:0.4rem;}
.cu-form{background:rgba(0,0,0,0.25);border:1px solid rgba(136,189,242,0.18);padding:1.5rem;max-width:480px;margin-bottom:1.75rem;}
.cu-form h4{font-size:0.85rem;font-weight:700;margin-bottom:1rem;color:#fff;}
.cu-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.72rem;}
.cu-sub{margin-top:0.72rem;padding:0.58rem 1.2rem;background:var(--cornflower);color:var(--slate-darker);border:none;cursor:pointer;font-size:0.74rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;transition:all 0.15s;}
.cu-sub:hover{background:var(--sky);}
.cu-ok{font-size:0.74rem;color:#0db27f;margin-top:0.5rem;font-weight:700;}

/* ── NOTIF ── */
.notif-panel{position:absolute;top:66px;right:0;width:270px;background:var(--slate-dark);border:1px solid rgba(136,189,242,0.2);box-shadow:0 16px 40px rgba(0,0,0,0.6);z-index:400;padding:1rem;}
.notif-panel h4{font-size:0.78rem;font-weight:700;margin-bottom:0.72rem;border-bottom:1px solid rgba(255,255,255,0.07);padding-bottom:0.45rem;text-transform:uppercase;letter-spacing:0.07em;color:var(--sky);}
.ni{font-size:0.72rem;padding:0.33rem 0;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.65);}
.ni-empty{font-size:0.74rem;color:rgba(255,255,255,0.25);}

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

function ShopModal({outfit,onClose,onAddToCart}){
  const [selectedSizes,setSelectedSizes]=useState({});
  const [added,setAdded]=useState({});
  useEffect(()=>{const h=e=>e.key==="Escape"&&onClose();document.addEventListener("keydown",h);return()=>document.removeEventListener("keydown",h);},[onClose]);
  const selectSize=(idx,sz)=>setSelectedSizes(p=>({...p,[idx]:sz}));
  const handleAdd=(item,idx)=>{
    const sz=selectedSizes[idx]||item.sizes[0];
    onAddToCart({name:item.name,price:item.price,store:item.store,outfitName:outfit.name,outfitImg:outfit.img,size:sz});
    setAdded(p=>({...p,[idx]:true}));setTimeout(()=>setAdded(p=>({...p,[idx]:false})),2000);
  };
  return(
    <div className="modal-ov" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div className="mhdr"><div className="mname">{outfit.name}</div><button className="mclose" onClick={onClose}>✕</button></div>
        <img src={outfit.img} alt={outfit.name} className="mimg"/>
        {outfit.colors&&<div style={{marginBottom:"1rem"}}>
          <div style={{fontSize:"0.62rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--warm)",marginBottom:"0.4rem",fontWeight:700}}>Colour Palette</div>
          <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
            {outfit.colors.map(cn=>{
              const cc=colourCombos.find(c=>c.name===cn);const rc=richColors.find(c=>c.name===cn);
              if(cc)return<div key={cn} style={{display:"flex",gap:"0.2rem",alignItems:"center"}}><div style={{width:13,height:13,borderRadius:"50%",background:cc.c1,border:"1.5px solid rgba(255,255,255,0.12)"}}/><div style={{width:13,height:13,borderRadius:"50%",background:cc.c2,border:"1.5px solid rgba(255,255,255,0.12)"}}/><span style={{fontSize:"0.63rem",color:"rgba(255,255,255,0.5)"}}>{cn}</span></div>;
              if(rc)return<div key={cn} style={{display:"flex",gap:"0.3rem",alignItems:"center"}}><div style={{width:13,height:13,borderRadius:"50%",background:rc.hex,border:"1.5px solid rgba(255,255,255,0.12)"}}/><span style={{fontSize:"0.63rem",color:"rgba(255,255,255,0.5)"}}>{cn}</span></div>;
              return null;
            })}
          </div>
        </div>}
        <div className="mlabel">Shop the Look — {outfit.shopItems.length} pieces</div>
        {outfit.shopItems.map((item,i)=>(
          <div key={i} className="sitem">
            <div className="si-top">
              <div><div className="si-name">{item.name}</div><div className="si-store">{item.store}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                <span className="si-price">{item.price}</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="si-btn">View →</a>
              </div>
            </div>
            <div className="size-row">
              <span className="size-lbl">Size:</span>
              {item.sizes.map(sz=><button key={sz} className={`sz-btn${(selectedSizes[i]||item.sizes[0])===sz?" selected":""}`} onClick={()=>selectSize(i,sz)}>{sz}</button>)}
              {added[i]?<span className="sz-added">✓ Added!</span>:<button className="sz-addcart" onClick={()=>handleAdd(item,i)}>+ Bag</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutfitCard({outfit,onWishlist,wishlisted,onAddToCart}){
  const [showTip,setShowTip]=useState(false);
  const [shopOpen,setShopOpen]=useState(false);
  return(
    <>
      <div className="card" style={{animationDelay:`${outfit.id*55}ms`}}>
        <div className="card-img-wrap">
          <img src={outfit.img} alt={outfit.name} className="card-img"/>
          <span className="season-badge">{outfit.season}</span>
          <button className={`wbtn${wishlisted?" on":""}`} onClick={()=>onWishlist(outfit.id)}>{wishlisted?"♥":"♡"}</button>
        </div>
        <div className="card-body">
          <div className="cname">{outfit.name}</div>
          <div className="tags">{outfit.tags.map(t=><span key={t} className="tag">#{t} </span>)}</div>
          {outfit.colors&&<div className="color-dots">
            {outfit.colors.slice(0,3).map(cn=>{
              const cc=colourCombos.find(c=>c.name===cn);const rc=richColors.find(c=>c.name===cn);
              const color=cc?cc.c1:(rc?rc.hex:"#555");
              return<div key={cn} className="color-dot" title={cn} style={{background:color}}/>;
            })}
            <span className="color-dot-label">{outfit.colors[0]}</span>
          </div>}
          <ul className="items-list">{outfit.items.map(it=><li key={it}>{it}</li>)}</ul>
          <div className="card-actions">
            <button className="bsm" onClick={()=>setShowTip(v=>!v)}>{showTip?"Hide tip":"Style tip"}</button>
            <button className="bsm shop" onClick={()=>setShopOpen(true)}>Shop look →</button>
          </div>
          {showTip&&<p className="tip-box">{outfit.tip}</p>}
        </div>
      </div>
      {shopOpen&&<ShopModal outfit={outfit} onClose={()=>setShopOpen(false)} onAddToCart={onAddToCart}/>}
    </>
  );
}

const builderStyleTips={
  "Silk blouse + Wide-leg trousers":"Classic Parisian chic — tuck the blouse halfway for effortless elegance.",
  "Crop tank + Mini skirt":"The ultimate summer duo. Add a denim jacket to transition to evenings.",
  "Turtleneck + Flared jeans":"A 70s-inspired look that never goes out of style. Keep accessories gold.",
  "Oversized blazer + Tailored shorts":"Power-casual perfection. Bare legs balance the structured top.",
  "Linen shirt + Cargo shorts":"Relaxed and resort-ready. Roll the sleeves for a laid-back vibe.",
  "Off-shoulder top + Midi skirt":"Romantic and effortless. Perfect for garden parties or dates.",
  default:"Mix textures and proportions — a fitted top with volume at the bottom always flatters.",
};

function OutfitBuilder({stylePersona,onAddToCart}){
  const [chosen,setChosen]=useState({top:0,bottom:0,shoes:0,bag:0});
  const [selSizes,setSelSizes]=useState({top:"M",bottom:"M/32",shoes:"38",bag:"One Size"});
  const [bagAdded,setBagAdded]=useState(false);
  const sug=stylePersona?personaSuggestions[stylePersona.label]:null;
  const topKey=builderPieces.top[chosen.top];
  const bottomKey=builderPieces.bottom[chosen.bottom];
  const styleTip=builderStyleTips[`${topKey} + ${bottomKey}`]||builderStyleTips.default;
  const emojis=["👗","👔","👒","👜","🧥","👟"];
  const emoji=emojis[chosen.top%emojis.length];
  const handleAddToBag=()=>{
    Object.entries(chosen).forEach(([cat,i])=>{
      onAddToCart({name:`${builderPieces[cat][i]} (Builder)`,price:"₹1,999",store:"Custom Builder",outfitName:"My Built Outfit",outfitImg:"https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",size:selSizes[cat]});
    });
    setBagAdded(true);setTimeout(()=>setBagAdded(false),2500);
  };
  return(
    <section className="section" style={{maxWidth:1100}}>
      <h2 className="sec-title">Outfit Builder</h2>
      <p className="sec-sub">Mix and match pieces, pick your sizes, and add your look to the bag.</p>
      {sug&&<div className="sug-banner"><span className="sug-icon">{stylePersona.emoji}</span><div className="sug-text"><div className="sug-label">{stylePersona.label} Suggestion</div><div className="sug-note">{sug.note}</div></div><button className="sug-apply" onClick={()=>setChosen({top:sug.top,bottom:sug.bottom,shoes:sug.shoes,bag:sug.bag})}>Apply ✦</button></div>}
      <div className="builder-layout">
        <div>
          <div className="bdr-grid">
            {Object.entries(builderPieces).map(([cat,opts])=>(
              <div key={cat} className="bdr-col">
                <span className="bdr-lbl">{cat.toUpperCase()}</span>
                {opts.map((opt,i)=><button key={opt} className={`bdr-item${chosen[cat]===i?" sel":""}`} onClick={()=>setChosen(c=>({...c,[cat]:i}))}>{opt}{sug&&sug[cat]===i&&<span style={{fontSize:"0.56rem",color:"var(--warm)",marginLeft:"0.25rem"}}>✦</span>}</button>)}
              </div>
            ))}
          </div>
          <div className="colour-palette-panel">
            <div className="cpp-title">Seasonal Colour Palette ✦</div>
            <div className="rich-colors">{richColors.map(c=><div key={c.name} className="rich-color-item" title={c.name}><div className="rc-swatch" style={{background:c.hex}}/><span className="rc-name">{c.name}</span></div>)}</div>
          </div>
        </div>
        <div className="builder-preview">
          <div className="bp-title">Your Look Preview</div>
          <div className="bp-outfit-display">
            <div className="bp-figure">{emoji}</div>
            <div style={{color:"var(--warm)",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",fontStyle:"italic"}}>{topKey} + {bottomKey}</div>
          </div>
          <div className="bp-items-display">
            {Object.entries(chosen).map(([cat,i])=><div key={cat} className="bp-item-row"><span className="bp-item-name">{builderPieces[cat][i]}</span><span className="bp-item-cat">{cat}</span></div>)}
          </div>
          <div className="bp-style-tip"><div className="bpst-label">✦ Style Tip</div><div className="bpst-text">{styleTip}</div></div>
          <div className="bp-size-section">
            <div className="bp-size-lbl">Select Sizes</div>
            {Object.entries(builderSizes).map(([cat,szs])=>(
              <div key={cat}><div className="bp-cat-label">{cat.charAt(0).toUpperCase()+cat.slice(1)}</div>
              <div className="bp-sizes-row">{szs.map(sz=><button key={sz} className={`sz-btn${selSizes[cat]===sz?" selected":""}`} onClick={()=>setSelSizes(p=>({...p,[cat]:sz}))}>{sz}</button>)}</div></div>
            ))}
          </div>
          <button className="bp-add-bag" onClick={handleAddToBag} disabled={bagAdded}>{bagAdded?"✓ Added to Bag!":"Add Outfit to Bag →"}</button>
          {bagAdded&&<div className="bp-added-note">All 4 pieces added to your bag!</div>}
        </div>
      </div>
      <div className="bdr-result">
        <span className="br-lbl">Your Look:</span>
        {Object.entries(chosen).map(([cat,i])=><span key={cat} className="br-item">{builderPieces[cat][i]}</span>)}
        <span style={{marginLeft:"auto",fontSize:"0.66rem",color:"var(--warm)"}}>{Object.entries(selSizes).map(([c,s])=>`${c}:${s}`).join(" · ")}</span>
      </div>
    </section>
  );
}

function QuizPortal({userName,existingPersona,onResult,onSkip}){
  const [step,setStep]=useState(0);
  const [scores,setScores]=useState([0,0,0,0]);
  const [result,setResult]=useState(existingPersona||null);
  const [done,setDone]=useState(!!existingPersona);
  const pick=i=>{const w=answerWeights[step][i];const ns=scores.map((s,j)=>s+w[j]);if(step<quizQuestions.length-1){setScores(ns);setStep(s=>s+1);}else{const mx=ns.indexOf(Math.max(...ns));setResult(quizResults[mx]);setDone(true);}};
  const retake=()=>{setStep(0);setScores([0,0,0,0]);setResult(null);setDone(false);};
  const fn=userName?userName.split(" ")[0]:"there";
  return(
    <div className="qportal">
      <div className="qp-inner">
        <div className="qp-hdr">
          <div className="qp-logo">Lookbook Guide</div>
          {!done&&<><div className="qp-welcome">Welcome, <em>{fn}</em>.<br/>Let's find your style.</div><div className="qp-sub">5 quick questions for a personalised lookbook.</div></>}
          {done&&<div className="qp-welcome" style={{fontSize:"1.8rem"}}>Your style is ready ✦</div>}
        </div>
        {!done?(
          <div className="qcard">
            <div className="qpbar"><div className="qpfill" style={{width:`${(step/quizQuestions.length)*100}%`}}/></div>
            <div className="qstep">Question {step+1} of {quizQuestions.length}</div>
            <div className="qq">{quizQuestions[step].q}</div>
            <div className="qopts">{quizQuestions[step].opts.map((o,i)=><button key={o} className="qopt" onClick={()=>pick(i)}>{o}</button>)}</div>
            <div style={{marginTop:"1.2rem",textAlign:"right"}}><button onClick={onSkip} style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.71rem",color:"rgba(255,255,255,0.25)",textDecoration:"underline"}}>Skip for now →</button></div>
          </div>
        ):(
          <div className="qr-card">
            <div className="qr-hdr" data-emoji={result.emoji}>
              <div className="qr-plabel">Your Style Persona</div>
              <div className="qr-pname">{result.emoji} {result.label}</div>
              <div className="qr-pdesc">{result.desc}</div>
              <div className="qr-palette">{result.palette.map(c=><div key={c} className="qr-swatch" style={{background:c}}/>)}</div>
            </div>
            <div className="qt-label">Your Personalised Style Tips</div>
            <div className="qt-grid">{result.tips.map(t=><div key={t.title} className="qt-card"><div className="qt-icon">{t.icon}</div><div className="qt-title">{t.title}</div><p className="qt-body">{t.body}</p></div>)}</div>
            <div className="qa-row"><button className="btn-p" onClick={()=>onResult(result)}>Enter My Lookbook →</button><button className="btn-o" onClick={retake}>Retake</button></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileDropdown({user,onNavigate,onLogout,wishlistCount}){
  const isLoggedIn=!!user;
  const m1=[{icon:"📦",label:"Orders",tab:"orders"},{icon:"♡",label:"Wishlist",tab:"wishlist",count:wishlistCount},{icon:"🎁",label:"Gift Cards",tab:"giftcards"},{icon:"💬",label:"Contact Us",tab:"contact"},{icon:"⭐",label:"Lookbook Insider",tab:"insider",badge:"New"}];
  const m2=[{icon:"💳",label:"Lookbook Credit",tab:"credit"},{icon:"🏷",label:"Coupons",tab:"coupons"},{icon:"💰",label:"Saved Cards",tab:"savedcards"},{icon:"📍",label:"Saved Addresses",tab:"addresses"}];
  return(
    <div className="profile-dropdown">
      {isLoggedIn?(<div className="pd-user-info"><div className="pd-user-name">Hi, {user.name.split(" ")[0]} 👋</div><div className="pd-user-email">{user.email}</div>{user.stylePersona&&<div className="pd-persona">{user.stylePersona}</div>}</div>
      ):(<div className="pd-welcome"><div className="pd-welcome-title">Welcome</div><div className="pd-welcome-sub">To access account and manage orders</div><button className="pd-login-btn" onClick={()=>onNavigate("login")}>Login / Signup</button></div>)}
      <hr className="pd-divider"/>
      <div className="pd-section">{m1.map(item=><div key={item.tab} className="pd-item" onClick={()=>onNavigate(item.tab)}><span className="pd-icon">{item.icon}</span><span style={{flex:1}}>{item.label}</span>{item.count>0&&<span style={{fontSize:"0.7rem",color:"var(--warm)",fontWeight:700}}>{item.count}</span>}{item.badge&&<span style={{background:"var(--cherry)",color:"#fff",fontSize:"0.5rem",fontWeight:800,padding:"0.12rem 0.35rem",letterSpacing:"0.06em"}}>{item.badge}</span>}</div>)}</div>
      <hr className="pd-divider"/>
      <div className="pd-section">{m2.map(item=><div key={item.tab} className="pd-item" onClick={()=>onNavigate(item.tab)}><span className="pd-icon">{item.icon}</span><span>{item.label}</span></div>)}</div>
      {isLoggedIn&&<button className="pd-signout" onClick={onLogout}>Sign Out</button>}
    </div>
  );
}

function CartPage({cart,onRemove,onContinue}){
  const total=cart.reduce((s,i)=>s+parseInt(i.price.replace(/[^\d]/g,"")),0);
  const shipping=total>999?0:99;
  if(cart.length===0)return(<div style={{padding:"2rem"}}><div className="cart-title">Your Bag</div><div className="cart-empty"><div className="cart-empty-ico">🛍</div><div style={{fontSize:"1rem",fontWeight:600,marginBottom:"0.5rem",color:"#fff"}}>Your bag is empty</div><div style={{fontSize:"0.82rem",marginBottom:"1.25rem"}}>Add items from the lookbook to get started.</div><button className="btn-p" onClick={onContinue}>Continue Shopping</button></div></div>);
  return(<div style={{padding:"2rem"}}><div className="cart-title">Your Bag</div><div className="cart-sub">{cart.length} item{cart.length>1?"s":""}</div>
    <div className="cart-layout">
      <div>{cart.map((item,i)=><div key={i} className="cart-item"><img src={item.outfitImg} alt={item.name} className="ci-img"/><div className="ci-info"><div className="ci-outfit">{item.outfitName}</div><div className="ci-name">{item.name}</div><div className="ci-store">{item.store}</div>{item.size&&<div className="ci-size">Size: {item.size}</div>}<div className="ci-price">{item.price}</div><button className="ci-remove" onClick={()=>onRemove(i)}>Remove</button></div></div>)}</div>
      <div className="cart-summary"><div className="cs-title">Price Details</div><div className="cs-row"><span>Subtotal ({cart.length} items)</span><span>₹{total.toLocaleString("en-IN")}</span></div><div className="cs-row"><span>Delivery</span><span style={{color:shipping===0?"#0db27f":"inherit"}}>{shipping===0?"Free":"₹"+shipping}</span></div>{shipping>0&&<div style={{fontSize:"0.71rem",color:"rgba(255,255,255,0.3)",padding:"0.2rem 0"}}>Add ₹{999-total} more for free delivery</div>}<div className="cs-row total"><span>Total</span><span>₹{(total+shipping).toLocaleString("en-IN")}</span></div><button className="cs-checkout">Place Order</button><button className="cs-continue" onClick={onContinue}>Continue Shopping</button></div>
    </div>
  </div>);
}

function AccessoriesPage({onAddToCart,currentSeason}){
  const tags=["All",...[...new Set(accessories.map(a=>a.tag))]];
  const seasons=["All","Spring","Summer","Autumn","Winter"];
  const [filter,setFilter]=useState("All");
  const [seasonF,setSeasonF]=useState(currentSeason||"All");
  const [selSizes,setSelSizes]=useState({});
  const [added,setAdded]=useState({});

  const filtered=accessories.filter(a=>{
    const tagOk=filter==="All"||a.tag===filter;
    const seaOk=seasonF==="All"||!a.seasons||(a.seasons&&a.seasons.includes(seasonF));
    return tagOk&&seaOk;
  });

  const handleAdd=(a)=>{
    const sz=selSizes[a.id]||a.sizes[0];
    onAddToCart({name:a.name,price:a.price,store:a.store,outfitName:"Accessories",outfitImg:a.img,size:sz});
    setAdded(p=>({...p,[a.id]:true}));setTimeout(()=>setAdded(p=>({...p,[a.id]:false})),2000);
  };

  const seasonEmojis={All:"🗓",Spring:"🌸",Summer:"☀️",Autumn:"🍂",Winter:"❄️"};

  return(<div className="acc-page">
    <div className="acc-hdr">
      <h2>Accessories</h2>
      <p>Complete any look with the right finishing touch — filtered by season &amp; category.</p>
    </div>

    {/* Season row */}
    <div style={{marginBottom:"0.6rem"}}>
      <div style={{fontSize:"0.63rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--sky)",marginBottom:"0.4rem",fontWeight:700}}>Season</div>
      <div className="acc-filters">
        {seasons.map(s=>(
          <button key={s} className={`afbtn${seasonF===s?" active":""}`} onClick={()=>setSeasonF(s)}>
            {seasonEmojis[s]} {s}
          </button>
        ))}
      </div>
    </div>

    {/* Category row */}
    <div style={{marginBottom:"1.25rem"}}>
      <div style={{fontSize:"0.63rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--sky)",marginBottom:"0.4rem",fontWeight:700}}>Category</div>
      <div className="acc-filters">
        {tags.map(t=><button key={t} className={`afbtn${filter===t?" active":""}`} onClick={()=>setFilter(t)}>{t}</button>)}
      </div>
    </div>

    {filtered.length===0&&(
      <div style={{textAlign:"center",padding:"3rem",color:"rgba(255,255,255,0.3)"}}>
        <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>🔍</div>
        <div>No accessories found for <strong>{seasonF}</strong> / <strong>{filter}</strong></div>
        <button className="afbtn" style={{marginTop:"1rem"}} onClick={()=>{setFilter("All");setSeasonF("All");}}>Clear Filters</button>
      </div>
    )}

    <div className="acc-grid">{filtered.map(a=>(
      <div key={a.id} className="accard">
        <div style={{position:"relative",overflow:"hidden"}}>
          <img src={a.img} alt={a.name} onError={e=>{e.target.src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80";}}/>
          {a.seasons&&a.seasons.length<4&&(
            <div style={{position:"absolute",top:8,left:8,display:"flex",gap:3}}>
              {a.seasons.map(s=>(
                <span key={s} style={{fontSize:"0.58rem",background:"rgba(13,20,25,0.88)",color:"var(--sky)",padding:"0.15rem 0.4rem",letterSpacing:"0.07em",textTransform:"uppercase"}}>{s}</span>
              ))}
            </div>
          )}
        </div>
        <div className="accbody">
          <div className="actag">{a.tag}</div>
          <div className="acname">{a.name}</div>
          {a.desc&&<div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.4)",marginBottom:"0.45rem",lineHeight:1.5}}>{a.desc}</div>}
          <div className="ac-sizes">{a.sizes.map(sz=><button key={sz} className={`sz-btn${(selSizes[a.id]||a.sizes[0])===sz?" selected":""}`} onClick={()=>setSelSizes(p=>({...p,[a.id]:sz}))}>{sz}</button>)}</div>
          <div className="acrow"><span className="acprice">{a.price}</span>
            <div style={{display:"flex",gap:"0.4rem",alignItems:"center"}}>
              {added[a.id]?<span className="sz-added">✓ Added!</span>:<button className="acbtn" onClick={()=>handleAdd(a)}>+ Bag</button>}
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="acbtn">Buy</a>
            </div>
          </div>
          <div style={{fontSize:"0.66rem",color:"rgba(255,255,255,0.25)",marginTop:"0.25rem"}}>{a.store}</div>
        </div>
      </div>
    ))}</div>
  </div>);
}

function AdminPanel(){
  const [users,setUsers]=useState(getUsers());
  const [log]=useState(getLog());
  const [inner,setInner]=useState("overview");
  const [cf,setCf]=useState({name:"",email:"",password:"",role:"user"});
  const [cmsg,setCmsg]=useState("");
  const refresh=()=>setUsers(getUsers());
  const del=id=>{saveUsers(getUsers().filter(u=>u.id!==id));refresh();};
  const setC=(k,v)=>setCf(f=>({...f,[k]:v}));
  const handleCreate=()=>{
    if(!cf.name||!cf.email||!cf.password){setCmsg("All fields required.");return;}
    if(!cf.email.includes("@")){setCmsg("Valid email required.");return;}
    const ex=getUsers();if(ex.find(u=>u.email===cf.email)){setCmsg("Email exists.");return;}
    const nu={id:Date.now().toString(),name:cf.name.trim(),email:cf.email.toLowerCase(),password:cf.password,role:cf.role,joinedAt:new Date().toISOString(),stylePersona:null,lastLogin:null};
    saveUsers([...ex,nu]);refresh();setCmsg(`✓ User "${nu.name}" created!`);setCf({name:"",email:"",password:"",role:"user"});setTimeout(()=>setCmsg(""),3000);
  };
  const completed=users.filter(u=>u.stylePersona).length;
  const pCounts=quizResults.map(r=>({label:r.label,count:users.filter(u=>u.stylePersona===r.label).length}));
  const online=users.filter(u=>{if(!u.lastLogin)return false;return Date.now()-new Date(u.lastLogin).getTime()<30*60*1000;});
  const itabs=[{id:"overview",l:"Overview"},{id:"users",l:"Users"},{id:"loginlog",l:"Login Log"},{id:"create",l:"Create User"}];
  return(<div className="admin-wrap">
    <div className="adm-top"><div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}><div className="adm-title">Admin Panel</div><span className="adm-badge">Admin</span></div></div>
    <div className="adm-tabs">{itabs.map(t=><button key={t.id} className={`adm-tab${inner===t.id?" active":""}`} onClick={()=>setInner(t.id)}>{t.l}</button>)}</div>
    {inner==="overview"&&(<>
      <div className="adm-stats">
        <div className="stat-card"><div className="snum">{users.length}</div><div className="slbl">Total Users</div></div>
        <div className="stat-card"><div className="snum">{online.length}</div><div className="slbl">Online (30m)</div></div>
        <div className="stat-card"><div className="snum">{completed}</div><div className="slbl">Quiz Done</div></div>
        <div className="stat-card"><div className="snum">{log.length}</div><div className="slbl">Login Events</div></div>
      </div>
      <div className="atsec">PERSONA DISTRIBUTION</div>
      <div style={{display:"flex",gap:"0.65rem",flexWrap:"wrap",marginBottom:"1.75rem"}}>{pCounts.map(p=><div key={p.label} style={{background:"rgba(0,0,0,0.3)",border:"1px solid rgba(201,169,110,0.18)",padding:"0.7rem 1rem",minWidth:"105px"}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",color:"var(--warm)"}}>{p.count}</div><div style={{fontSize:"0.66rem",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.06em",fontWeight:700}}>{p.label}</div></div>)}</div>
      {online.length>0&&<><div className="atsec">RECENTLY ACTIVE</div>
      <table className="adm-table"><thead><tr><th>Status</th><th>Name</th><th>Email</th><th>Last Login</th><th>Persona</th></tr></thead>
      <tbody>{online.map(u=><tr key={u.id}><td><span className="online-dot"/>Online</td><td>{u.name}</td><td>{u.email}</td><td style={{fontSize:"0.72rem"}}>{new Date(u.lastLogin).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</td><td>{u.stylePersona?<span className="ptag">{u.stylePersona}</span>:<span className="noptag">—</span>}</td></tr>)}</tbody></table></>}
    </>)}
    {inner==="users"&&(<>{users.length===0?<div className="adm-empty">No users yet.</div>:(
      <table className="adm-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Persona</th><th>Joined</th><th>Last Login</th><th></th></tr></thead>
      <tbody>{users.map(u=><tr key={u.id}><td style={{fontWeight:600}}>{u.name}</td><td>{u.email}</td><td><span style={{fontSize:"0.63rem",textTransform:"uppercase",fontWeight:700,color:u.role==="admin"?"var(--warm)":"rgba(255,255,255,0.35)"}}>{u.role}</span></td><td>{u.stylePersona?<span className="ptag">{u.stylePersona}</span>:<span className="noptag">Not taken</span>}</td><td style={{fontSize:"0.72rem"}}>{u.joinedAt?new Date(u.joinedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"—"}</td><td style={{fontSize:"0.72rem"}}>{u.lastLogin?new Date(u.lastLogin).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):"Never"}</td><td>{u.role!=="admin"&&<button className="del-btn" onClick={()=>del(u.id)}>Remove</button>}</td></tr>)}</tbody></table>
    )}</>)}
    {inner==="loginlog"&&(<>{log.length===0?<div className="adm-empty">No events yet.</div>:log.map((e,i)=><div key={i} className="log-item"><div className="log-dot" style={{background:e.type==="signup"?"#0db27f":"var(--cherry)"}}/><div style={{flex:1}}><strong>{e.action}</strong><div style={{fontSize:"0.68rem",color:"rgba(255,255,255,0.25)"}}>{e.email}</div></div><div className="log-time">{new Date(e.time).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</div></div>)}</>)}
    {inner==="create"&&(<>
      <div className="cu-form"><h4>Add a user manually</h4>
        <div className="cu-grid">
          <div className="fg"><label className="flbl">Full Name</label><input className="finput" placeholder="Aisha Patel" value={cf.name} onChange={e=>setC("name",e.target.value)}/></div>
          <div className="fg"><label className="flbl">Email</label><input className="finput" type="email" placeholder="aisha@email.com" value={cf.email} onChange={e=>setC("email",e.target.value)}/></div>
          <div className="fg"><label className="flbl">Password</label><input className="finput" type="password" placeholder="••••••••" value={cf.password} onChange={e=>setC("password",e.target.value)}/></div>
          <div className="fg"><label className="flbl">Role</label><select className="finput" value={cf.role} onChange={e=>setC("role",e.target.value)}><option value="user">User</option><option value="admin">Admin</option></select></div>
        </div>
        <button className="cu-sub" onClick={handleCreate}>Create User</button>
        {cmsg&&<div className="cu-ok">{cmsg}</div>}
      </div>
    </>)}
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
      setOk(`Welcome, ${nu.name}!`);setTimeout(()=>onLogin(nu,true),900);
    } else {
      const u=users.find(u=>u.email===form.email.toLowerCase()&&u.password===form.password);
      if(!u){setErr({password:"Invalid email or password"});return;}
      const updated=users.map(x=>x.id===u.id?{...x,lastLogin:new Date().toISOString()}:x);
      saveUsers(updated);const fresh=updated.find(x=>x.id===u.id);saveSession(fresh);
      addLog({action:`${fresh.name} logged in`,email:fresh.email,time:new Date().toISOString(),type:"login"});
      onLogin(fresh,!fresh.stylePersona);
    }
  };
  return(
    <div className="login-wrap">
      {/* LEFT: Cherry Red gradient */}
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
      {/* RIGHT: Deep Navy */}
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

function SiteFooter(){
  return(<footer>
    <div className="ft-top">{[
      {title:"Online Shopping",links:["Men's Fashion","Women's Fashion","Kids' Fashion","Accessories"]},
      {title:"Customer Policies",links:["Contact Us","FAQ","Terms of Use","Privacy Policy"]},
      {title:"Experience App On",links:["iOS App Store","Google Play Store"]},
      {title:"About Us",links:["About Lookbook","Careers","Press","Sustainability"]},
    ].map(col=><div key={col.title} className="ftcol"><div className="ftcol-title">{col.title}</div><ul>{col.links.map(l=><li key={l}><a>{l}</a></li>)}</ul></div>)}</div>
    <hr className="ft-div"/>
    <div className="ft-bot"><div className="ft-logo">Look<span>book</span> Guide</div><div className="ft-copy">© 2026 Lookbook Guide · Made in India 🇮🇳</div><div className="ft-social">{["IG","FB","TW","YT"].map(s=><a key={s}>{s}</a>)}</div></div>
  </footer>);
}

function HomePage({onExplore,onCat}){
  const catTiles=[
    {label:"Women",img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80",cat:"WOMEN"},
    {label:"Men",img:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&q=80",cat:"MEN"},
    {label:"Kids",img:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80",cat:"KIDS"},
    {label:"Accessories",img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",cat:"ACCESSORIES"},
  ];
  const [quoteIdx]=useState(Math.floor(Math.random()*fashionQuotes.length));
  const q=fashionQuotes[quoteIdx];
  return(<div className="page-navy">
    {/* Hero: Deep Navy → Cherry Red gradient */}
    <div className="hero-banner">
      <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80" alt="hero"/>
      <div className="hero-content">
        <span className="h-eyebrow">Spring — Summer 2026</span>
        <h1 className="h-title">Dress to <em>express,</em><br/>not to impress.</h1>
        <div className="h-quote">"{q.text}" — {q.author}</div>
        <div className="h-btns"><button className="hbtn primary" onClick={onExplore}>Explore Lookbook</button><button className="hbtn outline" onClick={()=>onCat("WOMEN")}>Shop Women</button></div>
      </div>
    </div>
    <div className="season-quote-bar"><div className="sqb-text">"In Spring, every wardrobe deserves to bloom anew." ✦</div></div>
    <div className="home-sec">
      <div className="home-sec-title">Shop by Category</div>
      <div className="cat-grid">{catTiles.map(c=><div key={c.cat} className="cat-tile" onClick={()=>onCat(c.cat)}><img src={c.img} alt={c.label}/><div className="cat-tile-label">{c.label}</div></div>)}</div>
    </div>
    <div className="colour-sec">
      <div className="home-sec-title" style={{marginBottom:"0.4rem"}}>Colour Combinations That Look Rich ✦</div>
      <p style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)",marginBottom:"1.25rem"}}>Inspired by navy, cherry and chocolate — this season's power palette.</p>
      <div className="colour-grid">{colourCombos.map(cc=><div key={cc.name} className="colour-combo"><div className="cc-swatches"><div className="cc-swatch" style={{background:cc.c1}}/><div className="cc-swatch" style={{background:cc.c2}}/></div><div className="cc-name">{cc.name}</div></div>)}</div>
    </div>
    <div className="home-sec" style={{paddingTop:0}}>
      <div className="home-sec-title">Trending Now</div>
      <div className="trend-strip">{outfits.slice(0,8).map(o=><div key={o.id} className="trend-card" onClick={()=>onCat(o.cat)}><img src={o.img} alt={o.name}/><div className="trend-card-body"><div className="tc-name">{o.name}</div><div className="tc-price">{o.shopItems[0]?.price} onwards</div></div></div>)}</div>
    </div>
    <div className="promo-row">
      <div className="promo-card" onClick={()=>onCat("MEN")}><img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80" alt="Men"/><div className="promo-card-text"><div className="promo-label">Men's Edit</div><div className="promo-title">Sharp Autumn Looks</div></div></div>
      <div className="promo-card" onClick={()=>onCat("ACCESSORIES")}><img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80" alt="Accessories"/><div className="promo-card-text"><div className="promo-label">Accessories</div><div className="promo-title">Gold Hour Edit</div></div></div>
    </div>
    <SiteFooter/>
  </div>);
}

// Per-cat page backgrounds: new colour scheme
const catBg={
  WOMEN:"page-choc",       // Dark Chocolate
  MEN:"page-navy-mid",     // Deep Blue
  KIDS:"page-cherry",      // Cherry Red Dark
  ACCESSORIES:"page-indigo"// Deep Indigo
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [user,setUser]=useState(null);
  const [showQuiz,setShowQuiz]=useState(false);
  const [persona,setPersona]=useState(null);
  const [navCat,setNavCat]=useState(null);
  const [subTab,setSubTab]=useState("lookbook");
  // Auto-detect current season based on month (Northern Hemisphere / India)
  const detectSeason=()=>{
    const m=new Date().getMonth(); // 0=Jan
    if(m>=2&&m<=4) return "Spring";   // Mar–May
    if(m>=5&&m<=8) return "Summer";   // Jun–Sep
    if(m>=9&&m<=10) return "Autumn";  // Oct–Nov
    return "Winter";                   // Dec–Feb
  };
  const [season,setSeason]=useState(detectSeason());
  const [wishlist,setWishlist]=useState([]);
  const [cart,setCart]=useState(()=>getCart());
  const [history,setHistory]=useState([]);
  const [notifs,setNotifs]=useState(["New Autumn 2026 collection is live!","Your wishlist item is back in stock."]);
  const [search,setSearch]=useState("");
  const [profileOpen,setProfileOpen]=useState(false);
  const [notifOpen,setNotifOpen]=useState(false);
  const profileRef=useRef(null);
  const notifRef=useRef(null);

  useEffect(()=>{
    seedAdmin();
    const s=getSession();
    if(s){const fresh=getUsers().find(u=>u.id===s.id);if(fresh){setUser(fresh);if(fresh.stylePersona){const p=quizResults.find(r=>r.label===fresh.stylePersona);if(p)setPersona(p);}setShowQuiz(!fresh.stylePersona);}}
  },[]);

  useEffect(()=>{
    const h=e=>{
      if(profileRef.current&&!profileRef.current.contains(e.target))setProfileOpen(false);
      if(notifRef.current&&!notifRef.current.contains(e.target))setNotifOpen(false);
    };
    document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);
  },[]);

  const handleLogin=(u,goQuiz)=>{setUser(u);if(u.stylePersona){const p=quizResults.find(r=>r.label===u.stylePersona);if(p)setPersona(p);}setShowQuiz(goQuiz);};
  const handleLogout=()=>{clearSession();setUser(null);setPersona(null);setWishlist([]);setHistory([]);setShowQuiz(false);setNavCat(null);setSubTab("lookbook");setProfileOpen(false);};
  const handleQuizResult=r=>{
    setPersona(r);setShowQuiz(false);setHistory(h=>[`Quiz → ${r.label}`,...h]);setNotifs(n=>[`Quiz result: ${r.label}`,...n]);
    if(user){const upd=getUsers().map(u=>u.id===user.id?{...u,stylePersona:r.label,quizCompletedAt:new Date().toISOString()}:u);saveUsers(upd);const fresh=upd.find(u=>u.id===user.id);saveSession(fresh);setUser(fresh);}
  };
  const handleNavCat=cat=>{setNavCat(cat);setSubTab(cat==="ACCESSORIES"?"accessories":"lookbook");setProfileOpen(false);setNotifOpen(false);};
  const toggleWishlist=id=>{const o=outfits.find(x=>x.id===id);setWishlist(p=>{const isIn=p.includes(id);if(!isIn){setNotifs(n=>[`Added "${o.name}" to wishlist`,...n]);setHistory(h=>[`Wishlisted "${o.name}"`,...h]);}return isIn?p.filter(x=>x!==id):[...p,id];});};
  const addToCart=item=>{const nc=[...cart,item];setCart(nc);saveCart(nc);setNotifs(n=>[`"${item.name}" added to bag`,...n]);setHistory(h=>[`Added "${item.name}" to cart`,...h]);};
  const removeFromCart=idx=>{const nc=cart.filter((_,i)=>i!==idx);setCart(nc);saveCart(nc);};
  const handleProfileNav=tab=>{setProfileOpen(false);if(tab==="wishlist")setSubTab("wishlist");else if(tab==="orders")setSubTab("history");};

  const isAdmin=user?.role==="admin";
  const filtered=outfits.filter(o=>{
    const byCat=!navCat?true:o.cat===navCat;
    const bySeas=season==="All"||o.season===season;
    const bySearch=!search||o.name.toLowerCase().includes(search.toLowerCase())||o.tags.some(t=>t.includes(search.toLowerCase()));
    return byCat&&bySeas&&bySearch;
  });
  const subTabs=[
    {id:"lookbook",l:"Lookbook"},{id:"builder",l:"Builder"},{id:"quiz",l:"Style Quiz"},
    {id:"tips",l:"Style Tips"},{id:"accessories",l:"Accessories"},
    {id:"cart",l:`Bag (${cart.length})`},{id:"wishlist",l:`Wishlist (${wishlist.length})`},
    {id:"history",l:"History"},...(isAdmin?[{id:"admin",l:"⚙ Admin"}]:[]),
  ];
  const staticTips=[
    {icon:"✦",title:"Rule of Three",body:"Limit your outfit to three focal points — shoes, bag, or jewellery."},
    {icon:"◈",title:"Fit First",body:"The best fabric in an ill-fitting cut always looks cheap. Tailor it."},
    {icon:"❋",title:"Colour Temperature",body:"Warm tones (terracotta, rust) flatter warm skin; cool tones complement cool undertones."},
    {icon:"⟡",title:"Proportion Play",body:"Oversized top → slim bottom. Voluminous skirt → tucked-in blouse."},
    {icon:"◎",title:"Texture Pairing",body:"Pair smooth fabrics (silk, satin) with tactile ones (corduroy, bouclé) for depth."},
    {icon:"✦",title:"Rich Colours",body:"Deep navy + gold, cherry red + cream — these combinations always command the room."},
  ];

  if(!user) return(<><style>{CSS}</style><LoginPage onLogin={handleLogin}/></>);
  if(showQuiz) return(<><style>{CSS}</style><QuizPortal userName={user.name} existingPersona={persona} onResult={handleQuizResult} onSkip={()=>setShowQuiz(false)}/></>);

  const lookbookBg=navCat?catBg[navCat]||"page-navy":"page-navy";

  return(<>
    <style>{CSS}</style>

    {/* TOP NAV */}
    <nav className="tnav">
      <div className="tnav-logo" onClick={()=>{setNavCat(null);setSubTab("lookbook");}}>Look<span>book</span></div>
      <div className="tnav-cats">{NAV_CATS.map(cat=><button key={cat} className={`tnav-cat${navCat===cat?" active":""}`} onClick={()=>handleNavCat(cat)}>{cat}</button>)}</div>
      <div className="tnav-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input placeholder="Search for products, brands and more" value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div className="tnav-right">
        <div ref={notifRef} style={{position:"relative"}}>
          <button className="tnav-icon" onClick={()=>{setNotifOpen(o=>!o);setProfileOpen(false);}}>
            <span className="ico">🔔</span><span>Alerts</span>
            {notifs.length>0&&<span className="cart-badge">{Math.min(notifs.length,9)}</span>}
          </button>
          {notifOpen&&<div className="notif-panel"><h4>Notifications</h4>{notifs.length===0?<div className="ni-empty">No new alerts.</div>:notifs.slice(0,6).map((n,i)=><div key={i} className="ni">{n}</div>)}</div>}
        </div>
        <div ref={profileRef} className="profile-wrap">
          <button className="tnav-icon" onClick={()=>{setProfileOpen(o=>!o);setNotifOpen(false);}}>
            <div className="profile-avatar">{user.name.slice(0,2).toUpperCase()}</div>
            <span>Profile</span>
          </button>
          {profileOpen&&<ProfileDropdown user={user} onNavigate={handleProfileNav} onLogout={handleLogout} wishlistCount={wishlist.length}/>}
        </div>
        <button className="tnav-icon" onClick={()=>{setSubTab("wishlist");setNavCat(null);}}>
          <span className="ico">♡</span><span>Wishlist</span>
          {wishlist.length>0&&<span className="cart-badge">{wishlist.length}</span>}
        </button>
        <button className="tnav-icon" onClick={()=>{setSubTab("cart");setNavCat(null);}}>
          <span className="ico">🛍</span><span>Bag</span>
          {cart.length>0&&<span className="cart-badge">{cart.length}</span>}
        </button>
      </div>
    </nav>

    {/* SUBNAV */}
    <div className="subnav">
      {subTabs.map(t=><button key={t.id} className={`snbtn${subTab===t.id?" active":""}`} onClick={()=>setSubTab(t.id)}>{t.l}</button>)}
      {persona&&<span style={{marginLeft:"auto",fontSize:"0.66rem",color:"var(--sky)",fontWeight:700,padding:"0 1rem",display:"flex",alignItems:"center",whiteSpace:"nowrap"}}>{persona.emoji} {persona.label}</span>}
    </div>

    {/* HOMEPAGE */}
    {!navCat&&!search&&subTab==="lookbook"&&<HomePage onExplore={()=>handleNavCat("WOMEN")} onCat={handleNavCat}/>}

    {/* LOOKBOOK GRID */}
    {(navCat||search)&&subTab==="lookbook"&&(
      <div className={lookbookBg}>
        <div className="lkwrap">
          <div className="lk-hdr">
            <div className="lk-title">{navCat||"Search Results"}</div>
            <div className="lk-count">{filtered.length} outfits{persona?` · Styled for ${persona.label}`:""}</div>
          </div>
          <div className="season-bar">
            {seasons.map(s=>{
              const isCurrent=s===detectSeason();
              return(
                <button key={s} className={`sbtn${season===s?" active":""}`} onClick={()=>setSeason(s)}
                  style={isCurrent&&season!==s?{borderColor:"rgba(136,189,242,0.45)",color:"rgba(255,255,255,0.75)"}:{}}>
                  {s}{isCurrent&&<span style={{fontSize:"0.5rem",marginLeft:"3px",color:"var(--cornflower)"}}>●</span>}
                </button>
              );
            })}
            <span style={{fontSize:"0.62rem",color:"rgba(255,255,255,0.3)",marginLeft:"0.5rem",alignSelf:"center"}}>● current season</span>
          </div>
          <div className="grid">
            {filtered.map(o=><OutfitCard key={o.id} outfit={o} onWishlist={toggleWishlist} wishlisted={wishlist.includes(o.id)} onAddToCart={addToCart}/>)}
            {filtered.length===0&&<div style={{gridColumn:"1/-1",padding:"3rem",textAlign:"center",color:"rgba(255,255,255,0.3)"}}>No outfits found.</div>}
          </div>
        </div>
        <SiteFooter/>
      </div>
    )}

    {subTab==="accessories"&&<div className="page-indigo"><AccessoriesPage onAddToCart={addToCart} currentSeason={season}/><SiteFooter/></div>}

    {subTab==="builder"&&<div className="page-choc-mid"><OutfitBuilder stylePersona={persona} onAddToCart={addToCart}/><SiteFooter/></div>}

    {subTab==="quiz"&&(
      <div className="page-ink">
        <section className="section">
          <h2 className="sec-title">Style Personalise Quiz</h2>
          <p className="sec-sub">Answer 5 questions to discover your fashion persona.</p>
          {persona?<div style={{marginBottom:"1.5rem",padding:"1rem 1.25rem",background:"rgba(13,31,60,0.5)",border:"1px solid rgba(201,169,110,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.75rem"}}><span style={{fontSize:"0.85rem",color:"#fff"}}>Current persona: <strong style={{color:"var(--warm)"}}>{persona.label}</strong></span><button className="bsm" onClick={()=>setShowQuiz(true)}>Retake quiz</button></div>:<button className="btn-p" onClick={()=>setShowQuiz(true)} style={{marginBottom:"1rem"}}>Start Quiz →</button>}
        </section>
        <SiteFooter/>
      </div>
    )}

    {subTab==="tips"&&(
      <div className="page-navy">
        <section className="section">
          <h2 className="sec-title">Style Tips</h2>
          {persona?(<>
            <p className="sec-sub">Personalised for your <strong style={{color:"var(--warm)"}}>{persona.label}</strong> persona.</p>
            <div className="qt-grid" style={{marginBottom:"2rem"}}>{persona.tips.map(t=><div key={t.title} className="qt-card"><div className="qt-icon">{t.icon}</div><div className="qt-title">{t.title}</div><p className="qt-body">{t.body}</p></div>)}</div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:400,marginBottom:"1rem",color:"#fff"}}>Universal Rules</h3>
          </>):<p className="sec-sub"><span onClick={()=>setShowQuiz(true)} style={{color:"var(--warm)",cursor:"pointer",textDecoration:"underline",fontWeight:600}}>Take the quiz</span> to get personalised tips.</p>}
          <div className="tips-grid">{staticTips.map(t=><div key={t.title} className="tip-card"><div className="tip-icon">{t.icon}</div><div className="tip-title">{t.title}</div><p className="tip-body">{t.body}</p></div>)}</div>
        </section>
        <SiteFooter/>
      </div>
    )}

    {subTab==="cart"&&<div className="page-deepnavy"><CartPage cart={cart} onRemove={removeFromCart} onContinue={()=>{setSubTab("lookbook");setNavCat("WOMEN");}}/><SiteFooter/></div>}

    {subTab==="wishlist"&&(
      <div className="page-deep-cherry">
        <section className="section list-sec">
          <h2 className="sec-title">Wishlist</h2><p className="sec-sub">Outfits you've saved.</p>
          {wishlist.length===0?<p className="empty">No items yet — heart an outfit in the Lookbook.</p>:outfits.filter(o=>wishlist.includes(o.id)).map(o=><div key={o.id} className="wish-item"><div><div className="wi-name">{o.name}</div><div className="wi-season">{o.season} · {o.cat}</div></div><button className="rm-btn" onClick={()=>toggleWishlist(o.id)}>Remove</button></div>)}
        </section>
        <SiteFooter/>
      </div>
    )}

    {subTab==="history"&&(
      <div className="page-navy-mid">
        <section className="section list-sec">
          <h2 className="sec-title">History</h2><p className="sec-sub">Your recent activity this session.</p>
          {history.length===0?<p className="empty">No activity yet.</p>:history.map((h,i)=><div key={i} className="hist-item">{h}</div>)}
        </section>
        <SiteFooter/>
      </div>
    )}

    {subTab==="admin"&&isAdmin&&<div className="page-navy-mid"><AdminPanel/><SiteFooter/></div>}
  </>);
}