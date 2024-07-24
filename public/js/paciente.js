document.addEventListener('DOMContentLoaded', () => {

   const botonesEditar = document.querySelectorAll('#tablaPacientes .btnEditar');
   botonesEditar.forEach(boton => {
      boton.addEventListener('click', () => {
         const documento = boton.getAttribute('data-id');

         fetch(`/pacientes/${documento}`)
            .then((response) => response.json())
            .then((paciente) => {
               console.log(paciente);
               document.querySelector('#tituloPaciente').textContent = 'Editar Paciente';

               document.querySelector('#nombreInput').value = paciente.nombre;
               document.querySelector('#apellidoInput').value = paciente.apellido;
               document.querySelector('#documentoInput').value = paciente.documento;
               let partesFecha = paciente.nacimiento.split('/');
               let dia = parseInt(partesFecha[0], 10);
               let mes = parseInt(partesFecha[1], 10) - 1;
               let anio = parseInt(partesFecha[2], 10);
               let fechaJS = new Date(anio, mes, dia);
               let fechaISO = fechaJS.toISOString().split('T')[0];
               document.querySelector('#nacimientoInput').value = fechaISO;
               document.querySelector('#sexoSelect').value = paciente.sexo;

               const editarPacienteBtn = document.querySelector('#editarPaciente');
               editarPacienteBtn.classList.remove('d-none');
               editarPacienteBtn.setAttribute('data-id', paciente.id);
               editarPacienteBtn.disabled = false;
               const cancelarPacienteBtn = document.querySelector('#cancelarPaciente');
               cancelarPacienteBtn.classList.remove('d-none');
               document.querySelector('#agregarPaciente').classList.add('d-none');
            });

      });
      
   });

   const nombreInput = document.getElementById('nombreInput');
   const apellidoInput = document.getElementById('apellidoInput');
   const documentoInput = document.getElementById('documentoInput');
   const nacimientoInput = document.getElementById('nacimientoInput');
   const agregarPacienteBtn = document.getElementById('agregarPaciente');
   const editarPacienteBtn = document.querySelector('#editarPaciente');

   const hoy = new Date().toISOString().split('T')[0];
   nacimientoInput.setAttribute('max', hoy); // seteo fecha maxima

   function validarCampos() {
      const nombre = nombreInput.value.trim();
      const apellido = apellidoInput.value.trim();
      const documento = documentoInput.value.trim();
      const nacimiento = nacimientoInput.value.trim();

      if (nombre !== '' && apellido !== '' && documento !== '' && nacimiento !== '') {
         agregarPacienteBtn.disabled = false;
         editarPacienteBtn.disabled = false;
      } else {
         agregarPacienteBtn.disabled = true;
         editarPacienteBtn.disabled = true;
      }
   }

   validarCampos(); // llamo a la funcion al cargar la página

   nombreInput.addEventListener('input', validarCampos);
   apellidoInput.addEventListener('input', validarCampos);
   documentoInput.addEventListener('input', validarCampos);
   nacimientoInput.addEventListener('input', validarCampos);

   agregarPacienteBtn.addEventListener('click', () => {
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
            if (data.message) {
               const modalBody = document.querySelector('#mensajeEditarPaciente');
               modalBody.textContent = `¡${data.message}!`;
               const modal = new bootstrap.Modal('#modalEditarPaciente');
               modal.show();
            }
         });

   });

   editarPacienteBtn.addEventListener('click', () => {
      const nombre = nombreInput.value;
      const apellido = apellidoInput.value;
      const documento = documentoInput.value;
      const nacimiento = nacimientoInput.value;
      const sexo = document.querySelector('#sexoSelect').value;

      let id = editarPacienteBtn.getAttribute('data-id');

      fetch(`/pacientes/editar/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre, apellido, documento, nacimiento, sexo })
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.message) {
               const modalBody = document.querySelector('#mensajeEditarPaciente');
               modalBody.textContent = `¡${data.message}!`;
               const modal = new bootstrap.Modal('#modalEditarPaciente');
               modal.show();
            }
         });
   });

   const cancelarPacienteBtn = document.querySelector('#cancelarPaciente');
   cancelarPacienteBtn.addEventListener('click', () => {
      document.querySelector('#tituloPaciente').textContent = 'Agregar paciente';
      document.querySelector('#nombreInput').value = '';
      document.querySelector('#apellidoInput').value = '';
      document.querySelector('#documentoInput').value = '';
      document.querySelector('#nacimientoInput').value = '';
      document.querySelector('#sexoSelect').value = 'Masculino';
      document.querySelector('#agregarPaciente').classList.remove('d-none');
      document.querySelector('#editarPaciente').classList.add('d-none');
      document.querySelector('#cancelarPaciente').classList.add('d-none');
   });
   
})
