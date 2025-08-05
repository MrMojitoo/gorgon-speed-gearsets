// Base de données des gearsets pour chaque rôle
const gearsets = {
  tank: [
    {
      title: "Tank Set #1",
      image: "images/tank1.png",
      link: "https://example.com/tank1"
    },
    {
      title: "Tank Set #2",
      image: "images/tank2.png",
      link: "https://example.com/tank2"
    }
  ],
  healer: [
    {
      title: "Healer Build #1",
      image: "images/healer1.png",
      link: "https://example.com/healer1"
    }
  ],
  // Ajoute ici les autres rôles de la même manière
};

// Gestion du clic sur les boutons de rôle
document.querySelectorAll('#roles button').forEach(button => {
  button.addEventListener('click', () => {
    const role = button.getAttribute('data-role');
    showGearsets(role);
  });
});

// Affichage des gearsets
function showGearsets(role) {
  const container = document.getElementById('gearsets-container');
  container.innerHTML = ''; // Efface les gearsets précédents

  const sets = gearsets[role];
  if (!sets) {
    container.innerHTML = "<p>Aucun gearset disponible pour ce rôle.</p>";
    return;
  }

  sets.forEach(set => {
    const gearsetDiv = document.createElement('div');
    gearsetDiv.className = 'gearset';

    const title = document.createElement('h3');
    title.textContent = set.title;

    const link = document.createElement('a');
    link.href = set.link;
    link.target = '_blank';

    const image = document.createElement('img');
    image.src = set.image;
    image.alt = set.title;

    link.appendChild(image);
    gearsetDiv.appendChild(title);
    gearsetDiv.appendChild(link);

    container.appendChild(gearsetDiv);
  });
}
