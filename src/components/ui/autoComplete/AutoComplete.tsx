import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useField, useFormikContext } from "formik";
import { IDropDown } from "@/src/features/habits/types/IDropDown";
import ChevronDownIcon from "../../icons/arrow-down.svg";
import CloseRedIcon from "../../icons/closeRedIcon.svg";
import Loading from "../loading/Loading";

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  innerClassName?: string;
  help?: string | ReactNode;
  icon?: ReactNode;
  onChange?: (option: IDropDown) => void;
  options: IDropDown[];
  value?: unknown;
  isMulty?: boolean;
  inputClassName?: string;
  readonly?: boolean;
  isLoading?: boolean;
}

const AutoComplete: React.FC<Props> = ({
  innerClassName,
  onChange,
  name,
  placeholder,
  label = "",
  className = "",
  isMulty = false,
  inputClassName,
  help,
  icon,
  options,
  readonly = false,
  isLoading = false,
}) => {
  const [field, { error, touched }] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [showOptions, setShowOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    if (isMulty) return null;

    return options.find((opt) => opt.value === field.value) || null;
  }, [options, field.value, isMulty]);


  const multySelect = useMemo(() => {
    if (!isMulty || !Array.isArray(field.value)) {
      return [];
    }

    return options.filter((opt) => field.value.includes(opt.value));
  }, [field.value, options, isMulty]);


  const filteredOptions = useMemo(() => {
    if (!searchValue.trim()) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [options, searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowOptions(true);
  };

  const handleOptionSelect = (option: IDropDown) => {
    if (isMulty) {
      const alreadyExists = multySelect.some(
        (item) => item.value === option.value,
      );

      if (!alreadyExists) {
        const updatedSelection = [...multySelect, option];

        setFieldValue(
          name,
          updatedSelection.map((item) => item.value),
        );
      }
      setShowOptions(false);
      setSearchValue("");
    } else {
      setFieldValue(name, option.value);
      // setSearchValue(option.label);
    }

    setShowOptions(false);

    onChange?.(option);
  };

  const handleRemove = (value: unknown) => {
    const updatedSelection = multySelect.filter(
      (option) => option.value !== value,
    );

    setFieldValue(
      name,
      updatedSelection.map((item) => item.value),
    );
  };

const toggleDropdown = () => {
  if (!readonly) {
    setShowOptions((prev) => {
      const next = !prev;

      if (next) {
        setSearchValue("");
      }

      return next;
    });
  }
};

const inputValue = isMulty
  ? searchValue
  : searchValue || selectedOption?.label || "";


  return (
    <div
      className={`form-control w-full flex flex-col gap-2 ${className}`}
      ref={wrapperRef}
    >
      {label && (
        <label
          className={`label  font-medium text-sm ${
            readonly ? "text-[#6B7280]" : "text-gray-900"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <div
          className={`flex items-center cursor-pointer ${innerClassName}`}
          onClick={toggleDropdown}
        >
          {icon && <div className="absolute right-4 top-2 p-2">{icon}</div>}

          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            disabled={readonly}
            autoComplete="off"
            className={`
              input w-full text-base text-[#6B7280] font-medium
              rounded-[12px] h-[48px]
              focus-within:outline-none
              focus-within:border-none
              ${readonly ? "hover:cursor-default border-none" : ""}
              ${icon ? "pr-12" : ""}
              ${touched && error ? "input-error" : ""}
              ${inputClassName}
            `}
          />

          {!readonly && (
            <button
              type="button"
              className="absolute left-4 focus:outline-none"
            >
              <ChevronDownIcon />
            </button>
          )}
        </div>

        {showOptions && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-[16px] shadow max-h-40 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-2">
                <Loading />
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={String(option.value)}
                  className="px-4 py-2 font-semibold text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 font-semibold text-sm text-gray-500">
                داده‌ای موجود نیست
              </li>
            )}
          </ul>
        )}

        {isMulty && multySelect.length > 0 && (
          <div className="flex flex-wrap gap-[8px] mt-2">
            {multySelect.map((value) => (
              <div
                key={String(value.value)}
                className="border-2 max-w-fit rounded-lg border-[#FF7959] bg-[#FF7F7E10] flex items-center text-[#FF7959] text-[12px] font-bold py-1 px-3 gap-1"
              >
                {value.label}

                <CloseRedIcon
                  className="cursor-pointer"
                  onClick={() => handleRemove(value.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {touched && error ? (
        <p className="text-error text-sm mt-1">{error}</p>
      ) : (
        help && <p className="text-gray-500 text-sm mt-1">{help}</p>
      )}
    </div>
  );
};

export default AutoComplete;
