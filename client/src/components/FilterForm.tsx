import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";

interface FilterValues {
    manufacturer: string;
    productLine: string;
    ammoType: string;
    bulletType: string;
    bulletWeight: number | "";
    caseMaterial: string;
}

interface FilterFormProps {
    onSubmit: (values: FilterValues) => void;
}

function FilterForm({ onSubmit }: FilterFormProps) {
    const formik = useFormik<FilterValues>({
        initialValues: {
            manufacturer: "",
            productLine: "",
            ammoType: "",
            bulletType: "",
            bulletWeight: "",
            caseMaterial: "",
        },
        validationSchema: Yup.object({
            manufacturer: Yup.string().optional(),
            productLine: Yup.string().optional(),
            ammoType: Yup.string().optional(),
            bulletType: Yup.string().optional(),
            bulletWeight: Yup.number().optional().nullable(),
            caseMaterial: Yup.string().optional(),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
            <FormControl fullWidth>
                <InputLabel>Manufacturer</InputLabel>
                <Select
                    name="manufacturer"
                    value={formik.values.manufacturer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.manufacturer &&
                        Boolean(formik.errors.manufacturer)
                    }
                >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="Federal">Federal</MenuItem>
                    <MenuItem value="Hornady">Hornady</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Product Line"
                name="productLine"
                value={formik.values.productLine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.productLine &&
                    Boolean(formik.errors.productLine)
                }
                helperText={
                    formik.touched.productLine && formik.errors.productLine
                }
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel>Ammo Type</InputLabel>
                <Select
                    name="ammoType"
                    value={formik.values.ammoType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.ammoType &&
                        Boolean(formik.errors.ammoType)
                    }
                >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value=".300 Blackout">.300 Blackout</MenuItem>
                    <MenuItem value="5.56x45mm">5.56x45mm</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Bullet Type</InputLabel>
                <Select
                    name="bulletType"
                    value={formik.values.bulletType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.bulletType &&
                        Boolean(formik.errors.bulletType)
                    }
                >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="FMJ">FMJ</MenuItem>
                    <MenuItem value="TMJ">TMJ</MenuItem>
                    <MenuItem value="HP">HP</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Bullet Weight"
                name="bulletWeight"
                type="number"
                value={formik.values.bulletWeight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.bulletWeight &&
                    Boolean(formik.errors.bulletWeight)
                }
                helperText={
                    formik.touched.bulletWeight && formik.errors.bulletWeight
                }
                fullWidth
            />

            <FormControl fullWidth>
                <InputLabel>Case Material</InputLabel>
                <Select
                    name="caseMaterial"
                    value={formik.values.caseMaterial}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.caseMaterial &&
                        Boolean(formik.errors.caseMaterial)
                    }
                >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="Brass">Brass</MenuItem>
                    <MenuItem value="Steel">Steel</MenuItem>
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
                Filter
            </Button>
        </Box>
    );
}

export default FilterForm;
