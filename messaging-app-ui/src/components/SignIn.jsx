import Header from "./Header";
import useAuthStorage from "../hooks/useAuthStorage";
import { LOGIN } from "../graphql/mutations";

import { Pressable, View, Text } from "react-native";
import { Formik, useField } from "formik";
import FormikFormField from "./FormikFormField";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useApolloClient, useMutation } from "@apollo/client";

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
        <Text className="font-semibold dark:text-slate-200">
          Don't have an account?
        </Text>
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

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View className="w-full flex-grow flex justify-center items-center bg-white dark:bg-slate-700">
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
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const [mutate] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      notify.show({ content: error.graphQLErrors[0].message, isError: true });
    },
  });

  const signIn = async (token) => {
    await authStorage.setAccessToken(token);
    await client.resetStore();
    navigate("/");
    values.username = "";
    values.password = "";
  };

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log("Logging in with the following values:");
    console.log("Username:", username);
    console.log("Password:", password);

    const { data } = await mutate({
      variables: { username: username.toLowerCase(), password },
    });

    if (data) {
      await signIn(data.login.value);
    }
  };

  return (
    <>
      <Header />
      <SignInContainer onSubmit={onSubmit} />
    </>
  );
};

export default SignIn;
