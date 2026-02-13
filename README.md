# 🧪 Real-time Trading Dashboard (Angular + NgRx + WebSocket)
### 🎯 Цель

Разработать Angular-приложение с использованием **NgRx и WebSocket**, которое отображает и обновляет данные в реальном времени, поддерживает сохранение состояния и корректно обрабатывает ошибки.

## 🛠 Стек технологий

### Обязатально
- Angular ≥ 15
- TypeScript
- NgRx:
    - `@ngrx/store`
    - `@ngrx/effects`
    - `@ngrx/entity`
    - `@ngrx/router-store`
- RxJS
- WebSocket (native или через сервис)

### Будет плюсом
- Standalone Components
- Angular Signals
- ESLint (RxJS rules)
- OnPush change detection

## 📌 Бизнес-кейс

Есть **торговая сессия**, в рамках которой приходят **оферы** по WebSocket.

### Оффер сродержит:
```ts
export interface Offer {
  id: number;
  product: string;
  price: number;
  volume: number;
  updatedAt: string;
}
```

## 📐 Функциональные требования

### 1 Начальная загрузка данных (REST)
- При переходе на маршрут /session/:id
- Загрузка списка офферов по HTTP
- Сохранение данных в NgRx Store
- Использовать createEntityAdapter
- Повторный HTTP-запрос не должен выполняться, если данные уже есть в Store

---

### 2 Обновления в реальном времени (WebSocket)
- Подключение к WebSocket при входе на страницу
### Обработка событий:
```ts
type SocketEvent =
  | { type: 'OFFER_CREATED'; payload: Offer }
  | { type: 'OFFER_UPDATED'; payload: Offer }
  | { type: 'OFFER_DELETED'; payload: { id: number } };
```
- Store обновляется без перезагрузки страницы
- Сортировка и фильтрация не должны ломаться при обновлениях

---

### 3 Управление состоянием
Store должен содержать:
- список офферов
- состояние загрузки
- состояние ошибки
- статус **WebSocket-соединения**
  Требования:
- состояние сохраняется при переключении табов/маршрутов
- если состояния нет в storage — используется дефолтная конфигурация таблицы

---

### 4 Управление состоянием
HTTP
- Обработка ошибок в `Effects`
- Отображение понятных сообщений пользователю

**WebSocket**
- Обработка разрывов соединения
- Реализация переподключения (exponential backoff)
- Хранение статуса соединения в Store

---

### 5 UI требования
- Таблица офферов
- Обновление только изменённых строк (без полного перерендера)
- `ChangeDetectionStrategy.OnPush`
- Индикатор соединения:
    - 🟢 Online
    - 🔴 Offline

## 📐 Архитектурные требования
Решение обязательно должно демонстрировать:
- Feature-based структуру NgRx
- Корректное использование:
    - Actions
    - Reducers
    - Selectors
    - Effects
- Отсутствие subscribe() в компонентах
- Использование `async pipe`
- Корректный cleanup WebSocket
- Рекомендуется использовать Facade-паттерн (**не обязательно**)
