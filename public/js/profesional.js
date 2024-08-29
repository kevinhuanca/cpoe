document.addEventListener('DOMContentLoaded', () => {

   validarCampos(); // llamo a la funcion al cargar la página

   document.querySelector('#nombreInput').addEventListener('input', validarCampos);
   document.querySelector('#apellidoInput').addEventListener('input', validarCampos);
   document.querySelector('#documentoInput').addEventListener('input', validarCampos);
   document.querySelector('#domicilioInput').addEventListener('input', validarCampos);
   document.querySelector('#profesionSelect').addEventListener('change', validarCampos);
   document.querySelector('#matriculaInput').addEventListener('input', validarCampos);
   document.querySelector('#refepsInput').addEventListener('input', validarCampos);

   const botonesEditar = document.querySelectorAll('#tablaProfesionales .btnEditar'); // LISTO
   botonesEditar.forEach(boton => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch(`/profesionales/${id}`)
            .then((response) => response.json())
            .then((profesional) => {
               // console.log(profesional);
               document.querySelector('#tituloProfesional').textContent = 'Editar Profesional';

               document.querySelector('#nombreInput').value = profesional.nombre;
               document.querySelector('#apellidoInput').value = profesional.apellido;
               document.querySelector('#documentoInput').value = profesional.documento;
               document.querySelector('#domicilioInput').value = profesional.domicilio;
               document.querySelector('#profesionSelect').value = profesional.profesion.id;
               desmarcarCheckboxes();
               marcarCheckboxes(profesional)
               document.querySelector('#matriculaInput').value = profesional.matricula;
               document.querySelector('#refepsInput').value = profesional.refeps;
               document.querySelector('#info').classList.add('d-none');

               const editarProfesionalBtn = document.querySelector('#editarProfesional');
               editarProfesionalBtn.classList.remove('d-none');
               editarProfesionalBtn.setAttribute('data-id', profesional.id);
               editarProfesionalBtn.disabled = false;
               document.querySelector('#cancelarProfesional').classList.remove('d-none');
               document.querySelector('#agregarProfesional').classList.add('d-none');
            });
      });
   });

   const botonesDesactivar = document.querySelectorAll('#tablaProfesionales .btnDesactivar'); // LISTO
   botonesDesactivar.forEach(boton => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch('/profesionales/desactivar', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
         })
            .then((response) => response.json())
            .then((data) => {
               if (data.message) {
                  const modalBody = document.querySelector('#mensajeProfesional');
                  modalBody.textContent = `¡${data.message}!`;
                  const modal = new bootstrap.Modal('#modalProfesional');
                  modal.show();
               }
            });
      });
   });

   const botonesActivar = document.querySelectorAll('#tablaProfesionales .btnActivar'); // LISTO
   botonesActivar.forEach(boton => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch('/profesionales/activar', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
         })
            .then((response) => response.json())
            .then((data) => {
               if (data.message) {
                  const modalBody = document.querySelector('#mensajeProfesional');
                  modalBody.textContent = `¡${data.message}!`;
                  const modal = new bootstrap.Modal('#modalProfesional');
                  modal.show();
               }
            });
      });
   });

   const agregarProfesionalBtn = document.querySelector('#agregarProfesional'); // LISTO
   agregarProfesionalBtn.addEventListener('click', () => {
      const nombre = document.querySelector('#nombreInput').value;
      const apellido = document.querySelector('#apellidoInput').value;
      const documento = document.querySelector('#documentoInput').value;
      const domicilio = document.querySelector('#domicilioInput').value;
      const idProfesion = document.querySelector('#profesionSelect').value;
      const idEspecialidades = extraerValoresCheckbox();
      const matricula = document.querySelector('#matriculaInput').value;
      const refeps = document.querySelector('#refepsInput').value;

      console.log(idEspecialidades);

      async function registrarUsuarioYCrearProfesional() {
         try {
            const responseUsuario = await fetch('/acceso/registrar/profesional', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({ nombre: documento, clave: documento })
            });

            const dataUsuario = await responseUsuario.json();
            const idUsuario = dataUsuario.idUsuario;

            let datosProfesional = {
               nombre: nombre,
               apellido: apellido,
               documento: documento,
               domicilio: domicilio,
               idProfesion: idProfesion,
               idEspecialidades: idEspecialidades,
               matricula: matricula,
               refeps: refeps,
               idUsuario: idUsuario
            };

            const responseProfesional = await fetch('/profesionales/agregar', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(datosProfesional)
            });

            const dataProfesional = await responseProfesional.json();
            if (dataProfesional.message) {
               const modalBody = document.querySelector('#mensajeProfesional');
               modalBody.textContent = `¡${dataProfesional.message}!`;
               const modal = new bootstrap.Modal('#modalProfesional');
               modal.show();
            }

         } catch (error) {
            console.error('Error al registrar usuario o crear profesional :: ', error);
         }
      }
      registrarUsuarioYCrearProfesional();
   });

   const editarProfesionalBtn = document.querySelector('#editarProfesional'); // LISTO
   editarProfesionalBtn.addEventListener('click', () => {

      const datosProfesional = {
         id: editarProfesionalBtn.getAttribute('data-id'),
         nombre: document.querySelector('#nombreInput').value,
         apellido: document.querySelector('#apellidoInput').value,
         documento: document.querySelector('#documentoInput').value,
         domicilio: document.querySelector('#domicilioInput').value,
         idProfesion: document.querySelector('#profesionSelect').value,
         idEspecialidades: extraerValoresCheckbox(),
         matricula: document.querySelector('#matriculaInput').value,
         refeps: document.querySelector('#refepsInput').value
      };

      console.log('datosProfesional :: ', datosProfesional);

      fetch('/profesionales/editar', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(datosProfesional)
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.message) {
               const modalBody = document.querySelector('#mensajeProfesional');
               modalBody.textContent = `¡${data.message}!`;
               const modal = new bootstrap.Modal('#modalProfesional');
               modal.show();
            }
         })
         .catch((error) => {
            console.error('Error al editar profesional :: ', error);
         });

   });

   const cancelarProfesionalBtn = document.querySelector('#cancelarProfesional'); // LISTO
   cancelarProfesionalBtn.addEventListener('click', () => {
      document.querySelector('#tituloProfesional').textContent = 'Agregar profesional';

      document.querySelector('#nombreInput').value = '';
      document.querySelector('#apellidoInput').value = '';
      document.querySelector('#documentoInput').value = '';
      document.querySelector('#domicilioInput').value = '';
      document.querySelector('#profesionSelect').value = '0';
      desmarcarCheckboxes();
      document.querySelector('#matriculaInput').value = '';
      document.querySelector('#refepsInput').value = '';

      document.querySelector('#info').classList.remove('d-none');
      
      document.querySelector('#agregarProfesional').classList.remove('d-none');
      document.querySelector('#editarProfesional').classList.add('d-none');
      document.querySelector('#cancelarProfesional').classList.add('d-none');
   });

   const agregarProfesionBtn = document.querySelector('#agregarProfesion'); // LISTO
   agregarProfesionBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('profesion', 'Ingrese una nueva profesion');
      botonAgregar.setAttribute('onclick', 'agregarProfesion()');
   });

   const agregarEspecialidadBtn = document.querySelector('#agregarEspecialidad'); // LISTO
   agregarEspecialidadBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('especialidad', 'Ingrese una nueva especialidad');
      botonAgregar.setAttribute('onclick', 'agregarEspecialidad()');
   });

})

function validarCampos() {
   const nombre = document.querySelector('#nombreInput').value.trim();
   const apellido = document.querySelector('#apellidoInput').value.trim();
   const documento = document.querySelector('#documentoInput').value.trim();
   const domicilio = document.querySelector('#domicilioInput').value.trim();
   const profesion = document.querySelector('#profesionSelect').value;
   const matricula = document.querySelector('#matriculaInput').value.trim();
   const refeps = document.querySelector('#refepsInput').value.trim();

   const agregarProfesionalBtn = document.querySelector('#agregarProfesional');
   const editarProfesionalBtn = document.querySelector('#editarProfesional');

   if (nombre !== '' && apellido !== '' && documento !== '' && domicilio !== '' && profesion !== '0' && matricula !== '' && refeps !== '') {
      agregarProfesionalBtn.disabled = false;
      editarProfesionalBtn.disabled = false;
   } else {
      agregarProfesionalBtn.disabled = true;
      editarProfesionalBtn.disabled = true;
   }
}

function extraerValoresCheckbox() {
   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   const valoresSeleccionados = [];
   checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
         valoresSeleccionados.push(checkbox.value);
      }
   });
   if (valoresSeleccionados.length === 0) return null;
   return valoresSeleccionados;
}

function desmarcarCheckboxes() {
   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
   });
}

function marcarCheckboxes(profesional) {
   if (profesional.especialidades) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
         const especialidadId = parseInt(checkbox.value);
         const estaSeleccionada = profesional.especialidades.some(especialidad => especialidad.id === especialidadId);
         checkbox.checked = estaSeleccionada;
      });
   }
}

function crearInputFloating(id, texto) { // LISTO
   const modalBody = document.querySelector('#modalBody');
   modalBody.innerHTML = '';
   const formFloating = document.createElement('div');
   formFloating.classList.add('form-floating');

   const input = document.createElement('input');
   input.id = id;
   input.className = 'form-control';
   input.type = 'text';
   input.placeholder = texto;
   input.required = true;
   input.setAttribute('oninput', 'validarInput(\'#' + id + '\')');

   const label = document.createElement('label');
   label.className = 'floatingInput';
   label.textContent = texto;

   const validation = document.createElement('div');
   validation.className = 'invalid-feedback';
   validation.textContent = 'Ya existe, ingrese otro.';

   formFloating.appendChild(input);
   formFloating.appendChild(label);
   formFloating.appendChild(validation);
   modalBody.appendChild(formFloating);
}

function validarInput(elem) { // LISTO
   let e = document.querySelector(elem).value.trim();
   const botonAgregar = document.querySelector('#botonAgregar');
   if (e !== '') {
      botonAgregar.disabled = false;
   } else {
      botonAgregar.disabled = true;
   }
}

function esIgual(elemento) { // LISTO
   const options = document.querySelector('#' + elemento + 'Select').options;
   const inputText = document.querySelector('#' + elemento).value.toLowerCase();

   let esIgual = false;
   for (let i = 0; i < options.length; i++) {
      if (inputText === options[i].text.toLowerCase()) {
         esIgual = true;
         break;
      }
   }

   return esIgual;
}

function agregarProfesion() { // LISTO
   
   if (!esIgual('profesion')) {
      fetch('profesionales/profesion/agregar', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ nombre: document.querySelector('#profesion').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const profesionSelect = document.querySelector('#profesionSelect');
            const option = document.createElement('option');
            option.value = data.profesion.id;
            option.textContent = data.profesion.nombre;
            profesionSelect.appendChild(option);
            profesionSelect.value = data.profesion.id;
            document.querySelector('#modalAgregar .btn-close').click();
            validarCampos();
         });
      // console.log('es unico, bien');
   } else {
      document.querySelector('#profesion').classList.add('is-invalid');
      // console.log('hay uno igual');
   }
}

function agregarEspecialidad() { // LISTO

   const checkboxes = document.querySelectorAll('.form-check-label');
   const inputText = document.querySelector('#especialidad').value.toLowerCase();
   
   let esIgual = false;
   for (let i = 0; i < checkboxes.length; i++) {
      if (inputText === checkboxes[i].textContent.toLowerCase()) {
         esIgual = true;
         break;
      }
   }

   if (!esIgual) {
      fetch('profesionales/especialidad/agregar', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ nombre: document.querySelector('#especialidad').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const especialidadColumn = document.querySelector('#especialidadColumn');
            const div = document.createElement('div');
            div.classList.add('form-check');
            div.classList.add('bg-body-tertiary');
            div.innerHTML = `
               <input class="form-check-input" type="checkbox" value="${data.especialidad.id}" checked>
               <label class="form-check-label">${data.especialidad.nombre}</label>
            `;
            especialidadColumn.appendChild(div);
            document.querySelector('#modalAgregar .btn-close').click();
         });
      // console.log('es unico, bien');
   } else {
      document.querySelector('#especialidad').classList.add('is-invalid');
      // console.log('hay uno igual');
   }
}