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

- ввод даты не обязателен, валидация будет происходить только при наличии
  переменной в объекте, иначе запишет текущее значение

  ```js
  {
    category: "string",
    description: "string",
    sum: 123.34,
    date: 1639598905716
  }
  ```

- ### Удаление транзакции расхода:

  **`delete`** `localhost:3001/api/expense/:TransactionId`

- ### Добавление транзакции дохода:

  **`post`** `localhost:3001/api/income`

  ```js
  {
    category: "string",
    description: "string",
    sum: 15000,
    date: 1639598905716
  }
  ```

- ### Получение транзакций расхода
  **`get`** `localhost:3001/api/expense?category=техника&month=12&year=2021`

```js
{
    "status": "success",
    "totalPrice": 694.1,
    "data": [
        {
            "_id": "61bdd77fc538e6d0809d9735",
            "category": "техника",
            "description": "бластер тороидального поля",
            "sum": 457.55,
            "year": "2021",
            "month": "12",
            "owner": {
                "_id": "61b5bfbd6c8dead153c330ab",
                "email": "terminator@mail.com"
            }
        },
        {
            "_id": "61bdd7c3c538e6d0809d9739",
            "name": "техника",
            "description": "квазирезистивный антигравитатор",
            "sum": 236.55,
            "year": "2021",
            "month": "12",
            "owner": {
                "_id": "61b5bfbd6c8dead153c330ab",
                "email": "terminator@gmail.com"
            }
        }
    ]
}
```
