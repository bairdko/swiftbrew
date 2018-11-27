# Swiftbrew
###### Assigned: 11/15/18

Live deployment on [Heroku](https://swiftbrew.herokuapp.com/home).

### Overview:
  This was a final project done for the Bootcamp. This project is forked from my team's repository. We builted a full stack MERN app that is for group coffee ordering. My responsibilities on this app were to set up the database in Mongo, and to build the controller and server in Express/Node. I also built the React components that interacted with the data on the front end, as well as helped with live deployment on the database on Heroku. 

#### App Functionality:
  Once you hit the home page, you can go to the Menu tab, or you can hit one of the categories (Coffee, Frappucino, Tea, or Bakery) to go the menu. Once you are on the menu, you can hit the tabs to navigate. Pick a size, if applicable, and then add to cart. If you go to the cart, which is the coffee sign in the top corner, you'll see your items have been added, and you can delete if you've added to many.
  
  If you fill in the save your order bar and then hit checkout, then you will save your order to the Orders tab. In there, you will be able to add the order to your cart once again, for whenever you order coffee next. Otherwise, you may delete that order.
  
  After checking out, you will be given a QR code. That code can be saved to your phone, or it will be persistent on that page, and you can show to the employee at the store. Then the employee will be able to hit pay with cash and calculate the amount of change necessary to finish the transaction, and clear the order from your cart.
  
#### Known Issues:
- Sign up functionality works, but there is no capability to sign in. All current users are manually entered into the database.
- As a result, the routes are not set up to work with the user id, therefore the cart is not users specific, and can only be used by one person at a time.
- None to very minimal input validation. For instance, if you don't put a size on your coffee, it will not add to cart, but there is no error telling the user that.
- Needs updated CSS on the checkout page.
- Needs updated media queries for mobile styling.
- Imbedded QR scanner on the /checkout page is not functional.

### Future Improvements:
- Integration with Square, general improvements to the checkout functionality
- Split your order functionality with the ability to bill your friends through the app, and send bill to Paypal/Venmo/Square Cash
- Authorized users have a space to edit the menu.
