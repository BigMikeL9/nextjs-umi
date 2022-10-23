const httpRequest = async (URL) => {
  try {
    const response = await fetch(URL);

    if (!response.ok) throw new Error("Something went wrong!! 😓");

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log("Error message: ", error.message);
    console.log("Cause of Error: ", error.cause);
  }
};

export default httpRequest;
