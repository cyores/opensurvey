import React from "react";
import Flex from "./utils/Flex";
import { FiGrid } from "react-icons/fi";
import { FiList } from "react-icons/fi";

// components
import Input from "./utils/Input";
import Select from "./utils/Select";

const filterOptions = ["None", "Open", "Opening soon", "Closing soon", "Closed"];
const sortOptions = ["New", "Old", "AZ"];

export default function FilterBar(props) {
    return (
        <Flex>
            <div
                style={{
                    flex: "34 0 300px",
                    paddingRight: "var(--space-xs)",
                    paddingLeft: "var(--space-xs)"
                }}
            >
                <Input
                    type="text"
                    placeholder="Start typing to search"
                    label="Search"
                    labelTop={true}
                    onChange={input =>
                        props.handleChange(input, "search")
                    }
                />
            </div>
            <div
                style={{
                    flex: "27",
                    paddingRight: "var(--space-xs)",
                    paddingLeft: "var(--space-xs)"
                }}
            >
                <Select
                    label="Filter"
                    options={filterOptions}
                    defaultValue={"None"}
                    onChange={input =>
                        props.handleChange(input, "filter")
                    }
                    labelTop={true}
                />
            </div>
            <div
                style={{
                    flex: "27",
                    paddingRight: "var(--space-xs)",
                    paddingLeft: "var(--space-xs)"
                }}
            >
                <Select
                    label="Sort by"
                    options={sortOptions}
                    defaultValue={"New"}
                    onChange={input => props.handleChange(input, "sort")}
                    labelTop={true}
                />
            </div>
            <div style={{ flex: "12" }}>
                <Flex>
                    <FiList
                        style={{
                            color: "var(--color-primary)",
                            fontSize: "var(--text-xl)",
                            cursor: "pointer",
                            marginTop: "calc(var(--text-base-size) + 7px)"
                        }}
                        onClick={() => props.changeLayout("list")}
                    />

                    <FiGrid
                        style={{
                            color: "var(--color-primary)",
                            fontSize: "var(--text-xl)",
                            cursor: "pointer",
                            marginTop: "calc(var(--text-base-size) + 7px)"
                        }}
                        onClick={() => props.changeLayout("grid")}
                    />
                </Flex>
            </div>
        </Flex>
    );
}
