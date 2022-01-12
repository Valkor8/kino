import {remove, render} from "../utils/render";
import SiteMenu from "../components/site-menu-and-stats";
import {FilterType} from "../const";

export class SiteMenuController {
  constructor(container, filmModel) {
    this._container = container;

    this._siteMenu = ``;
    this._filmModel = filmModel;
    this._activeFilterType = FilterType.ALL;

    this._onFilterCountChange = this._onFilterCountChange.bind(this);
    this._filmModel.setFilterCountChangeHandler(this._onFilterCountChange);

    this.cb1 = ``;
    this.cb2 = ``;
  }

  render() {
    this._siteMenu = new SiteMenu(this._filmModel.getFilmsAll());

    render(this._container, this._siteMenu);

    this._siteMenu.onFilterClick(this._filterClickChangeHandler());
  }

  _onFilterCountChange() {
    remove(this._siteMenu);

    this._siteMenu = new SiteMenu(this._filmModel.getFilmsAll());

    render(this._container, this._siteMenu, `afterbegin`);

    this._siteMenu.onFilterClick(this._filterClickChangeHandler());

    this._siteMenu.onShowAndHideStats(this.cb1);
    this._siteMenu.onFilterClick(this.cb2);
  }

  _onFilterChange(filterType) {
    this._filmModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _filterClickChangeHandler() {
    return (evt) => {
      Array.from(this._siteMenu.getElement().querySelectorAll(`.main-navigation__item`)).forEach((item) => {
        if (item.classList.contains(`main-navigation__item--active`)) {
          item.classList.remove(`main-navigation__item--active`);
        }
      });
      evt.target.classList.add(`main-navigation__item--active`);
      if (evt.target.dataset.name === FilterType.WATCHLIST) {
        this._onFilterChange(evt.target.dataset.name);
        this._siteMenu.changeActive(`WATCHLIST`);
      } if (evt.target.dataset.name === FilterType.HISTORY) {
        this._onFilterChange(evt.target.dataset.name);
        this._siteMenu.changeActive(`HISTORY`);
      } if (evt.target.dataset.name === FilterType.FAVORITES) {
        this._onFilterChange(evt.target.dataset.name);
        this._siteMenu.changeActive(`FAVORITES`);
      } if (evt.target.dataset.name === FilterType.ALL) {
        this._onFilterChange(evt.target.dataset.name);
        this._siteMenu.changeActive(`ALL`);
      }
    };
  }

  movieAndStatsToggle(cb1, cb2) {
    this.cb1 = cb1;
    this.cb2 = cb2;
    this._siteMenu.onShowAndHideStats(this.cb1);
    this._siteMenu.onFilterClick(this.cb2);
  }
}
