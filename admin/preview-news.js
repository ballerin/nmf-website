// News post preview — matches _layouts/nyheter_template.html
var NewsPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']) || '';
    var author = entry.getIn(['data', 'author']) || '';
    var image = entry.getIn(['data', 'image']) || '';
    var date = entry.getIn(['data', 'date']) || '';
    var body = this.props.widgetFor('body');

    return h('article', { className: 'post-article w3-border w3-round-large w3-margin-bottom' },
      h('header', {
        className: 'post-hero',
        style: image ? { backgroundImage: 'url("' + image + '")' } : {}
      },
        h('div', { className: 'post-hero-overlay' },
          h('div', { className: 'post-hero-text' },
            h('p', { className: 'post-hero-eyebrow' }, 'Nyheter'),
            h('h1', {}, title),
            h('div', { className: 'post-meta' },
              date ? h('span', { className: 'date' }, new Date(date).toLocaleDateString('no-NO', { day: 'numeric', month: 'long', year: 'numeric' })) : null,
              author ? h('span', { className: 'author' }, author) : null
            )
          )
        )
      ),
      h('div', { className: 'w3-container w3-padding post-content' }, body),
      h('div', { className: 'w3-container w3-light-grey w3-padding w3-center' },
        h('a', { className: 'w3-button nmf-primary back-button w3-round', href: '/nyheter/' },
          h('i', { className: 'fa-solid fa-reply', 'aria-hidden': 'true' }),
          h('span', { className: 'label' }, 'Tilbake til nyheter')
        )
      )
    );
  }
});

CMS.registerPreviewTemplate('news', NewsPreview);
