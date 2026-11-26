const slideWrapper = document.getElementById('archive-slides');
const dialog = document.getElementById('reference-dialog');
const dialogBody = document.getElementById('dialog-body');
const referenceContent = document.getElementById('reference-content');
const previousReference = document.getElementById('previous-reference');
const nextReference = document.getElementById('next-reference');
let currentReferenceItem = null;
const hoverTitle = document.getElementById('hover-title');
const countLabel = document.getElementById('slide-count');
const gridDialog = document.getElementById('grid-dialog');
const gridContainer = document.getElementById('reference-grid');
const gridTrigger = document.getElementById('open-grid');
const gridClose = document.getElementById('close-grid');
const gridTotal = document.getElementById('grid-total');
const gridTitle = document.getElementById('grid-title');
const inquiryPanel = document.querySelector('.inquiry-panel');
const researchAll = document.getElementById('research-all');
const researchCategory = document.getElementById('research-category');
const categoryButtons = document.querySelectorAll('.category-button');
const categoryNav = document.querySelector('.category-nav');
const filterTrigger = document.getElementById('open-filter');
const filterPanel = document.getElementById('filter-panel');
const filterAccordion = document.getElementById('filter-accordion');
const filterToggleIcon = document.getElementById('filter-toggle-icon');
const tagSearch = document.getElementById('tag-search');
const tagPills = document.getElementById('tag-pills');
const tagMoreButton = document.getElementById('tag-more');
const selectedTagsWrap = document.getElementById('selected-tags');
const selectedTagPills = document.getElementById('selected-tag-pills');
const clearTagsButton = document.getElementById('clear-tags');
const filterResults = document.getElementById('filter-results');
const filterCount = document.getElementById('filter-count');
const tagSearchEmpty = document.getElementById('tag-search-empty');
const tagSearchMessage = document.getElementById('tag-search-message');
const suggestTag = document.getElementById('suggest-tag');
const suggestionNote = document.getElementById('tag-suggestion-note');
const suggestionForm = document.getElementById('tag-suggestion-form');
const suggestionTagInput = document.getElementById('suggestion-tag-input');
const suggestionNoteInput = document.getElementById('suggestion-note-input');
const cancelSuggestion = document.getElementById('cancel-tag-suggestion');
const submitSuggestion = document.getElementById('submit-tag-suggestion');
const suggestionFeedback = document.getElementById('suggestion-feedback');
const selectedTags = new Set();
const archiveLayoutStart = Math.floor(Math.random() * 4);
const shuffledArchiveItems =
  typeof archiveItems === 'undefined' ? [] : [...archiveItems];

for (let i = shuffledArchiveItems.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledArchiveItems[i], shuffledArchiveItems[j]] =
    [shuffledArchiveItems[j], shuffledArchiveItems[i]];
}
const SUGGEST_TAG_FORM_ENDPOINT = 'https://formspree.io/f/mqppwpbn';
let pendingSuggestedTag = '';
let visibleTagRows = 2;

let swiper;
let activeCategory = 'all';

const categoryContent = {
    fashion: {
    title: 'Fashion',
    intro: 'Clothing, styling, silhouettes, and the different ways fashion can be appreciated.',
    personal: 'Watching <em>Barbie: A Fashion Fairytale</em> as a kid made me want to be a fashion designer and even led me to get my first sewing machine. Now, my personal style leans more toward alternative and grunge. There are so many outfits I’d like to try, though I often hold myself back because I don’t feel confident in my body. I love seeing how other people put looks together, especially when they come up with combinations I never would have thought of myself.',
    historyHtml: `
      Fashion changes with how people live, the materials they have, and what they
      want their clothes to express. The huipil is a woven top with roots in ancient
      Mesoamerica. Traditionally, the design of a Maya huipil could show where the
      wearer was from.
      <a
        class="citation-link"
        href="https://fashionhistory.fitnyc.edu/huipilli-huipil/"
        target="_blank"
        rel="noopener noreferrer"
        title="FIT Fashion History Timeline, Huipilli/Huipil (2021)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        FIT, 2021
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
      In 1947, the full skirts and fitted waists of Christian Dior’s New Look
      stood out after years of wartime fabric restrictions.
      <a
        class="citation-link"
        href="https://fashionhistory.fitnyc.edu/1940-1949/"
        target="_blank"
        rel="noopener noreferrer"
        title="Karina Reddy, 1940–1949 (2019)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Reddy, 2019
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
      In the 1970s and 1980s, Willi Smith mixed streetwear with high fashion,
      making loose, colorful clothes people could move in and style their own way.
      <a
        class="citation-link"
        href="https://fashionhistory.fitnyc.edu/1948-1987-willi-smith/"
        target="_blank"
        rel="noopener noreferrer"
        title="Eleanor Burholt, Willi Smith (2020)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Burholt, 2020
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
    `
  },
  hair: {
    title: 'Hair',
    intro: 'Hairstyling as a form of adornment, creativity, and experimentation.',
    personal: 'I’ve been interested in hair for a long time, which is what led me to study cosmetology in high school. My relationship with my own hair has been more complicated. I’m biracial with 3a/3b curls, and my mom, who’s white, did her best to figure out how to care for my hair texture when I was little. It took me years to embrace my curls, and I’m still trying to find a care routine that works for me. I learned to braid by watching her put my hair in French braids, and box braids are now one of my favorite ways to switch up how I wear my hair. I hope to use what I’ve learned from my own experiences to teach my kids how to care for their hair and express themselves through it one day.',
    historyHtml: `
      Hairstyles can show what people value about beauty and how they want to
      be seen. In ancient Egypt, an elaborate wig could show a person's rank.
      One surviving wig from Thebes was made with small curls on top and
      braids underneath.
      <a
        class="citation-link"
        href="https://www.intarch.ac.uk/journal/issue42/6/3.cfm"
        target="_blank"
        rel="noopener noreferrer"
        title="Joann Fletcher and Filippo Salamone, An Ancient Egyptian Wig: Construction and Reconstruction (2016)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Fletcher &amp; Salamone, 2016
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
      In the U.S. in the 1960s and 1970s, the Afro became a symbol of Black
      pride. Wearing hair naturally was one way to challenge beauty standards
      that favored straight hair.
      <a
        class="citation-link"
        href="https://folklife.si.edu/magazine/black-hair-identity"
        target="_blank"
        rel="noopener noreferrer"
        title="Kamryn Z. Bess, It’s More Than “Just” Hair: Revitalization of Black Identity (2022)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Bess, 2022
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
    `
  },
  makeup: {
    title: 'Makeup',
    intro: 'Makeup as decoration, transformation, and artistic expression.',
    personal: 'Like a lot of people, I started experimenting with my mom’s makeup when I was little. She had this body glitter shaker I’d beg to use, especially for picture day. I remember being given my own lip gloss in kindergarten and being obsessed with it. I started doing my friends’ makeup as a preteen, and in middle school I went through a whole “I want to be a makeup artist” phase. Glitter was always one of my favorite things to play with, which is probably why I’m still so drawn to it. Nowadays, if I wear anything, I usually just use lashes or mascara with a lip gloss.',
    historyHtml: `
      A line of makeup can change how a whole face looks. In ancient Egypt,
      people outlined their eyes with dark kohl. In the 1960s, Twiggy made
      her eyes the focus of her mod look with exaggerated lashes and a dark
      line in the crease of her eyelids.
      <a
        class="citation-link"
        href="https://lmi.edu/blog/4000-yrs-of-makeup-the-evolution-of-makeup/"
        target="_blank"
        rel="noopener noreferrer"
        title="Lissette Waugh, 4000 Years of Makeup: The Evolution of Makeup (2022)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Waugh, 2022
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
      The products people could find also shaped how they wore makeup. At the
      Ebony Fashion Fair, models mixed foundations to match their skin tones.
      Eunice Johnson saw this and helped launch Fashion Fair Cosmetics in 1973
      to give Black women more shades to choose from.
      <a
        class="citation-link"
        href="https://www.smithsonianmag.com/arts-culture/reliving-ebony-fashion-fair-runway-one-couture-dress-time-180962987/"
        target="_blank"
        rel="noopener noreferrer"
        title="Katie Nodjimbadem, Reliving the Ebony Fashion Fair Off the Runway, One Couture Dress at a Time (2017)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Nodjimbadem, 2017
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
    `
  },
  nails: {
    title: 'Nails',
    intro: 'Nail art, intricate details, and the possibilities of miniature design.',
    personal: 'I love getting my nails done, especially watching the whole set come together. After I passed my cosmetology state boards in 2021, I considered becoming a nail tech. About a year and a half ago, I thought about starting my own press-on business. These days, I really enjoy painting my daughter’s nails, and I still get acrylics any chance I get.',
    historyHtml: `
      People have decorated their nails for thousands of years. In the U.S.,
      Black women have helped shape modern nail art. Donna Summer wore acrylics
      in the 1970s, and Florence Griffith Joyner made long, colorful nails part
      of her look on the track at the 1988 Olympics. Nail salons have also been
      places for Black women to spend time together and experiment with designs.
      In one set, nail artist Celeste Hampton used deep brown to reflect her skin
      tone and sculpted curves to celebrate the boldness of Black women.
      <a
        class="citation-link"
        href="https://nmaahc.si.edu/explore/stories/nail-art"
        target="_blank"
        rel="noopener noreferrer"
        title="P. Labossiere, Nail Art: Expressions of African American Culture, Pride, and Style"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Labossiere, n.d.
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
    `
  },
  'body-art': {
    title: 'Body Art',
    intro: 'Tattoos, piercings, and other practices that decorate or modify the body.',
    personal: 'Body art has been a part of my life for as long as I can remember. I was always curious about my mom’s piercings, and I went with her to the tattoo shop all the time. I remember getting a tattoo stencil put on me while she got tattooed and thinking it was the coolest thing. Growing up around all of that is a big part of why I got so interested in tattoos and piercings and wanted to get my own.',
    historyHtml: `
      People have used tattoos and piercings to decorate their bodies for thousands
      of years. In parts of what are now Peru and Chile, some tattoos featured animals
      and symbols that also appeared on textiles and pottery. Māori facial moko could
      show a person's ancestry or standing in their community.
      <a
        class="citation-link"
        href="https://www.smithsonianmag.com/history/tattoos-worldwide-history-144038580/"
        target="_blank"
        rel="noopener noreferrer"
        title="Cate Lineberry, The Worldwide History of Tattoos (2007, updated 2023)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Lineberry, 2007
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
      Piercing jewelry could carry meaning, too. People wore gold earrings in ancient
      Mesopotamia, and in some Indian traditions, a nose ring could show that a woman
      was married.
      <a
        class="citation-link"
        href="https://finderskeepersbodypiercing.com/insider-scoop/f/the-rich-history-of-body-piercing-a-fascinating-journey"
        target="_blank"
        rel="noopener noreferrer"
        title="Finders Keepers Body Piercing, The Rich History of Body Piercing (2023)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Finders Keepers, 2023
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
    `
  },
  accessories: {
    title: 'Accessories',
    intro: 'Jewelry, shoes, bags, and the details that complete or transform a look.',
    personal: 'When it comes to accessories, I love jewelry and shoes. I wear a lot of black, and I like how a few silver rings stand out even when I’m just wearing a T-shirt and jeans. Silver is the only jewelry I wear, so I’ve been slowly building a collection of pieces I can wear often without worrying about them tarnishing. I also love collecting shoes so I have a pair for any kind of outfit I want to wear.',
    historyHtml: `
      Accessories can change how an outfit feels through color, shape, or texture.
      Those details can also say something about the person wearing or carrying them.
      In medieval Europe, something as small as an embroidered silk pouch could show
      wealth. Designers still borrow details from the past, too. Scarab motifs from
      ancient Egypt, for example, show up on accessories today.
      <a
        class="citation-link"
        href="https://fashion-era.com/accessories/accessories-through-time"
        target="_blank"
        rel="noopener noreferrer"
        title="Chloe Montgo, Accessories Through Time: How Historical Pieces Influence Modern Trends (2024)"
      >
        <span class="citation-dot" aria-hidden="true"></span>
        Montgo, 2024
        <span class="citation-arrow" aria-hidden="true">↗</span>
      </a>
    `
  }
};

const researchPerspectivesHtml = {
  fashion: `
    Brian Moeran gives an example of a fashion magazine describing zipper details
    as having “adult playfulness”
    <a class="citation-link"
       href="https://revistacomsoc.pt/index.php/revistacomsoc/en/article/download/908/889/1086"
       target="_blank"
       rel="noopener noreferrer"
       title="Proposing Fashion: The Discourse of Glossy Magazines">
      <span class="citation-dot" aria-hidden="true"></span>
      Moeran 2013, 134
      <span class="citation-arrow" aria-hidden="true">↗</span>
    </a>.
    I like that example because the caption gives me a reason to look closer at
    something as ordinary as a zipper. It also makes me think about which bodies
    get to wear the looks magazines describe as playful or daring. I want to see
    more plus-size editorials where the styling gets that kind of attention, down
    to the placement of a zipper or the way a sleeve hangs.
  `,

  hair: `
    A slicked-back bun can look polished in a fashion editorial and practical at
    a dance rehearsal. Neil Hester and Eric Hehman explain that the impressions
    we form from a hairstyle also depend on the setting and the associations we
    bring to it
    <a class="citation-link"
       href="https://journals.sagepub.com/doi/pdf/10.1177/10888683231157961"
       target="_blank"
       rel="noopener noreferrer"
       title="Dress Is a Fundamental Component of Person Perception">
      <span class="citation-dot" aria-hidden="true"></span>
      Hester and Hehman 2023, 418
      <span class="citation-arrow" aria-hidden="true">↗</span>
    </a>.
    I’d like to put two images like that next to each other and see what makes me
    read the same style differently. The pose, the clothes, and what the person
    is doing might all affect what I call “polished.”
  `,

  makeup: `
    Elizabeth Wilson writes about the “tremendous creativity” people bring to
    decorating their bodies with materials like paint, fabric, and metal
    <a class="citation-link"
       href="https://newleftreview.org/issues/i180/articles/elizabeth-wilson-the-postmodern-chameleon"
       target="_blank"
       rel="noopener noreferrer"
       title="The Postmodern Chameleon">
      <span class="citation-dot" aria-hidden="true"></span>
      Wilson 1990, 188
      <span class="citation-arrow" aria-hidden="true">↗</span>
    </a>.
    I think of that when I see a line of eyeliner floating above the crease.
    Moving one line changes where my eye goes when I look at the face. That small
    choice can be the reason I save a makeup look I can’t picture myself wearing.
    I want to get better at noticing what makes a choice like that work.
  `,

  nails: `
    Sanda Miller writes that we can spend time looking at clothes for their
    beauty as well as for what they’re made to do
    <a class="citation-link"
       href="https://doi.org/10.2752/136270407779934551"
       target="_blank"
       rel="noopener noreferrer"
       title="Fashion as Art; is Fashion Art?">
      <span class="citation-dot" aria-hidden="true"></span>
      Miller 2007, 39
      <span class="citation-arrow" aria-hidden="true">↗</span>
    </a>.
    I want to give nail art that same attention. A design can repeat across
    several fingers, and one nail can interrupt the pattern. That’s what makes me
    want to see the whole set up close. The way the nails work together can be
    just as interesting as what’s painted on any one of them.
  `,

  'body-art': `
    Alison Goodrum includes tattoos and piercings in her definition of dress and
    describes dress as something worn on the “moving, active, living body”
    <a class="citation-link"
       href="https://www.tandfonline.com/doi/pdf/10.1080/11745398.2016.1169581"
       target="_blank"
       rel="noopener noreferrer"
       title="The Dress Issue: Introduction">
      <span class="citation-dot" aria-hidden="true"></span>
      Goodrum 2016, 146–47
      <span class="citation-arrow" aria-hidden="true">↗</span>
    </a>.
    I think about that when I look at placement. The lines of a sleeve tattoo
    shift when someone bends their arm, and a row of studs can follow the curve
    of an ear. Showing the arm or ear in the photo helps me see how the shape of
    the body became part of the design.
  `,

  accessories: `
    Leah Scolere and Lee Humphreys found that some designers organized their
    Pinterest boards by color and paid attention to how the images looked together
    <a class="citation-link"
       href="https://journals.sagepub.com/doi/pdf/10.1177/2056305116633481"
       target="_blank"
       rel="noopener noreferrer"
       title="Pinning Design: The Curatorial Labor of Creative Professionals">
      <span class="citation-dot" aria-hidden="true"></span>
      Scolere and Humphreys 2016, 8
      <span class="citation-arrow" aria-hidden="true">↗</span>
    </a>.
    I’d like to try that with shape. Putting a curved silver cuff next to a bag
    with a rounded metal handle could make me notice how both pieces use the same
    curve. Laird Borrelli-Persson uses older runway photos to follow recurring
    ideas across collections
    <a class="citation-link"
       href="https://thecreativeindependent.com/people/archivist-and-editor-laird-borrelli-persson-on-bringing-depth-to-the-superficial/"
       target="_blank"
       rel="noopener noreferrer"
       title="On Bringing Depth to the Superficial">
      <span class="citation-dot" aria-hidden="true"></span>
      Borrelli-Persson 2024
      <span class="citation-arrow" aria-hidden="true">↗</span>
    </a>.
    Keeping the designer and date with each image gives me somewhere to start if
    I want to see where else that shape shows up.
  `,
};

function make(tag, className = '', text = undefined) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function addDetail(parent, heading, value) {
  if (!value) return;
  parent.append(make('h3', '', heading), make('p', '', value));
}

function openReference(item) {
  currentReferenceItem = item;
  closeFilter();
  if (swiper) {
    swiper.mousewheel.disable();
    swiper.keyboard.disable();
  }
  dialogBody.replaceChildren();
  const artwork = make('div', 'dialog-art');
  if (item.type === 'image') {
    const img = make('img');
    img.src = item.image;
    img.alt = item.alt || item.title;
    artwork.append(img);
  } else {
    artwork.append(make('div', 'dialog-excerpt', item.excerpt || ''));
  }
  const info = make('div', 'dialog-info');
  info.append(make('span', 'dialog-label', `${item.id} / ${item.category}`));
  const title = make('h2', '', item.title);
  title.id = 'reference-title';
  info.append(title);
  addDetail(info, 'CREATOR / DATE', [item.creator, item.year].filter(Boolean).join(' · '));
  addDetail(info, 'SOURCE', item.source);
  addDetail(info, 'RESEARCH NOTES', item.notes);
  addDetail(info, 'HISTORIES / CONNECTIONS', item.context);
  addDetail(info, 'CITATION', item.citation);
  addDetail(info, 'TAGS', getTags(item).join(' · '));
  if (item.sourceUrl) {
    const a = make('a', '', 'VIEW ORIGINAL SOURCE ↗');
    a.href = item.sourceUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    info.append(a);
  }
  dialogBody.append(artwork, info);

  const visibleItems = getVisibleItems();
  const canNavigate = visibleItems.length > 1 && visibleItems.includes(item);

  previousReference.hidden = !canNavigate;
  nextReference.hidden = !canNavigate;
  referenceContent.scrollTop = 0;

if (!dialog.open) dialog.showModal();
}

function moveReference(direction) {
  const items = getVisibleItems();
  const currentIndex = items.indexOf(currentReferenceItem);

  if (currentIndex === -1 || items.length < 2) return;

  const nextIndex = (currentIndex + direction + items.length) % items.length;
  openReference(items[nextIndex]);
}

previousReference.addEventListener('click', () => moveReference(-1));
nextReference.addEventListener('click', () => moveReference(1));

function closeReference() {
  if (dialog.open) dialog.close();
}

document.getElementById('close-dialog').addEventListener('click', closeReference);
dialog.addEventListener('click', event => { if (event.target === dialog) closeReference(); });
dialog.addEventListener('close', () => {
  if (swiper && !gridDialog.open) {
    swiper.mousewheel.enable();
    swiper.keyboard.enable();
  }
});

function researchPiece(item) {
  const button = make('button', 'research-piece');
  button.type = 'button';
  button.setAttribute('aria-label', `Open reference: ${item.title || item.id}`);
  const art = make('span', 'piece-art');
  if (item.type === 'image') {
    const img = make('img');
    img.src = item.image;
    img.alt = item.alt || item.title;
    img.loading = 'lazy';
    art.append(img);
  } else {
    button.classList.add('is-excerpt');
    art.append(make('span', 'excerpt-category', item.category));
    art.append(make('span', 'excerpt-body', item.excerpt || ''));
  }
  button.append(art, make('span', 'piece-number', `${item.id} / ${item.category}`));
  button.addEventListener('click', () => openReference(item));
  button.addEventListener('mouseenter', () => {
    hoverTitle.textContent = item.title;
    hoverTitle.classList.add('is-on');
  });
  button.addEventListener('mouseleave', () => hoverTitle.classList.remove('is-on'));
  button.addEventListener('focus', () => {
    hoverTitle.textContent = item.title;
    hoverTitle.classList.add('is-on');
  });
  button.addEventListener('blur', () => hoverTitle.classList.remove('is-on'));
  return button;
}

function gridPiece(item) {
  const button = make('button', 'grid-card');
  button.type = 'button';
  button.setAttribute('aria-label', `Open reference: ${item.title || item.id}`);
  const artwork = make('span', 'grid-card-art');
  if (item.type === 'image') {
    const img = make('img');
    img.src = item.image;
    img.alt = item.alt || item.title;
    img.loading = 'lazy';
    artwork.append(img);
  } else {
    artwork.append(make('span', 'grid-card-excerpt', item.excerpt || ''));
  }
  const caption = make('span', 'grid-card-caption');
  caption.append(
    make('span', 'grid-card-category', `${item.id} / ${item.category}`),
    make('span', 'grid-card-title', item.title)
  );
  const credit = [item.creator, item.year].filter(Boolean).join(' · ');
  if (credit) caption.append(make('span', 'grid-card-credit', credit));
  button.append(artwork, caption);
  button.addEventListener('click', () => openReference(item));
  return button;
}

let gridCloseTimer;

function openGrid() {
  if (gridDialog.open) return;
  closeFilter();
  if (swiper) {
    swiper.mousewheel.disable();
    swiper.keyboard.disable();
  }
  hoverTitle.classList.remove('is-on');
  gridDialog.classList.remove('is-closing');
  gridDialog.showModal();
  gridDialog.scrollTop = 0;
  gridClose.focus();
}

function finishGridClose() {
  clearTimeout(gridCloseTimer);
  gridDialog.classList.remove('is-closing');
  if (gridDialog.open) gridDialog.close();
}

function closeGrid() {
  if (dialog.open) closeReference();
  if (!gridDialog.open || gridDialog.classList.contains('is-closing')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishGridClose();
    return;
  }
  gridDialog.classList.add('is-closing');
  gridCloseTimer = setTimeout(finishGridClose, 550);
}

gridTrigger.addEventListener('click', openGrid);
gridClose.addEventListener('click', closeGrid);
gridDialog.addEventListener('cancel', event => {
  event.preventDefault();
  closeGrid();
});
gridDialog.addEventListener('animationend', event => {
  if (event.target === gridDialog && event.animationName === 'grid-slide-out') {
    finishGridClose();
  }
});
gridDialog.addEventListener('close', () => {
  clearTimeout(gridCloseTimer);
  gridDialog.classList.remove('is-closing');
  if (swiper && !dialog.open) {
    swiper.mousewheel.enable();
    swiper.keyboard.enable();
  }
});

function getCategories(item) {
  if (Array.isArray(item.categories) && item.categories.length) {
    return item.categories.map(category => category.toLowerCase().trim().replace(/\s+/g, '-'));
  }
  if (item.category) return [item.category.toLowerCase().trim().replace(/\s+/g, '-')];
  return [];
}

function getTags(item) {
  return Array.isArray(item.tags)
    ? [...new Set(item.tags.map(tag => String(tag).trim().toLowerCase()).filter(Boolean))]
    : [];
}

function getVisibleItems() {
  const items = shuffledArchiveItems;
  return items.filter(item =>
    (activeCategory === 'all' || getCategories(item).includes(activeCategory)) &&
    [...selectedTags].every(tag => getTags(item).includes(tag))
  );
}

function getAllTags() {
  const items = typeof archiveItems === 'undefined' ? [] : archiveItems;
  return [...new Set(items.flatMap(getTags))].sort((a, b) => a.localeCompare(b));
}

function makeTagButton(tag, isRemovable = false) {
  const selected = selectedTags.has(tag);
  const button = make('button', 'tag-pill', `${isRemovable ? '× ' : selected ? '× ' : ''}${tag}`);
  button.type = 'button';
  button.setAttribute('aria-pressed', String(selected));
  button.setAttribute('aria-label', `${selected ? 'Remove' : 'Select'} ${tag} filter`);
  if (isRemovable) button.classList.add('is-selected');
  button.addEventListener('click', () => {
    selected ? selectedTags.delete(tag) : selectedTags.add(tag);
    tagSearch.value = '';
    suggestionNote.hidden = true;
    renderArchive();
    if (!filterPanel.hidden) tagSearch.focus({ preventScroll: true });
  });
  return button;
}

function updateTagRows() {
  if (filterPanel.hidden) return;

  const buttons = [...tagPills.children];
  if (!buttons.length) {
    tagPills.style.maxHeight = '0px';
    tagMoreButton.hidden = true;
    return;
  }

  const firstTop = buttons[0].offsetTop;
  const rows = [];
  buttons.forEach(button => {
    const top = button.offsetTop;
    const bottom = top + button.offsetHeight;
    const last = rows[rows.length - 1];
    if (!last || Math.abs(last.top - top) > 1) {
      rows.push({ top, bottom });
    } else {
      last.bottom = Math.max(last.bottom, bottom);
    }
  });

  const showCount = Math.min(visibleTagRows, rows.length);
  const height = rows[showCount - 1].bottom - firstTop;
  tagPills.style.maxHeight = `${Math.ceil(height)}px`;
  tagMoreButton.hidden = rows.length <= 2;
  const showLess = visibleTagRows >= rows.length;
  tagMoreButton.textContent = showLess ? '− SHOW LESS' : '+ SHOW MORE';
  tagMoreButton.setAttribute('aria-expanded', String(showLess));
  requestAnimationFrame(() => swiper?.update());
}

function renderTagChoices() {
  const allTags = getAllTags();
  const search = tagSearch.value.trim().toLowerCase();
  const matches = allTags.filter(tag =>
    tag.includes(search) && !selectedTags.has(tag));
  tagPills.replaceChildren(...matches.map(tag => makeTagButton(tag)));
  selectedTagPills.replaceChildren(...[...selectedTags].sort().map(tag => makeTagButton(tag, true)));
  selectedTagsWrap.hidden = selectedTags.size === 0;
  const unknown = Boolean(search) && !allTags.some(tag => tag.includes(search));
  tagSearchEmpty.hidden = !unknown;
  if (unknown) tagSearchMessage.textContent = `NO TAGS FOUND FOR “${tagSearch.value.trim()}”.`;
  if (!unknown) suggestionNote.hidden = true;
  if (!filterPanel.hidden) requestAnimationFrame(updateTagRows);
}

function updateFilterInterface(count) {
  filterCount.textContent = selectedTags.size ? `(${selectedTags.size})` : '';
  filterTrigger.classList.toggle('has-filters', selectedTags.size > 0);
  filterResults.textContent = `${String(count).padStart(2, '0')} MATCHING ${count === 1 ? 'REFERENCE' : 'REFERENCES'}`;
  renderTagChoices();
}

function setFilterOpen(shouldOpen) {
  filterPanel.hidden = !shouldOpen;
  filterAccordion.classList.toggle('is-open', shouldOpen);
  filterTrigger.setAttribute('aria-expanded', String(shouldOpen));
  filterToggleIcon.textContent = shouldOpen ? '−' : '+';
  requestAnimationFrame(() => swiper?.update());
  if (shouldOpen) {
    if (swiper) {
      swiper.mousewheel.disable();
      swiper.keyboard.disable();
    }
    renderTagChoices();
    tagSearch.focus({ preventScroll: true });
  } else if (swiper && !gridDialog.open && !dialog.open) {
    swiper.mousewheel.enable();
    swiper.keyboard.enable();
  }
}

function closeFilter() {
  if (!filterPanel.hidden) setFilterOpen(false);
}

filterTrigger.addEventListener('click', () => setFilterOpen(filterPanel.hidden));
tagMoreButton.addEventListener('click', () => {
  if (tagMoreButton.getAttribute('aria-expanded') === 'true') {
    visibleTagRows = 2;
  } else {
    visibleTagRows += 2;
  }
  updateTagRows();
});
window.addEventListener('resize', () => {
  if (!filterPanel.hidden) requestAnimationFrame(updateTagRows);
});
tagSearch.addEventListener('input', () => {
  visibleTagRows = 2;
  suggestionNote.hidden = true;
  renderTagChoices();
});
clearTagsButton.addEventListener('click', () => {
  selectedTags.clear();
  tagSearch.value = '';
  suggestionNote.hidden = true;
  renderArchive();
  tagSearch.focus({ preventScroll: true });
});
filterPanel.addEventListener('wheel', event => event.stopPropagation(), { passive: true });
filterPanel.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.stopPropagation();
    closeFilter();
    filterTrigger.focus();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !filterPanel.hidden) {
    closeFilter();
    filterTrigger.focus();
  }
});

suggestTag.addEventListener('click', () => {
  pendingSuggestedTag = tagSearch.value.trim().replace(/\s+/g, ' ');
  if (!pendingSuggestedTag) return;
  suggestionTagInput.value = pendingSuggestedTag.slice(0, 40);
  suggestionNoteInput.value = '';
  suggestionForm.hidden = false;
  suggestionFeedback.textContent = '';
  suggestionNote.hidden = false;
  suggestionTagInput.focus({ preventScroll: true });
});

cancelSuggestion.addEventListener('click', () => {
  suggestionNote.hidden = true;
  tagSearch.focus({ preventScroll: true });
});

suggestionForm.addEventListener('submit', async event => {
  event.preventDefault();
  const tag = suggestionTagInput.value.trim().replace(/\s+/g, ' ');
  if (!tag) return;
  if (getAllTags().includes(tag.toLowerCase())) {
    suggestionFeedback.textContent = 'THIS TAG IS ALREADY IN THE ARCHIVE.';
    return;
  }
  if (!SUGGEST_TAG_FORM_ENDPOINT.trim()) {
    suggestionFeedback.textContent = 'SUGGESTIONS ARE NOT CONNECTED YET.';
    return;
  }

  const data = new FormData(suggestionForm);
  data.set('tag', tag);
  data.set('category', activeCategory);
  data.set('_subject', 'Tag suggestion / The Art of Adornment');
  submitSuggestion.disabled = true;
  submitSuggestion.textContent = 'SENDING...';
  suggestionFeedback.textContent = '';

  try {
    const response = await fetch(SUGGEST_TAG_FORM_ENDPOINT.trim(), {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      suggestionFeedback.textContent = response.status === 429
        ? 'TOO MANY SUBMISSIONS. PLEASE TRY AGAIN LATER.'
        : 'COULD NOT SEND. PLEASE TRY AGAIN.';
      return;
    }
    suggestionForm.hidden = true;
    suggestionFeedback.textContent = 'THANK YOU! YOUR TAG WAS SENT FOR REVIEW.';
  } catch {
    suggestionFeedback.textContent = 'CONNECTION FAILED. PLEASE TRY AGAIN.';
  } finally {
    submitSuggestion.disabled = false;
    submitSuggestion.textContent = 'SUBMIT SUGGESTION ↗';
  }
});

function changeResearch(category) {
  const isAll = category === 'all';
  researchAll.hidden = !isAll;
  researchCategory.hidden = isAll;
  if (!isAll) {
    const content = categoryContent[category];
    const title = make('h1', '', content.title);
    const intro = make('p', 'inquiry-intro', content.intro);
    const sections = [
      [
      'My connection',
      'Personal writing for this category will go here.',
      content.personal
      ],
      ['History & culture', 'My historical and cultural research will go here.', content.historyHtml],
      ['Research & perspectives', 'Article quotations and citation links will go here.', researchPerspectivesHtml[category]]
    ];
    const nodes = sections.map(([heading, paragraph, html]) => {
      const section = make('section', 'inquiry-section');
      const body = make('p', '', paragraph);
      if (html) body.innerHTML = html;
      section.append(make('h2', '', heading), body);
      return section;
    });
    researchCategory.replaceChildren(title, intro, ...nodes);
  }
  inquiryPanel.scrollTop = 0;
  categoryNav.classList.remove('is-hidden');
  lastResearchScroll = 0;
}

function renderArchive(category = activeCategory) {
  const visibleItems = getVisibleItems();

  if (swiper) {
    swiper.destroy(true, true);
    swiper = undefined;
  }
  slideWrapper.replaceChildren();
  const gridCards = [...visibleItems]
  .sort((a, b) => Number(a.id) - Number(b.id))
  .map(gridPiece);
  gridCards.forEach((card, index) => {
    card.style.setProperty('--grid-delay', `${240 + Math.min(index, 24) * 45}ms`);
  });
  gridContainer.replaceChildren(...gridCards);
  if (!visibleItems.length) {
    gridContainer.append(make('p', 'grid-empty', 'NO REFERENCES MATCH THE CURRENT CATEGORY AND TAGS.'));
  }
  updateFilterInterface(visibleItems.length);
  gridTotal.textContent = `${String(visibleItems.length).padStart(2, '0')} REFERENCES / THE ART OF ADORNMENT`;
  gridTitle.textContent = category === 'all'
    ? 'ALL REFERENCES'
    : `${categoryContent[category].title.toUpperCase()} REFERENCES`;
  hoverTitle.classList.remove('is-on');

if (!visibleItems.length) {
  const slide = make('div', 'swiper-slide empty-slide');
  slide.append(make('p', 'archive-empty', selectedTags.size ? 'NO REFERENCES MATCH THESE TAGS' : 'NO REFERENCES IN THIS CATEGORY YET'));
  slideWrapper.append(slide);
  countLabel.textContent = '00 / 00';
  return;
}

const piecesPerSlide = 6;
const numberOfSlides = Math.ceil(visibleItems.length / piecesPerSlide);

for (let i = 0; i < visibleItems.length; i += piecesPerSlide) {
  const slide = make('div', `swiper-slide layout-${((i / piecesPerSlide) + archiveLayoutStart) % 4}`);
  visibleItems.slice(i, i + piecesPerSlide).forEach(item => slide.append(researchPiece(item)));
  slideWrapper.append(slide);
}

  if (typeof Swiper === 'undefined') {
    slideWrapper.querySelectorAll('.swiper-slide').forEach((slide, i) => {
      slide.style.display = i === 0 ? 'grid' : 'none';
      if (i === 0) slide.classList.add('swiper-slide-active');
    });
    countLabel.textContent = 'Swiper failed to load — check your internet connection';
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  swiper = new Swiper('#archive-swiper', {
    direction: 'vertical',
    slidesPerView: 1,
    loop: numberOfSlides > 1,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    freeMode: reduceMotion ? false : { enabled: true, sticky: false, momentum: false },
    speed: reduceMotion ? 0 : 1000,
    mousewheel: { enabled: true, sensitivity: 0.65 },
    keyboard: { enabled: true, onlyInViewport: true },
    allowTouchMove: true,
    grabCursor: false,
    on: {
      init(instance) {
        countLabel.textContent = `${String(instance.realIndex + 1).padStart(2, '0')} / ${String(numberOfSlides).padStart(2, '0')} `;
      },
      slideChange(instance) {
        countLabel.textContent = `${String(instance.realIndex + 1).padStart(2, '0')} / ${String(numberOfSlides).padStart(2, '0')} `;
        hoverTitle.classList.remove('is-on');
      }
    }
  });
  if (!filterPanel.hidden) {
    swiper.mousewheel.disable();
    swiper.keyboard.disable();
  }
}

function selectCategory(category, addToHistory = true) {
  if (category === activeCategory) return;

  activeCategory = category;

  categoryButtons.forEach(button => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.category === category)
    );
  });

  changeResearch(category);
  renderArchive(category);

  if (addToHistory) {
    const url = new URL(window.location.href);

    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }

    window.history.pushState(null, '', url.href);
  }
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => selectCategory(button.dataset.category));
});

function syncCategoryFromUrl() {
  const urlCategory =
    new URLSearchParams(window.location.search).get('category') || 'all';

  const categoryExists = Array.from(categoryButtons).some(
    button => button.dataset.category === urlCategory
  );

  selectCategory(categoryExists ? urlCategory : 'all', false);
}

window.addEventListener('popstate', syncCategoryFromUrl);
queueMicrotask(syncCategoryFromUrl);

let lastResearchScroll = inquiryPanel.scrollTop;

inquiryPanel.addEventListener('scroll', () => {
  const currentScroll = inquiryPanel.scrollTop;
  const difference = currentScroll - lastResearchScroll;

  if (currentScroll < 75) {
    categoryNav.classList.remove('is-hidden');
  } else if (difference > 8) {
    categoryNav.classList.add('is-hidden');
  } else if (difference < -8) {
    categoryNav.classList.remove('is-hidden');
  }

  if (Math.abs(difference) > 8 || currentScroll < 75) {
    lastResearchScroll = currentScroll;
  }
}, { passive: true });

renderArchive(activeCategory);

const sparkleContainer = document.querySelector('.archive-sparkles');

if (sparkleContainer) {
  sparkleContainer.replaceChildren();

  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('span');

    function randomPosition() {
      sparkle.style.setProperty('--x', `${Math.random() * 100}%`);
      sparkle.style.setProperty('--y', `${Math.random() * 100}%`);
    }

    randomPosition();

    sparkle.style.setProperty('--s', `${6 + Math.random() * 8}px`);
    sparkle.style.setProperty('--t', `${-Math.random() * 6}s`);

    sparkle.addEventListener('animationiteration', randomPosition);

    sparkleContainer.appendChild(sparkle);
  }
}