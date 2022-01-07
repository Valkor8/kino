import {remove, render} from "../utils/render";
import SiteMenu from "../components/site-menu-and-stats";
import {FilterType} from "../const";

export class SiteMenuController {
  constructor(container, filmModel) {
    this._container = container;

    this._siteMenu = ``;
    this._filmModel = filmModel;
    this._activeFilterType = FilterType.ALL;
  }

  render() {
    this._siteMenu = new SiteMenu(this._filmModel.getFilmsAll());

    render(this._container, this._siteMenu);
    this._siteMenu.onFilterClick((evt) => {
      Array.from(this._siteMenu.getElement().querySelectorAll(`.main-navigation__item`)).forEach((item) => {
        if (item.classList.contains(`main-navigation__item--active`)) {
          item.classList.remove(`main-navigation__item--active`);
        }
      });
      evt.target.classList.add(`main-navigation__item--active`);
      if (evt.target.dataset.name === FilterType.WATCHLIST) {
        this._onFilterChange(evt.target.dataset.name);
      } if (evt.target.dataset.name === FilterType.HISTORY) {
        this._onFilterChange(evt.target.dataset.name);
      } if (evt.target.dataset.name === FilterType.FAVORITES) {
        this._onFilterChange(evt.target.dataset.name);
      } if (evt.target.dataset.name === FilterType.ALL) {
        this._onFilterChange(evt.target.dataset.name);
      }
    });
  }

  _onFilterChange(filterType) {
    this._filmModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }
}
