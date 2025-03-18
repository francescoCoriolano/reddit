// wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {
  // get all elements with class map-card-item
  const mapCardItems = document.querySelectorAll(".map-card-item");
  const allOrangeArrowIcons = document.querySelectorAll(".orange-arrow-icon");
  const allRowInfoHolderGridWrapper = document.querySelectorAll(
    ".row-info-holder-grid-wrapper"
  );
  // handle initial active state for map items
  handleInitialActiveState(mapCardItems);
  // add hover state to all not active elements
  addHoverStateToAllNotActive(mapCardItems);
  // add click event to all elements
  handleCardClick(
    mapCardItems,
    allOrangeArrowIcons,
    allRowInfoHolderGridWrapper
  );
});

/**
 * Handle Initial active state for map items
 * @param {NodeListOf<Element>} mapCardItems
 */
function handleInitialActiveState(mapCardItems) {
  // remove active class from all elements
  mapCardItems.forEach(function (mapCardItem) {
    handleCardState({ cardItem: mapCardItem, type: "deactivate" });
  });
  // search params for the location search
  const searchParams = new URLSearchParams(window.location.search);
  // get the id of the location from the search params
  const locationId = searchParams.get("location");
  // if locationId is exists find the element with the id of locationId

  const cardItem = locationId ? mapCardItems[locationId] : mapCardItems[0];
  // add active class to the first element
  handleCardState({ cardItem, type: "activate" });
}

/**
 * Add click event to all elements
 */
function handleCardClick(
  mapCardItems,
  allOrangeArrowIcons,
  allRowInfoHolderGridWrapper
) {
  //get all elements  visible-hover-bg
  const allNotActiveCards = document.querySelectorAll(".visible-hover-bg");

  // add click event to all not active elements
  allNotActiveCards.forEach(function (notActiveCard) {
    notActiveCard.addEventListener("click", function () {
      // get all elements with class map-card-item
      // remove active class from all elements
      mapCardItems.forEach(function (mapCardItem) {
        mapCardItem.classList.remove("active");
      });
      // remove active state from all orange-arrow-icon

      allOrangeArrowIcons.forEach(function (orangeArrowIcon) {
        orangeArrowIcon.classList.remove("active");
      });
      // remove active state from all row-info-holder-grid-wrapper
      allRowInfoHolderGridWrapper.forEach(function (rowInfoHolderGridWrapper) {
        rowInfoHolderGridWrapper.classList.remove("active");
      });

      const cardToActivate = notActiveCard.parentElement;
      handleCardState({
        cardItem: notActiveCard.parentElement,
        type: "activate",
      });
      // add hover state to all not active elements
      addHoverStateToAllNotActive(mapCardItems);
      // remove hover state from active
      removeHoverStateFromActive(mapCardItems);

      // handle map visibility
      // find all map holders (.site-map))and remove class active
      const allMapHolders = document.querySelectorAll(".site-map");
      allMapHolders.forEach(function (mapHolder) {
        mapHolder.classList.remove("active");
      });
      // get the id if mainNotActiveCard
      const mainNotActiveCardId = cardToActivate.id;
      // remove -trigger from the id of mainNotActiveCard -8 chracters
      const activeMapId = mainNotActiveCardId.slice(0, -8);
      // find element with id activeMapId and add class active
      const mapHolder = document.getElementById(activeMapId);
      mapHolder.classList.add("active");
      // add opacity 1
      mapHolder.style.opacity = "1";

      // get all elements  //google-map-btn-wrapper
      const allGoogleMapBtnWrappers = document.querySelectorAll(
        ".google-map-btn-wrapper"
      );
      // remove class active from all elements
      allGoogleMapBtnWrappers.forEach(function (googleMapBtnWrapper) {
        googleMapBtnWrapper.classList.remove("active");
      });

      //google-map-btn-wrapper is prev sibling of mapHolder
      mapHolder.previousElementSibling.classList.add("active");
    });

    // add touch event to all not active elements
    notActiveCard.addEventListener("touchstart", function () {
      // get all elements with class map-card-item
      // remove active class from all elements
      mapCardItems.forEach(function (mapCardItem) {
        mapCardItem.classList.remove("active");
      });
      // remove active state from all orange-arrow-icon

      allOrangeArrowIcons.forEach(function (orangeArrowIcon) {
        orangeArrowIcon.classList.remove("active");
      });
      // remove active state from all row-info-holder-grid-wrapper
      allRowInfoHolderGridWrapper.forEach(function (rowInfoHolderGridWrapper) {
        rowInfoHolderGridWrapper.classList.remove("active");
      });

      const cardToActivate = notActiveCard.parentElement;
      handleCardState({
        cardItem: notActiveCard.parentElement,
        type: "activate",
      });
      // add hover state to all not active elements
      addHoverStateToAllNotActive(mapCardItems);
      // remove hover state from active
      removeHoverStateFromActive(mapCardItems);

      // handle map visibility
      // find all map holders (.site-map))and remove class active
      const allMapHolders = document.querySelectorAll(".site-map");
      allMapHolders.forEach(function (mapHolder) {
        mapHolder.classList.remove("active");
      });
      // get the id if mainNotActiveCard
      const mainNotActiveCardId = cardToActivate.id;
      // remove -trigger from the id of mainNotActiveCard -8 chracters
      const activeMapId = mainNotActiveCardId.slice(0, -8);
      // find element with id activeMapId and add class active
      const mapHolder = document.getElementById(activeMapId);
      mapHolder.classList.add("active");
      // add opacity 1
      mapHolder.style.opacity = "1";

      // get all elements  //google-map-btn-wrapper
      const allGoogleMapBtnWrappers = document.querySelectorAll(
        ".google-map-btn-wrapper"
      );
      // remove class active from all elements
      allGoogleMapBtnWrappers.forEach(function (googleMapBtnWrapper) {
        googleMapBtnWrapper.classList.remove("active");
      });

      //google-map-btn-wrapper is prev sibling of mapHolder
      mapHolder.previousElementSibling.classList.add("active");
    });
  });

  //
}

/**
 * Handle activate
 * @param {Element} cardItem - the clicked element
 * @param {string} type - the type of action to perform (activate or deactivate)
 */

function handleCardState({ cardItem, type }) {
  if (type === "activate") {
    // add active class to the clicked element
    cardItem.classList.add("active");
    // add active state to the orange-arrow-icon
    cardItem.querySelector(".orange-arrow-icon").classList.add("active");
    // add active state to the row-info-holder-grid-wrapper
    cardItem
      .querySelector(".row-info-holder-grid-wrapper")
      .classList.add("active");
  }
  if (type === "deactivate") {
    // remove active class from the clicked element
    cardItem.classList.remove("active");
    // remove active state from the orange-arrow-icon
    cardItem.querySelector(".orange-arrow-icon").classList.remove("active");
    // remove active state from the row-info-holder-grid-wrapper
    cardItem
      .querySelector(".row-info-holder-grid-wrapper")
      .classList.remove("active");
  }
}

/**
 * Add hover state to all not active elements
 * @param {NodeListOf<Element>} mapCardItems
 */
function addHoverStateToAllNotActive(mapCardItems) {
  // add hover state to all not active elements
  mapCardItems.forEach(function (mapCardItem) {
    // find the one with the class active
    if (!mapCardItem.classList.contains("active")) {
      // find element with class visible-hover-bg
      const visibleHoverBg = mapCardItem.querySelector(".visible-hover-bg");
      // display none
      visibleHoverBg.style.display = "flex";
    }
  });
}

/**
 * Remove hover state from active elements
 * @param {NodeListOf<Element>} mapCardItems
 */
function removeHoverStateFromActive(mapCardItems) {
  // remove hover state from all active elements
  mapCardItems.forEach(function (mapCardItem) {
    // find the one with the class active
    if (mapCardItem.classList.contains("active")) {
      // find element with class visible-hover-bg
      const visibleHoverBg = mapCardItem.querySelector(".visible-hover-bg");
      // display none
      visibleHoverBg.style.display = "none";
    }
  });
}
