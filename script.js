document.addEventListener("DOMContentLoaded", () => {
  const getJokeBtn = document.getElementById("get-joke-btn");
  const jokeInfo = document.getElementById("joke-info");
  const jokeHere = document.getElementById("joke-here");
  const errorMessage = document.getElementById("error-message");

  getJokeBtn.addEventListener("click", async () => {
    try {
      const data = await getJoke();
      showJoke(data);
    } catch (error) {
      noJoke(error);
    }
  });
  async function getJoke() {
    const url = "https://api.freeapi.app/api/v1/public/randomjokes/joke/random";
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const response = await fetch(url, options);
    console.log(response);

    if (!response.ok) {
      throw new Error("Error getting joxx");
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error("Error getting joxx");
    }
    console.log(data);

    return data;
  }

  function showJoke(data) {
    jokeInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    const joke = data.data.content;
    jokeHere.textContent = `"${joke}"`;

    getJokeBtn.textContent = "Another one";
  }

  function noJoke(error) {
    jokeInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    console.log("this was the error:", error);
  }
});
