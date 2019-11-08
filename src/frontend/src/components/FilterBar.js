import React from "react";
import Flex from "./utils/Flex";

// components
import Input from "./utils/Input";
import Select from "./utils/Select";
import Button from "./utils/Button";

const filterOptions = ["Open", "Opening soon", "Closing soon", "Closed"];
const sortOptions = ["New", "Old", "Popular"];

export default function FilterBar(props) {
    return (
        <Flex>
            <div
                style={{
                    flex: "50",
                    paddingRight: "var(--space-xs)",
                    paddingLeft: "var(--space-xs)"
                }}
            >
                <Input
                    type="text"
                    placeholder="Start typing to search"
                    label="Search"
                    labelTop={true}
                    // onChange={input => this.handleChange(input, "name")}
                />
            </div>
            <div
                style={{
                    flex: "15",
                    paddingRight: "var(--space-xs)",
                    paddingLeft: "var(--space-xs)"
                }}
            >
                <Select
                    label="Filter"
                    options={filterOptions}
                    // defaultValue={}
                    // onChange={input =>
                    //     this.handleChange(input, "qtype")
                    // }
                    labelTop={true}
                />
            </div>
            <div
                style={{
                    flex: "15",
                    paddingRight: "var(--space-xs)",
                    paddingLeft: "var(--space-xs)"
                }}
            >
                <Select
                    label="Sort by"
                    options={sortOptions}
                    // defaultValue={}
                    // onChange={input =>
                    //     this.handleChange(input, "qtype")
                    // }
                    labelTop={true}
                />
            </div>
            <div style={{ flex: "20" }}>
                <Flex>
                    <Button
                        theme="transparent"
                        style={{ marginTop: "7px", fontSize: "var(--text-xl)" }}
                    >
                        {/* list */}
                        &#9776;
                    </Button>

                    <Button
                        theme="transparent"
                        style={{ marginTop: "7px", fontSize: "var(--text-xl)" }}
                    >
                        {/* grid */}
                        &#9638;
                    </Button>
                </Flex>
            </div>
        </Flex>
    );
}
