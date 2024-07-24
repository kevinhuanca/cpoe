document.addEventListener('DOMContentLoaded', () => {

   const botonesEditar = document.querySelectorAll('#tablaPrestaciones .btnEditar');
   botonesEditar.forEach((boton) => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch(`/prestaciones/${id}`)
            .then((response) => response.json())
            .then((prestacion) => {
               document.querySelector('#tituloPrestacion').textContent = 'Editar Prestacion';
               const prestacionInput = document.querySelector('#prestacionInput');
               prestacionInput.value = prestacion.nombre;
               prestacionInput.setAttribute('oninput', 'validarInput(\'#prestacionInput\', \'#editarPrestacion\')');
               document.querySelector('#agregarPrestacion').classList.add('d-none');
               const editarPacienteBtn = document.querySelector('#editarPrestacion');
               editarPacienteBtn.classList.remove('d-none');
               editarPacienteBtn.setAttribute('data-id', prestacion.id);
               editarPacienteBtn.disabled = false;
               document.querySelector('#cancelarPrestacion').classList.remove('d-none');
            });
      });
   });

   const botonesDesactivar = document.querySelectorAll('#tablaPrestaciones .btnDesactivar');
   botonesDesactivar.forEach((boton) => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch('/prestaciones/desactivar', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
         })
            .then((response) => response.json())
            .then((data) => {
               if (data.message) {
                  const modalBody = document.querySelector('#mensajePrestacion');
                  modalBody.textContent = `¡${data.message}!`;
                  const modal = new bootstrap.Modal('#modalPrestacion');
                  modal.show();
               }
            });
      });
   });

   const botonesActivar = document.querySelectorAll('#tablaPrestaciones .btnActivar');
   botonesActivar.forEach((boton) => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch('/prestaciones/activar', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
         })
            .then((response) => response.json())
            .then((data) => {
               if (data.message) {
                  const modalBody = document.querySelector('#mensajePrestacion');
                  modalBody.textContent = `¡${data.message}!`;
                  const modal = new bootstrap.Modal('#modalPrestacion');
                  modal.show();
               }
            });
      });
   });
      
   const agregarPrestacionBtn = document.querySelector('#agregarPrestacion');
   agregarPrestacionBtn.addEventListener('click', () => {
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
            if (data.message) {
               const modalBody = document.querySelector('#mensajePrestacion');
               modalBody.textContent = `¡${data.message}!`;
               const modal = new bootstrap.Modal('#modalPrestacion');
               modal.show();
            }
         });
      
   });

   const editarPrestacionBtn = document.querySelector('#editarPrestacion');
   editarPrestacionBtn.addEventListener('click', () => {
      const nombre = document.querySelector('#prestacionInput').value;
      const id = editarPrestacionBtn.getAttribute('data-id');

      fetch('/prestaciones/editar', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ id, nombre })
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.message) {
               const modalBody = document.querySelector('#mensajePrestacion');
               modalBody.textContent = `¡${data.message}!`;
               const modal = new bootstrap.Modal('#modalPrestacion');
               modal.show();
            }
         });
   });

   const cancelarPrestacionBtn = document.querySelector('#cancelarPrestacion');
   cancelarPrestacionBtn.addEventListener('click', () => {
      document.querySelector('#tituloPrestacion').textContent = 'Agregar prestación';
      document.querySelector('#prestacionInput').setAttribute('oninput', 'validarInput(\'#prestacionInput\', \'#agregarPrestacion\')');
      document.querySelector('#prestacionInput').value = '';
      document.querySelector('#agregarPrestacion').classList.remove('d-none');
      document.querySelector('#editarPrestacion').classList.add('d-none');
      document.querySelector('#cancelarPrestacion').classList.add('d-none');
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