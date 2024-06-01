export interface FilterOptions {
    label: string,
    subOptions: SubOption[],
    type: 'Radio' | 'CheckBox'
}

export interface SubOption {
    label:string,
    key:string,
    value:string ,
}