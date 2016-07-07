var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function () {
  fetch('soylogs', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'meal': 'Darth Vader',
      'notes': 'I find your lack of faith disturbing.'
    })
  }).then(response => {
    if (response.ok) return response.json()
  }).then(data => {
    console.log(data)
    window.location.reload(true)
  });
});

del.addEventListener('click', function() {
  fetch('soylogs', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'meal': 'Darth Vader'
    })
  }).then(function (response) {
    window.location.reload(true)
  });
});