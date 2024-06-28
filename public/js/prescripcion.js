document.addEventListener('DOMContentLoaded', () => {

   // PACIENTE
   const buscarPaciente = document.querySelector('#buscarPaciente');
   buscarPaciente.addEventListener('click', () => {
      const dni = document.querySelector('#pacienteInput').value;

      const e = document.querySelector('#noHayPaciente');
      if (e) e.remove();
      const s = document.querySelector('#hayPaciente');
      if (s) s.remove();

      fetch(`/pacientes/${dni}`)
         .then((response) => response.json())
         .then((data) => {

            if (data.message) {
               const alerta = document.createElement("div");
               alerta.id = "noHayPaciente";
               alerta.className = "alert alert-danger";
               alerta.setAttribute("role", "alert");
               alerta.textContent = data.message;

               const contenedor = document.querySelector('#pacienteInfo');
               contenedor.appendChild(alerta);
            } else {
               const paciente = document.createElement("div");
               paciente.id = "hayPaciente";
               paciente.className = "alert alert-success";
               paciente.setAttribute("role", "alert");
               paciente.setAttribute('data-id', data.id);
               paciente.textContent = `Paciente encontrado:  ${data.documento} | ${data.apellido}, ${data.nombre} | ${data.sexo}`;

               const info = document.querySelector('#pacienteInfo');
               info.appendChild(paciente);
            }

         })
         .catch((error) => {
            console.error('Error al obtener Pacientes:', error);
         });
   })

   // OBRASOCIAL
   document.getElementById('obrasocialSelect').addEventListener('change', function () {
      const idObraSocial = this.value;
      const planSelect = document.getElementById('planSelect');

      // limpia el select de especialidades
      planSelect.innerHTML = '<option value="0">Selecciona un plan</option>';

      if (idObraSocial) {
         fetch(`/obrasociales/planes/${idObraSocial}`)
            .then(response => response.json())
            .then(data => {
               data.forEach(plan => {
                  const option = document.createElement('option');
                  option.value = plan.id;
                  option.textContent = plan.nombre;
                  planSelect.appendChild(option);
               });
            })
            .catch(error => {
               console.error('Error al obtener los planes:', error);
            });
      }
   });

   // MEDICAMENTO
   const medicamentoInput = document.querySelector('#medicamentoInput');
   const medicamentos = document.querySelector('#medicamentos');
   filtroInputSelect(medicamentoInput, medicamentos);

   const dosis1Input = document.querySelector('#dosis1Input');
   const dosis2Input = document.querySelector('#dosis2Input');
   const duracionInput = document.querySelector('#duracionInput');
   const agregarMedicamentoBtn = document.querySelector('#agregarMedicamento');

   function validarCamposMedicamento() {
      const dosis1 = dosis1Input.value.trim();
      const dosis2 = dosis2Input.value.trim();
      const duracionInp = duracionInput.value.trim();

      if (dosis1 === '' || dosis2 === '' || duracionInp === '') {
         agregarMedicamentoBtn.disabled = true;
      } else {
         agregarMedicamentoBtn.disabled = false;
      }
   }
   validarCamposMedicamento(); // llamo a la funcion al cargar la página
   dosis1Input.addEventListener('input', validarCamposMedicamento);
   dosis2Input.addEventListener('input', validarCamposMedicamento);
   duracionInput.addEventListener('input', validarCamposMedicamento);

   agregarMedicamentoBtn.addEventListener('click', () => {
      const medicamentoInfo = document.querySelector('#medicamentoInfo');
      const medicamento = document.querySelector('#medicamentos');

      const idMedicamento = medicamento.value;
      const textoMedicamento = medicamento.options[medicamento.selectedIndex].text;
      const nombreComercialInput = document.querySelector('#nombreComercialInput');
      const dosis1Input = document.querySelector('#dosis1Input');
      const dosis2Input = document.querySelector('#dosis2Input');
      const duracionInput = document.querySelector('#duracionInput');
      const duracionSelect = document.querySelector('#duracionSelect');

      // tengo que agregarle data-dosis data-duracion data-nombrecomercial etc. para recolectarlos
      const div = document.createElement('div');
      div.className = 'alert alert-warning alert-dismissible fade show';
      div.setAttribute('role', 'alert');
      div.setAttribute('data-id', idMedicamento);
      div.setAttribute('data-dosis', `${dosis1Input.value} cada ${dosis2Input.value} horas`);
      div.setAttribute('data-duracion', `${duracionInput.value} ${duracionSelect.value}`);
      if (nombreComercialInput.value !== '') {
         div.setAttribute('data-comercial', nombreComercialInput.value);
         div.textContent = `Medicamento: ${textoMedicamento}. Nombre Comercial: ${nombreComercialInput.value}. Dosis: ${dosis1Input.value} cada ${dosis2Input.value} horas. Duración: ${duracionInput.value} ${duracionSelect.value}`;
      } else {
         div.setAttribute('data-comercial', null);
         div.textContent = `Medicamento: ${textoMedicamento}. Dosis: ${dosis1Input.value} cada ${dosis2Input.value} horas. Duración: ${duracionInput.value} ${duracionSelect.value}`;
      }

      const boton = document.createElement('button');
      boton.className = 'btn-close';
      boton.setAttribute('type', 'button');
      boton.setAttribute('data-bs-dismiss', 'alert');
      div.appendChild(boton);

      medicamentoInfo.appendChild(div);

      // limpiar los inputs
      const medicamentoInput = document.querySelector('#medicamentoInput');
      medicamentoInput.value = '';
      medicamento.value = '0';
      nombreComercialInput.value = '';
      dosis1Input.value = '';
      dosis2Input.value = '';
      duracionInput.value = '';
      duracionSelect.value = 'dias';

      const agregarMedicamentoBtn = document.querySelector('#agregarMedicamento');
      agregarMedicamentoBtn.disabled = true;
   });

   // PRESTACIONES
   const prestacionInput = document.querySelector('#prestacionInput');
   const prestaciones = document.querySelector('#prestaciones');
   filtroInputSelect(prestacionInput, prestaciones);

   const indicacionInput = document.querySelector('#indicacionInput');
   const justificacionInput = document.querySelector('#justificacionInput');
   const agregarPrestacionBtn = document.querySelector('#agregarPrestacion');

   function validarCamposPrestacion() {
      const indicacion = indicacionInput.value.trim();
      const justificacion = justificacionInput.value.trim();

      if (indicacion === '' || justificacion === '') {
         agregarPrestacionBtn.disabled = true;
      } else {
         agregarPrestacionBtn.disabled = false;
      }
   }
   validarCamposPrestacion(); // llamo a la funcion al cargar la página
   indicacionInput.addEventListener('input', validarCamposPrestacion);
   justificacionInput.addEventListener('input', validarCamposPrestacion);

   agregarPrestacionBtn.addEventListener('click', () => {
      const prestacionInfo = document.querySelector('#prestacionInfo');
      const prestacion = document.querySelector('#prestaciones');

      const idPrestacion = prestacion.value;
      const textoPrestacion = prestacion.options[prestacion.selectedIndex].text;
      const ladoInput = document.querySelector('#ladoInput');
      const indicacionInput = document.querySelector('#indicacionInput');
      const justificacionInput = document.querySelector('#justificacionInput');

      const div = document.createElement('div');
      div.className = 'alert alert-warning alert-dismissible fade show';
      div.setAttribute('role', 'alert');
      div.setAttribute('data-id', idPrestacion);
      div.setAttribute('data-indicacion', indicacionInput.value);
      div.setAttribute('data-justificacion', justificacionInput.value);
      if (ladoInput.value !== '') {
         div.setAttribute('data-lado', ladoInput.value);
         div.textContent = `Prestacion: ${textoPrestacion}. Lado: ${ladoInput.value}. Indicación: ${indicacionInput.value}. Justificación: ${justificacionInput.value}`;
      } else {
         div.setAttribute('data-lado', null);
         div.textContent = `Prestacion: ${textoPrestacion}. Indicación: ${indicacionInput.value}. Justificación: ${justificacionInput.value}`;
      }

      const boton = document.createElement('button');
      boton.className = 'btn-close';
      boton.setAttribute('type', 'button');
      boton.setAttribute('data-bs-dismiss', 'alert');
      div.appendChild(boton);

      prestacionInfo.appendChild(div);

      // limpiar los inputs
      const prestacionInput = document.querySelector('#prestacionInput');
      prestacionInput.value = '';
      prestacion.value = '0';
      ladoInput.value = '';
      indicacionInput.value = '';
      justificacionInput.value = '';

      const agregarPrestacionBtn = document.querySelector('#agregarPrestacion');
      agregarPrestacionBtn.disabled = true;
   });

   // PRESCRIPCION
   const pacienteInfo = document.querySelector('#pacienteInfo');
   const medicamentoInfo = document.querySelector('#medicamentoInfo');
   const prestacionInfo = document.querySelector('#prestacionInfo');
   const diagnosticoInput = document.querySelector('#diagnosticoInput');
   const agregarPrescripcionBtn = document.querySelector('#agregarPrescripcion');

   function validarCamposPrescripcion() {
      const diagnostico = diagnosticoInput.value.trim();
      const paciente = pacienteInfo.textContent.trim();
      const medicamento = medicamentoInfo.textContent.trim();
      const prestacion = prestacionInfo.textContent.trim();

      if (diagnostico === '' || paciente === '' || (medicamento === '' && prestacion === '')) {
         agregarPrescripcionBtn.disabled = true;
      } else {
         agregarPrescripcionBtn.disabled = false;
      }
   }

   diagnosticoInput.addEventListener('input', validarCamposPrescripcion);

   const observerPaciente = new MutationObserver(validarCamposPrescripcion);
   observerPaciente.observe(pacienteInfo, { childList: true, subtree: true });

   const observerMedicamento = new MutationObserver(validarCamposPrescripcion);
   observerMedicamento.observe(medicamentoInfo, { childList: true, subtree: true });

   const observerPrestacion = new MutationObserver(validarCamposPrescripcion);
   observerPrestacion.observe(prestacionInfo, { childList: true, subtree: true });

   validarCamposPrescripcion(); // llamo a la funcion al cargar la página

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

function filtroInputSelect(input, select) {
   input.addEventListener('input', () => {
      const textoBusqueda = input.value.trim().toLowerCase();

      Array.from(select.options).forEach(option =>
         option.style.display = option.text.toLowerCase().includes(textoBusqueda) ? 'block' : 'none'
      );

      select.style.display = 'block';
      select.selectedIndex = 0;

      const primeraOpcionVisible = Array.from(select.options).find(opt => opt.style.display !== 'none');
      if (primeraOpcionVisible) primeraOpcionVisible.selected = true;
   });

   input.addEventListener('focus', () => select.style.display = 'block');

   document.addEventListener('click', event => {
      if (event.target !== input) Array.from(select.options).forEach(option => option.style.display = 'block');
   });

   select.addEventListener('click', event => event.stopPropagation());
}