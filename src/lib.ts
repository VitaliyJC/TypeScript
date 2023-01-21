interface IMessage {
  type: string;
  text: string;
}

interface IAction {
  name?: string;
  handler?: () => void;
}

export function renderBlock (elementId: string, html: string) {
  const element = document.getElementById(elementId)
  element.innerHTML = html
}

export function dateToUnixStamp(date: Date): number {
  return date.getTime() / 1000;
}

export function responseToJson(requestPromise: Promise<any>): Promise<any> {
  return requestPromise
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      return JSON.parse(response);
    });
}

export function renderToast(message: IMessage | null, action: IAction | null) {
  let messageText = '';

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `;
  }

  renderBlock('toast-block', messageText);

  const button = document.getElementById('toast-main-action');
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null, null);
    };
  }
}
