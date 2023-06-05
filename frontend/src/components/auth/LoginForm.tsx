import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            placeholder='Email'
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <input type='submit' />
      </form>
    </>
  );
}
