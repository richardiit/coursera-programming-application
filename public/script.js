document.addEventListener('DOMContentLoaded', () => {
  const recordsList = document.getElementById('recordsList');
  const addRecordForm = document.getElementById('addRecordForm');
  const updateRecordSection = document.getElementById('updateRecordSection');
  const updateRecordForm = document.getElementById('updateRecordForm');
  const cancelUpdate = document.getElementById('cancelUpdate');

  // Fetch and display all records
  function fetchRecords() {
    fetch('/api/records')
      .then(response => response.json())
      .then(data => {
        recordsList.innerHTML = data.map(record => `
          <div>
            <span>Name: ${record.name}</span>
            <span>Description: ${record.description}</span>
            <button class="edit" onclick="editRecord(${record.id}, '${record.name}', '${record.description}')">Edit</button>
            <button class="delete" onclick="deleteRecord(${record.id})">Delete</button>
          </div>
        `).join('');
      });
  }

  // Add a new record
  addRecordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    fetch('/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description })
    })
    .then(response => {
      if (response.status === 201) {
        fetchRecords();
        addRecordForm.reset();
      }
    });
  });

  // Delete a record
  window.deleteRecord = (id) => {
    fetch(`/api/records/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        fetchRecords();
      }
    });
  };

  // Edit a record
  window.editRecord = (id, name, description) => {
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateDescription').value = description;
    updateRecordSection.style.display = 'block';
  };

  // Update a record
  updateRecordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const description = document.getElementById('updateDescription').value;

    fetch(`/api/records/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description })
    })
    .then(response => {
      if (response.status === 200) {
        fetchRecords();
        updateRecordForm.reset();
        updateRecordSection.style.display = 'none';
      }
    });
  });

  // Cancel update
  cancelUpdate.addEventListener('click', () => {
    updateRecordForm.reset();
    updateRecordSection.style.display = 'none';
  });

  // Initial fetch of records
  fetchRecords();
});
