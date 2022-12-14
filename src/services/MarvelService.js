import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=4aef6ec5e4b94d0a9bd7fd1ab3ac1657";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const result = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return result.data.results.map(_transformCharacter);
  };

  // Вариант модификации готового метода для поиска по имени.
  // Вызывать его можно вот так: getAllCharacters(null, name)

  // const getAllCharacters = async (offset = _baseOffset, name = '') => {
  //     const res = await request(`${_apiBase}characters?limit=9&offset=${offset}${name ? `&name=${name}` : '' }&${_apiKey}`);
  //     return res.data.results.map(_transformCharacter);
  // }

  // Или можно создать отдельный метод для поиска по имени

  const getCharacterByName = async (name) => {
    const result = await request(
      `${_apiBase}characters?name=${name}&${_apiKey}`
    );
    return result.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const result = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
    return _transformCharacter(result.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const result = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return result.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const result = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(result.data.results[0]);
  };

  // получение данных из API
  const _transformCharacter = (char) => {
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

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects.language || "en-us",
      price: comics.prices.price ? `${comics.prices.price}$` : "not available",
    };
  };

  return {
    process,
    setProcess,
    getAllCharacters,
    getCharacterByName,
    getCharacter,
    clearError,
    getComic,
    getAllComics,
  };
};

export default useMarvelService;
