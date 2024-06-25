import bcrypt from 'bcrypt';
import { UsuarioModel } from "../models/usuario.js";

export class UsuarioController {

   static async vista(req, res) { // 🟢
      if (req.session.rol === 1) res.redirect('/pacientes');
      if (req.session.rol === 2) res.redirect('/prescripciones');
      if (!req.session.logueado) res.render('acceso');
   }

   static async registrarProfesional(req, res) { // 🟢
      const { nombre, clave } = req.body;
      const claveHasheada = await bcrypt.hash(clave, 10);
      const usuario = await UsuarioModel.registrarUsuario(nombre, claveHasheada, 2);
      if (usuario) return res.json({ message: 'Usuario registrado exitosamente' });
      res.status(500).json({ message: 'Error al registrar el usuario' });
   }

   static async registrarAdministrador(req, res) { // 🟢
      const { nombre, clave } = req.body;
      const claveHasheada = await bcrypt.hash(clave, 10);
      const usuario = await UsuarioModel.registrarUsuario(nombre, claveHasheada, 1);
      if (usuario) return res.json({ message: 'Usuario registrado exitosamente' });
      res.status(500).json({ message: 'Error al registrar el usuario' });
   }

   static async entrar(req, res) {
      const { nombre, clave } = req.body;
      // console.log(nombre, clave);

      const usuario = await UsuarioModel.obtenerUsuarioPorNombre(nombre);
      if (!usuario) return res.send({ message: 'Usuario o contraseña incorrecta' });
      if (await bcrypt.compare(clave, usuario.clave)) {
         req.session.usuario = nombre;
         req.session.logueado = true;
         // buscar el id del profesional o administrador, y guardarlo en el req.session

         if (usuario.id_rol === 1) req.session.rol = 1;
         if (usuario.id_rol === 2) req.session.rol = 2;

         res.send({ message: 'Entrando...', rol: req.session.rol });

         // console.log(req.session);

      } else {
         res.send({ message: 'Usuario o contraseña incorrecta' });
      }

   }

   static async salir(req, res) { // 🟢
      console.log(req.session);
      req.session.destroy((err) => {
         if (err) {
            return res.status(500).send('Ocurrió un error al cerrar la sesión');
         }
         res.clearCookie('connect.sid');
         res.redirect('/acceso');
      });
      console.log(req.session);
   }

}