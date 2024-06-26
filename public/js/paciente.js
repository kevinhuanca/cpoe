document.addEventListener('DOMContentLoaded', () => {
   const searchInput = document.getElementById('buscarPaciente');
   const pacientesContainer = document.getElementById('pacientesInfo');
   const pacientes = pacientesContainer.getElementsByClassName('alert');

   searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      Array.from(pacientes).forEach(paciente => {
         const pacienteName = paciente.textContent.toLowerCase();
         if (pacienteName.includes(query)) {
            paciente.style.display = 'block';
         } else {
            paciente.style.display = 'none';
         }
      });
   });

   const nombreInput = document.getElementById('nombreInput');
   const apellidoInput = document.getElementById('apellidoInput');
   const documentoInput = document.getElementById('documentoInput');
   const nacimientoInput = document.getElementById('nacimientoInput');
   const agregarPacienteBtn = document.getElementById('agregarPaciente');

   function validarCampos() {
      const nombre = nombreInput.value.trim();
      const apellido = apellidoInput.value.trim();
      const documento = documentoInput.value.trim();
      const nacimiento = nacimientoInput.value.trim();

      if (nombre !== '' && apellido !== '' && documento !== '' && nacimiento !== '') {
         agregarPacienteBtn.disabled = false;
      } else {
         agregarPacienteBtn.disabled = true;
      }
   }

   validarCampos(); // llamo a la funcion al cargar la página

   nombreInput.addEventListener('input', validarCampos);
   apellidoInput.addEventListener('input', validarCampos);
   documentoInput.addEventListener('input', validarCampos);
   nacimientoInput.addEventListener('input', validarCampos);

   agregarPacienteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nombre = nombreInput.value;
      const apellido = apellidoInput.value;
      const documento = documentoInput.value;
      const nacimiento = nacimientoInput.value;
      const sexo = document.querySelector('#sexoSelect').value;

      fetch('/pacientes/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre, apellido, documento, nacimiento, sexo })
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data.message);
            location.reload();
         });

   });
   
})
