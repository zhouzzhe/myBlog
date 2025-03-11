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
    <div
      className={`flex-grow font-medium leading-10 ${!errors[arg.name] ? "mb-8" : ""}`}
    >
      <label className="flex flex-row">
        <span className={`w-16 ${arg.LabelClassName}`}>{arg.label}</span>
        {arg.name === "email" ? (
          <input
            type="email"
            // name={arg.name}
            className={`flex-grow resize-none border bg-gray-100 pl-4 placeholder:text-gray-500 ${errors[arg.name] ? "animate-headShake rounded-lg border-red-500" : ""}`}
            placeholder={arg.placeHolder}
            {...register(arg.name, validation)}
          />
        ) : (
          <textarea
            // name={arg.name}
            rows={arg.rows ?? 1}
            className={`flex-grow resize-none border bg-gray-100 pl-4 placeholder:text-gray-500 ${errors[arg.name] ? "animate-headShake rounded-lg border-red-500" : ""}`}
            placeholder={arg.placeHolder}
            {...register(arg.name, validation)}
          ></textarea>
        )}
      </label>
      {errors[arg.name] && (
        <div className="animate-headShake text-end text-[1px] italic leading-8 text-red-500">
          {errors[arg.name].message}
        </div>
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
  // 處理表單提交（發送到 Google Sheet)
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new URLSearchParams();
      formData.append("entry.1556277790", data.lastName);
      formData.append("entry.278932847", data.firstName);
      formData.append("entry.404461136", data.email);
      formData.append("entry.1041210156", data.title);
      formData.append("entry.361593399", data.message);

      const response = await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSdAPhZ5xvuTW5Rv-qVVo0qhPyI11vnZ-_1O9hlnsqoiPoLDVA/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        },
      );
      alert("感謝您的提交！");
      reset();
      // const result = await response.json();
      // if (result.status === "success") {
      //   alert("感謝您的提交！已記錄");
      //   reset();
      // } else {
      //   alert("提交失敗" + result.message);
      // }
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
    reset, // 添加 reset 用於提交後清空表單
  } = useForm<FormValues>({
    mode: "onBlur", // 當失去焦點時驗證
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-8 my-[88px] flex max-w-[900px] flex-col rounded-[10px] bg-white p-14 lg:mx-auto xl:mx-20 xl:ml-auto"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-8">
        <UserInput
          label="姓"
          name="lastName"
          register={register}
          errors={errors}
          validation={{ required: "請填入姓氏" }}
        />
        <UserInput
          name="firstName"
          label="名"
          LabelClassName="lg:text-center"
          register={register}
          errors={errors}
          validation={{ required: "請填入名字" }}
        />
      </div>
      <UserInput
        name="email"
        label="Email"
        placeHolder="mail@example.com"
        register={register}
        errors={errors}
        validation={{
          required: "請填入Email",
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
        validation={{ required: "請填入標題" }}
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

// 網址
// https://script.google.com/macros/s/AKfycbziGlmJ4O9fwEdQ5hzlf2K_D0cufAzLaGaov877xF4_PEO5SrLPh85hMLTZjpP8jZwI/exec
// 部署ＩＤ
// AKfycbziGlmJ4O9fwEdQ5hzlf2K_D0cufAzLaGaov877xF4_PEO5SrLPh85hMLTZjpP8jZwI
