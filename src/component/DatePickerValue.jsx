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

  let targetNotebook = notebookData.filter((notebook) => {
    if (notebook.id === notebookDisplay.notebookId) {
      return notebook;
    }
  });

  let chapter = targetNotebook[0].Chapters.filter((chapter) => {
    if (chapter.id === notebookDisplay.chapterId) {
      return chapter;
    }
  });

  const uid = window.localStorage.getItem("uid");
  let notebookIdForFunc = 0;
  let chapterIdForFunc = 0;

  // for (var i = 0; i < props.notebookData.length; i++) {
  //   if (props.notebookData[i]?.id === props.id) {
  //     notebookIdForFunc = i;
  //     if (props.chapterId !== undefined) {
  //       for (var j = 0; j < props.notebookData[i].Chapters.length; j++) {
  //         if (
  //           props.notebookData[notebookIdForFunc].Chapters[j]?.id ===
  //           props.chapterId
  //         ) {
  //           chapterIdForFunc = j;
  //           break;
  //         }
  //       }
  //     } else {
  //       break;
  //     }
  //   }
  // }

  for (var i = 0; i < props.notebookData.length; i++) {
    if (props.notebookData[i]?.id === notebookDisplay.notebookId) {
      notebookIdForFunc = i;
      if (props.chapterId !== undefined) {
        for (var j = 0; j < props.notebookData[i].Chapters.length; j++) {
          if (
            props.notebookData[notebookIdForFunc].Chapters[j]?.id ===
            notebookDisplay.chapterId
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

  // console.log(notebookIdForFunc, chapterIdForFunc);

  // const [startvalue, setStartValue] = useState(
  //   notebookData[notebookIdForFunc]?.Chapters[chapterIdForFunc].start
  // );
  // const [endvalue, setEndValue] = useState(
  //   notebookData[notebookIdForFunc]?.Chapters[chapterIdForFunc].end
  // );

  const [startvalue, setStartValue] = useState(dayjs(chapter[0]?.start));
  const [endvalue, setEndValue] = useState(dayjs(chapter[0]?.end));

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
    for (var i = 0; i < props.notebookData.length; i++) {
      if (props.notebookData[i]?.id === notebookDisplay.notebookId) {
        notebookIdForFunc = i;
        for (var j = 0; j < props.notebookData[i].Chapters.length; j++) {
          if (
            props.notebookData[notebookIdForFunc].Chapters[j]?.id ===
            notebookDisplay.chapterId
          ) {
            chapterIdForFunc = j;
            break;
          }
        }
      }
    }

    setStartValue(
      notebookData[notebookIdForFunc]?.Chapters[chapterIdForFunc].start
    );
    setEndValue(
      notebookData[notebookIdForFunc]?.Chapters[chapterIdForFunc].end
    );
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
            colorPrimary: `${props.theme.palette.secondary.main}`,
            borderRadius: 4,
            hoverBorderColor: `${props.theme.palette.secondary.main}`,
            colorBorder: `${props.theme.palette.secondary.main}`,
            colorText: `${props.theme.palette.secondary.main}`,
            colorIcon: `${props.theme.palette.secondary.main}`,
            colorIconHover: `${props.theme.palette.secondary.main}`,
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
              background: `${props.theme.palette.primary.main}`,
              zIndex: "10000",
              height: props.isSmallScreen ? "35px" : "42px",
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
