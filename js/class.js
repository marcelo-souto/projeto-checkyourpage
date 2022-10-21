// Objeto Code
export class Code {
  constructor(html, css) {
    this.html = html;
    this.css = css;
    this.semanticTags = this.getSemanticTags();
    this.acessibilityAttributes = this.getAcessibilityAttributes();
    this.metaTags = this.getMetaTags();
    this.mediaQueries = this.getMediaQueries();
  }
  // Remove espaços e quebras de linha
  _removeSpaces(code) {
    let data = code;
    data = data.replace(/\r\n|\n|\r/gm, "");
    data = data.replace(/(\s){2,}/g, " ");
    return data;
  }

  // Pega as tags contidas no html
  getTags() {
    let data = this._removeSpaces(this.html);
    const regex = /<[^\/].*?>/gi;
    return (data = data.match(regex));
  }

  getMediaQueries() {
    let data = this._removeSpaces(this.css);
    const regex = /@.*?\{+?.*?\}+?/gi;
    data = data.match(regex);

    if (!data) {
      return false;
    } else {
      return data;
    }
  }

  // Pegar tags semanticas
  getSemanticTags() {
    const tags = this.getTags();
    const semanticTags =
      /<(article|aside|details|figcaption|figure|footer|header|main|mark|nav|section|summary|time)/g;
    if (tags) {
      const filteredArr = tags.filter((tag) => {
        return semanticTags.test(tag);
      });

      if (!filteredArr.length) {
        return false;
      } else {
        return filteredArr;
      }
    }
  }

  // Pegar atributos de acessibilidade
  getAcessibilityAttributes() {
    const tags = this.getTags();
    const acessibilityAttributes = /aria|role/g;
    if (tags) {
      const filteredArr = tags.filter((tag) => {
        return acessibilityAttributes.test(tag);
      });

      if (!filteredArr.length) {
        return false;
      } else {
        return filteredArr;
      }
    }
  }

  // Pegar as meta tags
  getMetaTags() {
    const tags = this.getTags();
    const metaTags = /<(meta.*?name="viewport")|(meta.*?name="description")/;
    if (tags) {
      const filteredArr = tags.filter((tag) => {
        return metaTags.test(tag);
      });

      if (!filteredArr.length) {
        return false;
      } else {
        return filteredArr;
      }
    }
  }

  // Classifica o código e devolve uma array com objetos contendo nota, tags e o requisito
  classifyCode() {
    let result = [
      this.semanticTags,
      this.acessibilityAttributes,
      this.metaTags,
      this.mediaQueries,
    ];

    let objs = [];

    for (let indice = 0; indice < result.length; indice++) {
      let score = 0;
      let requisite = "";

      let length = result[indice].length;
      switch (indice) {
        // Tags Semanticas
        case 0:
          if (length < 1) { // Se for 0
            score += 0;
          } else if (length <= 2) { // Se for menor ou igual a 2
            score += 1;
          } else if (length > 2) { // Se for maior que 2
            score += 2.5;
          }
          requisite = "Tags Semanticas";
          break;

        // Atributos de Acessibilidade
        case 1:
          if (length < 1) { // Se for 0
            score += 0;
          } else if (length <= 2) { // Se for menor ou igual a 2
            score += 1;
          } else if (length > 2) { // Se for maior que 2
            score += 2.5;
          }
          requisite = "Atributos de Acessibilidade";
          break;

        // Meta tags
        case 2:
          if (length < 1) { // Se for 0
            score += 0;
          } else if (length == 1) { // Se for igual 1
            score += 1;
          } else if (length > 1) { // Se for maior que 1
            score += 2.5
          }
          requisite = "Meta Tags";
          break;

        // Media queries
        case 3:
          if (length < 1) { // Se for 0
            score += 0;
          } else if (length <= 2) { // Se for menor ou igual a 2
            score += 1;
          } else if (length > 2) { // Se for maior que 2
            score += 2.5;
          }
          requisite = "Media Queries";
          break;
      }

      objs.push({ requisito: requisite, nota: score, tags: result[indice] });
    }

    return objs;
  }
}
