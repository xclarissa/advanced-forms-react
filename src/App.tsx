import { useForm } from "react-hook-form";
import "./styles/global.css";
import { Form } from "./Form";

function App() { 

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <Form /> 
    </main>
  );
}

export default App;
