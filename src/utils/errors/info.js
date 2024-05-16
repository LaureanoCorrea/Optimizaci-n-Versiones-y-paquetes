export const generateInfoUserError = (user) => {
  return `Incomplete or not valid Properties.
    list of requires properties:
    * first_name: needs to be a string but received ${user.first_name}
    * last_name: needs to be a string but received ${user.last_name}
    * email: needs to be a string but received ${user.email}
   
    `;
};

export const generateProductsError = (products) => {
  return `Incomplete or not valid Properties.
  * title: needs a required string but received ${products.title}  
  * description: needs to be a string but received ${products.description}
  * price: needs to be a required number but received ${products.price}
  * thumbnail: needs to be a string but received ${products.thumbnail}
  * code: needs to be a required string but received ${products.code}
  * stock: needs to be a required number but received ${products.stock}
  * category: needs to be a required string but received ${products.category}
  `;
};


