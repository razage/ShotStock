export interface FilterValues {
    manufacturer: string;
    productLine: string;
    ammoType: string;
    bulletType: string;
    bulletWeight: number | "";
    caseMaterial: string;
}

export interface FilterOptions {
    manufacturers: string[];
    ammoTypes: string[];
    bulletTypes: string[];
}

export interface FilterFormProps {
    initialValues: FilterValues;
    onSubmit: (values: FilterValues) => void;
    onReset: () => void;
    filterOptions?: FilterOptions;
    caseMaterials: string[];
}
