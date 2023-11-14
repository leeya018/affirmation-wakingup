import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { formatDate } from "@/util";
import { UserStore } from "mobx/userStore";

export default function Calender() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        onChange={(value) => {
          // console.log(value);

          UserStore.setChosenDate(new Date(value));
        }}
      />
    </LocalizationProvider>
  );
}
