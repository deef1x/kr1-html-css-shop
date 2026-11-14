// Работа с модальным окном на главной странице.
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const cancelDialogButton = document.getElementById('cancel-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderDialog && selectedProductInput) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProductInput.value = button.dataset.product || '';
      orderDialog.showModal();
    });
  });

  if (closeDialogButton) {
    closeDialogButton.addEventListener('click', () => orderDialog.close());
  }

  if (cancelDialogButton) {
    cancelDialogButton.addEventListener('click', () => orderDialog.close());
  }
}

// Клиентская проверка формы на главной и на странице заявки.
// Данные не отправляются на сервер — это учебная демонстрация.
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      orderForm.reportValidity();
      return;
    }

    if (successMessage) {
      successMessage.hidden = false;
    }

    orderForm.reset();

    if (orderDialog && orderDialog.open) {
      orderDialog.close();
    }
  });
}
