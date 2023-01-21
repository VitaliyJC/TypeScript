import { renderBlock } from './lib.js'

export class User {
  userName: string
  avatarUrl: string
  constructor(userName:string, avatarUrl:string) {
    this.userName = userName
    this.avatarUrl = avatarUrl
  }
}

export type favoriteItemsAmount = number;

export function getUserData(value: unknown): Object | string {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (typeof userData === 'object') {   
    return new User(userData.userName, userData.avatarUrl);
  }
  return 'Авторизуйтесь'
}

export function getFavoritesAmount(value: unknown): number {
  const favoriteItemsAmount = JSON.parse(localStorage.getItem('favoritesAmount'));
  if (favoriteItemsAmount) {
    return favoriteItemsAmount
  }
  return 0
}

export function renderUserBlock (userName: string, avatarUrl: string, favoriteItemsAmount?: number): void {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
