import React from "react";

// vx
import { ParentSize } from "@vx/responsive";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { scaleBand, scaleLinear } from "@vx/scale";

// accessors
const x = d => d.key;
const y = d => d.value;

export default function BarGraph(props) {
    const { data } = props;
    const margin = {
        top: 10,
        bottom: 60,
        left: 60,
        right: 10
    };
    let globalbarWidth = 100;
    return (
        <ParentSize key={`parent-size-${data[0].key}`}>
            {dimensions => {
                const { width, height } = dimensions;
                const xMax = width - margin.left - margin.right;
                const yMax = height - margin.top - margin.bottom;

                // scales
                const xScale = scaleBand({
                    rangeRound: [0, xMax],
                    domain: data.map(x),
                    padding: 0.4
                });
                const yScale = scaleLinear({
                    rangeRound: [yMax, 0],
                    domain: [0, Math.max(...data.map(y))]
                });
                return (
                    <svg width={width} height={height}>
                        <Group left={margin.left} top={margin.top}>
                            {data.map((d, i) => {
                                const key = x(d);
                                const barWidth = xScale.bandwidth();
                                globalbarWidth = barWidth;
                                const barHeight = yMax - yScale(y(d));
                                const barX = xScale(key);
                                const barY = yMax - barHeight;
                                if (barHeight >= 0) {
                                    return (
                                        <g
                                            key={`bar-${key}`}
                                            transform={`scale(1,-1) translate(0,${-yMax -
                                                (yMax - barHeight)})`}
                                        >
                                            <Bar
                                                x={barX}
                                                y={barY}
                                                width={barWidth}
                                                height={barHeight}
                                                fill="var(--color-primary)"
                                            >
                                                <animate
                                                    attributeName="height"
                                                    from="0"
                                                    to={barHeight}
                                                    dur="1s"
                                                    fill="black"
                                                />
                                            </Bar>
                                        </g>
                                    );
                                }
                                return null;
                            })}
                        </Group>
                        <Group left={margin.left} top={margin.top}>
                            <>
                                <AxisLeft
                                    top={0}
                                    left={0}
                                    scale={yScale}
                                    numTicks={10}
                                    stroke={"var(--color-text"}
                                    label={"Count"}
                                    labelProps={{
                                        fill: "var(--color-text)",
                                        textAnchor: "middle",
                                        fontSize: "var(--text-base-size)",
                                        fontFamily: "Nunito Sans"
                                    }}
                                    tickLabelProps={(tickValue, index) => ({
                                        fill: "var(--color-text)",
                                        fontSize: "var(--text-sm)",
                                        y: yScale(tickValue) + 5,
                                        x: -27,
                                        fontFamily: "Nunito Sans"
                                    })}
                                    tickStroke={"var(--color-text"}
                                />
                                <AxisBottom
                                    top={yMax}
                                    left={0}
                                    scale={xScale}
                                    numTicks={data.length}
                                    stroke={"var(--color-text"}
                                    label={"Responses"}
                                    labelProps={{
                                        y: margin.bottom - 10,
                                        fill: "var(--color-text)",
                                        textAnchor: "middle",
                                        fontSize: "var(--text-base-size)",
                                        fontFamily: "Nunito Sans"
                                    }}
                                    tickLabelProps={(tickValue, index) => ({
                                        fill: "var(--color-text)",
                                        fontSize: "var(--text-sm)",
                                        y: 20,
                                        x:
                                            xScale(tickValue) +
                                            globalbarWidth / 2 -
                                            13,
                                        fontFamily: "Nunito Sans"
                                    })}
                                    tickStroke={"var(--color-text"}
                                />
                            </>
                        </Group>
                    </svg>
                );
            }}
        </ParentSize>
    );
}
