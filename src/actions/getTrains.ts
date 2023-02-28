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


export const putSpeeds = async (data: ITrains) => {
  try {
      const response = await fetch(url, {
      mode: 'no-cors',
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
