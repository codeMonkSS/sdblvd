# sundown-boulevard

##### Home Screen 
  * (http://sbvd.sajalsinha.co/)
  * user can in “find your order” enter an email. this will load the locally stored data if email and data are found and then go to: “pick dish screen”. the full flow will now be pre-filled with the user's order data
  * start order flow box (will go to: “pick dish screen”)

##### Pick dish screen
  * (http://sbvd.sajalsinha.co/PickDish)
  * Load dishes from: https://www.themealdb.com/API/JSON/V1/1/RANDOM.PHP
  * one dish is loaded when the user lands on the screen
  * user can generate a new dish
  * user can press next (will go to: “pick drinks screen”)

##### Pick drinks 
  * screen (http://sbvd.sajalsinha.co/PickDrinks)
  * load drinks from: https://api.punkapi.com/v2/beers
  * drinks are loaded when the user lands on the screen
  * user can add one or more drinks from the list (min 1 is required for going to next screen)
  * user can press next (will go to: “order screen”)

##### Order screen 
  * (http://sbvd.sajalsinha.co/BookTable)
  * user needs to pick a date and time for a visit (min date today(), the restaurant is open from 16:00 - 23:00 every day, except for weekends (sat + sun))
  * user selected amount of people (min 1, max 10)
  * a user enters valid email
  * user can press next (will go to: “receipt screen”)
  * if flow started with pre-filled data, a button should say “update order”

##### Receipt screen 
  * (http://sbvd.sajalsinha.co/Receipt)
  * receipt shown on the screen with the item added during the flow
  * all data will now be stored locally
  * user can press next (will go to: “home”)



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
