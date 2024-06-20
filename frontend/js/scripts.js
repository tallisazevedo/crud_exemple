document.getElementById('addHouseForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const house = {
    owner_name: document.getElementById('ownerName').value,
    street: document.getElementById('street').value,
    number: document.getElementById('number').value,
    postal_code: document.getElementById('postalCode').value,
    complement: document.getElementById('complement').value,
  };

  fetch('/houses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(house)
  }).then(response => response.text())
    .then(data => {
      alert(data);
      window.location.href = 'index.html';
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('/houses')
    .then(response => response.json())
    .then(data => {
      const houseList = document.getElementById('houseList');
      data.forEach(house => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${house.id}</td>
          <td>${house.owner_name}</td>
          <td>${house.street}</td>
          <td>${house.number}</td>
          <td>${house.postal_code}</td>
          <td>${house.complement}</td>
          <td>
            <a href="edit-house.html?id=${house.id}" class="btn btn-warning btn-sm">Edit</a>
            <button class="btn btn-danger btn-sm" onclick="deleteHouse(${house.id})">Delete</button>
          </td>
        `;
        houseList.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
});

function deleteHouse(id) {
  if (confirm('Are you sure you want to delete this house?')) {
    fetch(`/houses/${id}`, {
      method: 'DELETE'
    }).then(response => response.text())
      .then(data => {
        alert(data);
        location.reload();
      })
      .catch(error => console.error('Error:', error));
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const houseId = params.get('id');

  if (houseId) {
    fetch(`/houses/${houseId}`)
      .then(response => response.json())
      .then(house => {
        document.getElementById('houseId').value = house.id;
        document.getElementById('ownerName').value = house.owner_name;
        document.getElementById('street').value = house.street;
        document.getElementById('number').value = house.number;
        document.getElementById('postalCode').value = house.postal_code;
        document.getElementById('complement').value = house.complement;
      })
      .catch(error => console.error('Error:', error));
  }

  document.getElementById('editHouseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const house = {
      owner_name: document.getElementById('ownerName').value,
      street: document.getElementById('street').value,
      number: document.getElementById('number').value,
      postal_code: document.getElementById('postalCode').value,
      complement: document.getElementById('complement').value,
    };

    fetch(`/houses/${houseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(house)
    }).then(response => response.text())
      .then(data => {
        alert(data);
        window.location.href = 'list-houses.html';
      })
      .catch(error => console.error('Error:', error));
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const houseId = params.get('id');

  if (houseId) {
    fetch(`/houses/${houseId}`)
      .then(response => response.json())
      .then(house => {
        document.getElementById('houseId').value = house.id;
      })
      .catch(error => console.error('Error:', error));
  }

  document.getElementById('deleteHouseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('houseId').value;

    fetch(`/houses/${id}`, {
      method: 'DELETE'
    }).then(response => response.text())
      .then(data => {
        alert(data);
        window.location.href = 'list-houses.html';
      })
      .catch(error => console.error('Error:', error));
  });
});
