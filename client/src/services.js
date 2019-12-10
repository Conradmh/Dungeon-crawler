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

    console.log(responseParsed.data, "this is UDP.data");

    return responseParsed
  } catch(err) {
    console.error(err)
  }
}
export default updateDungeon;
