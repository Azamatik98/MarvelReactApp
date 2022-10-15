class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=4aef6ec5e4b94d0a9bd7fd1ab3ac1657";
  _baseOffset = 210;

  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Cloud not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const result = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return result.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const result = await this.getResource(
      `${this._apiBase}characters/${id}?&${this._apiKey}`
    );
    return this._transformCharacter(result.data.results[0]);
  };

  // получение данных из API
  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
