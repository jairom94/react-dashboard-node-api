import {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import type { InputType } from "./types";

export function createFormFactory<
  T extends Record<string, string | boolean | FileList | null | undefined>,
>() {
  const FormContext = createContext<
    | {
        values: T;
        setFieldValue: <K extends keyof T>(name: K, value: T[K]) => void;
      }
    | undefined
  >(undefined);

  const useField = <K extends keyof T>(
    name: K,
  ): [T[K], (value: T[K]) => void] => {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error("Campo fuera del <Form />");
    return [ctx.values[name], (val) => ctx.setFieldValue(name, val)];
  };

  interface FormProps extends Omit<ComponentProps<"form">, "onSubmit" | "onChange"> {
    initialValue: T;
    onSubmit: (values: T) => void;
    onChange?: (values: T) => void; //test
    children: ReactNode;
  }
  const Form = ({ initialValue, onSubmit, onChange, children, ...props }: FormProps) => {
    const [values, setValues] = useState(initialValue);

    const setFieldValue = <K extends keyof T>(name: K, value: T[K]) => {
      setValues((prev) => {
        const updated = { ...prev, [name]: value }
        onChange?.(updated)
        return updated
      });
    };

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      onSubmit(values);
    };

    return (
      <FormContext.Provider value={{ values, setFieldValue }}>
        <form onSubmit={handleSubmit} {...props}>
          {children}
        </form>
      </FormContext.Provider>
    );
  };

  interface InputProps extends Omit<ComponentProps<"input">, "name" | "type"> {
    name: keyof T;
    type?: InputType;
    label?: string;
  }
  const Input = ({
    name,
    type,
    label,
    className,
    id,
    ...props
  }: InputProps) => {
    const [value, setValue] = useField(name);
    switch (type) {
      case "text":
      case "email":
      case "password":
      case "tel":
      case "search":
      case "url":
      case "number":
      case "date":
      case "time":
      case "month":
      case "week":
      case "datetime-local":
      case "color":
        // console.log(value);

        return (
          <div className="form-field flex flex-col gap-1">
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              type={type}
              name={String(name)}
              value={value as string}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value as T[typeof name])
              }
              className={`rounded-md border px-4 py-2 ${className}`}
              {...props}
            />
          </div>
        );
      case "checkbox":
      case "radio":
        return (
          <div className="form-field flex items-center gap-2">
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              type={type}
              name={String(name)}
              // value={value}
              checked={value as boolean}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.checked as T[typeof name])
              }
              className={`${className}`}
              {...props}
            />
          </div>
        );
      case "file":
        return (
          <div className="form-field flex items-center gap-2">
            <label htmlFor={id}>{label}</label>
            <input
              id={id}
              type={type}
              name={String(name)}
              // value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.files as T[typeof name])
              }
              className={`${className}`}
              {...props}
            />
          </div>
        );
      case "button":
      case "submit":
      case "reset":
      case "image":
        return (
          <div className="form-field flex flex-col">
            <input
              id={id}
              type={type}
              name={String(name)}
              // value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value as T[typeof name])
              }
              className={`rounded-md border px-4 py-2 ${className}`}
              {...props}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return {
    Form,
    Input,    
  };
}
