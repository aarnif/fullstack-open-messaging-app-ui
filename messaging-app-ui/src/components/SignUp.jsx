import Notify from "./Notify";
import Header from "./Header";

import { Pressable, View, Text } from "react-native";
import { Formik, useField } from "formik";
import FormikFormField from "./FormikFormField";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username must be no more than 20 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be no more than 30 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match!")
    .required("Password confirmation is required"),
});

const SignUpForm = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passowordField, passwordMeta, passwordHelpers] = useField("password");
  const [confirmPasswordField, confirmPasswordMeta, confirmPasswordHelpers] =
    useField("confirmPassword");

  const handleGoBack = () => {
    console.log("Go back pressed");
    navigate("/signin");
  };

  return (
    <View className="w-full p-8 flex-grow flex flex-col">
      <FormikFormField
        name="username"
        placeholder="Username"
        value={usernameField.value}
        onChangeText={(text) => usernameHelpers.setValue(text)}
      ></FormikFormField>

      <FormikFormField
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        value={passowordField.value}
        onChangeText={(text) => passwordHelpers.setValue(text)}
      ></FormikFormField>

      <FormikFormField
        name="confirmPassword"
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPasswordField.value}
        onChangeText={(text) => confirmPasswordHelpers.setValue(text)}
      ></FormikFormField>

      <Pressable
        onPress={onSubmit}
        className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-green-600 bg-green-600 rounded-xl 
                 active:scale-95 transition"
      >
        <Text className="text-xl font-bold text-slate-200">Sign Up</Text>
      </Pressable>

      <Pressable
        onPress={handleGoBack}
        className="w-full flex-grow max-h-[60px] mt-4 p-2 flex justify-center items-center border-2 border-red-400 bg-red-400 rounded-xl 
                 active:scale-95 transition"
      >
        <Text className="text-xl font-bold text-slate-200">Cancel</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit, notify }) => {
  return (
    <View className="w-full flex-grow flex justify-center items-center bg-white">
      <Notify notify={notify} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignUp = ({ notify }) => {
  const [mutate] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      notify.show({ content: error.graphQLErrors[0].message, isError: true });
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password, confirmPassword } = values;
    console.log("Try to sign up with the following values:");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const { data, error } = await mutate({
        variables: { username: username.toLowerCase(), password },
      });

      if (data) {
        console.log("Created user:", data);
        navigate("/signin");
        values.username = "";
        values.password = "";
        values.confirmPassword = "";
        notify.show({ content: "User created successfully!", isError: false });
      }
    } catch (error) {
      console.log("Error creating user:", error);
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <SignUpContainer onSubmit={onSubmit} notify={notify} />
    </>
  );
};

export default SignUp;
