import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ConfigProvider, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";
import { getDatabase, update, ref } from "firebase/database";
import { Theme } from "@mui/material/styles";
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

interface DatePickerValueProps {
  theme: Theme;
}

interface RootState {
  viewListener: {
    screenWidth767: boolean;
  };
  notebookData: {
    notebooks: Array<{
      chapters?: Array<{
        id: string;
        start: string;
        end: string;
        [key: string]: any;
      }>;
    }>;
    focusNotebookAndChapterIndex: {
      notebookIndex: number;
      chapterIndex: number;
    };
  };
}

export default function DatePickerValue(props: DatePickerValueProps) {
  const { theme } = props;
  const screenSmall767 = useSelector(
    (state: RootState) => state.viewListener.screenWidth767
  );

  const allNotebookData = useSelector((state: RootState) => state.notebookData.notebooks);

  const focusNotebookAndChapterIndex = useSelector(
    (state: RootState) => state.notebookData.focusNotebookAndChapterIndex
  );
  const notebookIndex = focusNotebookAndChapterIndex.notebookIndex;
  const chapterIndex = focusNotebookAndChapterIndex.chapterIndex;

  const uid = window.localStorage.getItem("uid");

  const [startvalue, setStartValue] = useState("2024-01-01");
  const [endvalue, setEndValue] = useState("2024-01-02");

  const handleNewDate = (startValue: Dayjs, endValue: Dayjs) => {
    setStartValue(startValue.format(dateFormat));
    setEndValue(endValue.format(dateFormat));
    handleUpdateNewDate(
      dayjs(startValue).format(dateFormat),
      dayjs(endValue).format(dateFormat)
    );
  };

  const handleUpdateNewDate = (startValue: string, endValue: string) => {
    const db = getDatabase();
    const currentChapter = allNotebookData[notebookIndex]?.chapters?.[chapterIndex];
    if (!currentChapter) return;
    
    const postData = {
      ...currentChapter,
      start: startValue,
      end: endValue,
    };

    const dataPath = `/users/${uid}/notebooks/${notebookIndex}/chapters/${chapterIndex}`;

    const updates: { [key: string]: any } = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  useEffect(() => {
    let tempStartValue: string | null =
      allNotebookData[notebookIndex]?.chapters === undefined
        ? null
        : allNotebookData[notebookIndex]?.chapters?.[chapterIndex]?.start || null;
    let tempEndValue: string | null =
      allNotebookData[notebookIndex]?.chapters === undefined
        ? null
        : allNotebookData[notebookIndex]?.chapters?.[chapterIndex]?.end || null;

    setStartValue(tempStartValue || "2024-01-01");
    setEndValue(tempEndValue || "2024-01-02");
  }, [focusNotebookAndChapterIndex, allNotebookData, notebookIndex, chapterIndex]);

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
            font-weight: 500;
          }

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker {
            padding: 2px;
          }

          :where(.css-dev-only-do-not-override-abqk3i).ant-picker-focused.ant-picker    {
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
            colorBorder: `${theme.palette.secondary.main}`,
            colorText: `${theme.palette.secondary.main}`,
            colorIcon: `${theme.palette.secondary.main}`,
            colorIconHover: `${theme.palette.secondary.main}`,
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
              if (newValue && newValue[0] && newValue[1]) {
                const [startValue, endValue] = newValue;
                handleNewDate(startValue, endValue);
              }
            }}
          />
        </Space>
      </ConfigProvider>
    </Fragment>
  );
}
