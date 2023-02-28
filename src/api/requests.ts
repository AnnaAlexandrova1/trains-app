import {ITrains} from "../App";

const url: string =
  "https://gist.githubusercontent.com/GlennMiller1991/152583a1bf1e057e8db06f5949ae3dda/raw/f84adf51092706ae0e7c0abc7589ad49800d8112/trains.json";

export const getTrains = async () => {
  let res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: &{res.status}`);
  }

  return await res.json();
};

// запрос не верный! Нужен токен авторизации. И вообще нужен PUT запрос, но к нему тоже нужен доп. доступ
export const putSpeeds = async (data: ITrains) => {
  try {
      const response = await fetch(url, {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! ${response.json}`);
    }
    if (response.ok) {
      console.log(response.status)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.name);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
