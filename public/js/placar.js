$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Marcelino"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    
    linha.fadeOut(1000);
    setTimeout(() => {
        linha.remove();  
    }, 1000);
}

function mostraPlacar(){
    // $(".placar").show();
    // $(".placar").hide();
    // $(".placar").toggle();
    // $(".placar").slideDown(600);
    // $(".placar").slideUp(600);
    $(".placar").stop().slideToggle(300);

    // .stop(): Essa função faz exatamente o que precisamos, 
    // a animação que estiver acontecendo no momento é interrompida, 
    // e uma próxima é iniciada
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            palavras: palavras
        };

        placar.push(score);
    })

    var dados = {
        placar: placar
    };
    
    $.post("http://localhost:3000/placar", dados, function() { 
        console.log("salvou placar no servidor")
     })
};
