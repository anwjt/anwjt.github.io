// app.js
document.addEventListener('DOMContentLoaded', () => {
  const addItemForm = document.getElementById('addItemForm');
  const itemNameInput = document.getElementById('itemName');

  addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const itemName = itemNameInput.value.trim();

    if (itemName !== '') {
      // Add a new document with a generated ID to the "items" collection
      firestore.collection("items").add({
          name: itemName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          // Optionally, clear the form inputs after successful save
          itemNameInput.value = '';
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    } else {
      alert('Please enter an item name.');
    }
  });
});

