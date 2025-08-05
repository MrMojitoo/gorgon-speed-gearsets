let allRoles = [];

fetch('gearsets.json')
  .then(response => response.json())
  .then(data => {
    allRoles = data.roles;
    createRoleButtons();
  });

function createRoleButtons() {
  const rolesDiv = document.getElementById('roles');
  rolesDiv.innerHTML = '';

  allRoles.forEach(role => {
    const button = document.createElement('button');
    button.setAttribute('data-role', role.id);

    const icon = document.createElement('img');
    icon.src = role.icon;
    icon.alt = role.name;

    button.appendChild(icon);
    button.append(role.name);

    button.addEventListener('click', () => {
      showGearsets(role.id);
    });

    rolesDiv.appendChild(button);
  });
}

function showGearsets(roleId) {
  const container = document.getElementById('gearsets-container');
  container.innerHTML = '';

  const role = allRoles.find(r => r.id === roleId);
  if (!role || !role.gearsets.length) {
    container.innerHTML = '<p>Aucun gearset disponible pour ce rôle.</p>';
    return;
  }

  role.gearsets.forEach((set, index) => {
    const gearsetDiv = document.createElement('div');
    gearsetDiv.className = 'gearset';
    gearsetDiv.setAttribute('data-index', index);

    const title = document.createElement('h3');
    title.textContent = set.title;

    // Zone où l'image sera injectée dynamiquement
    const imageContainer = document.createElement('div');
    imageContainer.className = 'gearset-image';
    imageContainer.style.display = 'none'; // cachée par défaut

    // Gestion du clic sur le titre
    gearsetDiv.addEventListener('click', () => {
      if (imageContainer.style.display === 'none') {
        imageContainer.style.display = 'block';

        // Ajouter l'image (si non déjà ajoutée)
        if (!imageContainer.hasChildNodes()) {
          const link = document.createElement('a');
          link.href = set.link;
          link.target = '_blank';

          const image = document.createElement('img');
          image.src = set.image;
          image.alt = set.title;

          link.appendChild(image);
          imageContainer.appendChild(link);
        }
      } else {
        imageContainer.style.display = 'none';
      }
    });

    gearsetDiv.appendChild(title);
    gearsetDiv.appendChild(imageContainer);
    container.appendChild(gearsetDiv);
  });
}
