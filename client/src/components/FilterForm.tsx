import { Formik, Form, Field } from "formik";
import { TextField, Button, Typography, Autocomplete } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FilterAlt } from "@mui/icons-material";
import * as Yup from "yup";
import { type FilterFormProps } from "../types/FilterForm";

const validationSchema = Yup.object({
    manufacturer: Yup.string(),
    productLine: Yup.string(),
    ammoType: Yup.string(),
    bulletType: Yup.string(),
    bulletWeight: Yup.number().nullable(),
    caseMaterial: Yup.string(),
});

function FilterForm({
    initialValues,
    onSubmit,
    onReset,
    filterOptions,
    caseMaterials,
}: FilterFormProps) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values) => {
                onSubmit({
                    manufacturer: values.manufacturer || "",
                    productLine: values.productLine || "",
                    ammoType: values.ammoType || "",
                    bulletType: values.bulletType || "",
                    bulletWeight:
                        values.bulletWeight === ""
                            ? ""
                            : Number(values.bulletWeight),
                    caseMaterial: values.caseMaterial,
                });
            }}
        >
            {({ values, setFieldValue, errors, touched }) => (
                <Accordion className="filter-form">
                    <AccordionSummary
                        expandIcon={<FilterAlt />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography>Filter</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Form>
                            <Field
                                name="manufacturer"
                                as={Autocomplete}
                                options={filterOptions?.manufacturers || []}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        label="Manufacturer"
                                        error={
                                            touched.manufacturer &&
                                            !!errors.manufacturer
                                        }
                                        helperText={
                                            touched.manufacturer &&
                                            errors.manufacturer
                                        }
                                    />
                                )}
                                value={values.manufacturer || ""}
                                onChange={(_: any, value: string | null) =>
                                    setFieldValue("manufacturer", value || "")
                                }
                                freeSolo
                                fullWidth
                            />
                            <Field
                                name="productLine"
                                as={TextField}
                                label="Product Line"
                                error={
                                    touched.productLine && !!errors.productLine
                                }
                                helperText={
                                    touched.productLine && errors.productLine
                                }
                            />
                            <Field
                                name="ammoType"
                                as={Autocomplete}
                                options={filterOptions?.ammoTypes || []}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        label="Ammo Type"
                                        error={
                                            touched.ammoType &&
                                            !!errors.ammoType
                                        }
                                        helperText={
                                            touched.ammoType && errors.ammoType
                                        }
                                    />
                                )}
                                value={values.ammoType || ""}
                                onChange={(_: any, value: string | null) =>
                                    setFieldValue("ammoType", value || "")
                                }
                                freeSolo
                                fullWidth
                            />
                            <Field
                                name="bulletType"
                                as={Autocomplete}
                                options={filterOptions?.bulletTypes || []}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        label="Bullet Type"
                                        error={
                                            touched.bulletType &&
                                            !!errors.bulletType
                                        }
                                        helperText={
                                            touched.bulletType &&
                                            errors.bulletType
                                        }
                                    />
                                )}
                                value={values.bulletType || ""}
                                onChange={(_: any, value: string | null) =>
                                    setFieldValue("bulletType", value || "")
                                }
                                freeSolo
                                fullWidth
                            />
                            <Field
                                name="bulletWeight"
                                as={TextField}
                                label="Bullet Weight (grains)"
                                type="number"
                                error={
                                    touched.bulletWeight &&
                                    !!errors.bulletWeight
                                }
                                helperText={
                                    touched.bulletWeight && errors.bulletWeight
                                }
                            />
                            <Field
                                name="caseMaterial"
                                as={Autocomplete}
                                options={caseMaterials}
                                renderInput={(params: any) => (
                                    <TextField
                                        {...params}
                                        label="Case Material"
                                        error={
                                            touched.caseMaterial &&
                                            !!errors.caseMaterial
                                        }
                                        helperText={
                                            touched.caseMaterial &&
                                            errors.caseMaterial
                                        }
                                    />
                                )}
                                value={values.caseMaterial || ""}
                                onChange={(_: any, value: string | null) =>
                                    setFieldValue("caseMaterial", value || "")
                                }
                                freeSolo
                                fullWidth
                            />
                            <div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Apply Filters
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="error"
                                    onClick={onReset}
                                >
                                    Remove Filters
                                </Button>
                            </div>
                        </Form>
                    </AccordionDetails>
                </Accordion>
            )}
        </Formik>
    );
}

export default FilterForm;
