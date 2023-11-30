document.addEventListener('DOMContentLoaded', function () {
  const animatedBlocks = document.querySelectorAll('.animated');

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    animatedBlocks.forEach(function (animatedBlock) {
      if (isElementInViewport(animatedBlock)) {
        animatedBlock.classList.add('animate');
      }
    });
  }
  document.addEventListener('scroll', handleScroll);
});

// add up button

const btnUp = {
  el: document.querySelector('.btn-up'),
  scrolling: false,
  show() {
    if (this.el.classList.contains('btn-up_hide')) {
      this.el.classList.remove('btn-up_hide');
    }
  },
  hide() {
    if (!this.el.classList.contains('btn-up_hide')) {
      this.el.classList.add('btn-up_hide');
    }
  },
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (this.scrolling && scrollY > 0) {
        return;
      }
      this.scrolling = false;

      if (scrollY > 300) {
        this.show();
      } else {
        this.hide();
      }
    });

    document.querySelector('.btn-up').onclick = () => {
      this.scrolling = true;
      this.hide();

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  },
};

const result = btnUp.addEventListener();
