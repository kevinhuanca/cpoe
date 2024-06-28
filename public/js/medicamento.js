document.addEventListener('DOMContentLoaded', () => {
   const buscarMedicamento = document.querySelector('#buscarMedicamento');
   const medicamentosContainer = document.getElementById('medicamentosInfo');
   const medicamentos = medicamentosContainer.getElementsByClassName('alert');

   buscarMedicamento.addEventListener('input', () => {
      const query = buscarMedicamento.value.toLowerCase();
      Array.from(medicamentos).forEach(medicamento => {
         const medicamentoName = medicamento.textContent.toLowerCase();
         if (medicamentoName.includes(query)) {
            medicamento.style.display = 'block';
         } else {
            medicamento.style.display = 'none';
         }
      });
   });

   const nombreSelect = document.getElementById('nombreSelect');
   const categoriaSelect = document.getElementById('categoriaSelect');
   const familiaSelect = document.getElementById('familiaSelect');
   const concentracionSelect = document.getElementById('concentracionSelect');
   const formafarmaceuticaSelect = document.getElementById('formafarmaceuticaSelect');
   const presentacionSelect = document.getElementById('presentacionSelect');
   const agregarMedicamentoBtn = document.getElementById('agregarMedicamento');

   function validarCampos() {
      const nombre = nombreSelect.value;
      const categoria = categoriaSelect.value;
      const familia = familiaSelect.value;
      const concentracion = concentracionSelect.value;
      const formafarmaceutica = formafarmaceuticaSelect.value;
      const presentacion = presentacionSelect.value;

      if (nombre !== '0' && categoria !== '0' && familia !== '0' && concentracion !== '0' && formafarmaceutica !== '0' && presentacion !== '0') {
         agregarMedicamentoBtn.disabled = false;
      } else {
         agregarMedicamentoBtn.disabled = true;
      }
   }

   validarCampos();

   nombreSelect.addEventListener('change', validarCampos);
   categoriaSelect.addEventListener('change', validarCampos);
   familiaSelect.addEventListener('change', validarCampos);
   concentracionSelect.addEventListener('change', validarCampos);
   formafarmaceuticaSelect.addEventListener('change', validarCampos);
   presentacionSelect.addEventListener('change', validarCampos);

   agregarMedicamentoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const idNombre = nombreSelect.value;
      const idCategoria = categoriaSelect.value;
      const idFamilia = familiaSelect.value;
      const idConcentracion = concentracionSelect.value;
      const idFormafarmaceutica = formafarmaceuticaSelect.value;
      const idPresentacion = presentacionSelect.value;

      fetch('/medicamentos/agregar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ idNombre, idCategoria, idFamilia, idConcentracion, idFormafarmaceutica, idPresentacion })
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data.message);
            location.reload();
         });
   });

})