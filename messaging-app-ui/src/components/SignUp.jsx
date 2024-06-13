import { Pressable, View, Text } from "react-native";
import { Formik, useField } from "formik";
import FormikFormField from "./FormikFormField";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
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
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passowordField, passwordMeta, passwordHelpers] = useField("password");
  const [confirmPasswordField, confirmPasswordMeta, confirmPasswordHelpers] =
    useField("confirmPassword");

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
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View className="w-full flex-grow flex flex-col justify-center items-center">
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

const SignIn = () => {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log("Signing up with the following values:");
    console.log("Username:", username);
    console.log("Password:", password);
    navigate("/");
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignIn;
