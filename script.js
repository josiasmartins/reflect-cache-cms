const serviceForm = document.getElementById('serviceForm');
const cardsContainer = document.getElementById('cardsContainer');

serviceForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const endpoint = document.getElementById('endpoint').value;
  const fields = document.getElementById('fields').value.split(',');

  const response = await verifyService(endpoint, fields);
  createCard(endpoint, fields, response);
});

async function chamaService(endpoint, fields = []) {
  let responsa;
  let construc_object = [];
  let vezes = 0;

  while (vezes < 5) {
    await fetch(endpoint)
            .then(res => res.json())
            .then(res => this.responsa = res);

    
    const missingFields = fields.filte(field => !resp)

  }
}

async function verifyService(endpoint, fields) {
  let response;
  let attempts = 0;

  while (attempts < 5) {
    response = await fetch(endpoint);
    response = await response.json();

    const responseFields = Object.keys(response);

    const missingFields = fields.filter(field => !responseFields.includes(field));

    if (missingFields.length === 0) {
      return response;
    }

    attempts++;
  }

  return response;
}

function createCard(endpoint, fields, response) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (response) {
    card.classList.add('green');
  }

  const title = document.createElement('div');
  title.classList.add('title');
  title.textContent = `Endpoint: ${endpoint}`;
  card.appendChild(title);

  fields.forEach(field => {
    const fieldElement = document.createElement('div');
    fieldElement.classList.add('field');

    const fieldName = document.createElement('span');
    fieldName.textContent = field;
    fieldElement.appendChild(fieldName);

    const fieldStatus = document.createElement('span');
    fieldStatus.textContent = response && response.hasOwnProperty(field) ? '✔' : '✘';
    fieldElement.appendChild(fieldStatus);

    card.appendChild(fieldElement);
  });

  cardsContainer.appendChild(card);
}


function findFieldsInObject(obj, fields) {
  const foundFields = [];

  function searchField(obj, field, parentPath = '') {
    for (const key in obj) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (field.includes(key)) {
        foundFields.push({
          nomeCampo: field,
          jaTem: true,
          valor: obj[key]
        });
      }

      if (typeof obj[key] === 'object') {
        searchField(obj[key], field, currentPath);
      }
    }
  }

  fields.forEach(field => {
    searchField(obj, field);
  });

  const hasAllFields = fields.every(field => foundFields.some(found => found.nomeCampo === field));

  return fields.map(field => {
    const foundField = foundFields.find(found => found.nomeCampo === field);

    return {
      nomeCampo: field,
      jaTem: hasAllFields && foundField !== undefined,
      valor: foundField !== undefined ? foundField.valor : undefined
    };
  });
}
