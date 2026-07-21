import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import axios from 'axios';

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  timeout: 3000,
  messageMaxLength: 110,
  plainText: true,
  showOnlyTheLastOne: false,
  pauseOnHover: true,
  zindex: 4001,
  fontFamily: 'Montserrat',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade',
  closeButton: false,
  useIcon: true,
  success: {
    background: '#c99a00',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(201,154,0,0.25)',
  },
});

document.addEventListener('DOMContentLoaded', function () {
  // Анімація при скролі через IntersectionObserver
  const animatedBlocks = document.querySelectorAll('.animated');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  animatedBlocks.forEach(el => observer.observe(el));

  // Кнопка "Повернутися до початку"
  const btnUp = document.querySelector('.btn-up');

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    btnUp.classList.toggle('btn-up_hide', scrollY <= 300);
  });

  btnUp.addEventListener('click', function () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    btnUp.classList.add('btn-up_hide');
  });

  // Копіювання промокоду
  const promocodeElements = document.querySelectorAll('.info__promocode');

  function showCopiedMessage(element) {
    const messageElement = document.createElement('span');
    messageElement.innerText = 'Скопійовано';
    messageElement.className = 'info__copied-message';
    element.appendChild(messageElement);

    setTimeout(() => (messageElement.style.opacity = '1'), 10);
    setTimeout(() => {
      messageElement.style.opacity = '0';
      setTimeout(() => element.removeChild(messageElement), 300);
    }, 1800);
  }

  promocodeElements.forEach(element => {
    element.addEventListener('click', function () {
      navigator.clipboard
        .writeText(element.innerText.replace(/\s*$/, '').trim())
        .then(() => showCopiedMessage(element))
        .catch(() => {
          const ta = document.createElement('textarea');
          ta.value = element.innerText.trim();
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showCopiedMessage(element);
        });
    });
  });

  // Прокрутка по якорю з центруванням
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Модальне вікно
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

  function handleKeydown(e) {
    if (e.key === 'Escape' && !modal.classList.contains('is-hidden')) {
      toggleModal();
    }
  }

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) toggleModal();
  });
  modal.querySelector('.modal').addEventListener('click', e => e.stopPropagation());
  document.addEventListener('keydown', handleKeydown);

  async function onSubmit(e) {
    e.preventDefault();
    const name = form.querySelector('.modal__input').value;
    const comment = form.querySelector('.modal__textarea').value;

    try {
      Loading.dots('Пакуємо Ваш коментар...', { svgColor: '#c99a00' });

      const response = await axios.post(
        'https://choe-misha-discont-backend.onrender.com/sendEmail',
        { name, comment },
        { headers: { 'Content-Type': 'application/json' } }
      );

      Loading.remove();

      if (response.status === 201) {
        Notiflix.Notify.success('Дякуємо за ваш коментар!');
        toggleModal();
        clearFormFields();
      } else {
        Notiflix.Notify.failure('Повідомлення не надіслано!');
      }
    } catch (error) {
      Loading.remove();
      Notiflix.Notify.failure('Сталася помилка при надсиланні.');
      console.error('Error sending email:', error);
    }
  }

  function clearFormFields() {
    form.querySelector('.modal__input').value = '';
    form.querySelector('.modal__textarea').value = '';
  }

  async function wakeUpBackend() {
    try {
      await axios.get('https://choe-misha-discont-backend.onrender.com/ping');
    } catch {
      // бекенд на render.com може спати — це нормально
    }
  }

  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);
  form.addEventListener('submit', onSubmit);
});
