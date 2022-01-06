import {render} from "../utils/render";
import SiteMenu from "../components/site-menu-and-stats";
import Movies from "../models/movies";

export class SiteMenuController {
  constructor(container, siteMenuModel) {
    this._container = container;

    this._siteMenuModel = siteMenuModel;
  }

  render() {
    this._siteMenu = new SiteMenu(this._siteMenuModel.getFilms());
    render(this._container, this._siteMenu);
  }
}
