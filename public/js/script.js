document.addEventListener('DOMContentLoaded', () => {

   /**
    * Script para el manejo de tooltips
    */

   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
   const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

   // Manejador de clics para alternar la visibilidad del tooltip
   tooltipTriggerList.forEach(tooltipElement => {
      tooltipElement.addEventListener('click', function () {
         const tooltipInstance = bootstrap.Tooltip.getInstance(this);
         if (this.hasAttribute('aria-describedby')) {
            tooltipInstance.hide();
         }
      });
   });

   /**
    * Script para el manejo de DataTable
    */

   let options = {
      language: {
         "emptyTable": "No hay datos disponibles en la tabla",
         "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
         "infoEmpty": "Mostrando 0 a 0 de 0 registros",
         "infoFiltered": "(Filtrado de _MAX_ registros en total)",
         "lengthMenu": "_MENU_ registros por página",
         "loadingRecords": "Cargando...",
         "processing": "Procesando...",
         "search": "Buscar:",
         "zeroRecords": "No se encontraron registros coincidentes"
      },
      columnDefs: [
         { className: 'dt-center', targets: '_all' }
      ],
      ordering: true,
      order: []
   }

   new DataTable('#tablaPacientes', options);
   new DataTable('#tablaPrestaciones', options);
   new DataTable('#tablaProfesionales', options);
   new DataTable('#tablaMedicamentos', options);

   /**
    * Script para cambiar contraseña
    */

   const modalClave = new bootstrap.Modal('#modalClave');
   const modalMensaje = new bootstrap.Modal('#modalMensaje');

   const cambiarBtn = document.querySelector('#cambiar');
   cambiarBtn.addEventListener('click', () => {
      modalClave.show();
      document.querySelector('#mensajeError').innerText = '';
      document.querySelector('#actualClave').value = '';
      document.querySelector('#nuevaClave').value = '';
      document.querySelector('#confirmarClave').value = '';
      validarInputsClave();
   })

   const cambiarClaveBtn = document.querySelector('#cambiarClave');
   cambiarClaveBtn.addEventListener('click', () => {
      const mensajeError = document.querySelector('#mensajeError');
      const actual = document.querySelector('#actualClave').value;
      const nueva = document.querySelector('#nuevaClave').value;
      const confirmar = document.querySelector('#confirmarClave').value;

      if (nueva === confirmar) {
         fetch('acceso/cambiarclave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ actual, nueva })
         })
            .then((response) => response.json())
            .then((data) => {
               if (data.message) {
                  modalMensaje.show();
                  modalClave.toggle();
               } else {
                  mensajeError.innerText = 'Clave incorrecta';
               }
            })
      } else {
         mensajeError.innerText = 'Las claves no coinciden';
      }
   })

   document.querySelector('#actualClave').addEventListener('input', validarInputsClave);
   document.querySelector('#nuevaClave').addEventListener('input', validarInputsClave);
   document.querySelector('#confirmarClave').addEventListener('input', validarInputsClave);

   /**
    * Script para mostrar datos
    */

   const modalDatos = new bootstrap.Modal('#modalDatos');
   const modalBodyDatos = document.querySelector('#modalBodyDatos');

   const datos = document.querySelector('#datos');
   if (datos) {
      datos.addEventListener('click', () => {
         modalDatos.show();
         let id = modalBodyDatos.getAttribute('data-id');

         fetch(`/profesionales/${id}`)
            .then((response) => response.json())
            .then((data) => {
               modalBodyDatos.innerHTML = '';
               modalBodyDatos.innerHTML = `
                  <b>DOCUMENTO:</b> ${data.documento} <br>
                  <b>APELLIDO Y NOMBRE:</b> ${data.apellido}, ${data.nombre} <br>
                  <b>DOMICILIO:</b> ${data.domicilio} <br>
                  <b>MATRICULA:</b> ${data.matricula} <br>
                  <b>REFEPS:</b> ${data.refeps} <br>
                  <b>PROFESION:</b> ${data.profesion.nombre} <br>
                  <b>ESPECIALIDAD:</b> ${data.especialidades ? data.especialidades.map(especialidad => especialidad.nombre).join(", ") : "No tiene"}
               `
            })
      })
   }
   
})

function validarInputsClave() {
   const actual = document.querySelector('#actualClave').value;
   const nueva = document.querySelector('#nuevaClave').value;
   const confirmar = document.querySelector('#confirmarClave').value;

   if (actual === '' || nueva === '' || confirmar === '') {
      document.querySelector('#cambiarClave').disabled = true;
   } else {
      document.querySelector('#cambiarClave').disabled = false;
   }
}