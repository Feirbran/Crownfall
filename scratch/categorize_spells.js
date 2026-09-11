const fs = require('fs');
const list = JSON.parse(fs.readFileSync('scratch/all_spells_reactions.json', 'utf8'));

console.log('Total spells + reactions:', list.length);

const categories = {
  direct_damage: [],
  heal_repair: [],
  draw_resource: [],
  movement_position: [],
  terrain_summon: [],
  buff_control: [],
  reactions: []
};

list.forEach(c => {
  const n = c.name;
  const d = c.desc.toLowerCase();
  const t = c.type;

  if (t === 'reaction') {
    categories.reactions.push(n);
  } else if (d.includes('cura') || d.includes('ripristina') || d.includes('rigenera')) {
    categories.heal_repair.push(n);
  } else if (d.includes('pesca') || d.includes('mana') || d.includes('sangue') && !d.includes('pozza') || d.includes('azione') || d.includes('sacrifica')) {
    categories.draw_resource.push(n);
  } else if (d.includes('spinge') || d.includes('trascina') || d.includes('muove') || d.includes('scambia') || d.includes('teletrasporta') || d.includes('rimanda')) {
    categories.movement_position.push(n);
  } else if (d.includes('muro') || d.includes('blocco') || d.includes('voragine') || d.includes('evoca') || d.includes('rianima') || d.includes('cimitero') || d.includes('trappola') || d.includes('pozza') || d.includes('trasforma')) {
    categories.terrain_summon.push(n);
  } else if (d.includes('danni') || d.includes('distrugge') || d.includes('polverizza') || d.includes('annulla')) {
    categories.direct_damage.push(n);
  } else {
    categories.buff_control.push(n);
  }
});

Object.entries(categories).forEach(([k, v]) => {
  console.log(`${k} (${v.length}):`, v.join(', '));
});
