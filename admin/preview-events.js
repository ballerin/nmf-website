// Events post preview — matches _layouts/activity_post.html
var EventsPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']) || '';
    var author = entry.getIn(['data', 'author']) || '';
    var image = entry.getIn(['data', 'image']) || '';
    var start = entry.getIn(['data', 'start-date']) || '';
    var end = entry.getIn(['data', 'end-date']) || '';
    var body = this.props.widgetFor('body');

    var fmt = function (d) {
      if (!d) return '';
      return new Date(d).toLocaleDateString('no-NO', { day: 'numeric', month: 'long', year: 'numeric' });
    };
    var dateLabel = start && end && start !== end ? fmt(start) + ' – ' + fmt(end) : fmt(start);

    return h('article', { className: 'post-article w3-border w3-round-large w3-margin-bottom' },
      h('header', {
        className: 'post-hero',
        style: image ? { backgroundImage: 'url("' + image + '")' } : {}
      },
        h('div', { className: 'post-hero-overlay' },
          h('div', { className: 'post-hero-text' },
            h('p', { className: 'post-hero-eyebrow' }, dateLabel),
            h('h1', {}, title),
            author ? h('div', { className: 'post-meta' },
              h('span', { className: 'author' }, author)
            ) : null
          )
        )
      ),
      h('div', { className: 'w3-container w3-padding post-content' }, body),
      h('div', { className: 'w3-container w3-light-grey w3-padding w3-center' },
        h('a', { className: 'w3-button nmf-primary back-button w3-round', href: '/arrangementer/' },
          h('i', { className: 'fa-solid fa-reply', 'aria-hidden': 'true' }),
          h('span', { className: 'label' }, 'Tilbake til arrangementer')
        )
      )
    );
  }
});

CMS.registerPreviewTemplate('events', EventsPreview);
