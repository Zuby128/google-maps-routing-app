"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const initialValue: MarkerProps = {
  lat: 0,
  lng: 0,
  color: "red",
  title: "",
};

const COLORS = ["red", "blue", "purple"];

interface Props {
  coordinate: Coordinates | null;
  id?: string;
}

const AddForm: React.FC<Props> = ({ coordinate, id }) => {
  const [initialValues, setInitialValues] = useState<MarkerProps>(initialValue);
  const validationSchema = Yup.object({
    lat: Yup.number().required("Latitude is required"),
    lng: Yup.number().required("Longitude is required"),
    color: Yup.string().required("Color is required"),
    title: Yup.string().required("Title is required"),
  });

  useEffect(() => {
    if (id) {
      const list: MarkerProps[] = JSON.parse(
        window.localStorage.getItem("markers") || `[]`
      );
      if (list.length === 0) {
        setInitialValues(initialValue);
      } else {
        const marker = list.find((v) => (v.id = id));
        setInitialValues(marker || initialValue);
        formik.setValues(marker || initialValue);
      }
    } else {
      setInitialValues(initialValue);
    }
  }, [id, typeof window]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, helpers): void => {
      const idNum = id || uuidv4();
      const newMarker = { ...values, id: idNum };

      const markers = JSON.parse(
        window.localStorage.getItem("markers") || `[]`
      );
      if (id) {
        const filteredList = markers.filter((v: MarkerProps) => v.id !== id);
        const newMarkerList = JSON.stringify([...filteredList, newMarker]);
        window.localStorage.setItem("markers", newMarkerList);
      } else {
        const newMarkerList = JSON.stringify([...markers, newMarker]);
        window.localStorage.setItem("markers", newMarkerList);
      }

      setTimeout(() => {
        formik.resetForm();
      }, 200);
    },
  });

  useEffect(() => {
    if (coordinate) {
      formik.setFieldValue("lng", coordinate?.lng);
      formik.setFieldValue("lat", coordinate?.lat);
    }
  }, [coordinate]);

  return (
    <Container marginBottom={"10px"}>
      <form noValidate>
        <FormControl isInvalid={!!formik.errors.lat && !!formik.touched.lat}>
          <FormLabel htmlFor="lat">Latitude</FormLabel>
          <Input
            type="number"
            placeholder="lat"
            value={formik.values.lat}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="lat"
          />
          <FormErrorMessage>{formik.errors.lat}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formik.errors.lng && !!formik.touched.lng}>
          <FormLabel htmlFor="lng">Longitude</FormLabel>
          <Input
            type="number"
            placeholder="lng"
            value={formik.values.lng}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="lng"
          />
          <FormErrorMessage>{formik.errors.lng}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!formik.errors.title && !!formik.touched.title}
        >
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            type="text"
            placeholder="title"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="title"
          />
          <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!formik.errors.color && !!formik.touched.color}
        >
          <FormLabel htmlFor="color">Color</FormLabel>
          <Select
            placeholder="Select option"
            value={formik.values.color}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="color"
          >
            {COLORS.map((v) => (
              <option key={v} value={v} color={v}>
                {v}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{formik.errors.color}</FormErrorMessage>
        </FormControl>
        <Button
          marginTop={"10px"}
          colorScheme="teal"
          size="md"
          onClick={formik.submitForm}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default AddForm;
