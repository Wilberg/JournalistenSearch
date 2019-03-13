/**
 * Article Model
 * @param input
 * @returns {{toResult: (function(): HTMLElement)}}
 * @constructor
 */
function Article(input) {
  let ID = 'id';
  let TITLE = 'title';
  let SUBTITLE = 'subtitle';
  let IMAGE = 'frontCropUrl';
  let PUBLISHEDURL = 'published_url';
  let TAGS = 'tags';

  let body = {
    toResult: function() {
      let a_container = document.createElement('a');
      let classes = "article";
      let a_title;
      let a_image;
      let a_content = document.createElement('div');
      a_content.setAttribute('class', 'content');

      // Article has image
      if (!!body[IMAGE]) {
        a_image = document.createElement('div');
        a_image.setAttribute('class', 'image');
        a_image.style.backgroundImage = 'url("https://image.journalisten.no/' + this[IMAGE] + '")';
        a_container.insertBefore(a_image, a_container.firstChild);
      }

      let a_tags;

      if (!!body[TAGS]) {
        a_tags = document.createElement('div');
        let allTags = body[TAGS].split(', ');
        for (let i = 0; i < allTags.length; i++) {
          let a_tag = document.createElement('p');
          a_tag.innerHTML = allTags[i];
          a_tags.appendChild(a_tag);
        }
        a_tags.setAttribute('class', 'tags');
        a_content.appendChild(a_tags);
      }

      a_title = document.createElement('a');
      a_title.setAttribute('class', 'title');
      a_title.innerHTML = markText(this[TITLE], getQuery(window.location.search)['query']);
      a_content.appendChild(a_title);

      let a_subtitle;

      if (!body[SUBTITLE]) {
        classes += " article--compressed ";
      } else {
        a_subtitle = document.createElement('p');
        a_subtitle.setAttribute('class', 'description');
        a_subtitle.innerHTML = markText(body[SUBTITLE], getQuery(window.location.search)['query']);
        a_content.appendChild(a_subtitle);
      }

      classes = classes.trim();
      a_container.setAttribute('class', classes);
      a_container.href = 'https://journalisten.no' + this[PUBLISHEDURL];

      a_container.appendChild(a_content);

      return a_container;
    }
  };

  body[ID] = parseInt(input[ID]);
  body[TITLE] = input[TITLE] || 'https://journalisten.no' + input[PUBLISHEDURL];
  body[SUBTITLE] = (input[SUBTITLE].length < 250) ? input[SUBTITLE] : input[SUBTITLE].substring(0, 250) + '...';
  body[IMAGE] = input[IMAGE];
  body[PUBLISHEDURL] = input[PUBLISHEDURL];
  body[TAGS] = input[TAGS];

  return body;
}