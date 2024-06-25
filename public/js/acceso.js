window.addEventListener('DOMContentLoaded', (event) => {
   const btnIngresar = document.querySelector('#ingresar');

btnIngresar.addEventListener('click', (e) => {

   e.preventDefault();

   const mensaje = document.querySelector('#mensaje');
   const nombre = document.querySelector('#usuario').value;
   const clave = document.querySelector('#clave').value;

   fetch('/acceso/entrar', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, clave })
   })
      .then((response) => response.json())
      .then((data) => {
         
         if (data.rol) {
            mensaje.textContent = data.message;
            mensaje.style.color = 'green';
            setTimeout(() => {
               data.rol == 1 ? window.location.href = '/pacientes' : window.location.href = '/prescripciones';
            }, 1000);
         } else {
            mensaje.textContent = 'Usuario o contraseña incorrecta';
            mensaje.style.color = 'red';
         }
      })
      .catch((error) => {
         console.error('Error acceso/entrar :', error);
      });
      
})

})