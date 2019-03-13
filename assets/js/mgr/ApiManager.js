let ApiManagerInstance;

let ApiManager = {
  http: new XMLHttpRequest(),
  init: function() {
    if (!ApiManagerInstance) {
      ApiManagerInstance = this;
    }
    return ApiManagerInstance;
  },
  read: function(query, onEnd) {
    this.http.open('GET', config.apiBaseUrl + query, true);
    this.http.onreadystatechange = function() {
      if (4 === ApiManagerInstance.http.readyState && 200 === ApiManagerInstance.http.status) {
        let json = JSON.parse(ApiManagerInstance.http.responseText);
        let response = {
          data: json['result']
        };
        response['length'] = json['result'].length;
        onEnd(response);
      }
    };
    this.http.send();
  }
};