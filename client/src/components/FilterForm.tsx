import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import * as Yup from "yup";

interface FilterValues {
    manufacturer: string;
    productLine: string;
    ammoType: string;
    bulletType: string;
    bulletWeight: number | "";
    caseMaterial: string;
}

interface FilterFormProps {
    initialValues: FilterValues;
    onSubmit: (values: FilterValues) => void;
}

const validationSchema = Yup.object({
    manufacturer: Yup.string(),
    productLine: Yup.string(),
    ammoType: Yup.string(),
    bulletType: Yup.string(),
    bulletWeight: Yup.number().nullable(),
    caseMaterial: Yup.string(),
});

function FilterForm({ initialValues, onSubmit }: FilterFormProps) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                onSubmit({
                    ...values,
                    bulletWeight:
                        values.bulletWeight === ""
                            ? ""
                            : Number(values.bulletWeight),
                });
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            maxWidth: 400,
                        }}
                    >
                        <Field
                            name="manufacturer"
                            as={TextField}
                            label="Manufacturer"
                            error={
                                touched.manufacturer && !!errors.manufacturer
                            }
                            helperText={
                                touched.manufacturer && errors.manufacturer
                            }
                        />
                        <Field
                            name="productLine"
                            as={TextField}
                            label="Product Line"
                            error={touched.productLine && !!errors.productLine}
                            helperText={
                                touched.productLine && errors.productLine
                            }
                        />
                        <Field
                            name="ammoType"
                            as={TextField}
                            label="Ammo Type"
                            error={touched.ammoType && !!errors.ammoType}
                            helperText={touched.ammoType && errors.ammoType}
                        />
                        <Field
                            name="bulletType"
                            as={TextField}
                            label="Bullet Type"
                            error={touched.bulletType && !!errors.bulletType}
                            helperText={touched.bulletType && errors.bulletType}
                        />
                        <Field
                            name="bulletWeight"
                            as={TextField}
                            label="Bullet Weight (grains)"
                            type="number"
                            error={
                                touched.bulletWeight && !!errors.bulletWeight
                            }
                            helperText={
                                touched.bulletWeight && errors.bulletWeight
                            }
                        />
                        <Field
                            name="caseMaterial"
                            as={TextField}
                            label="Case Material"
                            error={
                                touched.caseMaterial && !!errors.caseMaterial
                            }
                            helperText={
                                touched.caseMaterial && errors.caseMaterial
                            }
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Apply Filters
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default FilterForm;
