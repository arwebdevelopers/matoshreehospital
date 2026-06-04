"use strict";

// For fixed Navigation
$(window).scroll(function () {
  if ($(this).scrollTop() > 40) {
    $('.navbar').addClass('fixed-top');
  } else {
    $('.navbar').removeClass('fixed-top');
  }
});

var TxtType = function TxtType(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');

  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');

    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  } // INJECT CSS


  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from: $(this).data('from'),
        to: $(this).data('to'),
        speed: $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals: $(this).data('decimals')
      }, options); // how many times to update the value, and how much to increment the value on each update

      var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops; // references & variables that will change with each update

      var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('countTo') || {};
      $self.data('countTo', data); // if an existing interval can be found, clear it first

      if (data.interval) {
        clearInterval(data.interval);
      }

      data.interval = setInterval(updateTimer, settings.refreshInterval); // initialize the element with the starting value

      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;
        render(value);

        if (typeof settings.onUpdate == 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,
    // the number the element should start at
    to: 0,
    // the number the element should end at
    speed: 1000,
    // how long it should take to count between the target numbers
    refreshInterval: 100,
    // how often the element should be updated
    decimals: 0,
    // the number of decimal places to show
    formatter: formatter,
    // handler for formatting the value before rendering
    onUpdate: null,
    // callback method for every time the element is updated
    onComplete: null // callback method for when the element finishes updating

  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
})(jQuery);

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
    formatter: function formatter(value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  }); // start all the timers

  $('.timer').each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
});
$('#testimonial-slider1').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  smartSpeed: 2000,
  autoplay: 5000,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 5
    },
    1200: {
      items: 5
    }
  }
});
var modalId = $('#image-gallery');
$(document).ready(function () {
  loadGallery(true, 'a.thumbnail'); //This function disables buttons when needed

  function disableButtons(counter_max, counter_current) {
    $('#show-previous-image, #show-next-image').show();

    if (counter_max === counter_current) {
      $('#show-next-image').hide();
    } else if (counter_current === 1) {
      $('#show-previous-image').hide();
    }
  }
  /**
   *
   * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
   * @param setClickAttr  Sets the attribute for the click handler.
   */


  function loadGallery(setIDs, setClickAttr) {
    var current_image,
        selector,
        counter = 0;
    $('#show-next-image, #show-previous-image').click(function () {
      if ($(this).attr('id') === 'show-previous-image') {
        current_image--;
      } else {
        current_image++;
      }

      selector = $('[data-image-id="' + current_image + '"]');
      updateGallery(selector);
    });

    function updateGallery(selector) {
      var $sel = selector;
      current_image = $sel.data('image-id');
      $('#image-gallery-title').text($sel.data('title'));
      $('#image-gallery-image').attr('src', $sel.data('image'));
      disableButtons(counter, $sel.data('image-id'));
    }

    if (setIDs == true) {
      $('[data-image-id]').each(function () {
        counter++;
        $(this).attr('data-image-id', counter);
      });
    }

    $(setClickAttr).on('click', function () {
      updateGallery($(this));
    });
  }
});

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline"; // btnText.innerHTML = "Read more"; 

    moreText.style.display = "none";
  } else {
    dots.style.display = "none"; // btnText.innerHTML = "Read less"; 

    btnText.style.display = "none";
    moreText.style.display = "inline";
  }
} // Blog listing 


document.addEventListener("DOMContentLoaded", function () {
  var blogItems = document.querySelectorAll(".blog-item");
  var loadMoreBtn = document.getElementById("loadMore");
  var visibleItems = 9;

  function showItems() {
    blogItems.forEach(function (item, index) {
      if (index < visibleItems) {
        item.style.display = "block";
      }
    });

    if (visibleItems >= blogItems.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  showItems();
  loadMoreBtn.addEventListener("click", function () {
    visibleItems += 6;
    showItems();
  });
});