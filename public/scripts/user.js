import { renderBlock } from './lib.js';
export class User {
    constructor(userName, avatarUrl) {
        this.userName = userName;
        this.avatarUrl = avatarUrl;
    }
}
export function getUserData(value) {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (typeof userData === 'object') {
        return new User(userData.userName, userData.avatarUrl);
    }
    return 'Авторизуйтесь';
}
export function getFavoritesAmount(value) {
    const favoriteItemsAmount = JSON.parse(localStorage.getItem('favoritesAmount'));
    if (favoriteItemsAmount) {
        return favoriteItemsAmount;
    }
    return 0;
}
export function renderUserBlock(userName, avatarUrl, favoriteItemsAmount) {
    const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
