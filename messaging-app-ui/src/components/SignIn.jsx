import useSignIn from "../hooks/useSignIn";
import Notify from "./Notify";

import { Pressable, View, Text } from "react-native";
import { Formik, useField } from "formik";
import FormikFormField from "./FormikFormField";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [usernameField, usernameMeta, usernameHelpers] = useField("username");
  const [passowordField, passwordMeta, passwordHelpers] = useField("password");

  const handleSignUp = () => {
    console.log("Sign up pressed");
    navigate("/signup");
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

      <Pressable
        onPress={onSubmit}
        className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-green-600 bg-green-600 rounded-xl 
                 active:scale-95 transition"
      >
        <Text className="text-xl font-bold text-slate-200">Sign in</Text>
      </Pressable>

      <View className="mt-4 flex justify-center items-center">
        <Text className="font-semibold">Don't have an account?</Text>
      </View>

      <Pressable
        onPress={handleSignUp}
        className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-green-600 rounded-xl text-xl font-bold text-slate-200
                 active:scale-95 transition"
      >
        <Text className="text-xl font-bold text-green-600">Sign up Here</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit, notify }) => {
  return (
    <View className="w-full flex-grow flex flex-col justify-center items-center">
      <Notify notify={notify} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignIn = ({ notify }) => {
  const navigate = useNavigate();
  const [signIn, result] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log("Logging in with the following values:");
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const { data } = await signIn({
        username: username.toLowerCase(),
        password,
      });
      navigate("/");
      values.username = "";
      values.password = "";
    } catch (error) {
      console.log("Error signing in:", error);
      notify.show({ content: result.error.message, isError: true });
    }
  };

  return <SignInContainer onSubmit={onSubmit} notify={notify} />;
};

export default SignIn;
