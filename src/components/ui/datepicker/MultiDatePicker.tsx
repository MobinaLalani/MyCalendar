import React from "react";
import DatePicker from "react-multi-date-picker";
import type { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import CalIcon from "../../icons/calenderIcon.svg";

interface Props {
  value: DateObject | null | string;
  setFieldValue: (field: string, value: string | null) => void;
  label?: string;
  name?: string;
  placeholder?: string;
}

const MultiDatePicker = ({
  value,
  setFieldValue,
  label = "تاریخ",
  placeholder='تاریخ',
  name = "toDate",
}: Props) => {
  return (
    <div className="w-full max-w-2xl">
      <label className="mb-3 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-gray-500 pointer-events-none">
          <CalIcon />
        </span>
        <DatePicker
          value={value}
          onChange={(date: DateObject | null) => {
            setFieldValue(name, date ? date.toDate().toISOString() : null);
          }}
          placeholder={placeholder}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          inputClass="pl-10 pr-4 border border-gray-700 rounded-2xl py-2 text-[#073054] text-base font-bold w-full"
          containerClassName="w-full"
        />
      </div>
    </div>
  );
};

export default MultiDatePicker;
