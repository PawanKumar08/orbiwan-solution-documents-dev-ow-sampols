$(function () {
  var isSmallScreen = checkSmallScreen()
  $(window).resize(function () {
    isSmallScreen = checkSmallScreen()
  })
  function checkSmallScreen() {
    return window.innerWidth < 899 ? true : false
  }
  var doc = $(document)
  var lang = document.location.pathname.split('/')[1]
  $('#navmenu ul ul')
    .find('a[href="' + document.location.pathname + '"]')
    .addClass('current')
  $('#top').click(function (e) {
    $('html, body').animate({ scrollTop: 0 }, 500)
    return false
  })
  var added
  doc.scroll(function (e) {
    if (doc.scrollTop() > 5) {
      if (added) return
      added = true
      $('body').addClass('scroll')
    } else {
      $('body').removeClass('scroll')
      added = false
    }
  })

  $('code.language-js').each(function () {
    $(this).addClass('language-javascript').removeClass('language-js')
  })
  $('code.language-sh').each(function () {
    $(this).parent().addClass('language-sh')
  })
  Prism.highlightAll()

  $(window).bind('load resize', function () {
    $('#menu').css('height', $(this).height() - 150 + 'px')
  })
  $('#nav-button, #overlay').click(function () {
    $('#navmenu').toggle()
    $('#overlay').toggle()
  })
  // single handle for menu
  $('.ow-menu').dropit({ action: 'click' })

  $('#navmenu > li').click(function () {
    if ($(this).find('ul').length) {
      if ($(this).hasClass('active-mobile-menu')) {
        $(this).removeClass('active-mobile-menu')
        $(this).find('.dropit .dropit-submenu').hide()
      } else {
        $('.dropit .dropit-submenu').hide()
        $(this).find('.dropit .dropit-submenu').show()
        $('#navmenu li.active-mobile-menu').removeClass('active-mobile-menu')
        $(this).addClass('active-mobile-menu')
      }
    } else if (isMobile.any || isSmallScreen) {
      var path = $(this).find('a').attr('href')
      document.location = path
    }
  })
  $('.dropit-trigger a').click(function (e) {
    if (window.matchMedia('(max-width: 899px)').matches) {
      e.preventDefault()
    }
  })
  $('.dropit-submenu li').click(function () {
    if (isMobile.any || isSmallScreen) {
      var path = $(this).find('a').attr('href')
      document.location = path
    }
  })
  if (readCookie('i18nClose')) {
    $('#i18n-notice-box').hide()
  } else {
    $('#close-i18n-notice-box').on('click', function () {
      $('#i18n-notice-box').hide()
      createCookie('i18nClose', 1)
    })
  }
})
function createCookie(name, value, days) {
  var expires
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toGMTString()
  } else {
    expires = ''
  }
  document.cookie =
    encodeURIComponent(name) +
    '=' +
    encodeURIComponent(value) +
    expires +
    '; path=/'
}
function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
  }
  return null
}
function eraseCookie(name) {
  createCookie(name, '', -1)
}

function makeSideBar() {
  console.log('I am ready to make a sidebar')

  //     <ul id="menu">
  //     <li id="m_login"><a href="#login">Login</a></li>
  //     <li id="m_add_devices"><a href="#add-device">Add Devices</a>
  //         <ul id="m_add_devices_sub_menu">
  //         <li id="m_abp_activation"><a href="#device-join-via-abp-activation">ABP Activation</a></li>
  //         <li id="m_otaa_activation"><a href="#device-join-via-otaa-activation">OTAA Activation</a></li>
  //         </ul>
  //     </li>
  //     <li id="m_assign_app"><a href="#assign-application">Assign Application</a></li>
  // </ul>
  let html = ''
  let prev_tag = ''
  let curr_tag = ''
  let start = true
  let ul_opened = false
  let last_menu = ''
  $('.ow-content h1, .ow-content h2, .ow-content h3').each(function () {
    let str = $(this).prop('tagName') + ' - ' + $(this).prop('id') + ' -- '

    let headingContent = $(this).html()

    if (headingContent.length > 30)
      headingContent = headingContent.substring(0, 30) + '..'

    if (start) {
      html = '<ul id="menu">'
    }
    curr_tag = parseInt($(this).prop('tagName').substring(1))
    // if (prev_tag == '')
    {
      html +=
        '<li id="m_' +
        $(this).attr('id') +
        '"><a class="heading_' +
        curr_tag +
        '" href="#' +
        $(this).attr('id') +
        '">' +
        headingContent +
        '</a>'
      last_menu = $(this).attr('id')
      console.log(str + 'Starting new heading')
      // } else {
      // if (prev_tag < curr_tag) {
      // start a sub heading
      // html += '<ul id="m_' + last_menu + '_sub_menu">';
      // html += '<li id="m_' + $(this).attr('id') + '"><a class="heading_' + curr_tag + '" href="#' + $(this).attr('id') + '">' + headingContent + '</a>';
      // ul_opened = true;
      // } else if (prev_tag == curr_tag) {
      // continue on last heading
      // html += '</li>';
      // html += '<li id="m_' + $(this).attr('id') + '"><a class="heading_' + curr_tag + '" href="#' + $(this).attr('id') + '">' + headingContent + '</a>';
      // } else if (prev_tag > curr_tag) {
      if (ul_opened) {
        ul_opened = false
        html += '</ul>'
        html += '</li>'
      }
      // html += '<li id="m_' + $(this).attr('id') + '"><a class="heading_' + curr_tag + '" href="#' + $(this).attr('id') + '">' + headingContent + '</a>';
      // }
    }
    prev_tag = curr_tag
    if (start) start = false
  })
  html += '</li>'
  html += '</ul>'
  console.log(html)
  $('.ow-content').append(html)

  setTimeout(() => {
    // Scroll Spy
    setupScrollSpy()
  }, 2000)
}

function setupScrollSpy() {
  const sections = document.querySelectorAll(
    '.ow-content h1,.ow-content h2,.ow-content h3',
  )
  const menu_links = document.querySelectorAll('#menu li a')
  let currentActive = 0
  const sectionMargin = 200
  const makeActive = (link) => {
    if (menu_links[link]) {
      menu_links[link].classList.add('active')
      // menu_links[link].parentElement.parentElement.classList.add('active');
      // menu_links[link].parentElement.parentElement.parentElement.classList.add('active');
    }
  }

  const removeActive = (link) => {
    if (menu_links[link]) {
      menu_links[link].classList.remove('active')
      // menu_links[link].parentElement.parentElement.classList.remove('active');
      // menu_links[link].parentElement.parentElement.parentElement.classList.remove('active');
    }
  }
  const removeAllActive = () =>
    [...Array(sections.length).keys()].forEach((link) => removeActive(link))
  window.addEventListener('scroll', () => {
    const current =
      sections.length -
      [...sections]
        .reverse()
        .findIndex(
          (section) => window.scrollY >= section.offsetTop - sectionMargin,
        ) -
      1
    if (current !== currentActive) {
      removeAllActive()
      currentActive = current
      makeActive(current)
    }
  })
}
function showSearchResults(results) {
  console.log(results.hits)
}

var headings_ = []
var prev = null
$(document).ready(function () {
  $('a.refLink.comingSoon').on('click', function () {
    alert('Link will be activated soon')
  })

  // Make sidebar
  setTimeout(() => {
    //makeSideBar();
  }, 2000)

  // $("#orbiwise-doc-search").on('keyup', function () {
  //     const keyword = $("#orbiwise-doc-search").val();
  //     if (keyword.length > 2) {
  //         // call backend to get the user status..
  //         $.ajax({
  //             url: "http://127.0.0.1:12123/content-search?q=" + keyword,
  //             dataType: "json",
  //             success: function (result) {
  //                 showSearchResults(result);
  //             }
  //         });
  //     }
  // });

  // image zooming
  // $('.ow-content img').on('click', function() {
  //     console.log($(this).prop('src'));
  //     console.log(($(window).width() - 200));
  //     $('.imageZoomDialog .imageToZoom img').prop('src', $(this).prop('src'));
  //     $('.imageZoomDialog').dialog({
  //         closeOnEscape: true,
  //         // width: 'auto',
  //         maxWidth: ($(window).width() - 200),
  //         title: 'Press Esc to close.',
  //         modal: true
  //     });
  // });

  // show the menu
  $('#navmenu').removeClass('hidden')
  $('#orbiwise-doc-search').removeClass('hidden')
})
