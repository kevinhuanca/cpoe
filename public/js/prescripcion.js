document.addEventListener('DOMContentLoaded', () => {

   // PACIENTE
   const buscarPaciente = document.querySelector('#buscarPaciente');
   buscarPaciente.addEventListener('click', () => {
      const dni = document.querySelector('#pacienteInput').value;

      const hayPaciente = document.querySelector('#hayPaciente');
      if (hayPaciente) hayPaciente.remove();

      document.querySelector('#prescripcionesInfo').innerHTML = '';

      fetch(`/pacientes/${dni}`)
         .then((response) => response.json())
         .then((data) => {

            if (data.message) {
               document.querySelector('#prescripcionesInfo').innerHTML = `
                  <div class="alert alert-danger text-center" role="alert">
                     ${data.message}.
                  </div>
               `;

               const modalBody = document.querySelector('#mensajePaciente');
               modalBody.textContent = `¡${data.message}! ¿Queres agregarlo?`;
               const modal = new bootstrap.Modal('#exampleModal');
               modal.show();
            } else {

               // CREO EL ALERT DE PACIENTE
               const paciente = document.createElement("div");
               paciente.id = "hayPaciente";
               paciente.className = "alert alert-warning";
               paciente.setAttribute("role", "alert");
               paciente.setAttribute('data-id', data.id);
               paciente.style.whiteSpace = 'pre-wrap';
               paciente.textContent = `DNI: ${data.documento} \nAPELLIDO Y NOMBRE: ${data.apellido}, ${data.nombre} \nFECHA DE NACIMIENTO: ${data.nacimiento} \nSEXO: ${data.sexo}`;

               const info = document.querySelector('#pacienteInfo');
               info.appendChild(paciente);

               // PRESCRIPCIONES ANTERIORES
               fetch(`/prescripciones/${data.id}`)
                  .then((response) => response.json())
                  .then((data) => {

                     if (data.message) {
                        document.querySelector('#prescripcionesInfo').innerHTML = `
                           <div class="alert alert-primary text-center" role="alert">
                              ${data.message}.
                           </div>
                        `;
                     } else {
                        console.log(data);
                        for (const d of data) {
                           const prescripcion = document.createElement('div');
                           prescripcion.className = 'alert alert-primary';
                           prescripcion.setAttribute('role', 'alert');

                           const dataPrescripcion = btoa(JSON.stringify(d));

                           let obrasocial = (d.obrasocial !== null) ? 'OBRA SOCIAL: ' + d.obrasocial + ' - ' + d.plan : 'OBRA SOCIAL: No tiene';

                           prescripcion.innerHTML = `
                              FECHA: ${d.fecha} <br>
                              VIGENCIA: ${d.vigencia} <br>
                              DIAGNOSTICO: ${d.diagnostico} <br>
                              ${obrasocial} <br>
                              <div class="d-flex pt-2">
                                 <div class="btn-group me-2">
                                    <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                       MEDICAMENTOS: ${d.medicamentos === null ? 0 : d.medicamentos.length}
                                    </button>
                                    <ul class="dropdown-menu">
                                       ${d.medicamentos === null ? '<li class="dropdown-item">No hay medicamentos</li>' : d.medicamentos.map(m => `<li class="dropdown-item">${m.medicamento}</li>`).join('')}
                                    </ul>
                                 </div>

                                 <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                       PRESTACIONES: ${d.prestaciones === null ? 0 : d.prestaciones.length}
                                    </button>
                                    <ul class="dropdown-menu">
                                       ${d.prestaciones === null ? '<li class="dropdown-item">No hay prestaciones</li>' : d.prestaciones.map(p => `<li class="dropdown-item">${p.prestacion} ${p.lado === null ? '' : '- Zona: ' + p.lado}</li>`).join('')}
                                    </ul>
                                 </div>
                                 
                                 <div class="ms-auto">
                                    <button id="btnPDF" type="button" class="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Generar PDF" data-prescripcion=${dataPrescripcion}><i class="bi bi-filetype-pdf"></i></button>
                                 </div>
                              </div>
                           `;

                           const btnPDF = prescripcion.querySelector('#btnPDF');
                           btnPDF.addEventListener('click', () => {
                              const prescripcionData = btnPDF.getAttribute('data-prescripcion');
                              const prescripcion = JSON.parse(atob(prescripcionData));
                              generarPDF(prescripcion);
                              console.log(prescripcion);
                           });

                           const info = document.querySelector('#prescripcionesInfo');
                           info.appendChild(prescripcion);

                           const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
                           const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
                        }

                     }

                  })
                  .catch((error) => {
                     console.error('Error al obtener Prescripciones:', error);
                  });
            }

         })
         .catch((error) => {
            console.error('Error al obtener Pacientes:', error);
         });
   })

   // OBRASOCIAL
   const obrasocialSelect = document.getElementById('obrasocialSelect')
   obrasocialSelect.addEventListener('change', function () {
      const idObraSocial = this.value;
      const planSelect = document.getElementById('planSelect');

      // limpia el select de especialidades
      if (idObraSocial == 0) {
         planSelect.innerHTML = '<option value="0">No tiene</option>';
         planSelect.disabled = true;
      }
      if (idObraSocial > 0) planSelect.innerHTML = '<option value="0">Selecciona un plan</option>';

      if (idObraSocial) {
         fetch(`/obrasociales/planes/${idObraSocial}`)
            .then(response => response.json())
            .then(data => {
               data.forEach(plan => {
                  const option = document.createElement('option');
                  option.value = plan.id;
                  option.textContent = plan.nombre;
                  planSelect.appendChild(option);
                  planSelect.disabled = false;
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
   filtroInputSelect(medicamentoInput, medicamentos, validarCamposMedicamento);

   const dosis1Input = document.querySelector('#dosis1Input');
   const dosis2Input = document.querySelector('#dosis2Input');
   const duracionInput = document.querySelector('#duracionInput');
   const agregarMedicamentoBtn = document.querySelector('#agregarMedicamento');

   function validarCamposMedicamento() {
      const dosis1 = dosis1Input.value.trim();
      const dosis2 = dosis2Input.value.trim();
      const duracionInp = duracionInput.value.trim();

      const opcionesVisibles = Array.from(medicamentos.options).some(option => option.style.display !== 'none');
      const seleccionadaEsPorDefecto = medicamentos.value === '0';

      if (dosis1 === '' || dosis2 === '' || duracionInp === '' || !opcionesVisibles || seleccionadaEsPorDefecto) {
         agregarMedicamentoBtn.disabled = true;
      } else {
         agregarMedicamentoBtn.disabled = false;
      }
   }
   validarCamposMedicamento(); // llamo a la funcion al cargar la página
   dosis1Input.addEventListener('input', validarCamposMedicamento);
   dosis2Input.addEventListener('input', validarCamposMedicamento);
   duracionInput.addEventListener('input', validarCamposMedicamento);
   medicamentos.addEventListener('change', validarCamposMedicamento);

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
      div.style.whiteSpace = 'pre-wrap';
      if (nombreComercialInput.value !== '') {
         div.setAttribute('data-comercial', nombreComercialInput.value);
         div.textContent = `MEDICAMENTO: ${textoMedicamento} \nNOMBRE COMERCIAL: ${nombreComercialInput.value} \nDOSIS: ${dosis1Input.value} cada ${dosis2Input.value} horas \nDURACION: ${duracionInput.value} ${duracionSelect.value}`;

      } else {
         div.setAttribute('data-comercial', null);
         div.textContent = `MEDICAMENTO: ${textoMedicamento} \nDOSIS: ${dosis1Input.value} cada ${dosis2Input.value} horas \nDURACION: ${duracionInput.value} ${duracionSelect.value}`;
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
   filtroInputSelect(prestacionInput, prestaciones, validarCamposPrestacion);

   const indicacionInput = document.querySelector('#indicacionInput');
   const justificacionInput = document.querySelector('#justificacionInput');
   const agregarPrestacionBtn = document.querySelector('#agregarPrestacion');

   function validarCamposPrestacion() {
      const indicacion = indicacionInput.value.trim();
      const justificacion = justificacionInput.value.trim();

      const opcionesVisibles = Array.from(prestaciones.options).some(option => option.style.display !== 'none');
      const seleccionadaEsPorDefecto = prestaciones.value === '0';

      if (indicacion === '' || justificacion === '' || !opcionesVisibles || seleccionadaEsPorDefecto) {
         agregarPrestacionBtn.disabled = true;
      } else {
         agregarPrestacionBtn.disabled = false;
      }
   }
   validarCamposPrestacion(); // llamo a la funcion al cargar la página
   indicacionInput.addEventListener('input', validarCamposPrestacion);
   justificacionInput.addEventListener('input', validarCamposPrestacion);
   prestaciones.addEventListener('change', validarCamposPrestacion);

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
      div.style.whiteSpace = 'pre-wrap';
      if (ladoInput.value !== '') {
         div.setAttribute('data-lado', ladoInput.value);
         div.textContent = `PRESTACION: ${textoPrestacion} \nLADO/ZONA: ${ladoInput.value} \nINDICACION: ${indicacionInput.value} \nJUSTIFICACION: ${justificacionInput.value}`;
      } else {
         div.setAttribute('data-lado', null);
         div.textContent = `PRESTACION: ${textoPrestacion} \nINDICACION: ${indicacionInput.value} \nJUSTIFICACION: ${justificacionInput.value}`;
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

function filtroInputSelect(input, select, callback) {
   input.addEventListener('input', () => {
      const textoBusqueda = input.value.trim().toLowerCase();

      Array.from(select.options).forEach(option =>
         option.style.display = option.text.toLowerCase().includes(textoBusqueda) ? 'block' : 'none'
      );

      select.style.display = 'block';
      select.selectedIndex = 0;

      const primeraOpcionVisible = Array.from(select.options).find(opt => opt.style.display !== 'none');
      if (primeraOpcionVisible) primeraOpcionVisible.selected = true;

      if (callback) callback(); // Llama al callback después de filtrar
   });

   input.addEventListener('focus', () => select.style.display = 'block');

   document.addEventListener('click', event => {
      if (event.target !== input) Array.from(select.options).forEach(option => option.style.display = 'block');
   });

   select.addEventListener('click', event => event.stopPropagation());
}

function generarPDF(prescripcion) {
   const { jsPDF } = window.jspdf;
   const doc = new jsPDF({
      format: [210, 305],
   });
   const { id, fecha, vigencia, diagnostico, profesional, paciente, obrasocial, medicamentos, prestaciones } = prescripcion;

   // Encabezado de la página
   doc.setFontSize(18);
   doc.setFont('helvetica', 'bold');
   doc.text(`PRESCRIPCION Nº ${id}`, 20, 25);
   doc.setFont('helvetica', 'normal');
   doc.setFontSize(14);
   doc.text(`Fecha: ${fecha}`, 20, 35);
   doc.text(`Vigencia: ${vigencia}`, 20, 42);
   doc.text(`Diagnóstico: ${diagnostico}`, 20, 49);

   // Datos del profesional
   doc.setFont('helvetica', 'bold');
   doc.text(`PROFESIONAL:`, 20, 59);
   doc.setFont('helvetica', 'normal');
   doc.text(`Apellido y Nombre: ${profesional.apellido}, ${profesional.nombre}`, 25, 66);
   doc.text(`Documento: ${profesional.documento}`, 25, 73);
   doc.text(`Matrícula: ${profesional.matricula}`, 25, 80);

   // Datos del paciente
   doc.setFont('helvetica', 'bold');
   doc.text(`PACIENTE:`, 20, 90);
   doc.setFont('helvetica', 'normal');
   doc.text(`Apellido y Nombre: ${paciente.apellido}, ${paciente.nombre}`, 25, 97);
   doc.text(`Documento: ${paciente.documento}`, 25, 104);
   doc.text(`Sexo: ${paciente.sexo}`, 25, 111);

   let y = 121;

   // Datos de la obra social
   doc.setFont('helvetica', 'bold');
   doc.text(`OBRA SOCIAL:`, 20, y);
   doc.setFont('helvetica', 'normal');
   if (obrasocial) {
      doc.text(`${obrasocial} - ${prescripcion.plan}`, 25, y + 7);
   } else {
      doc.text(`No pertenece a una obra social.`, 25, y + 7);
   }
   y += 17;

   // Lista de medicamentos
   doc.setFont('helvetica', 'bold');
   doc.text(`MEDICAMENTOS:`, 20, y);
   doc.setFont('helvetica', 'normal');
   if (medicamentos) {
      for (const medicamento of medicamentos) {
         doc.text(medicamento.medicamento, 25, y + 7);
         doc.text(`Nombre comercial: ${medicamento.comercial ? medicamento.comercial : 'No indicado'}`, 30, y + 14);
         doc.text(`Dosis: ${medicamento.dosis}`, 30, y + 21);
         doc.text(`Duración: ${medicamento.duracion}`, 30, y + 28);
         y += 28
      }
   } else {
      doc.text(`No se indicaron medicamentos.`, 25, y + 7);
      y += 7;
   }
   y += 10;

   // Lista de prestaciones
   doc.setFont('helvetica', 'bold');
   doc.text(`PRESTACIONES:`, 20, y);
   doc.setFont('helvetica', 'normal');
   if (prestaciones) {
      for (const prestacion of prestaciones) {
         doc.text(`${prestacion.prestacion}`, 25, y + 7);
         doc.text(`Lado/Zona: ${prestacion.lado ? prestacion.lado : 'No aplica'}`, 30, y + 14);
         y += 14;
      }
   } else {
      doc.text(`No se indicaron prestaciones.`, 25, y + 7);
      y += 7;
   }

   // Generar PDF
   doc.save('prescripcion.pdf');
}

export { generarPDF };