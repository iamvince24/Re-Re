import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import dayjs from "dayjs";
import { ConfigProvider, Space } from "antd";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";

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
const dateFormat = "YYYY-MM-DD";

export default function DatePickerValue(props) {
  const { notebookData, notebookDisplay } = props;

  const targetNotebook = notebookData.filter((notebook) => {
    if (notebook.id === notebookDisplay.notebookId) {
      return notebook;
    }
  });

  const chapter = targetNotebook[0].Chapters.filter((chapter) => {
    if (chapter.id === notebookDisplay.chapterId) {
      return chapter;
    }
  });

  const uid = window.localStorage.getItem("uid");
  let notebookIdForFunc = 0;
  let chapterIdForFunc = 0;

  for (var i = 0; i < props.notebookData.length; i++) {
    if (props.notebookData[i]?.id === props.id) {
      notebookIdForFunc = i;
      if (props.chapterId !== undefined) {
        for (var j = 0; j < props.notebookData[i].Chapters.length; j++) {
          if (
            props.notebookData[notebookIdForFunc].Chapters[j]?.id ===
            props.chapterId
          ) {
            chapterIdForFunc = j;
            break;
          }
        }
      } else {
        break;
      }
    }
  }

  const [startvalue, setStartValue] = useState(
    notebookData[notebookIdForFunc].Chapters[chapterIdForFunc].start
  );
  const [endvalue, setEndValue] = useState(
    notebookData[notebookIdForFunc].Chapters[chapterIdForFunc].end
  );

  function handleNewDate(startValue, endValue) {
    setStartValue(startValue);
    setEndValue(endValue);
    handleUpdateNewDate(
      dayjs(startValue).format(dateFormat),
      dayjs(endValue).format(dateFormat)
    );
  }

  const handleUpdateNewDate = (startValue, endValue) => {
    const db = getDatabase();
    const postData = {
      ...chapter[0],
      start: startValue,
      end: endValue,
    };

    const dataPath = `/users/${uid}/notebooks/${notebookIdForFunc}/Chapters/${chapterIdForFunc}`;

    const updates = {};
    updates[dataPath] = postData;

    return update(ref(db), updates);
  };

  useEffect(() => {
    setStartValue(dayjs(chapter[0]?.start));
    setEndValue(dayjs(chapter[0]?.end));
  }, [notebookData, notebookDisplay]);

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

          .custom-range-picker .anticon.anticon-swap-right {
            color: #2e4af3;
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
          }

          .custom-range-picker .ant-picker-input input:hover {
            background: rgb(112, 132, 255, 0.2);
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
        `}
      </style>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2E4AF3",
            borderRadius: 4,
            hoverBorderColor: "#2E4AF3",
            colorBorder: "#2E4AF3",
            colorText: "#2E4AF3",
            colorIcon: "#2E4AF3",
            colorIconHover: "#2E4AF3",
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
              background: "rgb(112,132,255,0.1)",
              marginTop: "-10px",
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
