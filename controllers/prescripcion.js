import { PrescripcionModel } from "../models/prescripcion.js";
import { ObraSocialModel } from "../models/obrasocial.js";
import { MedicamentoModel } from "../models/medicamento.js";
import { PrestacionModel } from "../models/prestacion.js";
import { ProfesionalModel } from "../models/profesional.js";
import { PacienteModel } from "../models/paciente.js";

export class PrescripcionController {

   static async vista(req, res) { // 🟢
      if (!req.session.logueado) res.redirect('/acceso');
      if (req.session.rol === 1) res.redirect('/pacientes');
      if (req.session.rol === 2) {
         const obrasociales = await ObraSocialModel.obtenerObrasSociales();
         const medicamentos = await MedicamentoModel.obtenerMedicamentos();
         const prestaciones = await PrestacionModel.obtenerPrestaciones();

         medicamentos.sort((a, b) => a.nombre.localeCompare(b.nombre));
         prestaciones.sort((a, b) => a.nombre.localeCompare(b.nombre));
         res.render('prescripcion', { medicamentos, obrasociales, prestaciones, session: req.session });
      }
   }

   static async agregarPrescripcion(req, res) { // 🟢
      const { fecha, vigencia, diagnostico, idPaciente, idPlan, medicamentos, prestaciones } = req.body;
      // console.log(fecha, vigencia, diagnostico, idPaciente, idPlan, medicamentos, prestaciones);
      try {

         // AGREGAR PRESCRIPCION
         const idPrescripcion = await PrescripcionModel.agregarPrescripcion(fecha, vigencia, diagnostico, req.session.idProfesional, idPaciente);
         if (idPrescripcion) {
            if (idPlan) await PrescripcionModel.agregarPrescripcionPlan(idPrescripcion, idPlan);
            if (medicamentos) {
               for (let i = 0; i < medicamentos.length; i++) {
                  await PrescripcionModel.agregarPrescripcionMedicamento(idPrescripcion, medicamentos[i].id, medicamentos[i].comercial, medicamentos[i].dosis, medicamentos[i].duracion);
               }
            }
            if (prestaciones) {
               for (let i = 0; i < prestaciones.length; i++) {
                  await PrescripcionModel.agregarPrescripcionPrestacion(idPrescripcion, prestaciones[i].id, prestaciones[i].lado, prestaciones[i].indicacion, prestaciones[i].justificacion, null);
               }
            }
         }

         // OBJETO PARA GENERAR PDF EN CLIENTE
         let ultimaPrescripcion = {};
         ultimaPrescripcion.id = idPrescripcion;

         const fechaDate = new Date(fecha + 'T03:00:00.000Z');
         const fechaFormateada = fechaDate.toLocaleDateString('es-ES');
         ultimaPrescripcion.fecha = fechaFormateada;

         const vigenciaDate = new Date(vigencia + 'T03:00:00.000Z');
         const vigenciaFormateada = vigenciaDate.toLocaleDateString('es-ES');
         ultimaPrescripcion.vigencia = vigenciaFormateada;

         ultimaPrescripcion.diagnostico = diagnostico;

         const profesional = await ProfesionalModel.obtenerProfesionalPorId(req.session.idProfesional);
         ultimaPrescripcion.profesional = profesional;

         const paciente = await PacienteModel.obtenerPacientePorId(idPaciente);
         ultimaPrescripcion.paciente = paciente;

         if (idPlan) {
            const tablaPlan = await ObraSocialModel.obtenerPlanPorId(idPlan);
            const tablaObraSocial = await ObraSocialModel.obtenerObraSocialPorId(tablaPlan.id_obrasocial);
            ultimaPrescripcion.obrasocial = tablaObraSocial.nombre;
            ultimaPrescripcion.plan = tablaPlan.nombre;
         } else { ultimaPrescripcion.obrasocial = null; }

         if (medicamentos) {
            for (const medicamento of medicamentos) {
               const tablaMedicamento = await MedicamentoModel.obtenerMedicamentoPorId(medicamento.id);
               medicamento.medicamento = `${tablaMedicamento.nombre} ${tablaMedicamento.concentracion} ${tablaMedicamento.formafarmaceutica} x${tablaMedicamento.presentacion}`;
            }
            ultimaPrescripcion.medicamentos = medicamentos;
         } else { ultimaPrescripcion.medicamentos = null; }

         if (prestaciones) {
            for (const prestacion of prestaciones) {
               const tablaPrestacion = await PrestacionModel.obtenerPrestacionPorId(prestacion.id);
               prestacion.prestacion = tablaPrestacion.nombre;
            }
            ultimaPrescripcion.prestaciones = prestaciones;
         } else { ultimaPrescripcion.prestaciones = null; }

         // console.log(ultimaPrescripcion);

         res.send({ message: '¡Prescripción registrada exitosamente!' , ultimaPrescripcion });
         
      } catch (error) {
         console.log('¡ERROR AL AGREGAR PRESCRIPCION! :: ', error);
      }

   }

   static async obtenerPrescripcionesPorPaciente(req, res) { // 🟢
      const { idPaciente } = req.params;
      const prescripciones = await PrescripcionModel.obtenerPrescripcionesPorPaciente(idPaciente);

      let prescripcionesPorPaciente = [];

      if (prescripciones.length > 0) {
         for (const prescripcion of prescripciones) {
            // PRESCRIPCION LISTO
            prescripcion.fecha = prescripcion.fecha.toLocaleDateString('es-ES');
            prescripcion.vigencia = prescripcion.vigencia.toLocaleDateString('es-ES');
            const profesional = await ProfesionalModel.obtenerProfesionalPorId(prescripcion.id_profesional);
            prescripcion.profesional = profesional;
            delete prescripcion.id_profesional;
            const paciente = await PacienteModel.obtenerPacientePorId(prescripcion.id_paciente);
            prescripcion.paciente = paciente;
            delete prescripcion.id_paciente;
            // OBRASOCIAL LISTO
            const plan = await PrescripcionModel.obtenerIdPlanPorPrescripcion(prescripcion.id);
            if (plan) {
               const tablaPlan = await ObraSocialModel.obtenerPlanPorId(plan.id_plan);
               const tablaObraSocial = await ObraSocialModel.obtenerObraSocialPorId(tablaPlan.id_obrasocial);
               prescripcion.obrasocial = tablaObraSocial.nombre;
               prescripcion.plan = tablaPlan.nombre;
            } else { prescripcion.obrasocial = null; }
            // MEDICAMENTOS LISTO
            const medicamentos = await PrescripcionModel.obtenerMedicamentosPorPrescripcion(prescripcion.id);
            if (medicamentos.length > 0) {
               for (const medicamento of medicamentos) {
                  const tablaMedicamento = await MedicamentoModel.obtenerMedicamentoPorId(medicamento.id_medicamento);
                  medicamento.medicamento = `${tablaMedicamento.nombre} ${tablaMedicamento.concentracion} ${tablaMedicamento.formafarmaceutica} x${tablaMedicamento.presentacion}`
                  delete medicamento.id_medicamento;
               }
               prescripcion.medicamentos = medicamentos;
            } else { prescripcion.medicamentos = null; }
            // PRESTACIONES LISTO
            const prestaciones = await PrescripcionModel.obtenerPrestacionesPorPrescripcion(prescripcion.id);
            if (prestaciones.length > 0) {
               for (const prestacion of prestaciones) {
                  const tablaPrestacion = await PrestacionModel.obtenerPrestacionPorId(prestacion.id_prestacion);
                  prestacion.prestacion = tablaPrestacion.nombre;
                  delete prestacion.id_prestacion;
               }
               prescripcion.prestaciones = prestaciones;
            } else { prescripcion.prestaciones = null; }

            prescripcionesPorPaciente.push(prescripcion);
         };
         return res.json(prescripcionesPorPaciente);
      }
      res.status(404).json({ message: 'El paciente no tiene prescripciones registradas' });
   }

}