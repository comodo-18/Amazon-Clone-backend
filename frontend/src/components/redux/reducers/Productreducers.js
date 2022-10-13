const products = [];

 const getProductsreducer = (state = { products }, action) => {
  switch (action.type) {
    case "SUCCESS":
      return { products: action.payload };

    case "FAILURE":
      return { products: action.payload };

    default:
      return state;
  }
};

export default getProductsreducer;