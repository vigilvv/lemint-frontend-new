import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface RadioOption<T extends string> {
  value: T;
  label: string;
}

interface RadioGroupProps<T extends string> {
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
  className?: string;
}

function RadioGroup<T extends string>({
  options,
  value,
  onChange,
  name,
  className,
}: RadioGroupProps<T>): JSX.Element {
  return (
    <div className={twMerge("flex items-center space-x-4", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className="relative flex items-center cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="absolute w-0 h-0 opacity-0"
          />
          <motion.div
            className={twMerge(
              "flex items-center justify-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              value === option.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            )}
            whileTap={{ scale: 0.95 }}
          >
            <span className="whitespace-nowrap">{option.label}</span>
          </motion.div>
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
