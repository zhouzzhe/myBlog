"use client";
import {
  RegisterOptions,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";

// 輸入框
interface InputProp {
  label: string;
  LabelClassName?: string;
  name: string;
  rows?: number;
  placeHolder?: string;
  register: UseFormRegister<any>;
  errors: any; // 錯誤物件
  validation?: RegisterOptions; // 可選的驗證規則
}
function UserInput({ register, errors, validation, ...arg }: InputProp) {
  return (
    <div className="flex-grow font-medium leading-10">
      <label className="flex flex-row">
        <span className={`w-16 ${arg.LabelClassName}`}>{arg.label}</span>
        {arg.name === "email" ? (
          <input
            type="email"
            // name={arg.name}
            className={`flex-grow resize-none border bg-gray-100 pl-4 placeholder:text-gray-500 ${errors[arg.name] ? "border-red-500" : ""}`}
            placeholder={arg.placeHolder}
            {...register(arg.name, validation)}
          />
        ) : (
          <textarea
            // name={arg.name}
            rows={arg.rows ?? 1}
            className={`flex-grow resize-none border bg-gray-100 pl-4 placeholder:text-gray-500 ${errors[arg.name] ? "border-red-500" : ""}`}
            placeholder={arg.placeHolder}
            {...register(arg.name, validation)}
          ></textarea>
        )}
      </label>
      {errors[arg.name] && (
        <p className="mt-1 text-sm text-red-500">{errors[arg.name].message}</p>
      )}
    </div>
  );
}

interface FormValues {
  lastName: string;
  firstName: string;
  email: string;
  title: string;
  message: string;
}

export default function Contact() {
  // 處理表單提交（發送到 Formspree）
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("https://formspree.io/f/mdkaqqrp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("感謝您的提交！。");
      } else {
        alert("提交失敗，請稍後再試。");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("發生錯誤。");
    }
  };

  // 初始化 react-hook-form
  const {
    register, // 註冊輸入字段
    handleSubmit, // 處理表單提交
    formState: { errors }, // 獲取驗證錯誤
  } = useForm<FormValues>({
    mode: "onBlur", // 當失去焦點時驗證
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-8 my-[88px] flex max-w-[900px] flex-col gap-8 rounded-[10px] bg-white p-14 lg:mx-auto xl:mx-20 xl:ml-auto"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-8">
        <UserInput
          label="姓"
          name="lastName"
          register={register}
          errors={errors}
          validation={{ required: "姓氏不能為空" }}
        />
        <UserInput
          name="firstName"
          label="名"
          LabelClassName="lg:text-center"
          register={register}
          errors={errors}
          validation={{ required: "名字不能為空" }}
        />
      </div>
      <UserInput
        name="email"
        label="Email"
        placeHolder="mail@example.com"
        register={register}
        errors={errors}
        validation={{
          required: "Email 不能為空",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "請輸入有效的 Email 地址",
          },
        }}
      />
      <UserInput
        name="title"
        label="標題"
        placeHolder="請輸入標題..."
        register={register}
        errors={errors}
        validation={{ required: "標題不能為空" }}
      />
      <UserInput
        name="message"
        label="留言"
        rows={4}
        placeHolder="請輸入留言..."
        register={register}
        errors={errors}
      />

      <div className="group relative mx-auto w-36 border border-black">
        <button
          type="submit"
          className="relative z-10 w-full leading-10 text-white mix-blend-difference"
        >
          送出
        </button>
        <div className="absolute inset-0 z-0 w-0 origin-left bg-black transition-all duration-300 ease-in-out group-hover:w-full"></div>
      </div>
    </form>
  );
}
