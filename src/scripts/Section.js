export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;

    this._containerSelector = containerSelector;
  }

  renderAll() {
    this._items.forEach((item) => {
      this._renderer(item);
      })
  } // отрисовывает все элементы. отрисовка каждого конкретного эл-та осуществляется функцией renderer из конструктора или же другой вариант - ниже
  
  addItem(item) {
    this._containerSelector.prepend(item);
  } // принимает ДОМ-элемент и добавляет его в контейнер

    // TODO надо предварительно в card.js задать элементу карточки id
    removeItem(id) {
      document.getElementById(id).remove();
    } // принимает ДОМ-элемент и удаляет его

  // ! У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
}