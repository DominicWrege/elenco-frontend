export interface TopCategory {
    id: number,
    description: string,
    children: Category[]
}


export interface Category {
    id: number,
    description: string,
}