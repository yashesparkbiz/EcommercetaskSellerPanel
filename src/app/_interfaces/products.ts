export interface Products {
    in: {
        id: number,
        product_Name: string,
        description: string,
        brand: string,
        price: number,
        product_Subcategory_Id: number,
        quantity: number,
        image: string,
        is_Active: boolean,
        user_Id: number
    }
}