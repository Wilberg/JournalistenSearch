let Pagination = {
  resultsPerPage: 10,
  pages: 0,
  page: 0,
  data: null,
  init: function(data) {
    let page;
    if (!!getQuery(window.location.search)['page']) {
      page = parseInt(getQuery(window.location.search)['page']);
    } else {
      page = 1;
      window.history.pushState(null, null, changeParam('page', page));
    }

    let pages = Math.ceil(data.length / this.resultsPerPage);
    this.data = data;
    if (page > pages || page <= 0) {
      if (page > pages) {
        page = pages;
      } else {
        page = 1;
      }
      this.goToPage(page, () => {/*Do nothing*/});
    }
    this.pages = pages;
    this.page = page;
    if (this.page > this.pages || this.page <= 0) {
      page = 1;
    }
    return {
      data: data.data.slice(this.resultsPerPage*(page-1), this.resultsPerPage*page),
      pages: pages,
      page: page
      };
  },
  goToPage(page, onEnd) {
    if (page <= this.pages && page > 0) {
      window.history.pushState(null, null, changeParam('page', page));
      this.page = page;
      onEnd({
        data: this.data.data.slice(this.resultsPerPage*(this.page-1), this.resultsPerPage*this.page),
        pages: this.pages,
        page: this.page
      });
    } else {
      onEnd({error: true});
    }
  }
};