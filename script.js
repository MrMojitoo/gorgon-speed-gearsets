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

    // Bouton de toggle (flèche), positionné en haut à droite
    const toggleButton = document.createElement('div');
    toggleButton.className = 'gearset-toggle';
    toggleButton.textContent = '🡻';

    // Titre centré
    const title = document.createElement('h3');
    title.textContent = set.title;

    // Sous-titre + stats
    const subtitle = document.createElement('p');
    subtitle.textContent = set.subtitle || '';
    subtitle.className = 'subtitle';

    const stats = document.createElement('p');
    stats.textContent = set.stats || '';
    stats.className = 'stats';

    // Icones d'équipement : weapon1, weapon2, artifactArmor, artifactJewellery
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

    // Sorts des deux armes
    const spellRow = document.createElement('div');
    spellRow.className = 'spells-row';

    [set.weapon1, set.weapon2].forEach((weapon, i) => {
      if (weapon && Array.isArray(weapon.spells)) {
        const spellGroup = document.createElement('div');
        spellGroup.className = 'spell-group';

        weapon.spells.forEach(icon => {
          const img = document.createElement('img');
          img.src = icon;
          img.alt = 'spell';
          img.className = 'spell-icon';
          spellGroup.appendChild(img);
        });

        spellRow.appendChild(spellGroup);
      }
    });

    // Conteneur d'image (affiché au clic)
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

    // Clic sur toggle (et non toute la carte)
    toggleButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Empêche la propagation au parent
      const isOpen = gearsetDiv.classList.contains('open');

      document.querySelectorAll('.gearset.open').forEach(other => {
        if (other !== gearsetDiv) {
          other.classList.remove('open');
          const ic = other.querySelector('.gearset-image');
          const arrow = other.querySelector('.gearset-toggle');
          ic.style.maxHeight = null;
          arrow.textContent = '🡻';
        }
      });

      if (isOpen) {
        gearsetDiv.classList.remove('open');
        toggleButton.textContent = '🡻';
      } else {
        gearsetDiv.classList.add('open');
        toggleButton.textContent = '🡹';
      }
    });

    // Assemblement final
    gearsetDiv.appendChild(toggleButton);
    gearsetDiv.appendChild(title);
    gearsetDiv.appendChild(subtitle);
    gearsetDiv.appendChild(stats);
    gearsetDiv.appendChild(iconRow);
    gearsetDiv.appendChild(spellRow); // nouvelle ligne des sorts
    gearsetDiv.appendChild(imageContainer);
    container.appendChild(gearsetDiv);
  });
}
