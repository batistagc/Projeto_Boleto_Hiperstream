document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        let descontoMaisRecente = null;
        let jurosMaisRecente = null;

        if (data.encargos) {
            const datas = Object.keys(data.encargos).sort();

            datas.forEach(dataStr => {
                const encargo = data.encargos[dataStr];
                if (encargo.tipo === "desconto") {
                    descontoMaisRecente = encargo.valor;
                } else if (encargo.tipo === "juros") {
                    jurosMaisRecente = encargo.valor;
                }
            });

            data.desconto = descontoMaisRecente || "0,00";
            data.juros = jurosMaisRecente || "0,00";
        }

        const templateSource = document.getElementById("boleto-template").innerHTML;
        const template = Handlebars.compile(templateSource);
        const boletoHTML = template(data);

        document.getElementById("conteudo-boleto").innerHTML = boletoHTML;
    } catch (error) {
        console.error("Erro ao carregar os dados do boleto:", error);
    }
});
