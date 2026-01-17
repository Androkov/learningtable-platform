document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const cursoLiberado = params.get("curso");

  if (!cursoLiberado) {
    return;
  }

  const livros = document.querySelectorAll(".livro");

  livros.forEach((livro) => {
    const cursoLivro = livro.getAttribute("data-curso");

    if (cursoLivro === cursoLiberado) {
      livro.classList.remove("bloqueado");
      livro.classList.add("disponivel");

      const conteudo = livro.querySelector(".livro-conteudo");

      const botaoBloqueado = conteudo.querySelector(".btn-bloqueado");
      if (botaoBloqueado) {
        botaoBloqueado.remove();
      }

      const botaoAcesso = document.createElement("a");
      botaoAcesso.classList.add("btn");
      botaoAcesso.innerText = "Acessar Material";

      // MAPEAMENTO DOS PDFs
      let pdfUrl = "#";

      if (cursoLivro === "sono") {
        pdfUrl =
          "assets/pdfs/o-corpo-quer-dormir-a-mente-nao-deixa.pdf";
      }

      botaoAcesso.setAttribute("href", pdfUrl);
      botaoAcesso.setAttribute("target", "_blank");

      conteudo.appendChild(botaoAcesso);
    }
  });
});
