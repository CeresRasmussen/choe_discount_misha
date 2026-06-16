import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import axios from 'axios';

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(38,192,211,0.8)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,
  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade',
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic',
  fontAwesomeIconSize: '34px',
  success: {
    background: '#26c0d3',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.8)',
  },
});

document.addEventListener('DOMContentLoaded', function () {
  // // Анімація елементів при прокрутці сторінки
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

  function handleInitialScroll() {
    animatedBlocks.forEach(function (animatedBlock) {
      if (isElementInViewport(animatedBlock)) {
        animatedBlock.classList.add('animate');
      }
    });
    document.removeEventListener('scroll', handleInitialScroll);
  }

  handleInitialScroll();

  document.addEventListener('scroll', function () {
    animatedBlocks.forEach(function (animatedBlock) {
      if (isElementInViewport(animatedBlock)) {
        animatedBlock.classList.add('animate');
      }
    });
  });

  // Показ або приховання кнопки "Повернутися до початку"
  const btnUp = document.querySelector('.btn-up');

  function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 300) {
      btnUp.classList.remove('btn-up_hide');
    } else {
      btnUp.classList.add('btn-up_hide');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  window.addEventListener('scroll', handleScroll);
  btnUp.addEventListener('click', function () {
    scrollToTop();
    btnUp.classList.add('btn-up_hide');
  });

  // // Копіювання тексту при кліку на елементи з промокодом і відображення повідомлення про копіювання
  const promocodeElements = document.querySelectorAll('.info__promocode');

  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  function showCopiedMessage(element) {
    const messageElement = document.createElement('span');
    messageElement.innerText = 'Промокод скопійовано';
    messageElement.className = 'info__copied-message';

    element.appendChild(messageElement);

    setTimeout(function () {
      messageElement.style.opacity = '1';
    }, 10);

    setTimeout(function () {
      messageElement.style.opacity = '0';

      setTimeout(function () {
        element.removeChild(messageElement);
      }, 300);
    }, 2000);
  }

  promocodeElements.forEach(function (element) {
    element.addEventListener('click', function () {
      copyToClipboard(element.innerText);
      showCopiedMessage(element);
    });
  });

  // Прокрутка по якорю з центруванням
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    });
  });

  // Робота з модальним вікном
  const openModalBtn = document.querySelector('[data-modal-open]');
  const closeModalBtn = document.querySelector('[data-modal-close]');
  const modal = document.querySelector('[data-modal]');
  const backdrop = document.querySelector('.backdrop');
  const form = document.querySelector('.modal__form-field');

  function toggleModal() {
    const isHidden = modal.classList.contains('is-hidden');
    modal.classList.toggle('is-hidden');
    document.body.classList.toggle('modal-open');

    if (isHidden) {
      wakeUpBackend();
    }
  }

  function handleBackdropClick(event) {
    if (event.target === backdrop) {
      toggleModal();
    }
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  // async function onSubmit(e) {
  //   e.preventDefault();
  //   const name = form.querySelector('.modal__input').value;
  //   const comment = form.querySelector('.modal__textarea').value;

  //   try {
  //     Loading.dots('Пакуємо Ваш коментар... Це може зайняти час...', {
  //       svgColor: 'coral',
  //     });

  //     // Пробуджуємо бекенд
  //     await axios.get(
  //       // 'https://choe-misha-discont-backend.onrender.com/ping'
  //       'http://localhost:3000/ping'
  //     );
  //     Loading.remove();
  //     toggleModal();
  //     clearFormFields();
  //     Notiflix.Notify.success('Дякуємо за ваш коментар!');
  //     await new Promise(resolve => setTimeout(resolve, 1500));

  //     const response = await axios.post(
  //       // 'https://choe-misha-discont-backend.onrender.com/sendEmail',
  //       'http://localhost:3000/sendEmail',
  //       { name, comment },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       // Notiflix.Notify.success('Дякуємо за ваш коментар!');
  //       // toggleModal();
  //       // clearFormFields();
  //     } else {
  //       Notiflix.Notify.failure('Повідомлення не надіслано!');
  //     }
  //   } catch (error) {
  //     Loading.remove();
  //     console.error('Помилка при надсиланні:', error);
  //     Notiflix.Notify.failure('Сталася помилка при надсиланні.');
  //   }
  // }
  async function onSubmit(e) {
    e.preventDefault();
    const name = form.querySelector('.modal__input').value;
    const comment = form.querySelector('.modal__textarea').value;

    try {
      Loading.dots('Пакуємо Ваш коментар...', {
        svgColor: 'coral',
      });
      setTimeout(() => {
        Loading.remove();
        Notiflix.Notify.success('Дякуємо за ваш коментар!');
        toggleModal();
      }, 1000);
      const response = await axios.post(
        'https://choe-misha-discont-backend.onrender.com/sendEmail',
        // 'http://localhost:3000/sendEmail',
        { name, comment },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        // Notiflix.Notify.success('Дякуємо за ваш коментар!');
        console.log('Дякуємо за ваш коментар!');
        clearFormFields();
      } else {
        // Notiflix.Notify.failure('Повідомлення не надіслано!');
        console.log('Повідомлення не надіслано!');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  function clearFormFields() {
    form.querySelector('.modal__input').value = '';
    form.querySelector('.modal__textarea').value = '';
  }

  async function wakeUpBackend() {
    try {
      await axios.get(
        'https://choe-misha-discont-backend.onrender.com/ping'
        // 'http://localhost:3000/ping'
      );
      console.log('Бекенд прокинуто');
    } catch (error) {
      console.warn('Не вдалося прокинути бекенд:', error);
    }
  }
  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);
  backdrop.addEventListener('click', handleBackdropClick);
  modal.addEventListener('click', handleModalClick);
  form.addEventListener('submit', onSubmit);
});
