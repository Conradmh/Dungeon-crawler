const updateDungeon = async (dungeonId, newInfo) => {
  try {

    const url = process.env.REACT_APP_API_URL + '/api/dungeons/' + dungeonId;

    const serverResponse = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(newInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const responseParsed = await serverResponse.json()

    console.log(responseParsed, "this is UDP.data");

    return responseParsed
  } catch(err) {
    console.error(err)
  }
}
export { updateDungeon };





const getDungeons = async () => {

  try {
    const dungeons = await
    fetch(process.env.REACT_APP_API_URL + '/api/dungeons');

    const parsedDungeons = await dungeons.json();

    this.setState({
      dungeons: parsedDungeons
    });
  } catch (err) {
    console.log(err);
  }
}
export { getDungeons };
