import { renderBlock, renderToast } from './lib.js';
export class User {
    constructor(username, avatarUrl) {
        this.username = username;
        this.avatarUrl = avatarUrl;
    }
}
export function getUserData() {
    const userData = localStorage.getItem('user');
    const data = typeof userData === 'string' ? JSON.parse(userData) : undefined;
    if (typeof data === 'object' && 'username' in data && 'avatarUrl' in data) {
        return new User(data.username, data.avatarUrl);
    }
    return 'Возможно вы не залогинены!';
}
export function getFavoritesAmount() {
    const amountData = localStorage.getItem('favoritesAmount');
    const amount = typeof amountData === 'string' ? JSON.parse(amountData) : undefined;
    if (!isNaN(Number(amount))) {
        return Number(amount);
    }
    return 0;
}
export function renderUserBlock(name, avatar, favoriteItemsAmount) {
    let favoritesCaption;
    if (favoriteItemsAmount && favoriteItemsAmount > 0) {
        favoritesCaption = favoriteItemsAmount;
    }
    else {
        favoritesCaption = 'ничего нет';
    }
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="${name}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
export function renderUserInfo() {
    const user = getUserData();
    const userFavorites = getFavoritesAmount();
    if (user instanceof User && typeof userFavorites === 'number') {
        renderUserBlock(user.username, user.avatarUrl, userFavorites);
    }
    if (user instanceof User && typeof userFavorites !== 'number') {
        renderUserBlock(user.username, user.avatarUrl);
    }
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXBELE1BQU0sT0FBTyxJQUFJO0lBR2YsWUFBWSxRQUFnQixFQUFFLFNBQWlCO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQUVELE1BQU0sVUFBVSxXQUFXO0lBQ3pCLE1BQU0sUUFBUSxHQUFZLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsTUFBTSxJQUFJLEdBQUcsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDN0UsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1FBQ3pFLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDaEQ7SUFFRCxPQUFPLDRCQUE0QixDQUFDO0FBQ3RDLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCO0lBQ2hDLE1BQU0sVUFBVSxHQUFZLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNwRSxNQUFNLE1BQU0sR0FDVixPQUFPLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQzFCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsSUFBWSxFQUNaLE1BQWMsRUFDZCxtQkFBNEI7SUFFNUIsSUFBSSxnQkFBaUMsQ0FBQztJQUN0QyxJQUFJLG1CQUFtQixJQUFJLG1CQUFtQixHQUFHLENBQUMsRUFBRTtRQUNsRCxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQztLQUN4QztTQUFNO1FBQ0wsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO0tBQ2pDO0lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFNUQsV0FBVyxDQUNULFlBQVksRUFDWjs7aUNBRTZCLE1BQU0sVUFBVSxJQUFJOzs0QkFFekIsSUFBSTs7a0NBRzlCLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2pDLFNBQVMsZ0JBQWdCOzs7O0tBSXBCLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYztJQUM1QixNQUFNLElBQUksR0FBRyxXQUFXLEVBQUUsQ0FBQztJQUMzQixNQUFNLGFBQWEsR0FBRyxrQkFBa0IsRUFBRSxDQUFDO0lBQzNDLElBQUksSUFBSSxZQUFZLElBQUksSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7UUFDN0QsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztLQUMvRDtJQUNELElBQUksSUFBSSxZQUFZLElBQUksSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7UUFDN0QsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsV0FBVyxDQUNUO1lBQ0UsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFO1lBQ2YsSUFBSSxFQUFFLFNBQVM7U0FDaEIsRUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDckMsQ0FBQztTQUNGLENBQ0YsQ0FBQztRQUNGLFdBQVcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxJQUFJLE1BQU0sQ0FBQyxDQUFDO0tBQ2xEO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrLCByZW5kZXJUb2FzdCB9IGZyb20gJy4vbGliLmpzJztcblxuZXhwb3J0IGNsYXNzIFVzZXIge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBhdmF0YXJVcmw6IHN0cmluZztcbiAgY29uc3RydWN0b3IodXNlcm5hbWU6IHN0cmluZywgYXZhdGFyVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnVzZXJuYW1lID0gdXNlcm5hbWU7XG4gICAgdGhpcy5hdmF0YXJVcmwgPSBhdmF0YXJVcmw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJEYXRhKCk6IHVua25vd24ge1xuICBjb25zdCB1c2VyRGF0YTogdW5rbm93biA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyJyk7XG4gIGNvbnN0IGRhdGEgPSB0eXBlb2YgdXNlckRhdGEgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZSh1c2VyRGF0YSkgOiB1bmRlZmluZWQ7XG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgJ3VzZXJuYW1lJyBpbiBkYXRhICYmICdhdmF0YXJVcmwnIGluIGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFVzZXIoZGF0YS51c2VybmFtZSwgZGF0YS5hdmF0YXJVcmwpO1xuICB9XG5cbiAgcmV0dXJuICfQktC+0LfQvNC+0LbQvdC+INCy0Ysg0L3QtSDQt9Cw0LvQvtCz0LjQvdC10L3RiyEnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmF2b3JpdGVzQW1vdW50KCk6IHVua25vd24ge1xuICBjb25zdCBhbW91bnREYXRhOiB1bmtub3duID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhdm9yaXRlc0Ftb3VudCcpO1xuICBjb25zdCBhbW91bnQgPVxuICAgIHR5cGVvZiBhbW91bnREYXRhID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoYW1vdW50RGF0YSkgOiB1bmRlZmluZWQ7XG4gIGlmICghaXNOYU4oTnVtYmVyKGFtb3VudCkpKSB7XG4gICAgcmV0dXJuIE51bWJlcihhbW91bnQpO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJVc2VyQmxvY2soXG4gIG5hbWU6IHN0cmluZyxcbiAgYXZhdGFyOiBzdHJpbmcsXG4gIGZhdm9yaXRlSXRlbXNBbW91bnQ/OiBudW1iZXJcbik6IHZvaWQge1xuICBsZXQgZmF2b3JpdGVzQ2FwdGlvbjogc3RyaW5nIHwgbnVtYmVyO1xuICBpZiAoZmF2b3JpdGVJdGVtc0Ftb3VudCAmJiBmYXZvcml0ZUl0ZW1zQW1vdW50ID4gMCkge1xuICAgIGZhdm9yaXRlc0NhcHRpb24gPSBmYXZvcml0ZUl0ZW1zQW1vdW50O1xuICB9IGVsc2Uge1xuICAgIGZhdm9yaXRlc0NhcHRpb24gPSAn0L3QuNGH0LXQs9C+INC90LXRgic7XG4gIH1cblxuICBjb25zdCBoYXNGYXZvcml0ZUl0ZW1zID0gZmF2b3JpdGVJdGVtc0Ftb3VudCA/IHRydWUgOiBmYWxzZTtcblxuICByZW5kZXJCbG9jayhcbiAgICAndXNlci1ibG9jaycsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItY29udGFpbmVyXCI+XG4gICAgICA8aW1nIGNsYXNzPVwiYXZhdGFyXCIgc3JjPVwiJHthdmF0YXJ9XCIgYWx0PVwiJHtuYW1lfVwiIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPlxuICAgICAgICAgIDxwIGNsYXNzPVwibmFtZVwiPiR7bmFtZX08L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJmYXZcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiaGVhcnQtaWNvbiR7XG4gIGhhc0Zhdm9yaXRlSXRlbXMgPyAnIGFjdGl2ZScgOiAnJ1xufVwiPjwvaT4ke2Zhdm9yaXRlc0NhcHRpb259XG4gICAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVXNlckluZm8oKTp2b2lke1xuICBjb25zdCB1c2VyID0gZ2V0VXNlckRhdGEoKTtcbiAgY29uc3QgdXNlckZhdm9yaXRlcyA9IGdldEZhdm9yaXRlc0Ftb3VudCgpO1xuICBpZiAodXNlciBpbnN0YW5jZW9mIFVzZXIgJiYgdHlwZW9mIHVzZXJGYXZvcml0ZXMgPT09ICdudW1iZXInKSB7XG4gICAgcmVuZGVyVXNlckJsb2NrKHVzZXIudXNlcm5hbWUsIHVzZXIuYXZhdGFyVXJsLCB1c2VyRmF2b3JpdGVzKTtcbiAgfVxuICBpZiAodXNlciBpbnN0YW5jZW9mIFVzZXIgJiYgdHlwZW9mIHVzZXJGYXZvcml0ZXMgIT09ICdudW1iZXInKSB7XG4gICAgcmVuZGVyVXNlckJsb2NrKHVzZXIudXNlcm5hbWUsIHVzZXIuYXZhdGFyVXJsKTtcbiAgfVxuICBpZiAodHlwZW9mIHVzZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVuZGVyVG9hc3QoXG4gICAgICB7XG4gICAgICAgIHRleHQ6IGAke3VzZXJ9YCxcbiAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ9Cf0L7QvdGP0LsnLFxuICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ9Cj0LLQtdC00L7QvNC70LXQvdC40LUg0LfQsNC60YDRi9GC0L4nKTtcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICAgIHJlbmRlckJsb2NrKCd1c2VyLWJsb2NrJywgYDxici8+PHA+JHt1c2VyfTwvcD5gKTtcbiAgfVxufSJdfQ==