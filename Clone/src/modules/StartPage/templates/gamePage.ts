export const game = `
  <div class="map__container" id="map"></div>
`
export const renderGamePage = () => {
  document.body.innerHTML = "";
  document.body.insertAdjacentHTML("beforeend", game);
};
