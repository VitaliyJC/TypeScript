import { renderBlock } from './lib.js';
import { renderUserInfo } from './user.js';
export function renderSearchStubBlock() {
    renderBlock('search-results-block', `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function toggleFavoriteItem(data) {
    const itemsData = localStorage.getItem('favoriteItems');
    const items = typeof itemsData === 'string' ? JSON.parse(itemsData) : undefined;
    const store = {};
    if (inFavorite(data)) {
        const values = Object.values(items);
        const filtered = values.filter(function (item) {
            return item.id != data.id;
        });
        Object.assign(store, Object.assign({}, filtered));
    }
    else {
        Object.assign(store, Object.assign(Object.assign({}, items), { [Object.keys(items).length]: { id: data.id, name: data.name, image: data.image } }));
    }
    if (typeof store === 'object') {
        localStorage.setItem('favoritesAmount', String(Object.keys(store).length));
        localStorage.setItem('favoriteItems', JSON.stringify(store));
    }
}
export function inFavorite(data) {
    const itemsData = localStorage.getItem('favoriteItems');
    const items = typeof itemsData === 'string' ? JSON.parse(itemsData) : undefined;
    if (items && Object.keys(items).length > 0) {
        const values = Object.values(items);
        return !!values.find(function (item) {
            return item.id == data.id;
        });
    }
    return false;
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `);
}
export function renderSearchResultsBlock(data) {
    const result = data.map((item) => {
        let classStr;
        inFavorite(item) ? (classStr = 'active') : (classStr = '');
        return `<li class="result">
    <div class="result-container">
      <div class="result-img-container">
        <div class="favorites ${classStr}"></div>
        <img class="result-img" src="${item.image}" alt="${item.name}">
      </div>	
      <div class="result-info">
        <div class="result-info--header">
          <p>${item.name}</p>
          <p class="price">${item.price}&#8381;</p>
        </div>
        <div class="result-info--map"><i class="map-icon"></i> ${item.remoteness ? item.remoteness + 'км от вас' : 'расстояние не известно'}</div>
        <div class="result-info--descr">${item.description}</div>
        <div class="result-info--footer">
          <div>
            <button>Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  </li>`;
    });
    renderBlock('search-results-block', `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${result.reduce((sum, current) => sum + current, '')}
    </ul>
    `);
    document.querySelectorAll('.result .favorites').forEach((item, idx) => {
        item.addEventListener('click', function () {
            toggleFavoriteItem(data[idx]);
            renderSearchResultsBlock(data);
            renderUserInfo();
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTNDLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7Ozs7S0FLQyxDQUNGLENBQUM7QUFDSixDQUFDO0FBUUQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQVc7SUFDNUMsTUFBTSxTQUFTLEdBQVksWUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRSxNQUFNLEtBQUssR0FDVCxPQUFPLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNwRSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEIsTUFBTSxNQUFNLEdBQWMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQyxNQUFNLFFBQVEsR0FBYyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVMsSUFBYTtZQUM5RCxPQUFPLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxvQkFDZCxRQUFRLEVBQ1gsQ0FBQztLQUNKO1NBQU07UUFDTCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssa0NBQ2QsS0FBSyxLQUNSLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUs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QUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnO1xuaW1wb3J0IHsgUGxhY2UgfSBmcm9tICcuL3NlYXJjaC1mb3JtLmpzJztcbmltcG9ydCB7IHJlbmRlclVzZXJJbmZvIH0gZnJvbSAnLi91c2VyLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaFN0dWJCbG9jaygpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9zdGFydC1zZWFyY2gucG5nXCIgLz5cbiAgICAgIDxwPtCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0L7QuNGB0LosINC30LDQv9C+0LvQvdC40YLQtSDRhNC+0YDQvNGDINC4Jm5ic3A70L3QsNC20LzQuNGC0LUgXCLQndCw0LnRgtC4XCI8L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApO1xufVxuXG5pbnRlcmZhY2UgRmF2b3JpdGUge1xuICBpZDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG4gIGltYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVGYXZvcml0ZUl0ZW0oZGF0YTogUGxhY2UpOiB2b2lkIHtcbiAgY29uc3QgaXRlbXNEYXRhOiB1bmtub3duID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhdm9yaXRlSXRlbXMnKTtcbiAgY29uc3QgaXRlbXMgPVxuICAgIHR5cGVvZiBpdGVtc0RhdGEgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShpdGVtc0RhdGEpIDogdW5kZWZpbmVkO1xuICBjb25zdCBzdG9yZSA9IHt9O1xuICBpZiAoaW5GYXZvcml0ZShkYXRhKSkge1xuICAgIGNvbnN0IHZhbHVlczpGYXZvcml0ZVtdID0gT2JqZWN0LnZhbHVlcyhpdGVtcyk7XG4gICAgY29uc3QgZmlsdGVyZWQ6RmF2b3JpdGVbXSA9IHZhbHVlcy5maWx0ZXIoZnVuY3Rpb24oaXRlbTpGYXZvcml0ZSkge1xuICAgICAgcmV0dXJuIGl0ZW0uaWQgIT0gZGF0YS5pZDtcbiAgICB9KTtcbiAgICBPYmplY3QuYXNzaWduKHN0b3JlLCB7XG4gICAgICAuLi5maWx0ZXJlZFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIE9iamVjdC5hc3NpZ24oc3RvcmUsIHtcbiAgICAgIC4uLml0ZW1zLFxuICAgICAgW09iamVjdC5rZXlzKGl0ZW1zKS5sZW5ndGhdOiB7IGlkOiBkYXRhLmlkLCBuYW1lOiBkYXRhLm5hbWUsIGltYWdlOiBkYXRhLmltYWdlIH0sXG4gICAgfSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzdG9yZSA9PT0gJ29iamVjdCcpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVzQW1vdW50JywgU3RyaW5nKE9iamVjdC5rZXlzKHN0b3JlKS5sZW5ndGgpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KHN0b3JlKSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluRmF2b3JpdGUoZGF0YTogUGxhY2UpOiBib29sZWFuIHtcbiAgY29uc3QgaXRlbXNEYXRhOiB1bmtub3duID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhdm9yaXRlSXRlbXMnKTtcbiAgY29uc3QgaXRlbXMgPVxuICAgIHR5cGVvZiBpdGVtc0RhdGEgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShpdGVtc0RhdGEpIDogdW5kZWZpbmVkO1xuICBpZiAoaXRlbXMgJiYgT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCB2YWx1ZXM6RmF2b3JpdGVbXSA9IE9iamVjdC52YWx1ZXMoaXRlbXMpO1xuICAgIHJldHVybiAhIXZhbHVlcy5maW5kKGZ1bmN0aW9uIChpdGVtOiBGYXZvcml0ZSkge1xuICAgICAgcmV0dXJuIGl0ZW0uaWQgPT0gZGF0YS5pZDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbXB0eU9yRXJyb3JTZWFyY2hCbG9jayhyZWFzb25NZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cIm5vLXJlc3VsdHMtYmxvY2tcIj5cbiAgICAgIDxpbWcgc3JjPVwiaW1nL25vLXJlc3VsdHMucG5nXCIgLz5cbiAgICAgIDxwPiR7cmVhc29uTWVzc2FnZX08L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKGRhdGE6IFBsYWNlW10pOiB2b2lkIHtcbiAgY29uc3QgcmVzdWx0ID0gZGF0YS5tYXAoKGl0ZW06IFBsYWNlKSA9PiB7XG4gICAgbGV0IGNsYXNzU3RyOiBzdHJpbmc7XG4gICAgaW5GYXZvcml0ZShpdGVtKSA/IChjbGFzc1N0ciA9ICdhY3RpdmUnKSA6IChjbGFzc1N0ciA9ICcnKTtcbiAgICByZXR1cm4gYDxsaSBjbGFzcz1cInJlc3VsdFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWltZy1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZhdm9yaXRlcyAke2NsYXNzU3RyfVwiPjwvZGl2PlxuICAgICAgICA8aW1nIGNsYXNzPVwicmVzdWx0LWltZ1wiIHNyYz1cIiR7aXRlbS5pbWFnZX1cIiBhbHQ9XCIke2l0ZW0ubmFtZX1cIj5cbiAgICAgIDwvZGl2Plx0XG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm9cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1oZWFkZXJcIj5cbiAgICAgICAgICA8cD4ke2l0ZW0ubmFtZX08L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJwcmljZVwiPiR7aXRlbS5wcmljZX0mIzgzODE7PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1tYXBcIj48aSBjbGFzcz1cIm1hcC1pY29uXCI+PC9pPiAke2l0ZW0ucmVtb3RlbmVzcz9pdGVtLnJlbW90ZW5lc3MrJ9C60Lwg0L7RgiDQstCw0YEnOifRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvdC1INC40LfQstC10YHRgtC90L4nfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+JHtpdGVtLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWZvb3RlclwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvbGk+YDtcbiAgfSk7XG5cbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWhlYWRlclwiPlxuICAgICAgICA8cD7QoNC10LfRg9C70YzRgtCw0YLRiyDQv9C+0LjRgdC60LA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1maWx0ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiaWNvbiBpY29uLWZpbHRlclwiPjwvaT4g0KHQvtGA0YLQuNGA0L7QstCw0YLRjDo8L3NwYW4+XG4gICAgICAgICAgICA8c2VsZWN0PlxuICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ9XCJcIj7QodC90LDRh9Cw0LvQsCDQtNC10YjRkdCy0YvQtTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ9XCJcIj7QodC90LDRh9Cw0LvQsCDQtNC+0YDQvtCz0LjQtTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24+0KHQvdCw0YfQsNC70LAg0LHQu9C40LbQtTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDx1bCBjbGFzcz1cInJlc3VsdHMtbGlzdFwiPlxuICAgICAgJHtyZXN1bHQucmVkdWNlKChzdW0sIGN1cnJlbnQpID0+IHN1bSArIGN1cnJlbnQsICcnKX1cbiAgICA8L3VsPlxuICAgIGBcbiAgKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc3VsdCAuZmF2b3JpdGVzJykuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbShkYXRhW2lkeF0pO1xuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKGRhdGEpO1xuICAgICAgcmVuZGVyVXNlckluZm8oKTtcbiAgICB9KTtcbiAgfSk7XG59Il19