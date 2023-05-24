const fields = document.getElementById('fields').value.split(',');


async function chamaService(endpoint, fields = []) {
  let responsa;
  let construc_object = [];
  let vezes = 0;

  while (vezes < 5) {
    await fetch(endpoint)
            .then(res => res.json())
            .then(res => responsa = res);

    
            
          }

  const resultado = findFieldsInObject(responsa, fields)

  resultado.forEach(res => {
    if (res.jaTem === false) {
      chamaService(endpoint, fields);
    }
  })
}
