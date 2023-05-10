(function ($) {
  let showDiv = $("#show"),
    showList = $("#showList"),
    form = $("#searchForm"),
    searchInput = $("#searchTerm"),
    error = $("#error"),
    homeLink = $("#homeLink");

  $.ajax({
    type: "get",
    url: "http://api.tvmaze.com/shows",
  }).then(function (response) {
    homeLink.hide();
    for (let i of response) {
      let itemName = i.name;
      let itemRef = i._links.self.href;
      showList.append("<li><a href=" + itemRef + ">" + itemName + "</li>");
    }
    showList.show();
  });

  form.submit(function (event) {
    event.preventDefault();
    let search = searchInput.val();

    if (search && search.trim().length > 0) {
      error.hide();
      showDiv.hide();
      showList.html("");
      let searchUrl = "http://api.tvmaze.com/search/shows?q=" + search;
      $.ajax({
        type: "get",
        url: searchUrl,
      }).then(function (response) {
        for (let i of response) {
          itemName = i.show.name;
          itemRef = i.show._links.self.href;
          showList.append("<li><a href=" + itemRef + ">" + itemName + "</li>");
        }
        searchInput.val("");
        homeLink.show();
        showList.show();
      });
    } else {
      error.text("Must enter a search term");
      searchInput.val("");
      searchInput.focus();
      error.show();
    }
  });

  showList.on("click", "a", function (event) {
    event.preventDefault();
    showList.hide();
    showDiv.html("");

    $.ajax({
      type: "get",
      url: event.currentTarget.href,
    }).then(function (response) {
      showDiv.append("<h1>" + response.name + "</h1>");
      if (response.image) {
        showDiv.append(
          "<img src=" + response.image.medium + " alt='TV Show image'>"
        );
      } else {
        showDiv.append("<img src='/public/no_image.jpeg' alt='TV Show image'>");
      }
      showDiv.append("<dl id='showDivList'></dl>");
      let showDivList = $("#showDivList");
      showDivList.append("<dt>Language</dt>");
      if (response.language) {
        showDivList.append("<dd>" + response.language + "</dd>");
      } else {
        showDivList.append("<dd>N/A</dd>");
      }
      showDivList.append("<dt>Genres<dt>");
      showDivList.append("<dd><ul id='genresList'></ul></dd>");
      let genresList = $("#genresList");
      if (response.genres.length != 0) {
        for (let i of response.genres) {
          genresList.append("<li>" + i + "</li>");
        }
      } else {
        genresList.append("<li>N/A</li>");
      }

      showDivList.append("<dt>Average Rating<dt>");
      if (response.rating.average) {
        showDivList.append("<dd>" + response.rating.average + "</dd>");
      } else {
        showDivList.append("<dd>N/A</dd>");
      }

      showDivList.append("<dt>Network<dt>");
      if (response.network) {
        showDivList.append("<dd>" + response.network.name + "</dd>");
      } else {
        showDivList.append("<dd>N/A</dd>");
      }

      showDivList.append("<dt>Summary<dt>");
      if (response.summary) {
        showDivList.append("<dd>" + response.summary + "</dd>");
      } else {
        showDivList.append("<dd>N/A</dd>");
      }

      showDiv.show();
      homeLink.show();
    });
  });
})(window.jQuery);
