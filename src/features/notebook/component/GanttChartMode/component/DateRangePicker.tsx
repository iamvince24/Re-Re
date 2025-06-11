import * as React from 'react'
import { Fragment, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { ConfigProvider, Space } from 'antd'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { DatePicker } from 'antd'
import { months } from '../../../../../utils/constants'
import { Theme } from '@mui/material/styles'
import { TimeRange } from '../types'
dayjs.extend(customParseFormat)

const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM'

interface DateRangePickerProps {
  timeRange: TimeRange
  setTimeRange: React.Dispatch<React.SetStateAction<TimeRange>>
  theme: Theme
}

export default function DateRangePicker(props: DateRangePickerProps) {
  const { timeRange, setTimeRange, theme } = props
  const [startvalue, setStartValue] = useState(`${timeRange.fromSelectYear}-${months[timeRange.fromSelectMonth]}`)
  const [endvalue, setEndValue] = useState(`${timeRange.toSelectYear}-${months[timeRange.toSelectMonth]}`)

  function handleNewDate(startValue: Dayjs, endValue: Dayjs) {
    setStartValue(startValue.format(dateFormat))
    setEndValue(endValue.format(dateFormat))
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

          // .custom-range-picker .ant-picker-icon {
          //   color: green;
          // }

          // .anticon .anticon-swap-right {
          //   color: var(--secondary-color);
          // }

          // .custom-range-picker .anticon.anticon-swap-right {
          //   color: ${props.theme.palette.secondary.main};
          // }

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

          .custom-range-picker .ant-picker-input input:hover {
            background: rgb(198, 198, 198, 0.3);
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

          :where(.css-dev-only-do-not-override-74037d).ant-picker-focused.ant-picker {
            box-shadow: none;
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
            colorBgContainer: 'red',
          },
        }}
      >
        <Space direction="vertical" size={12}>
          <RangePicker
            style={{
              border: 'none',
              background: `${theme.palette.primary.main}`,
              zIndex: '10000',
              height: '42px',
            }}
            picker="month"
            allowClear={false}
            allowEmpty={[false, false]}
            value={[dayjs(startvalue), dayjs(endvalue)]}
            format={dateFormat}
            className="custom-range-picker"
            onChange={newValue => {
              if (newValue && newValue.length === 2) {
                const [startValue, endValue] = newValue as [Dayjs, Dayjs]
                handleNewDate(startValue, endValue)
                setTimeRange((prevState: TimeRange) => ({
                  ...prevState,
                  fromSelectMonth: startValue.month(),
                  fromSelectYear: `${startValue.year()}`,
                  toSelectMonth: endValue.month(),
                  toSelectYear: `${endValue.year()}`,
                }))
              }
            }}
          />
        </Space>
      </ConfigProvider>
    </Fragment>
  )
}
