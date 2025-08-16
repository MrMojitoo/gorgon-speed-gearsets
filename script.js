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
      // Retirer la classe selected de tous les boutons
      document.querySelectorAll('#roles button').forEach(btn => {
        btn.classList.remove('selected');
      });
    
      // Ajouter la classe selected au bouton cliqué
      button.classList.add('selected');
    
      // Afficher les gearsets
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
    
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'icon-wrapper';
        if (item.bgColor) {
          iconWrapper.style.backgroundColor = item.bgColor;
        }
    
        const img = document.createElement('img');
        img.src = item.icon;
        img.alt = item.name;
    
        iconWrapper.appendChild(img);
    
        const label = document.createElement('span');
        label.textContent = item.name;
    
        itemDiv.appendChild(iconWrapper);
        itemDiv.appendChild(label);
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

        weapon.spells.forEach(spell => {
          const wrapper = document.createElement('div');
          wrapper.className = 'spell-wrapper';
          if (spell.bgColor) {
            wrapper.style.backgroundColor = spell.bgColor;
          }
        
          const img = document.createElement('img');
          img.src = spell.icon;
          img.alt = 'spell';
          img.className = 'spell-icon';
        
          wrapper.appendChild(img);
          spellGroup.appendChild(wrapper);
        });


        spellRow.appendChild(spellGroup);
      }
    });

    // === CONTENEUR EMBED (remplace l'image) ===
    const embedContainer = document.createElement('div');
    embedContainer.className = 'gearset-embed';

    // Construire l'URL d'embed
    const embedSrc = (set.embed && set.embed.trim())
      ? set.embed.trim()
      : (set.link ? set.link.replace('/gearsets/', '/gearsets/embed/') : '');

    // Wrapper pour le scale
    const scaleWrapper = document.createElement('div');
    scaleWrapper.className = 'embed-scale';

    // Ajustement par gearset (optionnel dans le JSON)
    if (typeof set.scale === 'number') {
      scaleWrapper.style.setProperty('--scale', String(set.scale));
    }

    const iframe = document.createElement('iframe');
    iframe.src = embedSrc;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer';
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.minHeight = '900px';

    scaleWrapper.appendChild(iframe);
    embedContainer.appendChild(scaleWrapper);

    // Ajout dans la carte
    gearsetDiv.appendChild(embedContainer);


    // Gestion du clic sur toute la carte
    gearsetDiv.addEventListener('click', () => {
      const isOpen = gearsetDiv.classList.contains('open');
    
      if (isOpen) {
        gearsetDiv.classList.remove('open');
      } else {
        gearsetDiv.classList.add('open');
      }
    });


    toggleButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Evite double toggle si clique pile sur la flèche
    });


    // Assemblement final
    gearsetDiv.appendChild(toggleButton);
    gearsetDiv.appendChild(title);
    gearsetDiv.appendChild(subtitle);
    gearsetDiv.appendChild(stats);
    gearsetDiv.appendChild(iconRow);
    gearsetDiv.appendChild(spellRow); // nouvelle ligne des sorts
    gearsetDiv.appendChild(embedContainer);
    container.appendChild(gearsetDiv);
  });
}
