let eleves = [
  { nom: "Lucas", notes: [14, 16, 18] },
  { nom: "Emma", notes: [17, 18, 19] },
  { nom: "Salomé", notes: [10, 11, 12] }
];

function moyenne(notes) {
  let total = 0;

  notes.forEach(note => {
    total += note;
  });

  return total / notes.length;
}


let moyennes = eleves.map(eleve => {
  return {
    nom: eleve.nom,
    moyenne: moyenne(eleve.notes)
  };
});

console.log(moyennes);



let meilleurs = eleves.filter(eleve => {
  return moyenne(eleve.notes) >= 15;
});

console.log(meilleurs);
