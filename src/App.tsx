import { useForm } from "react-hook-form";
import "./styles/global.css";
import { Form } from "./Form";
import { CustomForm } from "./FormDevJr/CustomForm";

function App() { 

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      {/* <Form />  */}
      <CustomForm />
    </main>
  );
}

export default App;
