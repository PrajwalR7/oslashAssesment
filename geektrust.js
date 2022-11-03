const fs = require('fs');

const filename = process.argv[2];

const products = [
  {
    name: 'tshirt',
    price: 1000,
    discount: 10,
    type: 'clothes',
  },
  {
    name: 'jacket',
    price: 2000,
    discount: 5,
    type: 'clothes',
  },
  {
    name: 'cap',
    price: 500,
    discount: 20,
    type: 'clothes',
  },
  {
    name: 'notebook',
    price: 200,
    discount: 20,
    type: 'stationary',
  },
  {
    name: 'pens',
    price: 300,
    discount: 10,
    type: 'stationary',
  },
  {
    name: 'markers',
    price: 500,
    discount: 5,
    type: 'stationary',
  },
];

// Check if product belongs to type
const checkIfExists = (type, item) => {
  return (
    products
      .filter((ele) => ele.type === type)
      .map((ele) => ele.name)
      .indexOf(item.toLowerCase()) > -1
  );
};

fs.readFile(filename, 'utf8', (err, data) => {
  //This function calculates cost of an object along with discount if any
  const findCost = (prodName, quantity) => {
    const prodObj = products.filter(
      (ele) => ele.name === prodName.toLowerCase()
    )[0];
    let itemCost = prodObj.price * quantity;
    if (itemCost + amt >= 1000 || amt >= 1000) {
      discount = (prodObj.discount / 100) * itemCost;
      finalDisc = finalDisc + discount;
      itemCost = itemCost - discount;
    }
    return itemCost;
  };

  let amt = 0;
  let finalDisc = 0;

  try {
    var inputLines = data.toString().split('\n');
    inputLines.forEach((input) => {
      const eachLine = input.split(' ');
      const prodName = eachLine[1];
      let quantity = parseInt(eachLine[2]);

      //Checking to see if product is of type clothes
      if (prodName !== undefined && checkIfExists('clothes', prodName)) {
        if (quantity > 2) console.log('ERROR_QUANTITY_EXCEEDED');
        else {
          console.log('ITEM_ADDED');
          amt = amt + findCost(prodName, quantity);
        }
      }
      //Checking to see if product is of type stationary
      else if (
        prodName !== undefined &&
        checkIfExists('stationary', prodName)
      ) {
        if (eachLine[2] > 3) console.log('ERROR_QUANTITY_EXCEEDED');
        else {
          console.log('ITEM_ADDED');
          amt = amt + findCost(prodName, quantity);
        }
      }
      // If input is PRINT BILL
      else if (eachLine.length === 1) {
        if (amt >= 3000) {
          finalDisc = finalDisc + 0.05 * amt;
          amt = amt - 0.05 * amt;
        }
        amt = amt + 0.1 * amt;
        console.log('TOTAL_DISCOUNT', finalDisc.toFixed(2));
        console.log('TOTAL_AMOUNT_TO_PAY', amt.toFixed(2));
      } else {
        //error
        console.log('INVALID COMMAND');
      }
    });
  } catch (err) {
    console.error(err);
  }
});
