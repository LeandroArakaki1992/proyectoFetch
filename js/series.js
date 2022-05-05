let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () =>{
   if(pagina < 1000){
      pagina += 1;
      cargarSeries();
   }
});

btnAnterior.addEventListener('click', () =>{
   if(pagina > 1){
      pagina -= 1;
      cargarSeries();
   }
});

const cargarSeries = async () =>{

   try {
      const respuesta = await fetch (`https://api.themoviedb.org/3/tv/popular?api_key=97044084d1cb7b9a88076bf1d881c02f&language=es-MX&page=${pagina}`);

      console.log(respuesta);

      if (respuesta.status === 200) {
         const datos = await respuesta.json();

         let series = '';
         datos.results.forEach(serie => {
            series +=  `
               <div class="serie">
                  <img class="poster" src="https://image.tmdb.org/t/p/w500/${serie.poster_path}">
               </div>
               
            `;
         });
         
         document.getElementById('contenedor').innerHTML = series;

      } else if(respuesta.status === 401){
         console.log('error');
      } else if(respuesta.status === 404){
         console.log('la pelicula no existe');
      }else{
         console.log('error grave')
      }
      
   } catch(error){
      console.log(error);
   }
}

cargarSeries();