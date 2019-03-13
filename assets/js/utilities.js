function str2query(str, queryFields) {
  let output = '';
  str = str.replace(/:/g,'');
  for (let prop in queryFields) {
    if (queryFields.hasOwnProperty(prop)) {
      if (queryFields[prop]) {
        output += prop + ':' + str;
        output += ' OR ';
      }
    }
  }
  output = output.substring(0, output.length - 4);
  output += ' AND visibility_status:P&birkis=here';
  return encodeURI(output);
}

function getQuery(query) {
  let keys = {};
  query = query.substring(1);
  query = query.split('&');
  for (let i = 0; i < query.length; i++) {
    let queryItem = query[i].split('=');
    keys[queryItem[0]] = decodeURI(queryItem[1]);
  }
  return keys;
}

function excludeFilters(filtersQuery) {
  return filtersQuery.split(':');
}

function setExcludes(excludes) {
  let filterParam = '';
  for (let prop in excludes) {
    if (excludes.hasOwnProperty(prop)) {
      if (!excludes[prop]) {
        filterParam += prop;
        filterParam += ':';
      }
    }
  }
  return filterParam.substring(0, filterParam.length - 1);
}

function changeParam(param, value) {
  let params = window.location.search.substring(1, window.location.search.length);
  params = params.split('&');
  let keyParams = [];
  for (let i = 0; i < params.length; i++) {
    let p = params[i].split('=');
    keyParams[p[0]] = p[1];
  }
  let returnString = '?';
  if ('' !== value) {
    keyParams[param] = value;
  } else {
   delete keyParams[param];
  }
  for (let key in keyParams) {
    //console.log(key, keyParams[key]);
    if (undefined !== keyParams[key]) {
      returnString += key + '=' + keyParams[key];
      returnString += '&';
    }
  }
  return returnString.substring(0, returnString.length - 1);
}

function markText(text, word) {
  word = decodeURI(word);
  word = word.toLowerCase();
  let searchableText = text.toLowerCase();
  let i = 0;
  while(i < text.length) {
    if (-1 < searchableText.indexOf(word, i)) {
      let currentIndex = searchableText.indexOf(word, i);
      let replacement = '<span class="highlight">' + text.substr(currentIndex, word.length) + '</span>';
      text = text.substr(0, currentIndex) + replacement + text.substr(currentIndex+word.length);

      searchableText = text.toLowerCase();
      i = currentIndex + replacement.length;
    } else {
      i = text.length;
    }
  }
  return text;
}

function allIsFalse(object) {
  for (let o in object) {
    if (object.hasOwnProperty(o)) {
      if (object[o]) {
        return false;
      }
    }
  }
  return true;
}