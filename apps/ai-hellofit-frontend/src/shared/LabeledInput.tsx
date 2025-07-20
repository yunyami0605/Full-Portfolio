import { Input, Label } from "@my/ui";

type LabeledInputProps = {
  required?: boolean;
  error?: string;
  label?: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameContainer?: string;
  className?: string;
};

/**
 *@description
 */
export const LabeledInput = ({
  id,
  required,
  error,
  label,
  value,
  onChange,
  classNameContainer,
  className,
}: LabeledInputProps) => {
  return (
    <div className={classNameContainer}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <Input id={id} value={value} onChange={onChange} className={className} />

      {error && <p>{error}</p>}
    </div>
  );
};
