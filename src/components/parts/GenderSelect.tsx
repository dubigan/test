import React from "react";
import ToggleButtonGroup, {
    TToggleButtonGroupProps,
    TToggleButtonGroup,
} from "../lib/input/ToggleButtons.styled";
import { GENDER } from "../Detail/DetailTypes";

const GenderSelect: TToggleButtonGroup = (props: TToggleButtonGroupProps) => {
    return (
        <ToggleButtonGroup
            name={props.name ? props.name : "gender"}
            values={props.values ? props.values : GenderSelect.values}
            //type="radio"
            checkValue={props.checkValue}
            onChange={props.onChange}
        />
    );
};

GenderSelect.values = [
    { label: "Муж", value: GENDER.MALE },
    { label: "Жен", value: GENDER.FEMALE },
];

export default GenderSelect as TToggleButtonGroup;
