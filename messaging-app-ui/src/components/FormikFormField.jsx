import { useField } from "formik";

import { View, Text, TextInput } from "react-native";

const FormikFormField = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <Text className="text-md font-medium text-slate-700">
        {name === "confirmPassword"
          ? "confirm Password".toUpperCase()
          : name.toUpperCase()}
        :
      </Text>
      <TextInput
        style={{ borderColor: showError ? "red" : "#e2e8f0" }}
        className="w-full flex-grow max-h-[50px] p-2 border rounded-lg bg-slate-200 text-slate-800"
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      <View className="h-[20px]">
        {showError && (
          <Text className="text-md text-red-600">{meta.error}</Text>
        )}
      </View>
    </>
  );
};

export default FormikFormField;
