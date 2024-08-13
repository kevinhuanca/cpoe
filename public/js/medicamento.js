document.addEventListener('DOMContentLoaded', () => {

   validarCampos();

   document.querySelector('#nombreSelect').addEventListener('change', validarCampos);
   document.querySelector('#categoriaSelect').addEventListener('change', validarCampos);
   document.querySelector('#familiaSelect').addEventListener('change', validarCampos);
   document.querySelector('#concentracionSelect').addEventListener('change', validarCampos);
   document.querySelector('#formafarmaceuticaSelect').addEventListener('change', validarCampos);
   document.querySelector('#presentacionSelect').addEventListener('change', validarCampos);

   const botonesEditar = document.querySelectorAll('#tablaMedicamentos .btnEditar'); // LISTO
   botonesEditar.forEach(boton => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch(`/medicamentos/${id}`)
            .then((response) => response.json())
            .then((medicamento) => {
               document.querySelector('#tituloMedicamento').textContent = 'Editar Medicamento';

               document.querySelector('#nombreSelect').value = medicamento.id_nombre;
               document.querySelector('#categoriaSelect').value = medicamento.id_categoria;
               document.querySelector('#familiaSelect').value = medicamento.id_familia;
               document.querySelector('#concentracionSelect').value = medicamento.id_concentracion;
               document.querySelector('#formafarmaceuticaSelect').value = medicamento.id_formafarmaceutica;
               document.querySelector('#presentacionSelect').value = medicamento.id_presentacion;

               document.querySelector('#agregarMedicamento').classList.add('d-none');
               const editarMedicamentoBtn = document.querySelector('#editarMedicamento');
               editarMedicamentoBtn.classList.remove('d-none');
               editarMedicamentoBtn.setAttribute('data-id', medicamento.id);
               editarMedicamentoBtn.disabled = false;
               document.querySelector('#cancelarMedicamento').classList.remove('d-none');
            });
      });
   })

   const botonesDesactivar = document.querySelectorAll('#tablaMedicamentos .btnDesactivar'); // LISTO
   botonesDesactivar.forEach(boton => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch('/medicamentos/desactivar', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
         })
            .then((response) => response.json())
            .then((data) => {
               if (data.message) {
                  const modalBody = document.querySelector('#mensajeMedicamento');
                  modalBody.textContent = `¡${data.message}!`;
                  const modal = new bootstrap.Modal('#modalMedicamento');
                  modal.show();
               }
            });
      });
   });

   const botonesActivar = document.querySelectorAll('#tablaMedicamentos .btnActivar'); // LISTO
   botonesActivar.forEach(boton => {
      boton.addEventListener('click', () => {
         const id = boton.getAttribute('data-id');
         fetch('/medicamentos/activar', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
         })
            .then((response) => response.json())
            .then((data) => {
               if (data.message) {
                  const modalBody = document.querySelector('#mensajeMedicamento');
                  modalBody.textContent = `¡${data.message}!`;
                  const modal = new bootstrap.Modal('#modalMedicamento');
                  modal.show();
               }
            });
      });
   })

   const agregarMedicamentoBtn = document.querySelector('#agregarMedicamento'); // LISTO
   agregarMedicamentoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const idNombre = document.querySelector('#nombreSelect').value;
      const idCategoria = document.querySelector('#categoriaSelect').value;
      const idFamilia = document.querySelector('#familiaSelect').value;
      const idConcentracion = document.querySelector('#concentracionSelect').value;
      const idFormafarmaceutica = document.querySelector('#formafarmaceuticaSelect').value;
      const idPresentacion = document.querySelector('#presentacionSelect').value;

      fetch('/medicamentos/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion })
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.message) {
               const modalBody = document.querySelector('#mensajeMedicamento');
               modalBody.textContent = `¡${data.message}!`;
               const modal = new bootstrap.Modal('#modalMedicamento');
               modal.show();
            }
         });
   });

   const editarMedicamentoBtn = document.querySelector('#editarMedicamento'); // LISTO
   editarMedicamentoBtn.addEventListener('click', () => {
      const id = editarMedicamentoBtn.getAttribute('data-id');
      const idNombre = document.querySelector('#nombreSelect').value;
      const idCategoria = document.querySelector('#categoriaSelect').value;
      const idFamilia = document.querySelector('#familiaSelect').value;
      const idConcentracion = document.querySelector('#concentracionSelect').value;
      const idFormafarmaceutica = document.querySelector('#formafarmaceuticaSelect').value;
      const idPresentacion = document.querySelector('#presentacionSelect').value;

      fetch('/medicamentos/editar', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ id, idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion })
      })
         .then((response) => response.json())
         .then((data) => {
            if (data.message) {
               const modalBody = document.querySelector('#mensajeMedicamento');
               modalBody.textContent = `¡${data.message}!`;
               const modal = new bootstrap.Modal('#modalMedicamento');
               modal.show();
            }
         });
   });

   const cancelarMedicamentoBtn = document.querySelector('#cancelarMedicamento'); // LISTO
   cancelarMedicamentoBtn.addEventListener('click', () => {
      document.querySelector('#tituloMedicamento').textContent = 'Agregar medicamento';

      const selects = document.querySelectorAll('.form-select');
      selects.forEach(select => {
         select.value = '0';
      });

      document.querySelector('#agregarMedicamento').classList.remove('d-none');
      document.querySelector('#editarMedicamento').classList.add('d-none');
      document.querySelector('#cancelarMedicamento').classList.add('d-none');
   });

   const agregarNombreBtn = document.querySelector('#agregarNombre'); // LISTO
   agregarNombreBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('nombre', 'Ingrese un nombre nuevo');
      botonAgregar.setAttribute('onclick', 'agregarNombre()');
   });

   const agregarConcentracionBtn = document.querySelector('#agregarConcentracion'); // LISTO
   agregarConcentracionBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('concentracion', 'Ingrese una nueva concentracion');
      botonAgregar.setAttribute('onclick', 'agregarConcentracion()');
   })

   const agregarFormaFarmaceuticaBtn = document.querySelector('#agregarFormaFarmaceutica'); // LISTO
   agregarFormaFarmaceuticaBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('formafarmaceutica', 'Ingrese una nueva forma farmaceutica');
      botonAgregar.setAttribute('onclick', 'agregarFormaFarmaceutica()');
   })

   const agregarPresentacionBtn = document.querySelector('#agregarPresentacion'); // LISTO
   agregarPresentacionBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('presentacion', 'Ingrese una nueva presentacion');
      botonAgregar.setAttribute('onclick', 'agregarPresentacion()');
   })

   const agregarCategoriaBtn = document.querySelector('#agregarCategoria'); // LISTO
   agregarCategoriaBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('categoria', 'Ingrese una nueva categoria');
      botonAgregar.setAttribute('onclick', 'agregarCategoria()');
   })

   const agregarFamiliaBtn = document.querySelector('#agregarFamilia'); // LISTO
   agregarFamiliaBtn.addEventListener('click', () => {

      const botonAgregar = document.querySelector('#botonAgregar');
      botonAgregar.disabled = true;

      const modal = new bootstrap.Modal('#modalAgregar');
      modal.show();

      crearInputFloating('familia', 'Ingrese una nueva familia');
      botonAgregar.setAttribute('onclick', 'agregarFamilia()');
   })

})

function validarCampos() { // LISTO
   const nombre = document.querySelector('#nombreSelect').value;
   const categoria = document.querySelector('#categoriaSelect').value;
   const familia = document.querySelector('#familiaSelect').value;
   const concentracion = document.querySelector('#concentracionSelect').value;
   const formafarmaceutica = document.querySelector('#formafarmaceuticaSelect').value;
   const presentacion = document.querySelector('#presentacionSelect').value;

   const agregarMedicamentoBtn = document.querySelector('#agregarMedicamento');
   const editarMedicamentoBtn = document.querySelector('#editarMedicamento');

   if (nombre !== '0' && categoria !== '0' && familia !== '0' && concentracion !== '0' && formafarmaceutica !== '0' && presentacion !== '0') {
      agregarMedicamentoBtn.disabled = false;
      editarMedicamentoBtn.disabled = false;
   } else {
      agregarMedicamentoBtn.disabled = true;
      editarMedicamentoBtn.disabled = true;
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

function agregarNombre() { // LISTO

   if (!esIgual('nombre')) {
      fetch('/medicamentos/nombre/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre: document.querySelector('#nombre').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const nombreSelect = document.querySelector('#nombreSelect');
            const option = document.createElement('option');
            option.value = data.nombre.id;
            option.textContent = data.nombre.nombregenerico;
            nombreSelect.appendChild(option);
            nombreSelect.value = data.nombre.id;
            document.querySelector('#modalAgregar .btn-close').click();
            validarCampos();
         });
   } else {
      document.querySelector('#nombre').classList.add('is-invalid');
   }
}

function agregarConcentracion() { // LISTO

   if (!esIgual('concentracion')) {
      fetch('/medicamentos/concentracion/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre: document.querySelector('#concentracion').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const concentracionSelect = document.querySelector('#concentracionSelect');
            const option = document.createElement('option');
            option.value = data.concentracion.id;
            option.textContent = data.concentracion.nombre;
            concentracionSelect.appendChild(option);
            concentracionSelect.value = data.concentracion.id;
            document.querySelector('#modalAgregar .btn-close').click();
            validarCampos();
         });
   } else {
      document.querySelector('#concentracion').classList.add('is-invalid');
   }
}

function agregarFormaFarmaceutica() { // LISTO

   if (!esIgual('formafarmaceutica')) {
      fetch('/medicamentos/formafarmaceutica/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre: document.querySelector('#formafarmaceutica').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const formafarmaceuticaSelect = document.querySelector('#formafarmaceuticaSelect');
            const option = document.createElement('option');
            option.value = data.formafarmaceutica.id;
            option.textContent = data.formafarmaceutica.nombre;
            formafarmaceuticaSelect.appendChild(option);
            formafarmaceuticaSelect.value = data.formafarmaceutica.id;
            document.querySelector('#modalAgregar .btn-close').click();
            validarCampos();
         });
   } else {
      document.querySelector('#formafarmaceutica').classList.add('is-invalid');
   }
}

function agregarPresentacion() { // LISTO

   if (!esIgual('presentacion')) {
      fetch('/medicamentos/presentacion/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre: document.querySelector('#presentacion').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const presentacionSelect = document.querySelector('#presentacionSelect');
            const option = document.createElement('option');
            option.value = data.presentacion.id;
            option.textContent = data.presentacion.nombre;
            presentacionSelect.appendChild(option);
            presentacionSelect.value = data.presentacion.id;
            document.querySelector('#modalAgregar .btn-close').click();
            validarCampos();
         });
   } else {
      document.querySelector('#presentacion').classList.add('is-invalid');
   }
}

function agregarCategoria() { // LISTO

   if (!esIgual('categoria')) {
      fetch('/medicamentos/categoria/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ nombre: document.querySelector('#categoria').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const categoriaSelect = document.querySelector('#categoriaSelect');
            const option = document.createElement('option');
            option.value = data.categoria.id;
            option.textContent = data.categoria.nombre;
            categoriaSelect.appendChild(option);
            categoriaSelect.value = data.categoria.id;
            document.querySelector('#modalAgregar .btn-close').click();
            validarCampos();
         });
   } else {
      document.querySelector('#categoria').classList.add('is-invalid');
   }
}

function agregarFamilia() { // LISTO

   if (!esIgual('familia')) {
      fetch('/medicamentos/familia/agregar', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ nombre: document.querySelector('#familia').value })
      })
         .then((response) => response.json())
         .then((data) => {
            const familiaSelect = document.querySelector('#familiaSelect');
            const option = document.createElement('option');
            option.value = data.familia.id;
            option.textContent = data.familia.nombre;
            familiaSelect.appendChild(option);
            familiaSelect.value = data.familia.id;
            document.querySelector('#modalAgregar .btn-close').click();
            validarCampos();
         });
   } else {
      document.querySelector('#familia').classList.add('is-invalid');
   }
}

function validarInput(elem) {
   let e = document.querySelector(elem).value.trim();
   const botonAgregar = document.querySelector('#botonAgregar');
   if (e !== '') {
      botonAgregar.disabled = false;
   } else {
      botonAgregar.disabled = true;
   }
}

function esIgual(elemento) {
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