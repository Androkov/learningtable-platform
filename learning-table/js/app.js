// Detecta curso liberado pela URL
const params = new URLSearchParams(window.location.search);
const curso = params.get("curso");

// Página do produto
if (curso && document.getElementById("pdfFrame")) {
  const titulo = document.getElementById("tituloCurso");
  const pdf = document.getElementById("pdfFrame");

  if (curso === "organizacao") {
    titulo.innerText = "Guia Prático de Organização";
    pdf.src = "https://seusite.com/pdfs/organizacao.pdf";
  } else {
    titulo.innerText = "Conteúdo não encontrado";
  }
}

// Biblioteca - bloquear botão comprar
const bloqueados = document.querySelectorAll(".bloqueado-btn");
bloqueados.forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Conteúdo bloqueado. Clique para comprar!");
  });
});
