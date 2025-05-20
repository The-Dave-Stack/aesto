menuOpen();
LoadMorePagination();

let disableSubmenusClickInterval = null;
let disableSubmenusClickIntervalCounter = 10;
// Call the function to start lazy loading
document.addEventListener('DOMContentLoaded', function () {
  setupLightbox();
  lazyLoadImages();
  resizeGalleryImages();
  languageSelector();
  disableSubmenusClickInterval = setInterval(() => disableSubmenusClick(), 1000);
});

// Disable submenus click
function disableSubmenusClick() {
  const menuItems = document.querySelectorAll('.nav li.menu-item-has-children > a, .nav li.mL-has-submenu > a');

  menuItems.forEach(function (menuLink, idx) {
    if (menuLink.getAttribute('href') && menuLink.getAttribute('href')) {

      menuLink.addEventListener('click', function (event) {
        event.preventDefault();

        const parentLi = menuLink.closest('li');

        if (parentLi) {
          const isExpanded = parentLi.classList.contains('submenu-open');
          menuLink.setAttribute('aria-expanded', isExpanded.toString());
        }
      });
    }
  });

  if (menuItems.length === 0 && disableSubmenusClickIntervalCounter > 0) {
    disableSubmenusClickIntervalCounter--;
  } else {
    disableSubmenusClickIntervalCounter = -1;
    clearInterval(disableSubmenusClickInterval);
  }
}

// language selector
function changeLanguage(language) {
  // Get the URL from the selected option's data-url attribute
  const selectedOption = document.querySelector(`#language-dropdown option[value="${language}"]`);
  const newUrl = selectedOption.getAttribute('data-url');

  // Get the current path (everything after the domain)
  const currentPath = window.location.pathname;

  // Navigate to the new domain with the current path
  //console.log('Language Selector:', `${domain}${currentPath}`);
  window.location.href = `${newUrl}${currentPath}`;
}

// Set selected language based on current URL
function languageSelector() {
  // Check if the dropdown exists
  const dropdown = document.getElementById('language-dropdown');
  if (!dropdown) return;

  const currentDomain = window.location.hostname;
  //console.log('Current Domain:', currentDomain);

  if (currentDomain.startsWith('en.')) {
    dropdown.value = 'en';
  } else if (currentDomain.startsWith('es.')) {
    dropdown.value = 'es';
  } else if (currentDomain.startsWith('zh.')) {
    dropdown.value = 'zh';
  }
}

//gallery
function resizeGalleryImages() {
  var images = document.querySelectorAll('.kg-gallery-image img');
  images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.getAttribute('width');
    var height = image.getAttribute('height');
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });
}

// Toggle the menu open and close when on mobile
function menuOpen() {
  const burgerButton = document.querySelector('.it-burger');
  burgerButton.addEventListener('click', function () {
    document.body.classList.toggle('it-head-open');
  });
}

// Dark/Light Mode

var html = document.querySelector('html'),
  darkLight = document.querySelector('.it-dark-light');
darkLight.addEventListener('click', function () {
  if (html.getAttribute('data-theme') === 'light') {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('selected-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('selected-theme', 'light');
  }
  console.log(html.hasAttribute('data-theme'));
});

//Light Box
function setupLightbox() {
  const images = document.querySelectorAll('.kg-image-card .kg-image, .kg-gallery-image img ');
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'v-lightbox-overlay';
  document.body.appendChild(lightboxOverlay);

  const styles = `
    .kg-image-card .kg-image, .kg-gallery-image img {
      cursor: zoom-in;
    }
    .v-lightbox-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    
    .v-lightbox-overlay.show {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
    }
    
    .v-lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      animation: lightbox-fade-in 0.3s ease;
    }
    
    @keyframes lightbox-fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    .v-lightbox-image {
      display: block;
      max-width: 100%;
      max-height: 100%;
      margin: 0 auto;
    }
    
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .v-lightbox-overlay.show {
        align-items: flex-start;
      }
    
      .v-lightbox-content {
        width: 90%;
        max-height: 90vh;
        animation: lightbox-fade-in 0.3s ease;
      }
    }
    
    `;

  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  function openLightbox(imageUrl, imageAlt) {
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'v-lightbox-image';
    lightboxImage.src = imageUrl;
    lightboxImage.alt = imageAlt;

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'v-lightbox-content';
    lightboxContent.appendChild(lightboxImage);

    const closeButton = document.createElement('span');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', closeLightbox);
    lightboxContent.appendChild(closeButton);

    lightboxOverlay.innerHTML = '';
    lightboxOverlay.appendChild(lightboxContent);
    lightboxOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  images.forEach(function (image) {
    image.addEventListener('click', function () {
      const imageUrl = image.getAttribute('src');
      const imageAlt = image.getAttribute('alt');
      openLightbox(imageUrl, imageAlt);
    });
  });

  lightboxOverlay.addEventListener('click', function (event) {
    if (event.target === lightboxOverlay) {
      closeLightbox();
    }
  });
}

// Lazy Load (New Lazyload Script)
function lazyLoadImages() {
  var lazyClass = 'lazy';
  var loadedClass = 'loaded';
  var dataSrcAttribute = 'data-src';
  var dataSrcsetAttribute = 'data-srcset';
  var sourceSelector = 'source';

  var lazyImages = [].slice.call(document.querySelectorAll('.' + lazyClass));

  if ('IntersectionObserver' in window) {
    var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lazyImage = entry.target;

          // Check if data-src attribute exists before updating attributes
          if (lazyImage.hasAttribute(dataSrcAttribute)) {
            lazyImage.src = lazyImage.getAttribute(dataSrcAttribute);
            lazyImage.srcset = lazyImage.getAttribute(dataSrcsetAttribute);

            // Convert sibling source elements
            var lazySources = lazyImage.parentNode.querySelectorAll(sourceSelector);
            lazySources.forEach(function (lazySource) {
              lazySource.srcset = lazySource.getAttribute(dataSrcsetAttribute);
              lazySource.removeAttribute(dataSrcsetAttribute);
            });

            lazyImage.removeAttribute(dataSrcAttribute);
            lazyImage.removeAttribute(dataSrcsetAttribute);
            lazyImage.classList.add(loadedClass);
          }

          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    lazyImages.forEach(function (lazyImage) {
      if (lazyImage.hasAttribute(dataSrcAttribute)) {
        lazyImage.src = lazyImage.getAttribute(dataSrcAttribute);
        lazyImage.srcset = lazyImage.getAttribute(dataSrcsetAttribute);

        // Convert sibling source elements
        var lazySources = lazyImage.parentNode.querySelectorAll(sourceSelector);
        lazySources.forEach(function (lazySource) {
          lazySource.srcset = lazySource.getAttribute(dataSrcsetAttribute);
          lazySource.removeAttribute(dataSrcsetAttribute);
        });

        lazyImage.classList.add(loadedClass);
        lazyImage.removeAttribute(dataSrcAttribute);
        lazyImage.removeAttribute(dataSrcsetAttribute);
      }
    });
  }
}

function LoadMorePagination() {
  // Hide the load more button
  function hideLoadMoreButton() {
    if (loadMoreButton) {
      loadMoreButton.style.display = 'none';
    }
  }

  // Append HTML elements to a wrapper element
  function appendElements(wrapper, elements) {
    elements.forEach(function (element) {
      wrapper.appendChild(element);
    });
  }

  // Update pagination state and button status
  function updatePaginationState() {
    pagination_next_page_number++;
    loadMoreButton.classList.remove('loading');
    loadMoreButton.disabled = false;

    if (pagination_next_page_number > pagination_available_pages_number) {
      loadMoreButton.disabled = true;
    }
  }

  // Handle click event for the load more button
  function handleLoadMoreClick(e) {
    e.preventDefault();
    loadMoreButton.classList.add('loading');
    loadMoreButton.disabled = true;

    if (pagination_next_page_number <= pagination_available_pages_number) {
      var url = nextPageUrl.split(/page/)[0] + 'page/' + pagination_next_page_number + '/';
      fetch(url)
        .then(function (response) {
          if (response.ok) {
            return response.text();
          }
        })
        .then(function (data) {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = data;
          var wrapper = document.querySelector('.it-postfeed');
          var html = Array.from(tempDiv.querySelectorAll('.post'));
          appendElements(wrapper, html);
          updatePaginationState();
          lazyLoadImages();
        });
    }
  }

  // Main script
  var nextLink = document.querySelector('link[rel=next]');
  var nextPageUrl, loadMoreButton, endMessage;

  // Check if there is a next link
  if (nextLink !== null) {
    nextPageUrl = nextLink.getAttribute('href');
    loadMoreButton = document.querySelector('.it-load-posts');

    // Check if the next page URL is undefined
    if (typeof nextPageUrl === 'undefined') {
      hideLoadMoreButton();
    } else {
      // Attach click event handler to the load more button
      loadMoreButton.addEventListener('click', handleLoadMoreClick);
    }
  } else {
    var paginationWrap = document.querySelector('.it-pagination');
    // Hide the load more button if there is no next link and a pagination wrapper is present
    if (paginationWrap !== null) {
      hideLoadMoreButton();
    }
  }
}
