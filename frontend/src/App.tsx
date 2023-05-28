import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import axios from "axios";

type RegisterForm = {
  email: string;
  password: string;
};

function App() {
  const [count, setCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  async function onSubmit(data: RegisterForm) {
    console.log(data);
    const res = await axios.post(
      `${import.meta.env.VITE_PUBLIC_API_URL}/auth/login`,
      data
    );
    console.log(res);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          placeholder='Email'
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <input
          type='password'
          placeholder='Password'
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input type='submit' />
      </form>
    </>
  );
}

export default App;
