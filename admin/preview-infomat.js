// INFOMAT post preview — matches _layouts/infomat_template.html
var InfomatPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']) || '';
    var author = entry.getIn(['data', 'author']) || '';
    var date = entry.getIn(['data', 'date']) || '';
    var body = this.props.widgetFor('body');

    var monthYear = date ? new Date(date).toLocaleDateString('no-NO', { month: 'long', year: 'numeric' }) : '';

    return h('article', { className: 'w3-border w3-round-large w3-margin-bottom infomat-article' },
      h('header', { className: 'w3-container infomat-header' },
        h('div', { className: 'infomat-header-inner' },
          h('div', { className: 'infomat-header-logo' },
            h('img', { src: '/assets/images/nmf-bare-logo.svg', alt: 'INFOMAT logo' })
          ),
          h('div', { className: 'infomat-header-copy' },
            h('h1', {}, 'INFOMAT'),
            h('p', { className: 'infomat-subtitle' }, monthYear),
            author ? h('p', { className: 'infomat-author' }, 'Redaktør: ' + author) : null
          )
        )
      ),
      h('hr'),
      h('div', { className: 'w3-container w3-padding post-content infomat-content' }, body),
      h('div', { className: 'w3-container w3-light-grey w3-padding w3-center' },
        h('a', { className: 'w3-button nmf-primary back-button', href: '/infomat/' },
          h('i', { className: 'fa-solid fa-reply', 'aria-hidden': 'true' }),
          h('span', { className: 'label' }, 'Tilbake til INFOMAT')
        )
      )
    );
  }
});

CMS.registerPreviewTemplate('infomat', InfomatPreview);
