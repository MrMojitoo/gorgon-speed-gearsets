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

  role.gearsets.forEach(set => {
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
