import { getFormData, renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { getFavoritesAmount, getUserData, renderUserBlock, User } from './user.js';
import { renderBlock, renderToast } from './lib.js';
window.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('user', JSON.stringify({ userName: 'Den Warren', avatarUrl: './img/avatar.png' }));
    localStorage.setItem('favoritesAmount', JSON.stringify(1));
    let user = getUserData(localStorage.getItem('user'));
    let favoritesAmount = getFavoritesAmount(localStorage.getItem('favoritesAmount'));
    if (user instanceof User && favoritesAmount === 0) {
        renderUserBlock(user.userName, user.avatarUrl);
    }
    if (user instanceof User && favoritesAmount) {
        renderUserBlock(user.userName, user.avatarUrl, favoritesAmount);
    }
    renderSearchFormBlock();
    renderSearchStubBlock();
    if (typeof user === 'string') {
        renderToast({
            text: `${user}`,
            type: 'success',
        }, {
            name: 'Понял',
            handler: () => {
                console.log('Уведомление закрыто');
            },
        });
        renderBlock('user-block', `<br/><p>${user}</p>`);
    }
    getFormData();
});