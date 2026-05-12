import * as Yup from "yup";

   export const validationSchemas = [
     Yup.object({
       HabitName: Yup.string().required("First name is required"),
       HabitType: Yup.string(),
       HabitFrequency: Yup.string(),
     }),
     Yup.object({
       HabitName: Yup.string(),
       HabitType: Yup.string(),
       HabitFrequency: Yup.string(),
     }),
     Yup.object({
       HabitName: Yup.string(),
       HabitType: Yup.string(),
       HabitFrequency: Yup.string()
        
     }),
   ];