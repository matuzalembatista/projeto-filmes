window.addEventListener("load", () => {
  const options = {
      method: 'GET',
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWIzMGNiMjMyNzQ0OWM4NDQ5NmM5MzFlMGM2YWFkZSIsInN1YiI6IjYyYWEyNTQ4OTA3ZjI2MTRmNjEyZDdiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnVpu1fMOIwH5vqYJ1YgQZg4mO63vVWX94D7PDa0sYE'
      }
  };
    
  var language = "pt-br";
  var imagemURL = `https://image.tmdb.org/t/p/w500`;

  fetch(`https://api.themoviedb.org/3/movie/popular?language=${language}&page=1`, options)
      .then(response => response.json())
      .then(filmes => exibirTitulo(filmes.results.slice(0, 10))) // Ajustando para exibir apenas os 10 primeiros filmes
      .catch(err => console.error(err));

  function exibirTitulo(filmes) {
      filmes.forEach(filme => {
          var boxFilme = document.createElement("div");
          var filmeTitulo = document.createElement("h1");
          var filmeData = document.createElement("p");
          var filmeOverview = document.createElement("p"); // Elemento para o resumo
          var filmeCapa = document.createElement("img"); 
          var filmeAvaliacao =  document.createElement("p");
          

          filmeTitulo.textContent = filme.title;
          filmeData.textContent = "Lançamento: " + filme.release_date; 
          filmeOverview.textContent = truncateOverview(filme.overview); // Resumo truncado
          filmeAvaliacao.textContent = "Avaliação: " + filme.vote_average; 

          boxFilme.appendChild(filmeTitulo);
          boxFilme.appendChild(filmeCapa);
          filmeCapa.setAttribute("src", imagemURL + filme.poster_path); 
          boxFilme.appendChild(filmeData);
          boxFilme.appendChild(filmeOverview); // Adicionando o resumo truncado
          boxFilme.appendChild(filmeAvaliacao);

          document.getElementById("boxFilmes").appendChild(boxFilme);
      });
  }

  // Função para diminuir o RESUMO DO FILME
  function truncateOverview(overview) {
      const maxLength = 150;
      if (overview.length > maxLength) {
          return overview.substring(0, maxLength) + '...'; 
      } else {
          return overview; 
      }
  }
});
