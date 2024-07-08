document.addEventListener('DOMContentLoaded', () => {

   const agregarPrescripcionBtn = document.querySelector('#agregarPrescripcion');

   agregarPrescripcionBtn.addEventListener('click', () => {

      let datosFormulario = {};

      const fechaActual = new Date().toISOString().split('T')[0];
      datosFormulario.fecha = fechaActual;

      const vigencia = document.querySelector('#vigenciaSelect');
      let fecha = new Date();
      fecha.setDate(fecha.getDate() + parseInt(vigencia.value));
      let fechaVigencia = fecha.toISOString().split('T')[0];
      datosFormulario.vigencia = fechaVigencia;

      const diagnostico = document.querySelector('#diagnosticoInput').value;
      datosFormulario.diagnostico = diagnostico;

      const paciente = document.querySelector('#hayPaciente'); // ojo aca, tira error si no hay paciente
      const idPaciente = paciente.getAttribute('data-id');
      datosFormulario.idPaciente = idPaciente;

      const plan = document.querySelector('#planSelect');
      if (plan.value === '0') {
         datosFormulario.idPlan = null;
      } else {
         let idPlan = plan.value;
         datosFormulario.idPlan = idPlan;
      }

      const medicamentoInfo = document.querySelector('#medicamentoInfo').textContent;
      if (medicamentoInfo === '') {
         datosFormulario.medicamentos = null;
      } else {
         const alertDivs = document.querySelectorAll('#medicamentoInfo .alert.alert-warning');
         let medicamentos = [];
         alertDivs.forEach(div => {
            let medicamento = {
               id: div.getAttribute('data-id'),
               dosis: div.getAttribute('data-dosis'),
               duracion: div.getAttribute('data-duracion'),
               comercial: (div.getAttribute('data-comercial') === 'null') ? null : div.getAttribute('data-comercial')
            };
            medicamentos.push(medicamento);
         });
         datosFormulario.medicamentos = medicamentos;
      }

      const prestacionInfo = document.querySelector('#prestacionInfo').textContent;
      if (prestacionInfo === '') {
         datosFormulario.prestaciones = null;
      } else {
         const alertDivs = document.querySelectorAll('#prestacionInfo .alert.alert-warning');
         let prestaciones = [];
         alertDivs.forEach(div => {
            let prestacion = {
               id: div.getAttribute('data-id'),
               lado: (div.getAttribute('data-lado') === 'null') ? null : div.getAttribute('data-lado'),
               indicacion: div.getAttribute('data-indicacion'),
               justificacion: div.getAttribute('data-justificacion')
            };
            prestaciones.push(prestacion);
         });
         datosFormulario.prestaciones = prestaciones;
      }

      console.log(datosFormulario);

      fetch(`/prescripciones/agregar`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(datosFormulario)
      })
         .then(response => response.json())
         .then(data => {
            const modalBody = document.querySelector('.modal-body');
            modalBody.textContent = data.message;
            const modal = new bootstrap.Modal('#staticBackdrop');
            modal.show();
         })
         .catch(error => {
            console.error('Error al agregar la prescripción:', error);
         })


      // fetch(`/prescripciones/pdf`, {
      //    method: 'POST',
      //    headers: {
      //       'Content-Type': 'application/json'
      //    },
      //    body: JSON.stringify(datosFormulario)
      // })
      // .then(response => response.json())
      // .then(data => {
      //    console.log(data);
      // })
      // .catch(error => {
      //    console.error('Error al generar el PDF:', error);
      // })

   })

   const pacienteInfo = document.querySelector('#pacienteInfo').textContent;
   // console.log(agregarPrescripcionBtn);

})