import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useMemo, useState } from "react";
import classname from "classname";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

const MonthBill = () => {
  // 控制时间选择器的显示与隐藏
  const [dataVisible, setDataVisible] = useState(false);
  // 时间切换
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  // 时间选择确认
  const onConfirm = (value) => {
    setDataVisible(false);
    const formatDate = dayjs(value).format("YYYY-MM");
    setCurrentDate(formatDate);
  };
  // 按月做分组,以时间作为分组
  const billList = useSelector((state) => state.bill.billList);
  // 数据二次处理
  const monthGroup = useMemo(() => {
    // return出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);

  
  console.log("====================================");
  console.log("monthGroup", monthGroup);
  console.log("====================================");
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDataVisible(true)}>
            <span className="text">{currentDate + " "}月账单</span>
            {/* 箭头控制：expand */}
            <span className={classname("arrow", dataVisible && "expand")}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisible}
            max={new Date()}
            onCancel={() => setDataVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDataVisible(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthBill;
