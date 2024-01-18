import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import dayjs from "dayjs";
import { ConfigProvider, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";
import { getDatabase, update, ref } from "firebase/database";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export default function DatePickerValue(props) {
  const { theme } = props;
  const screenSmall767 = useSelector(
    (state) => state.viewListener.screenWidth767
  );

  const allNotebookData = useSelector((state) => state.notebookData.notebooks);

  const focusNotebookAndChapterIndex = useSelector(
    (state) => state.notebookData.focusNotebookAndChapterIndex
  );
  const notebookIndex = focusNotebookAndChapterIndex.notebookIndex;
  const chapterIndex = focusNotebookAndChapterIndex.chapterIndex;

  const uid = window.localStorage.getItem("uid");

  const [startvalue, setStartValue] = useState("2024-01-01");
  const [endvalue, setEndValue] = useState("2024-01-02");

  const handleNewDate = (startValue, endValue) => {
    setStartValue(startValue);
    setEndValue(endValue);
    handleUpdateNewDate(
      dayjs(startValue).format(dateFormat),
      dayjs(endValue).format(dateFormat)
    );
  };

  const handleUpdateNewDate = (startValue, endValue) => {
    const db = getDatabase();
    const postData = {
      ...allNotebookData[notebookIndex]?.chapters[chapterIndex],
      start: startValue,
      end: endValue,
    };

    const dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters/${chapterIndex}`;

    const updates = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  useEffect(() => {
    setStartValue(allNotebookData[notebookIndex]?.chapters[chapterIndex].start);
    setEndValue(allNotebookData[notebookIndex]?.chapters[chapterIndex].end);
  }, [focusNotebookAndChapterIndex]);

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

          .custom-range-picker .ant-picker-input input:hover {
            background: rgb(198, 198, 198, 0.3);
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

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker {
            padding: 2px;
          }

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker-focused.ant-picker {
            box-shadow: none;
          }

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker-range .ant-picker-active-bar {
            margin-inline-start: 0px;
          }

          .ant-picker-dropdown-range {
            z-index: 10000;
          }

          .anticon svg {
            ${props.theme.palette.secondary.main}
          }
        `}
      </style>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: `${theme.palette.secondary.main}`,
            borderRadius: 4,
            hoverBorderColor: `${theme.palette.secondary.main}`,
            colorBorder: `${theme.palette.secondary.main}`,
            colorText: `${theme.palette.secondary.main}`,
            colorIcon: `${theme.palette.secondary.main}`,
            colorIconHover: `${theme.palette.secondary.main}`,
            warningActiveShadow: "none",
            // colorBgContainer: "#F3D9D2",
            // cellActiveWithRangeBg: "#F3D9D2",
          },
        }}
      >
        <Space direction="vertical" size={12}>
          <RangePicker
            style={{
              border: "none",
              background: `${theme.palette.primary.main}`,
              zIndex: "10000",
              height: screenSmall767 ? "35px" : "42px",
            }}
            allowClear={false}
            allowEmpty={[false, false]}
            value={[dayjs(startvalue), dayjs(endvalue)]}
            format={dateFormat}
            className="custom-range-picker"
            onChange={(newValue) => {
              const [startValue, endValue] = newValue;
              handleNewDate(startValue, endValue);
            }}
          />
        </Space>
      </ConfigProvider>
    </Fragment>
  );
}
