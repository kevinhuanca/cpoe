document.addEventListener('DOMContentLoaded', () => {
   const buscarProfesional = document.querySelector('#buscarProfesional');
   const profesionalesContainer = document.getElementById('profesionalesInfo');
   const profesionales = profesionalesContainer.getElementsByClassName('alert');

   buscarProfesional.addEventListener('input', () => {
      const query = buscarProfesional.value.toLowerCase();
      Array.from(profesionales).forEach(profesional => {
         const profesionalName = profesional.textContent.toLowerCase();
         if (profesionalName.includes(query)) {
            profesional.style.display = 'block';
         } else {
            profesional.style.display = 'none';
         }
      });
   });

   document.getElementById('profesionSelect').addEventListener('change', function () {
      const profesionId = this.value;
      const especialidadSelect = document.getElementById('especialidadSelect');

      // limpia el select de especialidades
      especialidadSelect.innerHTML = '<option value="0">Selecciona una especialidad</option>';

      if (profesionId) {
         fetch(`/profesionales/especialidades/${profesionId}`)
            .then(response => response.json())
            .then(data => {
               data.forEach(especialidad => {
                  const option = document.createElement('option');
                  option.value = especialidad.id;
                  option.textContent = especialidad.nombre;
                  especialidadSelect.appendChild(option);
               });
            })
            .catch(error => {
               console.error('Error al obtener las especialidades:', error);
            });
      }
   });

   const nombreInput = document.getElementById('nombreInput');
   const apellidoInput = document.getElementById('apellidoInput');
   const documentoInput = document.getElementById('documentoInput');
   const domicilioInput = document.getElementById('domicilioInput');
   const profesionSelect = document.getElementById('profesionSelect');
   const especialidadSelect = document.getElementById('especialidadSelect');
   const matriculaInput = document.getElementById('matriculaInput');
   const refepsInput = document.getElementById('refepsInput');
   const agregarProfesionalBtn = document.getElementById('agregarProfesional');

   function validarCampos() {
      const nombre = nombreInput.value.trim();
      const apellido = apellidoInput.value.trim();
      const documento = documentoInput.value.trim();
      const domicilio = domicilioInput.value.trim();
      const profesion = profesionSelect.value;
      const especialidad = especialidadSelect.value;
      const matricula = matriculaInput.value.trim();
      const refeps = refepsInput.value.trim();

      if (nombre !== '' && apellido !== '' && documento !== '' && domicilio !== '' && profesion !== '0' && especialidad !== '0' && matricula !== '' && refeps !== '') {
         agregarProfesionalBtn.disabled = false;
      } else {
         agregarProfesionalBtn.disabled = true;
      }
   }

   validarCampos(); // llamo a la funcion al cargar la página

   nombreInput.addEventListener('input', validarCampos);
   apellidoInput.addEventListener('input', validarCampos);
   documentoInput.addEventListener('input', validarCampos);
   domicilioInput.addEventListener('input', validarCampos);
   profesionSelect.addEventListener('change', validarCampos);
   especialidadSelect.addEventListener('change', validarCampos);
   matriculaInput.addEventListener('input', validarCampos);
   refepsInput.addEventListener('input', validarCampos);

   agregarProfesionalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nombre = nombreInput.value;
      const apellido = apellidoInput.value;
      const documento = documentoInput.value;
      const domicilio = domicilioInput.value;
      const especialidad = especialidadSelect.value;
      const matricula = matriculaInput.value;
      const refeps = refepsInput.value;

      async function registrarUsuarioYCrearProfesional() {
         try {
            let datosUsuario = {
               nombre: documento,
               clave: documento
            };

            // registra al usuario
            const responseUsuario = await fetch('/acceso/registrar/profesional', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(datosUsuario)
            });

            const dataUsuario = await responseUsuario.json();
            const idUsuario = dataUsuario.idUsuario;

            console.log('ID del usuario registrado : ', idUsuario);

            let datosProfesional = {
               nombre: nombre,
               apellido: apellido,
               documento: documento,
               domicilio: domicilio,
               idEspecialidad: especialidad,
               matricula: matricula,
               refeps: refeps,
               idUsuario: idUsuario
            };

            // crea el profesional
            const responseProfesional = await fetch('/profesionales/agregar', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(datosProfesional)
            });

            const dataProfesional = await responseProfesional.json();
            console.log('dataProfesional:', dataProfesional);
            location.reload();

         } catch (error) {
            console.error('Error al registrar usuario o crear profesional:', error);
         }
      }
      registrarUsuarioYCrearProfesional();
      
   });

})