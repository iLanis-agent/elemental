/* elemental engine: element bank + question generation (pure, node-testable) */
var ELEMENTS = [
  {n:1,s:'H',name:'Hydrogen'},{n:2,s:'He',name:'Helium'},{n:3,s:'Li',name:'Lithium'},
  {n:4,s:'Be',name:'Beryllium'},{n:5,s:'B',name:'Boron'},{n:6,s:'C',name:'Carbon'},
  {n:7,s:'N',name:'Nitrogen'},{n:8,s:'O',name:'Oxygen'},{n:9,s:'F',name:'Fluorine'},
  {n:10,s:'Ne',name:'Neon'},{n:11,s:'Na',name:'Sodium'},{n:12,s:'Mg',name:'Magnesium'},
  {n:13,s:'Al',name:'Aluminium'},{n:14,s:'Si',name:'Silicon'},{n:15,s:'P',name:'Phosphorus'},
  {n:16,s:'S',name:'Sulfur'},{n:17,s:'Cl',name:'Chlorine'},{n:18,s:'Ar',name:'Argon'},
  {n:19,s:'K',name:'Potassium'},{n:20,s:'Ca',name:'Calcium'},{n:22,s:'Ti',name:'Titanium'},
  {n:24,s:'Cr',name:'Chromium'},{n:25,s:'Mn',name:'Manganese'},{n:26,s:'Fe',name:'Iron'},
  {n:27,s:'Co',name:'Cobalt'},{n:28,s:'Ni',name:'Nickel'},{n:29,s:'Cu',name:'Copper'},
  {n:30,s:'Zn',name:'Zinc'},{n:33,s:'As',name:'Arsenic'},{n:34,s:'Se',name:'Selenium'},
  {n:35,s:'Br',name:'Bromine'},{n:36,s:'Kr',name:'Krypton'},{n:38,s:'Sr',name:'Strontium'},
  {n:47,s:'Ag',name:'Silver'},{n:48,s:'Cd',name:'Cadmium'},{n:50,s:'Sn',name:'Tin'},
  {n:53,s:'I',name:'Iodine'},{n:54,s:'Xe',name:'Xenon'},{n:55,s:'Cs',name:'Caesium'},
  {n:56,s:'Ba',name:'Barium'},{n:74,s:'W',name:'Tungsten'},{n:78,s:'Pt',name:'Platinum'},
  {n:79,s:'Au',name:'Gold'},{n:80,s:'Hg',name:'Mercury'},{n:82,s:'Pb',name:'Lead'},
  {n:83,s:'Bi',name:'Bismuth'},{n:86,s:'Rn',name:'Radon'},{n:88,s:'Ra',name:'Radium'},
  {n:92,s:'U',name:'Uranium'},{n:94,s:'Pu',name:'Plutonium'}
];
/* modes: s2n symbol->name, n2s name->symbol, num: symbol->number */
function makeQuestion(mode, asked, rng){
  rng = rng || Math.random;
  var pool = ELEMENTS.filter(function(e){ return asked.indexOf(e.s)===-1; });
  if (!pool.length) pool = ELEMENTS;
  var el = pool[Math.floor(rng()*pool.length)];
  var distractPool = ELEMENTS.filter(function(e){ return e.s!==el.s; });
  /* prefer same-first-letter symbol distractors for trickiness */
  if (mode==='n2s' && el.s.length>0){
    var same = distractPool.filter(function(e){ return e.s[0]===el.s[0]; });
    if (same.length>=3) distractPool = same;
  }
  if (mode==='s2n'){
    var sameN = distractPool.filter(function(e){ return e.name[0]===el.name[0]; });
    if (sameN.length>=3) distractPool = sameN;
  }
  var opts = [];
  var used = {};
  while (opts.length<3 && distractPool.length){
    var d = distractPool[Math.floor(rng()*distractPool.length)];
    if (used[d.s]) continue;
    used[d.s]=1; opts.push(d);
  }
  opts.push(el);
  for (var i=opts.length-1;i>0;i--){ var j=Math.floor(rng()*(i+1)); var t=opts[i]; opts[i]=opts[j]; opts[j]=t; }
  return { el:el, mode:mode, options:opts, answer:opts.indexOf(el) };
}
function optionLabel(mode, e){
  if (mode==='s2n') return e.name;
  if (mode==='n2s') return e.s;
  return ''+e.n;
}
function questionLabel(mode, e){
  if (mode==='s2n') return e.s;
  if (mode==='n2s') return e.name;
  return e.s;
}
function grade(correct, total){
  var r = correct/total;
  if (r===1) return 'Nobel laureate';
  if (r>=0.8) return 'Chemist';
  if (r>=0.6) return 'Lab assistant';
  if (r>=0.4) return 'Periodic dabbler';
  return 'Alchemist in training';
}
if (typeof module !== 'undefined' && module.exports){
  module.exports = { ELEMENTS:ELEMENTS, makeQuestion:makeQuestion, optionLabel:optionLabel, questionLabel:questionLabel, grade:grade };
}
