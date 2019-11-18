import React from "react";

// vx
import { ParentSize } from "@vx/responsive";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { scaleBand, scaleLinear } from "@vx/scale";
import { GridRows, GridColumns } from "@vx/grid";

// accessors
const x = d => d.key;
const y = d => d.value;

export default function BarGraph(props) {
    const { data, horizontal } = props;
    const margin = {
        top: 20,
        bottom: 20,
        left: 40,
        right: 40
    };
    let barXPos = [];
    let globalBarWidth = 0;
    return (
        <ParentSize key={`parent-size-${data[0].key}`}>
            {dimensions => {
                let { width, height } = dimensions;
                if (horizontal) {
                    width = dimensions.height;
                    height = dimensions.width;
                }
                const xMax = width - margin.left - margin.right;
                const yMax = height - margin.top - margin.bottom;
                const maxYValue = Math.max(...data.map(y));

                // scales
                const xScale = scaleBand({
                    rangeRound: [0, xMax],
                    domain: data.map(x),
                    padding: 0.4
                });
                const yScale = scaleLinear({
                    rangeRound: [yMax, 0],
                    domain: [0, maxYValue * 1.1]
                });
                return (
                    <svg width={width} height={height}>
                        <linearGradient
                            id="barfill"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                style={{
                                    stopColor: "var(--color-primary)"
                                }}
                            />
                            <stop
                                offset="100%"
                                style={{ stopColor: "var(--color-primary)" }}
                            />
                        </linearGradient>
                        <Group
                            left={margin.left}
                            top={margin.top}
                            right={margin.right}
                        >
                            <GridRows
                                lineStyle={{ pointerEvents: "none" }}
                                scale={yScale}
                                width={xMax}
                                stroke="var(--color-text)"
                                opacity={0.25}
                            />
                            <GridColumns
                                lineStyle={{ pointerEvents: "none" }}
                                scale={xScale}
                                height={yMax}
                                stroke="var(--color-text)"
                                opacity={0.25}
                            />
                        </Group>
                        <Group left={margin.left} top={margin.top}>
                            {data.map((d, i) => {
                                const key = x(d);
                                const barWidth = xScale.bandwidth() / 2;
                                const barHeight = yMax - yScale(y(d));
                                const barX = xScale(key) + barWidth / 2;
                                const barY = yMax - barHeight;
                                barXPos[i] = barX;
                                globalBarWidth = barWidth;
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
                                                rx={4}
                                                fill="url(#barfill)"
                                            >
                                                <animate
                                                    attributeName="height"
                                                    from="0"
                                                    to={barHeight}
                                                    dur="1.5s"
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
                                    numTicks={maxYValue}
                                    stroke={"var(--color-text"}
                                    // label={"Count"}
                                    // labelProps={{
                                    //     fill: "var(--color-text)",
                                    //     textAnchor: "middle",
                                    //     fontSize: "var(--text-base-size)",
                                    //     fontFamily: "Nunito Sans"
                                    // }}
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
                                    // label={"Responses"}
                                    // labelProps={{
                                    //     y: margin.bottom - 10,
                                    //     fill: "var(--color-text)",
                                    //     textAnchor: "middle",
                                    //     fontSize: "var(--text-base-size)",
                                    //     fontFamily: "Nunito Sans"
                                    // }}
                                    tickLabelProps={(tickValue, index) => ({
                                        transform: horizontal ? `` : "",
                                        fill: "var(--color-text)",
                                        fontSize: "var(--text-sm)",
                                        textAnchor: "middle",
                                        y: 20,
                                        x: barXPos[index] + globalBarWidth / 2,
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
