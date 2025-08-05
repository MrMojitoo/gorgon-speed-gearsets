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

  let openGearset = null;

  role.gearsets.forEach((set, index) => {
    const gearsetDiv = document.createElement('div');
    gearsetDiv.className = 'gearset';
    gearsetDiv.setAttribute('data-index', index);

    // Titre + icône flèche
    const title = document.createElement('h3');
    title.textContent = set.title;

    const arrowIcon = document.createElement('span');
    arrowIcon.textContent = '🡻';
    title.appendChild(arrowIcon);

    // Sous-titre + stats
    const subtitle = document.createElement('p');
    subtitle.textContent = set.subtitle || '';
    subtitle.className = 'subtitle';

    const stats = document.createElement('p');
    stats.textContent = set.stats || '';
    stats.className = 'stats';

    // Ligne avec 4 objets : weapon1, weapon2, artifactArmor, artifactJewellery
    const iconRow = document.createElement('div');
    iconRow.className = 'icon-row';

    const gearItems = [
      set.weapon1,
      set.weapon2,
      set.artifactArmor,
      set.artifactJewellery
    ];

    gearItems.forEach(item => {
      if (item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'icon-label';
        itemDiv.innerHTML = `
          <img src="${item.icon}" alt="${item.name}" />
          <span>${item.name}</span>
        `;
        iconRow.appendChild(itemDiv);
      }
    });

    // Image (conteneur caché avec animation)
    const imageContainer = document.createElement('div');
    imageContainer.className = 'gearset-image';

    const link = document.createElement('a');
    link.href = set.link;
    link.target = '_blank';

    const image = document.createElement('img');
    image.src = set.image;
    image.alt = set.title;

    link.appendChild(image);
    imageContainer.appendChild(link);

    // Clic sur la carte → toggle unique
    gearsetDiv.addEventListener('click', () => {
      const isOpen = gearsetDiv.classList.contains('open');

      // Ferme les autres
      document.querySelectorAll('.gearset.open').forEach(other => {
        if (other !== gearsetDiv) {
          other.classList.remove('open');
          const ic = other.querySelector('.gearset-image');
          const arrow = other.querySelector('h3 span');
          ic.style.maxHeight = null;
          arrow.textContent = '🡻';
        }
      });

      // Toggle ce gearset
      if (isOpen) {
        gearsetDiv.classList.remove('open');
        imageContainer.style.maxHeight = null;
        arrowIcon.textContent = '🡻';
      } else {
        gearsetDiv.classList.add('open');
        imageContainer.style.maxHeight = image.scrollHeight + "px";
        arrowIcon.textContent = '🡹';
      }
    });

    gearsetDiv.appendChild(title);
    gearsetDiv.appendChild(subtitle);
    gearsetDiv.appendChild(stats);
    gearsetDiv.appendChild(iconRow); // Nouvelle ligne ici
    gearsetDiv.appendChild(imageContainer);
    container.appendChild(gearsetDiv);
  });
}
