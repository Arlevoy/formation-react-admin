import dataMusic from "./musicData.json";

export const dataProvider = async (
  type: "GET_LIST",
  resource: string,
  params: Object,
) => {
  const options = {
    headers: new Headers({
      Accept: "application/json",
    }),
  };
  switch (type) {
    case "GET_LIST": {
      const { page, perPage } = params.pagination;
      console.log("list", dataMusic);
      console.log("params", params);
      JSON.stringify([(page - 1) * perPage, page * perPage - 1]);
      return dataMusic;
      break;
    }
    case "GET_ONE": {
      console.log("params", params);
      const playlist = dataMusic.data.find(
        ({ id }) => id === Number(params.id),
      );
      console.log("dataMusic.data", dataMusic.data);
      return { data: playlist };
    }
    default: {
      throw new Error(`Unsupported Data Provider request type ${type}`);
    }
  }
};
