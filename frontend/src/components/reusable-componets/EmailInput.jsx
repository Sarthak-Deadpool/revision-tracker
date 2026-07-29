import { Mail } from "lucide-react";
import TextInput from "./TextInput";

function EmailInput(props) {
  return (
    <TextInput
      type="email"
      autoComplete="email"
      icon={Mail}
      {...props}
    />
  );
}

export default EmailInput;