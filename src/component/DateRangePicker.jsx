import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import dayjs from "dayjs";
import { ConfigProvider, Space } from "antd";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import { months } from "../utils/constants";

import {
  getDatabase,
  set,
  remove,
  update,
  ref,
  push,
  child,
} from "firebase/database";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
// const dateFormat = "YYYY-MM-DD";
const dateFormat = "YYYY-MM";

export default function DateRangePicker(props) {
  const { notebookData, notebookDisplay, timeRange, setTimeRange } = props;
  const [startvalue, setStartValue] = useState(
    `${timeRange.fromSelectYear}-${months[timeRange.fromSelectMonth]}`
  );
  const [endvalue, setEndValue] = useState(
    `${timeRange.toSelectYear}-${months[timeRange.toSelectMonth]}`
  );

  function handleNewDate(startValue, endValue) {
    setStartValue(startValue);
    setEndValue(endValue);
  }

  return (
    <Fragment>
      <style>
        {`
          .custom-range-picker .ant-picker-suffix {
            display: none;
          }

          .custom-range-picker .ant-picker-clear {
            display: none;
          }

          .custom-range-picker .ant-picker-suffix:hover {
            display: none;
          }

          .custom-range-picker .ant-picker-icon {
            color: green;
          }

          .anticon .anticon-swap-right {
            color: var(--secondary-color);
          }

          .custom-range-picker .anticon.anticon-swap-right {
            color: ${props.theme.palette.secondary.main};
          }

          :where(.css-dev-only-do-not-override-1w61365).ant-picker-range {
            padding: 7.5px 7.5px;
          }

          .custom-range-picker .ant-picker-input input {
            width: 100px;
            cursor: pointer;
            letter-spacing: 1px;
            padding: 2.5px;
            border-radius: 4px;
            text-align: center;
            font-weight: 700;
          }

          .custom-range-picker .ant-picker-input input:hover {
            background: rgb(214, 159, 149, 0.15);
          }

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker {
            padding: 2px;
          }

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker-focused.ant-picker {
            box-shadow: none;
          }

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker-range .ant-picker-active-bar {
            margin-inline-start: 0px;
          }

          :where(.css-dev-only-do-not-override-1w61365).ant-picker-dropdown {
            z-index: 10000;
          }

          .ant-picker-dropdown-range {
            z-index: 10000;
          }
        `}
      </style>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: `${props.theme.palette.secondary.main}`,
            borderRadius: 4,
            hoverBorderColor: `${props.theme.palette.secondary.main}`,
            colorBorder: `${props.theme.palette.secondary.main}`,
            colorText: `${props.theme.palette.secondary.main}`,
            colorIcon: `${props.theme.palette.secondary.main}`,
            colorIconHover: `${props.theme.palette.secondary.main}`,
            warningActiveShadow: "none",
            colorBgContainer: "#F3D9D2",
            cellActiveWithRangeBg: "#F3D9D2",
          },
        }}
      >
        <Space direction="vertical" size={12}>
          <RangePicker
            style={{
              border: "none",
              background: `${props.theme.palette.primary.main}`,
              zIndex: "10000",
              height: "42px",
            }}
            picker="month"
            allowClear={false}
            allowEmpty={[false, false]}
            value={[dayjs(startvalue), dayjs(endvalue)]}
            format={dateFormat}
            className="custom-range-picker"
            onChange={(newValue) => {
              const [startValue, endValue] = newValue;
              handleNewDate(startValue, endValue);
              setTimeRange((prevState) => ({
                ...prevState,
                fromSelectMonth: startValue.$M,
                fromSelectYear: `${startValue.$y}`,
                toSelectMonth: endValue.$M,
                toSelectYear: `${endValue.$y}`,
              }));
            }}
          />
        </Space>
      </ConfigProvider>
    </Fragment>
  );
}
