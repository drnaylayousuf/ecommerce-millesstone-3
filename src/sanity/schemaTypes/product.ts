

export default  {

name: "product", 
title: "Product",
type: "document",
fields:[
    {
        name: "name",
        title: "Produnct Name",
        type: "string"

    },
    {
        name: "image",
        title: "Produnct Image",
        type: "image"

    },
    {
        name: "price",
        title: "Produnct Price",
        type: "number"

    },
    {
        name: "description",
        title: "Produnct Description",
        type: "text"

    },
    {
        name: 'price_id',
        title: 'Stripe Price ID',
        type: 'string',
      },
]

}