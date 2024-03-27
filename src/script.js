const fetchData = async () => {
  const url = ""; // voeg database url toe (localhost voor nu)
  try {
    const response = await fetch(url);
    const data = await response.json();
    // doe wat met de data
  } catch (err) {
    console.log(err);
  }
};
