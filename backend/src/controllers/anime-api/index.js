import axios from "axios";

const { ANIME_API_URL, ANIME_API_KEY, ANIME_API_HOST } = process.env;

const getAnimeApi = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: ANIME_API_URL,
      headers: {
        "X-RapidAPI-Key": ANIME_API_KEY,
        "X-RapidAPI-Host": ANIME_API_HOST,
      },
    };
    const image = await axios.request(options);

    if (image?.data?.stuff) res.send(image.data.stuff);
    else res.sendStatut(404);
  } catch (error) {
    res.status(500);
  }
};

const animeControllers = (router) => {
  router.route("/").get(getAnimeApi);

  return router;
};

export default { animeControllers };
