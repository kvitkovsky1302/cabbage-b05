# GoIT Node.js cabbage

- настроен линтер
- настроен prettier
- развернут сервер

## Команды:

- `npm start` &mdash; старт сервера в режиме production
- `npm run start:dev` &mdash; старт сервера в режиме разработки (development)
- `npm run lint` &mdash; запустить выполнение проверки кода с eslint, необходимо
  выполнять перед каждым PR и исправлять все ошибки линтера
- `npm lint:fix` &mdash; та же проверка линтера, но с автоматическими
  исправлениями простых ошибок

## Маршруты:

- ### Регистрация:

  **`post`** `localhost:3001/api/auth/user/signup`

  ```js
  {
    email: "name@mail.com",
    password: "qwerty123456"
  }
  ```

- ### Вход:

  **`post`** `localhost:3001/api/auth/users/signin`

  ```js
  {
  email: "name@mail.com",
  password: "qwerty123456"
  }
  ```

- ### Выход:

  **`post`** `localhost:3000/api/auth/user/signout`

- ### Обновление баланса текущего пользователя:

  **`patch`** `localhost:3001/api/auth/users/balance`

  ```js
  {
    balance: 85370
  }
  ```

- ### Изменение аватара пользователя:

  **`patch`** `localhost:3001/api/auth/users/avatars`

  - Не обрабатывает никакой другой тип форм, кроме `multipart/form-data`

  ```html
  <form action="" method="post" enctype="multipart/form-data">
    <input type="file" name="avatar" />
  </form>
  ```

- ### Добавление транзакции расхода:

  **`post`** `localhost:3001/api/expense`

  ```js
  {
    name: "",
    description: "",
    price: 123.34,
    date: 1639598905716
  }
  ```

- ### Удаление транзакции расхода:

  **`delete`** `localhost:3001/api/expense/:TransactionId`

- ### Добавление транзакции дохода:

  **`post`** `localhost:3001/api/income`

  ```js
  {
    name: "",
    description: "",
    sum: 15000,
    date: 1639598905716
  }
  ```
