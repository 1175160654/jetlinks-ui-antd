import React from "react";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import autoHeight from '../autoHeight';
import DataSet from "@antv/data-set";

export interface IGaugeProps {
  datas: Array<{
    x: string;
    消息量: number;
  }>;
  height?: number;
}

class Withnegative extends React.Component<IGaugeProps> {
  render() {
    const {
      datas,
      height
    } = this.props;
    const { DataView } = DataSet;

    const dv = new DataView().source(datas);
    dv.transform({
      type: "fold",
      fields: ["消息量"],
      // 展开字段集
      key: "type",
      // key字段
      value: "value" // value字段
    });
    const cols = {
      year: {
        range: [0, 1],
        tickCount:15,
      },

    };
    return (
      <div>
        <Chart height={height} data={dv} scale={cols} forceFit>
          <Axis name="year" />
          <Axis
            name="value"
            label={{
              formatter: val => {
                return (val / 10000).toFixed(1) + "k";
              }
            }}
          />
          <Legend />
          <Tooltip
            crosshairs={{
              type: "line"
            }}
          />
          <Geom type="area" position="year*value" color="type" />
          <Geom type="line" position="year*value" size={2} color="type" />
        </Chart>
      </div>
    );
  }
}

export default autoHeight()(Withnegative);
