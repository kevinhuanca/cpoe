document.addEventListener('DOMContentLoaded', () => {
   const searchInput = document.getElementById('buscarPrestacion');
   const prestacionesContainer = document.getElementById('prestacionesInfo');
   const prestaciones = prestacionesContainer.getElementsByClassName('alert');

   searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      Array.from(prestaciones).forEach(prestacion => {
         const prestacionName = prestacion.textContent.toLowerCase();
         if (prestacionName.includes(query)) {
            prestacion.style.display = 'block';
         } else {
            prestacion.style.display = 'none';
         }
      });
   });

   
   const btnAgregar = document.querySelector('#agregarPrestacion');

   btnAgregar.addEventListener('click', (e) => {
      e.preventDefault();
      const nombre = document.querySelector('#prestacionInput').value;

      fetch('/prestaciones/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre })
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data.message);
            location.reload();
         });
      
   });

});

function validarInput(inputId, botonId) {
   const input = document.querySelector(inputId);
   const boton = document.querySelector(botonId);

   if (input.value.trim() === '') {
      boton.disabled = true;
   } else {
      boton.disabled = false;
   }
}