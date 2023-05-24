const endpoint = document.querySelector('#endpoint');
const fields = document.querySelector('#fields');
const fieldValues = document.querySelector('#fieldValues');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  callService();
})

/** call service  */
function callService() {
  const pathValue = endpoint.value;
  const fieldsValue = fields.value.split(',');
  const valueFiends = fieldValues.value.split(',')

  new HttpService()
    .get(pathValue)
    .then(res => {

            
      const results = findFieldsInObject(res, fieldsValue, valueFiends);
      
      for (let result of results) {
        
        if (result.jaTem === false) setTimeout(callService(), 200);

      }

      console.log(results);
      

    })
                      

  // fetch(pathValue, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(res => res.json())
  //   .then(res => {
      
  //     // const results = findFieldsInObject(res, fieldsValue)
      
  //     // for (let result of results) {
        
  //     //   if (result.jaTem === false) callService();

  //     // }

  //     // console.log(results);

  //   })
  //   .catch(err => {
  //     throw new Error(err)
  //   }) 
}

function findFieldsInObject(obj, fields, expectedValues = []) {
  const foundFields = [];

  function searchField(obj, field, parentPath = '') {
    for (const key in obj) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (field.includes(key)) {
        const index = field.indexOf(key);
        const expectedValue = expectedValues[index];

        if (expectedValues.length === 0 || obj[key] === expectedValue) {
          foundFields.push({
            nomeCampo: field,
            jaTem: true,
            valor: obj[key]
          });
        }
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

// class FindFields {


//   findFieldsInObject(obj, fields, expectedValues = []) {
//     const foundFields = [];
  
//     this.findFieldsInObject(obj, fields, expectedValues);
  
//     fields.forEach(field => {
//       searchField(obj, field);
//     });
  
//     const hasAllFields = fields.every(field => foundFields.some(found => found.nomeCampo === field));
  
//     return fields.map(field => {
//       const foundField = foundFields.find(found => found.nomeCampo === field);
  
//       return {
//         nomeCampo: field,
//         jaTem: hasAllFields && foundField !== undefined,
//         valor: foundField !== undefined ? foundField.valor : undefined
//       };
//     });
//   }

//   searchField(obj, field, parentPath = '') {
//     for (const key in obj) {
//       const currentPath = parentPath ? `${parentPath}.${key}` : key;

//       if (field.includes(key)) {
//         const index = field.indexOf(key);
//         const expectedValue = expectedValues[index];

//         if (expectedValues.length === 0 || obj[key] === expectedValue) {
//           foundFields.push({
//             nomeCampo: field,
//             jaTem: true,
//             valor: obj[key]
//           });
//         }
//       }

//       if (typeof obj[key] === 'object') {
//         searchField(obj[key], field, currentPath);
//       }
//     }
//   }

// }


class HttpService {

  _handleError(res) {
    if (!res.ok) throw new Error(res.statusText);
    return res;
  } 

  get(url) {

    return fetch(url)
              .then(res => this._handleError(res))
              .then(res => res.json()); 
  }

  post(url, dado) {


    return fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(dado)
    })
    .then(res => this._handleError(res));

  }

}


