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
