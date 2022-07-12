export class Orderdetail {
    id!: number;
    product_Id!: number;
    product_Name!: string;
    image!: string;
    quantity!: number;
    order_Id!: number;
    status!: string;
    discount_Id!: number;
}

export class Order
{
    id!: number;
    product_Id!: number;
    quantity!: number;
    order_Id!: number;
    status!: string;
    discount_Id!: number;
}